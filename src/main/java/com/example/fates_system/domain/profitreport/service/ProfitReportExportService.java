package com.example.fates_system.domain.profitreport.service;

import com.google.api.client.http.ByteArrayContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * 구글 스프레드시트를 .xlsx 엑셀 파일로 변환하여 구글 드라이브에 업로드하는 서비스
 */
@Slf4j
@Service
public class ProfitReportExportService {

    /**
     * 스프레드시트를 .xlsx 엑셀 파일로 내보내어 Google Drive 폴더에 업로드 (기존 동일 파일 휴지통 처리)
     */
    public String exportToExcelAndUploadToDrive(Drive driveClient, String spreadsheetId, String folderId, String fileName) throws IOException {
        // 1. 구글 스프레드시트를 xlsx 바이트 스트림으로 내보내기
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        driveClient.files().export(spreadsheetId, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                .executeMediaAndDownloadTo(outStream);
        byte[] excelBytes = outStream.toByteArray();
        log.info("[ProfitReportExportService] 스프레드시트 엑셀 내보내기 완료 (크기: {} bytes)", excelBytes.length);

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
                    log.info("[ProfitReportExportService] 기존 엑셀 파일 휴지통 이동: {} (id: {})", f.getName(), f.getId());
                }
            }
        } catch (Exception e) {
            log.warn("[ProfitReportExportService] 기존 파일 검색/정리 중 경고: {}", e.getMessage());
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

        log.info("[ProfitReportExportService] 구글 드라이브에 엑셀 업로드 성공: {} (id: {})", uploaded.getName(), uploaded.getId());
        return uploaded.getId();
    }
}
