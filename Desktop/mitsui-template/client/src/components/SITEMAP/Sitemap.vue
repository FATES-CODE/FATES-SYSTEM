<template>
  <SubPageLayout
    :category-title="sitemapContent.categoryTitle"
    :category-en="sitemapContent.categoryEn"
    :page-title="sitemapContent.pageTitle"
    :page-description="sitemapContent.desc"
    hero-image="/images/company/business-innovation.jpg"
  >
    <div class="mitsui-sitemap-wrap">
      <!-- 카테고리 섹션 반복 -->
      <div
        v-for="cat in sitemapContent.categories"
        :key="cat.id"
        class="sitemap-section"
      >
        <!-- 카테고리 대제목 -->
        <h2 class="sitemap-section-title">
          <router-link :to="cat.mainUrl">{{ cat.title }}</router-link>
        </h2>

        <!-- 링크 목록: 가로 인라인 ｜ 구분 -->
        <div class="sitemap-links-row">
          <template v-for="(link, lIdx) in cat.links" :key="lIdx">
            <router-link :to="link.url" class="sitemap-link">{{ link.name }}</router-link>
            <span v-if="lIdx < cat.links.length - 1" class="sitemap-separator">｜</span>
          </template>
        </div>
      </div>
    </div>
  </SubPageLayout>
</template>

<script setup>
import { computed } from 'vue';
import SubPageLayout from '../common/SubPageLayout.vue';
import { currentLang } from '../../composables/useLanguage.js';

const sitemapData = {
  ko: {
    categoryTitle: '사이트 안내',
    categoryEn: 'SITEMAP',
    pageTitle: '사이트맵',
    desc: 'AZAMINO 웹사이트의 전체 메뉴 및 사이트 구성을 한눈에 확인하실 수 있습니다.',
    categories: [
      {
        id: 'company',
        num: '01',
        title: '회사정보',
        en: 'Company Information',
        mainUrl: '/information',
        links: [
          { name: '회사정보 메인', url: '/information' },
          { name: '인사말', url: '/greeting' },
          { name: '경영이념', url: '/overview' }
        ]
      },
      {
        id: 'service',
        num: '02',
        title: '사업소개',
        en: 'Business Divisions',
        mainUrl: '/service',
        links: [
          { name: '사업소개 전체', url: '/service' },
          { name: '개호식품', url: '/food' },
          { name: '금고', url: '/money' },
          { name: '생활용품', url: '/product' },
          { name: '화학제품', url: '/chemical' }
        ]
      },
      {
        id: 'contact',
        num: '03',
        title: '연락처',
        en: 'Contact & Access',
        mainUrl: '/contact',
        links: [
          { name: '온라인 문의', url: '/quiry' },
          { name: '오시는 길 (본사 위치)', url: '/location' }
        ]
      },
      {
        id: 'legal',
        num: '04',
        title: '정책 및 약관',
        en: 'Legal & Policy',
        mainUrl: '/privacy',
        links: [
          { name: '이용약관', url: '/terms' },
          { name: '개인정보처리방침', url: '/privacy' },
          { name: '이메일무단수집거부', url: '/email-policy' }
        ]
      }
    ]
  },
  ja: {
    categoryTitle: 'サイト案内',
    categoryEn: 'SITEMAP',
    pageTitle: 'サイトマップ',
    desc: 'AZAMINOのウェブサイト構成および主要ページのご案内です。',
    categories: [
      {
        id: 'company',
        num: '01',
        title: '会社情報',
        en: 'Company Information',
        mainUrl: '/information',
        links: [
          { name: '会社情報トップ', url: '/information' },
          { name: 'ご挨拶', url: '/greeting' },
          { name: '企業理念', url: '/overview' }
        ]
      },
      {
        id: 'service',
        num: '02',
        title: '事業紹介',
        en: 'Business Divisions',
        mainUrl: '/service',
        links: [
          { name: '事業紹介トップ', url: '/service' },
          { name: '介護食品', url: '/food' },
          { name: '金庫', url: '/money' },
          { name: '生活用品', url: '/product' },
          { name: '化学製品', url: '/chemical' }
        ]
      },
      {
        id: 'contact',
        num: '03',
        title: 'お問い合わせ',
        en: 'Contact & Access',
        mainUrl: '/contact',
        links: [
          { name: 'オンラインお問い合わせ', url: '/quiry' },
          { name: 'アクセス（所在地案内）', url: '/location' }
        ]
      },
      {
        id: 'legal',
        num: '04',
        title: 'ポリシー・規約',
        en: 'Legal & Policy',
        mainUrl: '/privacy',
        links: [
          { name: '利用規約', url: '/terms' },
          { name: '個人情報保護方針', url: '/privacy' },
          { name: 'メールアドレス無断収集拒否', url: '/email-policy' }
        ]
      }
    ]
  },
  en: {
    categoryTitle: 'Site Information',
    categoryEn: 'SITEMAP',
    pageTitle: 'Sitemap',
    desc: 'An organized overview of all sections and pages on the AZAMINO website.',
    categories: [
      {
        id: 'company',
        num: '01',
        title: 'Company',
        en: 'Company Information',
        mainUrl: '/information',
        links: [
          { name: 'Company Info Top', url: '/information' },
          { name: 'CEO Message', url: '/greeting' },
          { name: 'Corporate Philosophy', url: '/overview' }
        ]
      },
      {
        id: 'service',
        num: '02',
        title: 'Business',
        en: 'Business Divisions',
        mainUrl: '/service',
        links: [
          { name: 'All Business Divisions', url: '/service' },
          { name: 'Care Food Solutions', url: '/food' },
          { name: 'Safes & Security', url: '/money' },
          { name: 'Living Goods', url: '/product' },
          { name: 'Advanced Chemicals', url: '/chemical' }
        ]
      },
      {
        id: 'contact',
        num: '03',
        title: 'Contact',
        en: 'Contact & Access',
        mainUrl: '/contact',
        links: [
          { name: 'Online Inquiry', url: '/quiry' },
          { name: 'Location & Head Office', url: '/location' }
        ]
      },
      {
        id: 'legal',
        num: '04',
        title: 'Legal & Policy',
        en: 'Legal & Policy',
        mainUrl: '/privacy',
        links: [
          { name: 'Terms of Use', url: '/terms' },
          { name: 'Privacy Policy', url: '/privacy' },
          { name: 'Email Collection Policy', url: '/email-policy' }
        ]
      }
    ]
  }
};

