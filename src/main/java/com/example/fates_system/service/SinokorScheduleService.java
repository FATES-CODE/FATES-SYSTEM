package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.SinokorScheduleDto;
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
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class SinokorScheduleService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public static final String DEFAULT_SPREADSHEET_ID = "11fc0ml4jJ24jsD1pUJ18K5RoRXcf4D0LcWcKFDuSMKs";
    public static final String TARGET_SHEET_NAME = "SNK";
    private static final String SCHEDULE_URL = "https://ebiz.sinokor.co.kr/Schedule";
    private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    private static final Pattern SCHEDULES_JSON_PATTERN = Pattern.compile("var\\s+schedules\\s*=\\s*(\\[.*?\\]);", Pattern.DOTALL);

    // 일본 주요 출발 포트 (POL) - 실제 한일 정기선 운항 주요 상업항 위주로 최적화
    public static final List<Map<String, String>> JP_PORTS = List.of(
            Map.of("code", "JPTYO", "name", "TOKYO"),
            Map.of("code", "JPYOK", "name", "YOKOHAMA"),
            Map.of("code", "JPNGO", "name", "NAGOYA"),
            Map.of("code", "JPOSA", "name", "OSAKA"),
            Map.of("code", "JPUKB", "name", "KOBE"),
            Map.of("code", "JPHKT", "name", "HAKATA"),
            Map.of("code", "JPMOJ", "name", "MOJI"),
            Map.of("code", "JPSHS", "name", "SHIMONOSEKI"),
            Map.of("code", "JPHIJ", "name", "HIROSHIMA"),
            Map.of("code", "JPTKY", "name", "TOKUYAMA"),
            Map.of("code", "JPMIZ", "name", "MIZUSHIMA"),
            Map.of("code", "JPTAK", "name", "TAKAMATSU"),
            Map.of("code", "JPMYJ", "name", "MATSUYAMA"),
            Map.of("code", "JPIMI", "name", "IMARI"),
            Map.of("code", "JPSMZ", "name", "SHIMIZU"),
            Map.of("code", "JPSDJ", "name", "SENDAI"),
            Map.of("code", "JPHHE", "name", "HACHINOHE"),
            Map.of("code", "JPHIC", "name", "HITACHINAKA"),
            Map.of("code", "JPKSM", "name", "KASHIMA"),
            Map.of("code", "JPKIJ", "name", "NIIGATA"),
            Map.of("code", "JPKNZ", "name", "KANAZAWA"),
            Map.of("code", "JPTMK", "name", "TOMAKOMAI"),
            Map.of("code", "JPOIT", "name", "OITA"),
            Map.of("code", "JPHBK", "name", "HIBIKI"),
            Map.of("code", "JPTHS", "name", "TOYOHASHI"),
            Map.of("code", "JPAXT", "name", "AKITA")
    );

    // 한국 주요 도착 포트 (POD)
    public static final List<Map<String, String>> KR_PORTS = List.of(
            Map.of("code", "KRPUS", "name", "BUSAN"),
            Map.of("code", "KRINC", "name", "INCHEON"),
            Map.of("code", "KRKAN", "name", "GWANGYANG"),
            Map.of("code", "KRPTK", "name", "PYEONGTAEK"),
            Map.of("code", "KRUSN", "name", "ULSAN")
    );

    /**
     * 세션 쿠키 관리 기능이 포함된 HttpClient 생성
     */
    private HttpClient createHttpClientWithCookie() {
        CookieManager cookieManager = new CookieManager(null, CookiePolicy.ACCEPT_ALL);
        return HttpClient.newBuilder()
                .cookieHandler(cookieManager)
                .version(HttpClient.Version.HTTP_1_1)
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .connectTimeout(Duration.ofSeconds(15))
                .build();
    }

    /**
     * 세션 쿠키 초기화 (GET /Schedule 호출).
     * 응답 본문에 "schedules" 또는 "Schedule" 키워드가 있으면 성공(true) 반환.
     * Error Page 또는 예외 발생 시 최대 2회 재시도 후 false 반환.
     */
    private boolean initSessionCookie(HttpClient client) {
        for (int attempt = 1; attempt <= 3; attempt++) {
            try {
                if (attempt > 1) {
                    Thread.sleep(2000L * attempt); // 재시도 전 대기
                }
                HttpRequest getReq = HttpRequest.newBuilder()
                        .uri(URI.create(SCHEDULE_URL))
                        .header("User-Agent", USER_AGENT)
                        .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                        .header("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7")
                        .timeout(Duration.ofSeconds(15))
                        .GET()
                        .build();

                HttpResponse<String> res = client.send(getReq, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
                String body = res.body();

                // 정상 스케줄 페이지 여부 확인 (schedules 변수, 조회 폼 등 포함 여부)
                boolean isValidPage = body.contains("var schedules") || body.contains("id=\"searchpol\"") || body.contains("eBiz");
                if (res.statusCode() == 200 && isValidPage) {
                    log.info("[SinokorScheduleService] Session initialized successfully (attempt {})", attempt);
                    return true;
                }

                // Error Page 감지
                String preview = body.length() > 300 ? body.substring(0, 300) : body;
                log.warn("[SinokorScheduleService] Session init attempt {} - invalid response (status={}, isErrorPage={}). Preview: {}",
                        attempt, res.statusCode(), body.contains("Error Page"),
                        preview.replaceAll("\\s+", " ").trim());

            } catch (Exception e) {
                log.warn("[SinokorScheduleService] Session init attempt {} failed: {}", attempt, e.getMessage());
            }
        }
        log.error("[SinokorScheduleService] SINOKOR session initialization FAILED after 3 attempts. " +
                "The server may be blocking this IP. Aborting schedule fetch.");
        return false;
    }

    /**
     * 지정 연월부터 N개월(기본 2개월) 일본 -> 한국 운항 스케줄 전체 수집
     */
    public List<SinokorScheduleDto> fetchSchedules(YearMonth startMonth, int months) {
        if (startMonth == null) {
            startMonth = YearMonth.now();
        }
        if (months <= 0) {
            months = 2;
        }

        List<YearMonth> targetMonths = new ArrayList<>();
        // 전월 말 출항하여 당월에 도착/운항 중인 선박의 정확한 CY CUT 수집을 위해 전월(minusMonths(1))도 포함
        targetMonths.add(startMonth.minusMonths(1));
        for (int i = 0; i < months; i++) {
            targetMonths.add(startMonth.plusMonths(i));
        }

        log.info("[SinokorScheduleService] Starting fetch for Japan -> Korea schedules for {} months: {}",
                months, targetMonths);

        HttpClient client = createHttpClientWithCookie();
        boolean sessionOk = initSessionCookie(client);
        if (!sessionOk) {
            log.error("[SinokorScheduleService] Aborting fetch: could not establish valid SINOKOR session.");
            return Collections.emptyList();
        }

        List<SinokorScheduleDto> rawList = Collections.synchronizedList(new ArrayList<>());
        ExecutorService executor = Executors.newFixedThreadPool(6);
        List<CompletableFuture<Void>> futures = new ArrayList<>();

        for (YearMonth ym : targetMonths) {
            String monthStr = ym.format(DateTimeFormatter.ofPattern("yyyy-MM"));

            for (Map<String, String> jp : JP_PORTS) {
                String polCode = jp.get("code");

                for (Map<String, String> kr : KR_PORTS) {
                    String podCode = kr.get("code");

                    for (String bnd : List.of("O", "I")) {
                        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                            try {
                                List<SinokorScheduleDto> items = fetchRouteSchedule(client, polCode, podCode, monthStr, bnd);
                                if (items != null && !items.isEmpty()) {
                                    rawList.addAll(items);
                                }
                            } catch (Exception e) {
                                log.warn("[SinokorScheduleService] Error fetching {} -> {} (bnd={}) in {}: {}",
                                        polCode, podCode, bnd, monthStr, e.getMessage());
                            }
                        }, executor);
                        futures.add(future);
                    }
                }
            }
        }

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
        executor.shutdown();

        log.info("[SinokorScheduleService] Total raw schedules collected: {}", rawList.size());

        // 1단계: 선박/항차 + 출발항 기준으로 유효한 CY Cut 수집 (CY Cut <= ETD)
        Map<String, String> knownCyMap = new HashMap<>();
        for (SinokorScheduleDto dto : rawList) {
            if (isValidCyCut(dto.getCyCut(), dto.getEtd())) {
                String cyKey = dto.getVesselVoyage() + "|" + dto.getPol();
                knownCyMap.putIfAbsent(cyKey, dto.getCyCut());
            }
        }

        // 2단계: CY Cut이 비어있거나 유효하지 않은 항목(CY Cut > ETD)에 대해 알려진 유효 CY Cut 보충
        for (SinokorScheduleDto dto : rawList) {
            if (!isValidCyCut(dto.getCyCut(), dto.getEtd())) {
                String cyKey = dto.getVesselVoyage() + "|" + dto.getPol();
                String knownCy = knownCyMap.get(cyKey);
                if (knownCy != null) {
                    dto.setCyCut(knownCy);
                }
            }
        }

        // 3단계: 중복 제거 (동일 선박/항차 + 출발지 + 도착지 + 출발시간 기준)
        Map<String, SinokorScheduleDto> uniqueMap = new LinkedHashMap<>();
        for (SinokorScheduleDto dto : rawList) {
            String key = String.format("%s|%s|%s|%s",
                    dto.getVesselVoyage(),
                    dto.getDepartureDisplay(),
                    dto.getArrivalDisplay(),
                    dto.getEtd());

            if (!uniqueMap.containsKey(key)) {
                uniqueMap.put(key, dto);
            } else {
                SinokorScheduleDto existing = uniqueMap.get(key);
                boolean existingValid = isValidCyCut(existing.getCyCut(), existing.getEtd());
                boolean newValid = isValidCyCut(dto.getCyCut(), dto.getEtd());
                if (!existingValid && newValid) {
                    uniqueMap.put(key, dto);
                }
            }
        }

        // 4단계: 당월 시작일(startMonth 1일) 이후에 도착하거나 출항하는 유효 스케줄만 필터링 및 ETD순 정렬
        String minDateStr = startMonth.atDay(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        List<SinokorScheduleDto> resultList = new ArrayList<>();
        for (SinokorScheduleDto dto : uniqueMap.values()) {
            String eta = dto.getEta() != null ? dto.getEta().trim() : "";
            String etd = dto.getEtd() != null ? dto.getEtd().trim() : "";
            if (eta.compareTo(minDateStr) >= 0 || etd.compareTo(minDateStr) >= 0) {
                resultList.add(dto);
            }
        }
        resultList.sort(Comparator.comparing(
                dto -> dto.getEtd() != null && !dto.getEtd().isBlank() ? dto.getEtd() : "9999-99-99 99:99"
        ));

        log.info("[SinokorScheduleService] Successfully collected {} unique Japan -> Korea schedules for {} months starting from {}",
                resultList.size(), months, startMonth);

        return resultList;
    }

    /**
     * 특정 POL, POD, Month, Bound에 대한 스케줄 요청 및 파싱
     */
    private List<SinokorScheduleDto> fetchRouteSchedule(HttpClient client, String pol, String pod, String month, String bnd) {
        String formData = String.format("bnd=%s&pol=%s&pod=%s&month=%s&div=C&popup=N", bnd, pol, pod, month);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(SCHEDULE_URL))
                .header("User-Agent", USER_AGENT)
                .header("Origin", "https://ebiz.sinokor.co.kr")
                .header("Referer", SCHEDULE_URL)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                .header("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7")
                .timeout(Duration.ofSeconds(15))
                .POST(HttpRequest.BodyPublishers.ofString(formData, StandardCharsets.UTF_8))
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() != 200) {
                log.warn("[SinokorScheduleService] Non-200 response {} for {} -> {} bnd={} month={}",
                        response.statusCode(), pol, pod, bnd, month);
                return Collections.emptyList();
            }

            Matcher matcher = SCHEDULES_JSON_PATTERN.matcher(response.body());
            if (!matcher.find()) {
                // 응답 앞부분으로 어떤 페이지인지 확인 (로그인 리다이렉트, 캡챠 등)
                String preview = response.body().length() > 200 ? response.body().substring(0, 200) : response.body();
                log.warn("[SinokorScheduleService] No schedules JSON found for {} -> {} bnd={} month={}. Response preview: {}",
                        pol, pod, bnd, month, preview.replaceAll("\\s+", " ").trim());
                return Collections.emptyList();
            }

            String json = matcher.group(1);
            JsonNode root = objectMapper.readTree(json);
            if (!root.isArray() || root.isEmpty()) {
                return Collections.emptyList();
            }

            List<SinokorScheduleDto> list = new ArrayList<>();
            for (JsonNode item : root) {
                String vslNm = item.path("VSLNM").asText("").trim();
                String vyg = item.path("VYG").asText("").trim();
                String vesselVoyage = vslNm + (!vyg.isEmpty() ? " " + vyg : "");

                String polCode = item.path("POL").asText("").trim();
                String polNm = item.path("POLNM").asText("").trim();
                String polwNm = item.path("POLWNM").asText("").trim();

                String depDisplay = polNm;
                if (!polwNm.isEmpty()) {
                    depDisplay = polNm + " (" + polwNm + ")";
                }

                String podCode = item.path("POD").asText("").trim();
                String podNm = item.path("PODNM").asText("").trim();
                String podwNm = item.path("PODWNM").asText("").trim();

                String arrDisplay = podNm;
                if (!podwNm.isEmpty()) {
                    arrDisplay = podNm + " (" + podwNm + ")";
                }

                String etd = item.path("ETD").asText("").trim();
                String eta = item.path("ETA").asText("").trim();
                String docDate = item.path("DOCUDATE").asText("").trim();
                String cntrDate = item.path("CNTRDATE").asText("").trim();

                String cyDocCut = buildCyDocCut(cntrDate, docDate);

                SinokorScheduleDto dto = SinokorScheduleDto.builder()
                        .carrier("SINOKOR")
                        .vesselName(vslNm)
                        .voyageNo(vyg)
                        .vesselVoyage(vesselVoyage)
                        .svc(item.path("SVC").asText("").trim())
                        .pol(polCode)
                        .polName(polNm)
                        .polTerminal(polwNm)
                        .departureDisplay(depDisplay)
                        .pod(podCode)
                        .podName(podNm)
                        .podTerminal(podwNm)
                        .arrivalDisplay(arrDisplay)
                        .etd(etd)
                        .eta(eta)
                        .docCut(docDate)
                        .cyCut(cntrDate)
                        .cyDocCut(cyDocCut)
                        .tsGb(item.path("TS_GB").asText("").trim())
                        .tsPort(item.path("TS_PORTNM").asText("").trim())
                        .build();

                list.add(dto);
            }
            return list;
        } catch (Exception e) {
            log.debug("[SinokorScheduleService] Request error for {} -> {} in {}: {}", pol, pod, month, e.getMessage());
            return Collections.emptyList();
        }
    }

    private String buildCyDocCut(String cntrDate, String docDate) {
        boolean hasCy = cntrDate != null && !cntrDate.isBlank();
        boolean hasDoc = docDate != null && !docDate.isBlank();

        if (hasCy && hasDoc) {
            return String.format("CY: %s / DOC: %s", cntrDate, docDate);
        } else if (hasCy) {
            return String.format("CY: %s", cntrDate);
        } else if (hasDoc) {
            return String.format("DOC: %s", docDate);
        }
        return "";
    }

    /**
     * "2026-10-01 15:00" 또는 "2026-10-01" 형태에서 날짜만 추출하여 "2026/10/01" 형식으로 반환
     */
    private String formatDateOnly(String dateTimeStr) {
        if (dateTimeStr == null || dateTimeStr.isBlank()) return "";
        // 공백 기준으로 앞부분만 (날짜 부분)
        String datePart = dateTimeStr.trim().split(" ")[0];
        // "-" 구분자 → "/" 구분자 변환
        return datePart.replace("-", "/");
    }

    /**
     * CY 컷일이 유효한지 검증: CY 컷일은 항상 출항일(ETD) 당일 또는 이전이어야 함 (출항일 이후의 잘못된 컷일 배제)
     */
    private boolean isValidCyCut(String cyCut, String etd) {
        if (cyCut == null || cyCut.isBlank() || etd == null || etd.isBlank()) return false;
        String cyDate = cyCut.trim().split(" ")[0].replace("-", "");
        String etdDate = etd.trim().split(" ")[0].replace("-", "");
        return cyDate.compareTo(etdDate) <= 0;
    }

    /**
     * 구글 스프레드시트의 'SNK' 시트에 스케줄 저장
     */
    public boolean saveToGoogleSheet(String spreadsheetId, List<SinokorScheduleDto> schedules) {
        String targetId = spreadsheetId != null && !spreadsheetId.isBlank() ? spreadsheetId : DEFAULT_SPREADSHEET_ID;

        try {
            Sheets sheets = googleAuthService.getSheetsClient();

            // 'SNK' 시트 기존 내용 전체 클리어 ('SNK'!A:Z)
            String clearRange = String.format("'%s'!A:Z", TARGET_SHEET_NAME);
            try {
                sheets.spreadsheets().values()
                        .clear(targetId, clearRange, new ClearValuesRequest())
                        .execute();
            } catch (Exception e) {
                log.warn("[SinokorScheduleService] Clear sheet warning on '{}': {}", clearRange, e.getMessage());
            }

            List<List<Object>> rows = new ArrayList<>();
            // 헤더: 배이름이랑번호, 출발지, 도착지, 출발일, 도착일, CY
            rows.add(List.of("배이름이랑번호", "출발지", "도착지", "출발일", "도착일", "CY"));

            for (SinokorScheduleDto s : schedules) {
                String vesselVoyage = s.getVesselVoyage() != null ? s.getVesselVoyage().trim() : "";
                // 출발지: "YOKOHAMA, JAPAN" 형식 - polName + 국가
                String polName = s.getPolName() != null ? s.getPolName().trim().toUpperCase() : "";
                String departure = polName.isEmpty() ? "" : polName + ", JAPAN";
                // 도착지: "BUSAN, KOREA" 형식 - podName + 국가
                String podName = s.getPodName() != null ? s.getPodName().trim().toUpperCase() : "";
                String arrival = podName.isEmpty() ? "" : podName + ", KOREA";
                // 날짜만 추출 (2026-10-01 15:00 → 2026/10/01)
                String etd = formatDateOnly(s.getEtd());
                String eta = formatDateOnly(s.getEta());
                // CY만 추출 (cyCut 필드에서 날짜만, 없으면 docCut 보조)
                String cy = formatDateOnly(s.getCyCut());
                if (cy.isBlank() && s.getDocCut() != null && !s.getDocCut().isBlank()) {
                    cy = formatDateOnly(s.getDocCut());
                }

                if (vesselVoyage.isBlank() && etd.isBlank()) continue;

                rows.add(List.of(vesselVoyage, departure, arrival, etd, eta, cy));
            }

            String updateRange = String.format("'%s'!A1", TARGET_SHEET_NAME);
            ValueRange body = new ValueRange().setValues(rows);
            sheets.spreadsheets().values()
                    .update(targetId, updateRange, body)
                    .setValueInputOption("USER_ENTERED")
                    .execute();

            log.info("[SinokorScheduleService] Successfully saved {} entries to Google Sheet '{}' sheet tab '{}'",
                    rows.size() - 1, targetId, TARGET_SHEET_NAME);
            return true;
        } catch (Exception e) {
            log.error("[SinokorScheduleService] Failed to save to Google Sheet '{}': {}", targetId, e.getMessage(), e);
            return false;
        }
    }

    /**
     * 2달치 스케줄 수집 및 구글 시트 동기화 일괄 실행
     */
    public boolean syncMonthlySchedulesToSheet(String spreadsheetId) {
        int months = (appProperties != null && appProperties.getSinokor() != null && appProperties.getSinokor().getFetchMonths() > 0)
                ? appProperties.getSinokor().getFetchMonths() : 2;
        return syncSchedulesToSheet(spreadsheetId, months);
    }

    /**
     * 지정 개월수 스케줄 수집 및 구글 시트 동기화 일괄 실행
     */
    public boolean syncSchedulesToSheet(String spreadsheetId, int months) {
        List<SinokorScheduleDto> list = fetchSchedules(YearMonth.now(), months);
        return saveToGoogleSheet(spreadsheetId, list);
    }
}
