package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.GmailScopes;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.secretmanager.v1.AccessSecretVersionResponse;
import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1.SecretVersionName;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleAuthService {

    private final AppProperties appProperties;
    private GoogleCredentials baseCredentials;
    private HttpTransport httpTransport;
    private final GsonFactory jsonFactory = GsonFactory.getDefaultInstance();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final List<String> GMAIL_SCOPES = List.of(
            GmailScopes.GMAIL_SETTINGS_BASIC,
            GmailScopes.GMAIL_SETTINGS_SHARING,
            GmailScopes.GMAIL_COMPOSE,
            GmailScopes.GMAIL_MODIFY
    );

    private static final List<String> CALENDAR_SCOPES = List.of(
            CalendarScopes.CALENDAR_READONLY,
            CalendarScopes.CALENDAR_EVENTS_READONLY
    );

    private static final List<String> SHEETS_SCOPES = List.of(
            SheetsScopes.SPREADSHEETS
    );

    private static final List<String> DRIVE_SCOPES = List.of(
            DriveScopes.DRIVE,
            DriveScopes.DRIVE_FILE
    );

    @PostConstruct
    public void init() {
        try {
            this.httpTransport = GoogleNetHttpTransport.newTrustedTransport();
            this.baseCredentials = loadBaseCredentials();
            log.info("Google 인증 서비스 초기화 완료");
        } catch (Exception e) {
            log.warn("기본 Google 자격증명 초기화 보류 (필요 시 로드): {}", e.getMessage());
        }
    }

    public GoogleCredentials loadBaseCredentials() throws Exception {
        // 1. GCP Secret Manager에서 로드 시도
        AppProperties.SecretManager smConfig = appProperties.getGoogle().getSecretManager();
        if (smConfig != null && smConfig.isEnabled() && smConfig.getProjectId() != null && !smConfig.getProjectId().isBlank()) {
            try {
                log.info("GCP Secret Manager로부터 보안 설정값 로드 시도: projects/{}/secrets/{}/versions/{}",
                        smConfig.getProjectId(), smConfig.getSecretName(), smConfig.getVersion());
                GoogleCredentials creds = loadFromSecretManager(smConfig.getProjectId(), smConfig.getSecretName(), smConfig.getVersion());
                if (creds != null) {
                    log.info("GCP Secret Manager로부터 서비스 계정 자격증명 로드 성공");
                    return creds;
                }
            } catch (Exception e) {
                log.warn("GCP Secret Manager 로드 실패, 대체 방법 시도: {}", e.getMessage());
            }
        }

        // 2. 로컬 파일에서 로드 시도
        String keyPath = appProperties.getGoogle().getServiceAccountKeyPath();
        if (keyPath != null && !keyPath.isBlank()) {
            File keyFile = new File(keyPath);
            if (keyFile.exists()) {
                log.info("Service Account 파일 로드: {}", keyPath);
                try (InputStream is = new FileInputStream(keyFile)) {
                    return ServiceAccountCredentials.fromStream(is);
                }
            }
        }

        // 3. application.yml 내 명시적 키에서 로드 시도
        String saEmail = appProperties.getGoogle().getServiceAccountEmail();
        String privateKeyRaw = appProperties.getGoogle().getPrivateKey();
        if (saEmail != null && !saEmail.isBlank() && privateKeyRaw != null && !privateKeyRaw.isBlank()) {
            log.info("Service Account 프로퍼티 정보로부터 자격증명 생성: {}", saEmail);
            return createServiceAccountCredentials(saEmail, privateKeyRaw);
        }

        // 4. Application Default Credentials 시도
        try {
            return GoogleCredentials.getApplicationDefault();
        } catch (Exception e) {
            log.warn("Application Default Credentials를 찾을 수 없음: {}", e.getMessage());
            return null;
        }
    }

    private GoogleCredentials loadFromSecretManager(String projectId, String secretName, String version) throws Exception {
        try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
            SecretVersionName secretVersionName = SecretVersionName.of(projectId, secretName, version);
            AccessSecretVersionResponse response = client.accessSecretVersion(secretVersionName);
            String payload = response.getPayload().getData().toStringUtf8();

            if (payload == null || payload.isBlank()) {
                throw new IllegalStateException("Secret Manager 페이로드가 비어있습니다.");
            }

            JsonNode root = objectMapper.readTree(payload);

            // 전체 Google Service Account Key JSON인 경우
            if (root.has("type") && "service_account".equalsIgnoreCase(root.get("type").asText())) {
                return ServiceAccountCredentials.fromStream(
                        new ByteArrayInputStream(payload.getBytes(StandardCharsets.UTF_8))
                );
            }

            // FATESNEWSLETTER 통합 시크릿: "google_service_account" 중첩키 지원
            if (root.has("google_service_account")) {
                JsonNode saNode = root.get("google_service_account");
                if (saNode.has("type") && "service_account".equalsIgnoreCase(saNode.get("type").asText())) {
                    String saJson = objectMapper.writeValueAsString(saNode);
                    log.info("FATESNEWSLETTER 시크릿의 google_service_account에서 서비스 계정 로드");
                    return ServiceAccountCredentials.fromStream(
                            new ByteArrayInputStream(saJson.getBytes(StandardCharsets.UTF_8))
                    );
                }
            }

            // { SERVICE_ACCOUNT_EMAIL: "...", PRIVATE_KEY: "..." } 형태인 경우
            String email = root.has("SERVICE_ACCOUNT_EMAIL") ? root.get("SERVICE_ACCOUNT_EMAIL").asText() :
                    (root.has("client_email") ? root.get("client_email").asText() : null);

            String privateKey = root.has("PRIVATE_KEY") ? root.get("PRIVATE_KEY").asText() :
                    (root.has("private_key") ? root.get("private_key").asText() : null);

            if (email != null && privateKey != null) {
                return createServiceAccountCredentials(email, privateKey);
            }

            throw new IllegalStateException("Secret Manager 페이로드에서 서비스 계정 정보를 파싱할 수 없습니다");
        }
    }

    private ServiceAccountCredentials createServiceAccountCredentials(String email, String rawPrivateKey) throws Exception {
        String cleanKey = rawPrivateKey.replace("\\n", "\n")
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s+", "");

        byte[] keyBytes = Base64.getDecoder().decode(cleanKey);
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        PrivateKey privateKey = kf.generatePrivate(spec);

        return ServiceAccountCredentials.newBuilder()
                .setClientEmail(email)
                .setPrivateKey(privateKey)
                .build();
    }

    public GoogleCredentials getImpersonatedCredentials(String userEmail, List<String> scopes) {
        if (baseCredentials == null) {
            try {
                baseCredentials = loadBaseCredentials();
            } catch (Exception e) {
                throw new IllegalStateException("Google 자격증명을 로드할 수 없습니다: " + e.getMessage(), e);
            }
        }

        if (baseCredentials == null) {
            throw new IllegalStateException("유효한 Google 서비스 계정 자격증명이 없습니다. Secret Manager 또는 키 파일을 확인하세요.");
        }

        if (baseCredentials instanceof ServiceAccountCredentials sac) {
            return sac.createScoped(scopes).createDelegated(userEmail);
        }
        return baseCredentials.createScoped(scopes);
    }

    public Gmail getGmailClientForUser(String userEmail) {
        GoogleCredentials credentials = getImpersonatedCredentials(userEmail, GMAIL_SCOPES);
        return new Gmail.Builder(httpTransport, jsonFactory, new HttpCredentialsAdapter(credentials))
                .setApplicationName("fates-system")
                .build();
    }

    public Calendar getCalendarClient() {
        if (baseCredentials == null) {
            try {
                baseCredentials = loadBaseCredentials();
            } catch (Exception e) {
                throw new IllegalStateException("Google 자격증명을 로드할 수 없습니다: " + e.getMessage(), e);
            }
        }
        GoogleCredentials credentials = baseCredentials.createScoped(CALENDAR_SCOPES);
        return new Calendar.Builder(httpTransport, jsonFactory, new HttpCredentialsAdapter(credentials))
                .setApplicationName("fates-system")
                .build();
    }

    public Sheets getSheetsClient() {
        if (baseCredentials == null) {
            try {
                baseCredentials = loadBaseCredentials();
            } catch (Exception e) {
                throw new IllegalStateException("Google 자격증명을 로드할 수 없습니다: " + e.getMessage(), e);
            }
        }
        GoogleCredentials credentials = baseCredentials.createScoped(SHEETS_SCOPES);
        return new Sheets.Builder(httpTransport, jsonFactory, new HttpCredentialsAdapter(credentials))
                .setApplicationName("fates-system")
                .build();
    }

    /**
     * 뉴스레터 자동화용 Google Drive 클라이언트 (서비스 계정으로 파일 생성)
     */
    public Drive getDriveClient() {
        if (baseCredentials == null) {
            try {
                baseCredentials = loadBaseCredentials();
            } catch (Exception e) {
                throw new IllegalStateException("Google 자격증명을 로드할 수 없습니다: " + e.getMessage(), e);
            }
        }
        GoogleCredentials credentials = baseCredentials.createScoped(DRIVE_SCOPES);
        return new Drive.Builder(httpTransport, jsonFactory, new HttpCredentialsAdapter(credentials))
                .setApplicationName("fates-system")
                .build();
    }

    /**
     * 특정 사용자(예: no-reply@fatesinc.com)로 위임된 Google Drive 클라이언트
     */
    public Drive getDriveClientForUser(String userEmail) {
        GoogleCredentials credentials = getImpersonatedCredentials(userEmail, DRIVE_SCOPES);
        return new Drive.Builder(httpTransport, jsonFactory, new HttpCredentialsAdapter(credentials))
                .setApplicationName("fates-system")
                .build();
    }
}
