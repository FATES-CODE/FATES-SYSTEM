package com.example.fates_system.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class PanoceanScheduleIntegrationTest {

    @Autowired
    private PanoceanScheduleService panoceanScheduleService;

    @Test
    @DisplayName("팬오션 일본->한국 스케줄 구글 시트 PANOCEAN 탭 동기화 테스트")
    void testSyncToGoogleSheet() {
        String spreadsheetId = "11fc0ml4jJ24jsD1pUJ18K5RoRXcf4D0LcWcKFDuSMKs";
        boolean success = panoceanScheduleService.syncMonthlySchedulesToSheet(spreadsheetId);
        assertThat(success).isTrue();
    }
}
