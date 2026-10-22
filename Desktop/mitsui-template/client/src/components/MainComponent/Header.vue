<template>
  <header 
    class="mitsui-style-header" 
    :class="{ 
      'is-scrolled': isScrolled,
      'is-white-theme': isHeaderWhite,
      'has-active-dropdown': activeDropdown !== null,
      'is-mobile-open': isMobileMenuOpen
    }"
  >
    <div class="header-inner-container">
      <div class="header-logo-area">
        <router-link to="/" class="logo-link" title="AZAMINO" @click="handleLogoClick">
          <img 
            v-if="!isHeaderWhite"
            src="/images/Azamino-PNG-25.png"
            alt="AZAMINO Inc" 
            class="header-brand-logo"
            loading="eager"
            decoding="sync"
          />
          <img 
            v-else
            src="/images/logo.jpg" 
            alt="AZAMINO Inc" 
            class="header-brand-logo1"
            loading="eager"
            decoding="sync"
          />
        </router-link>
      </div>

      <button 
        class="header-mobile-toggle" 
        @click="isMobileMenuOpen = !isMobileMenuOpen" 
        aria-label="메뉴 열기/닫기"
      >
        <span class="hamburger-bar" :class="{ 'open': isMobileMenuOpen }"></span>
      </button>

      <nav class="header-main-nav" :class="{ 'mobile-open': isMobileMenuOpen }">
        <ul class="nav-menu-list">
          <li
            v-for="item in menuItems"
            :key="item.id"
            class="nav-menu-item"
            :class="{ 
              'has-dropdown': item.subItems && item.subItems.length > 0,
              'is-active-menu': isMenuActive(item),
              'is-menu-open': activeDropdown === item.id
            }"
            @click.stop="toggleMenu(item)"
          >
            <!-- 1. 하위 메뉴가 있는 경우: 클릭 시 메뉴 펼침 (페이지 이동하지 않음) -->
            <button
              v-if="item.subItems && item.subItems.length > 0"
              type="button"
              class="nav-item-link nav-item-btn"
              @click.stop="toggleMenu(item)"
            >
              <span class="nav-title-text">{{ item.title }}</span>
              <span 
                class="nav-plus-icon"
                :class="{ 'rotate': activeDropdown === item.id }"
              >+</span>
            </button>

            <!-- 2. 하위 메뉴가 없는 경우 (SITEMAP 등): 일반 링크 이동 -->
            <router-link 
              v-else
              :to="item.url" 
              class="nav-item-link" 
              @click="handleLinkClick"
            >
              <span class="nav-title-text">{{ item.title }}</span>
            </router-link>

            <!-- 모바일 아코디언 서브메뉴 -->
            <ul 
              v-if="isMobileMenuOpen && item.subItems && item.subItems.length > 0 && activeDropdown === item.id"
              class="mobile-sub-list"
            >
              <li v-for="(sub, sIdx) in item.subItems" :key="sIdx">
                <router-link :to="sub.url" @click="handleLinkClick">
                  {{ sub.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <!-- 3. 우측 언어 스위처 -->
      <div class="header-utility-group">
        <div class="mitsui-lang-box">
          <button 
            type="button" 
            class="lang-box-btn" 
            :class="{ 'is-active': currentLang === 'ja' }"
            @click="setLanguage('ja')"
          >
            JP
          </button>
          <button 
            type="button" 
            class="lang-box-btn" 
            :class="{ 'is-active': currentLang === 'en' }"
            @click="setLanguage('en')"
          >
            EN
          </button>
          <button 
            type="button" 
            class="lang-box-btn" 
            :class="{ 'is-active': currentLang === 'ko' }"
            @click="setLanguage('ko')"
          >
            KR
          </button>
        </div>
      </div>

      <div 
        v-if="activeMenuItem && activeMenuItem.subItems && activeMenuItem.subItems.length > 0"
        class="subpage-mega-menu-panel"
        @click.stop
      >
        <div class="mega-menu-content-wrap">
          <div class="mega-menu-left-title-box">
            <router-link :to="activeMenuItem.url" class="mega-category-title-link" @click="handleLinkClick">
              <h3 class="mega-category-title">{{ activeMenuItem.title }}</h3>
            </router-link>
            <span class="mega-category-sub">{{ getCategoryEn(activeMenuItem.id) }}</span>
          </div>

          <div v-if="activeMenuItem.id === 'company'" class="mega-menu-layout-company">
            <div class="mega-company-links">
              <!-- 1. 인사말 -->
              <div class="mega-company-item">
                <router-link to="/greeting" class="mega-menu-item-link" @click="handleLinkClick">
                  <span class="mega-item-name">{{ getSubItemName('company', '/greeting') }}</span>
                  <span class="mega-item-red-arrow">&gt;</span>
                </router-link>
                <a 
                  href="/downloads/company-brochure.pdf" 
                  download="AZAMINO_회사소개서.pdf" 
                  class="mega-brochure-download-link"
                  title="회사소개서 다운로드"
                >
                  <svg class="brochure-pdf-icon" viewBox="0 0 24 24" fill="#D32F2F">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v1.5h2c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-2v1.5zm6 4.5h-1.5v-6h1.5c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2zm-9-6v6H8v-2h1.5c.83 0 1.5-.67 1.5-1.5v-1c0-.83-.67-1.5-1.5-1.5H6.5z"/>
                  </svg>
                  <span>{{ getBrochureLabel() }}</span>
                  <span class="brochure-download-arrow">&darr;</span>
                </a>
              </div>

              <div class="mega-company-item">
                <router-link to="/overview" class="mega-menu-item-link" @click="handleLinkClick">
                  <span class="mega-item-name">{{ getSubItemName('company', '/overview') }}</span>
                  <span class="mega-item-red-arrow">&gt;</span>
                </router-link>
              </div>
            </div>

            <div class="mega-header-image-box">
              <router-link to="/information" @click="handleLinkClick" class="mega-img-link">
                <img 
                  src="/images/header/informationheaderimage2.jpg" 
                  alt="AZAMINO Company" 
                  class="mega-banner-img" 
                />
              </router-link>
            </div>
          </div>

          <div v-else-if="activeMenuItem.id === 'service'" class="mega-menu-layout-service">
            <div class="mega-service-cards-grid">
              <!-- 1. 개호식품 -->
              <router-link to="/food" class="mega-service-card" @click="handleLinkClick">
                <div class="mega-service-thumb">
                  <img src="/images/header/serviceheader1.jpg" alt="개호식품" />
                </div>
                <div class="mega-service-info">
                  <span class="mega-service-name">{{ getSubItemName('service', '/food') }}</span>
                  <span class="mega-item-red-arrow">&gt;</span>
                </div>
              </router-link>

              <!-- 2. 금고 -->
              <router-link to="/money" class="mega-service-card" @click="handleLinkClick">
                <div class="mega-service-thumb">
                  <img src="/images/header/serviceheader2.png" alt="금고" />
                </div>
                <div class="mega-service-info">
                  <span class="mega-service-name">{{ getSubItemName('service', '/money') }}</span>
                  <span class="mega-item-red-arrow">&gt;</span>
                </div>
              </router-link>

              <!-- 3. 생활용품 -->
              <router-link to="/product" class="mega-service-card" @click="handleLinkClick">
                <div class="mega-service-thumb">
                  <img src="/images/header/serviceheader4.jpg" alt="생활용품" />
                </div>
                <div class="mega-service-info">
                  <span class="mega-service-name">{{ getSubItemName('service', '/product') }}</span>
                  <span class="mega-item-red-arrow">&gt;</span>
                </div>
              </router-link>

              <!-- 4. 화학제품 -->
              <router-link to="/chemical" class="mega-service-card" @click="handleLinkClick">
                <div class="mega-service-thumb">
                  <img src="/images/header/serviceheader3.png" alt="화학제품" />
                </div>
                <div class="mega-service-info">
                  <span class="mega-service-name">{{ getSubItemName('service', '/chemical') }}</span>
                  <span class="mega-item-red-arrow">&gt;</span>
                </div>
              </router-link>
            </div>
          </div>

          <!-- C. 연락처 카테고리 (contactheaderimage) -->
          <div v-else-if="activeMenuItem.id === 'contact'" class="mega-menu-layout-contact">
            <div class="mega-contact-links">
              <router-link to="/quiry" class="mega-menu-item-link" @click="handleLinkClick">
                <span class="mega-item-name">{{ getSubItemName('contact', '/quiry') }}</span>
                <span class="mega-item-red-arrow">&gt;</span>
              </router-link>
              <router-link to="/location" class="mega-menu-item-link" @click="handleLinkClick">
                <span class="mega-item-name">{{ getSubItemName('contact', '/location') }}</span>
                <span class="mega-item-red-arrow">&gt;</span>
              </router-link>
            </div>

            <div class="mega-header-image-box">
              <router-link to="/contact" @click="handleLinkClick" class="mega-img-link">
                <img 
                  src="/images/header/contactheaderimage.jpg" 
                  alt="AZAMINO Contact" 
                  class="mega-banner-img" 
                />
              </router-link>
            </div>
          </div>

          <!-- 기타 기본 그리드 -->
          <div v-else class="mega-menu-right-grid">
            <router-link
              v-for="(sub, sIdx) in activeMenuItem.subItems"
              :key="sIdx"
              :to="sub.url"
              class="mega-menu-item-link"
              @click="handleLinkClick"
            >
              <span class="mega-item-name">{{ sub.name }}</span>
              <span class="mega-item-red-arrow">&gt;</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { currentLang, setLanguage } from '../../composables/useLanguage.js';

const props = defineProps({
  languages: {
    type: Array,
    default: () => [
      { code: 'ko', name: 'kor', url: '/kr' },
      { code: 'ja', name: 'jpn',  url: '/jp' },
      { code: 'en', name: 'eng',  url: '/en' }
    ]
  },
  menuItems: {
    type: Array,
    default: () => []
  }
});

const route = useRoute();
const router = useRouter();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeDropdown = ref(null);

const isHeaderWhite = computed(() => {
  return isScrolled.value || activeDropdown.value !== null;
});

const activeMenuItem = computed(() => {
  if (!activeDropdown.value) return null;
  return props.menuItems.find(item => item.id === activeDropdown.value) || null;
});

const getCategoryEn = (id) => {
  const enMap = {
    company: 'COMPANY INFO',
    service: 'BUSINESS DIVISIONS',
    contact: 'CONTACT US'
  };
  return enMap[id] || '';
};

const getBrochureLabel = () => {
  if (currentLang.value === 'ja') return '会社紹介書ダウンロード (PDF)';
  if (currentLang.value === 'en') return 'Company Brochure (PDF)';
  return '회사소개서 다운로드 (PDF)';
};

const getSubItemName = (catId, url) => {
  const item = props.menuItems.find(m => m.id === catId);
  if (item && item.subItems) {
    const sub = item.subItems.find(s => s.url === url);
    if (sub) return sub.name;
  }
  const fallback = {
    '/greeting': currentLang.value === 'ja' ? 'ご挨拶' : (currentLang.value === 'en' ? 'Greeting' : '인사말'),
    '/overview': currentLang.value === 'ja' ? '企業理念' : (currentLang.value === 'en' ? 'Corporate Philosophy' : '경영이념'),
    '/food': currentLang.value === 'ja' ? '介護食品' : (currentLang.value === 'en' ? 'Care Food' : '개호식품'),
    '/money': currentLang.value === 'ja' ? '金庫' : (currentLang.value === 'en' ? 'Safes' : '금고'),
    '/product': currentLang.value === 'ja' ? '生活用品' : (currentLang.value === 'en' ? 'Living Goods' : '생활용품'),
    '/chemical': currentLang.value === 'ja' ? '化学製品' : (currentLang.value === 'en' ? 'Chemicals' : '화학제품'),
    '/quiry': currentLang.value === 'ja' ? 'オンラインお問い合わせ' : (currentLang.value === 'en' ? 'Online Inquiry' : '온라인 문의'),
    '/location': currentLang.value === 'ja' ? 'アクセス' : (currentLang.value === 'en' ? 'Location & Access' : '오시는 길')
  };
  return fallback[url] || '';
};

const isMenuActive = (item) => {
  if (route.path === item.url) return true;
  if (item.subItems && item.subItems.some(sub => sub.url === route.path)) return true;
  if (item.id === 'company' && ['/company', '/information', '/greeting', '/overview', '/history', '/ci', '/idea', '/philosophy'].includes(route.path)) return true;
  if (item.id === 'service' && ['/service', '/business', '/food', '/money', '/product', '/chemical'].includes(route.path)) return true;
  if (item.id === 'contact' && ['/contact', '/quiry', '/location'].includes(route.path)) return true;
  return false;
};

const toggleMenu = (item) => {
  if (item.subItems && item.subItems.length > 0) {
    activeDropdown.value = (activeDropdown.value === item.id) ? null : item.id;
  } else {
    activeDropdown.value = null;
    isMobileMenuOpen.value = false;
    if (item.url && item.url !== route.path) {
      router.push(item.url);
    }
  }
};

const handleLogoClick = () => {
  activeDropdown.value = null;
  isMobileMenuOpen.value = false;
};

const handleLinkClick = () => {
  activeDropdown.value = null;
  isMobileMenuOpen.value = false;
};

const handleScroll = () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  // 20px 이상 스크롤 시 하얀색 네모난 헤더 박스 나타남
  isScrolled.value = scrollY > 20;
};

// 외부 클릭 시 메뉴 닫기
const onDocumentClick = (e) => {
  const headerEl = document.querySelector('.mitsui-style-header');
  if (headerEl && !headerEl.contains(e.target)) {
    activeDropdown.value = null;
  }
};

watch(() => route.path, () => {
  activeDropdown.value = null;
  isMobileMenuOpen.value = false;
  handleScroll();
});

onMounted(() => {
  try {
    const saved = localStorage.getItem('site_lang');
    if (saved) {
      currentLang.value = saved;
    }
  } catch (e) {}
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('click', onDocumentClick);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', onDocumentClick);
});
</script>

<style scoped>
.mitsui-style-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1000;
  background: transparent !important;
  border: none;
  box-shadow: none;
  pointer-events: none;
  padding: 18px 0;
  box-sizing: border-box;
  font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
  transition: padding 0.25s ease;
}

