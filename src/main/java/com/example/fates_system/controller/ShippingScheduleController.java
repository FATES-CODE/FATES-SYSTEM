package com.example.fates_system.controller;

import com.example.fates_system.dto.CarrierInfoDto;
import com.example.fates_system.dto.ShippingScheduleSummaryDto;
import com.example.fates_system.service.ShippingScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/shipping")
@RequiredArgsConstructor
public class ShippingScheduleController {

    private final ShippingScheduleService shippingScheduleService;

    /**
     * 지원 선사 목록 조회
     */
    @GetMapping("/carriers")
    public ResponseEntity<Map<String, List<CarrierInfoDto>>> getCarriers() {
        return ResponseEntity.ok(Map.of("carriers", shippingScheduleService.getCarriers()));
    }

    /**
     * 일본->한국 출항 선박 스케줄 조회 (기본 2개월치, 2시간 인메모리 캐시 적용)
     * 예: GET /api/v1/shipping/schedules?carriers=HMM,CK LINE&months=2
     * 캐시 강제 갱신: GET /api/v1/shipping/schedules?refresh=true
     */
    @GetMapping("/schedules")
    public ResponseEntity<ShippingScheduleSummaryDto> getSchedules(
            @RequestParam(value = "carriers", required = false) String carriersParam,
            @RequestParam(value = "months", required = false) Integer months,
            @RequestParam(value = "refresh", defaultValue = "false") boolean refresh) {

        List<String> requestedCarriers = null;
        if (carriersParam != null && !carriersParam.isBlank()) {
            requestedCarriers = Arrays.asList(carriersParam.split(","));
        }

        ShippingScheduleSummaryDto result = shippingScheduleService.fetchSchedules(requestedCarriers, months, refresh);
        return ResponseEntity.ok(result);
    }

    /**
     * 구글 시트(shipping-date) 최신 선박 스케줄 동기화 (기본 2개월치)
     */
    @PostMapping("/update-sheet")
    public ResponseEntity<Map<String, String>> updateGoogleSheet(
            @RequestParam(value = "spreadsheetId", required = false) String spreadsheetId,
            @RequestParam(value = "months", required = false) Integer months) {

        boolean ok = shippingScheduleService.updateShippingGoogleSheet(spreadsheetId, months);
        if (ok) {
            return ResponseEntity.ok(Map.of(
                    "status", "SUCCESS",
                    "message", "Shipping schedules updated into Google Sheet successfully"
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "ERROR",
                    "message", "Failed to update Google Sheet with shipping schedules"
            ));
        }
    }
}
