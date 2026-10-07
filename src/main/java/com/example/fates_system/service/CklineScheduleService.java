package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.CklineScheduleDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ClearValuesRequest;
import com.google.api.services.sheets.v4.model.ValueRange;
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
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class CklineScheduleService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String SELECT_CODE_URL = "https://es.ckline.co.kr/action/com.ComCommon.selectCodeList";
    private static final String R01_URL = "https://es.ckline.co.kr/action/sup.WESSUP401.WESSUP401R01";
    private static final String R02_URL = "https://es.ckline.co.kr/action/sup.WESSUP401.WESSUP401R02";
    public static final String DEFAULT_SPREADSHEET_ID = "11fc0ml4jJ24jsD1pUJ18K5RoRXcf4D0LcWcKFDuSMKs";

    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1)
            .connectTimeout(Duration.ofSeconds(10))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();

    /**
     * 일본 및 한국 항구 코드 목록 조회
     */
    public Map<String, List<Map<String, String>>> fetchPorts() {
        Map<String, List<Map<String, String>>> result = new LinkedHashMap<>();
        result.put("JP", new ArrayList<>());
        result.put("KR", new ArrayList<>());

        try {
            Map<String, Object> reqData = Map.of(
                    "GRP_CD", "C001",
                    "DATA_PREFIX", "dlt_cmnCd",
                    "PARAM1", "Y",
                    "NATION", "ko"
            );
            Map<String, Object> payload = Map.of(
                    "reqMeta", Collections.emptyMap(),
                    "reqData", reqData
            );

            String requestJson = objectMapper.writeValueAsString(payload);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(SELECT_CODE_URL))
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .header("Accept", "application/json")
                    .timeout(Duration.ofSeconds(15))
                    .POST(HttpRequest.BodyPublishers.ofString(requestJson, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() == 200) {
                JsonNode root = objectMapper.readTree(response.body());
                JsonNode codeList = root.path("resData").path("dlt_cmnCdC001");
                if (codeList.isArray()) {
                    for (JsonNode item : codeList) {
                        String etc1 = item.path("ETC1").asText("");
                        String code = item.path("COMCOD").asText("");
                        String name = item.path("COMNAM").asText("");
                        if ("JP".equalsIgnoreCase(etc1)) {
                            result.get("JP").add(Map.of("code", code, "name", name));
                        } else if ("KR".equalsIgnoreCase(etc1)) {
                            result.get("KR").add(Map.of("code", code, "name", name));
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.error("[CklineScheduleService] Failed to fetch ports: {}", e.getMessage(), e);
        }

        return result;
    }

    /**
     * 지정 연월부터 N개월(기본 2개월) 일본 -> 한국 운항 스케줄 전체 수집 (R01 및 R02 연동)
     */
    public List<CklineScheduleDto> fetchSchedules(YearMonth startMonth, int months) {
        if (startMonth == null) {
            startMonth = YearMonth.now();
        }
        if (months <= 0) {
            months = 2;
        }

        List<YearMonth> targetMonths = new ArrayList<>();
        for (int i = 0; i < months; i++) {
            targetMonths.add(startMonth.plusMonths(i));
        }

        log.info("[CklineScheduleService] Starting fetch for Japan -> Korea schedules for {} months: {}",
                months, targetMonths);

        Map<String, List<Map<String, String>>> ports = fetchPorts();
        List<Map<String, String>> jpPorts = ports.getOrDefault("JP", Collections.emptyList());
        List<Map<String, String>> krPorts = ports.getOrDefault("KR", Collections.emptyList());

        if (jpPorts.isEmpty()) {
            log.warn("[CklineScheduleService] No JP ports found from API, using fallback major ports");
            jpPorts = List.of(
                    Map.of("code", "JPTYO", "name", "TOKYO, JAPAN (JPTYO)"),
                    Map.of("code", "JPYOK", "name", "YOKOHAMA, JAPAN (JPYOK)"),
                    Map.of("code", "JPOSA", "name", "OSAKA, JAPAN (JPOSA)"),
                    Map.of("code", "JPUKB", "name", "KOBE, JAPAN (JPUKB)"),
                    Map.of("code", "JPNGO", "name", "NAGOYA, JAPAN (JPNGO)"),
                    Map.of("code", "JPHKT", "name", "HAKATA, JAPAN (JPHKT)"),
                    Map.of("code", "JPMOJ", "name", "MOJI, JAPAN (JPMOJ)"),
                    Map.of("code", "JPCHB", "name", "CHIBA, JAPAN (JPCHB)"),
                    Map.of("code", "JPTMK", "name", "TOMAKOMAI, JAPAN (JPTMK)"),
                    Map.of("code", "JPSMZ", "name", "SHIMIZU, JAPAN (JPSMZ)")
            );
        }

        if (krPorts.isEmpty()) {
            krPorts = List.of(
                    Map.of("code", "KRPUS", "name", "BUSAN, KOREA (KRPUS)"),
                    Map.of("code", "KRPNC", "name", "BUSAN NEW PORT, KOREA (KRPNC)"),
                    Map.of("code", "KRINC", "name", "INCHEON, KOREA (KRINC)"),
                    Map.of("code", "KRKAN", "name", "GWANGYANG, KOREA (KRKAN)"),
                    Map.of("code", "KRUSN", "name", "ULSAN, KOREA (KRUSN)")
            );
        }

        // 1단계: R01 스케줄 목록 병렬 수집 (각 대상 월별 전수 조회)
        List<JsonNode> rawSchedules = Collections.synchronizedList(new ArrayList<>());
        ExecutorService executor = Executors.newFixedThreadPool(16);
        List<CompletableFuture<Void>> r01Futures = new ArrayList<>();

        for (YearMonth ym : targetMonths) {
            String ymStr = ym.format(DateTimeFormatter.ofPattern("yyyyMM"));
            String dateStr = ymStr + "01";

            for (Map<String, String> jp : jpPorts) {
                String polCode = jp.get("code");
                for (Map<String, String> kr : krPorts) {
                    String podCode = kr.get("code");

                    CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                        try {
                            List<JsonNode> items = fetchR01(polCode, podCode, ymStr, dateStr);
                            if (items != null && !items.isEmpty()) {
                                rawSchedules.addAll(items);
                            }
                        } catch (Exception e) {
                            log.debug("[CklineScheduleService] Error R01 for {} -> {} in {}: {}", polCode, podCode, ymStr, e.getMessage());
                        }
                    }, executor);
                    r01Futures.add(future);
                }
            }
        }

        CompletableFuture.allOf(r01Futures.toArray(new CompletableFuture[0])).join();
        log.info("[CklineScheduleService] R01 total items collected for {} months: {}", months, rawSchedules.size());

        // VVD + 출발항 + 출발일시 기준 중복 제거
        Map<String, JsonNode> uniqueScheduleMap = new LinkedHashMap<>();
        for (JsonNode node : rawSchedules) {
            String vvd = node.path("OUTVVD1").asText("");
            String pol = node.path("OUTPOL1").asText("");
            String pod = node.path("OUTPOD1").asText("");
            String etd = node.path("OUTETD1").asText("");
            String key = vvd + "|" + pol + "|" + pod + "|" + etd;
            if (!uniqueScheduleMap.containsKey(key)) {
                uniqueScheduleMap.put(key, node);
            }
        }

        log.info("[CklineScheduleService] Unique schedule count: {}", uniqueScheduleMap.size());

        // 2단계: R02 호출로 상세 배 정보 및 출발시간/마감시간 수집
        List<CklineScheduleDto> resultList = Collections.synchronizedList(new ArrayList<>());
        List<CompletableFuture<Void>> r02Futures = new ArrayList<>();

        for (JsonNode item : uniqueScheduleMap.values()) {
            CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                try {
                    CklineScheduleDto dto = fetchR02Detail(item);
                    if (dto != null) {
                        resultList.add(dto);
                    }
                } catch (Exception e) {
                    log.warn("[CklineScheduleService] Error R02 for item: {}", e.getMessage());
                }
            }, executor);
            r02Futures.add(future);
        }

        CompletableFuture.allOf(r02Futures.toArray(new CompletableFuture[0])).join();
        executor.shutdown();

        // 출발시간(ETD) 기준 오름차순 정렬
        List<CklineScheduleDto> sortedList = new ArrayList<>(resultList);
        sortedList.sort(Comparator.comparing(
                dto -> dto.getEtd() != null && !dto.getEtd().isBlank() ? dto.getEtd() : "9999-99-99 99:99"
        ));

        log.info("[CklineScheduleService] Successfully collected {} detailed schedules for {} months starting from {}",
                sortedList.size(), months, startMonth);
        return sortedList;
    }

    /**
     * 2개월치 일본 -> 한국 운항 스케줄 전체 수집 (R01 및 R02 연동)
     */
    public List<CklineScheduleDto> fetchMonthlySchedules(YearMonth yearMonth) {
        int months = (appProperties != null && appProperties.getCkline() != null && appProperties.getCkline().getFetchMonths() > 0)
                ? appProperties.getCkline().getFetchMonths() : 2;
        return fetchSchedules(yearMonth, months);
    }

    /**
     * 지정 개월수 일본 -> 한국 운항 스케줄 전체 수집
     */
    public List<CklineScheduleDto> fetchMonthlySchedules(YearMonth yearMonth, int months) {
        return fetchSchedules(yearMonth, months);
    }

    /**
     * WESSUP401R01 API 호출
     */
    private List<JsonNode> fetchR01(String pol, String pod, String ymm, String date) throws Exception {
        Map<String, Object> reqData = new LinkedHashMap<>();
        reqData.put("INPFNT", "JP");
        reqData.put("INPTNT", "KR");
        reqData.put("INPPOR_SCH", pol);
        reqData.put("INPPOL_SCH", pol);
        reqData.put("INPPOD_SCH", pod);
        reqData.put("INPPVY_SCH", pod);
        reqData.put("INPYMM", ymm);
        reqData.put("INPDAT", date);
        reqData.put("INPDIR", "N");
        reqData.put("INPCTYP", "CNTR");
        reqData.put("INPVVD", "");

        Map<String, Object> payload = Map.of(
                "reqMeta", Map.of("PRGCOD", "WESSUP401", "LOGINYN", "N"),
                "reqData", reqData
        );

        String json = objectMapper.writeValueAsString(payload);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(R01_URL))
                .header("Content-Type", "application/json; charset=UTF-8")
                .header("Accept", "application/json")
                .timeout(Duration.ofSeconds(15))
                .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        if (response.statusCode() == 200) {
            JsonNode root = objectMapper.readTree(response.body());
            if ("S".equalsIgnoreCase(root.path("resMeta").path("resultCd").asText(""))) {
                JsonNode list = root.path("resData").path("dlt_schedule");
                if (list.isArray() && !list.isEmpty()) {
                    List<JsonNode> res = new ArrayList<>();
                    list.forEach(res::add);
                    return res;
                }
            }
        }
        return Collections.emptyList();
    }

    /**
     * WESSUP401R02 API 호출로 상세 정보 추출
     */
    private CklineScheduleDto fetchR02Detail(JsonNode r01Item) {
        String vvd1 = r01Item.path("OUTVVD1").asText("");
        String pol1 = r01Item.path("OUTPOL1").asText("");
        String pod1 = r01Item.path("OUTPOD1").asText("");
        String polTml1 = r01Item.path("OUTLTML1").asText("");
        String podTml1 = r01Item.path("OUTDTML1").asText("");

        String vvd2 = r01Item.path("OUTVVD2").asText("");
        String pol2 = r01Item.path("OUTPOL2").asText("");
        String pod2 = r01Item.path("OUTPOD2").asText("");
        String podTml2 = r01Item.path("OUTDTML2").asText("");

        String vvd3 = r01Item.path("OUTVVD3").asText("");
        String pol3 = r01Item.path("OUTPOL3").asText("");
        String pod3 = r01Item.path("OUTPOD3").asText("");
        String podTml3 = r01Item.path("OUTDTML3").asText("");

        String inland = r01Item.path("INLAND").asText("");
        String lastPodTml = !podTml3.isBlank() ? podTml3 : (!podTml2.isBlank() ? podTml2 : podTml1);
        String lastPod = !pod3.isBlank() ? pod3 : (!pod2.isBlank() ? pod2 : pod1);
        String callingPort = r01Item.path("OUTCALLPORT").asText("");

        Map<String, Object> reqData = new LinkedHashMap<>();
        reqData.put("INPVVD", vvd1);
        reqData.put("INPVVD2", vvd2);
        reqData.put("INPTS1POD", pod1);
        reqData.put("INPTPT1", pol2);
        reqData.put("INPVVD3", vvd3);
        reqData.put("INPTS2POD", pod2);
        reqData.put("INPTPT2", pol3);
        reqData.put("INLAND", inland);
        reqData.put("INPKND", "C");
        reqData.put("INPPOR", pol1);
        reqData.put("INPPVY", lastPod);
        reqData.put("INPLDT", polTml1);
        reqData.put("INPFDT", lastPodTml);
        reqData.put("INPCAL", callingPort);
        reqData.put("INPPOL", pol1);
        reqData.put("INPPOD", lastPod);
        reqData.put("INPPOT", polTml1);
        reqData.put("INPPDT", lastPodTml);

        Map<String, Object> payload = Map.of(
                "reqMeta", Map.of("PRGCOD", "WESSUP401", "LOGINYN", "N"),
                "reqData", reqData
        );

        try {
            String json = objectMapper.writeValueAsString(payload);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(R02_URL))
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .header("Accept", "application/json")
                    .timeout(Duration.ofSeconds(15))
                    .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() == 200) {
                JsonNode root = objectMapper.readTree(response.body());
                if ("S".equalsIgnoreCase(root.path("resMeta").path("resultCd").asText(""))) {
                    JsonNode routeList = root.path("resData").path("dlt_route");
                    JsonNode viewMap = root.path("resData").path("dma_view");

                    if (routeList.isArray() && !routeList.isEmpty()) {
                        JsonNode firstRoute = routeList.get(0);
                        String vslNm = firstRoute.path("VSLNM").asText("");
                        String voyNo = firstRoute.path("VOY_NO").asText("");
                        String porLoc = firstRoute.path("PORLOC").asText("");
                        String pvyLoc = firstRoute.path("PVYLOC").asText("");
                        String departureTml = firstRoute.path("FTMLDES").asText("");
                        String arrivalTml = firstRoute.path("TTMLDES").asText("");
                        String voyEtd = firstRoute.path("VOYETD").asText("");
                        String voyEta = firstRoute.path("VOYETA").asText("");
                        String docClose = firstRoute.path("DOC_CLOSE").asText("");
                        String cargoClose = firstRoute.path("CARGO_CLOSE").asText("");

                        if (departureTml.isBlank()) {
                            departureTml = viewMap.path("LTDTML").asText("");
                        }
                        if (arrivalTml.isBlank()) {
                            arrivalTml = viewMap.path("FRTTMD").asText("");
                        }
                        if (docClose.isBlank()) {
                            docClose = viewMap.path("DOC_CLOSE").asText("");
                        }
                        if (cargoClose.isBlank()) {
                            cargoClose = viewMap.path("CNTR_CLOSE").asText("");
                        }
                        String mrn = viewMap.path("MFEMRN").asText("");

                        // 선박명 정리 (예: "VICTORY STAR 2623W / KJK" -> 선박명 분리)
                        String cleanVesselName = vslNm;
                        if (cleanVesselName.contains("/")) {
                            cleanVesselName = cleanVesselName.substring(0, cleanVesselName.indexOf("/")).trim();
                        }

                        return CklineScheduleDto.builder()
                                .carrier("CK LINE")
                                .vesselName(cleanVesselName)
                                .voyageNo(voyNo)
                                .vvd(vvd1)
                                .pol(pol1)
                                .polName(porLoc)
                                .departureTerminal(departureTml)
                                .etd(voyEtd)
                                .pod(lastPod)
                                .podName(pvyLoc)
                                .arrivalTerminal(arrivalTml)
                                .eta(voyEta)
                                .docClose(docClose)
                                .cargoClose(cargoClose)
                                .mrn(mrn)
                                .callingPort(callingPort)
                                .build();
                    }
                }
            }
        } catch (Exception e) {
            log.debug("[CklineScheduleService] R02 request failed for {}: {}", vvd1, e.getMessage());
        }

        // 폴백: R01 데이터 기반으로 구성
        String vslDes = r01Item.path("VSLDES").asText("");
        String outEtd1 = r01Item.path("OUTETD1").asText("");
        String outEhd1 = r01Item.path("OUTEHD1").asText("");
        String outEta1 = r01Item.path("OUTETA1").asText("");
        String outEha1 = r01Item.path("OUTEHA1").asText("");

        String formattedEtd = formatDateTime(outEtd1, outEhd1);
        String formattedEta = formatDateTime(outEta1, outEha1);

        return CklineScheduleDto.builder()
                .carrier("CK LINE")
                .vesselName(vslDes)
                .voyageNo(vvd1)
                .vvd(vvd1)
                .pol(pol1)
                .polName(r01Item.path("OUTLTMLDES").asText(""))
                .departureTerminal(r01Item.path("OUTLTMLDES").asText(""))
                .etd(formattedEtd)
                .pod(lastPod)
                .podName(r01Item.path("OUTDTML1DES").asText(""))
                .arrivalTerminal(r01Item.path("OUTDTML1DES").asText(""))
                .eta(formattedEta)
                .callingPort(callingPort)
                .build();
    }

    private String formatDateTime(String date, String time) {
        if (date == null || date.length() < 8) return "";
        String y = date.substring(0, 4);
        String m = date.substring(4, 6);
        String d = date.substring(6, 8);
        if (time != null && time.length() >= 4) {
            String hh = time.substring(0, 2);
            String mm = time.substring(2, 4);
            return String.format("%s-%s-%s %s:%s", y, m, d, hh, mm);
        }
        return String.format("%s-%s-%s", y, m, d);
    }

    private static final String TARGET_SHEET_NAME = "CK";

    /**
     * 구글 스프레드시트 업데이트 ('전체데이터' 시트 탭 대상)
     */
    public boolean saveToGoogleSheet(String spreadsheetId, List<CklineScheduleDto> schedules) {
        String targetId = spreadsheetId != null && !spreadsheetId.isBlank() ? spreadsheetId : DEFAULT_SPREADSHEET_ID;

        try {
            Sheets sheets = googleAuthService.getSheetsClient();

            // 'CK' 시트 기존 내용 전체 클리어 ('CK'!A:Z)
            String clearRange = String.format("'%s'!A:Z", TARGET_SHEET_NAME);
            try {
                sheets.spreadsheets().values()
                        .clear(targetId, clearRange, new ClearValuesRequest())
                        .execute();
            } catch (Exception e) {
                log.warn("[CklineScheduleService] Clear sheet warning on '{}': {}", clearRange, e.getMessage());
            }

            List<List<Object>> rows = new ArrayList<>();
            // 헤더 추가: 출발시간, 선박명, 출발지, 도착지
            rows.add(List.of("출발시간", "선박명", "출발지", "도착지"));

            // 출발시간 + 선박명 + 출발지 + 도착지 기준 중복 제거
            Set<String> seen = new HashSet<>();
            for (CklineScheduleDto s : schedules) {
                String etd = s.getEtd() != null ? s.getEtd().trim() : "";
                if (etd.contains(" ")) {
                    etd = etd.split(" ")[0]; // YYYY/MM/DD 날짜만 추출
                }
                etd = etd.replace("-", "/"); // 2026/09/01 슬래시 서식 변환

                String vessel = s.getVesselName() != null ? s.getVesselName().trim() : "";
                if (vessel.toUpperCase().startsWith("HNVY")) {
                    vessel = vessel.replaceAll("(?i)^HNVY\\s*", "HONOR VOYAGER ");
                } else if (vessel.toUpperCase().contains("HNVY")) {
                    vessel = vessel.replaceAll("(?i)HNVY", "HONOR VOYAGER");
                }
                String departure = s.getPolName() != null && !s.getPolName().isBlank()
                        ? s.getPolName().trim() : (s.getPol() != null ? s.getPol().trim() : "");
                String arrival = s.getPodName() != null && !s.getPodName().isBlank()
                        ? s.getPodName().trim() : (s.getPod() != null ? s.getPod().trim() : "");

                if (etd.isBlank() && vessel.isBlank()) continue;

                String key = etd + "|" + vessel + "|" + departure + "|" + arrival;
                if (!seen.contains(key)) {
                    seen.add(key);
                    rows.add(List.of(etd, vessel, departure, arrival));
                }
            }

            String updateRange = String.format("'%s'!A1", TARGET_SHEET_NAME);
            ValueRange body = new ValueRange().setValues(rows);
            sheets.spreadsheets().values()
                    .update(targetId, updateRange, body)
                    .setValueInputOption("USER_ENTERED")
                    .execute();

            log.info("[CklineScheduleService] Successfully saved {} entries to Google Sheet '{}' sheet tab '{}'",
                    rows.size() - 1, targetId, TARGET_SHEET_NAME);
            return true;
        } catch (Exception e) {
            log.error("[CklineScheduleService] Failed to save to Google Sheet '{}': {}", targetId, e.getMessage(), e);
            return false;
        }
    }

    /**
     * 2달치 스케줄 수집 및 구글 시트 동기화 일괄 실행
     */
    public boolean syncMonthlySchedulesToSheet(String spreadsheetId) {
        int months = (appProperties != null && appProperties.getCkline() != null && appProperties.getCkline().getFetchMonths() > 0)
                ? appProperties.getCkline().getFetchMonths() : 2;
        return syncSchedulesToSheet(spreadsheetId, months);
    }

    /**
     * 지정 개월수 스케줄 수집 및 구글 시트 동기화 일괄 실행
     */
    public boolean syncSchedulesToSheet(String spreadsheetId, int months) {
        List<CklineScheduleDto> list = fetchSchedules(YearMonth.now(), months);
        return saveToGoogleSheet(spreadsheetId, list);
    }
}