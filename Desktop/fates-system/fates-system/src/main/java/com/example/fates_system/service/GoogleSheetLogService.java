package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.SyncAccountResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleSheetLogService {

    private final GoogleAuthService googleAuthService;
    private final AppProperties appProperties;
    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    public void updateLogSheet(String email, SyncAccountResult result) {
        String sheetId = appProperties.getLogSheetId();
        if (sheetId == null || sheetId.isBlank()) {
            log.debug("LOG_SHEET_ID 미설정으로 스프레드시트 로깅 생략");
            return;
        }

        try {
            Sheets sheets = googleAuthService.getSheetsClient();
            String rangeA = "A2:A";
            ValueRange response = sheets.spreadsheets().values()
                    .get(sheetId, rangeA)
                    .execute();

            List<List<Object>> values = response.getValues();
            if (values == null || values.isEmpty()) {
                log.warn("로그 시트 데이터 없음 (A열)");
                return;
            }

            int targetRow = -1;
            for (int i = 0; i < values.size(); i++) {
                List<Object> row = values.get(i);
                if (!row.isEmpty() && row.get(0) != null) {
                    String rowEmail = row.get(0).toString().trim();
                    if (rowEmail.equalsIgnoreCase(email.trim())) {
                        targetRow = i + 2; // 2행부터 시작 (헤더 제외)
                        break;
                    }
                }
            }

            if (targetRow == -1) {
                log.info("로그 시트에서 대상 이메일 행을 찾을 수 없음: {}", email);
                return;
            }

            String logJson = objectMapper.writeValueAsString(result);
            String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            ValueRange body = new ValueRange()
                    .setValues(List.of(List.of(logJson, today)));

            String updateRange = String.format("B%d:C%d", targetRow, targetRow);
            sheets.spreadsheets().values()
                    .update(sheetId, updateRange, body)
                    .setValueInputOption("USER_ENTERED")
                    .execute();

            log.info("Google Sheet 로그 기록 완료: {} (행 {})", email, targetRow);
        } catch (Exception e) {
            log.warn("Google Sheet 로그 기록 실패 ({}): {}", email, e.getMessage());
        }
    }
}
