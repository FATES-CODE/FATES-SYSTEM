<template>
  <div class="mitsui-style-main-view">
    <MAINSlider :slides="currentContent.slides" />
    <GlobeInnovation />

    <section class="mitsui-business-section">
      <div class="container">
        <div class="sec-header-row">
          <div class="header-text-group">
            <h2 class="sec-headline">{{ currentContent.business.headline }}</h2>
          </div>
          <router-link to="/service" class="sec-view-all-link">
            <span>{{ currentContent.business.viewAllText }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </router-link>
        </div>

        <div class="business-rows-list">
          <article 
            v-for="biz in currentContent.business.items" 
            :key="biz.id" 
            class="biz-row-item"
          >
            <router-link :to="biz.link" class="biz-row-link">
              <div class="biz-row-left">
                <div class="biz-row-title-wrap">
                  <h3 class="biz-row-title">{{ biz.title }}</h3>
                  <span v-if="biz.enTitle" class="biz-row-subtitle">{{ biz.enTitle }}</span>
                </div>
                <p class="biz-row-desc">{{ biz.desc }}</p>
              </div>
              <div class="biz-row-right">
                <div class="biz-row-img-wrap">
                  <img :src="biz.image" :alt="biz.title" loading="lazy" class="biz-row-img" />
                </div>
              </div>
            </router-link>
          </article>
        </div>
      </div>
    </section>

    <section class="mitsui-pickup-section">
      <div class="container">
        <div class="pickup-top-divider"></div>
        <div class="pickup-header-row">
          <h2 class="pickup-headline">{{ currentContent.pickup.headline }}</h2>
        </div>

        <div class="pickup-cards-grid">
          <article 
            v-for="item in currentContent.pickup.items" 
            :key="item.id" 
            class="pickup-card"
          >
            <a 
              v-if="item.isDownload" 
              :href="item.link" 
              :download="item.downloadName || '会社紹介書.pdf'" 
              class="pickup-card-link"
              title="会社紹介書 ダウンロード"
            >
              <div class="pickup-img-box">
                <img :src="item.image" :alt="item.title" class="pickup-img" loading="lazy" />
                <div class="pickup-scrim"></div>
              </div>
              <div class="pickup-card-content">
                <div class="pickup-title-wrap">
                  <h3 class="pickup-card-title">{{ item.title }}</h3>
                  <span v-if="item.subTitle" class="pickup-card-sub">{{ item.subTitle }}</span>
                </div>
                <div class="pickup-arrow-badge">
                  <svg class="pickup-arrow-svg" viewBox="0 0 16 16" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 2a.75.75 0 0 1 .75.75v8.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V2.75A.75.75 0 0 1 8 2z"/>
                  </svg>
                </div>
              </div>
            </a>
            <!-- 일반 페이지 이동 링크 -->
            <router-link v-else :to="item.link" class="pickup-card-link">
              <div class="pickup-img-box">
                <img :src="item.image" :alt="item.title" class="pickup-img" loading="lazy" />
                <div class="pickup-scrim"></div>
              </div>
              <div class="pickup-card-content">
                <div class="pickup-title-wrap">
                  <h3 class="pickup-card-title">{{ item.title }}</h3>
                  <span v-if="item.subTitle" class="pickup-card-sub">{{ item.subTitle }}</span>
                </div>
                <div class="pickup-arrow-badge">
                  <svg class="pickup-arrow-svg" viewBox="0 0 16 16" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </div>
              </div>
            </router-link>
          </article>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup>
import { computed } from 'vue';
import MAINSlider from '../components/MainComponent/MAINSlider.vue';
import GlobeInnovation from '../components/MainComponent/GlobeInnovation.vue';
import { currentLang } from '../composables/useLanguage.js';

const mainPageData = {
  ko: {
    slides: [
      {
        id: 1,
        category: 'GLOBAL INNOVATION',
        keyword: 'Connecting Worlds,',
        mainTitle: 'Creating Lasting Value.',
        description: 'Discover Our Global Operations',
        link: 'information',
        image: '/images/main/slide-main-tokyo.jpg'
      },
      {
        id: 2,
        category: 'WELLNESS & NUTRITION',
        keyword: 'Care Food Solutions,',
        mainTitle: '건강하고 풍요로운 삶을 위한 약속',
        description: '엄선된 일본 최고 수준의 영양 케어푸드로 고령화 사회의 삶의 질을 높입니다.',
        link: 'food',
        image: '/images/main/slide-main-healthyfood.jpg'
      },
      {
        id: 3,
        category: 'SAFETY & SECURITY',
        keyword: 'Asset Protection,',
        mainTitle: '신뢰할 수 있는 내화·방범 금고 솔루션',
        description: '소중한 자산과 기밀을 안전하게 지키는 일본 최고의 방재 보안 제품을 공급합니다.',
        link: 'money',
        image: '/images/main/slide-main-money.png'
      },
      {
        id: 4,
        category: 'ADVANCED CHEMICALS',
        keyword: 'Industrial Innovation,',
        mainTitle: '첨단 산업을 선도하는 정밀 화학 원료',
        description: '다양한 산업 현장에 필요한 고기능성 화학 제품을 신속하고 안정적으로 조달합니다.',
        link: 'chemical',
        image: '/images/main/slide-main-chemical.png'
      },
      {
        id: 5,
        category: 'GLOBAL TRADING NETWORK',
        keyword: '360° Trade Solutions,',
        mainTitle: '최적의 글로벌 공급망을 연결합니다',
        description: '무역, 물류, 유통을 잇는 원스톱 프로세스로 고객에게 최상의 비즈니스 경쟁력을 제공합니다.',
        link: 'service',
        video: '/videos/azamino-graph.mp4'
      }
    ],
    topics: {
      date: '2026.10.15',
      title: '아자미노 공식 웹사이트 리뉴얼 및 신규 무역 사업부문 안내',
      btnText: '공지사항 전체보기',
      link: '/contact'
    },
    about: {
      headline: 'Discover Our Global Operations',
      desc1: '아자미노는 한국과 일본을 잇는 탄탄한 비즈니스 네트워크와 정밀한 시장 통찰력을 바탕으로 설립된 종합 무역 솔루션 파트너입니다.',
      desc2: '개호식품, 방재 금고, 생활소비재, 첨단 화학제품에 이르기까지 다각화된 사업 포트폴리오를 전개하며, 단순한 유통을 넘어 고객과 산업에 지속 가능한 가치를 제공합니다.',
      ctaText: '회사소개 바로가기',
      pillars: [
        {
          num: '01',
          title: 'Global Synergy',
          desc: '한일 양국의 특화된 장점을 결합하여 안정적이고 유기적인 공급망 인프라를 실현합니다.'
        },
        {
          num: '02',
          title: 'Strict Quality Assurance',
          desc: '현지 기준과 국내 안전 규격을 완벽히 충족하는 최우수 인증 제품만을 엄선 공급합니다.'
        },
        {
          num: '03',
          title: 'Sustainable Partnership',
          desc: '일회성 거래가 아닌, 고객의 중장기적 비즈니스 성장을 함께 도모하는 상생의 동반자입니다.'
        }
      ]
    },
    business: {
              headline: 'Discover Our Global Operations',
              items: [
                {
                  id: 'food',
                  badge: 'CARE FOOD',
                  title: 'Innovation',
                  desc: 'Creating new value beyond simple connectivity.',
                  image: '/images/main/slide-main-healthyfood.jpeg',
                },
                {
                  id: 'money',
                  badge: 'SECURITY',
                  title: 'Sustainability',
                  desc: 'Our innovation is the foundation of steady growth.',
                  image: '/images/main/slide-main-money.png',
                },
                {
                  id: 'product',
                  badge: 'LIFESTYLE',
                  title: 'Trust',
                  desc: 'A network built on trust, proven by flawless execution.',
                  image: '/images/main/slide-main-tokyo.jpg',
                },
              ]
            },

    pickup: {
      headline: 'Contents',
      items: [
        {
          id: 'profile',
          title: 'Company Profile',
          subTitle: 'Philosophy & Overview',
          link: '/overview',
          image: '/images/pickup/pickup_1.webp'
        },
        {
          id: 'leadership',
          title: 'Greetings',
          subTitle: 'Executive Message',
          link: '/greeting',
          image: '/images/pickup/pickup_2.webp'
        },
        {
          id: 'services',
          title: 'Services',
          subTitle: 'Our Businesses',
          link: '/service',
          image: '/images/pickup/pickup_4.webp'
        },
        {
          id: 'brochure',
          title: 'Company Brochure',
          subTitle: '会社紹介書 (PDF)',
          link: '/downloads/会社紹介書.pdf',
          downloadName: '会社紹介書.pdf',
          isDownload: true,
          image: '/images/pickup/pickup_5.webp'
        },
      ]
    },
    cta: {
      title: '아자미노와 함께 비즈니스의 새로운 내일을 만들어가십시오.',
      desc: '제품 수입, 유통 협력, 신규 무역 프로젝트에 대해 전문 팀이 신속하게 상담해 드립니다.',
      btnInquiry: '온라인 문의하기',
      btnLocation: '오시는 길 안내'
    }
  },
  ja: {
    slides: [
      {
        id: 1,
        category: 'GLOBAL INNOVATION',
        keyword: 'Connecting Worlds,',
        mainTitle: 'Creating Lasting Value.',
        description: 'AZAMINOは、日韓の信頼と専門性を軸に、新たなビジネス価値を共創します。',
        link: 'information',
        image: '/images/main/slide-main-tokyo.jpg'
      },
      {
        id: 2,
        category: 'WELLNESS & NUTRITION',
        keyword: 'Care Food Solutions,',
        mainTitle: '健やかで豊かな暮らしへの約束',
        description: '高品質な介護食品の輸出入を通じて、高齢化社会のQOL向上に貢献します。',
        link: 'food',
        image: '/images/main/slide-main-healthyfood.jpg'
      },
      {
        id: 3,
        category: 'SAFETY & SECURITY',
        keyword: 'Asset Protection,',
        mainTitle: '信頼の耐火・防犯金庫ソリューション',
        description: '大切な資産と機密を火災や盗難から守る、最高水準の金庫製品をお届けします。',
        link: 'money',
        image: '/images/main/slide-main-money.png'
      },
      {
        id: 4,
        category: 'ADVANCED CHEMICALS',
        keyword: 'Industrial Innovation,',
        mainTitle: '先端産業を支える高機能化学品',
        description: '製造現場の技術革新に不可欠な精密化学原料を迅速かつ安定的に調達します。',
        link: 'chemical',
        image: '/images/main/slide-main-chemical.png'
      },
      {
        id: 5,
        category: 'GLOBAL TRADING NETWORK',
        keyword: '360° Trade Solutions,',
        mainTitle: '最適なグローバルサプライチェーンの構築',
        description: '貿易・物流・販売を一貫して支援し、お客様の競争力を最大化します。',
        link: 'service',
        video: '/videos/azamino-graph.mp4'
      }
    ],
    topics: {
      date: '2026.10.15',
      title: 'AZAMINO公式コーポレートサイトリニューアルおよび新規事業展開のお知らせ',
      btnText: 'お知らせ一覧',
      link: '/contact'
    },
    about: {
      headline: '信頼と洞察で、日韓貿易の未来を切り拓く。',
      desc1: '株式会社アザミノ（AZAMINO）は、日韓をつなぐ確かなネットワークと市場知見を強みとする総合ビジネスパートナーです。',
      desc2: '介護食品、セキュリティ金庫、生活用品、高機能化学品に至るまで、多角的な事業を展開し、単なる流通を超えた持続可能な価値を社会に提供します。',
      ctaText: '企業情報を見る',
      pillars: [
        {
          num: '01',
          title: 'Global Synergy',
          desc: '日韓両国の強みを融合させ、強固で機動的なサプライチェーンインフラを実現します。'
        },
        {
          num: '02',
          title: 'Strict Quality Assurance',
          desc: '安全基準と厳格な検査をクリアした、確かな品質の製品のみを厳選調達します。'
        },
        {
          num: '03',
          title: 'Sustainable Partnership',
          desc: '長期的な信頼を基盤に、パートナー企業とともに持続的な成長を目指します。'
        }
      ]
    },
   business: {
             headline: 'Discover Our Global Operations',
             items: [
               {
                 id: 'food',
                 badge: 'CARE FOOD',
                 title: 'Innovation',
                 desc: 'Creating new value beyond simple connectivity.',
                 image: '/images/main/slide-main-healthyfood.jpeg',
               },
               {
                 id: 'money',
                 badge: 'SECURITY',
                 title: 'Sustainability',
                 desc: 'Our innovation is the foundation of steady growth.',
                 image: '/images/main/slide-main-money.png',
               },
               {
                 id: 'product',
                 badge: 'LIFESTYLE',
                 title: 'Trust',
                 desc: 'A network built on trust, proven by flawless execution.',
                 image: '/images/card/main-card-2.jpeg',
               },
             ]
           },
    feature: {
      headline: 'データ主導の貿易ソリューションとアザミノの未来構想',
      desc: '迅速な通関業務、厳密な品質検証、安全な物流ネットワークまで、日韓貿易の全過程をワンストップで最適化します。',
      ctaText: 'ソリューションを見る',
      stats: [
        { val: '360°', label: 'One-Stop Trading' },
        { val: '100%', label: 'Strict Verification' },
        { val: '24/7', label: 'Global Network' }
      ]
    },
    pickup: {
      headline: 'Pickup Contents',
      items: [
        {
          id: 'profile',
          title: 'Corporate Profile',
          subTitle: '会社情報・概要',
          link: '/overview',
          image: '/images/pickup/pickup_1.webp'
        },
        {
          id: 'leadership',
          title: 'Greetings',
          subTitle: '役員メッセージ',
          link: '/greeting',
          image: '/images/pickup/pickup_2.webp'
        },
        {
          id: 'services',
          title: 'Services & Products',
          subTitle: '事業・取扱商品',
          link: '/service',
          image: '/images/pickup/pickup_4.webp'
        },
        {
          id: 'brochure',
          title: 'Corporate Brochure',
          subTitle: '会社紹介書 (PDF)',
          link: '/downloads/会社紹介書.pdf',
          downloadName: '会社紹介書.pdf',
          isDownload: true,
          image: '/images/pickup/pickup_5.webp'
        }
      ]
    },
    cta: {
      title: 'AZAMINOとともに、新たなビジネスの可能性を拓きませんか。',
      desc: '輸出入取引、販売代理店、アライアンスに関するご相談は、お気軽にお問い合わせください。',
      btnInquiry: 'お問い合わせ',
      btnLocation: 'アクセス'
    }
  },
  en: {
    slides: [
      {
        id: 1,
        category: 'GLOBAL INNOVATION',
        keyword: 'Connecting Worlds,',
        mainTitle: 'Creating Lasting Value.',
        description: 'AZAMINO bridges Korea and Japan to co-create sustainable business opportunities.',
        link: 'information',
        image: '/images/main/slide-main-tokyo.jpg'
      },
      {
        id: 2,
        category: 'WELLNESS & NUTRITION',
        keyword: 'Care Food Solutions,',
        mainTitle: 'Dedicated to Healthy, Fulfilling Lives',
        description: 'Delivering premium specialized nutrition products designed for senior well-being.',
        link: 'food',
        image: '/images/main/slide-main-healthyfood.jpg'
      },
      {
        id: 3,
        category: 'SAFETY & SECURITY',
        keyword: 'Asset Protection,',
        mainTitle: 'Proven Fireproof & Security Safes',
        description: 'Protecting vital assets and confidential records against fire, theft, and natural disasters.',
        link: 'money',
        image: '/images/main/slide-main-money.png'
      },
      {
        id: 4,
        category: 'ADVANCED CHEMICALS',
        keyword: 'Industrial Innovation,',
        mainTitle: 'Specialty Chemicals for Advanced Industry',
        description: 'Providing functional raw materials and specialty chemicals essential for high-tech manufacturing.',
        link: 'chemical',
        image: '/images/main/slide-main-chemical.png'
      },
      {
        id: 5,
        category: 'GLOBAL TRADING NETWORK',
        keyword: '360° Trade Solutions,',
        mainTitle: 'Connecting Optimized Global Supply Chains',
        description: 'Comprehensive one-stop trade, logistics, and distribution that empower our clients.',
        link: 'service',
        video: '/videos/azamino-graph.mp4'
      }
    ],
    topics: {
      date: '2026.10.15',
      title: 'AZAMINO Launches Renewed Corporate Platform and Business Divisions',
      btnText: 'View All News',
      link: '/contact'
    },
    about: {
      headline: 'Connecting Korea and Japan with Integrity, Insight, and Precision.',
      desc1: 'AZAMINO Inc. is a premier cross-border trading and business solutions provider rooted in profound bilateral expertise between Korea and Japan.',
      desc2: 'Across care food, fireproof safes, lifestyle goods, and specialty chemicals, we deliver tangible, enduring value that moves industries forward.',
      ctaText: 'About Our Company',
      pillars: [
        {
          num: '01',
          title: 'Global Synergy',
          desc: 'Harnessing the specialized competencies of both nations to engineer seamless supply chains.'
        },
        {
          num: '02',
          title: 'Strict Quality Assurance',
          desc: 'Procuring and distributing only certified products that comply with rigorous international benchmarks.'
        },
        {
          num: '03',
          title: 'Sustainable Partnership',
          desc: 'Committed to fostering long-term mutual growth alongside our clients and global partners.'
        }
      ]
    },
    business: {
              headline: 'Discover Our Global Operations',
              items: [
                {
                  id: 'food',
                  badge: 'CARE FOOD',
                  title: 'Innovation',
                  desc: 'Creating new value beyond simple connectivity.',
                  image: '/images/main/slide-main-healthyfood.jpeg',
                },
                {
                  id: 'money',
                  badge: 'SECURITY',
                  title: 'Sustainability',
                  desc: 'Our innovation is the foundation of steady growth.',
                  image: '/images/main/slide-main-money.png',
                },
                {
                  id: 'product',
                  badge: 'LIFESTYLE',
                  title: 'Trust',
                  desc: 'A network built on trust, proven by flawless execution.',
                  image: '/images/main/slide-main-tokyo.jpg',
                },
              ]
            },
    feature: {
      headline: 'Data-Driven Trade Solutions and AZAMINO’s Global Vision',
      desc: 'From rapid customs clearance to strict quality audits and safe warehousing, we unify cross-border trade seamlessly.',
      ctaText: 'Explore Trade Solutions',
      stats: [
        { val: '360°', label: 'One-Stop Trading' },
        { val: '100%', label: 'Strict Verification' },
        { val: '24/7', label: 'Global Network' }
      ]
    },
    pickup: {
      headline: 'Pickup Contents',
      items: [
        {
          id: 'profile',
          title: 'Corporate Profile',
          subTitle: 'Philosophy & Overview',
          link: '/overview',
          image: '/images/pickup/pickup_1.webp'
        },
        {
          id: 'leadership',
          title: 'Greetings',
          subTitle: 'Executive Message',
          link: '/greeting',
          image: '/images/pickup/pickup_2.webp'
        },
        {
          id: 'services',
          title: 'Services & Products',
          subTitle: 'Business Divisions',
          link: '/service',
          image: '/images/pickup/pickup_4.webp'
        },
        {
          id: 'brochure',
          title: 'Corporate Brochure',
          subTitle: 'Company Brochure (PDF)',
          link: '/downloads/会社紹介書.pdf',
          downloadName: '会社紹介書.pdf',
          isDownload: true,
          image: '/images/pickup/pickup_5.webp'
        }
      ]
    },
    cta: {
      title: 'Partner with AZAMINO to Pioneer New Horizons.',
      desc: 'Our specialized team is ready to consult on imports, distribution partnerships, and new trade initiatives.',
      btnInquiry: 'Contact Us',
      btnLocation: 'Office Locations'
    }
  }
};

const currentContent = computed(() => {
  return mainPageData[currentLang.value] || mainPageData.ko;
});
</script>

<style scoped>
.mitsui-style-main-view {
  width: 100%;
  background-color: #ffffff;
  color: #1e293b;
  font-family: 'Plus Jakarta Sans', 'Noto Sans KR', -apple-system, sans-serif;
  overflow-x: clip;
}

/* ==========================================================================
   2. 신착 정보 / 퀵 토픽 바
   ========================================================================== */
.quick-topics-section {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 0;
}

.topics-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.topics-left-label {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.topics-badge {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #0284c7;
  background-color: #e0f2fe;
  padding: 3px 9px;
  border-radius: 4px;
}

.topics-date {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  font-feature-settings: "tnum";
}

.topics-title-link {
  flex: 1;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.topics-headline {
  font-size: 14.5px;
  color: #1e293b;
  font-weight: 500;
  transition: color 0.2s ease;
}

.topics-title-link:hover .topics-headline {
  color: #0284c7;
}

.topics-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #0284c7;
  text-decoration: none;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.topics-more-btn svg {
  width: 14px;
  height: 14px;
}

.topics-more-btn:hover {
  transform: translateX(3px);
}

/* ==========================================================================
   섹션 공통 탑 인디케이터 (01 / ABOUT AZAMINO 스타일)
   ========================================================================== */
.section-top-indicator {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.sec-index {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #0284c7;
  font-feature-settings: "tnum";
}

.sec-label {
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #64748b;
  text-transform: uppercase;
}

/* ==========================================================================
   3. ABOUT AZAMINO 섹션
   ========================================================================== */
.mitsui-about-section {
  padding: 110px 0 100px;
  background-color: #ffffff;
}

.about-grid-layout {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 70px;
  align-items: flex-start;
}

.about-main-headline {
  font-size: clamp(28px, 3.4vw, 44px);
  font-weight: 800;
  color: #0b192c;
  line-height: 1.28;
  letter-spacing: -0.02em;
  margin-bottom: 28px;
  word-break: keep-all;
}

.about-body-text {
  font-size: 16px;
  color: #475569;
  line-height: 1.75;
  margin-bottom: 16px;
  word-break: keep-all;
}

.about-body-text.secondary {
  color: #64748b;
  margin-bottom: 36px;
}

.about-cta-action {
  display: flex;
}

.mitsui-arrow-btn {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 14px 28px;
  background-color: #0b2545;
  color: #ffffff;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(11, 37, 69, 0.2);
}

.arrow-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 14px;
  line-height: 1;
  transition: transform 0.25s ease;
}

.mitsui-arrow-btn:hover {
  background-color: #0284c7;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(2, 132, 199, 0.35);
}

.mitsui-arrow-btn:hover .arrow-circle {
  transform: translateX(4px);
}

/* 필러 카드 */
.about-pillars-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pillar-feature-card {
  display: flex;
  gap: 24px;
  padding: 26px 28px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  transition: all 0.25s ease;
}

.pillar-feature-card:hover {
  background-color: #ffffff;
  border-color: #38bdf8;
  box-shadow: 0 10px 25px rgba(2, 132, 199, 0.08);
  transform: translateY(-3px);
}

.pillar-num-tag {
  font-size: 20px;
  font-weight: 800;
  color: #0284c7;
  line-height: 1;
  font-feature-settings: "tnum";
}

.pillar-title {
  font-size: 17px;
  font-weight: 700;
  color: #0b192c;
  margin-bottom: 6px;
}

.pillar-desc {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  word-break: keep-all;
}

/* ==========================================================================
   4. BUSINESS DIVISIONS 섹션 (미쓰이 스타일 가로형 로우 레이아웃)
   ========================================================================== */
.mitsui-business-section {
  padding: 90px 0 110px;
  background-color: #f6f6f6;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}

.mitsui-business-section .container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
  box-sizing: border-box;
}

.sec-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 44px;
  gap: 30px;
}

.sec-headline {
  font-size: clamp(30px, 3.2vw, 40px);
  font-weight: 700;
  color: #111111;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.sec-sub-desc {
  font-size: 15px;
  color: #64748b;
  margin-top: 8px;
}

.sec-view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #111111;
  text-decoration: none;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.sec-view-all-link svg {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.sec-view-all-link:hover {
  color: #0284c7;
}

.sec-view-all-link:hover svg {
  transform: translateX(4px);
}

/* 미쓰이 스타일 가로 분할 리스트 */
.business-rows-list {
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.biz-row-item {
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  transition: background-color 0.25s ease;
}

.biz-row-item:hover {
  background-color: rgba(0, 0, 0, 0.015);
}

.biz-row-link {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 56px 0;
  text-decoration: none;
  color: inherit;
  gap: 60px;
}

.biz-row-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-height: 290px;
}

.biz-row-title-wrap {
  margin-bottom: 24px;
}

.biz-row-title {
  font-size: clamp(34px, 3.2vw, 44px);
  font-weight: 600;
  color: #111111;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0;
  transition: color 0.25s ease;
}

.biz-row-subtitle {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #888888;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 8px;
}

.biz-row-desc {
  font-size: 16px;
  color: #333333;
  line-height: 1.7;
  max-width: 640px;
  margin: 0;
  word-break: keep-all;
}

.biz-row-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.biz-row-img-wrap {
  width: 520px;
  height: 310px;
  overflow: hidden;
  border-radius: 0;
  background-color: #e5e5e5;
  flex-shrink: 0;
}

.biz-row-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.biz-row-item:hover .biz-row-img {
  transform: scale(1.03);
}

/* ==========================================================================
   5. 스페셜 피처 비디오 섹션
   ========================================================================== */
.mitsui-feature-section {
  padding: 100px 0;
  background-color: #ffffff;
}

.feature-card-wrapper {
  background: #0b192c;
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  color: #ffffff;
  box-shadow: 0 20px 48px rgba(11, 25, 44, 0.18);
}

.feature-video-col {
  position: relative;
  min-height: 380px;
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.feature-video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-accent-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  color: #38bdf8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  padding: 5px 12px;
  border-radius: 4px;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.feature-text-col {
  padding: 56px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.feature-sub-tag {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: #38bdf8;
  margin-bottom: 12px;
}

.feature-headline {
  font-size: clamp(24px, 2.6vw, 34px);
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 18px;
  letter-spacing: -0.02em;
  word-break: keep-all;
}

.feature-desc {
  font-size: 15px;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 32px;
  word-break: keep-all;
}

.feature-stats-row {
  display: flex;
  gap: 36px;
  margin-bottom: 36px;
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 26px;
  font-weight: 900;
  color: #38bdf8;
  line-height: 1.1;
  font-feature-settings: "tnum";
}

.stat-label {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
}

.feature-btn-wrap {
  display: flex;
}

.mitsui-solid-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 13px 28px;
  background-color: #0284c7;
  color: #ffffff;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
}

.mitsui-solid-btn svg {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.mitsui-solid-btn:hover {
  background-color: #38bdf8;
  color: #0b192c;
  transform: translateY(-2px);
}

.mitsui-solid-btn:hover svg {
  transform: translateX(4px);
}

/* ==========================================================================
   6. Pickup Contents 섹션 (균형 잡힌 4개 카드 가로 그리드)
   ========================================================================== */
.mitsui-pickup-section {
  padding: 80px 0 110px;
  background-color: #ffffff;
}

.mitsui-pickup-section .container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
  box-sizing: border-box;
}

.pickup-top-divider {
  width: 100%;
  height: 1px;
  background-color: #222222;
  margin-bottom: 36px;
}

.pickup-header-row {
  margin-bottom: 28px;
}

.pickup-headline {
  font-size: 32px;
  font-weight: 700;
  color: #111111;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0;
  font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
}

.pickup-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.pickup-card {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background-color: #1a1a1a;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.pickup-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.18);
}

.pickup-card-link {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  text-decoration: none;
}

.pickup-img-box {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 3.8;
  overflow: hidden;
  background-color: #0b1523;
}

.pickup-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.pickup-card:hover .pickup-img {
  transform: scale(1.08);
}

/* 어두운 그라데이션 오버레이로 하단 텍스트 및 화살표 가독성 극대화 */
.pickup-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.45) 60%, rgba(0, 0, 0, 0.88) 100%);
  transition: background 0.3s ease;
}

.pickup-card:hover .pickup-scrim {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.5) 55%, rgba(0, 0, 0, 0.92) 100%);
}

