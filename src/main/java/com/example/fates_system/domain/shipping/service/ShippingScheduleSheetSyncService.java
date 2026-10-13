package com.example.fates_system.domain.shipping.service;

import com.example.fates_system.domain.shipping.dto.ShippingScheduleSummaryDto;
import com.example.fates_system.domain.shipping.dto.VesselScheduleDto;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ClearValuesRequest;
import com.google.api.services.sheets.v4.model.ValueRange;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 선박 스케줄 수집 결과를 Google Sheets에 동기화하는 서비스
 */
@Slf4j
@Service
public class ShippingScheduleSheetSyncService {

    /**
     * 구글 시트 (shipping-date) 헤더 작성 및 스케줄 데이터 일괄 업데이트
     */
    public boolean syncSchedulesToSheet(Sheets sheetsClient, String targetSpreadsheetId, ShippingScheduleSummaryDto summary) {
        try {
            // A1:J5000 범위 클리어 (1~2개월치 대량 데이터 반영)
            try {
                sheetsClient.spreadsheets().values()
                        .clear(targetSpreadsheetId, "A1:J5000", new ClearValuesRequest())
                        .execute();
            } catch (Exception e) {
                log.warn("[ShippingScheduleSheetSyncService] Sheet clear warning: {}", e.getMessage());
            }

            List<List<Object>> rows = new ArrayList<>();
            // 헤더 작성 (출발항 POL, 도착항 POD, Original ETA 추가)
            rows.add(List.of("선사", "선박명", "선박번호", "출발항(POL)", "도착항(POD)", "Original ETA", "Arrival", "Berthing", "Sailing", "터미널"));

            for (VesselScheduleDto item : summary.getSchedules()) {
                rows.add(List.of(
                        item.getCarrier() != null ? item.getCarrier() : "",
                        item.getVesselName() != null ? item.getVesselName() : "",
                        item.getVoyage() != null ? item.getVoyage() : "",
                        item.getPol() != null ? item.getPol() : "",
                        item.getPod() != null ? item.getPod() : "",
                        item.getOriginalEta() != null ? item.getOriginalEta() : "",
                        item.getArrival() != null ? item.getArrival() : "",
                        item.getBerthing() != null ? item.getBerthing() : "",
                        item.getSailing() != null ? item.getSailing() : "",
                        item.getTerminal() != null ? item.getTerminal() : ""
                ));
            }

            ValueRange body = new ValueRange().setValues(rows);
            sheetsClient.spreadsheets().values()
                    .update(targetSpreadsheetId, "A1", body)
                    .setValueInputOption("USER_ENTERED")
                    .execute();

            log.info("[ShippingScheduleSheetSyncService] Successfully updated {} schedules into Google Sheet '{}'",
                    summary.getTotalCount(), targetSpreadsheetId);
            return true;

        } catch (Exception e) {
            log.error("[ShippingScheduleSheetSyncService] Failed to update Google Sheet: {}", e.getMessage(), e);
            return false;
        }
    }
}