.header-inner-container {
  pointer-events: auto;
  position: relative;
  width: calc(100% - 64px);
  max-width: 2400px;
  height: 90px;
  margin: 0 auto;
  padding: 0 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: transparent;
  border: 1px solid transparent;
  box-shadow: none;
  transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.mitsui-style-header.is-white-theme .header-inner-container {
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
}

.mitsui-style-header.has-active-dropdown .header-inner-container {
  border-radius: 6px 6px 0 0;
  border-bottom-color: transparent;
}

.header-logo-area {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.header-brand-logo1 {
  height: 50px;
  max-height: 100px;
  width: auto;
  object-fit: contain;
  display: block;
}


.header-brand-logo {
  height: 148px;
  max-height: 100px;
  width: auto;
  object-fit: contain;
  display: block;
}

.header-main-nav {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
  margin-right: 36px;
}

.nav-menu-list {
  display: flex;
  align-items: center;
  gap: 36px;
  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;
}

.nav-menu-item {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-item-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  padding: 6px 4px;
  cursor: pointer;
  box-sizing: border-box;
  background: transparent;
  border: none;
  font-family: inherit;
  line-height: inherit;
  outline: none;
  /* 기본 (투명 헤더): 화이트 텍스트 */
  color: #ffffff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  transition: color 0.15s ease;
}

.nav-item-btn {
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  line-height: inherit;
}

/* 화이트 테마 상태 (스크롤 후) GNB 텍스트 */
.mitsui-style-header.is-white-theme .nav-item-link {
  color: #111827;
  text-shadow: none;
}

.mitsui-style-header.is-white-theme .nav-item-link:hover {
  color: #000000;
  opacity: 0.75;
}

/* 플러스 기호 (+) */
.nav-plus-icon {
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  color: rgba(255, 255, 255, 0.85);
  display: inline-block;
  margin-left: 2px;
  transition: transform 0.2s ease;
}

.mitsui-style-header.is-white-theme .nav-plus-icon {
  color: #6b7280;
}

.nav-plus-icon.rotate {
  transform: rotate(45deg);
  color: #111827;
}


.mitsui-style-header:not(.is-white-theme) .nav-menu-item.is-active-menu .nav-item-link {
  border: 1px solid rgba(255, 255, 255, 0.7);
  padding: 6px 12px;
  border-radius: 0;
}

.header-utility-group {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.mitsui-lang-box {
  display: inline-flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
  padding: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  transition: all 0.25s ease;
}

.mitsui-style-header.is-white-theme .mitsui-lang-box {
  background: #f3f4f6;
  border-color: #d1d5db;
  box-shadow: none;
}

.lang-box-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 6px 12px;
  cursor: pointer;
  line-height: 1;
  border-radius: 3px;
  transition: all 0.15s ease;
}

.mitsui-style-header.is-white-theme .lang-box-btn {
  color: #4b5563;
}

.lang-box-btn.is-active {
  background: #ffffff;
  color: #111827;
  font-weight: 800;
}

.mitsui-style-header.is-white-theme .lang-box-btn.is-active {
  background: #111827;
  color: #ffffff;
}

/* ==========================================================================
   와이드 메가 메뉴 패널 (효과 없이 즉시 표시)
   ========================================================================== */
.subpage-mega-menu-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-top: 1px solid #f1f5f9;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
  padding: 38px 52px 42px;
  z-index: 1001;
  pointer-events: auto;
  box-sizing: border-box;
}

.mega-menu-content-wrap {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 48px;
  align-items: start;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.mega-menu-left-title-box {
  padding-top: 4px;
}

.mega-category-title-link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
}

.mega-category-title-link:hover .mega-category-title {
  color: #111827;
  opacity: 0.8;
}

.mega-category-title {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  line-height: 1.3;
  transition: color 0.15s ease;
}

.mega-category-sub {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #9ca3af;
  margin-top: 4px;
}

/* ==========================================================================
   A. 회사정보 메가메뉴 레이아웃
   ========================================================================== */
.mega-menu-layout-company {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 40px;
  align-items: start;
}

.mega-company-links {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.mega-company-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mega-brochure-download-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  color: #1e293b;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  width: fit-content;
  margin-left: 8px;
  margin-top: 4px;
  transition: all 0.2s ease;
}

.mega-brochure-download-link:hover {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
  color: #111827;
  transform: translateY(-1px);
}

.brochure-pdf-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.brochure-download-arrow {
  color: #64748b;
  font-weight: 800;
}

/* 우측 배너 이미지 공통 */
.mega-header-image-box {
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.mega-img-link {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.mega-banner-img {
  width: 100%;
  height: 190px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.mega-img-link:hover .mega-banner-img {
  transform: scale(1.03);
}

/* ==========================================================================
   B. 사업소개 메가메뉴 레이아웃 (4열 serviceheader 1,2,3,4)
   ========================================================================== */
.mega-menu-layout-service {
  width: 100%;
}

.mega-service-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.mega-service-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.2s ease;
}

.mega-service-card:hover {
  border-color: #94a3b8;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-3px);
}

.mega-service-thumb {
  width: 100%;
  height: 125px;
  background-color: #f8fafc;
  overflow: hidden;
}

.mega-service-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.mega-service-card:hover .mega-service-thumb img {
  transform: scale(1.05);
}

.mega-service-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background-color: #ffffff;
}

.mega-service-name {
  font-size: 14.5px;
  font-weight: 700;
  color: #111827;
}

.mega-service-card:hover .mega-service-name {
  color: #000000;
}

/* ==========================================================================
   C. 연락처 메가메뉴 레이아웃 (contactheaderimage)
   ========================================================================== */
.mega-menu-layout-contact {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 40px;
  align-items: start;
}

.mega-contact-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mega-menu-right-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px 36px;
}

.mega-menu-item-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 2px 12px;
  border-bottom: 1px solid #e5e7eb;
  text-decoration: none;
  transition: border-color 0.15s ease;
}

