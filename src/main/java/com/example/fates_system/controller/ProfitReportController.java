package com.example.fates_system.controller;

import com.example.fates_system.service.ProfitReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/report/profit")
@RequiredArgsConstructor
public class ProfitReportController {

    private final ProfitReportService profitReportService;

    /**
     * 영업이익 데이터 동기화, 보고서 생성 및 엑셀 드라이브 업로드 수동 실행 API
     */
    @PostMapping("/sync")
    public ResponseEntity<ProfitReportService.ReportSyncResult> runProfitReportSync() {
        log.info("[ProfitReportController] 수동 영업이익 보고서 생성 요청 수신");
        ProfitReportService.ReportSyncResult result = profitReportService.syncAndConsolidateData();
        return ResponseEntity.ok(result);
    }
}
