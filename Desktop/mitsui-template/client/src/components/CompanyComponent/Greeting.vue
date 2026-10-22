<template>
  <SubPageLayout
    :category-title="pageMeta.categoryTitle"
    :category-en="pageMeta.categoryEn"
    :category-url="pageMeta.categoryUrl"
    :page-title="pageMeta.pageTitle"
    :page-description="pageMeta.desc"
    hero-image="/images/main/slide-main-tokyo.jpg"
    :tabs="companyTabs"
  >
    <div class="greeting-page-container">



      <section class="greeting-main-section">
        <div class="greeting-profile-col">
          <div class="profile-card">
            <div class="profile-photo-box">
              <img 
                src="/images/card/main-card-1.png"
                :alt="pageMeta.ceoTitle" 
                class="profile-photo-img" 
              />
            </div>

            <div class="profile-info-box">
              <span class="profile-role-label">{{ pageMeta.ceoTitle }}</span>
              <h3 class="profile-name-text">{{ pageMeta.ceoName }}</h3>
              

            </div>
          </div>
        </div>

        <div class="greeting-content-col">
          <div class="greeting-paragraphs-wrapper">
            <p 
              v-for="(para, idx) in pageMeta.paragraphs" 
              :key="idx" 
              class="greeting-para-item"
            >
              {{ para }}
            </p>
          </div>

          <!-- 하단 서명 마무리 블록 -->
          <div class="greeting-sign-block">
            <p class="sign-date">{{ pageMeta.signDate }}</p>
            <p class="sign-name-wrap">
              <span class="sign-role">{{ pageMeta.ceoTitle }}</span>
              <strong class="sign-name">{{ pageMeta.ceoName }}</strong>
            </p>
          </div>
        </div>
      </section>

    </div>
  </SubPageLayout>
</template>

<script setup>
import { computed } from 'vue';
import SubPageLayout from '../common/SubPageLayout.vue';
import { currentLang } from '../../composables/useLanguage.js';

// 상단 서브 탭 (LNB)
const companyTabs = computed(() => {
  if (currentLang.value === 'ja') {
    return [
      { name: 'ご挨拶', url: '/greeting' },
      { name: '企業理念', url: '/overview' }
    ];
  } else if (currentLang.value === 'en') {
    return [
      { name: 'CEO Message', url: '/greeting' },
      { name: 'Corporate Philosophy', url: '/overview' }
    ];
  }
  return [
    { name: '인사말', url: '/greeting' },
    { name: '경영이념', url: '/overview' }
  ];
});

// 3개 국어별 상세 컨텐츠
const pageDataByLang = {
  ko: {
    categoryTitle: '회사정보',
    categoryEn: 'COMPANY INFO',
    categoryUrl: '/information',
    pageTitle: '인사말',
    desc: '신뢰와 혁신을 바탕으로 고객과 함께 더 넓은 미래로 나아갑니다.',
    leadHeadline: '변화와 혁신의 글로벌 무대에서, 변함없는 신뢰로 보답하겠습니다.',
    leadSub: 'AZAMINO는 국경을 넘어 사람과 비즈니스를 연결하며 지속 가능한 가치를 창출합니다.',
    ceoTitle: 'AZAMINO',
    ceoName: '임직원 일동',
    signDate: '2024년 AZAMINO Inc.',
    paragraphs: [
      '안녕하십니까. AZAMINO 홈페이지를 찾아주신 고객 여러분과 파트너 여러분께 진심으로 감사의 말씀을 드립니다.',
      '오늘날 세계 경제는 급격한 기술의 발전과 시장 환경의 다변화 속에서 끊임없는 변화와 도전을 마주하고 있습니다. 이러한 흐름 속에서 AZAMINO는 탄탄한 글로벌 네트워크와 무역 전문성을 바탕으로 다양한 산업 분야에서 최적의 가치를 제공해 왔습니다.',
      '우리는 단순한 거래를 넘어, 고객과 사회가 공감할 수 있는 지속 가능한 솔루션을 만들어가고자 합니다. 정직과 신뢰를 가장 중요한 나침반으로 삼고, 모든 이해관계자와 함께 성장하는 상생의 경영을 실천하겠습니다.',
      '앞으로도 혁신적인 비즈니스 모델 구축과 적극적인 글로벌 시장 개척을 통해 더 큰 신뢰와 감동을 드리는 기업으로 거듭나겠습니다. 여러분의 변함없는 관심과 성원을 부탁드립니다.'
    ],
  },
  ja: {
    categoryTitle: '企業情報',
    categoryEn: 'COMPANY INFO',
    categoryUrl: '/information',
    pageTitle: 'ご挨拶',
    desc: '信頼と革新を胸に、お客様と共に豊かな未来を切り拓きます。',
    leadHeadline: '変革のグローバルステージにおいて、揺るぎない信頼でお応えします。',
    leadSub: 'AZAMINOは国境を越えて人とビジネスをつなぎ、持続可能な価値を共創してまいります。',
    ceoTitle: 'AZAMINO',
    ceoName: 'AZAMINO社員一同',
    signDate: '2024年 AZAMINO Inc.',
    paragraphs: [
      '平素は格別のご高配を賜り、厚く御礼申し上げます。AZAMINOのウェブサイトをご覧いただき、誠にありがとうございます。',
      '現代のグローバル経済は、技術革新や市場の変化が目まぐるしく進む中、絶え間ない変革の時代を迎えております。そうした環境下において、弊社は確かな国際ネットワークと専門的ノウハウを結集し、多様な産業分野でお客様のニーズに応える価値を提供してまいりました。',
      '私たちは単なる商取引にとどまらず、社会と共鳴し持続可能な発展を支えるパートナーでありたいと願っております。誠実と信頼を経営の基盤とし、すべてのステークホルダーの皆様と共に成長を遂げる所存です。',
      '今後とも挑戦する姿勢を忘れることなく、より高度なサービスと革新的なビジネスモデルの創出に努めてまいります。引き続き皆様の温かいご支援を賜りますようお願い申し上げます。'
    ],
  },
  en: {
    categoryTitle: 'Company Info',
    categoryEn: 'COMPANY INFO',
    categoryUrl: '/information',
    pageTitle: 'CEO Message',
    desc: 'Pioneering a sustainable global future through trust and innovation.',
    leadHeadline: 'Delivering uncompromised trust on the dynamic global stage.',
    leadSub: 'AZAMINO connects people, industries, and borders to co-create sustainable value.',
    ceoTitle: 'AZAMINO',
    ceoName: 'All Employees and executives',
    signDate: '2024 AZAMINO Inc.',
    paragraphs: [
      'Welcome to the official website of AZAMINO Inc. We extend our deepest gratitude to our valued clients, partners, and stakeholders across the globe.',
      'In an increasingly connected yet rapidly transforming world economy, businesses must demonstrate agility, integrity, and forward-looking vision. AZAMINO has consistently met these demands by providing top-tier solutions leveraging our global trade network and comprehensive expertise.',
      'Beyond traditional business transactions, we aspire to build lasting partnerships that generate tangible value for both industry and society. Integrity and reliability remain the bedrock of our corporate philosophy as we pursue shared prosperity.',
      'We remain steadfast in our commitment to continuous innovation, seeking out new frontiers and delivering exceptional experiences. Thank you for your continued trust and partnership.'
    ],
  }
};

