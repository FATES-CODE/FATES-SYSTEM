<template>
  <SubPageLayout
    :category-title="currentContent.categoryTitle"
    :category-en="currentContent.categoryEn"
    :category-url="currentContent.categoryUrl"
    :page-title="currentContent.pageTitle"
  >
    <template #hero>
      <section 
        class="glance-hero-mitsui-fullscreen"
        :class="{ 'is-revealed': isRevealed }"
      >
        <div class="glance-backdrop-overlay"></div>

        <div class="glance-center-container">
          <div class="glance-title-top-box" @click="toggleReveal" title="클릭하여 상세 정보 펼치기">
            <h1 class="glance-heading-title">{{ glanceData.title }}</h1>
            <div class="glance-title-underline"></div>
          </div>

          <div class="glance-rest-content" :class="{ 'visible': isRevealed }">
            <div class="glance-main-grid">

              <div class="glance-left-brand-col">
                <div class="glance-symbol-mark">
                </div>
                <div class="glance-brand-text">
                  <span class="brand-corp-name">{{ glanceData.brandName }}</span>
                  <span class="brand-sub-title">{{ glanceData.subTitle }}</span>
                </div>
              </div>

              <div class="glance-right-col">
                <div class="glance-stats-row glance-top-row">
                  <div 
                    v-for="(item, idx) in glanceData.topStats" 
                    :key="idx" 
                    class="glance-stat-col"
                  >
                    <span class="stat-col-label">{{ item.label }}</span>
                    <div class="stat-val-wrapper">
                      <span class="stat-big-number" :class="{ 'is-date': item.value.length > 6 }">{{ item.value }}</span>
                      <span v-if="item.unit" class="stat-unit-text">{{ item.unit }}</span>
                    </div>
                  </div>
                </div>

                <div class="glance-row-divider"></div>

                <div class="glance-stats-row glance-bottom-row">
                  <div class="glance-stat-col stat-cf-col">
                    <span class="stat-col-label">{{ glanceData.bottomStats.bank.label }}</span>
                    <div class="stat-icon-num-wrap">
                      <div class="stat-graphic-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                      </div>
                      <div class="stat-val-stacked">
                        <span class="stat-big-number is-bank-name">{{ glanceData.bottomStats.bank.value }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="glance-stat-col stat-network-col">
                    <div class="network-header-wrap">
                      <span class="stat-col-label">{{ glanceData.bottomStats.globalNetwork.label }}</span>
                      <div class="network-headline-val">
                        <span class="network-big-val">{{ glanceData.bottomStats.globalNetwork.value }}</span>
                        <span class="network-unit-text">{{ glanceData.bottomStats.globalNetwork.unit }}</span>
                      </div>
                    </div>

                    <div class="network-sub-metrics-grid">
                      <div 
                        v-for="(sub, sIdx) in glanceData.bottomStats.globalNetwork.subMetrics" 
                        :key="sIdx" 
                        class="network-sub-item"
                      >
                        <div class="sub-item-icon">
                          <svg v-if="sub.icon === 'location'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <svg v-else-if="sub.icon === 'building'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                            <line x1="9" y1="6" x2="9" y2="6.01"></line>
                            <line x1="15" y1="6" x2="15" y2="6.01"></line>
                            <line x1="9" y1="10" x2="9" y2="10.01"></line>
                            <line x1="15" y1="10" x2="15" y2="10.01"></line>
                            <line x1="9" y1="14" x2="9" y2="14.01"></line>
                            <line x1="15" y1="14" x2="15" y2="14.01"></line>
                            <line x1="9" y1="18" x2="15" y2="18"></line>
                          </svg>
                          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <span class="sub-item-label">{{ sub.label }}</span>
                        <div class="sub-item-val-wrap">
                          <span class="sub-item-number">{{ sub.value }}</span>
                          <span class="sub-item-unit">{{ sub.unit }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            <div class="glance-footnote-bar">
              <p class="footnote-text">{{ glanceData.footnote }}</p>
            </div>
          </div>
        </div>

      </section>
    </template>

    <div id="company-main-content" class="company-mitsui-template-wrap">

      <div class="company-features-list">
        <section 
          v-for="(feature, fIdx) in companyFeatures" 
          :key="fIdx" 
          class="company-business-feature-row"
        >
          <div class="biz-feature-thumb-wrap">
            <router-link :to="feature.mainLink" class="biz-thumb-link">
              <img
                :src="feature.image"
                :alt="feature.title"
                class="biz-thumb-img"
              />
            </router-link>
          </div>

          <div class="biz-feature-content-wrap">
            <h2 class="biz-feature-title">
              <router-link :to="feature.mainLink" class="biz-title-link">{{ feature.title }}</router-link>
            </h2>

            <p class="biz-feature-lead-text">{{ feature.leadText }}</p>
            <p class="biz-feature-sub-text">{{ feature.subText }}</p>
          </div>
        </section>
      </div>

    </div>
  </SubPageLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import SubPageLayout from '../common/SubPageLayout.vue';
import { currentLang, setLanguage } from '../../composables/useLanguage.js';

const glanceDataByLang = {
  ko: {
    badge: '2024년 3월기',
    title: '회사정보',
    brandName: 'AZAMINO',
    topStats: [
      { label: '매상', value: '2', unit: '億円' },
      { label: '설립', value: '2014年1月24日', unit: '' }
    ],
    bottomStats: {
      bank: {
        label: '주요거래은행',
        value: '미즈호 은행'
      },
      globalNetwork: {
        label: '글로벌 네트워크',
        value: '62',
        unit: '개국',
        subMetrics: [
          { icon: 'location', label: '사무소', value: '85', unit: '거점' },
          { icon: 'building', label: '비즈니스 회사', value: '300', unit: '사' },
          { icon: 'users', label: '인원', value: '30,000', unit: '명' }
        ]
      }
    },
    footnote: '※ 기재된 수치는 당사 글로벌 네트워크 및 제휴 파트너사의 지표를 포함합니다.'
  },
  ja: {
    badge: '2024年3月期',
    title: '企業情報',
    brandName: 'AZAMINO',
    topStats: [
      { label: '売上', value: '2', unit: '億円' },
      { label: '設立', value: '2014年1月24日', unit: '' }
    ],
    bottomStats: {
      bank: {
        label: '主要取引銀行',
        value: 'みずほ銀行'
      },
      globalNetwork: {
        label: 'グローバルネットワーク',
        value: '62',
        unit: 'ヵ国',
        subMetrics: [
          { icon: 'location', label: '拠点', value: '85', unit: '拠点' },
          { icon: 'building', label: 'グループ会社', value: '300', unit: '社' },
          { icon: 'users', label: '従業員数', value: '30,000', unit: '名' }
        ]
      }
    },
    footnote: '※ 記載された数値は、当社のグローバルネットワークおよび提携パートナーを含みます。'
  },
  en: {
    badge: 'FY2024',
    title: 'Company Info',
    brandName: 'AZAMINO',
    topStats: [
      { label: 'Revenue', value: '200', unit: 'M JPY' },
      { label: 'Established', value: 'Jan 24, 2014', unit: '' }
    ],
    bottomStats: {
      bank: {
        label: 'Main Bank',
        value: 'Mizuho Bank'
      },
      globalNetwork: {
        label: 'Global Network',
        value: '62',
        unit: 'Countries',
        subMetrics: [
          { icon: 'location', label: 'Offices', value: '85', unit: 'Locations' },
          { icon: 'building', label: 'Affiliates', value: '300', unit: 'Companies' },
          { icon: 'users', label: 'Headcount', value: '30,000', unit: 'Staff' }
        ]
      }
    },
    footnote: '* Data includes our global operating network and affiliated trade partners.'
  }
};

const glanceData = computed(() => {
  return glanceDataByLang[currentLang.value] || glanceDataByLang.ja;
});

const featuresDataByLang = {
  ko: [
    {
      title: '인사말',
      mainLink: '/greeting',
      image: '/images/card/main-card-1.png',
      leadText: '신뢰와 도전을 바탕으로 새로운 미래 가치를 창출합니다.',
      subText: 'AZAMINO는 급변하는 글로벌 비즈니스 환경 속에서 고객과 파트너를 위한 최고의 솔루션을 제공하며 지속 가능한 성장을 추구합니다.',
      subLinks: [
        { name: '대표이사 인사말', url: '/greeting' },
        { name: '경영 철학', url: '/greeting' }
      ]
    },
    {
      title: '회사이념',
      mainLink: '/overview',
      image: '/images/card/main-card-2.png',
      leadText: '사람과 기술, 세계를 연결하여 풍요로운 사회에 공헌합니다.',
      subText: '글로벌 네트워크와 탄탄한 전문성을 바탕으로, 고객과 사회 모두에게 신뢰받는 혁신적 비즈니스를 실현해 나갑니다.',
      subLinks: [
        { name: '경영이념 체계', url: '/overview' },
        { name: '회사개요', url: '/overview' },
        { name: '사업소 안내', url: '/location' }
      ]
    }
  ],
  ja: [
    {
      title: 'ご挨拶',
      mainLink: '/greeting',
      image: '/images/card/main-card-1.png',
      leadText: '信頼と挑戦を礎に、新たな未来価値を共創します。',
      subText: '急速に変化するグローバルビジネス環境の中で、お客様とパートナーの皆様に最適なソリューションを提供し、持続可能な発展を推進します。',
      subLinks: [
        { name: '代表挨拶', url: '/greeting' },
        { name: '経営哲学', url: '/greeting' }
      ]
    },
    {
      title: '企業理念',
      mainLink: '/overview',
      image: '/images/card/main-card-2.png',
      leadText: '人と技術、グローバルネットワークをつなぎ、豊かな社会に貢献します。',
      subText: '強固な専門性と国際的なネットワークを活かし、社会と人々に信頼されるイノベーションを実現してまいります。',
      subLinks: [
        { name: '経営理念体系', url: '/overview' },
        { name: '会社概要', url: '/overview' },
        { name: '拠点案内', url: '/location' }
      ]
    }
  ],
  en: [
    {
      title: 'CEO Greeting',
      mainLink: '/greeting',
      image: '/images/card/main-card-1.png',
      leadText: 'Creating sustainable future value based on trust and bold innovation.',
      subText: 'AZAMINO delivers optimal global business solutions, driving sustainable growth together with our partners worldwide.',
      subLinks: [
        { name: 'CEO Message', url: '/greeting' },
        { name: 'Management Philosophy', url: '/greeting' }
      ]
    },
    {
      title: 'Corporate Philosophy',
      mainLink: '/overview',
      image: '/images/card/main-card-2.png',
      leadText: 'Connecting people, technology, and global networks for social prosperity.',
      subText: 'Leveraging our global network and deep expertise, we strive to realize innovative businesses trusted by society.',
      subLinks: [
        { name: 'Philosophy System', url: '/overview' },
        { name: 'Company Overview', url: '/overview' },
        { name: 'Global Locations', url: '/location' }
      ]
    }
  ]
};

const companyFeatures = computed(() => {
  return featuresDataByLang[currentLang.value] || featuresDataByLang.ja;
});

const isRevealed = ref(false);

const handleScroll = () => {
  const scrollY = window.scrollY;
  if (scrollY > 20) {
    isRevealed.value = true;
  } else {
    isRevealed.value = false;
  }
};

const handleWheel = (e) => {
  if (e.deltaY > 0) {
    isRevealed.value = true;
  }
};

const toggleReveal = () => {
  isRevealed.value = !isRevealed.value;
  if (isRevealed.value) {
    const heroEl = document.querySelector('.glance-hero-mitsui-fullscreen');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('wheel', handleWheel, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('wheel', handleWheel);
});

const langData = {
  ko: {
    categoryTitle: '회사정보',
    categoryEn: 'COMPANY INFO',
    categoryUrl: '/information',
    pageTitle: '회사정보'
  },
  ja: {
    categoryTitle: '企業情報',
    categoryEn: 'COMPANY INFO',
    categoryUrl: '/information',
    pageTitle: '企業情報'
  },
  en: {
    categoryTitle: 'Company Info',
    categoryEn: 'COMPANY INFO',
    categoryUrl: '/information',
    pageTitle: 'Company Info'
  }
};

const currentContent = computed(() => {
  return langData[currentLang.value] || langData.ja;
});
</script>

<style scoped>
/* ==========================================================================
   화면 전체(100vh)를 꽉 채우는 히어로 배너 (풀스크린)
   ========================================================================== */
.glance-hero-mitsui-fullscreen {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-top: 110px;
  background-image: url('/images/tokyo-tower-bg.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  transition: padding 0.5s ease;
}

/* 다크 틴트 오버레이 */
.glance-backdrop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    110deg,
    rgba(6, 17, 32, 0.70) 0%,
    rgba(8, 24, 44, 0.65) 48%,
    rgba(10, 26, 46, 0.55) 100%
  );
  backdrop-filter: blur(1px);
  transition: background 0.8s ease;
  pointer-events: none;
  z-index: 1;
}

.glance-hero-mitsui-fullscreen.is-revealed .glance-backdrop-overlay {
  background: linear-gradient(
    110deg,
    rgba(6, 17, 32, 0.92) 0%,
    rgba(8, 24, 44, 0.86) 48%,
    rgba(10, 26, 46, 0.75) 100%
  );
}

/* 중앙 정렬 컨테이너 (화면 정중앙으로 모아주는 핵심) */
.glance-center-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  padding: 40px 36px 60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 1. 상단 중앙 타이틀 */
.glance-title-top-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  margin-bottom: 28px;
  transition: transform 0.3s ease;
}

.glance-title-top-box:hover {
  transform: translateY(-2px);
}

.glance-heading-title {
  font-size: 46px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0;
  color: #ffffff;
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.55);
}

