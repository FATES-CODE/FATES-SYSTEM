package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.CarrierInfoDto;
import com.example.fates_system.dto.ShippingScheduleSummaryDto;
import com.example.fates_system.dto.VesselScheduleDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ClearValuesRequest;
import com.google.api.services.sheets.v4.model.ValueRange;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ShippingScheduleService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.ALWAYS)
            .build();

    /** IP 차단 방지: 동시 요청을 최대 3개로 제한하는 전용 스레드 풀 */
    private final ExecutorService carrierExecutor = Executors.newFixedThreadPool(3);

    /** IP 차단 방지: 2시간(7200초) 인메모리 캐시 (반복 호출 시 외부 사이트 트래픽 0%) */
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


    public ShippingScheduleService(
            AppProperties appProperties,
            GoogleAuthService googleAuthService) {
        this.appProperties = appProperties;
        this.googleAuthService = googleAuthService;
        log.info("[ShippingScheduleService] Registered carrier adapters: {}");
    }

    private static final ZoneId JST = ZoneId.of("Asia/Tokyo");
    private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
    private static final Charset JAPANESE_CHARSET = Charset.forName("Windows-31J");

    private static final Set<String> KOREAN_PORTS = Set.of(
            "KOREA", "BUSAN", "PUSAN", "INCHEON", "INCHON", "GWANGYANG", "KWANGYANG",
            "PYEONGTAEK", "PYONGTAEK", "ULSAN", "POHANG", "MASAN", "GUNSAN", "DAESAN", "MOKPO", "DONGHAE", "JEJU",
            "釜山", "仁川", "光陽", "蔚山", "浦項", "馬山", "群山", "大山", "平沢", "木浦", "東海", "済州"
    );

    // 한일 전용 항로 서비스 코드 패턴 (ONE: JK, JKS, JK2 / OOCL: PKOR, KTX1, KTX2 / KOR 등)
    private static final java.util.regex.Pattern KOREA_SERVICE_PATTERN =
            java.util.regex.Pattern.compile("^(?:JK\\d*|JKS|PKOR|KTX\\d*|.*KOR.*)$", java.util.regex.Pattern.CASE_INSENSITIVE);

    /**
     * 지원하는 선사 목록 반환
     */
    public List<CarrierInfoDto> getCarriers() {
        String baseUrl = appProperties.getShipping().getBaseUrl();
        Map<String, String> carrierMap = appProperties.getShipping().getCarriers();
        List<CarrierInfoDto> list = new ArrayList<>();
        carrierMap.forEach((name, slug) -> {
            list.add(new CarrierInfoDto(name, slug, baseUrl + "/" + slug));
        });
        return list;
    }

    /**
     * 지정 선사(미지정 시 전체 선사) 한국 도착 선박 스케줄 전체 수집 (기본 설정 개월 수, 캐시 우선)
     */
    public ShippingScheduleSummaryDto fetchSchedules(List<String> requestedCarriers) {
        return fetchSchedules(requestedCarriers, null, false);
    }

    /**
     * 지정 선사 및 지정 개월 수 한국 도착 선박 스케줄 수집 (캐시 우선)
     */
    public ShippingScheduleSummaryDto fetchSchedules(List<String> requestedCarriers, Integer monthsParam) {
        return fetchSchedules(requestedCarriers, monthsParam, false);
    }

    /**
     * 지정 선사 및 지정 개월 수 한국 도착 선박 스케줄 수집 (forceRefresh 시 캐시 무시하고 외부 재조회)
     */
    public ShippingScheduleSummaryDto fetchSchedules(List<String> requestedCarriers, Integer monthsParam, boolean forceRefresh) {
        int fetchMonths = (monthsParam != null && monthsParam > 0)
                ? monthsParam
                : appProperties.getShipping().getFetchMonths();
        if (fetchMonths <= 0) fetchMonths = 2; // 기본 2개월치

        // 1. IP 차단 방지: 스마트 인메모리 캐시 확인 (2시간 유효)
        String carrierKey = (requestedCarriers != null && !requestedCarriers.isEmpty())
                ? requestedCarriers.stream().sorted().collect(Collectors.joining(","))
                : "ALL";
        String cacheKey = carrierKey + "_" + fetchMonths + "M";

        if (!forceRefresh) {
            CacheEntry cached = scheduleCache.get(cacheKey);
            if (cached != null && !cached.isExpired()) {
                log.info("[ShippingScheduleService] Returning CACHED schedules for '{}' (Total: {}, External calls: 0)",
                        cacheKey, cached.data.getTotalCount());
                return cached.data;
            }
        }

        Map<String, String> allCarriers = appProperties.getShipping().getCarriers();
        Map<String, String> targetCarriers = new LinkedHashMap<>();

        if (requestedCarriers != null && !requestedCarriers.isEmpty()) {
            Set<String> upperRequested = new HashSet<>();
            for (String c : requestedCarriers) {
                if (c != null) upperRequested.add(c.trim().toUpperCase());
            }
            allCarriers.forEach((name, slug) -> {
                if (upperRequested.contains(name.toUpperCase())) {
                    targetCarriers.put(name, slug);
                }
            });
        } else {
            targetCarriers.putAll(allCarriers);
        }

        LocalDate today = LocalDate.now(JST);
        LocalDate startDate = today.minusDays(2); // 최근 2일 이내 출발 포함
        LocalDate endDate = today.plusMonths(fetchMonths);

        log.info("[ShippingScheduleService] Scraping {} carriers (Range: {} ~ {}, {}M, Max 3 concurrent workers)",
                targetCarriers.size(), startDate, endDate, fetchMonths);

        List<CompletableFuture<List<VesselScheduleDto>>> futures = new ArrayList<>();

        // 2. IP 차단 방지: carrierExecutor(최대 동시 3개 작업)를 사용하여 DDoS성 폭주 방지
        targetCarriers.forEach((carrierName, slug) -> {
            CompletableFuture<List<VesselScheduleDto>> future = CompletableFuture.supplyAsync(() ->
                    fetchSingleCarrier(carrierName, slug, today),
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

        // 전체 선사 스케줄 중 지정 기간(기본: 오늘~2개월) 범위 내이면서 '한국 도착(POD)' 대상인 스케줄만 필터링 & 날짜순 정렬
        List<VesselScheduleDto> koreaBoundSchedules = allSchedules.stream()
                .filter(dto -> isInDateRange(dto.getArrival(), dto.getBerthing(), dto.getSailing(), startDate, endDate))
                .filter(this::isKoreaBound)
                .sorted(Comparator.comparing(
                        dto -> dto.getSailing() != null && !dto.getSailing().isBlank() ? dto.getSailing() :
                                (dto.getBerthing() != null && !dto.getBerthing().isBlank() ? dto.getBerthing() : "9999-99-99")
                ))
                .toList();

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

        // 3. 인메모리 캐시에 저장 (2시간 동안 재호출 방어)
        scheduleCache.put(cacheKey, new CacheEntry(summary, CACHE_TTL_SECONDS));

        return summary;
    }

    /**
     * 입항/접안/출항 일자 중 지정 날짜 범위(startDate ~ endDate)에 포함되는지 판별
     */
    private boolean isInDateRange(String arrival, String berthing, String sailing, LocalDate startDate, LocalDate endDate) {
        return dateMatchesRange(arrival, startDate, endDate)
                || dateMatchesRange(berthing, startDate, endDate)
                || dateMatchesRange(sailing, startDate, endDate);
    }

    private static final java.util.regex.Pattern DATE_EXTRACTION_PATTERN =
            java.util.regex.Pattern.compile("(?:(\\d{4})[-/])?(\\d{1,2})[-/](\\d{1,2})");

    private boolean dateMatchesRange(String dtStr, LocalDate startDate, LocalDate endDate) {
        if (dtStr == null || dtStr.isBlank()) {
            return false;
        }
        java.util.regex.Matcher m = DATE_EXTRACTION_PATTERN.matcher(dtStr);
        while (m.find()) {
            try {
                String yStr = m.group(1);
                int year = (yStr != null && !yStr.isBlank()) ? Integer.parseInt(yStr) : startDate.getYear();
                int month = Integer.parseInt(m.group(2));
                int day = Integer.parseInt(m.group(3));

                LocalDate d = LocalDate.of(year, month, day);
                if (!d.isBefore(startDate) && !d.isAfter(endDate)) {
                    return true;
                }
            } catch (Exception ignored) {
            }
        }
        return false;
    }

    /**
     * 한국 도착 스케줄 여부 엄격 판별
     */
    private boolean isKoreaBound(VesselScheduleDto dto) {
        if (dto == null) return false;
        String pod = dto.getPod();
        if (pod == null || pod.isBlank()) {
            return false; // 목적지가 불분명한 경우 제외
        }
        String upperPod = pod.toUpperCase();
        
        // 1. 한국 주요 항구 목록과 일치/포함 여부 확인
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

        // 2. 타국 항구(중국, 동남아, 중동, 미주 등)가 포함된 경우 확실하게 제외
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


    private List<VesselScheduleDto> fetchSingleCarrier(String carrierName, String slug, LocalDate today) {
        try {
            List<VesselScheduleDto> vssList = fetchFromVssApi(carrierName, slug, today);
            if (vssList != null && !vssList.isEmpty()) {
                return vssList;
            }
        } catch (Exception e) {
            log.debug("[ShippingScheduleService] VSS API not available for '{}' ({}): {}", carrierName, slug, e.getMessage());
        }

        // 3. 레거시 toyoshingo.com HTML 크롤링
        return fetchFromLegacyHtml(carrierName, slug, today);
    }

    /**
     * 신규 Vessel Schedule Service REST API (vessel-schedule-service.com) 연동
     */
    private List<VesselScheduleDto> fetchFromVssApi(String carrierName, String slug, LocalDate today) {
        String vssApiBaseUrl = appProperties.getShipping().getVssApiBaseUrl();
        if (vssApiBaseUrl == null || vssApiBaseUrl.isBlank()) {
            vssApiBaseUrl = "https://api-shipper.vessel-schedule-service.com/api/v1";
        }

        List<VesselScheduleDto> list = new ArrayList<>();
        // 최대 10페이지(최대 1,000건)까지 탐색하여 2개월치 스케줄 누락 방지 (last_page 도달 시 조기 종료)
        int maxPages = 10;

        try {
            for (int page = 1; page <= maxPages; page++) {
                String apiUrl = vssApiBaseUrl + "/" + slug + "/voyages/tracking?per_page=100&page=" + page;
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(apiUrl))
                        .header("User-Agent", USER_AGENT)
                        .header("Accept", "application/json")
                        .GET()
                        .build();

                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
                if (response.statusCode() != 200) {
                    break;
                }

                JsonNode root = objectMapper.readTree(response.body());
                JsonNode dataArray = root.path("data");
                if (!dataArray.isArray() || dataArray.isEmpty()) {
                    break;
                }

                for (JsonNode item : dataArray) {
                    String vesselName = item.path("vessel_name").asText("").trim();
                    String importVoyage = item.path("import_voyage").asText("").trim();
                    String exportVoyage = item.path("export_voyage").asText("").trim();
                    String voyage = !exportVoyage.isEmpty() ? exportVoyage : importVoyage;

                    String arrivalDate = item.path("arrival_date").asText("").trim();
                    String arrivalTime = item.path("arrival_time").asText("").trim();
                    String arrival = formatDateTime(arrivalDate, arrivalTime);

                    String origArrivalDate = item.path("proforma_ETA").asText("").trim();
                    if (origArrivalDate.isEmpty()) {
                        origArrivalDate = item.path("proforma_eta").asText("").trim();
                    }
                    if (origArrivalDate.isEmpty()) {
                        origArrivalDate = item.path("original_arrival_date").asText("").trim();
                    }
                    if (origArrivalDate.isEmpty()) {
                        origArrivalDate = item.path("orig_arrival_date").asText("").trim();
                    }
                    if (origArrivalDate.isEmpty()) {
                        origArrivalDate = item.path("original_eta").asText("").trim();
                    }
                    String origArrivalTime = item.path("proforma_ETA_time").asText("").trim();
                    if (origArrivalTime.isEmpty()) {
                        origArrivalTime = item.path("original_arrival_time").asText("").trim();
                    }
                    String originalEta = formatDateTime(origArrivalDate, origArrivalTime);

                    String berthingDate = item.path("berthing_date").asText("").trim();
                    String berthingTime = item.path("berthing_time").asText("").trim();
                    String berthing = formatDateTime(berthingDate, berthingTime);

                    String sailingDate = item.path("sailing_date").asText("").trim();
                    String sailingTime = item.path("sailing_time").asText("").trim();
                    String sailing = formatDateTime(sailingDate, sailingTime);

                    if (vesselName.isEmpty()) {
                        continue;
                    }

                    String polName = item.path("locate_port").path("name_en").asText("");
                    if (polName.isEmpty()) {
                        polName = item.path("locate_port").path("name_ja").asText("");
                    }
                    String cleanPol = cleanPortNameToEnglish(polName);

                    String pod = item.path("to_port_name_E").asText("").trim();
                    if (pod.isEmpty()) {
                        pod = item.path("to_port_name_J").asText("").trim();
                    }

                    // to_port_name이 비어 있는 선사(ONE, OOCL, MSC 등)는 한일 전용 서비스 항로 코드(JK, PKOR, KTX 등) 검사
                    String serviceCode = item.path("service").asText("").trim();
                    if (pod.isEmpty() && !serviceCode.isEmpty() && KOREA_SERVICE_PATTERN.matcher(serviceCode).matches()) {
                        pod = "KOREA (" + serviceCode + ")";
                    }
                    pod = cleanPortNameToEnglish(pod);

                    String terminal = "";
                    JsonNode cyArray = item.path("cy_informations");
                    if (cyArray.isArray() && !cyArray.isEmpty()) {
                        terminal = cyArray.get(0).path("cy_name_jp").asText("");
                        if (terminal.isEmpty()) {
                            terminal = cyArray.get(0).path("cy_name_en").asText("");
                        }
                    }
                    if (terminal.isEmpty()) {
                        terminal = item.path("berth").path("name_jp").asText("");
                        if (terminal.isEmpty()) {
                            terminal = item.path("berth").path("name_en").asText("");
                        }
                    }

                    VesselScheduleDto dto = VesselScheduleDto.builder()
                            .carrier(carrierName)
                            .vesselName(vesselName)
                            .voyage(voyage)
                            .pol(cleanPol)
                            .pod(pod)
                            .originalEta(originalEta)
                            .arrival(arrival)
                            .berthing(berthing)
                            .sailing(sailing)
                            .terminal(terminal.trim())
                            .build();

                    list.add(dto);
                }

                // 마지막 페이지인 경우 중단
                int lastPage = root.path("meta").path("last_page").asInt(1);
                if (page >= lastPage) {
                    break;
                }

                // IP 차단 방지: 페이지 간 120ms 미세 딜레이
                try {
                    Thread.sleep(120);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }

            if (list.isEmpty()) {
                return null;
            }

            // 중복 제거
            Set<String> seenKeys = new HashSet<>();
            List<VesselScheduleDto> uniqueList = new ArrayList<>();
            for (VesselScheduleDto dto : list) {
                String key = dto.getVesselName() + "|" + dto.getVoyage() + "|" + dto.getSailing() + "|" + dto.getTerminal();
                if (!seenKeys.contains(key)) {
                    seenKeys.add(key);
                    uniqueList.add(dto);
                }
            }

            log.info("[ShippingScheduleService] VSS API Carrier '{}' ({}) fetched {} schedules across pages", carrierName, slug, uniqueList.size());
            return uniqueList;

        } catch (Exception e) {
            log.debug("[ShippingScheduleService] VSS API Carrier '{}' ({}) error: {}", carrierName, slug, e.getMessage());
            return null;
        }
    }

    private String formatDateTime(String date, String time) {
        if (date == null || date.isBlank()) return null;
        if (time != null && !time.isBlank()) {
            return date + " " + time;
        }
        return date;
    }

    /**
     * 레거시 Toyoshingo HTML 크롤링
     */
    private List<VesselScheduleDto> fetchFromLegacyHtml(String carrierName, String slug, LocalDate today) {
        String baseUrl = appProperties.getShipping().getBaseUrl();
        String carrierBaseUrl = baseUrl + "/" + slug + "/";
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(carrierBaseUrl))
                    .header("User-Agent", USER_AGENT)
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(JAPANESE_CHARSET));
            if (response.statusCode() != 200) {
                log.warn("[ShippingScheduleService] Carrier '{}' ({}) returned HTTP {}", carrierName, slug, response.statusCode());
                return Collections.emptyList();
            }

            // 메인 페이지 내 존재하는 모든 항구 링크 (port=) 및 항구명 추출
            Document doc = Jsoup.parse(response.body());
            Map<String, String> portUrlMap = new LinkedHashMap<>();
            for (Element a : doc.select("a[href*=\"port=\"]")) {
                String href = a.attr("href");
                String rawText = a.text().trim();
                String upperText = rawText.toUpperCase();
                if (href.contains("port=") && !upperText.contains("WEEK") && !rawText.contains("<") && !rawText.contains(">")) {
                    try {
                        URI resolved = URI.create(carrierBaseUrl).resolve(href);
                        String cleanPortName = cleanPortNameToEnglish(rawText);
                        if (!cleanPortName.isEmpty()) {
                            portUrlMap.put(resolved.toString(), cleanPortName);
                        }
                    } catch (Exception ignored) {
                    }
                }
            }

            if (portUrlMap.isEmpty()) {
                portUrlMap.put(carrierBaseUrl, carrierName);
            }

            // 발견된 모든 항구 페이지를 병렬 수집 (carrierExecutor 적용으로 동시 3개 이하 유지)
            List<CompletableFuture<List<VesselScheduleDto>>> portFutures = new ArrayList<>();
            portUrlMap.forEach((portUrl, polName) -> {
                portFutures.add(CompletableFuture.supplyAsync(() -> fetchSinglePortPage(portUrl, carrierName, polName, today), carrierExecutor));
            });

            CompletableFuture.allOf(portFutures.toArray(new CompletableFuture[0])).join();

            List<VesselScheduleDto> carrierSchedules = new ArrayList<>();
            for (CompletableFuture<List<VesselScheduleDto>> future : portFutures) {
                try {
                    List<VesselScheduleDto> list = future.get();
                    if (list != null) {
                        carrierSchedules.addAll(list);
                    }
                } catch (Exception e) {
                    log.warn("[ShippingScheduleService] Port page fetch error: {}", e.getMessage());
                }
            }

            // 선박명 + 선박번호 + 출항일자 + 터미널 조합으로 중복 제거
            Set<String> seenKeys = new HashSet<>();
            List<VesselScheduleDto> uniqueList = new ArrayList<>();
            for (VesselScheduleDto dto : carrierSchedules) {
                String key = dto.getVesselName() + "|" + dto.getVoyage() + "|" + dto.getSailing() + "|" + dto.getTerminal();
                if (!seenKeys.contains(key)) {
                    seenKeys.add(key);
                    uniqueList.add(dto);
                }
            }

            return uniqueList;

        } catch (Exception e) {
            log.error("[ShippingScheduleService] Carrier '{}' ({}) fetch error: {}", carrierName, slug, e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * 개별 항구 페이지 HTTP 요청 및 파싱
     */
    private List<VesselScheduleDto> fetchSinglePortPage(String portUrl, String carrierName, String polName, LocalDate today) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(portUrl))
                    .header("User-Agent", USER_AGENT)
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(JAPANESE_CHARSET));
            if (response.statusCode() != 200) {
                return Collections.emptyList();
            }

            return parseCarrierHtml(response.body(), carrierName, polName, today, portUrl);

        } catch (Exception e) {
            log.warn("[ShippingScheduleService] Port URL '{}' fetch failed: {}", portUrl, e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * 선사 페이지 HTML 내 <a title="<dl>...</dl>"> 파싱 (전체 유효 스케줄 추출)
     */
    private List<VesselScheduleDto> parseCarrierHtml(String html, String carrierName, String polName, LocalDate today, String portUrl) {
        Document doc = Jsoup.parse(html);
        List<CompletableFuture<VesselScheduleDto>> futures = new ArrayList<>();

        for (Element a : doc.select("a[title]")) {
            String titleAttr = a.attr("title");
            if (!titleAttr.contains("<dt>")) {
                continue;
            }

            Map<String, String> dataMap = parseDlDtDd(titleAttr);

            String vessel = dataMap.getOrDefault("Vessel Name", "").trim();
            String voyage = dataMap.getOrDefault("Voyage", "").trim();
            String arrival = extractDateTime(dataMap.getOrDefault("Arrival", ""));
            String berthing = extractDateTime(dataMap.getOrDefault("Berthing", ""));
            String sailing = extractDateTime(dataMap.getOrDefault("Sailing", ""));
            String terminal = dataMap.getOrDefault("Terminal Name",
                    dataMap.getOrDefault("Berth Name", "")).trim();

            if (vessel.isEmpty()) {
                continue;
            }

            // 항구(POL) 및 목적지(POD) 설정 (기본값 KOREA)
            String pod = "KOREA";
            String rawRemarks = dataMap.getOrDefault("Remark", "");
            String upperRemarks = rawRemarks.toUpperCase();
            if (upperRemarks.contains("BUSAN") || upperRemarks.contains("PUSAN") || rawRemarks.contains("釜山")) {
                pod = "BUSAN";
            } else if (upperRemarks.contains("INCHEON") || upperRemarks.contains("INCHON") || rawRemarks.contains("仁川")) {
                pod = "INCHEON";
            } else if (upperRemarks.contains("GWANGYANG") || upperRemarks.contains("KWANGYANG") || rawRemarks.contains("光陽")) {
                pod = "GWANGYANG";
            } else if (upperRemarks.contains("ULSAN") || rawRemarks.contains("蔚山")) {
                pod = "ULSAN";
            } else if (upperRemarks.contains("PYEONGTAEK") || upperRemarks.contains("PYONGTAEK") || rawRemarks.contains("平沢")) {
                pod = "PYEONGTAEK";
            }

            // certificate.php 링크 수집
            String href = a.attr("href");
            String detailUrl = null;
            if (href != null && href.contains("certificate.php")) {
                try {
                    detailUrl = URI.create(portUrl).resolve(href).toString();
                } catch (Exception ignored) {
                }
            }

            String origFromMap = dataMap.getOrDefault("Original ETA", dataMap.getOrDefault("Original Arrival", ""));

            final String finalPod = pod;
            final String finalDetailUrl = detailUrl;

            futures.add(CompletableFuture.supplyAsync(() -> {
                String originalEta = null;
                if (!origFromMap.isBlank()) {
                    originalEta = extractOriginalEtaValue(origFromMap);
                }
                if (originalEta == null || originalEta.isBlank()) {
                    originalEta = fetchOriginalEtaFromCertificate(finalDetailUrl);
                }

                return VesselScheduleDto.builder()
                        .carrier(carrierName)
                        .vesselName(vessel)
                        .voyage(voyage)
                        .pol(cleanPortNameToEnglish(polName))
                        .pod(finalPod)
                        .originalEta(originalEta)
                        .arrival(arrival)
                        .berthing(berthing)
                        .sailing(sailing)
                        .terminal(terminal)
                        .build();
            }));
        }

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

        List<VesselScheduleDto> rawList = new ArrayList<>();
        for (CompletableFuture<VesselScheduleDto> future : futures) {
            try {
                VesselScheduleDto dto = future.get();
                if (dto != null) {
                    rawList.add(dto);
                }
            } catch (Exception e) {
                log.warn("[ShippingScheduleService] Error resolving vessel detail future: {}", e.getMessage());
            }
        }

        // 중복 제거 (vesselName + voyage + sailing)
        Set<String> seenKeys = new HashSet<>();
        List<VesselScheduleDto> uniqueList = new ArrayList<>();
        for (VesselScheduleDto dto : rawList) {
            String key = dto.getVesselName() + "|" + dto.getVoyage() + "|" + dto.getSailing();
            if (!seenKeys.contains(key)) {
                seenKeys.add(key);
                uniqueList.add(dto);
            }
        }

        return uniqueList;
    }

    /**
     * certificate.php 상세 페이지에서 Original ETA (Original ETA-ETD 중 ETA 항목만) 추출
     */
    private String fetchOriginalEtaFromCertificate(String detailUrl) {
        if (detailUrl == null || detailUrl.isBlank()) {
            return null;
        }
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(detailUrl))
                    .header("User-Agent", USER_AGENT)
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(JAPANESE_CHARSET));
            if (response.statusCode() != 200) {
                return null;
            }

            Document doc = Jsoup.parse(response.body());
            for (Element tr : doc.select("tr")) {
                Element th = tr.selectFirst("th");
                Element td = tr.selectFirst("td");
                if (th != null && td != null) {
                    String thText = th.text().trim();
                    if (thText.toUpperCase().contains("ORIGINAL ETA")
                            || thText.contains("オリジナルETA")
                            || thText.contains("オリジナル ETA")
                            || thText.contains("当初ETA")
                            || thText.contains("当初 ETA")
                            || thText.contains("O.ETA")) {
                        String rawVal = td.text().trim();
                        return extractOriginalEtaValue(rawVal);
                    }
                }
            }
        } catch (Exception e) {
            log.debug("[ShippingScheduleService] Failed to fetch original ETA from {}: {}", detailUrl, e.getMessage());
        }
        return null;
    }

    /**
     * Original ETA-ETD 문자열에서 ETA(앞 날짜)만 추출 및 정제.
     *
     * 지원 형식 예:
     *   "2026/09/25 (金) · 2026/09/25 (金)"  → "2026/09/25"
     *   "2026/09/21(MON) - 2026/09/21(MON)"  → "2026/09/21"
     *   "2026/09/15(TUE) – 2026/09/16(WED)"  → "2026/09/15"
     *
     * 구분자: " - " / " · " / "·" / "・" / "–" / "—" (날짜 내부 하이픈과 충돌 방지)
     * 날짜 뒤 요일 표기 "(金)" "(MON)" 등은 괄호째 제거.
     */
    private String extractOriginalEtaValue(String rawEtaEtd) {
        if (rawEtaEtd == null || rawEtaEtd.isBlank() || rawEtaEtd.startsWith("--")) {
            return null;
        }
        // 구분자 패턴:
        //   · (U+00B7 중간점), ・(U+30FB 일본어 가운뎃점), –, — → 공백 유무 무관
        //   - (하이픈) → 날짜 내부와 충돌 방지를 위해 반드시 앞뒤 공백 필요
        String[] parts = rawEtaEtd.split("\\s*[·・–—]\\s*|\\s+-\\s+");
        if (parts.length > 0) {
            // 요일 괄호 "(金)", "(MON)", "(TUE)" 등 제거 후 공백 정리
            String etaPart = parts[0].replaceAll("\\s*\\([^)]*\\)\\s*", "").trim();
            if (!etaPart.isEmpty() && !etaPart.startsWith("--")) {
                return etaPart;
            }
        }
        return null;
    }

    /**
     * <dl><dt>키</dt><dd>: 값</dd></dl> 구조 파싱
     */
    private Map<String, String> parseDlDtDd(String titleHtml) {
        Document dlDoc = Jsoup.parse(titleHtml);
        Map<String, String> map = new LinkedHashMap<>();

        List<String> dts = dlDoc.select("dt").eachText();
        List<Element> dds = dlDoc.select("dd");

        for (int i = 0; i < dts.size() && i < dds.size(); i++) {
            String key = dts.get(i).trim();
            String val = dds.get(i).text().replaceAll("^:\\s*", "").trim();
            map.put(key, val);
        }
        return map;
    }

    private String extractDateTime(String raw) {
        if (raw == null) return null;
        String trimmed = raw.trim();
        if (trimmed.isEmpty() || trimmed.startsWith("--")) {
            return null;
        }
        return trimmed;
    }

    private static final Map<String, String> JAPANESE_PORT_NAME_MAP = Map.ofEntries(
            Map.entry("博多", "HAKATA"),
            Map.entry("大阪", "OSAKA"),
            Map.entry("神戸", "KOBE"),
            Map.entry("横浜", "YOKOHAMA"),
            Map.entry("名古屋", "NAGOYA"),
            Map.entry("東京", "TOKYO"),
            Map.entry("門司", "MOJI"),
            Map.entry("下関", "SHIMONOSEKI"),
            Map.entry("清水", "SHIMIZU"),
            Map.entry("千葉", "CHIBA"),
            Map.entry("川崎", "KAWASAKI"),
            Map.entry("四日市", "YOKKAICHI"),
            Map.entry("広島", "HIROSHIMA"),
            Map.entry("徳山", "TOKUYAMA"),
            Map.entry("新潟", "NIIGATA"),
            Map.entry("金沢", "KANAZAWA"),
            Map.entry("富山", "TOYAMA"),
            Map.entry("敦賀", "TSURUGA"),
            Map.entry("伊予三島", "IYOMISHIMA"),
            Map.entry("松山", "MATSUYAMA"),
            Map.entry("今治", "IMABARI"),
            Map.entry("高松", "TAKAMATSU"),
            Map.entry("徳島", "TOKUSHIMA"),
            Map.entry("高知", "KOCHI"),
            Map.entry("八戸", "HACHINOHE"),
            Map.entry("仙台", "SENDAI"),
            Map.entry("小名浜", "ONAHAMA"),
            Map.entry("常陸那珂", "HITACHINAKA"),
            Map.entry("熊本", "KUMAMOTO"),
            Map.entry("細島", "HOSOSHIMA"),
            Map.entry("志布志", "SHIBUSHI"),
            Map.entry("鹿児島", "KAGOSHIMA"),
            Map.entry("那覇", "NAHA"),
            Map.entry("苫小牧", "TOMAKOMAI"),
            Map.entry("石狩", "ISHIKARI"),
            Map.entry("石狩湾新港", "ISHIKARI"),
            Map.entry("水島", "MIZUSHIMA"),
            Map.entry("福山", "FUKUYAMA"),
            Map.entry("大分", "OITA"),
            Map.entry("三島川之江", "MISHIMAKAWANOE"),
            Map.entry("岩国", "IWAKUNI"),
            Map.entry("大竹", "OTAKE"),
            Map.entry("三田尻中関", "MITAJIRINAKANOSEKI"),
            Map.entry("境港", "SAKAIMINATO"),
            Map.entry("舞鶴", "MAIZURU"),
            Map.entry("八代", "YATSUSHIRO"),
            Map.entry("薩摩川内", "SATSUMA SENDAI"),
            Map.entry("響灘", "HIBIKINADA"),
            Map.entry("伊万里", "IMARI"),
            Map.entry("長崎", "NAGASAKI"),
            Map.entry("釧路", "KUSHIRO"),
            Map.entry("函館", "HAKODATE"),
            Map.entry("釜石", "KAMAISHI"),
            Map.entry("豊橋", "TOYOHASHI"),
            Map.entry("和歌山", "WAKAYAMA"),
            Map.entry("秋田", "AKITA"),
            Map.entry("酒田", "SAKATA"),
            Map.entry("直江津", "NAOETSU"),
            Map.entry("伏木富山", "FUSHIKITOYAMA"),
            Map.entry("浜田", "HAMADA")
    );

    /**
     * 항구명에서 일본어/기호를 제거하고 영문 항구명만 추출 (영문이 없으면 사전 매핑)
     */
    private String cleanPortNameToEnglish(String raw) {
        if (raw == null || raw.isBlank()) {
            return "";
        }

        // 선두 및 후미의 기호/공백 제거 (하이픈, 화살표, 점 등)
        String cleaned = raw.replaceAll("^[\\s\\-<>—·・]+|[\\s\\-<>—·・]+$", "").trim();

        // 1. 이미 영문이 포함되어 있는 경우 (예: "大阪 OSAKA", "- 横浜 YOKOHAMA", "博多 HAKATA", "TOKYO") -> 영문 단어만 추출
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("[A-Za-z]+").matcher(cleaned);
        List<String> englishWords = new ArrayList<>();
        while (m.find()) {
            String w = m.group().trim().toUpperCase();
            if (!w.equals("PORT") && !w.equals("WEEK") && !w.equals("SCHEDULE") && !w.equals("TERMINAL")) {
                englishWords.add(w);
            }
        }
        if (!englishWords.isEmpty()) {
            return String.join(" ", englishWords);
        }

        // 2. 한자만 있는 경우 사전 매핑 (예: "博多" -> "HAKATA", "大阪" -> "OSAKA")
        for (Map.Entry<String, String> entry : JAPANESE_PORT_NAME_MAP.entrySet()) {
            if (cleaned.contains(entry.getKey())) {
                return entry.getValue();
            }
        }

        // 3. 매핑되지 않은 경우 비영문 문자 제거 후 반환 (단, 비어있으면 원본 반환)
        String onlyAlpha = cleaned.replaceAll("[^A-Za-z0-9\\s]", "").trim().toUpperCase();
        return onlyAlpha.isEmpty() ? cleaned : onlyAlpha;
    }

    /**
     * 구글 시트 (shipping-date) 업데이트 (기본 2개월치)
     */
    public boolean updateShippingGoogleSheet(String spreadsheetIdOrName) {
        return updateShippingGoogleSheet(spreadsheetIdOrName, null);
    }

    /**
     * 구글 시트 (shipping-date) 업데이트 (지정 개월 수)
     */
    public boolean updateShippingGoogleSheet(String spreadsheetIdOrName, Integer months) {
        String targetSpreadsheetId = spreadsheetIdOrName;
        if (targetSpreadsheetId == null || targetSpreadsheetId.isBlank()) {
            targetSpreadsheetId = appProperties.getShipping().getSpreadsheetId();
        }
        if (targetSpreadsheetId == null || targetSpreadsheetId.isBlank()) {
            targetSpreadsheetId = appProperties.getLogSheetId(); // fallback to default log sheet if not specified
        }

        try {
            // 구글 시트 동기화 시에는 캐시를 무시하고 최신 데이터 수집 (forceRefresh: true)
            ShippingScheduleSummaryDto summary = fetchSchedules(null, months, true);
            Sheets sheetsClient = googleAuthService.getSheetsClient();

            // A1:J5000 범위 클리어 (2개월치 대량 데이터 반영)
            try {
                sheetsClient.spreadsheets().values()
                        .clear(targetSpreadsheetId, "A1:J5000", new ClearValuesRequest())
                        .execute();
            } catch (Exception e) {
                log.warn("[ShippingScheduleService] Sheet clear warning: {}", e.getMessage());
            }

            List<List<Object>> rows = new ArrayList<>();
            // 헤더 작성 (출발항 POL, 도착항 POD, Original ETA 추가)
            rows.add(List.of("선사", "선박명", "선박번호", "출발항(POL)", "도착항(POD)", "Original ETA", "Arrival", "Berthing", "Sailing", "터미널"));

            for (VesselScheduleDto item : summary.getSchedules()) {
                rows.add(List.of(
                        item.getCarrier() != null ? item.getCarrier() : "",
                        item.getVesselName() != null ? item.getVesselName() : "",
                        item.getVoyage() != null ? item.getVoyage() : "",
                        item.getPol() != null ? item.getPol() : "",
                        item.getPod() != null ? item.getPod() : "",
                        item.getOriginalEta() != null ? item.getOriginalEta() : "",
                        item.getArrival() != null ? item.getArrival() : "",
                        item.getBerthing() != null ? item.getBerthing() : "",
                        item.getSailing() != null ? item.getSailing() : "",
                        item.getTerminal() != null ? item.getTerminal() : ""
                ));
            }

            ValueRange body = new ValueRange().setValues(rows);
            sheetsClient.spreadsheets().values()
                    .update(targetSpreadsheetId, "A1", body)
                    .setValueInputOption("USER_ENTERED")
                    .execute();

            log.info("[ShippingScheduleService] Successfully updated {} schedules into Google Sheet '{}'",
                    summary.getTotalCount(), targetSpreadsheetId);
            return true;

        } catch (Exception e) {
            log.error("[ShippingScheduleService] Failed to update Google Sheet: {}", e.getMessage(), e);
            return false;
        }
    }
}
