package com.example.fates_system.controller;

import com.example.fates_system.service.DailyLogEmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/log-report")
@RequiredArgsConstructor
public class DailyLogController {

    private final DailyLogEmailService dailyLogEmailService;

    /**
     * 일일 로그 리포트 이메일 수동 즉시 발송
     */
    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> triggerLogReport() {
        boolean success = dailyLogEmailService.sendDailyLogEmail();
        if (success) {
            return ResponseEntity.ok(Map.of(
                    "status", "SUCCESS",
                    "message", "Daily log report sent successfully to cloud@fatesinc.com"
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "ERROR",
                    "message", "Failed to send daily log report email"
            ));
        }
    }
}
