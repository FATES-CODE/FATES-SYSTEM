<template>
  <SubPageLayout
    :category-title="currentContent.categoryTitle"
    :category-en="currentContent.categoryEn"
    :category-url="currentContent.categoryUrl"
    :page-title="currentContent.pageTitle"
    hero-image="/images/main/slide-main-tokyo.jpg"
    :tabs="currentContent.tabs"
  >
    <div class="service-mitsui-page">
      <!-- 상단 인트로 리드문구 -->
      <section class="service-intro-section">
        <h2 class="service-lead-title">{{ currentContent.leadTitle }}</h2>
        <p class="service-lead-desc">{{ currentContent.introText }}</p>
      </section>

      <!-- 4대 사업 부문별 상세 줄글 + 영상 섹션 -->
      <div class="service-sections-list">
        <article 
          v-for="(biz, bIdx) in currentContent.divisions" 
          :key="biz.id" 
          :id="biz.id"
          class="biz-division-row"
          :class="{ 'reverse-layout': bIdx % 2 === 1 }"
        >
          <!-- 좌/우: 줄글 설명 영역 -->
          <div class="biz-division-text-col">
            <span class="biz-division-num">0{{ bIdx + 1 }}</span>
            <span class="biz-division-tag">{{ biz.categoryTag }}</span>
            <h3 class="biz-division-title">{{ biz.title }}</h3>
            <p class="biz-division-subtitle">{{ biz.enTitle }}</p>

            <p class="biz-division-lead">{{ biz.lead }}</p>
            <div class="biz-division-body">
              <p v-for="(para, pIdx) in biz.paragraphs" :key="pIdx">{{ para }}</p>
            </div>

            <!-- 핵심 특장점 태그 리스트 -->
            <ul class="biz-feature-chips">
              <li v-for="(chip, cIdx) in biz.chips" :key="cIdx">{{ chip }}</li>
            </ul>

            <!-- 상세 페이지 바로가기 링크 -->
            <div class="biz-detail-link-wrap">
              <router-link :to="biz.link" class="biz-detail-btn">
                <span>{{ currentContent.viewDetailText }}</span>
                <span class="btn-arrow">&rarr;</span>
              </router-link>
            </div>
          </div>

          <!-- 우/좌: 영상 미디어 영역 (반응형 비디오 임베드) -->
          <div class="biz-division-media-col">
            <div class="biz-video-container">
              <iframe 
                :src="biz.videoUrl" 
                :title="biz.title + ' 비즈니스 영상'"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                class="biz-video-iframe"
                loading="lazy"
              ></iframe>
            </div>
            <p class="biz-video-caption">{{ biz.videoCaption }}</p>
          </div>
        </article>
      </div>
    </div>
  </SubPageLayout>
</template>

<script setup>
import { computed } from 'vue';
import SubPageLayout from '../common/SubPageLayout.vue';
import { currentLang } from '../../composables/useLanguage.js';

