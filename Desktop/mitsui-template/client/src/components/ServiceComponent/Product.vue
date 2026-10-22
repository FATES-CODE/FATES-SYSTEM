<template>
  <SubPageLayout
    :category-title="content.banner.categoryTitle"
    :category-en="content.banner.categoryEn"
    category-url="/service"
    :page-title="content.banner.pageTitle"
    :page-description="content.banner.pageDescription"
    hero-image="/images/main/main-card-2.jpeg"
    :tabs="content.tabs"
  >
    <div class="business-detail-page">


      <!-- 상단 인트로 카드 -->
      <div class="business-intro-card">
        <div class="intro-visual">
          <img src="/images/card/main-card-2.png" :alt="content.intro.badge" class="intro-img" />
        </div>
        <div class="intro-content">
          <span class="sub-badge">{{ content.intro.badge }}</span>
          <h2 class="intro-title" v-html="content.intro.title"></h2>
          <p class="intro-desc">
            {{ content.intro.desc }}
          </p>
        </div>
      </div>

      <!-- 핵심 경쟁력 -->
      <section class="section-block">
        <h3 class="section-sub-title">{{ content.strengthsTitle }}</h3>
        <div class="biz-strengths-grid">
          <div v-for="s in content.strengths" :key="s.num" class="strength-card">
            <div class="strength-num">{{ s.num }}</div>
            <h4>{{ s.title }}</h4>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 제품 라인업 -->
      <section class="section-block">
        <h3 class="section-sub-title">{{ content.lineupTitle }}</h3>
        <div class="product-lineup-grid">
          <div v-for="item in content.lineup" :key="item.tag" class="lineup-item">
            <div class="lineup-header">
              <span class="lineup-tag">{{ item.tag }}</span>
              <h4>{{ item.title }}</h4>
            </div>
            <p class="lineup-desc">{{ item.desc }}</p>
            <ul class="lineup-spec">
              <li v-for="spec in item.specs" :key="spec">{{ spec }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 유통 파트너십 프로세스 테이블 -->
      <section class="section-block">
        <h3 class="section-sub-title">{{ content.tableTitle }}</h3>
        <div class="profile-table-wrap">
          <table class="mitsui-style-table">
            <thead>
              <tr>
                <th v-for="h in content.tableHeaders" :key="h">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in content.tableRows" :key="row.step">
                <th scope="row">{{ row.step }}</th>
                <td>{{ row.phase }}</td>
                <td>{{ row.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 문의 CTA -->
      <div class="biz-cta-box">
        <div class="cta-text">
          <h4>{{ content.cta.title }}</h4>
          <p>{{ content.cta.desc }}</p>
        </div>
        <router-link to="/quiry" class="btn-primary-mitsui">{{ content.cta.btn }} &rarr;</router-link>
      </div>
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

const productData = {
  ko: {
    banner: {
      categoryTitle: '사업소개',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: '생활용품',
      pageDescription: '일상의 품격과 위생, 편리함을 더하는 프리미엄 생활소비재를 엄선 유통합니다.'
    },
    tabs: [
      { name: '사업소개 전체', url: '/service' },
      { name: '개호식품', url: '/food' },
      { name: '금고', url: '/money' },
      { name: '생활용품', url: '/product' },
      { name: '화학제품', url: '/chemical' }
    ],
    intro: {
      badge: 'LIVING & LIFESTYLE',
      title: '실용성과 감성을 모두 갖춘<br /><strong>프리미엄 생활용품</strong> 솔루션',
      desc: '세심한 디테일과 높은 완성도로 정평이 난 일본의 우수 소비재 제조사와 협력하여, 국내 소비자의 눈높이에 맞춘 감각적인 리빙웨어와 위생용품을 소개합니다. 단순한 상품 유통을 넘어, 사람들의 일상을 더욱 쾌적하고 편리하게 만드는 라이프스타일 가치를 전파합니다.'
    },
    strengthsTitle: '생활용품 비즈니스 경쟁력',
    strengths: [
      { num: '01', title: '철저한 안전·위생 기준 검증', desc: '국내 식약처 및 KC 안전기준은 물론, 일본 후생노동성 기준을 만족하는 친환경·무독성 제품만을 취급합니다.' },
      { num: '02', title: '아이디어 특허 소비재 소싱', desc: '공간 활용성, 인체공학적 그립감, 세척 용이성 등 사용자 중심의 특허 디자인 제품군을 지속 발굴합니다.' },
      { num: '03', title: '온·오프라인 옴니채널 유통', desc: '백화점, 대형 할인점, e커머스 플랫폼 및 기업 특판 등 다각화된 유통 채널에 최적 공급 체계를 갖추고 있습니다.' }
    ],
    lineupTitle: '주요 취급 카테고리',
    lineup: [
      {
        tag: 'Category 01',
        title: '스마트 키친 & 테이블웨어',
        desc: '조리 시간을 단축하고 식탁의 품격을 높이는 고품질 스테인리스 조리도구 및 밀폐 보관 용기입니다.',
        specs: ['항균 내열 실리콘 주방용품', '내열 유리 및 고진공 밀폐용기']
      },
      {
        tag: 'Category 02',
        title: '위생 & 퍼스널 클린 케어',
        desc: '가정과 다중이용시설의 청결을 지켜주는 저자극 항균 세정제, 무알콜 소독 티슈 및 클리닝 툴입니다.',
        specs: ['천연 유래 성분 항균 스프레이', '초극세사 다목적 클리너']
      },
      {
        tag: 'Category 03',
        title: '친환경 에코 리빙 잡화',
        desc: '생분해성 소재와 재활용 가능한 원료로 제작된 지속 가능한 친환경 생활소비재 라인업입니다.',
        specs: ['대나무 섬유 생활용품', '친환경 펄프 패키징 제품군']
      }
    ],
    tableTitle: 'B2B 공급 및 유통 프로세스',
    tableHeaders: ['단계', '구분', '주요 업무 내용'],
    tableRows: [
      { step: 'STEP 01', phase: '상품 발굴 및 소싱', desc: '일본 현지 박람회 및 파트너사 네트워크를 통한 신상품 및 트렌드 분석' },
      { step: 'STEP 02', phase: '품질 및 인증 검증', desc: '국내 안전기준(KC인증, 식약처 정밀검사 등) 사전 시험 및 품질 보증' },
      { step: 'STEP 03', phase: '수입 통관 및 물류', desc: '정식 수입 통관 및 자체 종합 물류 센터를 통한 안전 입고 관리' },
      { step: 'STEP 04', phase: '유통 및 사후 관리', desc: '주요 채널 납품, 프로모션 지원, CS 및 지속적인 품질 모니터링' }
    ],
    cta: {
      title: '생활용품 입점 문의 및 특판 상담',
      desc: '기업 판촉물, 온·오프라인 유통 입점 및 OEM/ODM 협업 문의를 환영합니다.',
      btn: '문의하기'
    }
  },
  ja: {
    banner: {
      categoryTitle: '事業紹介',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: '生活用品',
      pageDescription: '日々の暮らしに品格と清潔、利便性をプラスする厳選されたプレミアム生活消費財をお届けします。'
    },
    tabs: [
      { name: '事業紹介 全体', url: '/service' },
      { name: '介護食品', url: '/food' },
      { name: '金庫', url: '/money' },
      { name: '生活用品', url: '/product' },
      { name: '化学品', url: '/chemical' }
    ],
    intro: {
      badge: 'LIVING & LIFESTYLE',
      title: '実用性と感性を兼ね備えた<br /><strong>プレミアム生活用品</strong>ソリューション',
      desc: '細部へのこだわりと高い完成度で定評のある日本の優れた消費財メーカーと連携し、韓国消費者のニーズに応える洗練されたリビングウェアや衛生用品をお届けします。単なる商品の流通にとどまらず、人々の日常をより快適で豊かにするライフスタイル価値を創造します。'
    },
    strengthsTitle: '生活用品事業の強み',
    strengths: [
      { num: '01', title: '徹底した安全・衛生基準の検証', desc: '韓国KC認証や食品医薬品安全処の基準はもちろん、日本の厚生労働省基準をクリアした環境配慮・無害な製品のみを厳選します。' },
      { num: '02', title: 'アイデア特許消費財のソーシング', desc: '省スペース性、人間工学に基づくグリップ感、お手入れのしやすさなど、ユーザー目線の特許デザイン商品を継続発掘します。' },
      { num: '03', title: 'オンライン・オフラインのオムニチャネル流通', desc: '百貨店、大手量販店、ECプラットフォーム、法人ギフトなど、多角化されたチャネルへ最適な供給体制を構築しています。' }
    ],
    lineupTitle: '主要取扱カテゴリー',
    lineup: [
      {
        tag: 'Category 01',
        title: 'スマートキッチン＆テーブルウェア',
        desc: '調理の時短を叶え、食卓の品位を高める高品質ステンレス調理器具および密閉保存容器です。',
        specs: ['抗菌耐熱シリコンキッチン用品', '耐熱ガラス＆真空密閉容器']
      },
      {
        tag: 'Category 02',
        title: '衛生＆パーソナルクリーンケア',
        desc: '家庭や公共施設の清潔を守る低刺激抗菌洗剤、ノンアルコール除菌シートおよび清掃ツールです。',
        specs: ['天然由来成分の除菌スプレー', '超極細繊維マルチクリーナー']
      },
      {
        tag: 'Category 03',
        title: '環境配慮エコーリビング雑貨',
        desc: '生分解性素材やリサイクル可能な原料で作られた、持続可能なエコライフスタイル消費財です。',
        specs: ['竹繊維配合の生活雑貨', '環境配慮パルプパッケージ製品群']
      }
    ],
    tableTitle: 'B2B供給・流通プロセス',
    tableHeaders: ['ステップ', '区分', '主要業務内容'],
    tableRows: [
      { step: 'STEP 01', phase: '商品発掘・ソーシング', desc: '日本の展示会および提携メーカーネットワークを通じた新商品・トレンド分析' },
      { step: 'STEP 02', phase: '品質・規格認証検証', desc: '韓国安全規格（KC認証、食品医薬品安全処検査等）の事前試験と品質保証' },
      { step: 'STEP 03', phase: '輸入通関・物流管理', desc: '正規輸入通関および提携総合物流センターを通じた厳格な入出荷管理' },
      { step: 'STEP 04', phase: '流通・アフターフォロー', desc: '主要販路への納品、販促支援、カスタマーサポートおよび品質モニタリング' }
    ],
    cta: {
      title: '生活用品のお取扱・法人特販のご相談',
      desc: '企業の販促ノベルティ、オンライン・オフライン店舗への導入、OEM/ODMのご相談を承ります。',
      btn: 'お問い合わせ'
    }
  },
  en: {
    banner: {
      categoryTitle: 'Business Divisions',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: 'Living Goods',
      pageDescription: 'Distributing curated premium lifestyle and household goods that enhance daily comfort and hygiene.'
    },
    tabs: [
      { name: 'All Businesses', url: '/service' },
      { name: 'Care Food', url: '/food' },
      { name: 'Safes & Security', url: '/money' },
      { name: 'Living Goods', url: '/product' },
      { name: 'Chemicals', url: '/chemical' }
    ],
    intro: {
      badge: 'LIVING & LIFESTYLE',
      title: 'Combining Practical Utility & Refined Aesthetics<br /><strong>Premium Lifestyle Goods</strong> Solutions',
      desc: 'Partnering with Japan’s leading manufacturers known for attention to detail and exquisite craftsmanship, we introduce sensible livingware and personal care products tailored to modern consumers. Beyond retail distribution, we enrich daily lives with thoughtful lifestyle solutions.'
    },
    strengthsTitle: 'Core Competencies in Living Goods',
    strengths: [
      { num: '01', title: 'Strict Safety & Hygiene Standards', desc: 'Handling only eco-friendly, non-toxic products satisfying KC certification, MFDS food-grade standards, and Japan MHLW criteria.' },
      { num: '02', title: 'Patented Functional Lifestyle Goods', desc: 'Constantly sourcing user-centric products featuring space-saving designs, ergonomic comfort, and effortless cleaning.' },
      { num: '03', title: 'Omnichannel Distribution Network', desc: 'Seamlessly supplying department stores, hypermarkets, major e-commerce platforms, and corporate B2B gifting channels.' }
    ],
    lineupTitle: 'Key Categories',
    lineup: [
      {
        tag: 'Category 01',
        title: 'Smart Kitchen & Tableware',
        desc: 'High-grade stainless cookware and vacuum airtight containers that elevate kitchen efficiency and table styling.',
        specs: ['Antibacterial Heat-resistant Silicone Ware', 'Thermal Glass & High-vacuum Containers']
      },
      {
        tag: 'Category 02',
        title: 'Hygiene & Personal Clean Care',
        desc: 'Hypoallergenic antimicrobial cleansers, alcohol-free sanitizing wipes, and premium cleaning tools.',
        specs: ['Naturally Derived Antimicrobial Sprays', 'Ultra-microfiber Multipurpose Cloths']
      },
      {
        tag: 'Category 03',
        title: 'Eco-friendly Sustainable Living',
        desc: 'Sustainable consumer products crafted from biodegradable plant fibers and recyclable components.',
        specs: ['Bamboo Fiber Household Goods', 'Eco Pulp Packaged Product Line']
      }
    ],
    tableTitle: 'B2B Supply & Distribution Process',
    tableHeaders: ['Step', 'Phase', 'Key Operations'],
    tableRows: [
      { step: 'STEP 01', phase: 'Discovery & Sourcing', desc: 'Trend scouting and new product identification through Japanese trade expos and vendor networks' },
      { step: 'STEP 02', phase: 'Quality & Regulatory Testing', desc: 'Pre-testing compliance with Korean regulations including KC marks and MFDS food contact safety' },
      { step: 'STEP 03', phase: 'Customs & Logistics', desc: 'Formal import customs clearance, safe warehousing, and distribution fulfillment' },
      { step: 'STEP 04', phase: 'Channel Delivery & Care', desc: 'Supplying major retail channels, promotional marketing support, and ongoing customer care' }
    ],
    cta: {
      title: 'Retail Inquiries & Corporate Gifting',
      desc: 'We welcome inquiries for retail distribution, corporate gifts, and OEM/ODM collaborations.',
      btn: 'Contact Us'
    }
  }
};

const content = computed(() => {
  return productData[currentLang.value] || productData.ko;
});
</script>
