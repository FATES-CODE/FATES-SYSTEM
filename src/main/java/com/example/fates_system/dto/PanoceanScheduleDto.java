package com.example.fates_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PanoceanScheduleDto {
    @Builder.Default
    private String carrier = "PANOCEAN";
    private String vesselName;        // 선박명 (예: STAR VOYAGER)
    private String voyageNo;           // 항차 (예: 2642)
    private String vesselVoyage;       // 배이름이랑번호 (예: STAR VOYAGER 2642)
    private String routeCode;          // 항로 코드 (예: KH1)
    private String pol;                // 출발항 코드 (예: JPTYO)
    private String polName;            // 출발지명 (예: TOKYO, JAPAN)
    private String pod;                // 도착항 코드 (예: KRPUS)
    private String podName;            // 도착지명 (예: BUSAN, KOREA)
    private String departureDate;      // 출발일시 (ETD, 예: 2026/10/24 03:00)
    private String arrivalDate;        // 도착일시 (ETA, 예: 2026/10/27 11:00)
    private String docuDate;           // 서류 마감 (예: 2026/10/22 16:00)
    private String cctDate;            // CY 마감 (예: 2026/10/22 16:00)
    private String transitTime;        // 운항일수
    private String tsChk;              // 환적 여부
}