.mega-item-name {
  font-size: 14.5px;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: -0.01em;
  line-height: 1.4;
  transition: color 0.15s ease;
  word-break: keep-all;
}

.mega-item-red-arrow {
  font-size: 14px;
  font-weight: 800;
  color: #dc2626;
  margin-left: 12px;
  flex-shrink: 0;
}

.mega-menu-item-link:hover {
  border-bottom-color: #94a3b8;
}

.mega-menu-item-link:hover .mega-item-name {
  color: #000000;
  text-decoration: underline;
}

/* ==========================================================================
   모바일 햄버거 토글 & 반응형
   ========================================================================== */
.header-mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;
  position: relative;
}

.hamburger-bar {
  display: block;
  width: 22px;
  height: 2px;
  background: #ffffff;
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  transition: all 0.25s ease;
}

.mitsui-style-header.is-white-theme .hamburger-bar,
.mitsui-style-header.is-white-theme .hamburger-bar::before,
.mitsui-style-header.is-white-theme .hamburger-bar::after {
  background: #111827;
}

.hamburger-bar::before,
.hamburger-bar::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 2px;
  background: inherit;
  transition: all 0.25s ease;
}

.hamburger-bar::before { top: -6px; }
.hamburger-bar::after { top: 6px; }

.hamburger-bar.open {
  background: transparent !important;
}

