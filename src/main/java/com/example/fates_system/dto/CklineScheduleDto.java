package com.example.fates_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CklineScheduleDto {
    @Builder.Default
    private String carrier = "CK LINE";
    private String vesselName;        // 선박명 (예: VICTORY STAR)
    private String voyageNo;           // 항차 (예: 2623W)
    private String vvd;                // VVD 코드 (예: VSTA2623W)
    private String pol;                // 출발항 코드 (예: JPTYO)
    private String polName;            // 출발지명 (예: TOKYO, JAPAN)
    private String departureTerminal;  // 출발 터미널 (예: SGCT(SHINAGAWA CONTAINER TERMINAL))
    private String etd;                // 출발일시 (예: 2026-09-05 23:30)
    private String pod;                // 도착항 코드 (예: KRPUS)
    private String podName;            // 도착지명 (예: BUSAN, KOREA)
    private String arrivalTerminal;    // 도착 터미널 (예: HGCT(HUTCHISON GAMMAN CONTAINER TERMINAL))
    private String eta;                // 도착일시 (예: 2026-09-09 16:00)
    private String docClose;           // 서류 마감 (DOC_CLOSE)
    private String cargoClose;         // 화물/컨테이너 마감 (CARGO_CLOSE / CNTR_CLOSE)
    private String mrn;                // MRN 번호 (MFEMRN)
    private String callingPort;        // 기항지 (OUTCALLPORT)
}