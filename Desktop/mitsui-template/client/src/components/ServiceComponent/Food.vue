<template>
  <SubPageLayout
    :category-title="content.banner.categoryTitle"
    :category-en="content.banner.categoryEn"
    category-url="/service"
    :page-title="content.banner.pageTitle"
    :page-description="content.banner.pageDescription"
    hero-image="/images/main/slide-main-healthyfood.jpg"
    :tabs="content.tabs"
  >
    <div class="business-detail-page">
      <!-- 상단 인트로 배너/카드 -->
      <div class="business-intro-card">
        <div class="intro-visual">
          <img src="/images/main/slide-main-healthyfood.jpg" :alt="content.intro.badge" class="intro-img" />
        </div>
        <div class="intro-content">
          <span class="sub-badge">{{ content.intro.badge }}</span>
          <h2 class="intro-title" v-html="content.intro.title"></h2>
          <p class="intro-desc">
            {{ content.intro.desc }}
          </p>
        </div>
      </div>

      <!-- 핵심 강점 3종 -->
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

      <!-- 제품 라인업 카테고리 -->
      <section class="section-block">
        <h3 class="section-sub-title">{{ content.lineupTitle }}</h3>
        <div class="product-lineup-grid">
          <div v-for="item in content.lineup" :key="item.tag" class="lineup-item">
            <div class="lineup-header">
              <span class="lineup-tag">{{ item.tag }}</span>
              <h4>{{ item.title }}</h4>
            </div>
            <p class="lineup-desc">{{ item.desc }}</p>
            <ul class="lineup-tags">
              <li v-for="tag in item.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 문의 바로가기 박스 -->
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