.glance-title-underline {
  width: 48px;
  height: 3px;
  background-color: #ffffff;
  margin-top: 12px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

/* 2. 대시보드 통계 내용 (스크롤/토글 애니메이션) */
.glance-rest-content {
  width: 100%;
  opacity: 0;
  transform: translateY(70px);
  pointer-events: none;
  visibility: hidden;
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
              visibility 0.85s ease;
  will-change: transform, opacity;
}

.glance-rest-content.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  visibility: visible;
}

.glance-main-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 36px;
  align-items: center;
}

.glance-left-brand-col {
  display: flex;
  align-items: center;
  gap: 14px;
  border-right: 1px solid rgba(255, 255, 255, 0.22);
  padding-right: 28px;
  height: 100%;
}

.glance-symbol-mark {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.95);
}

.symbol-svg {
  width: 100%;
  height: 100%;
}

.glance-brand-text {
  display: flex;
  flex-direction: column;
}

.brand-corp-name {
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #ffffff;
  line-height: 1.2;
}

.brand-sub-title {
  font-size: 13.5px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  font-style: italic;
}

.glance-right-col {
  display: flex;
  flex-direction: column;
}

.glance-top-row {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  align-items: flex-end;
  padding-bottom: 22px;
}

.glance-stat-col {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  position: relative;
}