.hamburger-bar.open::before {
  top: 0;
  transform: rotate(45deg);
}

.hamburger-bar.open::after {
  top: 0;
  transform: rotate(-45deg);
}

.mobile-sub-list {
  display: none;
}

@media (max-width: 1024px) {
  .mitsui-style-header {
    padding: 10px 0;
  }
  .header-inner-container {
    width: calc(100% - 24px);
    height: 70px;
    padding: 0 20px;
    background-color: #ffffff !important;
    border: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
  }
  .header-mobile-toggle {
    display: block;
    order: 3;
    margin-left: 14px;
  }
  .header-utility-group {
    order: 2;
    margin-left: auto;
  }
  .header-main-nav {
    display: none;
    position: fixed;
    top: 90px;
    left: 12px;
    right: 12px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
    padding: 20px;
    margin: 0;
    z-index: 1050;
  }
  .header-main-nav.mobile-open {
    display: block;
  }
  .nav-menu-list {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    height: auto;
  }
  .nav-menu-item {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    height: auto;
  }
  .nav-item-link {
    width: 100%;
    justify-content: space-between;
    color: #111827 !important;
    text-shadow: none !important;
    padding: 10px 0;
  }
  .nav-plus-icon {
    color: #6b7280 !important;
  }
  .mobile-sub-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 0 8px 16px;
    list-style: none;
    margin: 0;
    width: 100%;
  }
  .mobile-sub-list li a {
    color: #4b5563;
    font-size: 14px;
    text-decoration: none;
  }
  .subpage-mega-menu-panel {
    display: none;
  }
}
</style>
