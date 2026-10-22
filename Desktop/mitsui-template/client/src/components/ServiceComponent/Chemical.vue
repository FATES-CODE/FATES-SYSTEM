<template>
  <SubPageLayout
    :category-title="content.banner.categoryTitle"
    :category-en="content.banner.categoryEn"
    category-url="/service"
    :page-title="content.banner.pageTitle"
    :page-description="content.banner.pageDescription"
    hero-image="/images/main/slide-main-chemical.png"
    :tabs="content.tabs"
  >
    <div class="business-detail-page">
      <!-- 상단 인트로 카드 -->
      <div class="business-intro-card">
        <div class="intro-visual">
          <img src="/images/main/slide-main-chemical.png" :alt="content.intro.badge" class="intro-img" />
        </div>
        <div class="intro-content">
          <span class="sub-badge">{{ content.intro.badge }}</span>
          <h2 class="intro-title" v-html="content.intro.title"></h2>
          <p class="intro-desc">
            {{ content.intro.desc }}
          </p>
        </div>
      </div>

      <!-- 핵심 특징 -->
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

      <!-- 화학제품 품목 테이블 -->
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
              <tr v-for="row in content.tableRows" :key="row.group">
                <th scope="row">{{ row.group }}</th>
                <td>{{ row.industry }}</td>
                <td>{{ row.product }}</td>
                <td>{{ row.pack }}</td>
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