.glance-stat-col:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 10%;
  height: 80%;
  width: 1px;
  background: rgba(255, 255, 255, 0.22);
}

.stat-col-label {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.82);
  margin-bottom: 6px;
  letter-spacing: -0.01em;
}

.stat-val-wrapper {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.stat-big-number {
  font-size: 46px;
  font-weight: 800;
  line-height: 1.1;
  color: #ffffff;
  letter-spacing: -0.03em;
  font-family: 'Plus Jakarta Sans', sans-serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

.stat-big-number.is-date {
  font-size: 34px;
  letter-spacing: -0.02em;
}

.stat-unit-text {
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}

.glance-row-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.22);
  margin: 6px 0 22px;
}

.glance-bottom-row {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  align-items: flex-end;
}

.stat-big-number.is-bank-name {
  font-size: 32px;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.stat-icon-num-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 6px;
}

.stat-graphic-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-graphic-icon svg {
  width: 32px;
  height: 32px;
}

.stat-val-stacked {
  display: flex;
  flex-direction: column;
}

.stat-val-stacked .stat-big-number {
  font-size: 44px;
}

.stat-val-stacked .stat-unit-text {
  margin-top: -2px;
}

.network-header-wrap {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
}

.network-headline-val {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.network-big-val {
  font-size: 38px;
  font-weight: 800;
  line-height: 1;
  color: #ffffff;
}

.network-unit-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
}

