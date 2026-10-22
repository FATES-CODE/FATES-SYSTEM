<template>
  <SubPageLayout
    :category-title="content.banner.categoryTitle"
    :category-en="content.banner.categoryEn"
    category-url="/contact"
    :page-title="content.banner.pageTitle"
    :page-description="content.banner.pageDescription"
    hero-image="/images/main/slide-main-tokyo.jpg"
    :tabs="contactTabs"
  >
    <div class="location-page">
      <div class="company-lang-toggle-wrap">

      </div>

      <div class="sub-headline-box">
        <h2 class="sub-main-title">{{ content.office.title }}</h2>
        <div class="sub-title-bar"></div>
        <p class="section-intro">
          {{ content.office.intro }}
        </p>
      </div>
      <div class="location-map-wrap">

      </div>

      <section class="section-block">
        <h3 class="section-sub-title">{{ content.tableSectionTitle }}</h3>
        <div class="profile-table-wrap">
          <table class="mitsui-style-table">
            <tbody>
              <tr v-for="row in content.tableRows" :key="row.th">
                <th scope="row" style="width: 24%;">{{ row.th }}</th>
                <td>{{ row.td }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>


    </div>
  </SubPageLayout>
</template>

<script setup>
import { computed } from 'vue';
import SubPageLayout from '../common/SubPageLayout.vue';
import { currentLang, setLanguage } from '../../composables/useLanguage.js';

const switchLang = (code) => {
  setLanguage(code);
};

const contactTabs = computed(() => {
  if (currentLang.value === 'ja') {
    return [
      { name: 'お問い合わせ', url: '/quiry' },
      { name: 'アクセス', url: '/location' }
    ];
  } else if (currentLang.value === 'en') {
    return [
      { name: 'Inquiry', url: '/quiry' },
      { name: 'Location', url: '/location' }
    ];
  }
  return [
    { name: '문의사항', url: '/quiry' },
    { name: '오시는길', url: '/location' }
  ];
});

const mapEmbedUrl = 'https://maps.google.com/maps?q=35.633931,139.691578&t=&z=17&ie=UTF8&iwloc=&output=embed';
const mapExternalUrl = 'https://www.google.com/maps/search/?api=1&query=35.633931,139.691578';

const locationData = {
  ko: {
    banner: {
      categoryTitle: '연락처',
      categoryEn: 'CONTACT US',
      pageTitle: '오시는길',
      pageDescription: '아자미노 본사로 찾아오시는 길을 안내해 드립니다.'
    },
    office: {
      badge: 'HEAD OFFICE',
      title: '본사 위치 안내',
      intro: '도쿄도 메구로구 중심권에 위치하여 편리한 대중교통 인프라를 갖추고 있습니다.',
      address: '〒153-0065 東京都目黒区中町２丁目４７−５ 目黒セントラルマンション',
      addressSub: '도쿄도 메구로구 나카초 2-47-5 메구로 센트럴 맨션',
      mapEmbedUrl,
      mapExternalUrl,
      buttonText: 'Google Maps에서 보기'
    },
    tableSectionTitle: '소재지 및 연락처 상세',
    tableRows: [
      { th: '소재지', td: '〒153-0065 일본 도쿄도 메구로구 나카초 2-47-5 메구로 센트럴 맨션 (〒153-0065 東京都目黒区中町２丁目４７−５ 目黒セントラルマンション)' },
      { th: '대표 전화', td: '03-5543-0382' },
      { th: '팩스 (FAX)', td: '03-5542-0387' },
      { th: '이메일', td: 'azamino.ltd@gmail.com' }
    ],
  },
  ja: {
    banner: {
      categoryTitle: 'お問い合わせ',
      categoryEn: 'CONTACT US',
      pageTitle: 'アクセス',
      pageDescription: 'AZAMINO株式会社本社へのアクセスをご案内いたします。'
    },
    office: {
      badge: 'HEAD OFFICE',
      title: '本社所在地・アクセス',
      intro: '東京都目黒区に位置し、利便性の高い交通アクセスを備えております。',
      address: '〒153-0065 東京都目黒区中町２丁目４７−５ 目黒セントラルマンション',
      addressSub: '',
      mapEmbedUrl,
      mapExternalUrl,
      buttonText: 'Google マップで見る'
    },
    tableSectionTitle: '所在地および連絡先詳細',
    tableRows: [
      { th: '所在地', td: '〒153-0065 東京都目黒区中町２丁目４７−５ 目黒セントラルマンション' },
      { th: '代表電話', td: '03-5543-0382' },
      { th: 'FAX', td: '03-5542-0387' },
      { th: 'Eメール', td: 'azamino.ltd@gmail.com' }
    ],
    transportSectionTitle: '公共交通機関のご案内',
  },
  en: {
    banner: {
      categoryTitle: 'Contact Us',
      categoryEn: 'CONTACT US',
      pageTitle: 'Location',
      pageDescription: 'Directions and contact details for AZAMINO Inc. headquarters.'
    },
    office: {
      badge: 'HEAD OFFICE',
      title: 'Headquarters Location',
      intro: 'Conveniently accessible in Meguro-ku, Tokyo with comprehensive transit connections.',
      address: 'Meguro Central Mansion, 2-47-5 Nakamachi, Meguro-ku, Tokyo 153-0065, Japan',
      addressSub: '',
      mapEmbedUrl,
      mapExternalUrl,
      buttonText: 'View on Google Maps'
    },
    tableSectionTitle: 'Address & Contact Details',
    tableRows: [
      { th: 'Address', td: 'Meguro Central Mansion, 2-47-5 Nakamachi, Meguro-ku, Tokyo 153-0065, Japan' },
      { th: 'Telephone', td: '03-5543-0382' },
      { th: 'Fax', td: '03-5542-0387' },
      { th: 'Email', td: 'azamino.ltd@gmail.com' }
    ],
  }
};

const content = computed(() => {
  return locationData[currentLang.value] || locationData.ja;
});
</script>

<style scoped>
.overview-map-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.overview-map-address-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 14px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.address-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.address-pin {
  font-size: 16px;
}

.address-text {
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
}

.address-sub {
  color: #64748b;
  font-size: 13px;
}

.btn-external-map {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #0b2545;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 6px 12px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-external-map:hover {
  background-color: #0b2545;
  color: #ffffff;
  border-color: #0b2545;
}

.overview-map-embed {
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.overview-map-embed iframe {
  display: block;
  width: 100%;
  height: 380px;
  border: none;
}
</style>