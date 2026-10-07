package com.example.fates_system.scheduler;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.service.CklineScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * CK LINE 일본->한국 운항 스케줄 자동 수집 및 구글 시트 동기화 스케줄러
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class CklineScheduleScheduler {

    private final AppProperties appProperties;
    private final CklineScheduleService cklineScheduleService;

    @Scheduled(cron = "${fates.ckline.cron:0 0 9 * * *}")
    public void runCklineScheduleSync() {
        if (!appProperties.getCkline().isEnabled()) {
            log.debug("[CklineScheduleScheduler] CK LINE schedule sync is disabled - skipping");
            return;
        }

        String spreadsheetId = appProperties.getCkline().getSpreadsheetId();
        log.info("[CklineScheduleScheduler] Triggering CK LINE schedule sync (2 months) to Google Sheet '{}'", spreadsheetId);

        try {
            boolean success = cklineScheduleService.syncMonthlySchedulesToSheet(spreadsheetId);
            if (success) {
                log.info("[CklineScheduleScheduler] Successfully completed CK LINE schedule sync.");
            } else {
                log.error("[CklineScheduleScheduler] Failed to sync CK LINE schedule to Google Sheet.");
            }
        } catch (Exception e) {
            log.error("[CklineScheduleScheduler] Unexpected error during CK LINE schedule sync: {}", e.getMessage(), e);
        }
    }
}