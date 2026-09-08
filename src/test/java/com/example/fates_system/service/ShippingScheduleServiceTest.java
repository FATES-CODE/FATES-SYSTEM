package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.CarrierInfoDto;
import com.example.fates_system.dto.ShippingScheduleSummaryDto;
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
    @DisplayName("지원 선사 목록 22개 정상 조회 테스트")
    void testGetCarriers() {
        List<CarrierInfoDto> carriers = shippingScheduleService.getCarriers();
        assertThat(carriers).hasSize(22);
        assertThat(carriers).extracting(CarrierInfoDto::getName)
                .contains("HMM", "SINOKOR", "HEUNG A", "CK LINE");
    }

    @Test
    @DisplayName("HMM 선사 스케줄 조회 시 요코하마/도쿄 등 다중 항구 데이터 수집 검증")
    void testFetchSchedulesMultiPort() {
        ShippingScheduleSummaryDto summary = shippingScheduleService.fetchSchedules(List.of("HMM"));
        assertThat(summary).isNotNull();
        assertThat(summary.getDate()).isNotBlank();
        logSummary(summary);
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
