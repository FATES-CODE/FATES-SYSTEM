package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.HolidayEventDto;
import com.example.fates_system.dto.HolidayNoticeResult;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class GoogleCalendarServiceTest {

    @Mock
    private GoogleAuthService googleAuthService;

    private GoogleCalendarService calendarService;
    private HtmlSignatureBuilder signatureBuilder;
    private AppProperties appProperties;

    private final ZoneId zone = ZoneId.of("Asia/Tokyo");

    @BeforeEach
    void setUp() {
        appProperties = new AppProperties();
        signatureBuilder = new HtmlSignatureBuilder(appProperties);
        calendarService = new GoogleCalendarService(googleAuthService, appProperties, signatureBuilder);
    }

    @Test
    @DisplayName("골든위크 연속 공휴일 병합 및 문구 생성 검증")
    void testGoldenWeekGrouping() {
        List<HolidayEventDto> rawEvents = new ArrayList<>();
        // 5월 3일 ~ 5월 6일 공휴일들
        rawEvents.add(HolidayEventDto.builder()
                .title("Constitution Memorial Day")
                .start(ZonedDateTime.of(2026, 5, 3, 0, 0, 0, 0, zone))
                .end(ZonedDateTime.of(2026, 5, 4, 0, 0, 0, 0, zone))
                .build());
        rawEvents.add(HolidayEventDto.builder()
                .title("Greenery Day")
                .start(ZonedDateTime.of(2026, 5, 4, 0, 0, 0, 0, zone))
                .end(ZonedDateTime.of(2026, 5, 5, 0, 0, 0, 0, zone))
                .build());
        rawEvents.add(HolidayEventDto.builder()
                .title("Children's Day")
                .start(ZonedDateTime.of(2026, 5, 5, 0, 0, 0, 0, zone))
                .end(ZonedDateTime.of(2026, 5, 7, 0, 0, 0, 0, zone))
                .build());

        HolidayNoticeResult result = calendarService.processAndGroupEvents(rawEvents);

        assertThat(result.isHasHolidays()).isTrue();
        assertThat(result.getFinalNoticeText()).contains("Golden Week");
        assertThat(result.getFinalNoticeText()).contains("May 3rd (Sun) ~ May 6th (Wed): Golden Week");
        assertThat(result.getResumeDate()).isEqualTo(LocalDate.of(2026, 5, 7));
    }

    @Test
    @DisplayName("단일 공휴일 포맷 검증")
    void testSingleHoliday() {
        List<HolidayEventDto> rawEvents = new ArrayList<>();
        rawEvents.add(HolidayEventDto.builder()
                .title("Mountain Day")
                .start(ZonedDateTime.of(2026, 8, 11, 0, 0, 0, 0, zone))
                .end(ZonedDateTime.of(2026, 8, 12, 0, 0, 0, 0, zone))
                .build());

        HolidayNoticeResult result = calendarService.processAndGroupEvents(rawEvents);

        assertThat(result.isHasHolidays()).isTrue();
        assertThat(result.getFinalNoticeText()).isEqualTo("August 11th (Tue): Mountain Day");
        assertThat(result.getResumeDate()).isEqualTo(LocalDate.of(2026, 8, 12));
    }

    @Test
    @DisplayName("실버위크 주말 카운팅 검증: 월~수 공휴일이 직전 토, 일과 병합되어 5일 연휴(토일월화수) 생성")
    void testSilverWeekWeekendCounting() {
        List<HolidayEventDto> rawEvents = new ArrayList<>();
        // 2026년 9월 21일(월) ~ 9월 23일(수)
        rawEvents.add(HolidayEventDto.builder()
                .title("Respect for the Aged Day")
                .start(ZonedDateTime.of(2026, 9, 21, 0, 0, 0, 0, zone))
                .end(ZonedDateTime.of(2026, 9, 22, 0, 0, 0, 0, zone))
                .build());
        rawEvents.add(HolidayEventDto.builder()
                .title("Bridge Public holiday")
                .start(ZonedDateTime.of(2026, 9, 22, 0, 0, 0, 0, zone))
                .end(ZonedDateTime.of(2026, 9, 23, 0, 0, 0, 0, zone))
                .build());
        rawEvents.add(HolidayEventDto.builder()
                .title("Autumn Equinox")
                .start(ZonedDateTime.of(2026, 9, 23, 0, 0, 0, 0, zone))
                .end(ZonedDateTime.of(2026, 9, 24, 0, 0, 0, 0, zone))
                .build());

        HolidayNoticeResult result = calendarService.processAndGroupEvents(rawEvents);

        assertThat(result.isHasHolidays()).isTrue();
        assertThat(result.getFinalNoticeText()).contains("Silver Week");
        // 주말(9월 19일 토요일, 20일 일요일)이 카운팅되어 토~수 연휴가 됨
        assertThat(result.getFinalNoticeText()).isEqualTo("September 19th (Sat) ~ September 23rd (Wed): Silver Week");
        // 복귀일은 9월 24일 (목요일 평일)
        assertThat(result.getResumeDate()).isEqualTo(LocalDate.of(2026, 9, 24));
    }

    @Test
    @DisplayName("이벤트 목록이 없거나 빈 경우 empty 결과 반환 검증")
    void testEmptyEvents() {
        HolidayNoticeResult result = calendarService.processAndGroupEvents(new ArrayList<>());
        assertThat(result.isHasHolidays()).isFalse();
        assertThat(result.getFinalNoticeText()).isEmpty();
        assertThat(result.getResumeDate()).isNull();
    }

}
