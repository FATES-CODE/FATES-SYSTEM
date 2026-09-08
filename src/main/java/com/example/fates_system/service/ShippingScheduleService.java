package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.CarrierInfoDto;
import com.example.fates_system.dto.ShippingScheduleSummaryDto;
import com.example.fates_system.dto.VesselScheduleDto;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShippingScheduleService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.ALWAYS)
            .build();

    private static final ZoneId JST = ZoneId.of("Asia/Tokyo");
    private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
    private static final Charset JAPANESE_CHARSET = Charset.forName("Windows-31J");

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
     * 지정 선사(미지정 시 전체 22개 선사) 당일(JST 기준) 스케줄 병렬 수집
     */
    public ShippingScheduleSummaryDto fetchSchedules(List<String> requestedCarriers) {
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
        log.info("[ShippingScheduleService] Scraping {} carriers for date (JST): {}", targetCarriers.size(), today);

        List<CompletableFuture<List<VesselScheduleDto>>> futures = new ArrayList<>();

        targetCarriers.forEach((carrierName, slug) -> {
            CompletableFuture<List<VesselScheduleDto>> future = CompletableFuture.supplyAsync(() ->
                    fetchSingleCarrier(carrierName, slug, today)
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

        String nowIso = ZonedDateTime.now(JST).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

        return ShippingScheduleSummaryDto.builder()
                .date(today.toString())
                .fetchedAt(nowIso)
                .totalCount(allSchedules.size())
                .schedules(allSchedules)
                .build();
    }

    /**
     * 단일 선사의 전체 항구(요코하마, 도쿄, 나고야, 고베, 오사카, 하카타 등) 스케줄 병렬 수집
     */
    private List<VesselScheduleDto> fetchSingleCarrier(String carrierName, String slug, LocalDate today) {
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

            // 발견된 모든 항구 페이지를 병렬 수집
            List<CompletableFuture<List<VesselScheduleDto>>> portFutures = new ArrayList<>();
            portUrlMap.forEach((portUrl, polName) -> {
                portFutures.add(CompletableFuture.supplyAsync(() -> fetchSinglePortPage(portUrl, carrierName, polName, today)));
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

            return parseCarrierHtml(response.body(), carrierName, polName, today);

        } catch (Exception e) {
            log.warn("[ShippingScheduleService] Port URL '{}' fetch failed: {}", portUrl, e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * 선사 페이지 HTML 내 <a title="<dl>...</dl>"> 파싱 및 오늘 날짜 필터링
     */
    private List<VesselScheduleDto> parseCarrierHtml(String html, String carrierName, String polName, LocalDate today) {
        Document doc = Jsoup.parse(html);
        List<VesselScheduleDto> rawList = new ArrayList<>();

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

            // 오늘 입항(Berthing) 또는 출항(Sailing) 중 하나라도 일치하면 활성선박으로 처리
            if (!isActiveToday(berthing, sailing, today)) {
                continue;
            }

            VesselScheduleDto dto = VesselScheduleDto.builder()
                    .carrier(carrierName)
                    .vesselName(vessel)
                    .voyage(voyage)
                    .pol(cleanPortNameToEnglish(polName))
                    .pod("KOREA")
                    .arrival(arrival)
                    .berthing(berthing)
                    .sailing(sailing)
                    .terminal(terminal)
                    .build();

            rawList.add(dto);
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

    private boolean isActiveToday(String berthing, String sailing, LocalDate today) {
        return isTodayDate(berthing, today) || isTodayDate(sailing, today);
    }

    private boolean isTodayDate(String dtStr, LocalDate today) {
        if (dtStr == null || dtStr.length() < 10) {
            return false;
        }
        try {
            String datePart = dtStr.substring(0, 10); // "YYYY/MM/DD"
            String[] parts = datePart.split("/");
            if (parts.length == 3) {
                int y = Integer.parseInt(parts[0]);
                int m = Integer.parseInt(parts[1]);
                int d = Integer.parseInt(parts[2]);
                LocalDate parsed = LocalDate.of(y, m, d);
                return parsed.equals(today);
            }
        } catch (Exception e) {
            // ignore parse exception
        }
        return false;
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
            Map.entry("石狩湾新港", "ISHIKARI")
    );

    /**
     * 항구명에서 일본어/기호를 제거하고 영문 항구명만 추출 (영문이 없으면 사전 매핑)
     */
    private String cleanPortNameToEnglish(String raw) {
        if (raw == null || raw.isBlank()) {
            return "";
        }

        String cleaned = raw.replaceAll("^[<>-—\\s]+", "").trim();

        // 1. 이미 영문이 포함되어 있는 경우 (예: "大阪 OSAKA", "- 横浜 YOKOHAMA", "博多 HAKATA") -> 영문 단어만 추출
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("[A-Za-z]+(?:\\s+[A-Za-z]+)*").matcher(cleaned);
        List<String> englishWords = new ArrayList<>();
        while (m.find()) {
            String w = m.group().trim();
            if (!w.equalsIgnoreCase("PORT") && !w.equalsIgnoreCase("WEEK") && !w.equalsIgnoreCase("SCHEDULE")) {
                englishWords.add(w.toUpperCase());
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

        // 3. 매핑되지 않은 경우 비영문 문자 제거
        String onlyAlpha = cleaned.replaceAll("[^A-Za-z0-9\\s]", "").trim().toUpperCase();
        return onlyAlpha.isEmpty() ? cleaned : onlyAlpha;
    }

    /**
     * 구글 시트 (shipping-date) 업데이트
     */
    public boolean updateShippingGoogleSheet(String spreadsheetIdOrName) {
        String targetSpreadsheetId = spreadsheetIdOrName;
        if (targetSpreadsheetId == null || targetSpreadsheetId.isBlank()) {
            targetSpreadsheetId = appProperties.getShipping().getSpreadsheetId();
        }
        if (targetSpreadsheetId == null || targetSpreadsheetId.isBlank()) {
            targetSpreadsheetId = appProperties.getLogSheetId(); // fallback to default log sheet if not specified
        }

        try {
            ShippingScheduleSummaryDto summary = fetchSchedules(null);
            Sheets sheetsClient = googleAuthService.getSheetsClient();

            // A1:I1000 범위 클리어
            try {
                sheetsClient.spreadsheets().values()
                        .clear(targetSpreadsheetId, "A1:I1000", new ClearValuesRequest())
                        .execute();
            } catch (Exception e) {
                log.warn("[ShippingScheduleService] Sheet clear warning: {}", e.getMessage());
            }

            List<List<Object>> rows = new ArrayList<>();
            // 헤더 작성 (출발항 POL, 도착항 POD 추가)
            rows.add(List.of("선사", "선박명", "선박번호", "출발항(POL)", "도착항(POD)", "Arrival", "Berthing", "Sailing", "터미널"));

            for (VesselScheduleDto item : summary.getSchedules()) {
                rows.add(List.of(
                        item.getCarrier() != null ? item.getCarrier() : "",
                        item.getVesselName() != null ? item.getVesselName() : "",
                        item.getVoyage() != null ? item.getVoyage() : "",
                        item.getPol() != null ? item.getPol() : "",
                        item.getPod() != null ? item.getPod() : "",
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
