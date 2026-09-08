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
}
