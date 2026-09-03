package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Newsletter automation pipeline coordinator:
 * 1. Canva source folder -> PDF -> Google Drive
 * 2. Gmail draft creation (with BCC and PDF attachment)
 * 3. (optional) Canva PNG export -> Instagram post
 * 4. Canva design -> archive folder
 * 5. GCP Secret Manager에 변경된 토큰 1회 저장
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NewsletterAutomationService {

    private final AppProperties appProperties;
    private final CanvaService canvaService;
    private final NewsletterEmailService emailService;
    private final InstagramService instagramService;
    private final GcpSecretService gcpSecretService;

    public void run() {
        log.info("=== Newsletter Automation Pipeline START ===");

        // Step 0: Canva 지정 소스 폴더 조회 (새 디자인 확인)
        log.info("[Pipeline] Step 0: Checking Canva source folder for new newsletter design...");
        com.fasterxml.jackson.databind.JsonNode latestDesign = canvaService.checkSourceFolderForDesign();
        if (latestDesign == null) {
            log.info("[Pipeline] No new design found in Canva source folder. Skipping subsequent steps.");
            persistTokensIfChanged();
            return;
        }

        // Step 1: Canva design -> PDF -> (선택적) Drive
        CanvaService.NewsletterResult result = canvaService.processDesign(latestDesign);
        if (result == null) {
            log.error("[Pipeline] Canva PDF processing failed - aborting");
            persistTokensIfChanged();
            return;
        }
        log.info("[Pipeline] Step1 done: \"{}\" ({})", result.title(), result.fileName());

        // Step 2: Gmail draft creation
        boolean isDraftOk = emailService.createDraftsWithAttachment(result.pdfBytes(), result.fileName());
        if (!isDraftOk) {
            log.error("[Pipeline] Email draft creation failed - aborting subsequent steps");
            persistTokensIfChanged();
            return;
        }
        log.info("[Pipeline] Step2 done: Gmail drafts created");

        // Step 3: Instagram post (if enabled)
        AppProperties.Newsletter.Instagram instaCfg = appProperties.getNewsletter().getInstagram();
        if (instaCfg.isEnabled()) {
            List<String> imageUrls = canvaService.exportDesignAsPng(result.designId());
            if (imageUrls == null || imageUrls.isEmpty()) {
                log.warn("[Pipeline] PNG export failed - skipping Instagram, continuing to move");
            } else {
                boolean isInstaOk = instagramService.postNewsletter(imageUrls);
                if (isInstaOk) {
                    log.info("[Pipeline] Step3 done: Instagram post published");
                } else {
                    log.warn("[Pipeline] Instagram post failed - continuing to folder move");
                }
            }
        } else {
            log.info("[Pipeline] Instagram auto-post is disabled");
        }

        // Step 4: Move design to archive
        boolean isMoved = canvaService.moveDesignToArchive(result.designId());
        if (isMoved) {
            log.info("[Pipeline] Step4 done: Design moved to archive");
        } else {
            log.warn("[Pipeline] Folder move failed (all prior steps completed successfully)");
        }

        // Step 5: 변경된 토큰을 GCP Secret Manager에 1회 저장
        persistTokensIfChanged();

        log.info("=== Newsletter Automation Pipeline COMPLETE ===");
    }

    /**
     * 파이프라인 실행 중 메모리에 캐시된 토큰이 변경되었으면 GCP Secret Manager에 1회만 저장
     */
    private void persistTokensIfChanged() {
        boolean canvaChanged = canvaService.isRefreshTokenChanged();
        String instaToken = instagramService.getCachedInstagramToken();

        if (!canvaChanged && instaToken == null) {
            log.info("[Pipeline] No token changes to persist");
            return;
        }

        try {
            if (canvaChanged) {
                gcpSecretService.updateCanvaRefreshToken(canvaService.getCachedRefreshToken());
                log.info("[Pipeline] Canva refresh token persisted to GCP Secret Manager");
            }
            if (instaToken != null) {
                gcpSecretService.updateInstagramAccessToken(instaToken);
                log.info("[Pipeline] Instagram access token persisted to GCP Secret Manager");
            }
        } catch (Exception e) {
            log.warn("[Pipeline] Token persistence to GCP failed: {}", e.getMessage());
        }
    }
}
