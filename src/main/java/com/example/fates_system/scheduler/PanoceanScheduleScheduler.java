package com.example.fates_system.scheduler;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.service.PanoceanScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * PANOCEAN 일본->한국 운항 스케줄 자동 수집 및 구글 시트(PANOCEAN 탭) 동기화 스케줄러
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class PanoceanScheduleScheduler {

    private final AppProperties appProperties;
    private final PanoceanScheduleService panoceanScheduleService;

    @Scheduled(cron = "${fates.panocean.cron:0 10 9 * * *}")
    public void runPanoceanScheduleSync() {
        if (!appProperties.getPanocean().isEnabled()) {
            log.debug("[PanoceanScheduleScheduler] PANOCEAN schedule sync is disabled - skipping");
            return;
        }

        String spreadsheetId = appProperties.getPanocean().getSpreadsheetId();
        log.info("[PanoceanScheduleScheduler] Triggering PANOCEAN schedule sync (Japan -> Korea, 2 months) to Google Sheet PANOCEAN tab '{}'", spreadsheetId);

        try {
            boolean success = panoceanScheduleService.syncMonthlySchedulesToSheet(spreadsheetId);
            if (success) {
                log.info("[PanoceanScheduleScheduler] Successfully completed PANOCEAN schedule sync to PANOCEAN tab.");
            } else {
                log.error("[PanoceanScheduleScheduler] Failed to sync PANOCEAN schedule to Google Sheet PANOCEAN tab.");
            }
        } catch (Exception e) {
            log.error("[PanoceanScheduleScheduler] Unexpected error during PANOCEAN schedule sync: {}", e.getMessage(), e);
        }
    }
}
