package com.example.fates_system.domain.shipping.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 일본 항구명 정제 및 한자-영문 매핑 유틸리티
 */
public final class PortNameUtils {

    private PortNameUtils() {}

    public static final Map<String, String> JAPANESE_PORT_NAME_MAP = Map.ofEntries(
            Map.entry("博多", "HAKATA"),
            Map.entry("大阪", "OSAKA"),
            Map.entry("神戸", "KOBE"),
            Map.entry("名古屋", "NAGOYA"),
            Map.entry("横浜", "YOKOHAMA"),
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
            Map.entry("石狩湾新港", "ISHIKARI"),
            Map.entry("水島", "MIZUSHIMA"),
            Map.entry("福山", "FUKUYAMA"),
            Map.entry("大分", "OITA"),
            Map.entry("三島川之江", "MISHIMAKAWANOE"),
            Map.entry("岩国", "IWAKUNI"),
            Map.entry("大竹", "OTAKE"),
            Map.entry("三田尻中関", "MITAJIRINAKANOSEKI"),
            Map.entry("境港", "SAKAIMINATO"),
            Map.entry("舞鶴", "MAIZURU"),
            Map.entry("八代", "YATSUSHIRO"),
            Map.entry("薩摩川内", "SATSUMA SENDAI"),
            Map.entry("響灘", "HIBIKINADA"),
            Map.entry("伊万里", "IMARI"),
            Map.entry("長崎", "NAGASAKI"),
            Map.entry("釧路", "KUSHIRO"),
            Map.entry("函館", "HAKODATE"),
            Map.entry("釜石", "KAMAISHI"),
            Map.entry("豊橋", "TOYOHASHI"),
            Map.entry("和歌山", "WAKAYAMA"),
            Map.entry("秋田", "AKITA"),
            Map.entry("酒田", "SAKATA"),
            Map.entry("直江津", "NAOETSU"),
            Map.entry("伏木富山", "FUSHIKITOYAMA"),
            Map.entry("浜田", "HAMADA")
    );

    /**
     * 항구명에서 일본어/기호를 제거하고 영문 항구명만 추출 (영문이 없으면 사전 매핑)
     */
    public static String cleanPortNameToEnglish(String raw) {
        if (raw == null || raw.isBlank()) {
            return "";
        }

        // 선두 및 후미의 기호/공백 제거 (하이픈, 화살표, 점 등)
        String cleaned = raw.replaceAll("^[\\s\\-<>—·・]+|[\\s\\-<>—·・]+$", "").trim();

        // 1. 이미 영문이 포함되어 있는 경우 (예: "大阪 OSAKA", "- 横浜 YOKOHAMA", "博多 HAKATA", "TOKYO") -> 영문 단어만 추출
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("[A-Za-z]+").matcher(cleaned);
        List<String> englishWords = new ArrayList<>();
        while (m.find()) {
            String w = m.group().trim().toUpperCase();
            if (!w.equals("PORT") && !w.equals("WEEK") && !w.equals("SCHEDULE") && !w.equals("TERMINAL")) {
                englishWords.add(w);
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

        // 3. 매핑되지 않은 경우 비영문 문자 제거 후 반환 (단, 비어있으면 원본 반환)
        String onlyAlpha = cleaned.replaceAll("[^A-Za-z0-9\\s]", "").trim().toUpperCase();
        return onlyAlpha.isEmpty() ? cleaned : onlyAlpha;
    }
}
