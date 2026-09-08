package com.example.fates_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.ZonedDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HolidayNoticeResult {
    private boolean hasHolidays;
    private String finalNoticeText;
    private String nearestNoticeText;
    private ZonedDateTime nearestStart;
    private ZonedDateTime nearestEnd;
    private LocalDate resumeDate;

    public static HolidayNoticeResult empty() {
        return HolidayNoticeResult.builder()
                .hasHolidays(false)
                .finalNoticeText("")
                .nearestNoticeText("")
                .nearestStart(null)
                .nearestEnd(null)
                .resumeDate(null)
                .build();
    }
}
