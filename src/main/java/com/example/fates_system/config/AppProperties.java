package com.example.fates_system.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "fates")
public class AppProperties {

    private Google google = new Google();
    private Calendars calendars = new Calendars();
    private List<String> targetEmails = new ArrayList<>();
    private Map<String, List<String>> groups = new HashMap<>();
    private List<String> skipHolidays = new ArrayList<>();
    private String logSheetId = "1HFbTeqLVC6lplLbCxFNzluauWxTSqG6RZcjsKDfO7uo";
    private Scheduler scheduler = new Scheduler();
    private Newsletter newsletter = new Newsletter();
    private Shipping shipping = new Shipping();
    private ItNotice itNotice = new ItNotice();
    private ProfitReport profitReport = new ProfitReport();
    private DailyLogReport dailyLogReport = new DailyLogReport();
    private Ckline ckline = new Ckline();
    private Sinokor sinokor = new Sinokor();
    private Panocean panocean = new Panocean();

    /**
     * 선사별 공식 API 설정 Map. key=선사코드(소문자), value=API 설정.
     * application.yml 예시:
     *   fates:
     *     carrier-apis:
     *       one:
     *         enabled: true
     *         api-key: "your-one-api-key-here"
     *       hmm:
     *         enabled: false
     *         api-key: ""
     */
    private Map<String, CarrierApiConfig> carrierApis = new LinkedHashMap<>();

    @Getter
    @Setter
    public static class CarrierApiConfig {
        /** 이 선사 API 사용 여부 */
        private boolean enabled = true;
        /** 공식 개발자 포털에서 발급받은 API Key (또는 Client ID) */
        private String apiKey = "";
        /** OAuth 2.0 인증용 Client ID */
        private String clientId = "";
        /** OAuth 2.0 인증용 Client Secret */
        private String clientSecret = "";
        /** 선택: API 베이스 URL 오버라이드 (예: https://mock.one-line.com 또는 https://api.one-line.com) */
        private String baseUrl = "https://mock.one-line.com";
    }

    @Getter
    @Setter
    public static class Shipping {
        private boolean enabled = true;
        private String cron = "0 30 8 * * *"; // 매일 오전 8시 30분 정각
        private String baseUrl = "https://toyoshingo.com";
        private String vssApiBaseUrl = "https://api-shipper.vessel-schedule-service.com/api/v1";
        private String spreadsheetId = ""; // 구글 시트 ID 또는 이름 "shipping-date"
        private int fetchMonths = 2; // 수집 대상 개월 수 (기본 2개월)
        private Map<String, String> carriers = Map.ofEntries(
            Map.entry("HMM", "hmm"),
            Map.entry("SINOKOR", "sinokor"),
            Map.entry("HEUNG A", "heunga"),
            Map.entry("CK LINE", "ckline"),
            Map.entry("COSCO", "cosco"),
            Map.entry("HAPAG-LLOYD", "hapag"),
            Map.entry("YANG MING", "yangming"),
            Map.entry("STAROCEAN", "starocean"),
            Map.entry("HASCO", "hasco"),
            Map.entry("SMC", "smc"),
            Map.entry("MAERSK", "maersk"),
            Map.entry("MSC", "msc"),
            Map.entry("ONE", "one"),
            Map.entry("EVERGREEN", "evergreen"),
            Map.entry("CMA CGM", "cmacgm"),
            Map.entry("TS LINES", "tslines"),
            Map.entry("PANCON", "pancon"),
            Map.entry("TCLC", "tclc"),
            Map.entry("SITC", "sitc"),
            Map.entry("WANHAI", "wanhai"),
            Map.entry("NAMSUNG", "namsung"),
            Map.entry("DONGJIN", "dongjin"),
            Map.entry("OOCL", "oocl"),
            Map.entry("INTERASIA", "interasia"),
            Map.entry("DONGYOUNG", "dongyoung"),
            Map.entry("KMTC", "kmtc")
        );
    }

    @Getter
    @Setter
    public static class ItNotice {
        private boolean enabled = true;
        private String cron = "0 0 9 1 * *";
        private String sender = "cloud@fatesinc.com";
        private String recipient = "yjchoi@fatesinc.com";
        private String ccRecipients = "mocomotoko@fatesinc.com,airimport@fatesinc.com,airexport@fatesinc.com,seaimport@fatesinc.com,seaexport@fatesinc.com,account1@fatesinc.com,bl@fatesinc.com,pearlsim@fatesinc.com,layla@fatesinc.com,ikeda@fatesinc.com,mia@fatesinc.com,tf@fatesinc.com,azamino.ltd@gmail.com,sales@fatesinc.com,cloud@fatesinc.com";
        private String image1Id = "1cvvBZIYxJIgicwjJDpxj0VLBuqPYymtx";
        private String image2Id = "1eW6KyZxDppJ-AuY5T4vuE50RqNL9UDRc";
        private String image3Id = "11gdrrUghvJAb6EIJW8XM52eFZWNvBmT6";
        private String image4Id = "1mUgHabKGmBexebKVdjTKmQSdA7AQi6MA";
    }

