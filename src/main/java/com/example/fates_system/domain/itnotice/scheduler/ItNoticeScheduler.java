package com.example.fates_system.domain.itnotice.scheduler;

import com.example.fates_system.common.config.AppProperties;
import com.example.fates_system.domain.itnotice.service.ItNoticeEmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * IT Security Notice Scheduler - triggers automatic email sending on the 1st day of every month at 09:00 AM.
 * Controlled by fates.it-notice.enabled and fates.it-notice.cron in application.yml.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ItNoticeScheduler {

    private final AppProperties appProperties;
    private final ItNoticeEmailService itNoticeEmailService;

    @Scheduled(cron = "${fates.it-notice.cron:0 0 9 1 * *}")
    public void runMonthlyItNotice() {
        if (!appProperties.getItNotice().isEnabled()) {
            log.debug("[ItNoticeScheduler] IT Notice automation disabled - skipping");
            return;
        }
        log.info("[ItNoticeScheduler] Monthly trigger fired - sending IT Security Notice email");
        try {
            String messageId = itNoticeEmailService.sendItNoticeEmail();
            if (messageId != null) {
                log.info("[ItNoticeScheduler] Successfully sent monthly IT Notice email. Message ID: {}", messageId);
            } else {
                log.error("[ItNoticeScheduler] Failed to send monthly IT Notice email");
            }
        } catch (Exception e) {
            log.error("[ItNoticeScheduler] Unexpected error during monthly IT Notice execution: {}", e.getMessage(), e);
        }
    }
}
