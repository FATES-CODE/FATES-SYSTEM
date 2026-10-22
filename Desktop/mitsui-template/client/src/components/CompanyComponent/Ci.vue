<template>
  <SubPageLayout
    category-title="회사정보"
    category-en="COMPANY INFO"
    category-url="/information"
    page-title="CI"
    page-description="기업의 철학과 미래 비전을 시각적으로 형상화한 브랜드 아이덴티티입니다."
    hero-image="/images/tokyo-tower-bg.jpg"
    :tabs="companyTabs"
  >
    <div class="ci-page">
      <div class="sub-headline-box">
        <span class="sub-badge">CORPORATE IDENTITY</span>
        <h2 class="sub-main-title">CI 스토리 및 컨셉</h2>
        <div class="sub-title-bar"></div>
        <p class="section-intro">
          AZAMINO의 CI는 신뢰와 혁신을 바탕으로 글로벌 무대를 향해 무한히 뻗어나가는
          비즈니스의 활력과 견고한 기업가 정신을 상징합니다.
        </p>
      </div>

      <div class="ci-logo-display-card">
        <div class="ci-logo-preview">
          <img src="/images/logo.jpg" alt="AZAMINO CI Logo" class="ci-preview-img" />
        </div>
        <div class="ci-logo-explanation">
          <h3 class="ci-concept-title">Symbol & Wordmark Concept</h3>
          <p class="ci-concept-text">
            심볼은 신뢰를 상징하는 정방형 프레임과 유연한 비즈니스 밸류체인을 형상화하여, 
            고객과 사회에 변함없는 가치를 전달하고자 하는 확고한 의지를 담았습니다. 
            정제된 서체의 워드마크는 글로벌 스탠다드에 부합하는 전문성과 품격을 나타냅니다.
          </p>
        </div>
      </div>

      <!-- 브랜드 컬러 시스템 -->
      <section class="section-block">
        <h3 class="section-sub-title">Brand Color System</h3>
        <p class="section-sub-desc">
          CI의 시각적 일관성과 신뢰감을 형성하는 핵심 컬러 팔레트 규정입니다.
        </p>

        <div class="color-palette-grid">
          <div class="color-chip-card">
            <div class="color-chip" style="background-color: #0b2545;"></div>
            <div class="color-details">
              <span class="color-role">Main Primary Color</span>
              <strong class="color-name">Mitsui Deep Navy</strong>
              <div class="color-codes">
                <span>HEX: #0B2545</span>
                <span>RGB: 11, 37, 69</span>
              </div>
              <p class="color-desc">깊은 신뢰와 안정성, 글로벌 비즈니스의 전문성을 상징합니다.</p>
            </div>
          </div>

          <div class="color-chip-card">
            <div class="color-chip" style="background-color: #134074;"></div>
            <div class="color-details">
              <span class="color-role">Secondary Color</span>
              <strong class="color-name">Ocean Blue</strong>
              <div class="color-codes">
                <span>HEX: #134074</span>
                <span>RGB: 19, 64, 116</span>
              </div>
              <p class="color-desc">대양을 건너는 활발한 무역과 역동적인 혁신 에너지를 표현합니다.</p>
            </div>
          </div>

          <div class="color-chip-card">
            <div class="color-chip" style="background-color: #c7b3cd;"></div>
            <div class="color-details">
              <span class="color-role">Accent Color</span>
              <strong class="color-name">Soft Lilac Accent</strong>
              <div class="color-codes">
                <span>HEX: #C7B3CD</span>
                <span>RGB: 199, 179, 205</span>
              </div>
              <p class="color-desc">고객을 향한 따뜻한 케어(개호식품, 생활소비재)와 감성을 나타냅니다.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 시그니처 및 적용 규정 가이드 -->
      <section class="section-block">
        <h3 class="section-sub-title">Logo Usage Guidelines</h3>
        <div class="ci-guideline-box">
          <ul class="ci-rules-list">
            <li>
              <strong>여백 규정 (Clear Space):</strong>
              로고의 시인성과 독립성을 보장하기 위해 주변의 다른 요소나 문자로부터 최소 지정 여백을 유지해야 합니다.
            </li>
            <li>
              <strong>비율 유지 (Aspect Ratio):</strong>
              로고는 어떤 경우에도 임의로 비율을 왜곡하거나 변형하여 사용할 수 없습니다.
            </li>
            <li>
              <strong>색상 변형 금지:</strong>
              규정된 브랜드 전용 색상 이외의 임의의 그라데이션, 그림자 효과, 색상 반전 사용을 지양합니다.
            </li>
          </ul>
        </div>
      </section>
    </div>
  </SubPageLayout>
</template>

<script setup>
import { computed } from 'vue';
import SubPageLayout from '../common/SubPageLayout.vue';
import { currentLang } from '../../composables/useLanguage.js';

const companyTabs = computed(() => {
  if (currentLang.value === 'ja') {
    return [
      { name: 'ご挨拶', url: '/greeting' },
      { name: '企業理念', url: '/overview' },
      { name: 'CI紹介', url: '/ci' }
    ];
  } else if (currentLang.value === 'en') {
    return [
      { name: 'CEO Message', url: '/greeting' },
      { name: 'Corporate Philosophy', url: '/overview' },
      { name: 'CI Introduction', url: '/ci' }
    ];
  }
  return [
    { name: '인사말', url: '/greeting' },
    { name: '경영이념', url: '/overview' },
    { name: 'CI 소개', url: '/ci' }
  ];
});
</script>
