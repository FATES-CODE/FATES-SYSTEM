package com.example.fates_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SinokorScheduleDto {
    @Builder.Default
    private String carrier = "SINOKOR";
    private String vesselName;        // 선박명 (예: STAR VOYAGER)
    private String voyageNo;           // 항차 (예: 2639E)
    private String vesselVoyage;       // 배이름이랑번호 (예: STAR VOYAGER 2639E)
    private String svc;                // 서비스 항로명 (예: KJS8)
    private String pol;                // 출발항 코드 (예: KRPUS)
    private String polName;            // 출발지명 (예: Busan)
    private String polTerminal;        // 출발 터미널 (예: 부산 BPT신선대(BPTS))
    private String departureDisplay;   // 화면/시트 표시용 출발지 (예: Busan (부산 BPT신선대(BPTS)))
    private String pod;                // 도착항 코드 (예: JPTYO)
    private String podName;            // 도착지명 (예: Tokyo)
    private String podTerminal;        // 도착 터미널 (예: SHINAGAWA)
    private String arrivalDisplay;     // 화면/시트 표시용 도착지 (예: Tokyo (SHINAGAWA))
    private String etd;                // 출발시간 (예: 2026-10-02 09:00)
    private String eta;                // 도착시간 (예: 2026-10-04 04:30)
    private String docCut;             // 서류 마감 (DOCUDATE, 예: 2026-09-30 14:00)
    private String cyCut;              // 컨테이너/CY 마감 (CNTRDATE, 예: 2026-09-30 17:00)
    private String cyDocCut;           // CY/DOC CUT (예: CY 2026-09-30 17:00 / DOC 2026-09-30 14:00)
    private String tsGb;               // 환적 구분 (직항 / TS)
    private String tsPort;             // 환적항
}
