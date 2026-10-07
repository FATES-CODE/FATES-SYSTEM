package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.CarrierInfoDto;
import com.example.fates_system.dto.ShippingScheduleSummaryDto;
import com.example.fates_system.dto.VesselScheduleDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class ShippingScheduleServiceTest {

    private ShippingScheduleService shippingScheduleService;
    private AppProperties appProperties;

    @Mock
    private GoogleAuthService googleAuthService;

    @BeforeEach
    void setUp() {
        appProperties = new AppProperties();
        shippingScheduleService = new ShippingScheduleService(appProperties, googleAuthService);
    }

    @Test
    @DisplayName("지원 선사 목록 26개 정상 조회 테스트")
    void testGetCarriers() {
        List<CarrierInfoDto> carriers = shippingScheduleService.getCarriers();
        assertThat(carriers).hasSize(26);
        assertThat(carriers).extracting(CarrierInfoDto::getName)
                .contains("HMM", "SINOKOR", "HEUNG A", "CK LINE", "KMTC");
    }

    @Test
    @DisplayName("HMM 선사 스케줄 조회 시 한국 도착 데이터 수집 검증")
    void testFetchSchedulesMultiPort() {
        ShippingScheduleSummaryDto summary = shippingScheduleService.fetchSchedules(List.of("HMM"));
        assertThat(summary).isNotNull();
        System.out.println("=== Total Schedules: " + summary.getTotalCount());
        for (VesselScheduleDto s : summary.getSchedules()) {
            System.out.println("Carrier: " + s.getCarrier() + " | Vessel: " + s.getVesselName() + " | POL: '" + s.getPol() + "' | POD: '" + s.getPod() + "' | OriginalEta: '" + s.getOriginalEta() + "' | Sailing: " + s.getSailing());
            assertThat(s.getPod()).matches("(?i).*(KOREA|BUSAN|PUSAN|INCHEON|INCHON|GWANGYANG|KWANGYANG|PYEONGTAEK|ULSAN).*");
        }
    }

    @Test
    @DisplayName("항구명 정제 테스트")
    void testCleanPortName() {
        assertThat(cleanPort("大阪 OSAKA")).isEqualTo("OSAKA");
        assertThat(cleanPort("博多 HAKATA")).isEqualTo("HAKATA");
        assertThat(cleanPort("- 横浜 YOKOHAMA")).isEqualTo("YOKOHAMA");
        assertThat(cleanPort("名古屋 NAGOYA")).isEqualTo("NAGOYA");
        assertThat(cleanPort("- 大阪 OSAKA")).isEqualTo("OSAKA");
        assertThat(cleanPort("- 神戸 KOBE")).isEqualTo("KOBE");
        assertThat(cleanPort("- 博多")).isEqualTo("HAKATA");
        assertThat(cleanPort("- 博多 HAKATA")).isEqualTo("HAKATA");
        assertThat(cleanPort("-  東京 TOKYO")).isEqualTo("TOKYO");
        assertThat(cleanPort("TOKYO")).isEqualTo("TOKYO");
        assertThat(cleanPort("門司")).isEqualTo("MOJI");
        // 멱등성 (2차 정제 시에도 원형 유지) 검증
        assertThat(cleanPort("OSAKA")).isEqualTo("OSAKA");
        assertThat(cleanPort("HAKATA")).isEqualTo("HAKATA");
        assertThat(cleanPort("KOBE")).isEqualTo("KOBE");
        // 新規追加: 水島, 福山, 大分
        assertThat(cleanPort("水島")).isEqualTo("MIZUSHIMA");
        assertThat(cleanPort("福山")).isEqualTo("FUKUYAMA");
        assertThat(cleanPort("大分")).isEqualTo("OITA");
    }

    @Test
    @DisplayName("Original ETA 추출 및 정제 테스트 (ETD 제외, ETA만 추출)")
    void testExtractOriginalEtaValue() {
        String val1 = extractOriginalEta("2026/09/21(MON) - 2026/09/21(MON)");
        assertThat(val1).isEqualTo("2026/09/21");

        String val2 = extractOriginalEta("2026/09/15(TUE) - 2026/09/16(WED)");
        assertThat(val2).isEqualTo("2026/09/15");

        String val3 = extractOriginalEta("2026-10-01 - 2026-10-02");
        assertThat(val3).isEqualTo("2026-10-01");

        // 이미지에 나온 일본어 요일 포맷 테스트: 앞에 있는 날짜만 정확히 추출
        String valJapanese = extractOriginalEta("2026/09/25 (金) - 2026/09/25 (金)");
        assertThat(valJapanese).isEqualTo("2026/09/25");

        String val4 = extractOriginalEta("-- - --");
        assertThat(val4).isNull();
    }

    @Test
    @DisplayName("오늘 날짜 판별 테스트 (2026/10/10 등 다른 날짜가 10/1로 오인되지 않아야 함)")
    void testMatchesDate() {
        java.time.LocalDate today = java.time.LocalDate.of(2026, 10, 1);
        
        // 10월 1일 정상 매칭 케이스
        assertThat(invokeMatchesDate("2026/10/01 01:05", today)).isTrue();
        assertThat(invokeMatchesDate("2026/10/1 01:05", today)).isTrue();
        assertThat(invokeMatchesDate("2026-10-01", today)).isTrue();
        assertThat(invokeMatchesDate("10/01 12:00", today)).isTrue();
        assertThat(invokeMatchesDate("10/1", today)).isTrue();

        // 10월 10일~19일 등 다른 날짜가 매칭되면 안 됨 (버그 재현 방지)
        assertThat(invokeMatchesDate("2026/10/10", today)).isFalse();
        assertThat(invokeMatchesDate("2026/10/10 12:00", today)).isFalse();
        assertThat(invokeMatchesDate("2026/10/11", today)).isFalse();
        assertThat(invokeMatchesDate("2026/10/15", today)).isFalse();
        assertThat(invokeMatchesDate("2026-10-10", today)).isFalse();
        assertThat(invokeMatchesDate("10/10", today)).isFalse();
        assertThat(invokeMatchesDate("2026/09/25", today)).isFalse();
    }

    private boolean invokeMatchesDate(String dtStr, java.time.LocalDate today) {
        return (boolean) org.springframework.test.util.ReflectionTestUtils.invokeMethod(
                shippingScheduleService, "matchesDate", dtStr, today);
    }

    private String extractOriginalEta(String raw) {
        return (String) org.springframework.test.util.ReflectionTestUtils.invokeMethod(
                shippingScheduleService, "extractOriginalEtaValue", raw);
    }

    private String cleanPort(String raw) {
        return (String) org.springframework.test.util.ReflectionTestUtils.invokeMethod(
                shippingScheduleService, "cleanPortNameToEnglish", raw);
    }

    private void logSummary(ShippingScheduleSummaryDto summary) {
        System.out.println("Fetched date: " + summary.getDate());
        System.out.println("Total schedules: " + summary.getTotalCount());
        summary.getSchedules().forEach(s -> 
            System.out.println("Vessel: " + s.getVesselName() + " | Voyage: " + s.getVoyage() 
                    + " | POL(출발): " + s.getPol() + " | POD(도착): " + s.getPod()
                    + " | Berthing: " + s.getBerthing() + " | Sailing: " + s.getSailing() 
                    + " | Terminal: " + s.getTerminal())
        );
    }
}