const pageMeta = computed(() => {
  return pageDataByLang[currentLang.value] || pageDataByLang.ko;
});
</script>

<style scoped>
.greeting-page-container {
  width: 100%;
  padding-bottom: 80px;
}

.greeting-lead-section {
  position: relative;
  background-color: #f8fafc;
  border-left: 4px solid #004098;
  border-radius: 0 8px 8px 0;
  padding: 44px 48px;
  margin-bottom: 64px;
}

.greeting-quote-mark {
  position: absolute;
  top: 10px;
  right: 32px;
  font-size: 80px;
  line-height: 1;
  font-family: Georgia, serif;
  color: #e2e8f0;
  pointer-events: none;
}

.greeting-lead-headline {
  margin: 0 0 12px 0;
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.45;
  letter-spacing: -0.02em;
}

.greeting-lead-sub {
  margin: 0;
  font-size: 16px;
  color: #64748b;
  line-height: 1.6;
}

.greeting-main-section {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 60px;
  align-items: start;
  margin-bottom: 84px;
}

/* 좌측 CEO 프로필 */
.greeting-profile-col {
  position: sticky;
  top: 100px;
}

.profile-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.04);
}

.profile-photo-box {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: #f1f5f9;
}

.profile-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.profile-card:hover .profile-photo-img {
  transform: scale(1.03);
}

.photo-overlay-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background-color: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(4px);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 4px 10px;
  border-radius: 4px;
}

.profile-info-box {
  padding: 24px 20px 28px;
  text-align: center;
}

.profile-role-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.profile-name-text {
  margin: 0 0 16px 0;
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
}

.profile-signature {
  padding-top: 14px;
  border-top: 1px dashed #e2e8f0;
}

.signature-font {
  font-family: 'Brush Script MT', 'Segoe Script', cursive, sans-serif;
  font-size: 24px;
  color: #004098;
  letter-spacing: 0.04em;
}

/* 우측 인사말 본문 */
.greeting-paragraphs-wrapper {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.greeting-para-item {
  margin: 0;
  font-size: 16.5px;
  line-height: 1.85;
  color: #334155;
  word-break: keep-all;
}

.greeting-sign-block {
  margin-top: 48px;
  padding-top: 28px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.sign-date {
  margin: 0;
  font-size: 14px;
  color: #94a3b8;
}

.sign-name-wrap {
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.sign-role {
  font-size: 14px;
  color: #64748b;
}

.sign-name {
  font-size: 18px;
  color: #0f172a;
}

/* 3. 하단 핵심 가치 카드 */
.greeting-values-section {
  padding-top: 60px;
  border-top: 1px solid #e2e8f0;
}

.values-header {
  text-align: center;
  margin-bottom: 40px;
}

.values-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  color: #004098;
  letter-spacing: 0.12em;
  margin-bottom: 8px;
}

.values-title {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.value-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 32px 24px;
  transition: all 0.3s ease;
  position: relative;
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
  border-color: #cbd5e1;
}

.value-card-num {
  font-size: 32px;
  font-weight: 800;
  color: #e2e8f0;
  line-height: 1;
  margin-bottom: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.value-card-title {
  margin: 0 0 4px 0;
  font-size: 19px;
  font-weight: 700;
  color: #0f172a;
}

.value-card-en {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #004098;
  margin-bottom: 12px;
  letter-spacing: 0.02em;
}

.value-card-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: #64748b;
  word-break: keep-all;
}

/* 반응형 미디어 쿼리 */
@media (max-width: 992px) {
  .greeting-main-section {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .greeting-profile-col {
    position: static;
    max-width: 420px;
    margin: 0 auto;
  }
  .values-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}

@media (max-width: 768px) {
  .greeting-lead-section {
    padding: 30px 24px;
  }
  .greeting-lead-headline {
    font-size: 21px;
  }
  .greeting-quote-mark {
    font-size: 60px;
    right: 16px;
  }
}
</style>
