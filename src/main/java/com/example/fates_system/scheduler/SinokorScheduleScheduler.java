package com.example.fates_system.scheduler;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.service.SinokorScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * SINOKOR 일본->한국 운항 스케줄 자동 수집 및 구글 시트(SNK 탭) 동기화 스케줄러
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class SinokorScheduleScheduler {

    private final AppProperties appProperties;
    private final SinokorScheduleService sinokorScheduleService;

    @Scheduled(cron = "${fates.sinokor.cron:0 0 9 * * *}")
    public void runSinokorScheduleSync() {
        if (!appProperties.getSinokor().isEnabled()) {
            log.debug("[SinokorScheduleScheduler] SINOKOR schedule sync is disabled - skipping");
            return;
        }

        String spreadsheetId = appProperties.getSinokor().getSpreadsheetId();
        log.info("[SinokorScheduleScheduler] Triggering SINOKOR schedule sync (Japan -> Korea, 2 months) to Google Sheet SNK tab '{}'", spreadsheetId);

        try {
            boolean success = sinokorScheduleService.syncMonthlySchedulesToSheet(spreadsheetId);
            if (success) {
                log.info("[SinokorScheduleScheduler] Successfully completed SINOKOR schedule sync to SNK tab.");
            } else {
                log.error("[SinokorScheduleScheduler] Failed to sync SINOKOR schedule to Google Sheet SNK tab.");
            }
        } catch (Exception e) {
            log.error("[SinokorScheduleScheduler] Unexpected error during SINOKOR schedule sync: {}", e.getMessage(), e);
        }
    }
}
