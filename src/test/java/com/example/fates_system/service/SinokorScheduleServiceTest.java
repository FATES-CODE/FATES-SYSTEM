package com.example.fates_system.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.net.CookieManager;
import java.net.CookiePolicy;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.assertj.core.api.Assertions.assertThat;

public class SinokorScheduleServiceTest {

    private static final String SCHEDULE_URL = "https://ebiz.sinokor.co.kr/Schedule";
    private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

    @Test
    void testFetchSinokorWithCookie() throws Exception {
        CookieManager cookieManager = new CookieManager(null, CookiePolicy.ACCEPT_ALL);
        HttpClient client = HttpClient.newBuilder()
                .cookieHandler(cookieManager)
                .version(HttpClient.Version.HTTP_1_1)
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .connectTimeout(Duration.ofSeconds(15))
                .build();

        // 1. GET /Schedule → 세션 쿠키 획득
        HttpRequest getReq = HttpRequest.newBuilder()
                .uri(URI.create(SCHEDULE_URL))
                .header("User-Agent", USER_AGENT)
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                .header("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7")
                .GET()
                .build();
        HttpResponse<String> getRes = client.send(getReq, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        assertThat(getRes.statusCode()).isEqualTo(200);

        // 2. POST: bnd=O, JPHIJ→KRPUS, 2026-09
        String formData = "bnd=O&pol=JPHIJ&pod=KRPUS&month=2026-09&div=C&popup=N";
        HttpRequest postReq = HttpRequest.newBuilder()
                .uri(URI.create(SCHEDULE_URL))
                .header("User-Agent", USER_AGENT)
                .header("Origin", "https://ebiz.sinokor.co.kr")
                .header("Referer", SCHEDULE_URL)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                .header("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7")
                .POST(HttpRequest.BodyPublishers.ofString(formData, StandardCharsets.UTF_8))
                .build();
        HttpResponse<String> postRes = client.send(postReq, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        assertThat(postRes.statusCode()).isEqualTo(200);

        Pattern pattern = Pattern.compile("var\\s+schedules\\s*=\\s*(\\[.*?\\]);", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(postRes.body());
        assertThat(matcher.find()).isTrue();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(matcher.group(1));
        assertThat(root.isArray()).isTrue();

        boolean found2654W = false;
        for (int i = 0; i < root.size(); i++) {
            JsonNode item = root.get(i);
            if (item.path("VYG").asText().contains("2654W")) {
                found2654W = true;
                // 검증: 2654W의 CNTRDATE가 2026-09-25 인지 확인
                assertThat(item.path("CNTRDATE").asText()).isEqualTo("2026-09-25");
                break;
            }
        }
        assertThat(found2654W).isTrue();
    }
}
