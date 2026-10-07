package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.Spreadsheet;
import com.google.api.services.sheets.v4.model.ValueRange;
import org.junit.jupiter.api.Test;

public class GoogleSheetsReadTest {

    @Test
    void readSpreadsheetInfo() throws Exception {
        AppProperties appProperties = new AppProperties();
        appProperties.getGoogle().setServiceAccountKeyPath("credentials/service-account.json");
        appProperties.getGoogle().getSecretManager().setEnabled(false);

        GoogleAuthService authService = new GoogleAuthService(appProperties);
        authService.init();

        Sheets sheets = authService.getSheetsClient();
        String spreadsheetId = "11fc0ml4jJ24jsD1pUJ18K5RoRXcf4D0LcWcKFDuSMKs";

        Spreadsheet spreadsheet = sheets.spreadsheets().get(spreadsheetId).execute();
        System.out.println("=== Title: " + spreadsheet.getProperties().getTitle());
        spreadsheet.getSheets().forEach(sheet -> {
            System.out.println("Sheet: " + sheet.getProperties().getTitle() + " (ID: " + sheet.getProperties().getSheetId() + ")");
        });

        // SNK 시트 전체 읽어서 CY 열 통계 확인
        try {
            ValueRange response = sheets.spreadsheets().values()
                    .get(spreadsheetId, "'SNK'!A1:F")
                    .execute();
            var values = response.getValues();
            if (values != null && !values.isEmpty()) {
                System.out.println("Total SNK rows: " + values.size());
                int emptyCyCount = 0;
                int filledCyCount = 0;
                for (int i = 1; i < values.size(); i++) {
                    var row = values.get(i);
                    if (row.toString().contains("2654W")) {
                        System.out.println("2654W in Sheet row " + (i + 1) + ": " + row);
                    }
                    if (row.size() < 6 || row.get(5) == null || row.get(5).toString().isBlank()) {
                        emptyCyCount++;
                    } else {
                        filledCyCount++;
                    }
                }
                System.out.println("=== Filled CY: " + filledCyCount + ", Empty CY: " + emptyCyCount);
            }
        } catch (Exception e) {
            System.out.println("=== Failed to read SNK: " + e.getMessage());
        }

        // PANOCEAN 시트 읽기
        try {
            ValueRange response = sheets.spreadsheets().values()
                    .get(spreadsheetId, "'PANOCEAN'!A1:F10")
                    .execute();
            System.out.println("=== PANOCEAN Rows: " + (response.getValues() != null ? response.getValues().size() : 0));
            if (response.getValues() != null) {
                response.getValues().forEach(row -> System.out.println("PANOCEAN Row: " + row));
            }
        } catch (Exception e) {
            System.out.println("=== Failed to read PANOCEAN: " + e.getMessage());
        }
    }
}