.network-sub-metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 12px 10px;
}

.network-sub-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.sub-item-icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 4px;
}

.sub-item-icon svg {
  width: 100%;
  height: 100%;
}

.sub-item-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.25;
  margin-bottom: 3px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sub-item-val-wrap {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.sub-item-number {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
}

.sub-item-unit {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.85);
}

.glance-footnote-bar {
  margin-top: 26px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
}

.footnote-text {
  font-size: 11px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.68);
  margin: 0;
  word-break: keep-all;
}

.glance-scroll-indicator {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  z-index: 10;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  user-select: none;
}

.glance-scroll-indicator:hover {
  color: #ffffff;
  transform: translateX(-50%) translateY(3px);
}

.glance-scroll-indicator.is-scrolled-state {
  opacity: 0.6;
}

.scroll-label {
  font-size: 10px;
  letter-spacing: 0.22em;
  font-weight: 700;
  text-transform: uppercase;
}

.scroll-mouse-track {
  width: 2px;
  height: 36px;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  border-radius: 1px;
}

.scroll-wheel-bar {
  width: 100%;
  height: 45%;
  background: #ffffff;
  position: absolute;
  top: -45%;
  animation: scrollTrackDown 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

@keyframes scrollTrackDown {
  0% { top: -45%; opacity: 0; }
  30% { opacity: 1; }
  85% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* ==========================================================================
   메인 본문 템플릿 레이아웃
   ========================================================================== */
.company-mitsui-template-wrap {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 80px 24px 110px;
  box-sizing: border-box;
}

/* 1. 상단 3개 섹션 리스트 */
.company-features-list {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.company-business-feature-row {
  display: flex;
  gap: 56px;
  align-items: center;
  width: 100%;
  padding-bottom: 48px;
  border-bottom: 1px solid #f1f5f9;
}

.company-business-feature-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.biz-feature-thumb-wrap {
  width: 500px;
  max-width: 46%;
  flex-shrink: 0;
}

.biz-thumb-link {
  display: block;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
}

.biz-thumb-img {
  width: 100%;
  height: 290px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.biz-thumb-link:hover .biz-thumb-img {
  transform: scale(1.03);
}

.biz-feature-content-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.35s ease;
}

.company-business-feature-row:hover .biz-feature-content-wrap {
  transform: translateX(6px);
}

.biz-feature-title {
  margin: 0 0 16px 0;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: #111827;
}

.biz-title-link {
  color: #111827;
  text-decoration: none;
  transition: color 0.2s ease;
}

.biz-title-link:hover {
  color: #004098;
}

.biz-feature-lead-text {
  font-size: 17px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.6;
  margin: 0 0 12px 0;
}

.biz-feature-sub-text {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.75;
  margin: 0 0 24px 0;
  word-break: keep-all;
}

.biz-sub-links-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.biz-sub-link-item {
  display: inline-flex;
  align-items: center;
  position: relative;
}

.biz-sub-link-item:not(:last-child)::after {
  content: '|';
  margin-left: 16px;
  color: #cbd5e1;
  font-size: 13px;
}

.biz-sub-link-item a {
  font-size: 14.5px;
  font-weight: 500;
  color: #374151;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 0.2s ease;
}

.biz-sub-link-item a:hover {
  color: #004098;
}

/* 가로 구분선 */
.company-content-divider {
  width: 100%;
  height: 1px;
  background-color: #e2e8f0;
  margin: 64px 0 56px;
}

/* 2. 하단: 2단 미디어 카드 그리드 */
.company-bottom-media-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  width: 100%;
}

.media-card-item {
  display: flex;
  flex-direction: column;
}

.media-card-thumb-link {
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.media-thumb-box {
  width: 100%;
  aspect-ratio: 16 / 10;
  background-color: #f3f4f6;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  position: relative;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.media-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.media-card-thumb-link:hover .media-thumb-img {
  transform: scale(1.03);
}

.video-play-button-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.media-card-thumb-link:hover .video-play-button-overlay {
  background: rgba(0, 0, 0, 0.42);
}

.play-circle-btn {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.media-card-thumb-link:hover .play-circle-btn {
  transform: scale(1.1);
  background-color: #ffffff;
}

.play-triangle-svg {
  width: 24px;
  height: 24px;
  color: #004098;
  margin-left: 3px;
}

.media-card-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  padding: 0 4px;
}

.media-card-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.media-card-title a {
  color: #111827;
  text-decoration: none;
  transition: color 0.2s ease;
}

.media-card-title a:hover,
.video-title-click:hover {
  color: #004098;
  cursor: pointer;
}

.brochure-pdf-download-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.brochure-pdf-download-btn:hover {
  background-color: #004098;
  border-color: #004098;
}

.brochure-pdf-download-btn:hover .pdf-label-text {
  color: #ffffff;
}

.brochure-pdf-download-btn:hover .pdf-file-icon {
  fill: #ffffff;
}

.pdf-label-text {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  transition: color 0.2s ease;
}

.pdf-file-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transition: fill 0.2s ease;
}

/* 비디오 모달 */
.video-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
}

.video-modal-container {
  position: relative;
  width: 100%;
  max-width: 960px;
  background-color: #000000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.video-modal-close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 28px;
  line-height: 1;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.video-modal-close-btn:hover {
  background: #dc2626;
}

.video-iframe-responsive {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 비율 */
}

.video-iframe-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 반응형 */
@media (max-width: 1024px) {
  .glance-main-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .glance-left-brand-col {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 16px;
    padding-right: 0;
  }
  .company-business-feature-row {
    flex-direction: column;
    gap: 28px;
  }
  .biz-feature-thumb-wrap {
    width: 100%;
    max-width: 100%;
  }
  .biz-thumb-img {
    height: 240px;
  }
  .company-bottom-media-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

@media (max-width: 768px) {
  .glance-heading-title {
    font-size: 34px;
  }
  .glance-top-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .glance-bottom-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .glance-stat-col:not(:last-child)::after {
    display: none;
  }
  .glance-stat-col {
    padding: 0;
  }
}
</style>
