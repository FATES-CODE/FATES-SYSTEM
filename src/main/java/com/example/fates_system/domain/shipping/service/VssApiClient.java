package com.example.fates_system.domain.shipping.service;

import com.example.fates_system.common.config.AppProperties;
import com.example.fates_system.domain.shipping.dto.VesselScheduleDto;
import com.example.fates_system.domain.shipping.util.PortNameUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

/**
 * Vessel Schedule Service REST API (vessel-schedule-service.com) 연동 전담 클라이언트
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class VssApiClient {

    private final AppProperties appProperties;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
    private static final Pattern KOREA_SERVICE_PATTERN =
            Pattern.compile("^(?:JK\\d*|JKS|PKOR|KTX\\d*|.*KOR.*)$", Pattern.CASE_INSENSITIVE);

    /**
     * VSS REST API를 통한 선사별 스케줄 목록 수집
     */
    public List<VesselScheduleDto> fetchSchedules(HttpClient httpClient, String carrierName, String slug, LocalDate today) {
        String vssApiBaseUrl = appProperties.getShipping().getVssApiBaseUrl();
        if (vssApiBaseUrl == null || vssApiBaseUrl.isBlank()) {
            vssApiBaseUrl = "https://api-shipper.vessel-schedule-service.com/api/v1";
        }

        List<VesselScheduleDto> list = new ArrayList<>();
        int maxPages = 10; // 최대 1,000건까지 탐색

        try {
            for (int page = 1; page <= maxPages; page++) {
                String apiUrl = vssApiBaseUrl + "/" + slug + "/voyages/tracking?per_page=100&page=" + page;
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(apiUrl))
                        .header("User-Agent", USER_AGENT)
                        .header("Accept", "application/json")
                        .timeout(Duration.ofSeconds(30))
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
                    if (origArrivalDate.isEmpty()) origArrivalDate = item.path("proforma_eta").asText("").trim();
                    if (origArrivalDate.isEmpty()) origArrivalDate = item.path("original_arrival_date").asText("").trim();
                    if (origArrivalDate.isEmpty()) origArrivalDate = item.path("orig_arrival_date").asText("").trim();
                    if (origArrivalDate.isEmpty()) origArrivalDate = item.path("original_eta").asText("").trim();

                    String origArrivalTime = item.path("proforma_ETA_time").asText("").trim();
                    if (origArrivalTime.isEmpty()) origArrivalTime = item.path("original_arrival_time").asText("").trim();
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
                    if (polName.isEmpty()) polName = item.path("locate_port").path("name_ja").asText("");
                    String cleanPol = PortNameUtils.cleanPortNameToEnglish(polName);

                    String pod = item.path("to_port_name_E").asText("").trim();
                    if (pod.isEmpty()) pod = item.path("to_port_name_J").asText("").trim();

                    String serviceCode = item.path("service").asText("").trim();
                    if (pod.isEmpty() && !serviceCode.isEmpty() && KOREA_SERVICE_PATTERN.matcher(serviceCode).matches()) {
                        pod = "KOREA (" + serviceCode + ")";
                    }
                    pod = PortNameUtils.cleanPortNameToEnglish(pod);

                    String terminal = "";
                    JsonNode cyArray = item.path("cy_informations");
                    if (cyArray.isArray() && !cyArray.isEmpty()) {
                        terminal = cyArray.get(0).path("cy_name_jp").asText("");
                        if (terminal.isEmpty()) terminal = cyArray.get(0).path("cy_name_en").asText("");
                    }
                    if (terminal.isEmpty()) {
                        terminal = item.path("berth").path("name_jp").asText("");
                        if (terminal.isEmpty()) terminal = item.path("berth").path("name_en").asText("");
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

                int lastPage = root.path("meta").path("last_page").asInt(1);
                if (page >= lastPage) {
                    break;
                }

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

            log.info("[VssApiClient] Carrier '{}' ({}) fetched {} schedules across pages", carrierName, slug, uniqueList.size());
            return uniqueList;

        } catch (Exception e) {
            log.debug("[VssApiClient] Carrier '{}' ({}) error: {}", carrierName, slug, e.getMessage());
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
}