const foodData = {
  ko: {
    banner: {
      categoryTitle: '사업소개',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: '개호식품',
      pageDescription: '일본의 검증된 고령친화 개호식품을 통해 존엄하고 건강한 식생활을 제안합니다.'
    },
    tabs: [
      { name: '사업소개 전체', url: '/service' },
      { name: '개호식품', url: '/food' },
      { name: '금고', url: '/money' },
      { name: '생활용품', url: '/product' },
      { name: '화학제품', url: '/chemical' }
    ],
    intro: {
      badge: 'CARE FOOD SOLUTION',
      title: '맛과 영양, 씹는 즐거움을 지키는<br /><strong>맞춤형 개호식품</strong> 솔루션',
      desc: '초고령 사회로 진입한 대한민국에 일본의 40년 축적된 시니어 케어푸드 기술을 도입합니다. 저작 및 연하(삼킴) 기능이 저하된 어르신들이 식사의 기쁨을 유지할 수 있도록 과학적인 개호식품을 공급하고 있습니다.'
    },
    strengthsTitle: '핵심 역량 및 강점',
    strengths: [
      { num: '01', title: 'UDF 인증 엄선 공급', desc: '일본개호식품협의회의 엄격한 규격(UDF 1~4구분)을 충족하는 검증된 제품만을 엄선 수입합니다.' },
      { num: '02', title: '콜드체인 안심 물류', desc: '신선도와 영양소 보존을 위해 수입 통관부터 병원/시설 배송까지 전 과정 철저한 온도 제어 시스템을 운영합니다.' },
      { num: '03', title: '전문 영양 설계 지원', desc: '임상 영양사와 협력하여 요양병원, 실버타운 맞춤형 식단 구성 컨설팅 및 샘플 제공 프로그램을 지원합니다.' }
    ],
    lineupTitle: '주요 제품 라인업',
    lineup: [
      { tag: 'Category 01', title: '연하 보조 유동식 / 무스식', desc: '치아가 없거나 씹는 힘이 약한 어르신을 위한 혀로 으깰 수 있는 부드러운 영양식', tags: ['#UDF3구분', '#고단백', '#칼로리보충'] },
      { tag: 'Category 02', title: '점도 증진제 (토로미 파우더)', desc: '물이나 국물에 섞어 사레들림을 방지하고 삼키기 쉬운 점도로 조절해 주는 특수 분말', tags: ['#사레들림방지', '#투명한용해', '#무미무취'] },
      { tag: 'Category 03', title: '영양 강화 젤리 & 디저트', desc: '소화 흡수가 빠르고 비타민, 미네랄, 아연 등 필수 미량 영양소가 농축된 시니어 간식', tags: ['#비타민강화', '#고칼슘', '#수분보충'] },
      { tag: 'Category 04', title: '치료식 & 저염 단백질 식단', desc: '신장, 당뇨 등 만성질환 케어가 필요한 분들을 위한 정밀 염분·단백질 제한 특수식', tags: ['#저염식단', '#단백질조절', '#환자맞춤식'] }
    ],
    cta: {
      title: '개호식품 샘플 신청 및 B2B 납품 상담',
      desc: '병원, 요양원, 주간보호센터 등 시설 대량 공급 및 전용 식단 컨설팅을 도와드립니다.',
      btn: '문의하기'
    }
  },
  ja: {
    banner: {
      categoryTitle: '事業紹介',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: '介護食品',
      pageDescription: '日本の確かな高齢者向け介護食品を通じて、尊厳ある健康的な食生活をご提案します。'
    },
    tabs: [
      { name: '事業紹介 全体', url: '/service' },
      { name: '介護食品', url: '/food' },
      { name: '金庫', url: '/money' },
      { name: '生活用品', url: '/product' },
      { name: '化学品', url: '/chemical' }
    ],
    intro: {
      badge: 'CARE FOOD SOLUTION',
      title: '美味しさと栄養、食べる喜びを守る<br /><strong>カスタマイズ介護食品</strong>ソリューション',
      desc: '超高齢社会を迎えた韓国へ、日本で培われた先進のシニアケアフード技術を導入。咀嚼・嚥下機能が低下した方々にも食べる喜びを保っていただける安全で栄養バランスに優れた介護食を供給します。'
    },
    strengthsTitle: 'コアコンピタンスおよび強み',
    strengths: [
      { num: '01', title: 'UDF規格認証品の厳選供給', desc: '日本介護食品協議会の厳格な規格(UDF区分1〜4)に適合した信頼性の高い製品のみを厳選輸入します。' },
      { num: '02', title: 'コールドチェーン安心物流', desc: '鮮度と栄養を保持するため、通関から施設納品まで全工程で徹底した温度管理システムを稼働しています。' },
      { num: '03', title: '専門栄養設計サポート', desc: '療養病院や福祉施設向けに、栄養士と連携した献立構成コンサルティングおよびサンプル提供を実施しています。' }
    ],
    lineupTitle: '主要製品ラインナップ',
    lineup: [
      { tag: 'Category 01', title: '嚥下補助流動食・ムース食', desc: '歯のない方や噛む力が弱い方のための、舌でつぶせる柔らかい高栄養介護食', tags: ['#UDF区分3', '#高タンパク', '#カロリー補給'] },
      { tag: 'Category 02', title: 'とろみ調整食品 (とろみパウダー)', desc: '水分や汁物に素早く溶け、誤嚥を防ぎ飲み込みやすく調整する特殊粉末', tags: ['#誤嚥防止', '#透明な溶解', '#無味無臭'] },
      { tag: 'Category 03', title: '栄養強化ゼリー＆デザート', desc: '消化吸収に優れ、ビタミン・ミネラル・亜鉛などが濃縮されたシニア向け補助食', tags: ['#ビタミン強化', '#高カルシウム', '#水分補給'] },
      { tag: 'Category 04', title: '治療食＆低塩分食', desc: '腎臓疾患や生活習慣病のケアが必要な方向けの精密な塩分・タンパク質調整食', tags: ['#減塩食', '#タンパク調整', '#疾患別対応'] }
    ],
    cta: {
      title: '介護食品サンプル請求およびB2B導入相談',
      desc: '病院・福祉施設様向けの大量一括納品および専用献立コンサルティングを承っております。',
      btn: 'お問い合わせ'
    }
  },
  en: {
    banner: {
      categoryTitle: 'Business Divisions',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: 'Care Food Solutions',
      pageDescription: 'Offering premium, Japanese-certified nutritional senior care food products.'
    },
    tabs: [
      { name: 'All Businesses', url: '/service' },
      { name: 'Care Food', url: '/food' },
      { name: 'Safes & Security', url: '/money' },
      { name: 'Living Goods', url: '/product' },
      { name: 'Chemicals', url: '/chemical' }
    ],
    intro: {
      badge: 'CARE FOOD SOLUTION',
      title: 'Preserving Taste, Nutrition & Joy of Dining<br /><strong>Specialized Senior Care Food</strong> Solutions',
      desc: 'Introducing advanced Japanese senior care nutrition technologies. Providing scientifically engineered dietary solutions for seniors with impaired chewing and swallowing capabilities.'
    },
    strengthsTitle: 'Core Capabilities & Strengths',
    strengths: [
      { num: '01', title: 'Strict UDF Certified Products', desc: 'Importing products certified under the strict Universal Design Food (UDF) standards.' },
      { num: '02', title: 'Cold-Chain Logistics', desc: 'Full-process temperature-controlled logistics from customs clearance to hospitals and nursing homes.' },
      { num: '03', title: 'Clinical Nutrition Consulting', desc: 'Customized dietary menu planning and sample programs in collaboration with clinical nutritionists.' }
    ],
    lineupTitle: 'Key Product Lineup',
    lineup: [
      { tag: 'Category 01', title: 'Puree & Mousse Meals', desc: 'Smooth, easily swallowed nutritious meals designed for seniors with chewing difficulties.', tags: ['#UDF-Grade3', '#HighProtein', '#CalorieBoost'] },
      { tag: 'Category 02', title: 'Food Thickening Powder', desc: 'Quick-dissolving thickening agents that prevent choking without altering taste or appearance.', tags: ['#ChokePrevention', '#ClearDissolve', '#Odorless'] },
      { tag: 'Category 03', title: 'Nutritional Jellies & Desserts', desc: 'Easily digestible snacks enriched with essential vitamins, calcium, and zinc.', tags: ['#VitaminEnriched', '#HighCalcium', '#Hydration'] },
      { tag: 'Category 04', title: 'Therapeutic Diets', desc: 'Scientifically regulated low-sodium and protein-managed meals for chronic disease care.', tags: ['#LowSodium', '#ProteinControl', '#CustomCare'] }
    ],
    cta: {
      title: 'Request Samples & B2B Inquiries',
      desc: 'We support bulk institutional deliveries and dietary consultation for hospitals and nursing homes.',
      btn: 'Contact Us'
    }
  }
};

const content = computed(() => {
  return foodData[currentLang.value] || foodData.ko;
});
</script>
