package com.example.fates_system.scheduler;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.service.NewsletterAutomationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Newsletter scheduler - triggers automation every hour on the hour.
 * Controlled by fates.newsletter.enabled in application.yml.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class NewsletterScheduler {

    private final AppProperties appProperties;
    private final NewsletterAutomationService automationService;

    @Scheduled(cron = "${fates.newsletter.cron:0 0 * * * *}")
    public void runNewsletterAutomation() {
        if (!appProperties.getNewsletter().isEnabled()) {
            log.debug("[NewsletterScheduler] Newsletter automation disabled - skipping");
            return;
        }
        log.info("[NewsletterScheduler] Trigger fired - starting automation");
        try {
            automationService.run();
        } catch (Exception e) {
            log.error("[NewsletterScheduler] Unexpected error: {}", e.getMessage(), e);
        }
    }
}
