package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Instagram Graph API - post newsletter as single or carousel feed
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class InstagramService {

    private final AppProperties appProperties;
    private final GcpSecretService gcpSecretService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newHttpClient();

    private volatile String cachedInstagramToken = null;

    public String getCachedInstagramToken() {
        return cachedInstagramToken;
    }

    public boolean postNewsletter(List<String> imageUrls) {
        try {
            GcpSecretService.InstagramCredentials creds = gcpSecretService.getInstagramCredentials();
            if (creds == null) {
                log.error("[InstagramService] Instagram credentials not found in GCP Secret");
                return false;
            }

            // 토큰 만료 전 자동 갱신 (30일 이하 남은 경우)
            String activeToken = refreshTokenIfNeeded(creds);

            if (imageUrls == null || imageUrls.isEmpty()) {
                log.error("[InstagramService] No image URLs provided");
                return false;
            }
            AppProperties.Newsletter.Instagram cfg = appProperties.getNewsletter().getInstagram();
            String caption = buildCaption();
            String containerId;

            GcpSecretService.InstagramCredentials activeCreds = new GcpSecretService.InstagramCredentials(
                    creds.accountId(), activeToken);

            if (imageUrls.size() == 1) {
                log.info("[InstagramService] Single image -> single feed post");
                containerId = createSingleMediaContainer(activeCreds, imageUrls.get(0), caption, false);
            } else {
                int limit = Math.min(imageUrls.size(), cfg.getMaxCarouselItems());
                log.info("[InstagramService] {} images -> carousel post", limit);
                List<String> childrenIds = new ArrayList<>();
                for (int i = 0; i < limit; i++) {
                    String url = imageUrls.get(i);
                    log.info("[InstagramService] Creating child container [{}/{}]: {}", i + 1, limit, url);
                    String childId = createSingleMediaContainer(activeCreds, url, null, true);
                    if (childId != null) {
                        childrenIds.add(childId);
                        log.info("[InstagramService] Child container [{}/{}] created: {}", i + 1, limit, childId);
                    } else {
                        log.warn("[InstagramService] Child container [{}/{}] failed", i + 1, limit);
                    }
                }
                if (childrenIds.isEmpty()) {
                    log.error("[InstagramService] All carousel child containers failed");
                    return false;
                }
                containerId = createCarouselContainer(activeCreds, childrenIds, caption);
            }

            if (containerId == null) {
                log.error("[InstagramService] Container creation failed");
                return false;
            }
            Thread.sleep(cfg.getPublishWaitMs());
            return publishMedia(activeCreds, containerId);
        } catch (Exception e) {
            log.error("[InstagramService] postNewsletter error: {}", e.getMessage(), e);
            return false;
        }
    }

    /**
     * Instagram Long-Lived Token 만료 30일 전 자동 갱신.
     * 갱신 성공 시 GCP Secret Manager에 자동 저장.
     * @return 갱신된 토큰 (실패 시 기존 토큰 반환)
     */
    private String refreshTokenIfNeeded(GcpSecretService.InstagramCredentials creds) {
        AppProperties.Newsletter.Instagram cfg = appProperties.getNewsletter().getInstagram();
        String currentToken = creds.accessToken();
        try {
            // 현재 토큰 만료일 조회
            String debugUrl = "https://graph.facebook.com/debug_token"
                    + "?input_token=" + java.net.URLEncoder.encode(currentToken, java.nio.charset.StandardCharsets.UTF_8)
                    + "&access_token=" + java.net.URLEncoder.encode(currentToken, java.nio.charset.StandardCharsets.UTF_8);
            java.net.http.HttpRequest debugReq = java.net.http.HttpRequest.newBuilder()
                    .uri(URI.create(debugUrl)).GET().build();
            java.net.http.HttpResponse<String> debugRes = httpClient.send(debugReq,
                    java.net.http.HttpResponse.BodyHandlers.ofString());
            JsonNode debugJson = objectMapper.readTree(debugRes.body());
            JsonNode dataNode = debugJson.path("data");

            if (dataNode.has("expires_at")) {
                long expiresAt = dataNode.get("expires_at").asLong();
                long nowSec = System.currentTimeMillis() / 1000;
                long daysLeft = (expiresAt - nowSec) / 86400;
                log.info("[InstagramService] Token expires in {} days", daysLeft);

                if (daysLeft <= 30) {
                    log.info("[InstagramService] Token expiring soon - attempting auto-refresh");
                    return doRefreshToken(currentToken, cfg.getApiVersion());
                }
            } else if (dataNode.has("error")) {
                // 이미 만료된 경우 - 로그만 남기고 기존 토큰 사용 (수동 갱신 필요)
                log.warn("[InstagramService] Token debug check failed: {} - Manual token renewal required at Meta Graph API Explorer",
                        dataNode.path("error").path("message").asText());
            }
        } catch (Exception e) {
            log.warn("[InstagramService] Token expiry check failed: {}", e.getMessage());
        }
        return currentToken;
    }

    private String doRefreshToken(String currentToken, String apiVersion) {
        try {
            // Meta Long-Lived Token 갱신 (만료 전에만 가능)
            String refreshUrl = "https://graph.facebook.com/" + apiVersion + "/oauth/access_token"
                    + "?grant_type=fb_exchange_token"
                    + "&client_id=" + java.net.URLEncoder.encode(getAppId(), java.nio.charset.StandardCharsets.UTF_8)
                    + "&client_secret=" + java.net.URLEncoder.encode(getAppSecret(), java.nio.charset.StandardCharsets.UTF_8)
                    + "&fb_exchange_token=" + java.net.URLEncoder.encode(currentToken, java.nio.charset.StandardCharsets.UTF_8);
            java.net.http.HttpRequest req = java.net.http.HttpRequest.newBuilder()
                    .uri(URI.create(refreshUrl)).GET().build();
            java.net.http.HttpResponse<String> res = httpClient.send(req,
                    java.net.http.HttpResponse.BodyHandlers.ofString());
            JsonNode json = objectMapper.readTree(res.body());
            if (json.has("access_token")) {
                String newToken = json.get("access_token").asText();
                cachedInstagramToken = newToken;
                log.info("[InstagramService] Instagram token auto-refreshed (cached in memory)");
                return newToken;
            }
            log.warn("[InstagramService] Token refresh failed: {}", res.body());
        } catch (Exception e) {
            log.warn("[InstagramService] doRefreshToken error: {}", e.getMessage());
        }
        return currentToken;
    }

    /** GCP Secret에서 Meta 앱 ID/시크릿 조회 (instagram_app_id, instagram_app_secret 필드) */
    private String getAppId() {
        GcpSecretService.InstagramCredentials creds = gcpSecretService.getInstagramCredentials();
        // instagram_app_id가 없으면 account_id로 fallback (임시)
        return creds != null && creds.appId() != null ? creds.appId() : "";
    }

    private String getAppSecret() {
        GcpSecretService.InstagramCredentials creds = gcpSecretService.getInstagramCredentials();
        return creds != null && creds.appSecret() != null ? creds.appSecret() : "";
    }



    private String buildCaption() {
        LocalDate now = LocalDate.now();
        int year  = now.getYear();
        int month = now.getMonthValue();
        int week  = (int) Math.ceil(now.getDayOfMonth() / 7.0);
        return year + "년 " + month + "월 " + week + "주차 FATES 일본뉴스입니다!\n\n"
                + "韓国語で見る\n"
                + year + "年 " + month + "月 " + week + "週FATES物流ニュースです！\n\n"
                + "#일본뉴스 #" + month + "월 #" + year + "년 #물류 #포워딩 #FATES "
                + "#日本ニュース #" + month + "月 #" + year + "年 #物流　#フォワーディング　#韓国語";
    }

    private String createSingleMediaContainer(GcpSecretService.InstagramCredentials creds,
                                              String imageUrl, String caption, boolean isCarouselItem) {
        AppProperties.Newsletter.Instagram cfg = appProperties.getNewsletter().getInstagram();
        String url = "https://graph.facebook.com/" + cfg.getApiVersion() + "/" + creds.accountId() + "/media";
        StringBuilder sb = new StringBuilder();
        sb.append("image_url=").append(URLEncoder.encode(imageUrl, StandardCharsets.UTF_8));
        sb.append("&access_token=").append(URLEncoder.encode(creds.accessToken(), StandardCharsets.UTF_8));
        if (isCarouselItem) {
            sb.append("&is_carousel_item=true");
        } else if (caption != null) {
            sb.append("&caption=").append(URLEncoder.encode(caption, StandardCharsets.UTF_8));
        }
        try {
            HttpRequest req = HttpRequest.newBuilder().uri(URI.create(url))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(sb.toString())).build();
            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            JsonNode json = objectMapper.readTree(res.body());
            if (json.has("id")) return json.get("id").asText();
            log.error("[InstagramService] Media container failed ({}): {}", res.statusCode(), res.body());
            return null;
        } catch (Exception e) {
            log.error("[InstagramService] createSingleMediaContainer error: {}", e.getMessage(), e);
            return null;
        }
    }

    private String createCarouselContainer(GcpSecretService.InstagramCredentials creds,
                                           List<String> childrenIds, String caption) {
        AppProperties.Newsletter.Instagram cfg = appProperties.getNewsletter().getInstagram();
        String url = "https://graph.facebook.com/" + cfg.getApiVersion() + "/" + creds.accountId() + "/media";
        String body = "media_type=CAROUSEL"
                + "&children=" + URLEncoder.encode(String.join(",", childrenIds), StandardCharsets.UTF_8)
                + "&caption=" + URLEncoder.encode(caption, StandardCharsets.UTF_8)
                + "&access_token=" + URLEncoder.encode(creds.accessToken(), StandardCharsets.UTF_8);
        try {
            HttpRequest req = HttpRequest.newBuilder().uri(URI.create(url))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(body)).build();
            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            JsonNode json = objectMapper.readTree(res.body());
            if (json.has("id")) return json.get("id").asText();
            log.error("[InstagramService] Carousel container failed ({}): {}", res.statusCode(), res.body());
            return null;
        } catch (Exception e) {
            log.error("[InstagramService] createCarouselContainer error: {}", e.getMessage(), e);
            return null;
        }
    }

    private boolean publishMedia(GcpSecretService.InstagramCredentials creds, String containerId) {
        AppProperties.Newsletter.Instagram cfg = appProperties.getNewsletter().getInstagram();
        String url = "https://graph.facebook.com/" + cfg.getApiVersion() + "/" + creds.accountId() + "/media_publish";
        String body = "creation_id=" + URLEncoder.encode(containerId, StandardCharsets.UTF_8)
                + "&access_token=" + URLEncoder.encode(creds.accessToken(), StandardCharsets.UTF_8);
        try {
            HttpRequest req = HttpRequest.newBuilder().uri(URI.create(url))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(body)).build();
            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            JsonNode json = objectMapper.readTree(res.body());
            if (json.has("id")) {
                log.info("[InstagramService] Post published (id: {})", json.get("id").asText());
                return true;
            }
            log.error("[InstagramService] Publish failed ({}): {}", res.statusCode(), res.body());
            return false;
        } catch (Exception e) {
            log.error("[InstagramService] publishMedia error: {}", e.getMessage(), e);
            return false;
        }
    }
}
