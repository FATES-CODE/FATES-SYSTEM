package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class HtmlSignatureBuilderTest {

    private HtmlSignatureBuilder builder;
    private AppProperties appProperties;

    @BeforeEach
    void setUp() {
        appProperties = new AppProperties();
        appProperties.setGroups(Map.of(
                "bl1", List.of("bl1@fatesinc.com"),
                "baf", List.of("seaimp2@fatesinc.com", "seaimp3@fatesinc.com"),
                "seaimp1", List.of("seaimp1@fatesinc.com")
        ));
        builder = new HtmlSignatureBuilder(appProperties);
    }

    @Test
    @DisplayName("기본 서명: 기존 공휴일 안내문이 없을 때 株式会社FATES 앞에 삽입")
    void testDefaultSignature_InsertBeforeCompany() {
        String original = "<p>담당자 드림</p><p>株式会社FATES</p>";
        String holidayText = "May 3rd (Sat) ~ May 6th (Tue): Golden Week";

        String result = builder.generateSignatureForEmail("other@fatesinc.com", original, holidayText);

        assertThat(result).contains("<span style=\"color: red; font-weight: bold; font-family: sans-serif;\">**HOLIDAY NOTICE**<br>May 3rd (Sat) ~ May 6th (Tue): Golden Week</span><br>");
        assertThat(result).endsWith("株式会社FATES</p>");
    }

    @Test
    @DisplayName("기본 서명: 기존 공휴일 안내문이 있을 때 새 안내문으로 교체")
    void testDefaultSignature_ReplaceExistingNotice() {
        String original = "<p>감사합니다.</p><span style=\"color: red; font-weight: bold; font-family: sans-serif;\">**HOLIDAY NOTICE**<br>Old Holiday</span><br><p>株式会社FATES</p>";
        String holidayText = "January 1st (Thu): New Year's Day";

        String result = builder.generateSignatureForEmail("cloud@fatesinc.com", original, holidayText);

        assertThat(result).doesNotContain("Old Holiday");
        assertThat(result).contains("January 1st (Thu): New Year's Day");
    }

    @Test
    @DisplayName("BL1 서명: BL1 전용 서식 태그 포함")
    void testBL1Signature() {
        String original = "<p>BL팀 서명</p>";
        String holidayText = "September 15th (Mon): Respect for the Aged Day";

        String result = builder.generateSignatureForEmail("bl1@fatesinc.com", original, holidayText);

        assertThat(result).contains("<span style=\"color: #000000; font-family: arial, sans-serif; font-weight: normal;\">");
        assertThat(result).contains(holidayText);
    }

    @Test
    @DisplayName("BAF 서명: 도착지 BAF 요금 직전 공휴일 블록 치환")
    void testBAFSignature() {
        String original = "<p>서명 내용</p><span style=\"color: red;\">**HOLIDAY NOTICE**<br>Old</span><br>● 도착지 BAF 요금 안내";
        String holidayText = "May 3rd (Sat) ~ May 6th (Tue): Golden Week";

        String result = builder.generateSignatureForEmail("seaimp2@fatesinc.com", original, holidayText);

        assertThat(result).contains("Golden Week");
        assertThat(result).contains("도착지 BAF 요금");
        assertThat(result).doesNotContain("Old");
    }

    @Test
    @DisplayName("BAF 서명: 한자(到着地BAF) 및 상단 중복된 HOLIDAY NOTICE 제거 후 BAF 직전 1회 삽입 검증")
    void testBAFSignature_KanjiAndDuplicateCleanup() {
        // 상단에 이미 중복으로 들어간 잘못된 서명 형태
        String original = "<span style=\"color: red;\">**HOLIDAY NOTICE**<br>Dup1</span><br>" +
                "<span style=\"color: red;\">**HOLIDAY NOTICE**<br>Dup2</span><br>" +
                "<p>인사말</p>●到着地BAF改定料金のお知らせ?(FCL)●<p>株式会社FATES</p>";
        String holidayText = "September 19th (Sat) ~ September 23rd (Wed): Silver Week";

        String result = builder.generateSignatureForEmail("seaimp2@fatesinc.com", original, holidayText);

        // 상단 중복 제거 확인
        assertThat(result).doesNotContain("Dup1");
        assertThat(result).doesNotContain("Dup2");
        // 새 공휴일 공지 1회만 포함
        int firstIdx = result.indexOf("**HOLIDAY NOTICE**");
        int lastIdx = result.lastIndexOf("**HOLIDAY NOTICE**");
        assertThat(firstIdx).isEqualTo(lastIdx);
        // BAF 섹션 직전에 위치 확인
        int bafIdx = result.indexOf("到着地BAF");
        assertThat(firstIdx).isLessThan(bafIdx);
    }

    @Test
    @DisplayName("SEAIMP1 서명: 마츠모토 인사말 및 BAF 패턴 치환")
    void testSeaimp1Signature() {
        String original = "<p>내용</p>**HOLIDAY NOTICE**<br>구 공휴일 안내● 도착지 BAF 요금 안내";
        String holidayText = "May 3rd (Sat) ~ May 6th (Tue): Golden Week";

        String result = builder.generateSignatureForEmail("seaimp1@fatesinc.com", original, holidayText);

        assertThat(result).contains("FATES / 松本 마츠모토 드림 MATSUMOTO");
        assertThat(result).contains("Golden Week");
        assertThat(result).contains("도착지 BAF 요금");
    }

    @Test
    @DisplayName("SEAIMP1 서명: 이미 마츠모토 인사말이 있을 때 중복 추가하지 않고 BAF 직전에 공휴일 삽입")
    void testSeaimp1Signature_PreserveExistingIntroAndSingleNotice() {
        String original = "<div>감사합니다.<br>よろしくお願いいたします。<br>FATES / 松本 마츠모토 드림 MATSUMOTO</div>" +
                "<span style=\"color: red;\">**HOLIDAY NOTICE**<br>OldNotice</span>" +
                "<p>본문 내용</p>" +
                "●到着地BAF改定料金のお知らせ?(FCL)●";
        String holidayText = "September 19th (Sat) ~ September 23rd (Wed): Silver Week";

        String result = builder.generateSignatureForEmail("seaimp1@fatesinc.com", original, holidayText);

        // 마츠모토 인사말 1회만 존재 (중복 없음)
        int introCount = result.split("MATSUMOTO", -1).length - 1;
        assertThat(introCount).isEqualTo(1);

        // HOLIDAY NOTICE 1회만 존재 및 OldNotice 제거
        assertThat(result).doesNotContain("OldNotice");
        int noticeCount = result.split("\\*\\*HOLIDAY NOTICE\\*\\*", -1).length - 1;
        assertThat(noticeCount).isEqualTo(1);

        // 위치 확인: 마츠모토 인사말 -> 본문 -> HOLIDAY NOTICE -> BAF 안내
        int introIdx = result.indexOf("MATSUMOTO");
        int noticeIdx = result.indexOf("**HOLIDAY NOTICE**");
        int bafIdx = result.indexOf("到着地BAF");
        assertThat(introIdx).isLessThan(noticeIdx);
        assertThat(noticeIdx).isLessThan(bafIdx);
    }

    @Test
    @DisplayName("복귀일 계산: 토요일/일요일 종료 시 월요일로 복귀일 계산")
    void testCalculateResumeDate() {
        ZoneId zone = ZoneId.of("Asia/Tokyo");

        // 토요일 종료
        ZonedDateTime sat = ZonedDateTime.of(2026, 5, 2, 0, 0, 0, 0, zone);
        LocalDate resumeFromSat = builder.calculateResumeDate(sat);
        assertThat(resumeFromSat).isEqualTo(LocalDate.of(2026, 5, 4)); // 월요일

        // 일요일 종료
        ZonedDateTime sun = ZonedDateTime.of(2026, 5, 3, 0, 0, 0, 0, zone);
        LocalDate resumeFromSun = builder.calculateResumeDate(sun);
        assertThat(resumeFromSun).isEqualTo(LocalDate.of(2026, 5, 4)); // 월요일

        // 평일(화요일) 종료
        ZonedDateTime tue = ZonedDateTime.of(2026, 5, 5, 0, 0, 0, 0, zone);
        LocalDate resumeFromTue = builder.calculateResumeDate(tue);
        assertThat(resumeFromTue).isEqualTo(LocalDate.of(2026, 5, 5));
    }

    @Test
    @DisplayName("부재중(Vacation) HTML 생성")
    void testBuildVacationHtml() {
        String noticeText = "May 3rd (Sat) ~ May 6th (Tue): Golden Week";
        LocalDate resumeDate = LocalDate.of(2026, 5, 7);

        String html = builder.buildVacationHtml(noticeText, resumeDate);

        assertThat(html).contains("**HOLIDAY NOTICE**");
        assertThat(html).contains(noticeText);
        assertThat(html).contains("Resume on May 7th, 2026<br>Fates Inc.");
    }
}
