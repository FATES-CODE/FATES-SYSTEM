package com.example.fates_system.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private ItNotice itNotice = new ItNotice();

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

        @Getter @Setter
        public static class Canva {
            private String sourceFolderId = "FAHSsO0H6ZA";
            private String archiveFolderId = "FAF7F_uQVOI";
            private int maxPollAttempts = 15;
            private long pollIntervalMs = 2000;
            private String clientId;
            private String clientSecret;
            private String refreshToken;
        }

        @Getter @Setter
        public static class Instagram {
            private boolean enabled = true;
            private String apiVersion = "v19.0";
            private int maxCarouselItems = 10;
            private long publishWaitMs = 3000;
            private String accountId;
            private String accessToken;
        }

        @Getter @Setter
        public static class Email {
            private String spreadsheetId = "1-yK3rYddxNqp3SPVyX7yYLTSr3psUGZUSMukbPui2bg";
            private String sender = "no-reply@fatesinc.com";
            private String draftTarget = "no-reply@fatesinc.com";
            private int bccChunkSize = 50;
        }

        @Getter @Setter
        public static class Drive {
            private String folderId = "1VLv23Hg5sl5Nd8kztGPnAfNj7a1J1C5R";
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
}
