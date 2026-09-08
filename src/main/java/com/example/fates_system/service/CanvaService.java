package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.http.ByteArrayContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.stream.StreamSupport;

import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * Canva API - newsletter design fetch, PDF/PNG export, Drive upload, folder move
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CanvaService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newHttpClient();

    private static final String CANVA_TOKEN_URL = "https://api.canva.com/rest/v1/oauth/token";
    private static final String CANVA_BASE_URL  = "https://api.canva.com/rest/v1";

    private volatile String cachedAccessToken = null;
    private volatile long accessTokenExpiresAt = 0L;
    private volatile String cachedRefreshToken = null;
    private volatile String originalRefreshToken = null;

    public void setCachedRefreshToken(String token) {
        this.cachedRefreshToken = token;
    }

    public String getCachedRefreshToken() {
        return this.cachedRefreshToken;
    }

    public void setCachedTokens(String accessToken, int expiresIn, String refreshToken) {
        if (accessToken != null) {
            this.cachedAccessToken = accessToken;
            int exp = expiresIn > 0 ? expiresIn : 14400;
            this.accessTokenExpiresAt = System.currentTimeMillis() + (exp * 1000L);
        }
        if (refreshToken != null) {
            saveRefreshTokenLocally(refreshToken);
        }
    }

    /** 토큰이 실제로 변경되었는지 확인 (하위 호환) */
    public boolean isRefreshTokenChanged() {
        return cachedRefreshToken != null && !cachedRefreshToken.equals(originalRefreshToken);
    }

    /**
     * Canva 지정 소스 폴더 조회 - 처리할 최신 디자인이 있는지 확인
     * @return 최신 디자인 JsonNode (없거나 오류 시 null)
     */
    public JsonNode checkSourceFolderForDesign() {
        String accessToken = getAccessToken();
        if (accessToken == null) return null;
        return getLatestDesign(accessToken);
    }

    /**
     * 조회된 디자인을 기반으로 PDF 생성 및 Drive 업로드 진행
     */
    public NewsletterResult processDesign(JsonNode latestDesign) {
        if (latestDesign == null) return null;
        try {
            String accessToken = getAccessToken();
            if (accessToken == null) return null;

            String designId = latestDesign.get("id").asText();
            String title    = latestDesign.has("title") ? latestDesign.get("title").asText() : "newsletter";
            log.info("[CanvaService] Processing design: \"{}\" (ID: {})", title, designId);

            List<String> pdfUrls = exportDesign(accessToken, designId, "pdf");
            if (pdfUrls == null || pdfUrls.isEmpty()) {
                log.error("[CanvaService] PDF export failed for design ID: {}", designId);
                return null;
            }

            byte[] pdfBytes = downloadBytes(pdfUrls.get(0));
            if (pdfBytes == null) {
                log.error("[CanvaService] PDF download failed from export URL");
                return null;
            }

            String sanitizedTitle = title.replaceAll("[/\\\\:*?\"<>|]", "_");
            String fileName = sanitizedTitle + ".pdf";

            // Drive 업로드는 선택적 - 실패해도 파이프라인 계속 진행
            try {
                String driveFileId = uploadToDrive(pdfBytes, fileName);
                if (driveFileId != null) {
                    log.info("[CanvaService] Uploaded to Drive: {} (id: {})", fileName, driveFileId);
                } else {
                    log.warn("[CanvaService] Drive upload skipped or failed - continuing pipeline without Drive upload");
                }
            } catch (Exception driveEx) {
                log.warn("[CanvaService] Drive upload failed (optional step) - continuing pipeline: {}", driveEx.getMessage());
            }

            return new NewsletterResult(designId, title, fileName, pdfBytes);
        } catch (Exception e) {
            log.error("[CanvaService] processDesign error: {}", e.getMessage(), e);
            return null;
        }
    }

    public NewsletterResult processLatestNewsletter() {
        JsonNode latestDesign = checkSourceFolderForDesign();
        if (latestDesign == null) {
            return null;
        }
        return processDesign(latestDesign);
    }

    public List<String> exportDesignAsPng(String designId) {
        String accessToken = getAccessToken();
        if (accessToken == null) return null;
        return exportDesign(accessToken, designId, "png");
    }

    public boolean moveDesignToArchive(String designId) {
        String accessToken = getAccessToken();
        if (accessToken == null) return false;
        String archiveFolderId = appProperties.getNewsletter().getCanva().getArchiveFolderId();
        return moveDesign(accessToken, designId, archiveFolderId);
    }

    public record CanvaLocalCredentials(String clientId, String clientSecret, String refreshToken) {}

    public CanvaLocalCredentials loadCredentials() {
        AppProperties.Newsletter.Canva canvaCfg = appProperties.getNewsletter().getCanva();
        String clientId = canvaCfg.getClientId();
        String clientSecret = canvaCfg.getClientSecret();
        String refreshToken = canvaCfg.getRefreshToken();

        // credentials/canva-token.json 파일이 있으면 우선 로드
        String tokenPath = canvaCfg.getTokenFilePath();
        if (tokenPath != null && !tokenPath.isBlank()) {
            java.io.File tokenFile = new java.io.File(tokenPath);
            if (tokenFile.exists()) {
                try {
                    JsonNode node = objectMapper.readTree(tokenFile);
                    if (node.has("refresh_token") && !node.get("refresh_token").asText().isBlank()) {
                        refreshToken = node.get("refresh_token").asText();
                    }
                    if (node.has("client_id") && !node.get("client_id").asText().isBlank()) {
                        clientId = node.get("client_id").asText();
                    }
                    if (node.has("client_secret") && !node.get("client_secret").asText().isBlank()) {
                        clientSecret = node.get("client_secret").asText();
                    }
                } catch (Exception e) {
                    log.warn("[CanvaService] Failed to read Canva token file: {}", e.getMessage());
                }
            }
        }
        return new CanvaLocalCredentials(clientId, clientSecret, refreshToken);
    }

    public void saveRefreshTokenLocally(String newRefreshToken) {
        this.cachedRefreshToken = newRefreshToken;
        AppProperties.Newsletter.Canva canvaCfg = appProperties.getNewsletter().getCanva();
        String tokenPath = canvaCfg.getTokenFilePath();
        if (tokenPath == null || tokenPath.isBlank()) return;
        try {
            java.io.File tokenFile = new java.io.File(tokenPath);
            if (tokenFile.getParentFile() != null) {
                tokenFile.getParentFile().mkdirs();
            }
            ObjectNode objNode;
            if (tokenFile.exists()) {
                JsonNode existing = objectMapper.readTree(tokenFile);
                objNode = existing instanceof ObjectNode o ? o : objectMapper.createObjectNode();
            } else {
                objNode = objectMapper.createObjectNode();
            }
            objNode.put("refresh_token", newRefreshToken);
            if (canvaCfg.getClientId() != null) objNode.put("client_id", canvaCfg.getClientId());
            if (canvaCfg.getClientSecret() != null) objNode.put("client_secret", canvaCfg.getClientSecret());
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(tokenFile, objNode);
            log.info("[CanvaService] Updated Canva refresh token saved locally to {}", tokenPath);
        } catch (Exception e) {
            log.error("[CanvaService] Failed to save Canva token locally: {}", e.getMessage(), e);
        }
    }

    synchronized String getAccessToken() {
        // 1. 캐시된 access_token이 있고 만료 60초 전까지는 네트워크 호출 없이 즉시 재사용 (4시간 유효)
        if (cachedAccessToken != null && System.currentTimeMillis() < (accessTokenExpiresAt - 60_000L)) {
            log.debug("[CanvaService] Reusing cached Canva access token");
            return cachedAccessToken;
        }

        CanvaLocalCredentials creds = loadCredentials();
        if (creds.clientId() == null || creds.clientSecret() == null) {
            log.error("[CanvaService] Missing Canva clientId or clientSecret in configuration");
            return null;
        }

        String authHeader = Base64.getEncoder().encodeToString(
                (creds.clientId() + ":" + creds.clientSecret()).getBytes(StandardCharsets.UTF_8));

        String tokenToUse = cachedRefreshToken != null ? cachedRefreshToken : creds.refreshToken();

        if (originalRefreshToken == null && creds.refreshToken() != null) {
            originalRefreshToken = creds.refreshToken();
        }

        // 2. If refresh token is available, refresh it
        if (tokenToUse != null && !tokenToUse.isBlank()) {
            String body = "grant_type=refresh_token&refresh_token="
                    + URLEncoder.encode(tokenToUse, StandardCharsets.UTF_8);
            try {
                HttpRequest req = HttpRequest.newBuilder()
                        .uri(URI.create(CANVA_TOKEN_URL))
                        .header("Authorization", "Basic " + authHeader)
                        .header("Content-Type", "application/x-www-form-urlencoded")
                        .POST(HttpRequest.BodyPublishers.ofString(body))
                        .build();
                HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
                JsonNode json = objectMapper.readTree(res.body());
                if (json.has("access_token")) {
                    String newAccessToken = json.get("access_token").asText();
                    int expiresIn = json.has("expires_in") ? json.get("expires_in").asInt() : 14400;
                    this.cachedAccessToken = newAccessToken;
                    this.accessTokenExpiresAt = System.currentTimeMillis() + (expiresIn * 1000L);
                    log.info("[CanvaService] Canva access token refreshed and cached for {} seconds", expiresIn);

                    if (json.has("refresh_token")) {
                        String newRefreshToken = json.get("refresh_token").asText();
                        saveRefreshTokenLocally(newRefreshToken);
                    }
                    return cachedAccessToken;
                }
                log.warn("[CanvaService] Token refresh failed ({}): {}", res.statusCode(), res.body());
            } catch (Exception e) {
                log.error("[CanvaService] Token refresh exception: {}", e.getMessage(), e);
            }
        }

        log.error("[CanvaService] Unable to obtain Canva access token. Please visit http://127.0.0.1:8080/api/v1/newsletter/canva/auth-url to authorize Canva.");
        return null;
    }

    private JsonNode getLatestDesign(String accessToken) {
        String sourceFolderId = appProperties.getNewsletter().getCanva().getSourceFolderId();
        String url = CANVA_BASE_URL + "/folders/" + sourceFolderId + "/items";
        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Authorization", "Bearer " + accessToken)
                    .GET().build();
            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            if (res.statusCode() != 200) {
                log.error("[CanvaService] Folder fetch failed ({}): {}", res.statusCode(), res.body());
                return null;
            }
            JsonNode root = objectMapper.readTree(res.body());
            JsonNode items = root.get("items");
            if (items == null || !items.isArray() || items.size() == 0) {
                log.info("[CanvaService] Source folder '{}' is empty. No designs to process.", sourceFolderId);
                return null;
            }
            JsonNode latest = StreamSupport.stream(items.spliterator(), false)
                    .filter(item -> "design".equals(item.path("type").asText()) && item.has("design"))
                    .map(item -> item.get("design"))
                    .max(Comparator.comparingLong(d -> d.path("updated_at").asLong(0)))
                    .orElse(null);
            if (latest == null) {
                log.info("[CanvaService] Source folder '{}' contains {} items, but no design item found.", sourceFolderId, items.size());
            }
            return latest;
        } catch (Exception e) {
            log.error("[CanvaService] getLatestDesign error: {}", e.getMessage(), e);
            return null;
        }
    }

    List<String> exportDesign(String accessToken, String designId, String formatType) {
        int maxAttempts   = appProperties.getNewsletter().getCanva().getMaxPollAttempts();
        long pollInterval = appProperties.getNewsletter().getCanva().getPollIntervalMs();
        String exportBody = "{\"design_id\":\"" + designId + "\",\"format\":{\"type\":\"" + formatType + "\"}}";
        try {
            HttpRequest exportReq = HttpRequest.newBuilder()
                    .uri(URI.create(CANVA_BASE_URL + "/exports"))
                    .header("Authorization", "Bearer " + accessToken)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(exportBody))
                    .build();
            HttpResponse<String> exportRes = httpClient.send(exportReq, HttpResponse.BodyHandlers.ofString());
            if (exportRes.statusCode() != 200) {
                log.error("[CanvaService] Export request failed ({}, {}): {}", formatType, exportRes.statusCode(), exportRes.body());
                return null;
            }
            JsonNode exportData = objectMapper.readTree(exportRes.body());
            String jobId = exportData.path("job").path("id").asText(null);
            if (jobId == null) { log.error("[CanvaService] No job ID: {}", exportRes.body()); return null; }

            String statusUrl = CANVA_BASE_URL + "/exports/" + jobId;
            for (int i = 0; i < maxAttempts; i++) {
                Thread.sleep(pollInterval);
                HttpRequest pollReq = HttpRequest.newBuilder()
                        .uri(URI.create(statusUrl))
                        .header("Authorization", "Bearer " + accessToken)
                        .GET().build();
                HttpResponse<String> pollRes = httpClient.send(pollReq, HttpResponse.BodyHandlers.ofString());
                JsonNode statusData = objectMapper.readTree(pollRes.body());
                String status = statusData.path("job").path("status").asText();
                if ("success".equals(status)) {
                    JsonNode urlsNode = statusData.path("job").path("urls");
                    List<String> urls = new ArrayList<>();
                    urlsNode.forEach(u -> urls.add(u.asText()));
                    log.info("[CanvaService] {} export done: {} URLs", formatType, urls.size());
                    return urls;
                }
                log.debug("[CanvaService] Polling {}/{}, status={}", i + 1, maxAttempts, status);
            }
            log.error("[CanvaService] {} export timed out for designId: {}", formatType, designId);
            return null;
        } catch (Exception e) {
            log.error("[CanvaService] exportDesign error: {}", e.getMessage(), e);
            return null;
        }
    }

    private boolean moveDesign(String accessToken, String designId, String targetFolderId) {
        String body = "{\"to_folder_id\":\"" + targetFolderId + "\",\"item_id\":\"" + designId + "\"}";
        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(CANVA_BASE_URL + "/folders/move"))
                    .header("Authorization", "Bearer " + accessToken)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();
            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            int code = res.statusCode();
            if (code == 200 || code == 204) return true;
            log.error("[CanvaService] Move failed ({}): {}", code, res.body());
            return false;
        } catch (Exception e) {
            log.error("[CanvaService] moveDesign error: {}", e.getMessage(), e);
            return false;
        }
    }

    private byte[] downloadBytes(String url) {
        try {
            HttpRequest req = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
            HttpResponse<byte[]> res = httpClient.send(req, HttpResponse.BodyHandlers.ofByteArray());
            return res.body();
        } catch (Exception e) {
            log.error("[CanvaService] Download failed ({}): {}", url, e.getMessage());
            return null;
        }
    }

    private String uploadToDrive(byte[] data, String fileName) {
        String folderId = appProperties.getNewsletter().getDrive().getFolderId();
        String senderEmail = appProperties.getNewsletter().getEmail().getSender();
        try {
            Drive drive;
            try {
                drive = googleAuthService.getDriveClientForUser(senderEmail);
            } catch (Exception e) {
                log.warn("[CanvaService] Failed to get delegated Drive client for '{}', using default service account client: {}", senderEmail, e.getMessage());
                drive = googleAuthService.getDriveClient();
            }
            File metadata = new File();
            metadata.setName(fileName);
            metadata.setParents(List.of(folderId));
            ByteArrayContent content = new ByteArrayContent("application/pdf", data);
            File uploaded = drive.files().create(metadata, content)
                    .setSupportsAllDrives(true)
                    .setFields("id,name")
                    .execute();
            return uploaded.getId();
        } catch (IOException e) {
            log.error("[CanvaService] Drive upload failed: {}", e.getMessage(), e);
            return null;
        }
    }

    public record NewsletterResult(String designId, String title, String fileName, byte[] pdfBytes) {}
}
