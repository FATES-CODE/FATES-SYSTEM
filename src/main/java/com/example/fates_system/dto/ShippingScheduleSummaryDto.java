package com.example.fates_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingScheduleSummaryDto {
    private String date;
    private String fetchedAt;
    private int totalCount;
    private List<VesselScheduleDto> schedules;
}
