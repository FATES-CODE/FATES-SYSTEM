<template>
  <SubPageLayout
    :category-title="currentContent.categoryTitle"
    :category-en="currentContent.categoryEn"
    :category-url="currentContent.categoryUrl"
    :page-title="currentContent.pageTitle"
    hero-image="/images/tokyo-tower-bg.jpg"
    :tabs="currentContent.tabs"
  >
    <div class="company-index-page">
      <!-- 1. 상단 인트로 요약 문단 -->
      <div class="company-intro-box">
        <p class="company-intro-text">
          {{ currentContent.introText }}
        </p>
      </div>

      <!-- 2. 연락처 카드 2열 그리드 -->
      <div class="company-cards-grid">
        <article 
          v-for="card in currentContent.cards" 
          :key="card.title" 
          class="company-feature-card"
        >
          <router-link :to="card.url" class="card-inner-link">
            <!-- 썸네일 이미지 -->
            <div class="card-thumb-wrap">
              <img :src="card.image" :alt="card.title" class="card-thumb-img" />
            </div>

            <!-- 카드 텍스트 정보 -->
            <div class="card-content-wrap">
              <h3 class="card-main-title">{{ card.title }}</h3>
              <p class="card-description">{{ card.desc }}</p>
            </div>
          </router-link>
        </article>
      </div>
    </div>
  </SubPageLayout>
</template>

<script setup>
import { computed } from 'vue';
import SubPageLayout from '../common/SubPageLayout.vue';
import { currentLang, setLanguage } from '../../composables/useLanguage.js';

const langData = {
  ko: {
    categoryTitle: '연락처',
    categoryEn: 'CONTACT US',
    categoryUrl: '/contact',
    pageTitle: '연락처',
    tabs: [
      { name: '문의사항', url: '/quiry' },
      { name: '오시는길', url: '/location' }
    ],
    introText: '아자미노에 관심을 가져주셔서 감사합니다. 비즈니스 제휴 및 제품 문의사항이 있으시면 언제든지 편하게 문의해 주시기 바랍니다.',
    cards: [
      {
        title: '온라인 문의',
        desc: '개호식품, 금고, 생활용품, 화학제품 등 비즈니스 제휴 및 제품에 관한 문의를 남겨주시면 신속히 답변해 드립니다.',
        image: '/images/card/main-card-3.png',
        url: '/quiry'
      },
      {
        title: '오시는 길',
        desc: '아자미노 본사 및 글로벌 비즈니스 거점의 상세 위치와 교통편 안내입니다.',
        image: '/images/company/company-location.jpg',
        url: '/location'
      }
    ]
  },
  ja: {
    categoryTitle: 'お問い合わせ',
    categoryEn: 'CONTACT US',
    categoryUrl: '/contact',
    pageTitle: 'お問い合わせ',
    tabs: [
      { name: 'お問い合わせ', url: '/quiry' },
      { name: 'アクセス', url: '/location' }
    ],
    introText: 'アザミノに関心をお寄せいただき、誠にありがとうございます。ビジネス提携や製品に関するお問い合わせがございましたら、お気軽にご連絡ください。',
    cards: [
      {
        title: 'お問い合わせ',
        desc: '介護食品、金庫、生活用品、化学品など、各種ビジネス提携や製品に関するご相談を承っております。',
        image: '/images/card/main-card-3.png',
        url: '/quiry'
      },
      {
        title: '拠点',
        desc: '本社およびグローバルビジネス拠点の所在地・交通アクセスをご案内いたします。',
        image: '/images/company/company-location.jpg',
        url: '/location'
      }
    ]
  },
  en: {
    categoryTitle: 'Contact Us',
    categoryEn: 'CONTACT US',
    categoryUrl: '/contact',
    pageTitle: 'Contact Us',
    tabs: [
      { name: 'Inquiry', url: '/quiry' },
      { name: 'Location', url: '/location' }
    ],
    introText: 'Thank you for your interest in AZAMINO. Please feel free to reach out to us regarding business partnerships and product inquiries.',
    cards: [
      {
        title: 'Inquiry',
        desc: 'Leave an inquiry regarding our senior care food, security safes, lifestyle goods, or chemical supplies.',
        image: '/images/card/main-card-3.png',
        url: '/quiry'
      },
      {
        title: 'Locations',
        desc: 'Information about our headquarters location, contact details, and global office presences.',
        image: '/images/company/company-location.jpg',
        url: '/location'
      }
    ]
  }
};

const currentContent = computed(() => {
  return langData[currentLang.value] || langData.ja;
});

const switchLang = (code) => {
  setLanguage(code);
};
</script>
