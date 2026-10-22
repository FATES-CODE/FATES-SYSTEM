<template>
  <div class="app-layout">
    <Header
      :languages="navData.languages"
      :menu-items="currentMainMenu"
    />
    <main class="app-main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Header from './components/MainComponent/Header.vue';
import Footer from './components/MainComponent/Footer.vue';
import { currentLang } from './composables/useLanguage.js';

const navData = ref({
  languages: [
    { code: 'ko', name: 'kor', url: '/kr' },
    { code: 'en', name: 'eng', url: '/en' },
    { code: 'ja', name: 'jpn', url: '/jp' }
  ]
});

// 한국어 메뉴 기준으로 1:1 완벽 통일된 3개 국어 메뉴 데이터
const menusByLang = {
  ko: [
    { 
      id: 'company', 
      title: '회사정보', 
      url: '/information', 
      subItems: [
        { name: '인사말', url: '/greeting' },
        { name: '경영이념', url: '/overview' }
      ] 
    },
    { 
      id: 'service', 
      title: '사업소개', 
      url: '/service', 
      subItems: [
        { name: '개호식품', url: '/food' },
        { name: '금고', url: '/money' },
        { name: '생활용품', url: '/product' },
        { name: '화학제품', url: '/chemical' }
      ] 
    },
    { 
      id: 'contact', 
      title: '연락처', 
      url: '/contact', 
      subItems: [
        { name: '온라인 문의', url: '/quiry' },
        { name: '오시는 길', url: '/location' }
      ]
    },
    { 
      id: 'presence', 
      title: 'SITEMAP', 
      url: '/sitemap', 
      subItems: [] 
    }
  ],
  ja: [
    { 
      id: 'company', 
      title: '会社情報', 
      url: '/information', 
      subItems: [
        { name: 'ご挨拶', url: '/greeting' },
        { name: '企業理念', url: '/overview' }
      ] 
    },
    { 
      id: 'service', 
      title: '事業紹介', 
      url: '/service', 
      subItems: [
        { name: '介護食品', url: '/food' },
        { name: '金庫', url: '/money' },
        { name: '生活用品', url: '/product' },
        { name: '化学製品', url: '/chemical' }
      ] 
    },
    { 
      id: 'contact', 
      title: 'お問い合わせ', 
      url: '/contact', 
      subItems: [
        { name: 'オンラインお問い合わせ', url: '/quiry' },
        { name: 'アクセス', url: '/location' }
      ]
    },
    { 
      id: 'presence', 
      title: 'SITEMAP', 
      url: '/sitemap', 
      subItems: [] 
    }
  ],
  en: [
    { 
      id: 'company', 
      title: 'Company', 
      url: '/information', 
      subItems: [
        { name: 'CEO Message', url: '/greeting' },
        { name: 'Corporate Philosophy', url: '/overview' }
      ] 
    },
    { 
      id: 'service', 
      title: 'Business', 
      url: '/service', 
      subItems: [
        { name: 'Care Food', url: '/food' },
        { name: 'Safes', url: '/money' },
        { name: 'Living Goods', url: '/product' },
        { name: 'Chemicals', url: '/chemical' }
      ] 
    },
    { 
      id: 'contact', 
      title: 'Contact', 
      url: '/contact', 
      subItems: [
        { name: 'Online Inquiry', url: '/quiry' },
        { name: 'Location & Access', url: '/location' }
      ]
    },
    { 
      id: 'presence', 
      title: 'SITEMAP', 
      url: '/sitemap', 
      subItems: [] 
    }
  ]
};

const currentMainMenu = computed(() => {
  return menusByLang[currentLang.value] || menusByLang.ja;
});
</script>

<style>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main-content {
  flex: 1;
}
</style>
