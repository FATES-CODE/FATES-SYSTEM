package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.google.api.client.http.ByteArrayContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfitReportService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;

    @Getter
    @Setter
    public static class AgentStats {
        private String agent;
        private double seCase = 0;
        private double seProfit = 0;
        private double siCase = 0;
        private double siProfit = 0;
        private double aeCase = 0;
        private double aeProfit = 0;
        private double aiCase = 0;
        private double aiProfit = 0;

        public AgentStats(String agent) {
            this.agent = agent;
        }

        public double getTotalCase() {
            return seCase + siCase + aeCase + aiCase;
        }

        public double getTotalProfit() {
            return seProfit + siProfit + aeProfit + aiProfit;
        }
    }

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
            Drive driveClient;
            try {
                String impersonateUser = (!appProperties.getTargetEmails().isEmpty()) ? appProperties.getTargetEmails().get(0) : "cloud@fatesinc.com";
                driveClient = googleAuthService.getDriveClientForUser(impersonateUser);
            } catch (Exception e) {
                log.warn("[ProfitReport] 사용자 위임 Drive 클라이언트 실패, 기본 서비스 계정 사용: {}", e.getMessage());
                driveClient = googleAuthService.getDriveClient();
            }

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

                // 3. 기존 데이터 클리어 (2행부터, 503 대비 재시도 적용)
                executeWithRetry(() -> {
                    sheetsClient.spreadsheets().values()
                            .clear(targetSsId, sheetName + "!A2:Z", new ClearValuesRequest())
                            .execute();
                    return null;
                }, 3, "'" + sheetName + "' 시트 클리어");

                // 4. 원본 시트 데이터 읽기 (503 대비 재시도 적용)
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

                int maxRows = sourceData.size();
                List<List<Object>> extractedData = new ArrayList<>();

                // 헤더 결정
                List<Object> headers = switch (sheetName) {
                    case "항공수출" -> List.of("Agent", "A/E Case", "A/E Profit");
                    case "항공수입" -> List.of("Agent", "A/I Case", "A/I Profit");
                    case "해상수출" -> List.of("Agent", "S/E Case", "S/E Profit");
                    case "해상수입" -> List.of("Agent", "S/I Case", "S/I Profit");
                    default -> List.of("Agent", "", "");
                };

                // 헤더를 타겟 시트 B1:D1 에 기록
                sheetsClient.spreadsheets().values()
                        .update(targetSsId, sheetName + "!B1:D1", new ValueRange().setValues(List.of(headers)))
                        .setValueInputOption("USER_ENTERED")
                        .execute();

                // 5. 3행 간격 순회 데이터 추출
                int i = 0;
                while (true) {
                    int r1, r2, r3, c1, c2, c3;
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

                    // 항공수출/항공수입: GRAND TOTAL / TOTAL 행 감지 및 제외
                    if ("항공수출".equals(sheetName) || "항공수입".equals(sheetName)) {
                        List<Object> row1 = (r1 - 1 < maxRows) ? sourceData.get(r1 - 1) : Collections.emptyList();
                        List<Object> row2 = (r2 - 1 < maxRows) ? sourceData.get(r2 - 1) : Collections.emptyList();

                        boolean isGrandTotal = false;
                        // 1. val1 검사
                        if (val1 != null && String.valueOf(val1).trim().toUpperCase().contains("TOTAL")) {
                            isGrandTotal = true;
                        }
                        // 2. row2 검사 (항공수출의 경우 r2 행의 B열에 GRAND TOTAL이 적혀있음)
                        if (!isGrandTotal && row2.size() > 1 && row2.get(1) != null) {
                            String bVal = String.valueOf(row2.get(1)).trim().toUpperCase();
                            if (bVal.contains("TOTAL") || bVal.contains("합계")) {
                                isGrandTotal = true;
                            }
                        }
                        // 3. row1 및 row2 전체 셀에서 GRAND TOTAL / TOTAL 검사
                        if (!isGrandTotal) {
                            boolean hasTotalInRow = row1.stream().anyMatch(c -> c != null && String.valueOf(c).trim().toUpperCase().contains("GRAND TOTAL"))
                                    || row2.stream().anyMatch(c -> c != null && String.valueOf(c).trim().toUpperCase().contains("GRAND TOTAL"));
                            if (hasTotalInRow) {
                                isGrandTotal = true;
                            }
                        }

                        // 4. 항공수입의 마지막 TOTAL 행: Agent명(B열)이 없고, 그 이전 행(r1-2)에 TOTAL이 있거나 row1/row2에 TOTAL이 있는 경우
                        if (!isGrandTotal && "항공수입".equals(sheetName)) {
                            int prevRowIdx = r1 - 2;
                            if (prevRowIdx >= 0 && prevRowIdx < maxRows) {
                                List<Object> prevRow = sourceData.get(prevRowIdx);
                                if (prevRow.stream().anyMatch(c -> c != null && String.valueOf(c).trim().toUpperCase().contains("TOTAL"))) {
                                    isGrandTotal = true;
                                }
                            }
                        }

                        if (isGrandTotal) {
                            log.info("[ProfitReport] [{}] 합계(TOTAL) 행 감지되어 제외: i={}, r1={}, r2={}", sheetName, i, r1, r2);
                            i++;
                            continue;
                        }
                    }

                    // 해상수출/해상수입: [LOCAL] 제거 및 숫자만 추출
                    if ("해상수출".equals(sheetName) || "해상수입".equals(sheetName)) {
                        if (!isEmpty(val2)) {
                            String strVal = String.valueOf(val2).replaceAll("(?i)\\[LOCAL\\]", "");
                            val2 = strVal.replaceAll("[^0-9]", "");
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
                            case "해상수출" -> {
                                stats.seCase += numVal2;
                                stats.seProfit += numVal3;
                            }
                            case "해상수입" -> {
                                stats.siCase += numVal2;
                                stats.siProfit += numVal3;
                            }
                            case "항공수출" -> {
                                stats.aeCase += numVal2;
                                stats.aeProfit += numVal3;
                            }
                            case "항공수입" -> {
                                stats.aiCase += numVal2;
                                stats.aiProfit += numVal3;
                            }
                        }
                    }

                    i++;
                }

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
                exportedFileId = exportToExcelAndUploadToDrive(driveClient, targetSsId, targetFolderId, exportFileName);
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
     * [全体データ] 시트 갱신
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

        // 전체 클리어
        sheetsClient.spreadsheets().values().clear(targetSsId, sheetName + "!A1:Z", new ClearValuesRequest()).execute();

        List<List<Object>> totalRows = new ArrayList<>();
        List<Object> totalHeaders = List.of("Agent", "S/E Case", "S/E Profit", "S/I Case", "S/I Profit",
                "A/E Case", "A/E Profit", "A/I Case", "A/I Profit");
        totalRows.add(totalHeaders);

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
     * [Agent분류데이터] 보고서 시트 갱신 및 스타일 서식 적용
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

        // 시트 초기화
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

        // 정렬: Total Profit 내림차순
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

        // 합계 행
        List<Object> totalRow = List.of(
                "", "합계",
                sumSeCase, sumSeProfit,
                sumSiCase, sumSiProfit,
                sumAeCase, sumAeProfit,
                sumAiCase, sumAiProfit,
                sumTotalCase, sumTotalProfit
        );

        // 1행 (C1 제목, L1 단위) 쓰기
        sheetsClient.spreadsheets().values()
                .update(targetSsId, sheetName + "!C1", new ValueRange().setValues(List.of(List.of(titleText))))
                .setValueInputOption("USER_ENTERED")
                .execute();
        sheetsClient.spreadsheets().values()
                .update(targetSsId, sheetName + "!L1", new ValueRange().setValues(List.of(List.of("단위(円)"))))
                .setValueInputOption("USER_ENTERED")
                .execute();

        // 2행 (헤더) 쓰기
        sheetsClient.spreadsheets().values()
                .update(targetSsId, sheetName + "!A2:L2", new ValueRange().setValues(List.of(reportHeaders)))
                .setValueInputOption("USER_ENTERED")
                .execute();

        // 3행부터 데이터 쓰기
        if (!reportRows.isEmpty()) {
            sheetsClient.spreadsheets().values()
                    .update(targetSsId, sheetName + "!A3:L" + (2 + reportRows.size()), new ValueRange().setValues(reportRows))
                    .setValueInputOption("USER_ENTERED")
                    .execute();
        }

        // 마지막 합계행 쓰기
        int totalRowIndex = 3 + reportRows.size();
        sheetsClient.spreadsheets().values()
                .update(targetSsId, sheetName + "!A" + totalRowIndex + ":L" + totalRowIndex, new ValueRange().setValues(List.of(totalRow)))
                .setValueInputOption("USER_ENTERED")
                .execute();

        // 스타일 및 서식 일괄 적용 (배경색, 굵기, 폰트, 숫자 서식 등)
        applyReportFormatting(sheetsClient, targetSsId, sheetId, reportRows.size(), totalRowIndex);

        log.info("[ProfitReport] 'Agent분류데이터' 보고서 작성 완료 (총 {}개 Agent, 합계행: {}행)", reportRows.size(), totalRowIndex);
    }

    /**
     * 보고서 시트 서식 적용 (헤더 스타일, 교차 배경색, 합계행 스타일, 숫자 포맷)
     */
    private void applyReportFormatting(Sheets sheetsClient, String targetSsId, int sheetId, int dataRowCount, int totalRowIndex) {
        try {
            List<Request> requests = new ArrayList<>();

            // 1. 헤더 서식 (2행: 굵게, 중앙 정렬)
            requests.add(new Request().setRepeatCell(new RepeatCellRequest()
                    .setRange(new GridRange().setSheetId(sheetId).setStartRowIndex(1).setEndRowIndex(2).setStartColumnIndex(0).setEndColumnIndex(12))
                    .setCell(new CellData()
                            .setUserEnteredFormat(new CellFormat()
                                    .setTextFormat(new TextFormat().setBold(true).setFontFamily("Arial").setFontSize(11))
                                    .setHorizontalAlignment("CENTER")
                            ))
                    .setFields("userEnteredFormat(textFormat,horizontalAlignment)")
            ));

            // 2. 데이터 행 줄무늬 배경색 및 정렬 (#D9E2F3, #FCE4D6)
            for (int r = 0; r < dataRowCount; r++) {
                Color bgColor = (r % 2 == 0)
                        ? new Color().setRed(217f / 255f).setGreen(226f / 255f).setBlue(243f / 255f) // #D9E2F3 연파랑
                        : new Color().setRed(252f / 255f).setGreen(228f / 255f).setBlue(214f / 255f); // #FCE4D6 연주황

                requests.add(new Request().setRepeatCell(new RepeatCellRequest()
                        .setRange(new GridRange().setSheetId(sheetId).setStartRowIndex(2 + r).setEndRowIndex(3 + r).setStartColumnIndex(0).setEndColumnIndex(12))
                        .setCell(new CellData().setUserEnteredFormat(new CellFormat().setBackgroundColor(bgColor)))
                        .setFields("userEnteredFormat.backgroundColor")
                ));
            }

            // 3. 숫자 열(#,##0 천단위 콤마 포맷) - C열(인덱스 2) ~ L열(인덱스 12)
            requests.add(new Request().setRepeatCell(new RepeatCellRequest()
                    .setRange(new GridRange().setSheetId(sheetId).setStartRowIndex(2).setEndRowIndex(totalRowIndex).setStartColumnIndex(2).setEndColumnIndex(12))
                    .setCell(new CellData().setUserEnteredFormat(new CellFormat()
                            .setNumberFormat(new NumberFormat().setType("NUMBER").setPattern("#,##0"))
                            .setHorizontalAlignment("RIGHT")
                    ))
                    .setFields("userEnteredFormat(numberFormat,horizontalAlignment)")
            ));

            // No 열(인덱스 0) 가운데 정렬
            requests.add(new Request().setRepeatCell(new RepeatCellRequest()
                    .setRange(new GridRange().setSheetId(sheetId).setStartRowIndex(2).setEndRowIndex(2 + dataRowCount).setStartColumnIndex(0).setEndColumnIndex(1))
                    .setCell(new CellData().setUserEnteredFormat(new CellFormat().setHorizontalAlignment("CENTER")))
                    .setFields("userEnteredFormat.horizontalAlignment")
            ));

            // 4. 합계 행 서식 (노란색 배경 #FFF2CC, 굵게)
            Color totalBgColor = new Color().setRed(255f / 255f).setGreen(242f / 255f).setBlue(204f / 255f); // #FFF2CC
            requests.add(new Request().setRepeatCell(new RepeatCellRequest()
                    .setRange(new GridRange().setSheetId(sheetId).setStartRowIndex(totalRowIndex - 1).setEndRowIndex(totalRowIndex).setStartColumnIndex(0).setEndColumnIndex(12))
                    .setCell(new CellData().setUserEnteredFormat(new CellFormat()
                            .setBackgroundColor(totalBgColor)
                            .setTextFormat(new TextFormat().setBold(true).setFontFamily("Arial").setFontSize(11))
                    ))
                    .setFields("userEnteredFormat(backgroundColor,textFormat)")
            ));

            // 합계 텍스트 가운데 정렬
            requests.add(new Request().setRepeatCell(new RepeatCellRequest()
                    .setRange(new GridRange().setSheetId(sheetId).setStartRowIndex(totalRowIndex - 1).setEndRowIndex(totalRowIndex).setStartColumnIndex(1).setEndColumnIndex(2))
                    .setCell(new CellData().setUserEnteredFormat(new CellFormat().setHorizontalAlignment("CENTER")))
                    .setFields("userEnteredFormat.horizontalAlignment")
            ));

            // 5. 전체 테이블 테두리 (Border)
            Border border = new Border().setStyle("SOLID_MEDIUM").setColor(new Color().setRed(0f).setGreen(0f).setBlue(0f));
            requests.add(new Request().setUpdateBorders(new UpdateBordersRequest()
                    .setRange(new GridRange().setSheetId(sheetId).setStartRowIndex(1).setEndRowIndex(totalRowIndex).setStartColumnIndex(0).setEndColumnIndex(12))
                    .setTop(border).setBottom(border).setLeft(border).setRight(border)
                    .setInnerHorizontal(new Border().setStyle("SOLID").setColor(new Color().setRed(0f).setGreen(0f).setBlue(0f)))
                    .setInnerVertical(new Border().setStyle("SOLID").setColor(new Color().setRed(0f).setGreen(0f).setBlue(0f)))
            ));

            sheetsClient.spreadsheets().batchUpdate(targetSsId, new BatchUpdateSpreadsheetRequest().setRequests(requests)).execute();
            log.info("[ProfitReport] 보고서 시트 서식 일괄 적용 완료");
        } catch (Exception e) {
            log.warn("[ProfitReport] 시트 서식 적용 중 경고 (데이터는 정상 반영됨): {}", e.getMessage());
        }
    }

    /**
     * 스프레드시트를 .xlsx 엑셀 파일로 내보내어 Google Drive 폴더에 업로드 (기존 동일 파일 휴지통 처리)
     */
    private String exportToExcelAndUploadToDrive(Drive driveClient, String spreadsheetId, String folderId, String fileName) throws IOException {
        // 1. 구글 스프레드시트를 xlsx 바이트 스트림으로 내보내기
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        driveClient.files().export(spreadsheetId, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                .executeMediaAndDownloadTo(outStream);
        byte[] excelBytes = outStream.toByteArray();
        log.info("[ProfitReport] 스프레드시트 엑셀 내보내기 완료 (크기: {} bytes)", excelBytes.length);

        // 2. 대상 폴더에서 기존 동일 파일명 검색 후 휴지통 이동
        try {
            String query = String.format("'%s' in parents and name = '%s' and trashed = false", folderId, fileName);
            FileList existingFiles = driveClient.files().list()
                    .setQ(query)
                    .setFields("files(id, name)")
                    .setSupportsAllDrives(true)
                    .setIncludeItemsFromAllDrives(true)
                    .execute();

            if (existingFiles.getFiles() != null) {
                for (File f : existingFiles.getFiles()) {
                    driveClient.files().update(f.getId(), new File().setTrashed(true))
                            .setSupportsAllDrives(true)
                            .execute();
                    log.info("[ProfitReport] 기존 엑셀 파일 휴지통 이동: {} (id: {})", f.getName(), f.getId());
                }
            }
        } catch (Exception e) {
            log.warn("[ProfitReport] 기존 파일 검색/정리 중 경고: {}", e.getMessage());
        }

        // 3. 새 엑셀 파일 업로드
        File fileMetadata = new File();
        fileMetadata.setName(fileName);
        fileMetadata.setParents(List.of(folderId));

        ByteArrayContent content = new ByteArrayContent("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelBytes);
        File uploaded = driveClient.files().create(fileMetadata, content)
                .setSupportsAllDrives(true)
                .setFields("id, name")
                .execute();

        log.info("[ProfitReport] 구글 드라이브에 엑셀 업로드 성공: {} (id: {})", uploaded.getName(), uploaded.getId());
        return uploaded.getId();
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
        String s = String.valueOf(val).trim();
        return s.isEmpty();
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
                boolean isRetryable = false;
                if (e instanceof com.google.api.client.googleapis.json.GoogleJsonResponseException gjre) {
                    int code = gjre.getStatusCode();
                    isRetryable = (code == 503 || code == 500 || code == 429);
                } else if (e.getMessage() != null) {
                    String msg = e.getMessage().toLowerCase();
                    isRetryable = msg.contains("503") || msg.contains("unavailable") || msg.contains("rate limit");
                }

                if (isRetryable && attempt < maxRetries) {
                    log.warn("[ProfitReport] {} 일시 오류 발생 (시도 {}/{}). {}ms 후 재시도: {}",
                            operationName, attempt, maxRetries, delay, e.getMessage());
                    try {
                        Thread.sleep(delay);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new RuntimeException("재시도 대기 중 인터럽트 발생", ie);
                    }
                    delay *= 2;
                } else {
                    log.error("[ProfitReport] {} 최종 실패: {}", operationName, e.getMessage());
                    return null;
                }
            }
        }
        return null;
    }
}