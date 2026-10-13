package com.example.fates_system.domain.shipping.service;

import com.example.fates_system.common.config.AppProperties;
import com.example.fates_system.domain.shipping.dto.VesselScheduleDto;
import com.example.fates_system.domain.shipping.util.PortNameUtils;
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
import java.time.Duration;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;

/**
 * 레거시 Toyoshingo HTML 크롤링 및 파싱 전담 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LegacyShippingScraperService {

    private final AppProperties appProperties;

    private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
    private static final Charset JAPANESE_CHARSET = Charset.forName("Windows-31J");

    /**
     * 레거시 Toyoshingo HTML 크롤링
     */
    public List<VesselScheduleDto> fetchFromLegacyHtml(HttpClient httpClient, ExecutorService carrierExecutor,
                                                       String carrierName, String slug, LocalDate today) {
        String baseUrl = appProperties.getShipping().getBaseUrl();
        String carrierBaseUrl = baseUrl + "/" + slug + "/";
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(carrierBaseUrl))
                    .header("User-Agent", USER_AGENT)
                    .timeout(Duration.ofSeconds(30))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(JAPANESE_CHARSET));
            if (response.statusCode() != 200) {
                log.warn("[LegacyShippingScraper] Carrier '{}' ({}) returned HTTP {}", carrierName, slug, response.statusCode());
                return Collections.emptyList();
            }

            Document doc = Jsoup.parse(response.body());
            Map<String, String> portUrlMap = new LinkedHashMap<>();
            for (Element a : doc.select("a[href*=\"port=\"]")) {
                String href = a.attr("href");
                String rawText = a.text().trim();
                String upperText = rawText.toUpperCase();
                if (href.contains("port=") && !upperText.contains("WEEK") && !rawText.contains("<") && !rawText.contains(">")) {
                    try {
                        URI resolved = URI.create(carrierBaseUrl).resolve(href);
                        String cleanPortName = PortNameUtils.cleanPortNameToEnglish(rawText);
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

            List<CompletableFuture<List<VesselScheduleDto>>> portFutures = new ArrayList<>();
            portUrlMap.forEach((portUrl, polName) -> {
                portFutures.add(CompletableFuture.supplyAsync(
                        () -> fetchSinglePortPage(httpClient, portUrl, carrierName, polName, today),
                        carrierExecutor
                ));
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
                    log.warn("[LegacyShippingScraper] Port page fetch error: {}", e.getMessage());
                }
            }

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
            log.error("[LegacyShippingScraper] Carrier '{}' ({}) fetch error: {}", carrierName, slug, e.getMessage());
            return Collections.emptyList();
        }
    }

    private List<VesselScheduleDto> fetchSinglePortPage(HttpClient httpClient, String portUrl, String carrierName, String polName, LocalDate today) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(portUrl))
                    .header("User-Agent", USER_AGENT)
                    .timeout(Duration.ofSeconds(30))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(JAPANESE_CHARSET));
            if (response.statusCode() != 200) {
                return Collections.emptyList();
            }

            return parseCarrierHtml(httpClient, response.body(), carrierName, polName, today, portUrl);

        } catch (Exception e) {
            log.warn("[LegacyShippingScraper] Port URL '{}' fetch failed: {}", portUrl, e.getMessage());
            return Collections.emptyList();
        }
    }

    private List<VesselScheduleDto> parseCarrierHtml(HttpClient httpClient, String html, String carrierName, String polName, LocalDate today, String portUrl) {
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
            String terminal = dataMap.getOrDefault("Terminal Name", dataMap.getOrDefault("Berth Name", "")).trim();

            if (vessel.isEmpty()) {
                continue;
            }

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
                    originalEta = fetchOriginalEtaFromCertificate(httpClient, finalDetailUrl);
                }

                return VesselScheduleDto.builder()
                        .carrier(carrierName)
                        .vesselName(vessel)
                        .voyage(voyage)
                        .pol(PortNameUtils.cleanPortNameToEnglish(polName))
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
                log.warn("[LegacyShippingScraper] Error resolving vessel detail future: {}", e.getMessage());
            }
        }

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

    private String fetchOriginalEtaFromCertificate(HttpClient httpClient, String detailUrl) {
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
            log.debug("[LegacyShippingScraper] Failed to fetch original ETA from {}: {}", detailUrl, e.getMessage());
        }
        return null;
    }

    private String extractOriginalEtaValue(String rawEtaEtd) {
        if (rawEtaEtd == null || rawEtaEtd.isBlank() || rawEtaEtd.startsWith("--")) {
            return null;
        }
        String[] parts = rawEtaEtd.split("\\s*[·・–—]\\s*|\\s+-\\s+");
        if (parts.length > 0) {
            String etaPart = parts[0].replaceAll("\\s*\\([^)]*\\)\\s*", "").trim();
            if (!etaPart.isEmpty() && !etaPart.startsWith("--")) {
                return etaPart;
            }
        }
        return null;
    }

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
        return (trimmed.isEmpty() || trimmed.startsWith("--")) ? null : trimmed;
    }
}
