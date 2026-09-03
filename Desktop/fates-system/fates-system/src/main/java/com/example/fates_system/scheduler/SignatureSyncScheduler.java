package com.example.fates_system.scheduler;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.service.SignatureSyncService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@EnableScheduling
@RequiredArgsConstructor
@ConditionalOnProperty(prefix = "fates.scheduler", name = "enabled", havingValue = "true")
public class SignatureSyncScheduler {

    private final SignatureSyncService signatureSyncService;

    @Scheduled(cron = "${fates.scheduler.cron:0 0 1 * * *}")
    public void runScheduledSync() {
        log.info("정기 스케줄러에 의한 메일 서명 및 부재중 자동응답 동기화 실행 시작");
        try {
            signatureSyncService.syncAllAccounts();
            log.info("정기 스케줄러 동기화 완료");
        } catch (Exception e) {
            log.error("정기 스케줄러 동기화 중 에러 발생: {}", e.getMessage(), e);
        }
    }
}
