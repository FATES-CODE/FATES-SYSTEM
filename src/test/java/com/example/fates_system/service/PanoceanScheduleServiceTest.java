package com.example.fates_system.service;

import com.example.fates_system.dto.PanoceanScheduleDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.YearMonth;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class PanoceanScheduleServiceTest {

    @Autowired
    private PanoceanScheduleService panoceanScheduleService;

    @Test
    @DisplayName("팬오션 일본->한국 스케줄 수집 테스트")
    void testFetchSchedules() {
        YearMonth target = YearMonth.now();
        List<PanoceanScheduleDto> list = panoceanScheduleService.fetchSchedules(target, 2);

        System.out.println("Fetched schedules size: " + list.size());
        for (int i = 0; i < Math.min(list.size(), 5); i++) {
            PanoceanScheduleDto s = list.get(i);
            System.out.println(String.format("[%d] %s | %s -> %s | ETD: %s | ETA: %s | CY: %s",
                    i + 1, s.getVesselVoyage(), s.getPolName(), s.getPodName(),
                    s.getDepartureDate(), s.getArrivalDate(), s.getCctDate()));
        }

        assertThat(list).isNotNull();
    }
}
