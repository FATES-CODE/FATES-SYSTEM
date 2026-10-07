package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;

/**
 * Cafe24 JcBoard automatic newsletter post uploader
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class Cafe24BoardService {

    private final AppProperties appProperties;
    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Upload newsletter to Cafe24 JcBoard (tname=guide)
     *
     * @param pdfBytes Newsletter PDF byte content
     * @param fileName File name for the attachment
     * @param designTitle Title from Canva design
     * @return true if upload succeeded, false otherwise
     */
    public boolean uploadNewsletter(byte[] pdfBytes, String fileName, String designTitle) {
        AppProperties.Newsletter.Cafe24 cfg = appProperties.getNewsletter().getCafe24();
        if (!cfg.isEnabled()) {
            log.info("[Cafe24BoardService] Cafe24 board upload is disabled in config");
            return true;
        }

        try {
            String subject = buildSubject(designTitle);
            String htmlBody = buildHtmlBody();
            String safeFileName = (fileName != null && !fileName.isBlank()) ? fileName : "FATES_Newsletter.pdf";

            log.info("[Cafe24BoardService] Uploading newsletter to Cafe24 board (tname={}, lang={}, subject='{}')...",
                    cfg.getTname(), cfg.getPostLang(), subject);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("mode", "write");
            body.add("vmode", "Query");
            body.add("idx", "0");
            body.add("tname", cfg.getTname());
            body.add("page", "1");
            body.add("userfile_number", "5");
            body.add("useLoginEnum", "0");
            body.add("fno", "0");
            body.add("name", cfg.getAuthor());
            body.add("post_lang", cfg.getPostLang());
            body.add("subject", subject);
            body.add("content", htmlBody);
            body.add("pass", cfg.getPassword());

            if (pdfBytes != null && pdfBytes.length > 0) {
                ByteArrayResource fileResource = new ByteArrayResource(pdfBytes) {
                    @Override
                    public String getFilename() {
                        return safeFileName;
                    }
                };
                body.add("userfile1", fileResource);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            headers.set(HttpHeaders.USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
            headers.set(HttpHeaders.REFERER, "https://fatesinc.mycafe24.com/JcBoard/board.htm?tname=" + cfg.getTname() + "&mode=write");

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(cfg.getEndpoint(), requestEntity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                String responseBody = response.getBody();
                if (responseBody != null && responseBody.contains("alert('게시판 정보가 올바르지 않습니다.')")) {
                    log.error("[Cafe24BoardService] Cafe24 board rejected upload with message: Invalid board info");
                    return false;
                }
                log.info("[Cafe24BoardService] Newsletter successfully uploaded to Cafe24 board!");
                return true;
            } else {
                log.error("[Cafe24BoardService] Failed to upload newsletter: HTTP {}", response.getStatusCode());
                return false;
            }
        } catch (Exception e) {
            log.error("[Cafe24BoardService] Exception occurred while uploading to Cafe24 board: {}", e.getMessage(), e);
            return false;
        }
    }

    private String buildSubject(String designTitle) {
        if (designTitle != null && !designTitle.isBlank()) {
            return designTitle.trim();
        }
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        int month = now.getMonthValue();
        int week = (int) Math.ceil(now.getDayOfMonth() / 7.0);
        return "[FATES 물류레터] " + year + "년 " + month + "월 " + week + "주차 일본물류레터";
    }

    private String buildHtmlBody() {
        return "<p>안녕하세요. FATES입니다.</p>\n"
                + "<p>일본 FATES에서 발행하는 물류레터를 안내해 드립니다.</p>\n"
                + "<p>최신 일본 물류 동향 및 상세 분석 내용은 첨부된 PDF 파일을 다운로드하여 확인하실 수 있습니다.</p>\n"
                + "<p>그 밖에 문의사항이나 화물 견적 등이 필요하신 경우 언제든지 편하게 연락 주시기 바랍니다.</p>\n"
                + "<p>감사합니다.</p>";
    }
}