const langData = {
  ko: {
    categoryTitle: '사업소개',
    categoryEn: 'BUSINESS DIVISIONS',
    categoryUrl: '/service',
    pageTitle: '사업소개',
    leadTitle: '다각화된 글로벌 무역으로 새로운 가치를 창출합니다.',
    introText: '아자미노(AZAMINO)는 고령화 사회의 삶의 질을 높이는 선진 개호식품부터 자산을 지키는 최고 등급의 특수 방재 금고, 일상의 품격을 높이는 고품질 생활소비재와 첨단 미래 산업을 지탱하는 고기능성 화학제품에 이르기까지 다각화된 글로벌 무역 및 유통 솔루션을 제공합니다.',
    viewDetailText: '사업 상세정보 보기',
    tabs: [
      { name: '사업소개 전체', url: '/service' },
      { name: '개호식품', url: '/food' },
      { name: '금고', url: '/money' },
      { name: '생활용품', url: '/product' },
      { name: '화학제품', url: '/chemical' }
    ],
    divisions: [
      {
        id: 'food',
        categoryTag: 'WELLNESS & NUTRITION',
        title: '개호식품 솔루션',
        enTitle: 'Care Food Solutions',
        lead: '씹고 삼키는 기쁨을 지키며, 고령화 사회의 영양과 존엄을 지원하는 맞춤형 케어푸드.',
        paragraphs: [
          '초고령 사회에 진입한 대한민국에 일본의 40년 축적된 시니어 케어푸드 기술과 노하우를 바탕으로, 저작 및 연하(삼킴) 기능이 저하된 어르신들이 식사의 즐거움을 잃지 않도록 과학적인 영양식을 공급합니다.',
          '일본개호식품협의회(UDF) 규격을 엄격히 충족하는 1~4구분 식품과 연하곤란자용 특수 점도조절제(토로미)를 엄선하여 국내 주요 대학병원, 전문 요양원 및 실버타운에 콜드체인 시스템으로 안전하게 배송합니다.'
        ],
        chips: ['UDF 인증 식품', '연하곤란 영양식', '맞춤형 점도조절제', '철저한 콜드체인 물류'],
        link: '/food',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO 개호식품 솔루션 소개 영상'
      },
      {
        id: 'money',
        categoryTag: 'SECURITY & ASSET PROTECTION',
        title: '특수 방재·방범 금고',
        enTitle: 'Safes & Security Systems',
        lead: '일본 최고의 내화·방도 기술력이 집약된 최고 수준의 보안 금고 시스템.',
        paragraphs: [
          '예기치 못한 화재나 재난, 도난 위협으로부터 기업의 기밀 문서와 개인의 소중한 귀중품을 완벽하게 보호하는 일본 선진 보안 금고를 수입·유통합니다.',
          'JIS(일본산업규격) 초고온 내화 시험을 완벽 통과하고 전기충격·유압 파쇄 방지 특수 합금 설계가 적용된 고성능 금고 라인업을 금융기관, 관공서 및 프리미엄 주거 공간에 최적 맞춤형으로 제안합니다.'
        ],
        chips: ['JIS 내화 인증', '특수 방도 합금', '생체인식 스마트 락', '금융기관 납품 실적'],
        link: '/money',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO 고성능 내화 보안 금고 시연 영상'
      },
      {
        id: 'product',
        categoryTag: 'LIFESTYLE & LIVING GOODS',
        title: '프리미엄 생활용품',
        enTitle: 'Premium Living Goods',
        lead: '일상의 편리함과 위생, 삶의 만족도를 높이는 혁신적인 생활소비재 유통.',
        paragraphs: [
          '일본의 실용적인 디자인 철학과 장인정신이 깃든 친환경 생활소비재 및 프리미엄 홈 케어 아이템을 엄선하여 아시아 전역에 공급합니다.',
          '주방 및 위생 용품, 스마트 정리 시스템, 기능성 바스 용품 등 일상 속 작은 불편을 해소하고 현대인의 웰빙 라이프스타일을 완성하는 차별화된 제품군을 온·오프라인 메이저 유통망을 통해 선보입니다.'
        ],
        chips: ['친환경 프리미엄 소재', '일본 실용주의 디자인', '위생·항균 특화', '온·오프라인 글로벌 유통'],
        link: '/product',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO 프리미엄 리빙 아이템 브랜드 영상'
      },
      {
        id: 'chemical',
        categoryTag: 'ADVANCED CHEMICALS',
        title: '첨단 산업 화학제품',
        enTitle: 'Advanced Industrial Chemicals',
        lead: '기초 원료부터 첨단 정밀화학, 친환경 바이오 플라스틱까지 아우르는 글로벌 서플라이 체인.',
        paragraphs: [
          '자동차, 디스플레이, 반도체 및 2차전지 등 첨단 제조 산업의 기반이 되는 고순도 기초 화학 원료와 기능성 정밀화학 수지를 전 세계 공급망을 통해 적기에 안정적으로 공급합니다.',
          '특히 탄소중립 시대를 선도하기 위해 재생 가능 바이오 플라스틱, 생분해성 폴리머 등 친환경 소재 포트폴리오를 지속적으로 확대하여 고객사의 지속 가능한 ESG 경영을 적극 뒷받침하고 있습니다.'
        ],
        chips: ['고순도 기초화학 원료', '친환경 바이오 플라스틱', '정밀 화학 수지', '원스톱 글로벌 공급망'],
        link: '/chemical',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO 첨단 화학소재 글로벌 공급망 영상'
      }
    ]
  },
  ja: {
    categoryTitle: '事業紹介',
    categoryEn: 'BUSINESS DIVISIONS',
    categoryUrl: '/service',
    pageTitle: '事業紹介',
    leadTitle: '多角化されたグローバル貿易で新たな価値を創出します。',
    introText: 'AZAMINOは、高齢化社会の生活の質を高める先進介護食品から、大切な資産を守る最高水準のセキュリティ金庫、日々の暮らしを豊かにする高品質な生活消費財、そして先端産業を支える機能性化学品に至るまで、多角的なグローバル貿易および流通ソリューションを展開しております。',
    viewDetailText: '事業詳細を見る',
    tabs: [
      { name: '事業紹介 全体', url: '/service' },
      { name: '介護食品', url: '/food' },
      { name: '金庫', url: '/money' },
      { name: '生活用品', url: '/product' },
      { name: '化学品', url: '/chemical' }
    ],
    divisions: [
      {
        id: 'food',
        categoryTag: 'WELLNESS & NUTRITION',
        title: '介護食品ソリューション',
        enTitle: 'Care Food Solutions',
        lead: '噛む・飲み込む喜びを守り、高齢化社会の栄養と尊厳を支えるテイラーメイド・ケアフード。',
        paragraphs: [
          '超高齢社会を迎えた市場において、日本の40年にわたり培われたシニアケアフードの技術とノウハウを活かし、咀嚼・嚥下機能が低下された方々が食事の喜びを維持できるよう科学的な栄養食を提供しております。',
          '日本介護食品協議会（UDF）の規格を満たす区分1～4の食品および嚥下困難者用とろみ調整食品を厳選し、主要医療機関や福祉施設へ徹底したコールドチェーン体制でお届けします。'
        ],
        chips: ['UDF認証取得', '嚥下サポート栄養食', 'とろみ調整食品', '厳格なコールドチェーン'],
        link: '/food',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO 介護食品ソリューション紹介映像'
      },
      {
        id: 'money',
        categoryTag: 'SECURITY & ASSET PROTECTION',
        title: '特殊防災・防犯金庫',
        enTitle: 'Safes & Security Systems',
        lead: '日本の誇る高度な耐火・防盗技術が集約された最高峰のセキュリティ金庫システム。',
        paragraphs: [
          '予期せぬ火災や自然災害、盗難の脅威から企業の重要機密文書や個人の貴重品を堅牢に守る先進セキュリティ金庫を供給しております。',
          'JIS（日本産業規格）の耐火試験に合格した超高性能耐火構造と、特殊破砕防止合金技術を採用した製品ラインアップを、金融機関や官公庁、高級レジデンス向けにご提案いたします。'
        ],
        chips: ['JIS耐火規格クリア', '特殊防盗合金設計', 'スマート生体認証', '金融機関導入実績'],
        link: '/money',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO 高機能セキュリティ金庫実演映像'
      },
      {
        id: 'product',
        categoryTag: 'LIFESTYLE & LIVING GOODS',
        title: 'プレミアム生活用品',
        enTitle: 'Premium Living Goods',
        lead: '日常の利便性と衛生、生活の満足度を高める革新的な生活消費財の流通。',
        paragraphs: [
          '日本の機能的デザイン思想とクラフトマンシップが息づく環境配慮型の生活消費財およびホームケアアイテムを厳選し、アジア全域へ展開しております。',
          'キッチン・サニタリー用品、整理収納システム、機能性バスアイテムなど、日常の不便を解消し上質なウェルビーイング生活を支える製品群を取り揃えています。'
        ],
        chips: ['環境配慮型素材', '日本の実用美デザイン', '衛生・抗菌機能', 'グローバル流通展開'],
        link: '/product',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO プレミアムリビング ブランド映像'
      },
      {
        id: 'chemical',
        categoryTag: 'ADVANCED CHEMICALS',
        title: '先端産業化学品',
        enTitle: 'Advanced Industrial Chemicals',
        lead: '基礎原料から精密化学、環境配慮型バイオプラスチックまでをつなぐグローバルサプライチェーン。',
        paragraphs: [
          '自動車、ディスプレイ、半導体、二次電池などハイテク製造業を根幹から支える高純度基礎化学原料や機能性樹脂を、グローバルネットワークを通じて安定的に供給いたします。',
          'カーボンニュートラル社会の実現に向け、バイオマスプラスチックや生分解性ポリマーなどの環境調和型素材ポートフォリオを拡充し、お客様のESG経営をサポートいたします。'
        ],
        chips: ['高純度基礎化学品', 'バイオマスプラスチック', '機能性高分子樹脂', 'ワンストップ安定供給'],
        link: '/chemical',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO 先端化学品サプライチェーン映像'
      }
    ]
  },
  en: {
    categoryTitle: 'Business Divisions',
    categoryEn: 'BUSINESS DIVISIONS',
    categoryUrl: '/service',
    pageTitle: 'Business Divisions',
    leadTitle: 'Creating lasting global value through diversified trading.',
    introText: 'AZAMINO provides diversified global trading and supply-chain solutions spanning from Japanese specialized senior care food to high-security fireproof safes, premium household consumer goods, and advanced industrial chemicals.',
    viewDetailText: 'View Division Details',
    tabs: [
      { name: 'All Businesses', url: '/service' },
      { name: 'Care Food', url: '/food' },
      { name: 'Safes & Security', url: '/money' },
      { name: 'Living Goods', url: '/product' },
      { name: 'Chemicals', url: '/chemical' }
    ],
    divisions: [
      {
        id: 'food',
        categoryTag: 'WELLNESS & NUTRITION',
        title: 'Care Food Solutions',
        enTitle: 'Senior Care Food',
        lead: 'Supporting nutrition, dignity, and the pure joy of eating for aging societies.',
        paragraphs: [
          'Leveraging Japan\'s 40 years of pioneering senior dietary food technology, we distribute scientifically formulated nutrition to preserve mealtime enjoyment for individuals facing chewing and swallowing challenges.',
          'Strictly conforming to Universal Design Food (UDF) grades, our specialized meals and thickening agents are supplied reliably to major hospitals and healthcare residences via cold-chain distribution.'
        ],
        chips: ['UDF Certified', 'Swallowing Support Meals', 'Thickening Agents', 'Strict Cold-Chain Logistics'],
        link: '/food',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO Care Food Solutions Introduction Video'
      },
      {
        id: 'money',
        categoryTag: 'SECURITY & ASSET PROTECTION',
        title: 'Safes & Security Systems',
        enTitle: 'High-Security Fireproof Safes',
        lead: 'Engineered with top Japanese burglary-resistant and fireproof technologies.',
        paragraphs: [
          'We supply advanced protective safes designed to safeguard vital corporate archives, data media, and invaluable personal assets against extreme disasters and forced breaches.',
          'Exceeding JIS high-temperature fire endurance standards and reinforced with anti-drill alloy shielding, our security systems cater to leading financial institutions and luxury residences.'
        ],
        chips: ['JIS Fireproof Certified', 'Reinforced Alloy Shields', 'Biometric Locks', 'Institutional Grade'],
        link: '/money',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO High-Security Safe Demonstration Video'
      },
      {
        id: 'product',
        categoryTag: 'LIFESTYLE & LIVING GOODS',
        title: 'Premium Living Goods',
        enTitle: 'Consumer & Home Essentials',
        lead: 'Distributing everyday convenience, hygiene, and design excellence.',
        paragraphs: [
          'Guided by Japanese minimalist practicality and fine craftsmanship, we curate high-grade eco-friendly lifestyle goods and wellness home essentials across Asian consumer markets.',
          'From antimicrobial kitchen tools to ergonomic storage solutions, our consumer goods eliminate everyday friction and enrich modern lifestyle experiences.'
        ],
        chips: ['Eco-Conscious Materials', 'Functional Design', 'Antimicrobial Hygiene', 'Global Consumer Distribution'],
        link: '/product',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO Premium Living Brand Showcase'
      },
      {
        id: 'chemical',
        categoryTag: 'ADVANCED CHEMICALS',
        title: 'Advanced Industrial Chemicals',
        enTitle: 'Fine Chemicals & Bioplastics',
        lead: 'Powering high-tech industries with resilient global supply chains.',
        paragraphs: [
          'We deliver high-purity petrochemical feedstocks, engineering plastics, and fine chemical resins essential for automotive, semiconductor, display, and EV battery manufacturing.',
          'In alignment with carbon-neutral initiatives, we actively expand our lineup of bio-based plastics and biodegradable polymers to empower client ESG sustainability goals.'
        ],
        chips: ['High-Purity Raw Materials', 'Renewable Bioplastics', 'Engineering Resins', 'Resilient Supply Chain'],
        link: '/chemical',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQs',
        videoCaption: 'AZAMINO Advanced Chemicals Global Network Video'
      }
    ]
  }
};

