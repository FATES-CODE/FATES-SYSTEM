package com.example.fates_system.scheduler;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.service.DailyLogEmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Daily Log Report Scheduler - triggers automatic daily log report email to cloud@fatesinc.com
 * Every day at 00:00:00 (Midnight).
 * Controlled by fates.daily-log-report.enabled and fates.daily-log-report.cron in application.yml.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DailyLogScheduler {

    private final AppProperties appProperties;
    private final DailyLogEmailService dailyLogEmailService;

    @Scheduled(cron = "${fates.daily-log-report.cron:0 0 0 * * *}")
    public void runDailyLogReport() {
        if (!appProperties.getDailyLogReport().isEnabled()) {
            log.debug("[DailyLogScheduler] Daily log report is disabled - skipping");
            return;
        }

        log.info("[DailyLogScheduler] Midnight trigger fired - sending daily log report to {}",
                appProperties.getDailyLogReport().getRecipient());

        try {
            boolean success = dailyLogEmailService.sendDailyLogEmail();
            if (success) {
                log.info("[DailyLogScheduler] Successfully sent daily log report email.");
            } else {
                log.error("[DailyLogScheduler] Failed to send daily log report email.");
            }
        } catch (Exception e) {
            log.error("[DailyLogScheduler] Unexpected error during daily log report: {}", e.getMessage(), e);
        }
    }
}
