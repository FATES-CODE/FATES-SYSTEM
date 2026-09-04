package com.example.fates_system.controller;

import com.example.fates_system.service.GcpSecretService;
import com.example.fates_system.service.GoogleAuthService;
import com.example.fates_system.service.NewsletterAutomationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/newsletter")
@RequiredArgsConstructor
public class NewsletterController {

    private final NewsletterAutomationService automationService;
    private final GcpSecretService gcpSecretService;
    private final GoogleAuthService googleAuthService;
    private final com.example.fates_system.service.InstagramService instagramService;

    /**
     * 뉴스레터 자동화 파이프라인 수동 즉시 실행
     */
    @PostMapping("/run")
    public ResponseEntity<Map<String, String>> triggerNewsletter() {
        automationService.run();
        return ResponseEntity.ok(Map.of("status", "SUCCESS", "message", "Newsletter automation triggered successfully"));
    }

    /**
     * Instagram Access Token GCP Secret Manager 업데이트 (60일 장기 토큰 자동 교환 시도 후 저장)
     */
    @PostMapping("/update-instagram-token")
    public ResponseEntity<Map<String, String>> updateInstagramToken(@RequestParam String token) {
        boolean ok = instagramService.exchangeAndSaveToken(token);
        if (ok) {
            return ResponseEntity.ok(Map.of("status", "SUCCESS", "message", "Instagram access token exchanged and updated in GCP Secret Manager"));
        } else {
            return ResponseEntity.internalServerError().body(Map.of("status", "ERROR", "message", "Failed to update Instagram token"));
        }
    }

    /**
     * Google 서비스 계정 키 JSON을 로컬 파일에 저장 후 GoogleAuthService 재초기화
     * JSON 전체 내용을 request body로 전송
     */
    @PostMapping(value = "/update-service-account-key", consumes = "application/json")
    public ResponseEntity<Map<String, String>> updateServiceAccountKey(
            @org.springframework.web.bind.annotation.RequestBody String keyJson) {
        try {
            // credentials 디렉토리에 저장
            java.nio.file.Path dir = java.nio.file.Paths.get("credentials");
            java.nio.file.Files.createDirectories(dir);
            java.nio.file.Path keyPath = dir.resolve("service-account.json");
            java.nio.file.Files.writeString(keyPath, keyJson, java.nio.charset.StandardCharsets.UTF_8);

            // GoogleAuthService 재초기화
            googleAuthService.init();
            return ResponseEntity.ok(Map.of("status", "SUCCESS",
                    "message", "Service account key saved and GoogleAuthService reloaded"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("status", "ERROR", "message", e.getMessage()));
        }
    }
}
