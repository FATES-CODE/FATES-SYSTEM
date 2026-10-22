<template>
  <footer class="site-footer">
    <div class="container footer-container">
      <!-- 1. 상단 섹션: 좌측 대형 슬로건 + 우측 4열 사이트 내비게이션 -->
      <div class="footer-top-section">
        <!-- 좌측: 브랜드 슬로건 (네모 박스 영역) -->
        <div class="footer-brand-slogan-wrap">
          <div class="footer-slogan-box">
            <span class="footer-slogan-tag">Innovation</span>
            <h2 class="footer-slogan-text">{{ footerContent.slogan }}</h2>
            <p class="footer-slogan-sub">{{ footerContent.sloganSub }}</p>
          </div>
        </div>

        <!-- 우측: 4개 대분류 내비게이션 컬럼 (크기 확대) -->
        <div class="footer-nav-columns">
          <!-- 1. 회사정보 컬럼 -->
          <div class="footer-col">
            <h3 class="footer-col-title">
              <router-link to="/information">{{ footerContent.cols.company.title }}</router-link>
            </h3>
            <ul class="footer-col-list">
              <li v-for="item in footerContent.cols.company.links" :key="item.name">
                <router-link :to="item.url">{{ item.name }}</router-link>
              </li>
            </ul>
          </div>

          <!-- 2. 사업소개 컬럼 -->
          <div class="footer-col">
            <h3 class="footer-col-title">
              <router-link to="/service">{{ footerContent.cols.service.title }}</router-link>
            </h3>
            <ul class="footer-col-list">
              <li v-for="item in footerContent.cols.service.links" :key="item.name">
                <router-link :to="item.url">{{ item.name }}</router-link>
              </li>
            </ul>
          </div>

          <!-- 3. 연락처 컬럼 -->
          <div class="footer-col">
            <h3 class="footer-col-title">
              <router-link to="/contact">{{ footerContent.cols.contact.title }}</router-link>
            </h3>
            <ul class="footer-col-list">
              <li v-for="item in footerContent.cols.contact.links" :key="item.name">
                <router-link :to="item.url">{{ item.name }}</router-link>
              </li>
            </ul>
          </div>

          <!-- 4. 사이트맵 독립 컬럼 -->
          <div class="footer-col footer-col-sitemap">
            <h3 class="footer-col-title">
              <router-link to="/sitemap">{{ footerContent.cols.sitemap.title }}</router-link>
            </h3>
          </div>
        </div>
      </div>

      <!-- 구분선 -->
      <div class="footer-divider-line"></div>

      <!-- 2. 하단 한 줄 바: [로고 + 법적 정책 링크] ====== [별표 위치: COPYRIGHT] -->
      <div class="footer-bottom-bar">
        <div class="footer-bottom-left">
          <!-- 로고 -->
          <router-link to="/" class="footer-bottom-logo" title="AZAMINO 메인으로">
            <img src="/images/logo.jpg" alt="AZAMINO Inc" class="footer-logo-img" />
          </router-link>

          <!-- 법적 링크 (이용약관, 개인정보처리방침, 이메일무단수집거부) -->
          <div class="footer-legal-links">
            <router-link to="/terms">{{ footerContent.legal.terms }}</router-link>
            <span class="legal-sep">｜</span>
            <router-link to="/privacy">{{ footerContent.legal.privacy }}</router-link>
            <span class="legal-sep">｜</span>
            <router-link to="/email-policy">{{ footerContent.legal.email }}</router-link>
          </div>
        </div>

        <!-- 우측 끝: COPYRIGHT (별표 위치에 줄 맞춰 배치) -->
        <div class="footer-bottom-right">
          <p class="footer-copyright-text">
            COPYRIGHT &copy; {{ currentYear }} AZAMINO Inc. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { currentLang } from '../../composables/useLanguage.js';

const currentYear = ref(new Date().getFullYear());

