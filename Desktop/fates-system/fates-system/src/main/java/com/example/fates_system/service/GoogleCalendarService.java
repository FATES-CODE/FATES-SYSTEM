package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.HolidayEventDto;
import com.example.fates_system.dto.HolidayNoticeResult;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.Events;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.function.Predicate;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleCalendarService {

    private final GoogleAuthService googleAuthService;
    private final AppProperties appProperties;
    private final HtmlSignatureBuilder signatureBuilder;

    private static final ZoneId DEFAULT_ZONE = ZoneId.of("Asia/Tokyo");

    public HolidayNoticeResult getUpcomingHolidays(boolean isKorea) {
        ZonedDateTime now = ZonedDateTime.now(isKorea ? ZoneId.of("Asia/Seoul") : DEFAULT_ZONE);
        ZonedDateTime startDate = now;
        ZonedDateTime endDate = now.plusMonths(3);

        List<HolidayEventDto> rawEvents = new ArrayList<>();

        Predicate<HolidayEventDto> isWeekdayHoliday = ev -> {
            DayOfWeek dow = ev.getStart().getDayOfWeek();
            if (dow == DayOfWeek.SATURDAY || dow == DayOfWeek.SUNDAY) {
                return false;
            }
            boolean isSkipped = appProperties.getSkipHolidays().contains(ev.getTitle());
            return !isSkipped;
        };

        try {
            Calendar calendarClient = googleAuthService.getCalendarClient();
            if (isKorea) {
                fetchCalendarEvents(calendarClient, appProperties.getCalendars().getKorea(), startDate, endDate, isWeekdayHoliday, rawEvents);
            } else {
                fetchCalendarEvents(calendarClient, appProperties.getCalendars().getJapan(), startDate, endDate, isWeekdayHoliday, rawEvents);
                fetchCalendarEvents(calendarClient, appProperties.getCalendars().getCustom(), startDate, endDate, ev -> {
                    String title = ev.getTitle() != null ? ev.getTitle().toUpperCase() : "";
                    return (title.contains("GOLDEN") || title.contains("SILVER") || title.contains("NEW"));
                }, rawEvents);
            }
        } catch (Exception e) {
            log.error("Google Calendar 조회 실패: {}", e.getMessage(), e);
            throw new RuntimeException("Google Calendar 조회 중 오류 발생: " + e.getMessage(), e);
        }

        return processAndGroupEvents(rawEvents);
    }

    private void fetchCalendarEvents(Calendar calendarClient, String calendarId,
                                     ZonedDateTime startDate, ZonedDateTime endDate,
                                     Predicate<HolidayEventDto> filter,
                                     List<HolidayEventDto> outputList) {
        if (calendarId == null || calendarId.isBlank()) return;

        try {
            Events events = calendarClient.events().list(calendarId)
                    .setTimeMin(new DateTime(Date.from(startDate.toInstant())))
                    .setTimeMax(new DateTime(Date.from(endDate.toInstant())))
                    .setSingleEvents(true)
                    .setOrderBy("startTime")
                    .execute();

            if (events.getItems() != null) {
                for (Event event : events.getItems()) {
                    HolidayEventDto dto = convertToDto(event);
                    if (filter.test(dto)) {
                        outputList.add(dto);
                    }
                }
            }
        } catch (Exception e) {
            log.warn("캘린더 ID [{}] 이벤트 조회 실패: {}", calendarId, e.getMessage());
        }
    }

    private HolidayEventDto convertToDto(Event event) {
        String title = event.getSummary() != null ? event.getSummary() : "";
        ZonedDateTime start;
        ZonedDateTime end;
        boolean isAllDay = false;

        if (event.getStart().getDateTime() != null) {
            start = ZonedDateTime.ofInstant(Instant.ofEpochMilli(event.getStart().getDateTime().getValue()), DEFAULT_ZONE);
        } else {
            isAllDay = true;
            LocalDate startDate = LocalDate.parse(event.getStart().getDate().toStringRfc3339());
            start = startDate.atStartOfDay(DEFAULT_ZONE);
        }

        if (event.getEnd().getDateTime() != null) {
            end = ZonedDateTime.ofInstant(Instant.ofEpochMilli(event.getEnd().getDateTime().getValue()), DEFAULT_ZONE);
        } else {
            LocalDate endDate = LocalDate.parse(event.getEnd().getDate().toStringRfc3339());
            end = endDate.atStartOfDay(DEFAULT_ZONE);
        }

        return HolidayEventDto.builder()
                .title(title)
                .start(start)
                .end(end)
                .isAllDay(isAllDay)
                .build();
    }

    public HolidayNoticeResult processAndGroupEvents(List<HolidayEventDto> rawEvents) {
        if (rawEvents == null || rawEvents.isEmpty()) {
            return HolidayNoticeResult.empty();
        }

        // 시작 시간 오름차순, 종료 시간 내림차순 정렬
        rawEvents.sort(Comparator
                .comparing(HolidayEventDto::getStart)
                .thenComparing(HolidayEventDto::getEnd, Comparator.reverseOrder())
        );

        // 연속 공휴일 병합
        List<GroupedHoliday> grouped = new ArrayList<>();
        GroupedHoliday cur = new GroupedHoliday(
                rawEvents.get(0).getStart(),
                rawEvents.get(0).getEnd(),
                new ArrayList<>(List.of(rawEvents.get(0).getTitle()))
        );

        for (int i = 1; i < rawEvents.size(); i++) {
            HolidayEventDto ev = rawEvents.get(i);
            if (!ev.getStart().isAfter(cur.end)) { // evStart <= cur.end
                if (ev.getEnd().isAfter(cur.end)) {
                    cur.end = ev.getEnd();
                }
                if (!cur.names.contains(ev.getTitle())) {
                    cur.names.add(ev.getTitle());
                }
            } else {
                grouped.add(cur);
                cur = new GroupedHoliday(ev.getStart(), ev.getEnd(), new ArrayList<>(List.of(ev.getTitle())));
            }
        }
        grouped.add(cur);

        // 안내 문구 생성
        List<String> noticeLines = new ArrayList<>();
        for (GroupedHoliday g : grouped) {
            String summary = String.join(", ", g.names);
            String upper = summary.toUpperCase();

            // 5월: MonthValue=5 (JS에서는 getMonth() === 4)
            if (upper.contains("GOLDEN") || (g.start.getMonthValue() == 5 && g.names.size() > 1)) {
                summary = "Golden Week";
            }
            // 9월: MonthValue=9 (JS에서는 getMonth() === 8)
            else if (upper.contains("SILVER") || (g.start.getMonthValue() == 9 && g.names.size() > 1)) {
                summary = "Silver Week";
            } else if (upper.contains("NEW")) {
                summary = "New Year Holidays";
            }

            ZonedDateTime realEnd = g.end.minusSeconds(1);
            long durationDays = ChronoUnit.DAYS.between(g.start.toLocalDate(), g.end.toLocalDate());
            String startStr = signatureBuilder.formatCustomDate(g.start);

            if (durationDays > 1) {
                String endStr = signatureBuilder.formatCustomDate(realEnd);
                noticeLines.add(startStr + " ~ " + endStr + ": " + summary);
            } else {
                noticeLines.add(startStr + ": " + summary);
            }
        }

        GroupedHoliday nearest = grouped.get(0);
        LocalDate resumeDate = signatureBuilder.calculateResumeDate(nearest.end);

        return HolidayNoticeResult.builder()
                .hasHolidays(true)
                .finalNoticeText(String.join("<br>", noticeLines))
                .nearestNoticeText(noticeLines.get(0))
                .nearestStart(nearest.start)
                .nearestEnd(nearest.end)
                .resumeDate(resumeDate)
                .build();
    }

    public static class GroupedHoliday {
        public ZonedDateTime start;
        public ZonedDateTime end;
        public List<String> names;

        public GroupedHoliday(ZonedDateTime start, ZonedDateTime end, List<String> names) {
            this.start = start;
            this.end = end;
            this.names = names;
        }
    }
}
