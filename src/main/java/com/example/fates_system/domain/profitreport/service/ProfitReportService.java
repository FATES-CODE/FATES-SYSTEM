package com.example.fates_system.domain.profitreport.service;

import com.example.fates_system.common.config.AppProperties;
import com.example.fates_system.domain.profitreport.dto.AgentStats;
import com.google.api.services.drive.Drive;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

import com.example.fates_system.common.google.GoogleAuthService;

/**
 * 영업이익 보고서 집계 및 생성 오케스트레이션 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ProfitReportService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;
    private final ProfitReportStyleService styleService;
    private final ProfitReportExportService exportService;

    public record ReportSyncResult(
            boolean success,
            String message,
            int totalAgents,
            String exportedFileName,
            String exportedFileId
    ) {}

    /**
     * 영업이익 데이터 동기화, 보고서 생성 및 엑셀 드라이브 내보내기 전체 실행
     */
    public ReportSyncResult syncAndConsolidateData() {
        AppProperties.ProfitReport config = appProperties.getProfitReport();
        String sourceSsId = config.getSourceSpreadsheetId();
        String targetSsId = config.getTargetSpreadsheetId();
        String targetFolderId = config.getTargetFolderId();

        try {
            Sheets sheetsClient = googleAuthService.getSheetsClient();
            Drive driveClient = getDriveClient();

            // 1. 타겟 스프레드시트의 시트 목록 캐싱 (SheetId 조회용)
            Map<String, Integer> targetSheetMap = getSheetNameIdMap(sheetsClient, targetSsId);

            String[] sheetNames = {"항공수출", "항공수입", "해상수출", "해상수입"};
            Map<String, AgentStats> agentMap = new LinkedHashMap<>();

            for (String sheetName : sheetNames) {
                log.info("[ProfitReport] '{}' 시트 처리 시작...", sheetName);

                // 2. 타겟 시트가 없으면 생성
                Integer targetSheetId = targetSheetMap.get(sheetName);
                if (targetSheetId == null) {
                    targetSheetId = createSheetIfNotExists(sheetsClient, targetSsId, sheetName);
                    targetSheetMap.put(sheetName, targetSheetId);
                }

                // 3. 기존 데이터 클리어 (2행부터)
                executeWithRetry(() -> {
                    sheetsClient.spreadsheets().values()
                            .clear(targetSsId, sheetName + "!A2:Z", new ClearValuesRequest())
                            .execute();
                    return null;
                }, 3, "'" + sheetName + "' 시트 클리어");

                // 4. 원본 시트 데이터 읽기
                ValueRange sourceRange = executeWithRetry(() ->
                        sheetsClient.spreadsheets().values()
                                .get(sourceSsId, sheetName)
                                .execute(),
                        3, "'" + sheetName + "' 원본 읽기");

                if (sourceRange == null) {
                    log.warn("[ProfitReport] 원본 '{}' 시트 읽기 실패: 건너뜁니다.", sheetName);
                    continue;
                }

                List<List<Object>> sourceData = sourceRange.getValues();
                if (sourceData == null || sourceData.isEmpty()) {
                    log.warn("[ProfitReport] 원본 '{}' 시트에 데이터가 없습니다.", sheetName);
                    continue;
                }

                // 헤더를 타겟 시트 B1:D1 에 기록
                List<Object> headers = getHeadersForSheet(sheetName);
                sheetsClient.spreadsheets().values()
                        .update(targetSsId, sheetName + "!B1:D1", new ValueRange().setValues(List.of(headers)))
                        .setValueInputOption("USER_ENTERED")
                        .execute();

                // 5. 3행 간격 순회 데이터 추출 및 집계
                List<List<Object>> extractedData = extractAndAggregateData(sheetName, sourceData, agentMap);

                if (!extractedData.isEmpty()) {
                    sheetsClient.spreadsheets().values()
                            .update(targetSsId, sheetName + "!B2:D" + (1 + extractedData.size()), new ValueRange().setValues(extractedData))
                            .setValueInputOption("USER_ENTERED")
                            .execute();
                    log.info("[ProfitReport] '{}' 시트에 {}건 기록 완료", sheetName, extractedData.size());
                }
            }

            // 6. [全体データ] 시트 생성 및 쓰기
            createTotalDataSheet(sheetsClient, targetSsId, targetSheetMap, agentMap);

            // 7. [Agent분류데이터] 보고서 시트 생성, 정렬 및 포맷팅 적용
            int targetYear, targetMonth;
            LocalDate now = LocalDate.now();
            targetYear = now.getYear();
            targetMonth = now.getMonthValue() - 1;
            if (targetMonth == 0) {
                targetYear -= 1;
                targetMonth = 12;
            }

            createAgentReportSheet(sheetsClient, targetSsId, targetSheetMap, agentMap, targetYear, targetMonth);

            // 8. 엑셀 (.xlsx) 내보내기 및 구글 드라이브 업로드 (선택적 단계)
            String exportFileName = String.format("%d년%d월영업이익보고서.xlsx", targetYear, targetMonth);
            String exportedFileId = null;
            try {
                exportedFileId = exportService.exportToExcelAndUploadToDrive(driveClient, targetSsId, targetFolderId, exportFileName);
                log.info("[ProfitReport] 엑셀 드라이브 업로드 완료: {} (id: {})", exportFileName, exportedFileId);
            } catch (Exception driveEx) {
                log.warn("[ProfitReport] 엑셀 드라이브 업로드 실패 (드라이브 폴더 권한 확인 필요): {}", driveEx.getMessage());
            }

            log.info("[ProfitReport] === 영업이익 보고서 전체 작업 성공 완료! (파일: {}) ===", exportFileName);

            return new ReportSyncResult(true, "성공적으로 보고서 생성을 완료했습니다." + (exportedFileId != null ? " (엑셀 업로드 완료)" : " (엑셀 드라이브 업로드는 폴더 권한 확인 필요)"),
                    agentMap.size(), exportFileName, exportedFileId);

        } catch (Exception e) {
            log.error("[ProfitReport] 보고서 생성 중 오류 발생: {}", e.getMessage(), e);
            return new ReportSyncResult(false, "오류 발생: " + e.getMessage(), 0, null, null);
        }
    }

    /**
     * 시트별 3행 간격 순회 데이터 추출 및 agentMap 집계
     */
    private List<List<Object>> extractAndAggregateData(String sheetName, List<List<Object>> sourceData, Map<String, AgentStats> agentMap) {
        int maxRows = sourceData.size();
        List<List<Object>> extractedData = new ArrayList<>();
        int i = 0;

        while (true) {
            int r1, r2, r3, c1, c2, c3;

            // [시트별 좌표 규칙]
            if ("항공수출".equals(sheetName)) {
                r1 = 9 + (i * 3);  c1 = 2;   // B9 (+3)
                r2 = 8 + (i * 3);  c2 = 3;   // C8 (+3)
                r3 = 9 + (i * 3);  c3 = 13;  // M9 (+3)
            } else if ("항공수입".equals(sheetName)) {
                r1 = 10 + (i * 3); c1 = 2;   // B10 (+3)
                r2 = 10 + (i * 3); c2 = 3;   // C10 (+3)
                r3 = 10 + (i * 3); c3 = 13;  // M10 (+3)
            } else { // 해상수출, 해상수입
                r1 = 9 + (i * 3);  c1 = 2;   // B9 (+3)
                r2 = 10 + (i * 3); c2 = 2;   // B10 (+3)
                r3 = 9 + (i * 3);  c3 = 16;  // P9 (+3)
            }

            if (r1 > maxRows && r2 > maxRows && r3 > maxRows) {
                break;
            }

            Object val1 = getCellValue(sourceData, r1 - 1, c1 - 1);
            Object val2 = getCellValue(sourceData, r2 - 1, c2 - 1);
            Object val3 = getCellValue(sourceData, r3 - 1, c3 - 1);

            if (isEmpty(val1) && isEmpty(val2) && isEmpty(val3)) {
                break;
            }

            // 합계 행(TOTAL) 필터링
            if (isTotalRow(sheetName, sourceData, maxRows, val1, r1, r2)) {
                log.info("[ProfitReport] [{}] 합계(TOTAL) 행 감지되어 제외: i={}, r1={}, r2={}", sheetName, i, r1, r2);
                i++;
                continue;
            }

            // 해상 건수 정제 ([LOCAL] 제거)
            if ("해상수출".equals(sheetName) || "해상수입".equals(sheetName)) {
                if (!isEmpty(val2)) {
                    val2 = String.valueOf(val2).replaceAll("(?i)\\[LOCAL\\]", "").replaceAll("[^0-9]", "");
                }
            }

            double numVal2 = parseDouble(val2);
            double numVal3 = parseDouble(val3);
            String agentName = String.valueOf(val1 != null ? val1 : "").trim();

            boolean isHblCount = ("해상수출".equals(sheetName) || "해상수입".equals(sheetName))
                    && !agentName.isEmpty()
                    && agentName.toUpperCase().startsWith("HBL COUNT");

            if (!isHblCount) {
                extractedData.add(List.of(agentName, numVal2, numVal3));

                AgentStats stats = agentMap.computeIfAbsent(agentName, AgentStats::new);
                switch (sheetName) {
                    case "해상수출" -> { stats.setSeCase(stats.getSeCase() + numVal2); stats.setSeProfit(stats.getSeProfit() + numVal3); }
                    case "해상수입" -> { stats.setSiCase(stats.getSiCase() + numVal2); stats.setSiProfit(stats.getSiProfit() + numVal3); }
                    case "항공수출" -> { stats.setAeCase(stats.getAeCase() + numVal2); stats.setAeProfit(stats.getAeProfit() + numVal3); }
                    case "항공수입" -> { stats.setAiCase(stats.getAiCase() + numVal2); stats.setAiProfit(stats.getAiProfit() + numVal3); }
                }
            }

            i++;
        }
        return extractedData;
    }

    private boolean isTotalRow(String sheetName, List<List<Object>> sourceData, int maxRows, Object val1, int r1, int r2) {
        if (!"항공수출".equals(sheetName) && !"항공수입".equals(sheetName)) {
            return false;
        }

        List<Object> row1 = (r1 - 1 < maxRows) ? sourceData.get(r1 - 1) : Collections.emptyList();
        List<Object> row2 = (r2 - 1 < maxRows) ? sourceData.get(r2 - 1) : Collections.emptyList();

        if (val1 != null && String.valueOf(val1).trim().toUpperCase().contains("TOTAL")) {
            return true;
        }

        if (row2.size() > 1 && row2.get(1) != null) {
            String bVal = String.valueOf(row2.get(1)).trim().toUpperCase();
            if (bVal.contains("TOTAL") || bVal.contains("합계")) {
                return true;
            }
        }

        boolean hasTotalInRow = row1.stream().anyMatch(c -> c != null && String.valueOf(c).trim().toUpperCase().contains("GRAND TOTAL"))
                || row2.stream().anyMatch(c -> c != null && String.valueOf(c).trim().toUpperCase().contains("GRAND TOTAL"));
        if (hasTotalInRow) {
            return true;
        }

        if ("항공수입".equals(sheetName)) {
            int prevRowIdx = r1 - 2;
            if (prevRowIdx >= 0 && prevRowIdx < maxRows) {
                List<Object> prevRow = sourceData.get(prevRowIdx);
                return prevRow.stream().anyMatch(c -> c != null && String.valueOf(c).trim().toUpperCase().contains("TOTAL"));
            }
        }
        return false;
    }

    /**
     * [全体データ] 시트 생성 및 쓰기
     */
    private void createTotalDataSheet(Sheets sheetsClient, String targetSsId,
                                      Map<String, Integer> targetSheetMap,
                                      Map<String, AgentStats> agentMap) throws IOException {
        String sheetName = "全体データ";
        Integer sheetId = targetSheetMap.get(sheetName);
        if (sheetId == null) {
            sheetId = createSheetIfNotExists(sheetsClient, targetSsId, sheetName);
            targetSheetMap.put(sheetName, sheetId);
        }

        sheetsClient.spreadsheets().values().clear(targetSsId, sheetName + "!A1:Z", new ClearValuesRequest()).execute();

        List<List<Object>> totalRows = new ArrayList<>();
        totalRows.add(List.of("Agent", "S/E Case", "S/E Profit", "S/I Case", "S/I Profit",
                "A/E Case", "A/E Profit", "A/I Case", "A/I Profit"));

        for (AgentStats d : agentMap.values()) {
            totalRows.add(List.of(
                    d.getAgent(),
                    d.getSeCase(), d.getSeProfit(),
                    d.getSiCase(), d.getSiProfit(),
                    d.getAeCase(), d.getAeProfit(),
                    d.getAiCase(), d.getAiProfit()
            ));
        }

        sheetsClient.spreadsheets().values()
                .update(targetSsId, sheetName + "!A1", new ValueRange().setValues(totalRows))
                .setValueInputOption("USER_ENTERED")
                .execute();

        log.info("[ProfitReport] '全体データ' 시트 작성 완료 ({}행)", totalRows.size());
    }

    /**
     * [Agent분류데이터] 보고서 시트 갱신 및 서식 적용
     */
    private void createAgentReportSheet(Sheets sheetsClient, String targetSsId,
                                        Map<String, Integer> targetSheetMap,
                                        Map<String, AgentStats> agentMap,
                                        int targetYear, int targetMonth) throws IOException {
        String sheetName = "Agent분류데이터";
        Integer sheetId = targetSheetMap.get(sheetName);
        if (sheetId == null) {
            sheetId = createSheetIfNotExists(sheetsClient, targetSsId, sheetName);
            targetSheetMap.put(sheetName, sheetId);
        }

        sheetsClient.spreadsheets().values().clear(targetSsId, sheetName + "!A1:Z", new ClearValuesRequest()).execute();

        String titleText = String.format("%d년%d월 건수 및 영업이익", targetYear, targetMonth);
        List<Object> reportHeaders = List.of(
                "No", "Agent",
                "S/E Case", "S/E Profit",
                "S/I Case", "S/I Profit",
                "A/E Case", "A/E Profit",
                "A/I Case", "A/I Profit",
                "Total Case", "Total Profit"
        );

        List<AgentStats> sortedList = new ArrayList<>(agentMap.values());
        sortedList.sort(Comparator.comparingDouble(AgentStats::getTotalProfit).reversed());

        double sumSeCase = 0, sumSeProfit = 0;
        double sumSiCase = 0, sumSiProfit = 0;
        double sumAeCase = 0, sumAeProfit = 0;
        double sumAiCase = 0, sumAiProfit = 0;
        double sumTotalCase = 0, sumTotalProfit = 0;

        List<List<Object>> reportRows = new ArrayList<>();
        int index = 1;
        for (AgentStats item : sortedList) {
            double tc = item.getTotalCase();
            double tp = item.getTotalProfit();

            sumSeCase += item.getSeCase();
            sumSeProfit += item.getSeProfit();
            sumSiCase += item.getSiCase();
            sumSiProfit += item.getSiProfit();
            sumAeCase += item.getAeCase();
            sumAeProfit += item.getAeProfit();
            sumAiCase += item.getAiCase();
            sumAiProfit += item.getAiProfit();
            sumTotalCase += tc;
            sumTotalProfit += tp;

            reportRows.add(List.of(
                    index++,
                    item.getAgent(),
                    item.getSeCase() != 0 ? item.getSeCase() : "",
                    item.getSeProfit() != 0 ? item.getSeProfit() : "",
                    item.getSiCase() != 0 ? item.getSiCase() : "",
                    item.getSiProfit() != 0 ? item.getSiProfit() : "",
                    item.getAeCase() != 0 ? item.getAeCase() : "",
                    item.getAeProfit() != 0 ? item.getAeProfit() : "",
                    item.getAiCase() != 0 ? item.getAiCase() : "",
                    item.getAiProfit() != 0 ? item.getAiProfit() : "",
                    tc != 0 ? tc : "",
                    tp
            ));
        }

        List<Object> totalRow = List.of(
                "", "합계",
                sumSeCase, sumSeProfit,
                sumSiCase, sumSiProfit,
                sumAeCase, sumAeProfit,
                sumAiCase, sumAiProfit,
                sumTotalCase, sumTotalProfit
        );

        sheetsClient.spreadsheets().values()
                .update(targetSsId, sheetName + "!C1", new ValueRange().setValues(List.of(List.of(titleText))))
                .setValueInputOption("USER_ENTERED").execute();
        sheetsClient.spreadsheets().values()
                .update(targetSsId, sheetName + "!L1", new ValueRange().setValues(List.of(List.of("단위(円)"))))
                .setValueInputOption("USER_ENTERED").execute();
        sheetsClient.spreadsheets().values()
                .update(targetSsId, sheetName + "!A2:L2", new ValueRange().setValues(List.of(reportHeaders)))
                .setValueInputOption("USER_ENTERED").execute();

        if (!reportRows.isEmpty()) {
            sheetsClient.spreadsheets().values()
                    .update(targetSsId, sheetName + "!A3:L" + (2 + reportRows.size()), new ValueRange().setValues(reportRows))
                    .setValueInputOption("USER_ENTERED").execute();
        }

        int totalRowIndex = 3 + reportRows.size();
        sheetsClient.spreadsheets().values()
                .update(targetSsId, sheetName + "!A" + totalRowIndex + ":L" + totalRowIndex, new ValueRange().setValues(List.of(totalRow)))
                .setValueInputOption("USER_ENTERED").execute();

        styleService.applyReportFormatting(sheetsClient, targetSsId, sheetId, reportRows.size(), totalRowIndex);
        log.info("[ProfitReport] 'Agent분류데이터' 보고서 작성 완료 (총 {}개 Agent, 합계행: {}행)", reportRows.size(), totalRowIndex);
    }

    private Drive getDriveClient() {
        try {
            String impersonateUser = (!appProperties.getTargetEmails().isEmpty()) ? appProperties.getTargetEmails().get(0) : "cloud@fatesinc.com";
            return googleAuthService.getDriveClientForUser(impersonateUser);
        } catch (Exception e) {
            log.warn("[ProfitReport] 사용자 위임 Drive 클라이언트 실패, 기본 서비스 계정 사용: {}", e.getMessage());
            return googleAuthService.getDriveClient();
        }
    }

    private List<Object> getHeadersForSheet(String sheetName) {
        return switch (sheetName) {
            case "항공수출" -> List.of("Agent", "A/E Case", "A/E Profit");
            case "항공수입" -> List.of("Agent", "A/I Case", "A/I Profit");
            case "해상수출" -> List.of("Agent", "S/E Case", "S/E Profit");
            case "해상수입" -> List.of("Agent", "S/I Case", "S/I Profit");
            default -> List.of("Agent", "", "");
        };
    }

    private Map<String, Integer> getSheetNameIdMap(Sheets sheetsClient, String spreadsheetId) throws IOException {
        Map<String, Integer> map = new HashMap<>();
        Spreadsheet ss = sheetsClient.spreadsheets().get(spreadsheetId).execute();
        if (ss.getSheets() != null) {
            for (Sheet sheet : ss.getSheets()) {
                map.put(sheet.getProperties().getTitle(), sheet.getProperties().getSheetId());
            }
        }
        return map;
    }

    private Integer createSheetIfNotExists(Sheets sheetsClient, String spreadsheetId, String sheetName) throws IOException {
        AddSheetRequest addSheetRequest = new AddSheetRequest()
                .setProperties(new SheetProperties().setTitle(sheetName));
        BatchUpdateSpreadsheetRequest batchRequest = new BatchUpdateSpreadsheetRequest()
                .setRequests(List.of(new Request().setAddSheet(addSheetRequest)));

        BatchUpdateSpreadsheetResponse response = sheetsClient.spreadsheets().batchUpdate(spreadsheetId, batchRequest).execute();
        Integer newSheetId = response.getReplies().get(0).getAddSheet().getProperties().getSheetId();
        log.info("[ProfitReport] 새 시트 생성 완료: '{}' (ID: {})", sheetName, newSheetId);
        return newSheetId;
    }

    private Object getCellValue(List<List<Object>> data, int rowIdx, int colIdx) {
        if (rowIdx < 0 || rowIdx >= data.size()) return null;
        List<Object> row = data.get(rowIdx);
        if (colIdx < 0 || colIdx >= row.size()) return null;
        return row.get(colIdx);
    }

    private boolean isEmpty(Object val) {
        if (val == null) return true;
        return String.valueOf(val).trim().isEmpty();
    }

    private double parseDouble(Object val) {
        if (val == null) return 0;
        try {
            String clean = String.valueOf(val).replaceAll("[^0-9.-]", "").trim();
            if (clean.isEmpty()) return 0;
            return Double.parseDouble(clean);
        } catch (Exception e) {
            return 0;
        }
    }

    @FunctionalInterface
    private interface SheetsOperation<T> {
        T execute() throws Exception;
    }

    private <T> T executeWithRetry(SheetsOperation<T> operation, int maxRetries, String operationName) {
        long delay = 1500;
        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return operation.execute();
            } catch (Exception e) {
                log.warn("[ProfitReport] {} 작업 실패 (시도 {}/{}): {}", operationName, attempt, maxRetries, e.getMessage());
                if (attempt == maxRetries) {
                    log.error("[ProfitReport] {} 작업 최종 실패", operationName);
                    return null;
                }
                try {
                    Thread.sleep(delay);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    return null;
                }
                delay *= 2;
            }
        }
        return null;
    }
}