const footerData = {
  ko: {
    slogan: '미래를 일상으로,\n혁신을 표준으로',
    sloganSub: '사람과 기술, 세계를 연결하여 풍요로운 내일을 열어갑니다.',
    legal: {
      terms: '이용약관',
      privacy: '개인정보처리방침',
      email: '이메일무단수집거부'
    },
    cols: {
      company: {
        title: '회사정보',
        links: [
          { name: '인사말', url: '/greeting' },
          { name: '경영이념', url: '/overview' }
        ]
      },
      service: {
        title: '사업소개',
        links: [
          { name: '개호식품', url: '/food' },
          { name: '금고', url: '/money' },
          { name: '생활용품', url: '/product' },
          { name: '화학제품', url: '/chemical' }
        ]
      },
      contact: {
        title: '연락처',
        links: [
          { name: '온라인 문의', url: '/quiry' },
          { name: '오시는 길', url: '/location' }
        ]
      },
      sitemap: {
        title: 'SITEMAP'
      }
    }
  },
  ja: {
    slogan: '未来を日常に、\n革新を標準に',
    sloganSub: '人と技術、世界をつなぎ、豊かな明日を切り拓きます。',
    legal: {
      terms: '利用規約',
      privacy: '個人情報保護方針',
      email: 'メールアドレス無断収集拒否'
    },
    cols: {
      company: {
        title: '会社情報',
        links: [
          { name: 'ご挨拶', url: '/greeting' },
          { name: '企業理念', url: '/overview' }
        ]
      },
      service: {
        title: '事業紹介',
        links: [
          { name: '介護食品', url: '/food' },
          { name: '金庫', url: '/money' },
          { name: '生活用品', url: '/product' },
          { name: '化学製品', url: '/chemical' }
        ]
      },
      contact: {
        title: 'お問い合わせ',
        links: [
          { name: 'オンラインお問い合わせ', url: '/quiry' },
          { name: 'アクセス', url: '/location' }
        ]
      },
      sitemap: {
        title: 'サイトマップ'
      }
    }
  },
  en: {
    slogan: 'Bringing the future into everyday life,\nmaking innovation the standard',
    sloganSub: 'Connecting people, technology, and global networks for a prosperous tomorrow.',
    legal: {
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
      email: 'Email Policy'
    },
    cols: {
      company: {
        title: 'Company',
        links: [
          { name: 'CEO Message', url: '/greeting' },
          { name: 'Corporate Philosophy', url: '/overview' }
        ]
      },
      service: {
        title: 'Business',
        links: [
          { name: 'Care Food', url: '/food' },
          { name: 'Safes', url: '/money' },
          { name: 'Living Goods', url: '/product' },
          { name: 'Chemicals', url: '/chemical' }
        ]
      },
      contact: {
        title: 'Contact',
        links: [
          { name: 'Online Inquiry', url: '/quiry' },
          { name: 'Location & Access', url: '/location' }
        ]
      },
      sitemap: {
        title: 'SITEMAP'
      }
    }
  }
};

const footerContent = computed(() => {
  return footerData[currentLang.value] || footerData.ja;
});
</script>

<style scoped>
.site-footer {
  background-color: #ffffff;
  color: #374151;
  padding: 85px 0 55px;
  border-top: 1px solid #e5e7eb;
  font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
  box-sizing: border-box;
}

.footer-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 44px;
  box-sizing: border-box;
}

/* ==========================================================================
   1. 상단 섹션: 좌측 대형 슬로건 + 우측 4열 컬럼
   ========================================================================== */
.footer-top-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 80px;
  margin-bottom: 60px;
}

/* 좌측 슬로건 (네모 영역) */
.footer-brand-slogan-wrap {
  flex: 0 0 420px;
  max-width: 480px;
}

.footer-slogan-tag {
  display: inline-block;
  font-size: 40px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: black;
  margin-bottom: 14px;
  text-transform: uppercase;
}

.footer-slogan-text {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  line-height: 1.35;
  letter-spacing: -0.02em;
  margin: 0 0 16px;
  white-space: pre-line;
}

.footer-slogan-sub {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.7;
  margin: 0;
  word-break: keep-all;
}

/* 우측 4열 내비게이션 컬럼 */
.footer-nav-columns {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
}

.footer-col-title {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #111827;
  letter-spacing: 0.02em;
}

.footer-col-title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer-col-title a:hover {
  color: #004098;
}

.footer-col-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.footer-col-list li a {
  color: #4b5563;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s ease, transform 0.15s ease;
  display: inline-block;
}

.footer-col-list li a:hover {
  color: #004098;
  transform: translateX(2px);
}

/* 구분선 */
.footer-divider-line {
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin-bottom: 32px;
}

/* ==========================================================================
   2. 하단 한 줄 바: 로고 + 법적 정책 링크 | COPYRIGHT (별표 위치)
   ========================================================================== */
.footer-bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.footer-bottom-left {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}

.footer-bottom-logo {
  display: inline-flex;
  align-items: center;
}

.footer-logo-img {
  height: 44px;
  width: auto;
  object-fit: contain;
  display: block;
}

.footer-legal-links {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.footer-legal-links a {
  color: #4b5563;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer-legal-links a:hover {
  color: #004098;
  text-decoration: underline;
}

.legal-sep {
  color: #cbd5e1;
  font-size: 13px;
  user-select: none;
}

/* 우측 끝: COPYRIGHT (별표 위치) */
.footer-bottom-right {
  display: flex;
  align-items: center;
}

.footer-copyright-text {
  font-size: 13.5px;
  color: #6b7280;
  font-weight: 500;
  letter-spacing: 0.03em;
  margin: 0;
  white-space: nowrap;
}

/* ==========================================================================
   반응형 모바일 미디어 쿼리
   ========================================================================== */
@media (max-width: 1100px) {
  .footer-top-section {
    flex-direction: column;
    gap: 48px;
  }
  .footer-brand-slogan-wrap {
    flex: none;
    max-width: 100%;
  }
  .footer-nav-columns {
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
  }
}

@media (max-width: 768px) {
  .site-footer {
    padding: 60px 0 40px;
  }
  .footer-container {
    padding: 0 20px;
  }
  .footer-slogan-text {
    font-size: 24px;
  }
  .footer-nav-columns {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 20px;
  }
  .footer-bottom-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .footer-bottom-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .footer-copyright-text {
    font-size: 12px;
  }
}
</style>
