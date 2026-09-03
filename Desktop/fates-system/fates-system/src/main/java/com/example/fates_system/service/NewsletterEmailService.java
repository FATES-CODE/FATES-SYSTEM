package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Draft;
import com.google.api.services.gmail.model.Message;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.Spreadsheet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
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
            Spreadsheet spreadsheet = sheets.spreadsheets().get(cfg.getSpreadsheetId())
                    .setIncludeGridData(true).execute();
            Set<String> globalProcessed = new HashSet<>();
            List<EmailBatch> result = new ArrayList<>();
            spreadsheet.getSheets().forEach(sheet -> {
                String sheetName = sheet.getProperties().getTitle();
                var gridData = sheet.getData();
                if (gridData == null || gridData.isEmpty()) return;
                var rows = gridData.get(0).getRowData();
                if (rows == null || rows.isEmpty()) return;
                int numCols = rows.stream()
                        .mapToInt(r -> r.getValues() != null ? r.getValues().size() : 0)
                        .max().orElse(0);
                for (int c = 0; c < numCols; c++) {
                    List<String> bccList = new ArrayList<>();
                    final int col = c;
                    rows.forEach(row -> {
                        if (row.getValues() == null || col >= row.getValues().size()) return;
                        var cell = row.getValues().get(col);
                        String val = cell.getFormattedValue();
                        if (val == null) return;
                        val = val.trim();
                        if (EMAIL_REGEX.matcher(val).matches() && globalProcessed.add(val)) {
                            bccList.add(val);
                        }
                    });
                    if (!bccList.isEmpty()) result.add(new EmailBatch(sheetName, c + 1, bccList));
                }
            });
            return result;
        } catch (Exception e) {
            log.error("[NewsletterEmailService] Email extraction failed: {}", e.getMessage(), e);
            return List.of();
        }
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
                + "<p>한일 양국은 물론 전 세계를 연결하는 맞카형 물류 솔루션을 제공하고 있습니다.</p>\n"
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
        pdfPart.setFileName(fileName);
        pdfPart.setContent(pdfBytes, "application/pdf");
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

    private record EmailBatch(String sheetName, int colIndex, List<String> emails) {}
}
