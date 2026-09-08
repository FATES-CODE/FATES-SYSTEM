package com.example.fates_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HolidayEventDto {
    private String title;
    private ZonedDateTime start;
    private ZonedDateTime end;
    private boolean isAllDay;
}
