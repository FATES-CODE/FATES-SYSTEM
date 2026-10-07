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
                // 1. 커스텀 캘린더 먼저 조회 (도메인 위임 사용하여 조직 내부 권한으로 상세 내용 조회)
                List<HolidayEventDto> customEvents = new ArrayList<>();
                String impersonateUser = (!appProperties.getTargetEmails().isEmpty()) ? appProperties.getTargetEmails().get(0) : "cloud@fatesinc.com";
                try {
                    log.info("[Calendar] 사용자 [{}] 권한으로 커스텀 캘린더 조회 시도 (스코프: {})", impersonateUser, GoogleAuthService.CALENDAR_SCOPES);
                    Calendar userCalendarClient = googleAuthService.getCalendarClientForUser(impersonateUser);
                    fetchCalendarEvents(userCalendarClient, appProperties.getCalendars().getCustom(), startDate, endDate, ev -> {
                        String title = ev.getTitle() != null ? ev.getTitle().toUpperCase() : "";
                        return (title.contains("GOLDEN") || title.contains("SILVER") || title.contains("NEW"));
                    }, customEvents);
                    log.info("[Calendar] 사용자 [{}] 권한으로 커스텀 캘린더 조회 성공: {}개 항목", impersonateUser, customEvents.size());
                } catch (Exception e) {
                    log.warn("사용자 [{}] 위임 커스텀 캘린더 조회 실패: {}", impersonateUser, e.getMessage(), e);
                    fetchCalendarEvents(calendarClient, appProperties.getCalendars().getCustom(), startDate, endDate, ev -> {
                        String title = ev.getTitle() != null ? ev.getTitle().toUpperCase() : "";
                        return (title.contains("GOLDEN") || title.contains("SILVER") || title.contains("NEW"));
                    }, customEvents);
                }

                // 2. 일본 국가 공휴일 조회 (단, 커스텀 이벤트 기간과 겹치는 공휴일은 커스텀 일정이 우선하므로 제외)
                List<HolidayEventDto> japanEvents = new ArrayList<>();
                fetchCalendarEvents(calendarClient, appProperties.getCalendars().getJapan(), startDate, endDate, isWeekdayHoliday, japanEvents);

                for (HolidayEventDto jEv : japanEvents) {
                    boolean coveredByCustom = customEvents.stream().anyMatch(cEv -> 
                        !jEv.getStart().isAfter(cEv.getEnd()) && !jEv.getEnd().isBefore(cEv.getStart())
                    );
                    if (!coveredByCustom) {
                        rawEvents.add(jEv);
                    } else {
                        log.info("[Holiday] 국가 공휴일 '{}' ({})는 커스텀 일정에 흡수되어 제외됨", jEv.getTitle(), jEv.getStart().toLocalDate());
                    }
                }

                // 커스텀 일정 추가 (토요일/일요일 시작이라도 그대로 유지)
                rawEvents.addAll(customEvents);
            }
        } catch (Exception e) {
            log.error("Google Calendar 조회 실패: {}", e.getMessage(), e);
            throw new RuntimeException("Google Calendar 조회 중 오류 발생: " + e.getMessage(), e);
        }

        // 중복 제거: 같은 날짜 + 같은 제목의 이벤트는 하나만 유지
        List<HolidayEventDto> deduped = new ArrayList<>();
        java.util.Set<String> seen = new java.util.HashSet<>();
        for (HolidayEventDto ev : rawEvents) {
            String key = ev.getStart().toLocalDate() + "|" + ev.getTitle();
            if (seen.add(key)) {
                deduped.add(ev);
            } else {
                log.warn("[Holiday] 중복 이벤트 제거: {} ({})", ev.getTitle(), ev.getStart().toLocalDate());
            }
        }
        log.info("[Holiday] rawEvents={}, deduped={}", rawEvents.size(), deduped.size());
        for (HolidayEventDto ev : deduped) {
            log.info("[Holiday] Event: '{}' | start={} | end={}", ev.getTitle(), ev.getStart().toLocalDate(), ev.getEnd().toLocalDate());
        }

        return processAndGroupEvents(deduped);
    }

    private void fetchCalendarEvents(Calendar calendarClient, String calendarId,
                                     ZonedDateTime startDate, ZonedDateTime endDate,
                                     Predicate<HolidayEventDto> filter,
                                     List<HolidayEventDto> outputList) {
        if (calendarId == null || calendarId.isBlank()) return;

        try {
            log.info("[Calendar] Fetching events from calendar: {}", calendarId);
            Events events = calendarClient.events().list(calendarId)
                    .setTimeMin(new DateTime(Date.from(startDate.toInstant())))
                    .setTimeMax(new DateTime(Date.from(endDate.toInstant())))
                    .setSingleEvents(true)
                    .setOrderBy("startTime")
                    .execute();

            if (events.getItems() != null) {
                log.info("[Calendar] Calendar [{}] returned {} items", calendarId, events.getItems().size());
                for (Event event : events.getItems()) {
                    HolidayEventDto dto = convertToDto(event);
                    if (dto.getEnd() != null && !dto.getEnd().isAfter(startDate)) {
                        log.info("[Calendar] Item: summary='{}', start={}, end={} -> 종료된 이벤트로 제외됨", 
                                dto.getTitle(), dto.getStart().toLocalDate(), dto.getEnd().toLocalDate());
                        continue;
                    }
                    boolean passed = filter.test(dto);
                    log.info("[Calendar] Item: summary='{}', start={}, end={}, filterPassed={}", 
                            dto.getTitle(), dto.getStart().toLocalDate(), dto.getEnd().toLocalDate(), passed);
                    if (passed) {
                        outputList.add(dto);
                    }
                }
            } else {
                log.info("[Calendar] Calendar [{}] returned null items", calendarId);
            }
        } catch (Exception e) {
            log.warn("캘린더 ID [{}] 이벤트 조회 실패: {}", calendarId, e.getMessage(), e);
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
            boolean isAdjacent = !ev.getStart().isAfter(cur.end); // evStart <= cur.end
            boolean isWeekendBridge = false;

            // 금요일 휴무(cur.end가 토요일 00:00) 후 월요일 휴무(ev.start가 월요일 00:00) 사이 주말 연결
            if (cur.end.getDayOfWeek() == DayOfWeek.SATURDAY && ev.getStart().getDayOfWeek() == DayOfWeek.MONDAY) {
                if (ChronoUnit.DAYS.between(cur.end.toLocalDate(), ev.getStart().toLocalDate()) <= 2) {
                    isWeekendBridge = true;
                }
            }

            if (isAdjacent || isWeekendBridge) {
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

        // 연휴 주말 자동 카운팅 (실버위크, 골든위크 등 2일 이상 연속 공휴일의 앞뒤 주말 포함)
        for (GroupedHoliday g : grouped) {
            String summary = String.join(", ", g.names);
            String upper = summary.toUpperCase();
            long holidayDays = ChronoUnit.DAYS.between(g.start.toLocalDate(), g.end.toLocalDate());

            boolean isMultiDayHoliday = upper.contains("GOLDEN") || upper.contains("SILVER") || upper.contains("NEW")
                    || (g.start.getMonthValue() == 5 && holidayDays >= 2)
                    || (g.start.getMonthValue() == 9 && holidayDays >= 2)
                    || holidayDays >= 2;

            if (isMultiDayHoliday) {
                // 시작일이 월요일이면 앞의 토요일부터 연휴 시작으로 확장 (토, 일 포함)
                if (g.start.getDayOfWeek() == DayOfWeek.MONDAY) {
                    g.start = g.start.minusDays(2);
                }
                // 종료일(exclusive)이 토요일(즉 마지막 휴일이 금요일)이면 일요일 밤(+2일)까지 확장 (토, 일 포함)
                if (g.end.getDayOfWeek() == DayOfWeek.SATURDAY) {
                    g.end = g.end.plusDays(2);
                }
            }
        }

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