    @Getter
    @Setter
    public static class Newsletter {
        private boolean enabled = true;
        private String cron = "0 0 * * * *";
        private String secretName = "FATES-NEWSLETTER";
        private Canva canva = new Canva();
        private Instagram instagram = new Instagram();
        private Email email = new Email();
        private Drive drive = new Drive();
        private Cafe24 cafe24 = new Cafe24();

        @Getter @Setter
        public static class Canva {
            private String sourceFolderId = "FAHSsO0H6ZA";
            private String archiveFolderId = "FAF7F_uQVOI";
            private int maxPollAttempts = 15;
            private long pollIntervalMs = 2000;
            private String clientId = "OC-AaAT3t0A3wr4";
            private String clientSecret;
            private String refreshToken;
            private String tokenFilePath = "credentials/canva-token.json";
        }

        @Getter @Setter
        public static class Instagram {
            private boolean enabled = true;
            private String apiVersion = "v19.0";
            private int maxCarouselItems = 10;
            private long publishWaitMs = 3000;
            private String accountId = "17841471452286580";
            private String accessToken;
            private String tokenFilePath = "credentials/instagram-token.json";
        }

        @Getter @Setter
        public static class Email {
            private String spreadsheetId = "1-yK3rYddxNqp3SPVyX7yYLTSr3psUGZUSMukbPui2bg";
            private String sender = "no-reply@fatesinc.com";
            private String draftTarget = "no-reply@fatesinc.com";
            private int bccChunkSize = 50;
            private int draftSendDelaySeconds = 5;
            private boolean autoSend = true;
        }

        @Getter @Setter
        public static class Drive {
            private String folderId = "1VLv23Hg5sl5Nd8kztGPnAfNj7a1J1C5R";
        }

        @Getter @Setter
        public static class Cafe24 {
            private boolean enabled = true;
            private String endpoint = "https://fatesinc.mycafe24.com/JcBoard/board_complete.php";
            private String tname = "guide";
            private String author = "관리자";
            private String password = "0381";
            private String postLang = "ko";
        }
    }

    @Getter
    @Setter
    public static class Google {
        private String serviceAccountKeyPath;
        private String serviceAccountEmail;
        private String privateKey;
        private SecretManager secretManager = new SecretManager();
    }

    @Getter
    @Setter
    public static class SecretManager {
        private boolean enabled = true;
        private String projectId = "650454847556";
        private String secretName = "sec-7f9a2b8c3d";
        private String version = "latest";
    }

    @Getter
    @Setter
    public static class Calendars {
        private String korea = "en.south_korea#holiday@group.v.calendar.google.com";
        private String japan = "en.japanese#holiday@group.v.calendar.google.com";
        private String custom = "c_59413484b7a70585537d0853abb0b031e1b5124bff359f9519235fd99c0b43f4@group.calendar.google.com";
    }

    @Getter
    @Setter
    public static class Scheduler {
        private boolean enabled = false;
        private String cron = "0 0 1 * * *";
    }

    @Getter
    @Setter
    public static class ProfitReport {
        private boolean enabled = true;
        private String cron = "0 0 9 1 * *"; // 매달 25일 오전 9시
        private String sourceSpreadsheetId = "19VddLRj8KOczwN7tLPcKkJk1T0GVLNznwroaGj54BAU";
        private String targetSpreadsheetId = "1mcwgt1LzppZtdqGr94sjrL2Wa4ZdRPcqmIho1GHtAh0";
        private String targetFolderId = "1JvDIkArg_plVTAxZWq1AC7mHwKvV9yGh";
    }

    @Getter
    @Setter
    public static class DailyLogReport {
        private boolean enabled = true;
        private String cron = "0 0 0 * * *";
        private String sender = "cloud@fatesinc.com";
        private String recipient = "cloud@fatesinc.com";
        private String logFilePath = "logs/fates-system.log";
    }

    @Getter
    @Setter
    public static class Ckline {
        private boolean enabled = true;
        private String cron = "0 0 9 * * *"; // 매일 오전 9시 정각
        private String spreadsheetId = "11fc0ml4jJ24jsD1pUJ18K5RoRXcf4D0LcWcKFDuSMKs";
        private int fetchMonths = 2;
    }

    @Getter
    @Setter
    public static class Sinokor {
        private boolean enabled = true;
        private String cron = "0 0 9 * * *"; // 매일 오전 9시 정각
        private String spreadsheetId = "11fc0ml4jJ24jsD1pUJ18K5RoRXcf4D0LcWcKFDuSMKs";
        private int fetchMonths = 2; // 기본 2달치
    }

    @Getter
    @Setter
    public static class Panocean {
        private boolean enabled = true;
        private String cron = "0 10 9 * * *"; // 매일 오전 9시 10분 자동 동기화
        private String spreadsheetId = "11fc0ml4jJ24jsD1pUJ18K5RoRXcf4D0LcWcKFDuSMKs";
        private int fetchMonths = 2; // 기본 2달치
    }
}

