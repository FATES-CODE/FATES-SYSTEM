package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import jakarta.activation.DataHandler;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Properties;

@Slf4j
@Service
@RequiredArgsConstructor
public class DailyLogEmailService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;

    public boolean sendDailyLogEmail() {
        AppProperties.DailyLogReport cfg = appProperties.getDailyLogReport();
        String sender = cfg.getSender();
        String recipient = cfg.getRecipient();
        String logFilePath = cfg.getLogFilePath();

        // 00:00:00 실행 시 당일 로그가 아닌 '전날(어제)' 누적된 주요 이슈(WARN, ERROR, 지연) 로그를 전송하도록 설정
        LocalDate targetDate = LocalDate.now().minusDays(1);
        String targetDateStr = targetDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        log.info("[DailyLogEmailService] Preparing previous day issue log report ({}) to {}", targetDateStr, recipient);

        try {
            List<String> rawLogLines = readLogFileForDate(logFilePath, targetDateStr);
            List<String> issueLogLines = filterIssueLogLines(rawLogLines);

            String subject;
            String bodyText;

            if (issueLogLines.isEmpty()) {
                subject = String.format("[FATES SYSTEM] %s 주요 로그 리포트 (정상)", targetDateStr);
                bodyText = String.format("%s 시스템 주요 로그 리포트입니다.\n\n전날(%s) 주의/경고(WARN) 및 오류(ERROR), 성능 지연([PERF-SLOW]) 항목이 발견되지 않았습니다. 모든 시스템이 정상 작동했습니다.", targetDateStr, targetDateStr);
            } else {
                subject = String.format("[FATES SYSTEM] %s 주요 로그 리포트 (주의/오류 %d건)", targetDateStr, issueLogLines.size());
                bodyText = String.format("%s 시스템 주요 로그 리포트입니다.\n\n전날(%s) 발생한 주의/경고(WARN), 오류(ERROR), 성능 지연([PERF-SLOW]) 항목 총 %d건이 발견되었습니다. 자세한 내용은 첨부파일을 확인해 주세요.", targetDateStr, targetDateStr, issueLogLines.size());
            }

            List<String> reportContent = new ArrayList<>();
            reportContent.add("==========================================================================");
            reportContent.add(String.format(" FATES SYSTEM - Daily Issue & Warning Log Report (%s)", targetDateStr));
            reportContent.add(String.format(" Generated Date: %s", LocalDate.now().toString()));
            reportContent.add(String.format(" Filtered Issue Count: %d / Total Raw Lines: %d", issueLogLines.size(), rawLogLines.size()));
            reportContent.add("==========================================================================");
            reportContent.add("");

            if (issueLogLines.isEmpty()) {
                reportContent.add("[System Notice] No WARN, ERROR, or PERF-SLOW entries recorded for " + targetDateStr + ".");
            } else {
                reportContent.addAll(issueLogLines);
            }

            byte[] logFileBytes = String.join(System.lineSeparator(), reportContent).getBytes(StandardCharsets.UTF_8);
            String attachmentFileName = String.format("fates-system-issues-%s.log", targetDateStr);

            MimeMessage mimeMessage = buildMimeMessage(sender, recipient, subject, bodyText, logFileBytes, attachmentFileName);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            mimeMessage.writeTo(baos);
            String encoded = Base64.getUrlEncoder().encodeToString(baos.toByteArray());

            Message gmailMessage = new Message();
            gmailMessage.setRaw(encoded);

            Gmail gmail = googleAuthService.getGmailClientForUser(sender);
            Message sentMessage = gmail.users().messages().send("me", gmailMessage).execute();

            log.info("[DailyLogEmailService] Successfully sent daily issue log email for {} (Issues: {}). (Message ID: {})",
                    targetDateStr, issueLogLines.size(), sentMessage.getId());
            return true;

        } catch (Exception e) {
            log.error("[DailyLogEmailService] Failed to send daily log email: {}", e.getMessage(), e);
            return false;
        }
    }

    private List<String> filterIssueLogLines(List<String> lines) {
        List<String> filtered = new ArrayList<>();
        boolean inIssueBlock = false;

        for (String line : lines) {
            String upper = line.toUpperCase();
            boolean isNewLogEntry = line.matches("^\\d{4}-\\d{2}-\\d{2}.*");

            if (isNewLogEntry) {
                if (upper.contains(" WARN ") || upper.contains(" ERROR ") ||
                    upper.contains("[PERF-SLOW]") || upper.contains("[PERF-ERROR]") ||
                    upper.contains("EXCEPTION") || upper.contains("FAIL")) {
                    inIssueBlock = true;
                    filtered.add(line);
                } else {
                    inIssueBlock = false;
                }
            } else if (inIssueBlock) {
                filtered.add(line);
            }
        }
        return filtered;
    }

    private List<String> readLogFileForDate(String pathStr, String targetDateStr) {
        try {
            Path path = Paths.get(pathStr);
            if (!Files.exists(path)) {
                File dir = path.getParent() != null ? path.getParent().toFile() : null;
                if (dir != null && !dir.exists()) {
                    dir.mkdirs();
                }
                return List.of("[System Notice] No log entries recorded for " + targetDateStr + " or log file not created yet.");
            }

            List<String> allLines = Files.readAllLines(path, StandardCharsets.UTF_8);
            List<String> targetLines = new java.util.ArrayList<>();
            boolean inTargetDateBlock = false;

            for (String line : allLines) {
                if (line.startsWith(targetDateStr)) {
                    inTargetDateBlock = true;
                    targetLines.add(line);
                } else if (line.matches("^\\d{4}-\\d{2}-\\d{2}.*")) {
                    inTargetDateBlock = false;
                } else if (inTargetDateBlock) {
                    targetLines.add(line);
                }
            }

            if (!targetLines.isEmpty()) {
                return targetLines;
            }

            // 자정 로테이션 파일 검사 (*targetDateStr*.gz 또는 *targetDateStr*.log)
            Path parentDir = path.getParent();
            if (parentDir != null && Files.exists(parentDir)) {
                try (var stream = Files.list(parentDir)) {
                    List<Path> rolledFiles = stream
                            .filter(p -> p.getFileName().toString().contains(targetDateStr))
                            .toList();
                    for (Path rolledFile : rolledFiles) {
                        List<String> lines;
                        if (rolledFile.getFileName().toString().endsWith(".gz")) {
                            try (var gzis = new java.util.zip.GZIPInputStream(Files.newInputStream(rolledFile));
                                 var reader = new java.io.BufferedReader(new java.io.InputStreamReader(gzis, StandardCharsets.UTF_8))) {
                                lines = reader.lines().toList();
                            }
                        } else {
                            lines = Files.readAllLines(rolledFile, StandardCharsets.UTF_8);
                        }
                        if (!lines.isEmpty()) {
                            return lines;
                        }
                    }
                }
            }

            // 폴백: 날짜 매칭이 되지 않더라도 메인 로그 파일 내용이 있으면 전체 반환
            if (!allLines.isEmpty()) {
                return allLines;
            }

            return List.of("[System Notice] No log entries recorded for " + targetDateStr + ".");
        } catch (Exception e) {
            log.warn("[DailyLogEmailService] Could not read log file {}: {}", pathStr, e.getMessage());
            return List.of("[Error reading log file] " + e.getMessage());
        }
    }

    private MimeMessage buildMimeMessage(String from, String to, String subject, String bodyText,
                                         byte[] logBytes, String fileName) throws Exception {
        Session session = Session.getDefaultInstance(new Properties(), null);
        MimeMessage email = new MimeMessage(session);
        email.setFrom(new InternetAddress(from));
        email.addRecipients(jakarta.mail.Message.RecipientType.TO, InternetAddress.parse(to));
        email.setSubject(subject, "UTF-8");

        MimeMultipart multipart = new MimeMultipart();

        // 본문 (단순 텍스트)
        MimeBodyPart textPart = new MimeBodyPart();
        textPart.setText(bodyText, "UTF-8");
        multipart.addBodyPart(textPart);

        // 첨부 로그 파일
        if (logBytes != null && logBytes.length > 0) {
            MimeBodyPart logPart = new MimeBodyPart();
            ByteArrayDataSource ds = new ByteArrayDataSource(logBytes, "text/plain; charset=UTF-8");
            logPart.setDataHandler(new DataHandler(ds));
            logPart.setFileName(fileName);
            multipart.addBodyPart(logPart);
        }

        email.setContent(multipart);
        return email;
    }
}
