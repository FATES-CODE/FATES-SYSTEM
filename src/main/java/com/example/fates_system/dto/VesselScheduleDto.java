package com.example.fates_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VesselScheduleDto {
    private String carrier;
    private String vesselName;
    private String voyage;
    private String pol;
    private String pod;
    private String originalEta;
    private String arrival;
    private String berthing;
    private String sailing;
    private String terminal;
}
