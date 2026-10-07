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
            "(?:<span[^>]*>\\s*)*(?:<div[^>]*>\\s*)*<span[^>]*>\\s*\\*\\*HOLIDAY NOTICE\\*\\*[\\s\\S]*?</span>(?:\\s*</span>)*(?:\\s*</div>)*(?:<br\\s*/?>)*",
            Pattern.CASE_INSENSITIVE
    );

    /**
     * seaimp/BAF 서명용 강화 클린업 패턴.
     * 실제 Gmail 서명에서 HOLIDAY NOTICE는 color:red 스타일의 span 안에 여러 겹으로 중첩되어 있음.
     * 예: &lt;span color:red&gt;&lt;div/&gt;&lt;span&gt;&lt;span&gt;&lt;span&gt;&lt;span&gt;&lt;span&gt;**HOLIDAY NOTICE**...&lt;/span&gt;×5&lt;/span&gt;
     * 이 패턴은 색상이 red인 span에서 HOLIDAY NOTICE 포함 여부를 확인 후 최대 15개의 닫는 span까지 제거함.
     */
    private static final Pattern BAF_NOTICE_CLEANUP_PATTERN = Pattern.compile(
            "<span[^>]*?color\\s*:\\s*(?:red|#[Ff]{2}0{4})[^>]*>[\\s\\S]*?\\*\\*HOLIDAY NOTICE\\*\\*[\\s\\S]*?(?:</span>\\s*){1,15}(?:<br[^>]*>\\s*)*",
            Pattern.CASE_INSENSITIVE
    );

    private static final Pattern COMPANY_PATTERN = Pattern.compile(
            "株式会社FATES|\\(ファテス\\)"
    );

    private static final Pattern BAF_ANCHOR_PATTERN = Pattern.compile(
            "●?(?:<[^>]+>|\\s)*(?:도착지|到着地|\\?+)?(?:<[^>]+>|\\s)*[Bb][Aa][Ff]",
            Pattern.CASE_INSENSITIVE
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
        String cleaned = cleanExistingHolidayNotices(currentSignature);
        // BAF/SEAIMP 서명은 <p>/<div> 앞에 삽입되므로 trailing <br> 불필요.
        // (BAF div 헤더에 이미 <font><b><br></b></font>가 있어 두 칸이 되는 문제 방지)
        String holidayBlock = "<span style=\"color: red; font-weight: bold; font-family: sans-serif;\">**HOLIDAY NOTICE**<br>" + holidayText + "</span>";

        Matcher bafMatcher = BAF_ANCHOR_PATTERN.matcher(cleaned);
        if (bafMatcher.find()) {
            // ● 위치에 삽입하면 <span color:blue> 안에 들어가는 문제 발생.
            // 역방향으로 스캔해 ●을 감싼 블록 요소(<p>/<div>)의 시작 위치를 찾아 그 앞에 삽입.
            int insertAt = findNearestBlockStart(cleaned, bafMatcher.start());
            return cleaned.substring(0, insertAt) + holidayBlock + cleaned.substring(insertAt);
        }
        return buildSignatureCommon(cleaned, holidayBlock);
    }

    public String buildSignatureSeaimp1(String currentSignature, String holidayText) {
        String cleaned = cleanExistingHolidayNotices(currentSignature);
        String holidayBlock = "<span style=\"color: red; font-weight: bold; font-family: sans-serif;\">**HOLIDAY NOTICE**<br>" + holidayText + "</span>";

        // 마츠모토 인사말 중복 방지 (기존 서명에 없을 때만 상단 추가)
        if (!cleaned.contains("松本") && !cleaned.toUpperCase().contains("MATSUMOTO")) {
            cleaned = SEAIMP1_INTRO + cleaned;
        }

        Matcher bafMatcher = BAF_ANCHOR_PATTERN.matcher(cleaned);
        if (bafMatcher.find()) {
            int insertAt = findNearestBlockStart(cleaned, bafMatcher.start());
            return cleaned.substring(0, insertAt) + holidayBlock + cleaned.substring(insertAt);
        }
        return buildSignatureCommon(cleaned, holidayBlock);
    }

    /**
     * BAF/SEAIMP 서명용 강화 클린업.
     * NOTICE_PATTERN(DEFAULT/BL1용)과 달리 color:red span을 기준으로 탐지하므로
     * Gmail이 생성한 복잡한 중첩 구조(최대 15겹 닫는 span)를 모두 제거.
     */
    public String cleanExistingHolidayNotices(String currentSignature) {
        if (currentSignature == null) {
            return "";
        }
        return BAF_NOTICE_CLEANUP_PATTERN.matcher(currentSignature).replaceAll("");
    }

    /**
     * fromPos(● 문자 위치)에서 역방향으로 스캔하여
     * ●을 감싼 가장 가까운 블록 오프닝 태그(&lt;p&gt;, &lt;div&gt;, &lt;table&gt;)의 시작 위치를 반환.
     * 블록 태그가 없으면 fromPos를 그대로 반환(● 앞에 삽입).
     */
    private int findNearestBlockStart(String sig, int fromPos) {
        for (int pos = fromPos - 1; pos >= 0; pos--) {
            if (sig.charAt(pos) == '>') {
                int tagStart = sig.lastIndexOf('<', pos);
                if (tagStart >= 0) {
                    String tagContent = sig.substring(tagStart + 1, pos).trim().toLowerCase();
                    // 닫는 태그(/)나 주석(!)은 건너뜀; p/div/table 오프닝 태그만 대상
                    if (!tagContent.startsWith("/") && !tagContent.startsWith("!") &&
                            (tagContent.startsWith("p") || tagContent.startsWith("div") || tagContent.startsWith("table"))) {
                        return tagStart;
                    }
                }
            }
        }
        return fromPos;
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