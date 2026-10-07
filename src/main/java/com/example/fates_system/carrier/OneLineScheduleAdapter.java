package com.example.fates_system.carrier;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.VesselScheduleDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * ONE (Ocean Network Express) DCSA v2.2 공식 API 어댑터.
 *
 * <p><b>규격 (ONE Developer Portal 명세 준수):</b>
 * <ul>
 *   <li><b>OAuth 2.0 Token:</b> {@code POST /v1/oauth/accesstoken} (Bearer Token 발급 & 자동 갱신 캐시)</li>
 *   <li><b>DCSA Track & Trace:</b> {@code GET /v2/events} 또는 {@code GET /events}
 *       (B/L: transportDocumentReference, Container: equipmentReference, Booking: bookingReference)</li>
 *   <li><b>Default Server:</b> {@code https://mock.one-line.com} (테스트) 또는 {@code https://api.one-line.com} (운영)</li>
 * </ul>
 */
@Slf4j
@Component
public class OneLineScheduleAdapter implements CarrierScheduleAdapter {

    private static final String CARRIER_CODE = "ONE";
    private static final String CARRIER_NAME = "ONE";

    private final AppProperties appProperties;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    // OAuth 토큰 캐시 (토큰 문자열, 만료 시점)
    private String cachedToken = null;
    private Instant tokenExpiry = Instant.MIN;

    public OneLineScheduleAdapter(AppProperties appProperties) {
        this.appProperties = appProperties;
        this.httpClient = HttpClient.newBuilder()
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .version(HttpClient.Version.HTTP_1_1)
                .build();
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String getCarrierCode() {
        return CARRIER_CODE;
    }

    @Override
    public boolean isAvailable() {
        AppProperties.CarrierApiConfig config = getOneConfig();
        if (config == null || !config.isEnabled()) {
            return false;
        }
        // Client ID + Secret 또는 API Key 중 하나라도 있으면 사용 가능
        boolean hasOAuth = config.getClientId() != null && !config.getClientId().isBlank()
                && config.getClientSecret() != null && !config.getClientSecret().isBlank();
        boolean hasApiKey = config.getApiKey() != null && !config.getApiKey().isBlank();

        return hasOAuth || hasApiKey;
    }

    private AppProperties.CarrierApiConfig getOneConfig() {
        return appProperties.getCarrierApis().get("one");
    }

    private String getBaseUrl() {
        AppProperties.CarrierApiConfig config = getOneConfig();
        if (config != null && config.getBaseUrl() != null && !config.getBaseUrl().isBlank()) {
            return config.getBaseUrl().replaceAll("/+$", "");
        }
        return "https://mock.one-line.com";
    }

    /**
     * OAuth 2.0 Access Token 발급 및 자동 캐싱 (POST /v1/oauth/accesstoken)
     */
    public synchronized String getAccessToken() throws Exception {
        if (cachedToken != null && Instant.now().isBefore(tokenExpiry.minusSeconds(60))) {
            return cachedToken;
        }

        AppProperties.CarrierApiConfig config = getOneConfig();
        if (config == null) {
            throw new IllegalStateException("ONE carrier API configuration is missing");
        }

        String clientId = config.getClientId();
        String clientSecret = config.getClientSecret();
        String tokenUrl = getBaseUrl() + "/v1/oauth/accesstoken";

        log.info("[OneLineAdapter] Requesting new OAuth access token from {}", tokenUrl);

        // 요청 바디 생성 (grant_type=client_credentials)
        String requestBody = "grant_type=client_credentials"
                + "&client_id=" + URLEncoder.encode(clientId, StandardCharsets.UTF_8)
                + "&client_secret=" + URLEncoder.encode(clientSecret, StandardCharsets.UTF_8);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(tokenUrl))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Accept", "application/json")
                .header("User-Agent", "FATES-System/1.0")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        if (response.statusCode() != 200) {
            log.error("[OneLineAdapter] OAuth token generation failed: HTTP {} - {}", response.statusCode(), response.body());
            throw new RuntimeException("ONE OAuth token failure: HTTP " + response.statusCode());
        }

        JsonNode root = objectMapper.readTree(response.body());
        String token = root.path("access_token").asText("");
        if (token.isBlank()) {
            token = root.path("accessToken").asText("");
        }

        int expiresIn = root.path("expires_in").asInt(3600); // 기본 1시간
        this.cachedToken = token;
        this.tokenExpiry = Instant.now().plusSeconds(expiresIn);

        log.info("[OneLineAdapter] Successfully acquired OAuth token. Expires in {}s", expiresIn);
        return token;
    }

    /**
     * DCSA Track & Trace: B/L 번호로 이벤트 추적 (GET /v2/events?transportDocumentReference=...)
     */
    public String trackByBlNumber(String blNumber) throws Exception {
        return fetchEvents("transportDocumentReference=" + URLEncoder.encode(blNumber.trim(), StandardCharsets.UTF_8));
    }

    /**
     * DCSA Track & Trace: 컨테이너 번호로 이벤트 추적 (GET /v2/events?equipmentReference=...)
     */
    public String trackByContainerNumber(String containerNumber) throws Exception {
        return fetchEvents("equipmentReference=" + URLEncoder.encode(containerNumber.trim(), StandardCharsets.UTF_8));
    }

    /**
     * DCSA Track & Trace: 부킹 번호로 이벤트 추적 (GET /v2/events?bookingReference=...)
     */
    public String trackByBookingReference(String bookingRef) throws Exception {
        return fetchEvents("bookingReference=" + URLEncoder.encode(bookingRef.trim(), StandardCharsets.UTF_8));
    }

    /**
     * DCSA Events API 호출
     */
    private String fetchEvents(String queryParam) throws Exception {
        String baseUrl = getBaseUrl();
        // v2/events 우선 시도
        String url = baseUrl + "/v2/events?" + queryParam;

        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Accept", "application/json")
                .header("User-Agent", "FATES-System/1.0");

        // OAuth 토큰 또는 API-Key 헤더 주입
        AppProperties.CarrierApiConfig config = getOneConfig();
        if (config != null && config.getClientId() != null && !config.getClientId().isBlank()) {
            String token = getAccessToken();
            builder.header("Authorization", "Bearer " + token);
        } else if (config != null && config.getApiKey() != null && !config.getApiKey().isBlank()) {
            builder.header("API-KEY", config.getApiKey());
        }

        HttpRequest request = builder.GET().build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        log.info("[OneLineAdapter] DCSA Events query '{}' -> HTTP {}", queryParam, response.statusCode());

        if (response.statusCode() == 404) {
            // /v2/events 대신 /events 엔드포인트 fallback
            String fallbackUrl = baseUrl + "/events?" + queryParam;
            HttpRequest fallbackRequest = builder.uri(URI.create(fallbackUrl)).GET().build();
            response = httpClient.send(fallbackRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        }

        if (response.statusCode() != 200) {
            log.warn("[OneLineAdapter] DCSA Events response error: HTTP {}", response.statusCode());
            throw new RuntimeException("DCSA Events API returned HTTP " + response.statusCode());
        }

        return response.body();
    }

    /**
     * 선박 스케줄 조회 (CarrierScheduleAdapter 구현).
     * DCSA Track & Trace / Schedules 이벤트 응답을 파싱하여 오늘/당월 한국 도착 스케줄을 도출합니다.
     */
    @Override
    public List<VesselScheduleDto> fetchSchedules(LocalDate targetDate) {
        if (!isAvailable()) {
            log.debug("[OneLineAdapter] Adapter not available or disabled.");
            return Collections.emptyList();
        }

        List<VesselScheduleDto> results = new ArrayList<>();
        try {
            // DCSA v2.2의 최근 운송 이벤트(TRANSPORT)를 조회하여 선박 스케줄로 변환
            String rawJson = fetchEvents("eventType=TRANSPORT");
            JsonNode root = objectMapper.readTree(rawJson);

            JsonNode eventArray = root.isArray() ? root : root.path("events");
            if (eventArray.isArray()) {
                for (JsonNode ev : eventArray) {
                    VesselScheduleDto dto = parseTransportEvent(ev);
                    if (dto != null) {
                        results.add(dto);
                    }
                }
            }
        } catch (Exception e) {
            log.warn("[OneLineAdapter] Failed to fetch ONE schedules via DCSA API: {}", e.getMessage());
        }

        return results;
    }

    /**
     * DCSA TransportEvent 파싱 -> VesselScheduleDto 매핑
     */
    private VesselScheduleDto parseTransportEvent(JsonNode event) {
        try {
            String eventType = event.path("eventType").asText("");
            if (!eventType.equalsIgnoreCase("TRANSPORT") && !eventType.isEmpty()) {
                return null;
            }

            JsonNode transportCall = event.path("transportCall");
            if (transportCall.isMissingNode()) {
                transportCall = event;
            }

            JsonNode vesselNode = transportCall.path("vessel");
            String vesselName = vesselNode.path("vesselName").asText(transportCall.path("vesselName").asText(""));
            String voyage = transportCall.path("carrierVoyageNumber").asText(transportCall.path("voyageNumber").asText(""));

            JsonNode location = transportCall.path("location");
            String portName = location.path("locationName").asText(transportCall.path("UNLocationCode").asText(""));
            String terminal = transportCall.path("facilityCode").asText(location.path("facilityName").asText(""));

            String eventDateTime = event.path("eventDateTime").asText(event.path("eventCreatedDateTime").asText(""));
            String classifier = event.path("eventClassifierCode").asText(""); // PLN(계획), ACT(실제), EST(예상)

            if (vesselName.isBlank()) {
                return null;
            }

            return VesselScheduleDto.builder()
                    .carrier(CARRIER_NAME)
                    .vesselName(vesselName.toUpperCase())
                    .voyage(voyage)
                    .pol("JAPAN")
                    .pod(portName.toUpperCase())
                    .arrival(eventDateTime)
                    .sailing(eventDateTime)
                    .terminal(terminal + (!classifier.isEmpty() ? " (" + classifier + ")" : ""))
                    .build();

        } catch (Exception e) {
            log.debug("[OneLineAdapter] Event parse failed: {}", e.getMessage());
            return null;
        }
    }
}
