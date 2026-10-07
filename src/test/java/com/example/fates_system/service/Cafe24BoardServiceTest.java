package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class Cafe24BoardServiceTest {

    private AppProperties appProperties;
    private Cafe24BoardService cafe24BoardService;

    @BeforeEach
    void setUp() {
        appProperties = new AppProperties();
        cafe24BoardService = new Cafe24BoardService(appProperties);
    }

    @Test
    @DisplayName("Cafe24 기본 설정값 검증")
    void testDefaultConfig() {
        AppProperties.Newsletter.Cafe24 cfg = appProperties.getNewsletter().getCafe24();
        assertThat(cfg.isEnabled()).isTrue();
        assertThat(cfg.getEndpoint()).isEqualTo("https://fatesinc.mycafe24.com/JcBoard/board_complete.php");
        assertThat(cfg.getTname()).isEqualTo("guide");
        assertThat(cfg.getAuthor()).isEqualTo("관리자");
        assertThat(cfg.getPassword()).isEqualTo("0381");
        assertThat(cfg.getPostLang()).isEqualTo("ko");
    }

    @Test
    @DisplayName("비활성화 상태일 경우 네트워크 요청 없이 바로 true 반환")
    void testDisabledBehavior() {
        appProperties.getNewsletter().getCafe24().setEnabled(false);
        boolean result = cafe24BoardService.uploadNewsletter(new byte[]{}, "test.pdf", "테스트 제목");
        assertThat(result).isTrue();
    }
}