const chemicalData = {
  ko: {
    banner: {
      categoryTitle: '사업소개',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: '화학제품',
      pageDescription: '정밀화학부터 친환경 소재까지, 미래 산업을 견인하는 글로벌 화학 트레이딩 솔루션입니다.'
    },
    tabs: [
      { name: '사업소개 전체', url: '/service' },
      { name: '개호식품', url: '/food' },
      { name: '금고', url: '/money' },
      { name: '생활용품', url: '/product' },
      { name: '화학제품', url: '/chemical' }
    ],
    intro: {
      badge: 'ADVANCED CHEMICALS',
      title: '산업의 기초부터 첨단 미래까지<br /><strong>글로벌 화학 원료</strong> 트레이딩',
      desc: '일한상사의 화학 사업 부문은 자동차, IT 전자, 배터리, 건축 등 핵심 제조업의 근간이 되는 기초 유분 및 고기능성 정밀화학 소재를 전 세계 주요 제조사로부터 안정적으로 소싱하여 공급합니다. 또한 최근 대두되는 탄소중립 이슈에 발맞추어 바이오매스 플라스틱과 생분해성 수지 등 차세대 친환경 화학소재 포트폴리오를 지속적으로 확대하고 있습니다.'
    },
    strengthsTitle: '화학 사업 부문 핵심 역량',
    strengths: [
      { num: '01', title: '글로벌 소싱 네트워크', desc: '일본, 동남아, 미국, 유럽 등 유수의 글로벌 케미칼 제조사와 긴밀한 파트너십을 구축하여 수급 변동에도 안정적 공급을 보장합니다.' },
      { num: '02', title: '고기능성 스페셜티 솔루션', desc: '단순 범용 원료뿐만 아니라 반도체 공정, 2차 전지, 모빌리티 분야에 요구되는 초고순도 스페셜티 화학품을 발굴·제안합니다.' },
      { num: '03', title: '전문 화학 물류 & 규제 대응', desc: '위험물 안전 운송 규격(IMDG), 화평법/화관법 준수 등 고도화된 화학물질 관리 체계와 맞춤형 저장 인프라를 보유하고 있습니다.' }
    ],
    lineupTitle: '주요 취급 품목 분야',
    lineup: [
      {
        tag: 'Chemical Sector 01',
        title: '기초화학품 & 합성수지 원료',
        desc: '산업 전반의 베이스가 되는 올레핀계, 아로마틱계 기초유분 및 범용·엔지니어링 플라스틱 수지입니다.',
        specs: ['PE, PP, ABS, PC 합성수지', '모노머, 용제, 가소제 및 중간체']
      },
      {
        tag: 'Chemical Sector 02',
        title: '정밀화학 & 전자재료 첨가제',
        desc: '디스플레이, 반도체 및 고기능성 코팅 도료 등에 사용되는 고부가가치 정밀 화학 원료 및 기능성 첨가제입니다.',
        specs: ['실리콘 오일 & 변성 실리콘 수지', 'UV 경화제, 대전방지제, 산화방지제']
      },
      {
        tag: 'Chemical Sector 03',
        title: '친환경 바이오매스 & 순환 소재',
        desc: 'ESG 경영 및 탄소 배출 저감을 위한 식물성 유래 바이오 플라스틱 및 재활용 재생 레진 제품군입니다.',
        specs: ['PLA, PHA 친환경 생분해성 수지', 'Post-Consumer Recycled(PCR) 수지']
      }
    ],
    tableTitle: '품목별 용도 및 포장 규격',
    tableHeaders: ['품목군', '주요 대상 산업', '대표 제품명', '공급 단위/포장'],
    tableRows: [
      { group: '고기능성 수지', industry: '자동차 경량화, 전기·전자 하우징', product: '엔지니어링 플라스틱 컴파운드', pack: '25kg Bag, 500kg Jumbo Bag' },
      { group: '정밀 용제 & 모노머', industry: '페인트, 접착제, 인쇄 잉크 제조', product: '아크릴계 모노머, 고순도 에스테르', pack: '200L Drum, ISO Tank 컨테이너' },
      { group: '바이오 플라스틱', industry: '식품 포장재, 일회용품 대체 용기', product: '식물유래 생분해성 복합레진', pack: '25kg Bag, 컨테이너 FCL' }
    ],
    cta: {
      title: '화학소재 견적 의뢰 및 기술 자료(TDS/MSDS) 요청',
      desc: '원하시는 스펙과 수량, 납기 조건을 문의해주시면 전문 트레이더가 최적의 솔루션을 안내합니다.',
      btn: '문의하기'
    }
  },
  ja: {
    banner: {
      categoryTitle: '事業紹介',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: '化学品',
      pageDescription: '精密化学から環境配慮素材まで、未来産業を牽引するグローバル化学品トレーディングソリューションです。'
    },
    tabs: [
      { name: '事業紹介 全体', url: '/service' },
      { name: '介護食品', url: '/food' },
      { name: '金庫', url: '/money' },
      { name: '生活用品', url: '/product' },
      { name: '化学品', url: '/chemical' }
    ],
    intro: {
      badge: 'ADVANCED CHEMICALS',
      title: '産業の基盤から先端の未来まで<br /><strong>グローバル化学原料</strong>トレーディング',
      desc: '日韓商事の化学品事業部門は、自動車、ITエレクトロニクス、二次電池、建築など基幹製造業を支える基礎化学原料および高機能精密化学素材を、世界トップクラスのメーカーから安定的に調達・供給しています。また、カーボンニュートラルの潮流に対応し、バイオマスプラスチックや生分解性樹脂など次世代の環境配慮型素材ポートフォリオを積極的に拡充しています。'
    },
    strengthsTitle: '化学事業のコアコンピタンス',
    strengths: [
      { num: '01', title: 'グローバル調達ネットワーク', desc: '日本、東南アジア、米国、欧州などの大手化学メーカーと強固なパートナーシップを結び、市況変動下でも安定供給を保証します。' },
      { num: '02', title: '高機能スペシャリティ化学提案', desc: '汎用原料にとどまらず、半導体プロセス、二次電池、モビリティ分野に不可欠な超高純度スペシャリティケミカルを発掘・提案します。' },
      { num: '03', title: '専門化学物流＆法規制コンプライアンス', desc: '危険物海上輸送基準（IMDG）や韓国化学物質登録評価法・管理法に準拠した厳格な管理体制と専門貯蔵インフラを完備しています。' }
    ],
    lineupTitle: '主要取扱分野',
    lineup: [
      {
        tag: 'Chemical Sector 01',
        title: '基礎化学品＆合成樹脂原料',
        desc: '産業全般の基礎となるオレフィン系・芳香族系の基礎留分および汎用・エンプラ樹脂です。',
        specs: ['PE、PP、ABS、PC合成樹脂', 'モノマー、溶剤、可塑剤および中間体']
      },
      {
        tag: 'Chemical Sector 02',
        title: '精密化学品＆電子材料添加剤',
        desc: 'ディスプレイ、半導体、高機能塗料などに用いられる高付加価値精密化学原料と機能性添加剤です。',
        specs: ['シリコーンオイル＆変性シリコーン樹脂', 'UV硬化剤、帯電防止剤、酸化防止剤']
      },
      {
        tag: 'Chemical Sector 03',
        title: '環境配慮バイオマス＆循環型素材',
        desc: 'ESG経営および脱炭素に向けた植物由来バイオプラスチックや再生リサイクル樹脂群です。',
        specs: ['PLA、PHA生分解性樹脂', 'PCR（使用済み回収再生）樹脂']
      }
    ],
    tableTitle: '品目別の用途および包装規格',
    tableHeaders: ['品目群', '主要対象産業', '代表製品名', '供給単位・包装'],
    tableRows: [
      { group: '高機能性樹脂', industry: '自動車軽量化、電気・電子ハウジング', product: 'エンジニアリングプラスチックコンパウンド', pack: '25kg Bag, 500kg Jumbo Bag' }
    ,
      { group: '精密溶剤・モノマー', industry: '塗料、接着剤、印刷インク製造', product: 'アクリル系モノマー、高純度エステル', pack: '200L Drum, ISO Tank コンテナ' }
    ,
      { group: 'バイオプラスチック', industry: '食品包装材、使い捨て代替容器', product: '植物由来生分解性コンパウンドレジン', pack: '25kg Bag, コンテナ FCL' }
    ],
    cta: {
      title: '化学原料のお見積りおよび技術資料(TDS/MSDS)請求',
      desc: 'ご希望のスペック、数量、納期条件をお知らせいただければ、専門トレーダーが最適なご提案を差し上げます。',
      btn: 'お問い合わせ'
    }
  },
  en: {
    banner: {
      categoryTitle: 'Business Divisions',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: 'Chemicals',
      pageDescription: 'Global chemical trading solutions driving future industries from fine chemicals to eco-friendly materials.'
    },
    tabs: [
      { name: 'All Businesses', url: '/service' },
      { name: 'Care Food', url: '/food' },
      { name: 'Safes & Security', url: '/money' },
      { name: 'Living Goods', url: '/product' },
      { name: 'Chemicals', url: '/chemical' }
    ],
    intro: {
      badge: 'ADVANCED CHEMICALS',
      title: 'From Industrial Fundamentals to High-Tech Frontiers<br /><strong>Global Chemical Trading</strong> Solutions',
      desc: 'Our Chemical Division stably sources and distributes basic petrochemical fractions and high-performance specialty chemicals for automotive, electronics, rechargeable batteries, and construction industries. We are actively expanding next-generation sustainable portfolios including biomass plastics and biodegradable resins to support carbon-neutral ESG goals.'
    },
    strengthsTitle: 'Core Competencies in Chemicals',
    strengths: [
      { num: '01', title: 'Global Sourcing Network', desc: 'Securing stable supply even under market fluctuations through strategic partnerships across Japan, Southeast Asia, the US, and Europe.' },
      { num: '02', title: 'High-Performance Specialties', desc: 'Offering ultra-high-purity specialty chemicals tailored for semiconductor manufacturing, secondary batteries, and advanced mobility.' },
      { num: '03', title: 'Specialized Chemical Logistics & Compliance', desc: 'Equipped with dedicated hazmat storage and rigorous compliance adhering to IMDG regulations and Korean K-REACH / CCA laws.' }
    ],
    lineupTitle: 'Key Chemical Sectors',
    lineup: [
      {
        tag: 'Chemical Sector 01',
        title: 'Basic Chemicals & Synthetic Resins',
        desc: 'Olefin and aromatic fractions, as well as general-purpose and engineering plastic resins serving as foundational industrial feedstocks.',
        specs: ['PE, PP, ABS, PC Synthetic Resins', 'Monomers, Solvents, Plasticizers & Intermediates']
      },
      {
        tag: 'Chemical Sector 02',
        title: 'Fine Chemicals & Electronic Additives',
        desc: 'High-value specialty materials and functional additives formulated for displays, semiconductor processes, and advanced coatings.',
        specs: ['Silicone Oils & Modified Silicone Resins', 'UV Curatives, Antistatic Agents, Antioxidants']
      },
      {
        tag: 'Chemical Sector 03',
        title: 'Bio-based & Circular Materials',
        desc: 'Plant-derived bioplastics and recycled PCR resins designed to advance circular economy and carbon emission reductions.',
        specs: ['PLA, PHA Biodegradable Resins', 'Post-Consumer Recycled (PCR) Resins']
      }
    ],
    tableTitle: 'Product Applications & Packaging',
    tableHeaders: ['Category', 'Target Industries', 'Representative Products', 'Packaging / Unit'],
    tableRows: [
      { group: 'High-Performance Resins', industry: 'Automotive lightweighting, electrical/electronic housings', product: 'Engineering Plastic Compounds', pack: '25kg Bag, 500kg Jumbo Bag' },
      { group: 'Fine Solvents & Monomers', industry: 'Paints, adhesives, printing ink manufacturing', product: 'Acrylic Monomers, High-Purity Esters', pack: '200L Drum, ISO Tank Container' },
      { group: 'Bio-Plastics', industry: 'Food packaging, eco containers', product: 'Plant-Derived Biodegradable Compounds', pack: '25kg Bag, Container FCL' }
    ],
    cta: {
      title: 'Chemical Quote & Technical Data (TDS/MSDS) Request',
      desc: 'Please submit your specifications, volume requirements, and delivery timeline for a custom solution from our traders.',
      btn: 'Contact Us'
    }
  }
};

const content = computed(() => {
  return chemicalData[currentLang.value] || chemicalData.ko;
});
</script>