const currentContent = computed(() => {
  return langData[currentLang.value] || langData.ko;
});
</script>

<style scoped>
.service-mitsui-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 100px;
  font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
  color: #1f2937;
}

/* ==========================================================================
   상단 인트로 섹션
   ========================================================================== */
.service-intro-section {
  text-align: center;
  max-width: 860px;
  margin: 0 auto 72px;
  padding-bottom: 40px;
  border-bottom: 2px solid #004098;
}

.service-lead-title {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  line-height: 1.35;
  margin: 0 0 20px;
}

.service-lead-desc {
  font-size: 16.5px;
  line-height: 1.85;
  color: #4b5563;
  margin: 0;
  word-break: keep-all;
}

/* ==========================================================================
   4대 사업부문별 줄글 + 영상 섹션
   ========================================================================== */
.service-sections-list {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.biz-division-row {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 50px 0;
  border-bottom: 1px solid #e5e7eb;
}

.biz-division-row:last-child {
  border-bottom: none;
}

.biz-division-row.reverse-layout {
  grid-template-columns: 1fr 1.15fr;
}

.biz-division-row.reverse-layout .biz-division-text-col {
  order: 2;
}

.biz-division-row.reverse-layout .biz-division-media-col {
  order: 1;
}

/* 텍스트 컬럼 */
.biz-division-text-col {
  display: flex;
  flex-direction: column;
}

.biz-division-num {
  font-size: 36px;
  font-weight: 800;
  color: #004098;
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
  opacity: 0.9;
}

.biz-division-tag {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.biz-division-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 4px;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.biz-division-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.05em;
  margin: 0 0 18px;
  text-transform: uppercase;
}

.biz-division-lead {
  font-size: 16px;
  font-weight: 700;
  color: #004098;
  line-height: 1.6;
  margin: 0 0 16px;
  word-break: keep-all;
}

.biz-division-body p {
  font-size: 15px;
  line-height: 1.85;
  color: #4b5563;
  margin: 0 0 12px;
  word-break: keep-all;
}

.biz-division-body p:last-child {
  margin-bottom: 0;
}

/* 특장점 칩 */
.biz-feature-chips {
  list-style: none;
  padding: 0;
  margin: 22px 0 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.biz-feature-chips li {
  font-size: 12.5px;
  font-weight: 600;
  color: #1e293b;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 6px 14px;
  border-radius: 9999px;
}

/* 상세 바로가기 버튼 */
.biz-detail-link-wrap {
  margin-top: 4px;
}

.biz-detail-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14.5px;
  font-weight: 700;
  color: #004098;
  text-decoration: none;
  border-bottom: 2px solid #004098;
  padding-bottom: 4px;
  transition: all 0.2s ease;
}

.biz-detail-btn:hover {
  color: #002b66;
  border-bottom-color: #002b66;
  transform: translateX(4px);
}

.btn-arrow {
  font-size: 16px;
  transition: transform 0.2s ease;
}

.biz-detail-btn:hover .btn-arrow {
  transform: translateX(4px);
}

/* 영상 미디어 컬럼 */
.biz-division-media-col {
  display: flex;
  flex-direction: column;
}

.biz-video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 비율 */
  background: #000000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.biz-video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.biz-video-caption {
  font-size: 13px;
  color: #64748b;
  margin-top: 10px;
  text-align: right;
}

/* ==========================================================================
   반응형 모바일
   ========================================================================== */
@media (max-width: 900px) {
  .service-mitsui-page {
    padding: 40px 16px 60px;
  }
  .service-lead-title {
    font-size: 24px;
  }
  .service-lead-desc {
    font-size: 15px;
  }
  .service-sections-list {
    gap: 48px;
  }
  .biz-division-row,
  .biz-division-row.reverse-layout {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 0;
  }
  .biz-division-row.reverse-layout .biz-division-text-col {
    order: 1;
  }
  .biz-division-row.reverse-layout .biz-division-media-col {
    order: 2;
  }
  .biz-division-title {
    font-size: 22px;
  }
}
</style>
