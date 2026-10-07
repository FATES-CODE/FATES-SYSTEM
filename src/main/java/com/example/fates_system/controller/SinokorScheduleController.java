package com.example.fates_system.controller;

import com.example.fates_system.dto.SinokorScheduleDto;
import com.example.fates_system.service.SinokorScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/sinokor")
@RequiredArgsConstructor
public class SinokorScheduleController {

    private final SinokorScheduleService sinokorScheduleService;

    /**
     * SINOKOR 일본->한국 운항 스케줄 (기본 2달치) 수집 후 구글 스프레드시트 SNK 시트에 저장
     */
    @PostMapping("/sync")
    public ResponseEntity<Map<String, Object>> syncToGoogleSheet(
            @RequestParam(required = false) String spreadsheetId,
            @RequestParam(required = false, defaultValue = "2") Integer months) {

        String targetId = spreadsheetId != null && !spreadsheetId.isBlank()
                ? spreadsheetId : SinokorScheduleService.DEFAULT_SPREADSHEET_ID;

        int fetchMonths = (months != null && months > 0) ? months : 2;
        boolean success = sinokorScheduleService.syncSchedulesToSheet(targetId, fetchMonths);

        if (success) {
            return ResponseEntity.ok(Map.of(
                    "status", "SUCCESS",
                    "message", "Successfully fetched " + fetchMonths + " months of SINOKOR schedules (Japan -> Korea) and updated Google Sheet (SNK tab)",
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
     * SINOKOR 일본->한국 운항 스케줄 JSON 조회 (기본 2달치, 시트 저장 없이 조회만 수행)
     */
    @GetMapping("/schedules")
    public ResponseEntity<Map<String, Object>> getSchedules(
            @RequestParam(required = false) String ym,
            @RequestParam(required = false, defaultValue = "2") Integer months) {

        YearMonth targetYm = YearMonth.now();
        if (ym != null && !ym.isBlank()) {
            try {
                targetYm = YearMonth.parse(ym);
            } catch (Exception ignored) {
            }
        }

        int fetchMonths = (months != null && months > 0) ? months : 2;
        List<SinokorScheduleDto> schedules = sinokorScheduleService.fetchSchedules(targetYm, fetchMonths);

        return ResponseEntity.ok(Map.of(
                "status", "SUCCESS",
                "startYearMonth", targetYm.toString(),
                "months", fetchMonths,
                "totalCount", schedules.size(),
                "schedules", schedules
        ));
    }
}
