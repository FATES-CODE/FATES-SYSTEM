package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.cloud.secretmanager.v1.AccessSecretVersionResponse;
import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1.SecretName;
import com.google.cloud.secretmanager.v1.SecretPayload;
import com.google.cloud.secretmanager.v1.SecretVersionName;
import com.google.protobuf.ByteString;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class GcpSecretService {

    private final AppProperties appProperties;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String loadSecret(String secretName) {
        if (secretName == null || secretName.isBlank()) return null;
        AppProperties.SecretManager smConfig = appProperties.getGoogle().getSecretManager();
        String projectId = smConfig.getProjectId();
        String version   = smConfig.getVersion();
        try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
            SecretVersionName sn = SecretVersionName.of(projectId, secretName, version);
            AccessSecretVersionResponse resp = client.accessSecretVersion(sn);
            String payload = resp.getPayload().getData().toStringUtf8();
            log.info("[GcpSecretService] Successfully loaded secret '{}' from project '{}'", secretName, projectId);
            return payload;
        } catch (Exception e) {
            log.warn("[GcpSecretService] Secret '{}' load failed: {}", secretName, e.getMessage());
            return null;
        }
    }

    private JsonNode loadNewsletterSecret() {
        String secretName = appProperties.getNewsletter().getSecretName();
        String raw = loadSecret(secretName);

        if (raw == null || raw.isBlank()) {
            String fallbackName = appProperties.getGoogle().getSecretManager().getSecretName();
            if (fallbackName != null && !fallbackName.equalsIgnoreCase(secretName)) {
                log.info("[GcpSecretService] Trying fallback secret '{}'", fallbackName);
                raw = loadSecret(fallbackName);
            }
        }

        if (raw == null || raw.isBlank()) {
            log.warn("[GcpSecretService] No Secret Manager payload available for newsletter");
            return null;
        }

        try {
            return objectMapper.readTree(raw);
        } catch (Exception e) {
            log.error("[GcpSecretService] JSON parse failed for secret: {}", e.getMessage());
            return null;
        }
    }

    public CanvaCredentials getCanvaCredentials() {
        JsonNode root = loadNewsletterSecret();

        String clientId     = root != null ? findValue(root, "client_id", "clientId", "CLIENT_ID", "canva_client_id") : null;
        String clientSecret = root != null ? findValue(root, "client_secret", "clientSecret", "CLIENT_SECRET", "canva_client_secret") : null;
        String refreshToken = root != null ? findValue(root, "canva_refresh_token", "refresh_token", "refreshToken", "CANVA_REFRESH_TOKEN") : null;
        String authCode     = root != null ? findValue(root, "auth_code", "authCode", "AUTH_CODE", "code") : null;

        // Fallbacks from application.yml / env
        AppProperties.Newsletter.Canva canvaCfg = appProperties.getNewsletter().getCanva();
        if (clientId == null) clientId = canvaCfg.getClientId();
        if (clientSecret == null) clientSecret = canvaCfg.getClientSecret();
        if (refreshToken == null) refreshToken = canvaCfg.getRefreshToken();

        if (clientId == null || clientSecret == null || (refreshToken == null && authCode == null)) {
            log.error("[GcpSecretService] Missing Canva credential fields (clientId={}, clientSecret={}, refreshToken={}, authCode={})",
                    clientId != null ? "FOUND" : "NULL",
                    clientSecret != null ? "FOUND" : "NULL",
                    refreshToken != null ? "FOUND" : "NULL",
                    authCode != null ? "FOUND" : "NULL");
            return null;
        }
        return new CanvaCredentials(clientId, clientSecret, refreshToken, authCode);
    }

    public InstagramCredentials getInstagramCredentials() {
        JsonNode root = loadNewsletterSecret();

        String accountId   = root != null ? findValue(root, "instagram_account_id", "accountId", "account_id", "INSTAGRAM_ACCOUNT_ID") : null;
        String accessToken = root != null ? findValue(root, "instagram_access_token", "accessToken", "access_token", "INSTAGRAM_ACCESS_TOKEN") : null;
        String appId       = root != null ? findValue(root, "instagram_app_id", "app_id", "INSTAGRAM_APP_ID") : null;
        String appSecret   = root != null ? findValue(root, "instagram_app_secret", "app_secret", "INSTAGRAM_APP_SECRET") : null;

        // Fallbacks from application.yml / env
        AppProperties.Newsletter.Instagram instaCfg = appProperties.getNewsletter().getInstagram();
        if (accountId == null) accountId = instaCfg.getAccountId();
        if (accessToken == null) accessToken = instaCfg.getAccessToken();

        if (accountId == null || accessToken == null) {
            log.warn("[GcpSecretService] Missing Instagram credential fields (accountId={}, accessToken={})",
                    accountId != null ? "FOUND" : "NULL",
                    accessToken != null ? "FOUND" : "NULL");
            return null;
        }
        return new InstagramCredentials(accountId, accessToken, appId, appSecret);
    }

    /**
     * Instagram Access Token 갱신 시 GCP Secret Manager에 자동 저장
     */
    public boolean updateInstagramAccessToken(String newAccessToken) {
        String secretName = appProperties.getNewsletter().getSecretName();
        AppProperties.SecretManager smConfig = appProperties.getGoogle().getSecretManager();
        String projectId = smConfig.getProjectId();

        try {
            JsonNode root = loadNewsletterSecret();
            ObjectNode objNode;
            if (root instanceof ObjectNode o) {
                objNode = o;
            } else {
                objNode = objectMapper.createObjectNode();
            }
            objNode.put("instagram_access_token", newAccessToken);
            String updatedJson = objectMapper.writeValueAsString(objNode);

            try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
                SecretName parent = SecretName.of(projectId, secretName);
                SecretPayload payload = SecretPayload.newBuilder()
                        .setData(ByteString.copyFromUtf8(updatedJson))
                        .build();
                client.addSecretVersion(parent, payload);
                log.info("[GcpSecretService] Successfully updated Instagram access token to GCP Secret Manager '{}'", secretName);
                return true;
            }
        } catch (Exception e) {
            log.warn("[GcpSecretService] Failed to update Instagram token in GCP Secret Manager: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Canva 토큰이 순환(Rotation)될 때 자동으로 GCP Secret Manager에 새 버전 저장
     */
    public boolean updateCanvaRefreshToken(String newRefreshToken) {
        String secretName = appProperties.getNewsletter().getSecretName();
        AppProperties.SecretManager smConfig = appProperties.getGoogle().getSecretManager();
        String projectId = smConfig.getProjectId();

        try {
            JsonNode root = loadNewsletterSecret();
            ObjectNode objNode;
            if (root instanceof ObjectNode o) {
                objNode = o;
            } else {
                objNode = objectMapper.createObjectNode();
            }
            objNode.put("canva_refresh_token", newRefreshToken);
            String updatedJson = objectMapper.writeValueAsString(objNode);

            try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
                SecretName parent = SecretName.of(projectId, secretName);
                SecretPayload payload = SecretPayload.newBuilder()
                        .setData(ByteString.copyFromUtf8(updatedJson))
                        .build();
                client.addSecretVersion(parent, payload);
                log.info("[GcpSecretService] Successfully updated rotated refresh token to GCP Secret Manager '{}'", secretName);
                return true;
            }
        } catch (Exception e) {
            log.warn("[GcpSecretService] Failed to auto-update secret in GCP Secret Manager: {}", e.getMessage());
            return false;
        }
    }

    private String findValue(JsonNode node, String... keys) {
        for (String key : keys) {
            if (node.has(key) && !node.get(key).isNull()) {
                String val = node.get(key).asText();
                if (val != null && !val.isBlank()) return val;
            }
        }
        return null;
    }

    public record CanvaCredentials(String clientId, String clientSecret, String refreshToken, String authCode) {}
    public record InstagramCredentials(String accountId, String accessToken, String appId, String appSecret) {
        // 하위호환 편의 생성자
        public InstagramCredentials(String accountId, String accessToken) {
            this(accountId, accessToken, null, null);
        }
    }
}
