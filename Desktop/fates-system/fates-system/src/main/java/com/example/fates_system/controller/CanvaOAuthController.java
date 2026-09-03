package com.example.fates_system.controller;

import com.example.fates_system.service.CanvaService;
import com.example.fates_system.service.GcpSecretService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RestController
@RequestMapping("/api/v1/newsletter/canva")
@RequiredArgsConstructor
public class CanvaOAuthController {

    private final GcpSecretService gcpSecretService;
    private final CanvaService canvaService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newHttpClient();

    private final Map<String, OAuthSession> stateToSession = new ConcurrentHashMap<>();

    private static final String CANVA_AUTH_URL = "https://www.canva.com/api/oauth/authorize";
    private static final String CANVA_TOKEN_URL = "https://api.canva.com/rest/v1/oauth/token";
    private static final String SCOPES = "design:permission:read design:meta:read folder:write folder:read folder:permission:read design:content:read";
    private static final String DEFAULT_REDIRECT_URI = "http://127.0.0.1:8080/api/v1/newsletter/canva/callback";

    @GetMapping("/auth-url")
    public ResponseEntity<Map<String, String>> getAuthUrl(
            @RequestParam(required = false) String redirectUri) {
        String uriToUse = (redirectUri != null && !redirectUri.isBlank()) ? redirectUri : DEFAULT_REDIRECT_URI;
        GcpSecretService.CanvaCredentials creds = gcpSecretService.getCanvaCredentials();
        if (creds == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "GCP Secret Manager에서 Canva client_id를 가져오지 못했습니다."));
        }
        String verifier = generateCodeVerifier();
        String challenge = generateCodeChallenge(verifier);
        String state = generateState();
        stateToSession.put(state, new OAuthSession(verifier, uriToUse));
        String url = CANVA_AUTH_URL
                + "?client_id=" + URLEncoder.encode(creds.clientId(), StandardCharsets.UTF_8)
                + "&response_type=code"
                + "&redirect_uri=" + URLEncoder.encode(uriToUse, StandardCharsets.UTF_8)
                + "&scope=" + URLEncoder.encode(SCOPES, StandardCharsets.UTF_8)
                + "&code_challenge=" + URLEncoder.encode(challenge, StandardCharsets.UTF_8)
                + "&code_challenge_method=S256"
                + "&state=" + URLEncoder.encode(state, StandardCharsets.UTF_8);
        return ResponseEntity.ok(Map.of(
                "authUrl", url,
                "redirectUriUsed", uriToUse,
                "state", state,
                "verifier", verifier,
                "instructions", "위 authUrl을 브라우저에서 열어 Canva 인증을 진행하세요."
        ));
    }

    @GetMapping("/callback")
    public ResponseEntity<String> callback(
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String error,
            @RequestParam(required = false) String error_description) {
        if (error != null) {
            return ResponseEntity.badRequest().body("<h1>Canva 인증 실패</h1><p>" + error + ": " + error_description + "</p>");
        }
        if (code == null || state == null) {
            return ResponseEntity.badRequest().body("<h1>필수 파라미터 누락</h1><p>code 또는 state가 전달되지 않았습니다.</p>");
        }
        OAuthSession session = stateToSession.remove(state);
        if (session == null) {
            return ResponseEntity.badRequest().body("<h1>만료되었거나 유효하지 않은 state입니다.</h1><p>/auth-url 을 다시 호출해주세요.</p>");
        }
        return exchangeToken(code, session.verifier(), session.redirectUri());
    }

    @GetMapping("/exchange")
    public ResponseEntity<String> manualExchange(
            @RequestParam String code,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String verifier,
            @RequestParam(defaultValue = DEFAULT_REDIRECT_URI) String redirectUri) {
        String codeVerifier = verifier;
        String uriToUse = redirectUri;
        if (state != null && stateToSession.containsKey(state)) {
            OAuthSession session = stateToSession.remove(state);
            codeVerifier = session.verifier();
            uriToUse = session.redirectUri();
        }
        if (codeVerifier == null || codeVerifier.isBlank()) {
            return ResponseEntity.badRequest().body("<h1>verifier 누락</h1><p>state 또는 verifier 파라미터가 필요합니다.</p>");
        }
        return exchangeToken(code, codeVerifier, uriToUse);
    }

    private ResponseEntity<String> exchangeToken(String code, String verifier, String redirectUri) {
        GcpSecretService.CanvaCredentials creds = gcpSecretService.getCanvaCredentials();
        String authHeader = Base64.getEncoder().encodeToString(
                (creds.clientId() + ":" + creds.clientSecret()).getBytes(StandardCharsets.UTF_8));
        String body = "grant_type=authorization_code"
                + "&code=" + URLEncoder.encode(code, StandardCharsets.UTF_8)
                + "&redirect_uri=" + URLEncoder.encode(redirectUri, StandardCharsets.UTF_8)
                + "&code_verifier=" + URLEncoder.encode(verifier, StandardCharsets.UTF_8);
        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(CANVA_TOKEN_URL))
                    .header("Authorization", "Basic " + authHeader)
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();
            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            JsonNode json = objectMapper.readTree(res.body());
            if (json.has("refresh_token")) {
                String refreshToken = json.get("refresh_token").asText();
                canvaService.setCachedRefreshToken(refreshToken);
                log.info("[CanvaOAuth] New refresh_token generated: {}", refreshToken);

                // GCP Secret Manager에 자동 저장 (서버 재시작 후에도 영구 유지)
                boolean savedToGcp = gcpSecretService.updateCanvaRefreshToken(refreshToken);
                String gcpStatus = savedToGcp
                        ? "✅ GCP Secret Manager에 자동으로 영구 저장되었습니다! 서버 재시작 후에도 유효합니다."
                        : "⚠️ GCP 자동 저장 실패 - 아래 토큰을 직접 FATESNEWSLETTER 시크릿에 저장해 주세요.";

                String html = "<html><body style='font-family:sans-serif;padding:30px;line-height:1.6;'>"
                        + "<h2 style='color:#2e7d32;'>Canva 인증 및 새 Refresh Token 발급 성공!</h2>"
                        + "<p style='background:" + (savedToGcp ? "#e8f5e9" : "#fff3e0") + ";padding:12px;border-radius:4px;'>" + gcpStatus + "</p>"
                        + "<p>새로운 <b>Refresh Token</b>이 서버 메모리에 즉시 적용되었습니다.</p>"
                        + "<p>Refresh Token (참고용):</p>"
                        + "<textarea style='width:100%;height:100px;font-family:monospace;' readonly>" + refreshToken + "</textarea>"
                        + "<p><br/><a href='/api/v1/newsletter/run' style='padding:10px 20px;background:#1976d2;color:white;text-decoration:none;border-radius:4px;'>뉴스레터 파이프라인 즉시 실행하기</a></p>"
                        + "</body></html>";
                return ResponseEntity.ok(html);
            } else {
                return ResponseEntity.badRequest().body("<h1>토큰 교환 실패 (" + res.statusCode() + ")</h1><pre>" + res.body() + "</pre>");
            }
        } catch (Exception e) {
            log.error("[CanvaOAuth] Exception: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("<h1>서버 오류</h1><pre>" + e.getMessage() + "</pre>");
        }
    }

    private String generateCodeVerifier() {
        byte[] bytes = new byte[32];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String generateCodeChallenge(String verifier) {
        try {
            byte[] bytes = verifier.getBytes(StandardCharsets.US_ASCII);
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(bytes);
            return Base64.getUrlEncoder().withoutPadding().encodeToString(digest);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    private String generateState() {
        byte[] bytes = new byte[16];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private record OAuthSession(String verifier, String redirectUri) {}
}
