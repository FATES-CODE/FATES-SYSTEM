package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.PanoceanScheduleDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ClearValuesRequest;
import com.google.api.services.sheets.v4.model.ValueRange;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.CookieManager;
import java.net.CookiePolicy;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class PanoceanScheduleService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public static final String DEFAULT_SPREADSHEET_ID = "11fc0ml4jJ24jsD1pUJ18K5RoRXcf4D0LcWcKFDuSMKs";
    public static final String TARGET_SHEET_NAME = "PANOCEAN";

    private static final String BASE_URL = "https://container.panocean.com";
    private static final String SCHEDULE_API_URL = "https://container.panocean.com/HP2101/hp2101List.do";
    private static final String REFERER_URL = "https://container.panocean.com/PAN/HP2101/hp2101.xml";
    private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

    // 일본 주요 출발 포트 (POL) - 팬오션 실제 취항지 6개
    public static final List<Map<String, String>> JP_PORTS = List.of(
            Map.of("code", "JPTYO", "name", "TOKYO"),
            Map.of("code", "JPYOK", "name", "YOKOHAMA"),
            Map.of("code", "JPNGO", "name", "NAGOYA"),
            Map.of("code", "JPOSA", "name", "OSAKA"),
            Map.of("code", "JPUKB", "name", "KOBE"),
            Map.of("code", "JPYKK", "name", "YOKKAICHI")
    );

    // 한국 주요 도착 포트 (POD) - 팬오션 실제 취항지 3개
    public static final List<Map<String, String>> KR_PORTS = List.of(
            Map.of("code", "KRPUS", "name", "BUSAN"),
            Map.of("code", "KRICH", "name", "INCHON"),
            Map.of("code", "KRKAN", "name", "KWANGYANG")
    );

    private HttpClient createHttpClientWithCookie() {
        CookieManager cookieManager = new CookieManager(null, CookiePolicy.ACCEPT_ALL);
        return HttpClient.newBuilder()
                .cookieHandler(cookieManager)
                .version(HttpClient.Version.HTTP_1_1)
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .connectTimeout(Duration.ofSeconds(15))
                .build();
    }

    private void initSessionCookie(HttpClient client) {
        try {
            HttpRequest getReq = HttpRequest.newBuilder()
                    .uri(URI.create(REFERER_URL))
                    .header("User-Agent", USER_AGENT)
                    .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                    .timeout(Duration.ofSeconds(15))
                    .GET()
                    .build();
            client.send(getReq, HttpResponse.BodyHandlers.discarding());
        } catch (Exception e) {
            log.warn("[PanoceanScheduleService] Session cookie initialization failed: {}", e.getMessage());
        }
    }

    /**
     * N개월 일본 -> 한국 운항 스케줄 수집 (안전하게 순차 호출 + 딜레이)
     */
    public List<PanoceanScheduleDto> fetchSchedules(YearMonth startMonth, int months) {
        if (startMonth == null) {
            startMonth = YearMonth.now();
        }
        if (months <= 0) {
            months = 2;
        }

        List<YearMonth> targetMonths = new ArrayList<>();
        // 전월 말 출항 선박도 포함
        targetMonths.add(startMonth.minusMonths(1));
        for (int i = 0; i < months; i++) {
            targetMonths.add(startMonth.plusMonths(i));
        }

        log.info("[PanoceanScheduleService] Starting safe fetch for Japan -> Korea schedules for {} months: {}",
                months, targetMonths);

        HttpClient client = createHttpClientWithCookie();
        initSessionCookie(client);

        List<PanoceanScheduleDto> rawList = new ArrayList<>();

        // 총 18개 루트(6 JP * 3 KR) * 대상 개월 수
        for (YearMonth ym : targetMonths) {
            String yyyyMM = ym.format(DateTimeFormatter.ofPattern("yyyyMM"));

            for (Map<String, String> jp : JP_PORTS) {
                String polCode = jp.get("code");

                for (Map<String, String> kr : KR_PORTS) {
                    String podCode = kr.get("code");

                    try {
                        // 차단 방지용 안전 딜레이 (400~600ms)
                        Thread.sleep(400 + (long) (Math.random() * 200));

                        List<PanoceanScheduleDto> items = fetchRouteSchedule(client, polCode, podCode, yyyyMM);
                        if (items != null && !items.isEmpty()) {
                            rawList.addAll(items);
                        }
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        log.warn("[PanoceanScheduleService] Interrupted during schedule fetch");
                        break;
                    } catch (Exception e) {
                        log.warn("[PanoceanScheduleService] Error fetching {} -> {} for {}: {}",
                                polCode, podCode, yyyyMM, e.getMessage());
                    }
                }
            }
        }

        log.info("[PanoceanScheduleService] Total raw schedules collected: {}", rawList.size());

        // 중복 제거 (동일 선박/항차 + 출발지 + 도착지 + 출발일시 기준)
        Map<String, PanoceanScheduleDto> uniqueMap = new LinkedHashMap<>();
        for (PanoceanScheduleDto dto : rawList) {
            String key = String.format("%s|%s|%s|%s",
                    dto.getVesselVoyage(),
                    dto.getPolName(),
                    dto.getPodName(),
                    dto.getDepartureDate());

            uniqueMap.putIfAbsent(key, dto);
        }

        // 당월 시작일(startMonth 1일) 이후 유효 스케줄만 필터링 및 ETD 오름차순 정렬
        String minDateStr = startMonth.atDay(1).format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        List<PanoceanScheduleDto> resultList = new ArrayList<>();
        for (PanoceanScheduleDto dto : uniqueMap.values()) {
            String dep = dto.getDepartureDate() != null ? dto.getDepartureDate().trim() : "";
            String arr = dto.getArrivalDate() != null ? dto.getArrivalDate().trim() : "";
            if (dep.compareTo(minDateStr) >= 0 || arr.compareTo(minDateStr) >= 0) {
                resultList.add(dto);
            }
        }

        resultList.sort(Comparator.comparing(
                dto -> dto.getDepartureDate() != null && !dto.getDepartureDate().isBlank()
                        ? dto.getDepartureDate() : "9999/99/99 99:99"
        ));

        log.info("[PanoceanScheduleService] Successfully collected {} unique Japan -> Korea schedules for {} months starting from {}",
                resultList.size(), months, startMonth);

        return resultList;
    }

    private List<PanoceanScheduleDto> fetchRouteSchedule(HttpClient client, String pol, String pod, String fromDateYm) {
        String jsonPayload = String.format(
                "{\"searchParam\":{\"originCode\":\"%s\",\"destinCode\":\"%s\",\"fromDate\":\"%s\",\"scheduleFlag\":\"TD\"}}",
                pol, pod, fromDateYm
        );

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(SCHEDULE_API_URL))
                .header("User-Agent", USER_AGENT)
                .header("Origin", BASE_URL)
                .header("Referer", REFERER_URL)
                .header("Content-Type", "application/json; charset=UTF-8")
                .header("Accept", "application/json")
                .timeout(Duration.ofSeconds(15))
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload, StandardCharsets.UTF_8))
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() != 200) {
                log.warn("[PanoceanScheduleService] Non-200 response {} for {} -> {} month={}",
                        response.statusCode(), pol, pod, fromDateYm);
                return Collections.emptyList();
            }

            JsonNode root = objectMapper.readTree(response.body());
            JsonNode listNode = root.path("dlt_schedList");
            if (!listNode.isArray() || listNode.isEmpty()) {
                return Collections.emptyList();
            }

            List<PanoceanScheduleDto> list = new ArrayList<>();
            for (JsonNode item : listNode) {
                String vslName = item.path("vslName").asText("").trim();
                String voy = item.path("voy").asText("").trim();
                String vesselVoyage = vslName + (!voy.isEmpty() ? " " + voy : "");

                String polName = item.path("polName").asText("").trim();
                String podName = item.path("podName").asText("").trim();

                String depDate = item.path("departureDate").asText("").trim();
                String arrDate = item.path("arrivalDate").asText("").trim();
                String cctDate = item.path("cctDate").asText("").trim();
                String docuDate = item.path("docuDate").asText("").trim();

                PanoceanScheduleDto dto = PanoceanScheduleDto.builder()
                        .carrier("PANOCEAN")
                        .vesselName(vslName)
                        .voyageNo(voy)
                        .vesselVoyage(vesselVoyage)
                        .routeCode(item.path("routeCode").asText("").trim())
                        .pol(item.path("polCode").asText("").trim())
                        .polName(polName)
                        .pod(item.path("podCode").asText("").trim())
                        .podName(podName)
                        .departureDate(depDate)
                        .arrivalDate(arrDate)
                        .cctDate(cctDate)
                        .docuDate(docuDate)
                        .transitTime(item.path("transitTime").asText("").trim())
                        .tsChk(item.path("tsChk").asText("").trim())
                        .build();

                list.add(dto);
            }
            return list;
        } catch (Exception e) {
            log.debug("[PanoceanScheduleService] Request error for {} -> {} in {}: {}", pol, pod, fromDateYm, e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * 날짜만 추출 (2026/10/24 03:00 또는 2026-10-24 -> 2026/10/24)
     */
    private String formatDateOnly(String dateTimeStr) {
        if (dateTimeStr == null || dateTimeStr.isBlank()) return "";
        String datePart = dateTimeStr.trim().split(" ")[0];
        return datePart.replace("-", "/");
    }

    /**
     * 구글 스프레드시트의 'PANOCEAN' 시트에 스케줄 저장
     */
    public boolean saveToGoogleSheet(String spreadsheetId, List<PanoceanScheduleDto> schedules) {
        String targetId = spreadsheetId != null && !spreadsheetId.isBlank() ? spreadsheetId : DEFAULT_SPREADSHEET_ID;

        try {
            Sheets sheets = googleAuthService.getSheetsClient();

            // 'PANOCEAN' 시트 존재 여부 확인 및 없으면 생성
            ensureSheetExists(sheets, targetId, TARGET_SHEET_NAME);

            // 'PANOCEAN' 시트 클리어
            String clearRange = String.format("'%s'!A:Z", TARGET_SHEET_NAME);
            try {
                sheets.spreadsheets().values()
                        .clear(targetId, clearRange, new ClearValuesRequest())
                        .execute();
            } catch (Exception e) {
                log.warn("[PanoceanScheduleService] Clear sheet warning on '{}': {}", clearRange, e.getMessage());
            }

            List<List<Object>> rows = new ArrayList<>();
            // 헤더 통일: 배이름이랑번호, 출발지, 도착지, 출발일, 도착일, CY
            rows.add(List.of("배이름이랑번호", "출발지", "도착지", "출발일", "도착일", "CY"));

            for (PanoceanScheduleDto s : schedules) {
                String vesselVoyage = s.getVesselVoyage() != null ? s.getVesselVoyage().trim() : "";
                String polName = s.getPolName() != null ? s.getPolName().trim().toUpperCase() : "";
                String podName = s.getPodName() != null ? s.getPodName().trim().toUpperCase() : "";

                String etd = formatDateOnly(s.getDepartureDate());
                String eta = formatDateOnly(s.getArrivalDate());
                String cy = formatDateOnly(s.getCctDate());
                if (cy.isBlank() && s.getDocuDate() != null && !s.getDocuDate().isBlank()) {
                    cy = formatDateOnly(s.getDocuDate());
                }

                if (vesselVoyage.isBlank() && etd.isBlank()) continue;

                rows.add(List.of(vesselVoyage, polName, podName, etd, eta, cy));
            }

            String updateRange = String.format("'%s'!A1", TARGET_SHEET_NAME);
            ValueRange body = new ValueRange().setValues(rows);
            sheets.spreadsheets().values()
                    .update(targetId, updateRange, body)
                    .setValueInputOption("USER_ENTERED")
                    .execute();

            log.info("[PanoceanScheduleService] Successfully saved {} entries to Google Sheet '{}' sheet tab '{}'",
                    rows.size() - 1, targetId, TARGET_SHEET_NAME);
            return true;
        } catch (Exception e) {
            log.error("[PanoceanScheduleService] Failed to save to Google Sheet '{}': {}", targetId, e.getMessage(), e);
            return false;
        }
    }

    private void ensureSheetExists(Sheets sheets, String spreadsheetId, String sheetName) {
        try {
            var spreadsheet = sheets.spreadsheets().get(spreadsheetId).execute();
            boolean exists = spreadsheet.getSheets().stream()
                    .anyMatch(s -> sheetName.equalsIgnoreCase(s.getProperties().getTitle()));

            if (!exists) {
                log.info("[PanoceanScheduleService] Sheet tab '{}' does not exist. Creating it...", sheetName);
                var addSheetRequest = new com.google.api.services.sheets.v4.model.AddSheetRequest()
                        .setProperties(new com.google.api.services.sheets.v4.model.SheetProperties().setTitle(sheetName));
                var request = new com.google.api.services.sheets.v4.model.Request().setAddSheet(addSheetRequest);
                var batchRequest = new com.google.api.services.sheets.v4.model.BatchUpdateSpreadsheetRequest()
                        .setRequests(List.of(request));
                sheets.spreadsheets().batchUpdate(spreadsheetId, batchRequest).execute();
                log.info("[PanoceanScheduleService] Successfully created sheet tab '{}'", sheetName);
            }
        } catch (Exception e) {
            log.warn("[PanoceanScheduleService] Failed to check/create sheet tab '{}': {}", sheetName, e.getMessage());
        }
    }

    public boolean syncSchedulesToSheet(String spreadsheetId, int months) {
        YearMonth currentYm = YearMonth.now();
        List<PanoceanScheduleDto> schedules = fetchSchedules(currentYm, months);
        return saveToGoogleSheet(spreadsheetId, schedules);
    }

    public boolean syncMonthlySchedulesToSheet(String spreadsheetId) {
        int months = (appProperties != null && appProperties.getPanocean() != null && appProperties.getPanocean().getFetchMonths() > 0)
                ? appProperties.getPanocean().getFetchMonths() : 2;
        return syncSchedulesToSheet(spreadsheetId, months);
    }
}
