package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class HtmlSignatureBuilder {

    private final AppProperties appProperties;

    private static final Pattern NOTICE_PATTERN = Pattern.compile(
            "<span[^>]*>\\s*\\*\\*HOLIDAY NOTICE\\*\\*[\\s\\S]*?</span>(?:<br\\s*/?>)*",
            Pattern.CASE_INSENSITIVE
    );

    private static final Pattern COMPANY_PATTERN = Pattern.compile(
            "株式会社FATES|\\(ファテス\\)"
    );

    private static final Pattern BAF_PATTERN = Pattern.compile(
            "[\\s\\S]*?\\*\\*HOLIDAY NOTICE\\*\\*[\\s\\S]*?(?=(?:<[^>]+>|\\s)*●?(?:<[^>]+>|\\s)*도착지(?:<[^>]+>|\\s)*[Bb][Aa][Ff](?:<[^>]+>|\\s)*요\\s*금)"
    );

    private static final String SEAIMP1_INTRO =
            "\n  <span style=\"color: black; font-family: sans-serif;\">감사합니다.</span><br>\n" +
            "  <span style=\"color: black; font-family: sans-serif;\">よろしくお願いいたします。</span><br>\n" +
            "  <span style=\"color: black; font-family: sans-serif;\">FATES / 松本 마츠모토 드림 MATSUMOTO</span><br><br>";

    public String generateSignatureForEmail(String email, String currentSignature, String holidayText) {
        if (currentSignature == null) {
            currentSignature = "";
        }

        String group = determineGroup(email);
        return switch (group) {
            case "BL1" -> buildSignatureBL(currentSignature, holidayText);
            case "BAF" -> buildSignatureBAF(currentSignature, holidayText);
            case "SEAIMP1" -> buildSignatureSeaimp1(currentSignature, holidayText);
            default -> buildSignature(currentSignature, holidayText);
        };
    }

    public String determineGroup(String email) {
        if (email == null) return "DEFAULT";
        String normalizedEmail = email.trim().toLowerCase();

        List<String> bl1 = appProperties.getGroups().getOrDefault("bl1", List.of("bl1@fatesinc.com"));
        if (bl1.stream().anyMatch(e -> e.equalsIgnoreCase(normalizedEmail))) {
            return "BL1";
        }

        List<String> baf = appProperties.getGroups().getOrDefault("baf", List.of("seaimp2@fatesinc.com", "seaimp3@fatesinc.com"));
        if (baf.stream().anyMatch(e -> e.equalsIgnoreCase(normalizedEmail))) {
            return "BAF";
        }

        List<String> seaimp1 = appProperties.getGroups().getOrDefault("seaimp1", List.of("seaimp1@fatesinc.com"));
        if (seaimp1.stream().anyMatch(e -> e.equalsIgnoreCase(normalizedEmail))) {
            return "SEAIMP1";
        }

        return "DEFAULT";
    }

    public String buildVacationHtml(String nearestNoticeText, LocalDate resumeDate) {
        return "<span style=\"color: red; font-weight: bold; font-family: sans-serif;\">" +
                "**HOLIDAY NOTICE**<br>" +
                nearestNoticeText +
                "</span><br><br>" +
                "<span style=\"color: #000000; font-family: arial, sans-serif; font-weight: normal;\">" +
                "Resume on " + formatResumeDate(resumeDate) + "<br>Fates Inc." +
                "</span>";
    }

    public String buildSignature(String currentSignature, String holidayText) {
        String holidayBlock = "<span style=\"color: red; font-weight: bold; font-family: sans-serif;\">**HOLIDAY NOTICE**<br>" + holidayText + "</span><br>";
        return buildSignatureCommon(currentSignature, holidayBlock);
    }

    public String buildSignatureBL(String currentSignature, String holidayText) {
        String holidayBlock = "<span style=\"color: red; font-weight: bold; font-family: sans-serif;\">**HOLIDAY NOTICE**<br>" + holidayText + "</span><br><span style=\"color: #000000; font-family: arial, sans-serif; font-weight: normal;\">";
        return buildSignatureCommon(currentSignature, holidayBlock);
    }

    public String buildSignatureBAF(String currentSignature, String holidayText) {
        String holidayBlock = "<span style=\"color: red; font-weight: bold; font-family: sans-serif;\">**HOLIDAY NOTICE**<br>" + holidayText + "</span>";
        Matcher matcher = BAF_PATTERN.matcher(currentSignature);
        if (matcher.find()) {
            return matcher.replaceFirst(Matcher.quoteReplacement(holidayBlock));
        }
        return holidayBlock + currentSignature;
    }

    public String buildSignatureSeaimp1(String currentSignature, String holidayText) {
        String holidayBlock = "<span style=\"color: red; font-weight: bold; font-family: sans-serif;\">**HOLIDAY NOTICE**<br>" + holidayText + "</span>";
        Matcher matcher = BAF_PATTERN.matcher(currentSignature);
        if (matcher.find()) {
            return matcher.replaceFirst(Matcher.quoteReplacement(SEAIMP1_INTRO + holidayBlock));
        }
        return holidayBlock + currentSignature;
    }

    private String buildSignatureCommon(String currentSignature, String holidayBlock) {
        Matcher noticeMatcher = NOTICE_PATTERN.matcher(currentSignature);
        if (noticeMatcher.find()) {
            return noticeMatcher.replaceFirst(Matcher.quoteReplacement(holidayBlock));
        }

        Matcher companyMatcher = COMPANY_PATTERN.matcher(currentSignature);
        if (companyMatcher.find()) {
            int idx = companyMatcher.start();
            return currentSignature.substring(0, idx) + holidayBlock + currentSignature.substring(idx);
        }

        return holidayBlock + currentSignature;
    }

    public String formatCustomDate(ZonedDateTime date) {
        String month = date.getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
        int d = date.getDayOfMonth();
        String suffix = getDaySuffix(d);
        String dayOfWeek = date.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
        return String.format("%s %d%s (%s)", month, d, suffix, dayOfWeek);
    }

    public String formatResumeDate(LocalDate date) {
        String month = date.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
        int d = date.getDayOfMonth();
        String suffix = getDaySuffix(d);
        int year = date.getYear();
        return String.format("%s %d%s, %d", month, d, suffix, year);
    }

    public LocalDate calculateResumeDate(ZonedDateTime groupEnd) {
        LocalDate date = groupEnd.toLocalDate();
        if (date.getDayOfWeek() == DayOfWeek.SATURDAY) {
            return date.plusDays(2);
        } else if (date.getDayOfWeek() == DayOfWeek.SUNDAY) {
            return date.plusDays(1);
        }
        return date;
    }

    private String getDaySuffix(int d) {
        if (d >= 11 && d <= 13) {
            return "th";
        }
        return switch (d % 10) {
            case 1 -> "st";
            case 2 -> "nd";
            case 3 -> "rd";
            default -> "th";
        };
    }
}