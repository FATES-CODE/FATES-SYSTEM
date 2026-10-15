package com.example.fates_system.domain.shipping.service;

import com.example.fates_system.common.config.AppProperties;
import com.example.fates_system.domain.shipping.dto.CarrierInfoDto;
import com.example.fates_system.domain.shipping.dto.ShippingScheduleSummaryDto;
import com.example.fates_system.domain.shipping.dto.VesselScheduleDto;
import com.google.api.services.sheets.v4.Sheets;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.http.HttpClient;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.example.fates_system.common.google.GoogleAuthService;

/**
 * 선박 스케줄 수집 및 오케스트레이션 서비스
 */
@Slf4j
@Service
public class ShippingScheduleService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;
    private final VssApiClient vssApiClient;
    private final LegacyShippingScraperService legacyScraperService;
    private final ShippingScheduleSheetSyncService sheetSyncService;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.ALWAYS)
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    /** IP 차단 방지: 동시 요청을 최대 3개로 제한하는 전용 스레드 풀 */
    private final ExecutorService carrierExecutor = Executors.newFixedThreadPool(3);

    /** IP 차단 방지: 2시간(7200초) 인메모리 캐시 */
    private static final long CACHE_TTL_SECONDS = 7200;
    private final Map<String, CacheEntry> scheduleCache = new ConcurrentHashMap<>();

    private static class CacheEntry {
        final ShippingScheduleSummaryDto data;
        final Instant expiresAt;

        CacheEntry(ShippingScheduleSummaryDto data, long ttlSeconds) {
            this.data = data;
            this.expiresAt = Instant.now().plusSeconds(ttlSeconds);
        }

        boolean isExpired() {
            return Instant.now().isAfter(expiresAt);
        }
    }

    private static final ZoneId JST = ZoneId.of("Asia/Tokyo");
    private static final Pattern DATE_EXTRACTION_PATTERN =
            Pattern.compile("(?:(\\d{4})[-/])?(\\d{1,2})[-/](\\d{1,2})");

    private static final Set<String> KOREAN_PORTS = Set.of(
            "KOREA", "BUSAN", "PUSAN", "INCHEON", "INCHON", "GWANGYANG", "KWANGYANG",
            "PYEONGTAEK", "PYONGTAEK", "ULSAN", "POHANG", "MASAN", "GUNSAN", "DAESAN", "MOKPO", "DONGHAE", "JEJU",
            "釜山", "仁川", "光陽", "蔚山", "浦項", "馬山", "群山", "大山", "平沢", "木浦", "東海", "済州"
    );

    public ShippingScheduleService(
            AppProperties appProperties,
            GoogleAuthService googleAuthService,
            VssApiClient vssApiClient,
            LegacyShippingScraperService legacyScraperService,
            ShippingScheduleSheetSyncService sheetSyncService) {
        this.appProperties = appProperties;
        this.googleAuthService = googleAuthService;
        this.vssApiClient = vssApiClient;
        this.legacyScraperService = legacyScraperService;
        this.sheetSyncService = sheetSyncService;
    }

    /**
     * 지원하는 선사 목록 반환
     */
    public List<CarrierInfoDto> getCarriers() {
        String baseUrl = appProperties.getShipping().getBaseUrl();
        Map<String, String> carrierMap = appProperties.getShipping().getCarriers();
        List<CarrierInfoDto> list = new ArrayList<>();
        carrierMap.forEach((name, slug) -> list.add(new CarrierInfoDto(name, slug, baseUrl + "/" + slug)));
        return list;
    }

    public ShippingScheduleSummaryDto fetchSchedules() {
        return fetchSchedules(null, null, false);
    }

    public ShippingScheduleSummaryDto fetchSchedules(List<String> carrierNames, Integer months) {
        return fetchSchedules(carrierNames, months, false);
    }

    /**
     * 선박 스케줄 수집 (VSS API 우선 시도 후 실패 시 레거시 스크래핑)
     */
    public ShippingScheduleSummaryDto fetchSchedules(List<String> carrierNames, Integer months, boolean forceRefresh) {
        int fetchMonths = (months != null && months > 0) ? months : appProperties.getShipping().getFetchMonths();
        String carrierKey = (carrierNames != null && !carrierNames.isEmpty())
                ? String.join(",", carrierNames).toUpperCase()
                : "ALL";
        String cacheKey = carrierKey + "_" + fetchMonths;

        if (!forceRefresh) {
            CacheEntry cached = scheduleCache.get(cacheKey);
            if (cached != null && !cached.isExpired()) {
                log.info("[ShippingScheduleService] Cache hit for key '{}' (Total: {} schedules)",
                        cacheKey, cached.data.getTotalCount());
                return cached.data;
            }
        }

        Map<String, String> allCarriers = appProperties.getShipping().getCarriers();
        Map<String, String> targetCarriers = new LinkedHashMap<>();

        if (carrierNames != null && !carrierNames.isEmpty()) {
            Set<String> upperRequested = new HashSet<>();
            carrierNames.forEach(c -> upperRequested.add(c.toUpperCase()));
            allCarriers.forEach((name, slug) -> {
                if (upperRequested.contains(name.toUpperCase())) {
                    targetCarriers.put(name, slug);
                }
            });
        } else {
            targetCarriers.putAll(allCarriers);
        }

        LocalDate today = LocalDate.now(JST);
        LocalDate startDate = today;
        LocalDate endDate = today.plusMonths(fetchMonths);

        log.info("[ShippingScheduleService] Scraping {} carriers (Range: {} ~ {}, {}M, Max 3 concurrent workers)",
                targetCarriers.size(), startDate, endDate, fetchMonths);

        List<CompletableFuture<List<VesselScheduleDto>>> futures = new ArrayList<>();
        targetCarriers.forEach((carrierName, slug) -> {
            CompletableFuture<List<VesselScheduleDto>> future = CompletableFuture.supplyAsync(
                    () -> fetchSingleCarrier(carrierName, slug, today),
                    carrierExecutor
            );
            futures.add(future);
        });

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

        List<VesselScheduleDto> allSchedules = new ArrayList<>();
        for (CompletableFuture<List<VesselScheduleDto>> future : futures) {
            try {
                List<VesselScheduleDto> list = future.get();
                if (list != null) {
                    allSchedules.addAll(list);
                }
            } catch (Exception e) {
                log.warn("[ShippingScheduleService] Async task error: {}", e.getMessage());
            }
        }

        List<VesselScheduleDto> koreaBoundSchedules = allSchedules.stream()
                .filter(dto -> isInDateRange(dto.getArrival(), dto.getBerthing(), dto.getSailing(), startDate, endDate))
                .filter(this::isKoreaBound)
                .sorted(Comparator.comparing(
                        dto -> dto.getSailing() != null && !dto.getSailing().isBlank() ? dto.getSailing() :
                                (dto.getBerthing() != null && !dto.getBerthing().isBlank() ? dto.getBerthing() : "9999-99-99")
                ))
                .toList();

        // 스마트 조회: 한국행 + 오늘 이후 스케줄 중 Original ETA가 비어있는 극소수 선박만 증명서(certificate) 조회
        int enrichedCount = 0;
        for (VesselScheduleDto dto : koreaBoundSchedules) {
            if ((dto.getOriginalEta() == null || dto.getOriginalEta().isBlank())
                    && dto.getDetailUrl() != null && !dto.getDetailUrl().isBlank()) {
                legacyScraperService.sleepSafe(200);
                String origEta = legacyScraperService.fetchOriginalEtaFromCertificate(httpClient, dto.getDetailUrl());
                if (origEta != null && !origEta.isBlank()) {
                    dto.setOriginalEta(origEta);
                    enrichedCount++;
                }
            }
        }
        if (enrichedCount > 0) {
            log.info("[ShippingScheduleService] Enriched {} Korea-bound schedules with Original ETA from certificate", enrichedCount);
        }

        String nowIso = ZonedDateTime.now(JST).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        String rangeDisplay = startDate + " ~ " + endDate + " (" + fetchMonths + "M)";

        log.info("[ShippingScheduleService] Total schedules collected: {} -> Korea-bound ({}M): {}",
                allSchedules.size(), fetchMonths, koreaBoundSchedules.size());

        ShippingScheduleSummaryDto summary = ShippingScheduleSummaryDto.builder()
                .date(rangeDisplay)
                .fetchedAt(nowIso)
                .totalCount(koreaBoundSchedules.size())
                .schedules(koreaBoundSchedules)
                .build();

        scheduleCache.put(cacheKey, new CacheEntry(summary, CACHE_TTL_SECONDS));
        return summary;
    }

    private List<VesselScheduleDto> fetchSingleCarrier(String carrierName, String slug, LocalDate today) {
        try {
            List<VesselScheduleDto> vssList = vssApiClient.fetchSchedules(httpClient, carrierName, slug, today);
            if (vssList != null && !vssList.isEmpty()) {
                return vssList;
            }
        } catch (Exception e) {
            log.debug("[ShippingScheduleService] VSS API not available for '{}' ({}): {}", carrierName, slug, e.getMessage());
        }
        return legacyScraperService.fetchFromLegacyHtml(httpClient, carrierName, slug, today);
    }

    private boolean isInDateRange(String arrival, String berthing, String sailing, LocalDate startDate, LocalDate endDate) {
        List<LocalDate> dates = new ArrayList<>();
        addExtractedDates(dates, arrival, startDate.getYear());
        addExtractedDates(dates, berthing, startDate.getYear());
        addExtractedDates(dates, sailing, startDate.getYear());

        if (dates.isEmpty()) {
            return false;
        }

        // 스케줄 내의 모든 일정이 오늘(startDate) 이전인 과거 스케줄은 제외
        LocalDate maxDate = Collections.max(dates);
        if (maxDate.isBefore(startDate)) {
            return false;
        }

        // 날짜 중 하나라도 startDate(오늘) ~ endDate 범위에 포함되어야 함
        return dates.stream().anyMatch(d -> !d.isBefore(startDate) && !d.isAfter(endDate));
    }

    private void addExtractedDates(List<LocalDate> list, String dtStr, int defaultYear) {
        if (dtStr == null || dtStr.isBlank()) {
            return;
        }
        Matcher m = DATE_EXTRACTION_PATTERN.matcher(dtStr);
        while (m.find()) {
            try {
                String yStr = m.group(1);
                int year = (yStr != null && !yStr.isBlank()) ? Integer.parseInt(yStr) : defaultYear;
                int month = Integer.parseInt(m.group(2));
                int day = Integer.parseInt(m.group(3));

                list.add(LocalDate.of(year, month, day));
            } catch (Exception ignored) {
            }
        }
    }

    private boolean isKoreaBound(VesselScheduleDto dto) {
        if (dto == null) return false;
        String pod = dto.getPod();
        if (pod == null || pod.isBlank()) {
            return false;
        }
        String upperPod = pod.toUpperCase();

        boolean matchedKoreanPort = false;
        for (String kp : KOREAN_PORTS) {
            if (upperPod.contains(kp)) {
                matchedKoreanPort = true;
                break;
            }
        }
        if (!matchedKoreanPort) {
            return false;
        }

        List<String> foreignPorts = List.of(
                "SHANGHAI", "NINGBO", "QINGDAO", "XIAMEN", "SHEKOU", "YANTIAN", "TIANJIN", "XINGANG",
                "DALIAN", "NANSHA", "FUZHOU", "LIANYUNGANG", "HONG KONG", "SINGAPORE", "HO CHI MINH",
                "HAIPHONG", "BANGKOK", "LAEM CHABANG", "JAKARTA", "MANILA", "PORT KELANG", "PENANG",
                "COLOMBO", "DUBAI", "KARACHI", "QASIM", "NHAVA SHEVA", "CHENNAI", "LOS ANGELES", "LONG BEACH"
        );
        for (String fp : foreignPorts) {
            if (upperPod.contains(fp)) {
                return false;
            }
        }
        return true;
    }

    public boolean updateShippingGoogleSheet(String spreadsheetIdOrName) {
        return updateShippingGoogleSheet(spreadsheetIdOrName, null);
    }

    public boolean updateShippingGoogleSheet(String spreadsheetIdOrName, Integer months) {
        String targetSpreadsheetId = spreadsheetIdOrName;
        if (targetSpreadsheetId == null || targetSpreadsheetId.isBlank()) {
            targetSpreadsheetId = appProperties.getShipping().getSpreadsheetId();
        }
        if (targetSpreadsheetId == null || targetSpreadsheetId.isBlank()) {
            targetSpreadsheetId = appProperties.getLogSheetId();
        }

        try {
            ShippingScheduleSummaryDto summary = fetchSchedules(null, months, true);
            Sheets sheetsClient = googleAuthService.getSheetsClient();
            return sheetSyncService.syncSchedulesToSheet(sheetsClient, targetSpreadsheetId, summary);
        } catch (Exception e) {
            log.error("[ShippingScheduleService] Failed to update Google Sheet: {}", e.getMessage(), e);
            return false;
        }
    }
}
