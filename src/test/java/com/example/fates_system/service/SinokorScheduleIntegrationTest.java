package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.SinokorScheduleDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.YearMonth;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class SinokorScheduleIntegrationTest {

    private SinokorScheduleService sinokorScheduleService;
    private AppProperties appProperties;
    private GoogleAuthService googleAuthService;

    @BeforeEach
    void setUp() {
        appProperties = new AppProperties();
        appProperties.getGoogle().setServiceAccountKeyPath("credentials/service-account.json");
        appProperties.getGoogle().getSecretManager().setEnabled(false);

        googleAuthService = new GoogleAuthService(appProperties);
        googleAuthService.init();

        sinokorScheduleService = new SinokorScheduleService(appProperties, googleAuthService);
    }

    @Test
    @DisplayName("SINOKOR 일본->한국 2달치 스케줄 수집 검증")
    void testFetchSchedules() {
        YearMonth start = YearMonth.now();
        List<SinokorScheduleDto> list = sinokorScheduleService.fetchSchedules(start, 2);

        assertThat(list).isNotNull();
        System.out.println("=== Total SINOKOR JP->KR Schedules (2 months): " + list.size());

        for (int i = 0; i < Math.min(list.size(), 10); i++) {
            SinokorScheduleDto s = list.get(i);
            System.out.printf("[%d] %-40s | FROM: %-30s | TO: %-30s | ETD: %-16s | ETA: %-16s | CY/DOC: %s | CY: %s%n",
                    i + 1,
                    s.getVesselVoyage(),
                    s.getDepartureDisplay(),
                    s.getArrivalDisplay(),
                    s.getEtd(),
                    s.getEta(),
                    s.getCyDocCut(),
                    s.getCyCut());
        }

        System.out.println("=== 2654W specific verification ===");
        list.stream().filter(s -> s.getVesselVoyage() != null && s.getVesselVoyage().contains("2654W"))
                .forEach(s -> System.out.println(">>> 2654W: " + s.getVesselVoyage() + " | POL: " + s.getPolName() + " | POD: " + s.getPodName() + " | ETD: " + s.getEtd() + " | CY: " + s.getCyCut()));
    }

    @Test
    @DisplayName("SINOKOR 스케줄 수집 후 Google Sheet SNK 탭 저장 검증")
    void testSyncToGoogleSheet() {
        String spreadsheetId = "11fc0ml4jJ24jsD1pUJ18K5RoRXcf4D0LcWcKFDuSMKs";

        boolean success = sinokorScheduleService.syncSchedulesToSheet(spreadsheetId, 2);

        assertThat(success).isTrue();
        System.out.println("=== SINOKOR sync to Google Sheet SNK tab: " + (success ? "SUCCESS" : "FAILED"));
    }
}