const sitemapContent = computed(() => {
  return sitemapData[currentLang.value] || sitemapData.ko;
});
</script>

<style scoped>
.mitsui-sitemap-wrap {
  max-width: 960px;
  margin: 0 auto;
  padding: 60px 20px 100px;
  font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
  color: #333;
}

/* ── 카테고리 섹션 ── */
.sitemap-section {
  padding: 40px 0 36px;
  border-bottom: 1px solid #ddd;
}

.sitemap-section:first-child {
  padding-top: 0;
}

.sitemap-section:last-child {
  border-bottom: none;
}

/* ── 대제목 ── */
.sitemap-section-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 24px;
  line-height: 1.3;
  color: #111;
}

.sitemap-section-title a {
  color: inherit;
  text-decoration: none;
}

.sitemap-section-title a:hover {
  text-decoration: underline;
}

/* ── 링크 가로 나열 ── */
.sitemap-links-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0;
  line-height: 2.2;
}

.sitemap-link {
  color: #555;
  text-decoration: underline;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
}

.sitemap-link:hover {
  color: #004098;
}

.sitemap-separator {
  color: #ccc;
  margin: 0 12px;
  font-size: 14px;
  user-select: none;
}

/* ── 모바일 ── */
@media (max-width: 768px) {
  .mitsui-sitemap-wrap {
    padding: 40px 16px 60px;
  }

  .sitemap-section {
    padding: 28px 0 24px;
  }

  .sitemap-section-title {
    font-size: 22px;
    margin-bottom: 16px;
  }

  .sitemap-links-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .sitemap-separator {
    display: none;
  }

  .sitemap-link {
    font-size: 14px;
  }
}
</style>
