package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.CklineScheduleDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class CklineScheduleServiceTest {

    private CklineScheduleService cklineScheduleService;
    private AppProperties appProperties;

    @Mock
    private GoogleAuthService googleAuthService;

    @BeforeEach
    void setUp() {
        appProperties = new AppProperties();
        cklineScheduleService = new CklineScheduleService(appProperties, googleAuthService);
    }

    @Test
    @DisplayName("CK LINE 지원 항구 목록(일본 및 한국) 정상 조회 검증")
    void testFetchPorts() {
        Map<String, List<Map<String, String>>> ports = cklineScheduleService.fetchPorts();
        assertThat(ports).containsKey("JP");
        assertThat(ports).containsKey("KR");
        assertThat(ports.get("JP")).isNotEmpty();
        assertThat(ports.get("KR")).isNotEmpty();

        System.out.println("=== JP Ports Count: " + ports.get("JP").size());
        System.out.println("=== KR Ports Count: " + ports.get("KR").size());
    }

    @Test
    @DisplayName("CK LINE 일본->한국 2달치 운항 스케줄 수집 (R01 및 R02 상세) 검증")
    void testFetchMonthlySchedules() {
        List<CklineScheduleDto> list = cklineScheduleService.fetchMonthlySchedules(YearMonth.of(2026, 9));
        assertThat(list).isNotNull();
        System.out.println("=== Total CK LINE Schedules for 2 months (starting 2026-09): " + list.size());

        for (int i = 0; i < Math.min(list.size(), 10); i++) {
            CklineScheduleDto s = list.get(i);
            System.out.println(String.format("[%d] %s (%s) | POL: %s (%s) -> POD: %s (%s) | ETD: %s | ETA: %s | Close: %s",
                    i + 1, s.getVesselName(), s.getVoyageNo(), s.getPol(), s.getPolName(),
                    s.getPod(), s.getPodName(), s.getEtd(), s.getEta(), s.getCargoClose()));
        }
    }
}