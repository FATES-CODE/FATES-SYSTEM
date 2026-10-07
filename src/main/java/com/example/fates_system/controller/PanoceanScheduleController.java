package com.example.fates_system.controller;

import com.example.fates_system.dto.PanoceanScheduleDto;
import com.example.fates_system.service.PanoceanScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/panocean")
@RequiredArgsConstructor
public class PanoceanScheduleController {

    private final PanoceanScheduleService panoceanScheduleService;

    /**
     * PANOCEAN 일본->한국 운항 스케줄 (기본 2달치) 수집 후 구글 스프레드시트 PANOCEAN 시트에 저장
     */
    @PostMapping("/sync")
    public ResponseEntity<Map<String, Object>> syncToGoogleSheet(
            @RequestParam(required = false) String spreadsheetId,
            @RequestParam(required = false, defaultValue = "2") Integer months) {

        String targetId = spreadsheetId != null && !spreadsheetId.isBlank()
                ? spreadsheetId : PanoceanScheduleService.DEFAULT_SPREADSHEET_ID;

        int fetchMonths = (months != null && months > 0) ? months : 2;
        boolean success = panoceanScheduleService.syncSchedulesToSheet(targetId, fetchMonths);

        if (success) {
            return ResponseEntity.ok(Map.of(
                    "status", "SUCCESS",
                    "message", "Successfully fetched " + fetchMonths + " months of PANOCEAN schedules (Japan -> Korea) and updated Google Sheet (PANOCEAN tab)",
                    "months", fetchMonths,
                    "spreadsheetId", targetId
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "ERROR",
                    "message", "Failed to update Google Sheet. Please ensure Google Service Account has Editor permission on the sheet.",
                    "spreadsheetId", targetId
            ));
        }
    }

    /**
     * PANOCEAN 일본->한국 운항 스케줄 JSON 조회 (기본 2달치, 시트 저장 없이 조회만 수행)
     */
    @GetMapping("/schedules")
    public ResponseEntity<Map<String, Object>> getSchedules(
            @RequestParam(required = false) String ym,
            @RequestParam(required = false, defaultValue = "2") Integer months) {

        YearMonth targetYm = YearMonth.now();
        if (ym != null && !ym.isBlank()) {
            try {
                targetYm = YearMonth.parse(ym);
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "ERROR",
                        "message", "Invalid format for ym. Expected 'yyyy-MM', e.g. 2026-10"
                ));
            }
        }

        int fetchMonths = (months != null && months > 0) ? months : 2;
        List<PanoceanScheduleDto> list = panoceanScheduleService.fetchSchedules(targetYm, fetchMonths);

        return ResponseEntity.ok(Map.of(
                "status", "SUCCESS",
                "count", list.size(),
                "startMonth", targetYm.toString(),
                "months", fetchMonths,
                "schedules", list
        ));
    }
}
