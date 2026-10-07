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
    private final Cafe24BoardService cafe24BoardService;
    private final InstagramService instagramService;

    public void run() {
        log.info("=== Newsletter Automation Pipeline START ===");

        // Step 0: Canva 지정 소스 폴더 조회 (새 디자인 확인)
        log.info("[Pipeline] Step 0: Checking Canva source folder for new newsletter design...");
        com.fasterxml.jackson.databind.JsonNode latestDesign = canvaService.checkSourceFolderForDesign();
        if (latestDesign == null) {
            log.info("[Pipeline] No new design found in Canva source folder. Skipping subsequent steps.");
            return;
        }

        // Step 1: Canva design -> PDF -> (선택적) Drive
        CanvaService.NewsletterResult result = canvaService.processDesign(latestDesign);
        if (result == null) {
            log.error("[Pipeline] Canva PDF processing failed - aborting");
            return;
        }
        log.info("[Pipeline] Step1 done: \"{}\" ({})", result.title(), result.fileName());

        // Step 2: Gmail draft creation
        boolean isDraftOk = emailService.createDraftsWithAttachment(result.pdfBytes(), result.fileName());
        if (!isDraftOk) {
            log.error("[Pipeline] Email draft creation failed - aborting subsequent steps");
            return;
        }
        log.info("[Pipeline] Step2 done: Gmail drafts created");

        // Step 2-0: Automatic sequential draft sending (if enabled)
        AppProperties.Newsletter.Email emailCfg = appProperties.getNewsletter().getEmail();
        if (emailCfg.isAutoSend()) {
            log.info("[Pipeline] Auto-send is enabled. Starting sequential draft sending (delay: {}s)...",
                    emailCfg.getDraftSendDelaySeconds());
            NewsletterEmailService.SendDraftsResult sendResult =
                    emailService.sendPendingDrafts(emailCfg.getDraftSendDelaySeconds());
            log.info("[Pipeline] Step 2-0 done: Email auto-send result -> sent={}, failed={}, remaining={}, message={}",
                    sendResult.sent(), sendResult.failed(), sendResult.remaining(), sendResult.message());
        } else {
            log.info("[Pipeline] Auto-send is disabled. Drafts kept in Gmail for manual review.");
        }

        // Step 2-1: Cafe24 JcBoard auto-upload (if enabled)
        AppProperties.Newsletter.Cafe24 cafe24Cfg = appProperties.getNewsletter().getCafe24();
        if (cafe24Cfg.isEnabled()) {
            boolean isCafe24Ok = cafe24BoardService.uploadNewsletter(result.pdfBytes(), result.fileName(), result.title());
            if (isCafe24Ok) {
                log.info("[Pipeline] Step 2-1 done: Cafe24 board post uploaded successfully");
            } else {
                log.warn("[Pipeline] Cafe24 board upload failed - continuing subsequent steps");
            }
        } else {
            log.info("[Pipeline] Cafe24 board auto-upload is disabled");
        }

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

        log.info("=== Newsletter Automation Pipeline COMPLETE ===");
    }
}
