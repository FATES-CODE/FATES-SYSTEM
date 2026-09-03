package com.example.fates_system.controller;

import com.example.fates_system.dto.HolidayNoticeResult;
import com.example.fates_system.dto.SignaturePreviewResponse;
import com.example.fates_system.dto.SyncAccountResult;
import com.example.fates_system.dto.SyncExecutionReport;
import com.example.fates_system.service.GoogleCalendarService;
import com.example.fates_system.service.SignatureSyncService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SignatureSyncController {

    private final SignatureSyncService signatureSyncService;
    private final GoogleCalendarService googleCalendarService;

    /**
     * 전체 계정에 대해 서명 및 부재중 자동응답 동기화 실행
     */
    @PostMapping("/sync/run")
    public ResponseEntity<SyncExecutionReport> runAllSync() {
        SyncExecutionReport report = signatureSyncService.syncAllAccounts();
        return ResponseEntity.ok(report);
    }

    /**
     * 특정 계정에 대해 동기화 실행
     */
    @PostMapping("/sync/run/{email}")
    public ResponseEntity<SyncAccountResult> runSingleSync(@PathVariable String email) {
        SyncAccountResult result = signatureSyncService.syncSingleAccount(email);
        return ResponseEntity.ok(result);
    }

    /**
     * 공휴일 안내문구 및 부재중 정보 미리보기
     */
    @GetMapping("/holidays/preview")
    public ResponseEntity<HolidayNoticeResult> previewHolidays(
            @RequestParam(defaultValue = "false") boolean isKorea) {
        HolidayNoticeResult result = googleCalendarService.getUpcomingHolidays(isKorea);
        return ResponseEntity.ok(result);
    }

    /**
     * 서명 갱신 결과 미리보기
     */
    @PostMapping("/signatures/preview")
    public ResponseEntity<SignaturePreviewResponse> previewSignature(
            @RequestBody PreviewRequest request) {
        SignaturePreviewResponse response = signatureSyncService.previewSignature(
                request.getEmail(),
                request.getOriginalSignature()
        );
        return ResponseEntity.ok(response);
    }

    @Data
    public static class PreviewRequest {
        private String email;
        private String originalSignature;
    }
}