.pickup-card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 24px 20px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  box-sizing: border-box;
  z-index: 2;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.pickup-card:hover .pickup-card-content {
  transform: translateY(-6px);
}

.pickup-title-wrap {
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.pickup-card:hover .pickup-title-wrap {
  transform: translateY(-2px);
}

.pickup-card-title {
  font-size: 19px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.35;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  transition: color 0.25s ease, transform 0.25s ease;
}

.pickup-card:hover .pickup-card-title {
  color: #60a5fa;
}

.biz-row-desc {
  font-size: 16px;
  color: #333333;
  line-height: 1.7;
  max-width: 640px;
  margin: 0;
  word-break: keep-all;
  transition: transform 0.3s ease, color 0.3s ease;
}

.biz-row-item:hover .biz-row-desc {
  transform: translateX(4px);
  color: #111827;
}

.biz-row-item:hover .biz-row-title {
  color: #004098;
  transform: translateX(4px);
}

.pickup-title-wrap {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.pickup-card-title {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  letter-spacing: -0.01em;
  word-break: keep-all;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

.pickup-card-sub {
  display: block;
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.82);
  margin-top: 5px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

/* 우측 하단 원형 화살표 뱃지 */
.pickup-arrow-badge {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  transition: all 0.25s ease;
  margin-bottom: 2px;
}

.pickup-arrow-svg {
  width: 13px;
  height: 13px;
  transition: transform 0.25s ease;
}

.pickup-card:hover .pickup-arrow-badge {
  background-color: #ffffff;
  color: #000000;
  border-color: #ffffff;
  transform: translateX(2px);
}

.pickup-card:hover .pickup-arrow-svg {
  transform: translateX(1px);
}

.pickup-card:hover .pickup-arrow-badge {
  background-color: #ffffff;
  color: #000000;
  border-color: #ffffff;
  transform: translateX(2px);
}

.pickup-card:hover .pickup-arrow-svg {
  transform: translateX(1px);
}

/* ==========================================================================
   7. 컨택트 CTA 배너 섹션
   ========================================================================== */
.mitsui-cta-section {
  padding: 0 0 110px;
  background-color: #f8fafc;
}

.cta-banner-box {
  background: linear-gradient(135deg, #07192f 0%, #0b2545 60%, #134074 100%);
  border-radius: 20px;
  padding: 64px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  color: #ffffff;
  box-shadow: 0 20px 40px rgba(11, 37, 69, 0.2);
}

.cta-category {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.16em;
  color: #38bdf8;
  margin-bottom: 10px;
  display: block;
}

.cta-title {
  font-size: clamp(24px, 2.6vw, 34px);
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}

.cta-desc {
  font-size: 15px;
  color: #cbd5e1;
  line-height: 1.6;
}

.cta-buttons-group {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.cta-primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 30px;
  background-color: #38bdf8;
  color: #0b192c;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 6px 16px rgba(56, 189, 248, 0.35);
}

.cta-primary-btn svg {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.cta-primary-btn:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.4);
}

.cta-primary-btn:hover svg {
  transform: translateX(4px);
}

.cta-secondary-btn {
  display: inline-flex;
  align-items: center;
  padding: 14px 26px;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
}

.cta-secondary-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: #ffffff;
}

/* ==========================================================================
   반응형 브레이크포인트
   ========================================================================== */
@media (max-width: 1200px) {
  .biz-row-img-wrap {
    width: 440px;
    height: 260px;
  }
  .biz-row-left {
    min-height: 260px;
  }
}

@media (max-width: 1024px) {
  .biz-row-img-wrap {
    width: 360px;
    height: 220px;
  }
  .biz-row-left {
    min-height: 220px;
  }
  .biz-row-link {
    gap: 36px;
    padding: 40px 0;
  }
  .biz-row-title {
    font-size: 32px;
  }
  .biz-row-desc {
    font-size: 15px;
  }
}

@media (max-width: 992px) {
  .about-grid-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .feature-card-wrapper {
    grid-template-columns: 1fr;
  }
  .feature-video-col {
    min-height: 280px;
  }
  .feature-text-col {
    padding: 40px 30px;
  }
  .cta-banner-box {
    flex-direction: column;
    align-items: flex-start;
    padding: 44px 36px;
  }
  .cta-buttons-group {
    width: 100%;
    flex-wrap: wrap;
  }
}

@media (max-width: 1100px) {
  .pickup-cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .mitsui-about-section,
  .mitsui-business-section,
  .mitsui-feature-section,
  .mitsui-pickup-section {
    padding: 60px 0;
  }
  .topics-bar-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .sec-header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 30px;
  }
  .biz-row-link {
    flex-direction: column;
    padding: 32px 0;
    gap: 20px;
  }
  .biz-row-left {
    min-height: auto;
    gap: 14px;
  }
  .biz-row-title {
    font-size: 28px;
  }
  .biz-row-desc {
    font-size: 15px;
    max-width: 100%;
  }
  .biz-row-img-wrap {
    width: 100%;
    height: 230px;
  }
  .pickup-headline {
    font-size: 26px;
  }
  .feature-stats-row {
    gap: 20px;
  }
}

@media (max-width: 600px) {
  .pickup-cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
