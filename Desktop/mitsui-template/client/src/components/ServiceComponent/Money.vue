<template>
  <SubPageLayout
    :category-title="content.banner.categoryTitle"
    :category-en="content.banner.categoryEn"
    category-url="/service"
    :page-title="content.banner.pageTitle"
    :page-description="content.banner.pageDescription"
    hero-image="/images/main/slide-main-money.png"
    :tabs="content.tabs"
  >
    <div class="business-detail-page">
      <!-- 상단 인트로 배너/카드 -->
      <div class="business-intro-card">
        <div class="intro-visual">
          <img src="/images/main/slide-main-money.png" :alt="content.intro.badge" class="intro-img" />
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

      <!-- 스펙 비교표 -->
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
              <tr v-for="row in content.tableRows" :key="row.model">
                <th scope="row">{{ row.model }}</th>
                <td>{{ row.use }}</td>
                <td>{{ row.fire }}</td>
                <td>{{ row.lock }}</td>
                <td>{{ row.spec }}</td>
              </tr>
            </tbody>
          </table>
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

const moneyData = {
  ko: {
    banner: {
      categoryTitle: '사업소개',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: '금고',
      pageDescription: '일본의 정밀 보안 기술로 소중한 자산과 기밀을 안전하게 지켜드립니다.'
    },
    tabs: [
      { name: '사업소개 전체', url: '/service' },
      { name: '개호식품', url: '/food' },
      { name: '금고', url: '/money' },
      { name: '생활용품', url: '/product' },
      { name: '화학제품', url: '/chemical' }
    ],
    intro: {
      badge: 'HIGH SECURITY SAFES',
      title: '극한의 환경에서도 자산을 보호하는<br /><strong>일본 프리미엄 금고</strong> 솔루션',
      desc: '화재, 도난, 침수 등 예기치 못한 재난으로부터 고객의 소중한 귀중품과 기업의 기밀 문서를 안전하게 지킵니다. 일본 공업규격(JIS)의 가혹한 고온 내화 시험과 충격 낙하 시험을 완벽하게 통과한 세계 최고 수준의 내화·방도 금고 라인업을 수입·공급하고 있습니다.'
    },
    strengthsTitle: '핵심 보안 기술',
    strengths: [
      { num: '01', title: '1,010℃ 2시간 최고등급 내화', desc: '1,000도가 넘는 화재 현장에서도 내부 온도를 177℃ 이하로 유지하여 종이 및 디지털 저장매체를 온전히 보호합니다.' },
      { num: '02', title: '특수 합금 방도 방어벽', desc: '드릴 및 절단 토치 공격에 견디는 특수 방도 합금 플레이트와 빗장 잠금 구조로 외부 침입을 원천 차단합니다.' },
      { num: '03', title: '첨단 생체인식 스마트 락', desc: '정전용량 지문인식 센서, 터치스크린 패스워드, 이중 잠금 모드 및 외부 충격 감지 경보 기능을 탑재했습니다.' }
    ],
    lineupTitle: '제품 라인업',
    lineup: [
      {
        tag: 'Lineup 01',
        title: '프리미엄 인테리어 홈 금고',
        desc: '고급스러운 외관 디자인으로 주거 공간 및 서재의 인테리어와 완벽한 조화를 이루는 프리미엄 가정용 금고입니다.',
        specs: ['정밀 지문인식 + 백업 터치키', '내부 LED 조명 및 보석 수납 트레이']
      },
      {
        tag: 'Lineup 02',
        title: '비즈니스 오피스 내화금고',
        desc: '중요 계약서, 회계 장부, 인감, 디지털 백업 드라이브를 보관하는 중대형 사무용 고성능 내화금고입니다.',
        specs: ['바인더 전용 수납 선반 및 서랍', '화재 시 9.1m 낙하 충격 시험 통과']
      },
      {
        tag: 'Lineup 03',
        title: '금융기관/특수 보안 대형 금고',
        desc: '은행, 관공서, 귀금속상 등 고위험 자산을 보관하기 위해 주문 제작되는 최고등급 방도·방폭 금고입니다.',
        specs: ['리록킹(Relocking) 자동 잠금 장치', '경비 보안 시스템 원격 연동 포트']
      }
    ],
    tableTitle: '금고 규격 및 사양 비교표',
    tableHeaders: ['모델 시리즈', '용도', '내화 시간', '잠금 방식', '주요 규격(JIS)'],
    tableRows: [
      { model: 'PRESTIGE 시리즈', use: '가정용 / 프리미엄 주거', fire: '1시간 내화 (JIS S 1037)', lock: '지문인식 + 디지털 터치', spec: '외장 피아노 블랙 / 화이트 마감' },
      { model: 'EXECUTIVE 시리즈', use: '기업 사무용 / 법무·회계', fire: '2시간 내화 (JIS S 1037)', lock: '이중 비밀번호 + 기계식 락', spec: 'A4 화일 및 바인더 최적화' },
      { model: 'TITAN STRONG 시리즈', use: '금융기관 / 금은방 / 연구소', fire: '2시간 내화 + TS-15 방도', lock: '다이얼 + 지문 + 스마트 카드', spec: '강화 합금 특수도어 120mm' }
    ],
    cta: {
      title: '금고 제품 카탈로그 요청 및 설치 상담',
      desc: '공간 크기와 보안 목적에 최적화된 금고 추천 및 전문 운송·설치 서비스를 안내해 드립니다.',
      btn: '문의하기'
    }
  },
  ja: {
    banner: {
      categoryTitle: '事業紹介',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: '金庫',
      pageDescription: '日本の精密セキュリティ技術で大切な資産と機密を安全にお守りします。'
    },
    tabs: [
      { name: '事業紹介 全体', url: '/service' },
      { name: '介護食品', url: '/food' },
      { name: '金庫', url: '/money' },
      { name: '生活用品', url: '/product' },
      { name: '化学品', url: '/chemical' }
    ],
    intro: {
      badge: 'HIGH SECURITY SAFES',
      title: '過酷な環境下でも資産を守り抜く<br /><strong>日本製プレミアム金庫</strong>ソリューション',
      desc: '火災、盗難、水害など予期せぬ災害からお客様の貴重品や企業の重要機密文書を安全に守ります。日本産業規格（JIS）の過酷な高温耐火試験や衝撃落下試験をクリアした、世界最高水準の耐火・防盗金庫ラインナップを輸入・販売しています。'
    },
    strengthsTitle: 'コア・セキュリティ技術',
    strengths: [
      { num: '01', title: '1,010℃ 2時間 最高等級耐火', desc: '1,000度を超える火災現場でも内部温度を177℃以下に保ち、紙文書やデジタル記録媒体を確実に保護します。' },
      { num: '02', title: '特殊合金防盗シールド', desc: 'ドリルやバーナー破壊攻撃に耐える特殊防盗合金プレートと強力なカンヌキ構造で不正解錠・侵入を遮断します。' },
      { num: '03', title: '最新生体認証スマートロック', desc: '静電容量式指紋認証、タッチスクリーン暗証番号、二重施錠モード、衝撃検知アラームを搭載しています。' }
    ],
    lineupTitle: '製品ラインナップ',
    lineup: [
      {
        tag: 'Lineup 01',
        title: 'プレミアムインテリア金庫',
        desc: '洗練されたデザインで住空間や書斎のインテリアに自然に溶け込む高級家庭用金庫です。',
        specs: ['精密指紋認証＋バックアップキー', '庫内LEDライト＆貴金属収納トレイ']
      },
      {
        tag: 'Lineup 02',
        title: 'オフィス用耐火金庫',
        desc: '重要書類、帳簿、社印、デジタルバックアップを確実に守る中・大型ビジネス用耐火金庫です。',
        specs: ['A4ファイル専用棚板＆引き出し', '火災時9.1m落下衝撃試験合格']
      },
      {
        tag: 'Lineup 03',
        title: '金融機関・特殊防盗大型金庫',
        desc: '金融機関や貴金属店など高額資産を保管するために特注設計された最高峰の防盗・防爆金庫です。',
        specs: ['自動再施錠(リロッキング)装置', '警備保障システム連動端子']
      }
    ],
    tableTitle: '金庫の規格および仕様比較表',
    tableHeaders: ['モデルシリーズ', '用途', '耐火時間', '施錠方式', '主要規格(JIS)'],
    tableRows: [
      { model: 'PRESTIGE シリーズ', use: '家庭用 / 高級レジデンス', fire: '1時間耐火 (JIS S 1037)', lock: '指紋認証 ＋ デジタルタッチ', spec: 'ピアノブラック / ホワイト光沢仕上' },
      { model: 'EXECUTIVE シリーズ', use: 'オフィス / 法務・会計', fire: '2時間耐火 (JIS S 1037)', lock: '二重暗証番号 ＋ シリンダー錠', spec: 'A4バインダー最適化設計' },
      { model: 'TITAN STRONG シリーズ', use: '金融機関 / 貴金属店 / 研究所', fire: '2時間耐火 ＋ TS-15防盗', lock: 'ダイヤル ＋ 指紋 ＋ ICカード', spec: '120mm特殊合金防盗ドア' }
    ],
    cta: {
      title: '金庫カタログ請求および導入相談',
      desc: '設置スペースやセキュリティ要件に応じた最適モデルのご提案、専門輸送・据付工事をご案内します。',
      btn: 'お問い合わせ'
    }
  },
  en: {
    banner: {
      categoryTitle: 'Business Divisions',
      categoryEn: 'BUSINESS DIVISIONS',
      pageTitle: 'Safes & Security',
      pageDescription: 'Safeguarding your valuable assets and confidential documents with Japanese high-security technology.'
    },
    tabs: [
      { name: 'All Businesses', url: '/service' },
      { name: 'Care Food', url: '/food' },
      { name: 'Safes & Security', url: '/money' },
      { name: 'Living Goods', url: '/product' },
      { name: 'Chemicals', url: '/chemical' }
    ],
    intro: {
      badge: 'HIGH SECURITY SAFES',
      title: 'Protecting Assets in Extreme Conditions<br /><strong>Premium Japanese Safe</strong> Solutions',
      desc: 'Protecting your most valuable assets and confidential enterprise documents from fire, theft, and natural disasters. We import and supply world-class fireproof and burglar-resistant safes certified under stringent Japanese Industrial Standards (JIS).'
    },
    strengthsTitle: 'Core Security Technologies',
    strengths: [
      { num: '01', title: '1,010℃ 2-Hour Fire Endurance', desc: 'Maintains internal temperature below 177℃ even in infernos over 1,000℃, safeguarding documents and digital media.' },
      { num: '02', title: 'Special Alloy Anti-Burglary Barrier', desc: 'Reinforced anti-drill plates and deadbolts protect against severe cutting, drilling, and mechanical attacks.' },
      { num: '03', title: 'Advanced Biometric Smart Locks', desc: 'Equipped with capacitive fingerprint sensors, touch keypads, dual-custody mode, and tamper alarms.' }
    ],
    lineupTitle: 'Product Lineup',
    lineup: [
      {
        tag: 'Lineup 01',
        title: 'Premium Home Interior Safes',
        desc: 'Sophisticated aesthetic design that seamlessly integrates into luxury residences and private studies.',
        specs: ['Biometric Fingerprint + Touchscreen Keypad', 'Internal LED Illumination & Jewelry Tray']
      },
      {
        tag: 'Lineup 02',
        title: 'Commercial Office Fireproof Safes',
        desc: 'Engineered for critical legal documents, financial ledgers, and enterprise backup media.',
        specs: ['Binder-friendly Shelves & Lockable Drawers', '9.1m Impact Drop Test Certified']
      },
      {
        tag: 'Lineup 03',
        title: 'Institutional High-Security Safes',
        desc: 'Heavy-duty burglar and explosion-resistant vaults designed for financial institutions and jewelers.',
        specs: ['Automatic Relocking Mechanism', 'Remote Security System Linkage Ports']
      }
    ],
    tableTitle: 'Specifications & Comparison Table',
    tableHeaders: ['Model Series', 'Application', 'Fire Rating', 'Locking Method', 'Standard (JIS)'],
    tableRows: [
      { model: 'PRESTIGE Series', use: 'Residential / Private Suites', fire: '1-Hour Fire (JIS S 1037)', lock: 'Fingerprint + Digital Touch', spec: 'Piano Black / Pearl White Finish' },
      { model: 'EXECUTIVE Series', use: 'Corporate / Legal & Accounting', fire: '2-Hour Fire (JIS S 1037)', lock: 'Dual Password + Cylinder Lock', spec: 'A4 Binder Optimized Shelving' },
      { model: 'TITAN STRONG Series', use: 'Financial / Jewelry / Research', fire: '2-Hour Fire + TS-15 Burglary', lock: 'Dial + Fingerprint + Smart Card', spec: '120mm Heavy Alloy Door' }
    ],
    cta: {
      title: 'Catalog Request & Installation Inquiries',
      desc: 'We provide model recommendations tailored to your space and security level, along with professional delivery and setup.',
      btn: 'Contact Us'
    }
  }
};

const content = computed(() => {
  return moneyData[currentLang.value] || moneyData.ja;
});
</script>
