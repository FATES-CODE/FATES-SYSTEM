package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Draft;
import com.google.api.services.gmail.model.ListDraftsResponse;
import com.google.api.services.gmail.model.Message;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.Spreadsheet;
import com.google.api.services.sheets.v4.model.ValueRange;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import jakarta.activation.DataHandler;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import jakarta.mail.util.ByteArrayDataSource;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class NewsletterEmailService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;

    private static final Pattern EMAIL_REGEX =
            Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

    public boolean createDraftsWithAttachment(byte[] pdfBytes, String fileName) {
        try {
            AppProperties.Newsletter.Email cfg = appProperties.getNewsletter().getEmail();
            String sender      = cfg.getSender();
            String draftTarget = cfg.getDraftTarget();
            int chunkSize      = cfg.getBccChunkSize();
            List<EmailBatch> batches = extractUniqueEmails();
            if (batches.isEmpty()) {
                log.warn("[NewsletterEmailService] No valid recipient emails found");
                return true;
            }
            Gmail gmail = googleAuthService.getGmailClientForUser(sender);
            String subject  = buildSubject();
            String htmlBody = buildHtmlBody();
            for (EmailBatch batch : batches) {
                List<String> emails = batch.emails();
                for (int i = 0; i < emails.size(); i += chunkSize) {
                    List<String> chunk = emails.subList(i, Math.min(i + chunkSize, emails.size()));
                    Draft draft = buildDraft(sender, draftTarget, String.join(",", chunk),
                            subject, htmlBody, pdfBytes, fileName);
                    gmail.users().drafts().create("me", draft).execute();
                    log.info("[NewsletterEmailService] [{}] col{} - {} recipients draft created",
                            batch.sheetName(), batch.colIndex(), chunk.size());
                }
            }
            return true;
        } catch (Exception e) {
            log.error("[NewsletterEmailService] Draft creation failed: {}", e.getMessage(), e);
            return false;
        }
    }

    private List<EmailBatch> extractUniqueEmails() {
        AppProperties.Newsletter.Email cfg = appProperties.getNewsletter().getEmail();
        try {
            Sheets sheets = googleAuthService.getSheetsClient();
            // 1. 시트 메타데이터(시트 이름 목록)만 경량 조회 (셀 데이터 및 서식 제외)
            Spreadsheet spreadsheet = executeWithRetry(() ->
                    sheets.spreadsheets().get(cfg.getSpreadsheetId())
                            .setFields("sheets.properties.title")
                            .execute()
            );

            if (spreadsheet.getSheets() == null || spreadsheet.getSheets().isEmpty()) {
                log.warn("[NewsletterEmailService] No sheets found in spreadsheet");
                return List.of();
            }

            Set<String> globalProcessed = new HashSet<>();
            List<EmailBatch> result = new ArrayList<>();

            for (var sheet : spreadsheet.getSheets()) {
                String sheetName = sheet.getProperties().getTitle();
                String quotedRange = "'" + sheetName.replace("'", "''") + "'";

                // 2. 셀 서식(includeGridData) 없이 값만 조회하는 경량 values API 사용
                ValueRange valueRange = executeWithRetry(() ->
                        sheets.spreadsheets().values()
                                .get(cfg.getSpreadsheetId(), quotedRange)
                                .execute()
                );

                List<List<Object>> rows = valueRange.getValues();
                if (rows == null || rows.isEmpty()) continue;

                int numCols = rows.stream()
                        .mapToInt(r -> r != null ? r.size() : 0)
                        .max().orElse(0);

                for (int c = 0; c < numCols; c++) {
                    List<String> bccList = new ArrayList<>();
                    for (List<Object> row : rows) {
                        if (row == null || c >= row.size()) continue;
                        Object cell = row.get(c);
                        if (cell == null) continue;
                        String val = cell.toString().trim();
                        if (EMAIL_REGEX.matcher(val).matches() && globalProcessed.add(val)) {
                            bccList.add(val);
                        }
                    }
                    if (!bccList.isEmpty()) {
                        result.add(new EmailBatch(sheetName, c + 1, bccList));
                    }
                }
            }
            return result;
        } catch (Exception e) {
            log.error("[NewsletterEmailService] Email extraction failed: {}", e.getMessage(), e);
            return List.of();
        }
    }

    @FunctionalInterface
    private interface SheetsOperation<T> {
        T execute() throws Exception;
    }

    private <T> T executeWithRetry(SheetsOperation<T> op) throws Exception {
        int maxAttempts = 3;
        long waitMs = 1500;
        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return op.execute();
            } catch (GoogleJsonResponseException e) {
                int status = e.getStatusCode();
                if ((status == 503 || status == 500 || status == 429) && attempt < maxAttempts) {
                    log.warn("[NewsletterEmailService] Sheets API temporary error (status={}), retrying in {}ms (attempt {}/{})",
                            status, waitMs, attempt, maxAttempts);
                    Thread.sleep(waitMs);
                    waitMs *= 2;
                } else {
                    throw e;
                }
            }
        }
        throw new IllegalStateException("Max retry attempts reached");
    }

    private String buildSubject() {
        LocalDate now = LocalDate.now();
        int year  = now.getYear();
        int month = now.getMonthValue();
        int week  = (int) Math.ceil(now.getDayOfMonth() / 7.0);
        return "<<일본 파테스 / FATES JAPAN>>" + year + "년 " + month + "월 " + week + "주차 FATES 물류레터";
    }

    private String buildHtmlBody() {
        return "<p>안녕하세요.</p>\n"
                + "<p>일본 FATES입니다.</p>\n"
                + "<p>저희 파테스는 2012년 도쿄 설립 이래 14년간 다져온 포워딩 전문성과 탄탄한 네트워크를 바탕으로,</p>\n"
                + "<p>한일 양국은 물론 전 세계를 연결하는 맞춤형 물류 솔루션을 제공하고 있습니다.</p>\n"
                + "<p>귀사의 성공적인 비즈니스를 지원하기 위해,</p>\n"
                + "<p>현재 일본 물류 상황에 대한 뉴스레터를 첨부하여 보내드립니다.</p>\n"
                + "<p>업무에 유용한 참고 자료가 되기를 바랍니다.</p>\n"
                + "<p>그 밖에 필요한 내용이 있으시면 언제든지 편하게 연락 주시기 바랍니다.</p>\n"
                + "<p>감사합니다.</p>\n"
                + "<p>파테스 임직원 드림</p>";
    }

    private Draft buildDraft(String from, String to, String bcc,
                             String subject, String htmlBody,
                             byte[] pdfBytes, String fileName) throws Exception {
        Session session = Session.getDefaultInstance(new Properties(), null);
        MimeMessage email = new MimeMessage(session);
        email.setFrom(new InternetAddress(from));
        email.addRecipient(jakarta.mail.Message.RecipientType.TO, new InternetAddress(to));
        email.addRecipients(jakarta.mail.Message.RecipientType.BCC, InternetAddress.parse(bcc));
        email.setSubject(subject, "UTF-8");
        MimeMultipart multipart = new MimeMultipart();
        MimeBodyPart htmlPart = new MimeBodyPart();
        htmlPart.setContent(htmlBody, "text/html; charset=utf-8");
        multipart.addBodyPart(htmlPart);
        MimeBodyPart pdfPart = new MimeBodyPart();
        ByteArrayDataSource ds = new ByteArrayDataSource(pdfBytes, "application/pdf");
        pdfPart.setDataHandler(new DataHandler(ds));
        pdfPart.setFileName(fileName);
        multipart.addBodyPart(pdfPart);
        email.setContent(multipart);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        email.writeTo(baos);
        String encoded = Base64.getUrlEncoder().encodeToString(baos.toByteArray());
        Message gmailMessage = new Message();
        gmailMessage.setRaw(encoded);
        Draft draft = new Draft();
        draft.setMessage(gmailMessage);
        return draft;
    }

    public SendDraftsResult sendPendingDrafts(Integer customDelaySeconds) {
        AppProperties.Newsletter.Email cfg = appProperties.getNewsletter().getEmail();
        String sender = cfg.getSender();
        int delaySeconds = customDelaySeconds != null && customDelaySeconds >= 0
                ? customDelaySeconds
                : cfg.getDraftSendDelaySeconds();

        try {
            Gmail gmail = googleAuthService.getGmailClientForUser(sender);
            ListDraftsResponse draftsResponse = gmail.users().drafts().list("me").execute();
            List<Draft> drafts = draftsResponse.getDrafts();

            if (drafts == null || drafts.isEmpty()) {
                log.info("[NewsletterEmailService] No pending drafts found for {}", sender);
                return new SendDraftsResult(0, 0, 0, "No pending drafts to send.");
            }

            log.info("[NewsletterEmailService] Found {} pending drafts. Starting sequential sending with {}s delay...",
                    drafts.size(), delaySeconds);

            int sentCount = 0;
            int failedCount = 0;

            for (int i = 0; i < drafts.size(); i++) {
                Draft d = drafts.get(i);
                try {
                    Draft sendReq = new Draft().setId(d.getId());
                    Message sentMessage = gmail.users().drafts().send("me", sendReq).execute();
                    sentCount++;
                    log.info("[NewsletterEmailService] [{}/{}] Draft (ID: {}) sent successfully. (Message ID: {})",
                            i + 1, drafts.size(), d.getId(), sentMessage.getId());

                    if (i < drafts.size() - 1 && delaySeconds > 0) {
                        Thread.sleep(delaySeconds * 1000L);
                    }
                } catch (GoogleJsonResponseException e) {
                    int statusCode = e.getStatusCode();
                    failedCount++;
                    log.error("[NewsletterEmailService] Failed to send draft {} (Status {}): {}", d.getId(), statusCode, e.getMessage());

                    // Rate limit (429) 또는 일일 한도 초과 (403 quotaExceeded / dailyLimitExceeded) 발생 시 즉시 중단
                    if (statusCode == 429 || statusCode == 403 ||
                            (e.getDetails() != null && e.getDetails().getMessage() != null &&
                             (e.getDetails().getMessage().contains("quota") || e.getDetails().getMessage().contains("limit")))) {
                        int remaining = drafts.size() - (i + 1);
                        log.warn("[NewsletterEmailService] Quota or Rate limit exceeded. Halting remaining {} drafts.", remaining);
                        return new SendDraftsResult(sentCount, failedCount, remaining,
                                "Quota/Rate limit hit after " + sentCount + " sent drafts: " + e.getMessage());
                    }
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    int remaining = drafts.size() - (i + 1);
                    return new SendDraftsResult(sentCount, failedCount, remaining, "Draft sending interrupted.");
                } catch (Exception e) {
                    failedCount++;
                    log.error("[NewsletterEmailService] Unexpected error sending draft {}: {}", d.getId(), e.getMessage());
                }
            }

            return new SendDraftsResult(sentCount, failedCount, 0,
                    String.format("Completed. %d sent, %d failed.", sentCount, failedCount));

        } catch (Exception e) {
            log.error("[NewsletterEmailService] Failed to list or process drafts: {}", e.getMessage(), e);
            return new SendDraftsResult(0, 0, 0, "Error accessing Gmail drafts: " + e.getMessage());
        }
    }

    public record SendDraftsResult(int sent, int failed, int remaining, String message) {}

    private record EmailBatch(String sheetName, int colIndex, List<String> emails) {}
}
