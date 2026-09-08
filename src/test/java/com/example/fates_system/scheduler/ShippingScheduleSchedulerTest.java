package com.example.fates_system.scheduler;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.service.ShippingScheduleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ShippingScheduleSchedulerTest {

    @Mock
    private ShippingScheduleService shippingScheduleService;

    private AppProperties appProperties;
    private ShippingScheduleScheduler scheduler;

    @BeforeEach
    void setUp() {
        appProperties = new AppProperties();
        scheduler = new ShippingScheduleScheduler(appProperties, shippingScheduleService);
    }

    @Test
    @DisplayName("스케줄러 실행 시 구글 시트 업데이트 서비스 정상 호출 검증")
    void testRunDailyShippingSyncEnabled() {
        appProperties.getShipping().setEnabled(true);
        when(shippingScheduleService.updateShippingGoogleSheet(null)).thenReturn(true);

        scheduler.runDailyShippingSync();

        verify(shippingScheduleService, times(1)).updateShippingGoogleSheet(null);
    }

    @Test
    @DisplayName("스케줄러 비활성화 시 구글 시트 업데이트 미실행 검증")
    void testRunDailyShippingSyncDisabled() {
        appProperties.getShipping().setEnabled(false);

        scheduler.runDailyShippingSync();

        verify(shippingScheduleService, never()).updateShippingGoogleSheet(anyString());
    }
}
