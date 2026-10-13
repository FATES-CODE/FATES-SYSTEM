package com.example.fates_system.domain.profitreport.service;

import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 스프레드시트의 셀 스타일, 테두리, 배경색, 숫자 포맷 등 서식 지정을 전담하는 서비스
 */
@Slf4j
@Service
public class ProfitReportStyleService {

    /**
     * 보고서 시트 서식 적용 (헤더 스타일, 교차 배경색, 합계행 스타일, 숫자 포맷, 테두리)
     */
    public void applyReportFormatting(Sheets sheetsClient, String targetSsId, int sheetId, int dataRowCount, int totalRowIndex) {
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
            log.info("[ProfitReportStyleService] 보고서 시트 서식 일괄 적용 완료");
        } catch (Exception e) {
            log.warn("[ProfitReportStyleService] 시트 서식 적용 중 경고 (데이터는 정상 반영됨): {}", e.getMessage());
        }
    }
}
