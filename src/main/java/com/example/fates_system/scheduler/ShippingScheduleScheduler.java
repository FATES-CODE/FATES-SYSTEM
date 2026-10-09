package com.example.fates_system.scheduler;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.service.ShippingScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Shipping Schedule Scheduler - triggers automatic Google Sheet update daily at 08:30 AM (JST).
 * Controlled by fates.shipping.enabled and fates.shipping.cron in application.yml.
 */
@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(prefix = "fates.shipping", name = "enabled", havingValue = "true")
public class ShippingScheduleScheduler {

    private final AppProperties appProperties;
    private final ShippingScheduleService shippingScheduleService;

    @Scheduled(cron = "${fates.shipping.cron:0 30 8 * * *}")
    public void runDailyShippingSync() {
        if (!appProperties.getShipping().isEnabled()) {
            log.debug("[ShippingScheduleScheduler] Shipping schedule sync disabled - skipping");
            return;
        }
        log.info("[ShippingScheduleScheduler] Daily trigger fired at 08:30 AM - updating Google Sheet with shipping schedules");
        try {
            boolean success = shippingScheduleService.updateShippingGoogleSheet(null);
            if (success) {
                log.info("[ShippingScheduleScheduler] Successfully updated shipping schedules into Google Sheet");
            } else {
                log.error("[ShippingScheduleScheduler] Failed to update shipping schedules into Google Sheet");
            }
        } catch (Exception e) {
            log.error("[ShippingScheduleScheduler] Unexpected error during shipping schedule sync: {}", e.getMessage(), e);
        }
    }
}
