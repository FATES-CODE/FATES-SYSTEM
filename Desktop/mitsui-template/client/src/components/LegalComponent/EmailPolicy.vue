<template>
  <SubPageLayout
    :category-title="pageMeta.categoryTitle"
    :category-en="pageMeta.categoryEn"
    :page-title="pageMeta.pageTitle"
    :hide-hero="true"
  >
    <div class="legal-mitsui-page">
      <!-- 페이지 타이틀 -->
      <h1 class="legal-page-heading">{{ pageMeta.pageTitle }}</h1>

      <!-- 인라인 내비게이션 -->
      <nav class="legal-inline-nav">
        <template v-for="(tab, idx) in legalTabs" :key="idx">
          <router-link 
            :to="tab.url" 
            class="legal-nav-link"
            :class="{ 'is-current': tab.url === '/email-policy' }"
          >{{ tab.name }}</router-link>
          <span v-if="idx < legalTabs.length - 1" class="legal-nav-sep">｜</span>
        </template>
      </nav>

      <!-- 서문 -->
      <p class="legal-intro-text">{{ pageMeta.intro }}</p>

      <!-- 조항 목록 -->
      <div class="legal-articles">
        <section 
          v-for="(article, idx) in pageMeta.articles" 
          :key="idx" 
          class="legal-article"
        >
          <h3 class="legal-article-title">{{ article.title }}</h3>
          <div class="legal-article-body">
            <p v-for="(p, pIdx) in article.paragraphs" :key="pIdx">{{ p }}</p>
          </div>
        </section>
      </div>

      <!-- 하단 제정일 -->
      <div class="legal-enactment">
        <p>{{ pageMeta.enactment }}</p>
      </div>

      <!-- 문의처 -->
      <section class="legal-contact-section" v-if="pageMeta.contactTitle">
        <h2 class="legal-sub-heading">{{ pageMeta.contactTitle }}</h2>
        <p class="legal-contact-desc">{{ pageMeta.contactDesc }}</p>
        <div class="legal-contact-line"></div>
        <div class="legal-contact-info">
          <router-link to="/quiry" class="legal-inquiry-link">{{ pageMeta.contactLinkText }}</router-link>
        </div>
      </section>
    </div>
  </SubPageLayout>
</template>

<script setup>
import { computed } from 'vue';
import SubPageLayout from '../common/SubPageLayout.vue';
import { currentLang } from '../../composables/useLanguage.js';

const legalTabs = computed(() => {
  if (currentLang.value === 'ja') {
    return [
      { name: '利用規約', url: '/terms' },
      { name: '個人情報保護方針', url: '/privacy' },
      { name: 'メール無断収集拒否', url: '/email-policy' }
    ];
  } else if (currentLang.value === 'en') {
    return [
      { name: 'Terms of Use', url: '/terms' },
      { name: 'Privacy Policy', url: '/privacy' },
      { name: 'Email Policy', url: '/email-policy' }
    ];
  }
  return [
    { name: '이용약관', url: '/terms' },
    { name: '개인정보처리방침', url: '/privacy' },
    { name: '이메일무단수집거부', url: '/email-policy' }
  ];
});

const pageMeta = computed(() => {
  if (currentLang.value === 'ja') {
    return {
      categoryTitle: 'ポリシー・規約',
      categoryEn: 'POLICY & TERMS',
      pageTitle: 'メールアドレス無断収集拒否',
      intro: 'AZAMINO株式会社（以下「当社」）は、本ウェブサイトに掲載されている電子メールアドレスの無断収集および迷惑メールの送信を固くお断りいたします。',
      articles: [
        {
          title: '1.メールアドレスの無断収集の禁止',
          paragraphs: [
            '本ウェブサイトに掲載されているいかなるメールアドレスも、当社の事前承諾なく、電子メール収集ソフトウェアその他の技術的手段により収集することを禁じます。',
            'これを不正に収集し、営業・広告宣伝・勧誘その他の目的で迷惑メール（スパムメール）を送信する行為は固く禁止いたします。'
          ]
        },
        {
          title: '2.違反時の対応',
          paragraphs: [
            '無断収集および迷惑メールの送信が確認された場合、関係法令（特定電子メールの送信の適正化等に関する法律等）に基づき、しかるべき法的措置を講じることがあります。'
          ]
        }
      ],
      enactment: '制定日：2024年1月24日\nAZAMINO株式会社',
      contactTitle: 'その他、当社商品、サービスに関するお問い合わせ先',
      contactDesc: '下記の「お問い合わせ」ページをご覧ください。',
      contactLinkText: 'お問い合わせ'
    };
  } else if (currentLang.value === 'en') {
    return {
      categoryTitle: 'Policy & Terms',
      categoryEn: 'POLICY & TERMS',
      pageTitle: 'Unauthorized Email Collection',
      intro: 'AZAMINO Inc. strictly prohibits the unauthorized collection of email addresses published on this website using automated crawlers or scraping tools.',
      articles: [
        {
          title: '1. Prohibition of Unauthorized Extraction',
          paragraphs: [
            'No email address listed on this website may be extracted or harvested using email collection programs, automated bots, or technical utilities without prior explicit consent.',
            'Transmission of unsolicited commercial communications (spam) to any harvested address will result in technical blocking and legal action.'
          ]
        },
        {
          title: '2. Legal Recourse and Penalties',
          paragraphs: [
            'Any violation may lead to civil injunctions and criminal complaints under relevant telecommunications and cyber protection statutes.'
          ]
        }
      ],
      enactment: 'Enacted: January 24, 2024\nAZAMINO Inc.',
      contactTitle: 'Inquiries about our products and services',
      contactDesc: 'Please visit our Inquiry page below.',
      contactLinkText: 'Contact Us'
    };
  }

  return {
    categoryTitle: '이용안내 및 정책',
    categoryEn: 'POLICY & TERMS',
    pageTitle: '이메일무단수집거부',
    intro: 'AZAMINO Inc.는 본 웹사이트에 게재된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 전면 거부합니다.',
    articles: [
      {
        title: '1.이메일 주소의 기술적 수집 거부',
        paragraphs: [
          '본 웹사이트에 명시된 대표 이메일 및 임직원 이메일 주소는 고객 상담 및 비즈니스 문의를 위한 목적으로만 공개된 것입니다.',
          '당사의 사전 동의 없이 이메일 추출 소프트웨어, 웹 크롤러 등 자동화된 기술적 장치를 활용하여 이메일 주소를 무단 수집하는 행위를 엄격히 금지합니다.'
        ]
      },
      {
        title: '2.스팸 메일 발송 및 상업적 악용 금지',
        paragraphs: [
          '무단 수집된 이메일 주소를 이용하여 영리 목적의 광고성 정보(스팸 메일)를 전송하거나 제3자에게 판매·배포하는 행위를 일체 불허합니다.'
        ]
      },
      {
        title: '3.위반 시 관련 법령에 따른 법적 처벌 안내',
        paragraphs: [
          '이를 위반하여 이메일 주소를 무단 수집하거나 광고성 정보를 전송할 경우, 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』 제50조의 2, 제50조의 7 등에 의거하여 1천만원 이하의 벌금형 또는 형사 처벌을 받을 수 있음을 엄중히 안내드립니다.'
        ]
      }
    ],
    enactment: '게시일자: 2024년 1월 24일\nAZAMINO Inc.',
    contactTitle: '기타 당사 상품 및 서비스 관련 문의처',
    contactDesc: '아래 「온라인 문의」 페이지를 이용해 주시기 바랍니다.',
    contactLinkText: '온라인 문의'
  };
});
</script>

<style scoped>
.legal-mitsui-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 50px 20px 80px;
  font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
  color: #333;
}

.legal-page-heading {
  font-size: 32px;
  font-weight: 800;
  color: #111;
  margin: 0 0 28px;
  line-height: 1.3;
}

/* 인라인 내비게이션 */
.legal-inline-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0;
  margin-bottom: 36px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
  line-height: 2;
}

.legal-nav-link {
  font-size: 14px;
  color: #555;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.legal-nav-link:hover {
  color: #004098;
}

.legal-nav-link.is-current {
  color: #111;
  font-weight: 700;
  text-decoration: none;
}

.legal-nav-sep {
  color: #ccc;
  margin: 0 10px;
  font-size: 13px;
  user-select: none;
}

/* 서문 */
.legal-intro-text {
  font-size: 15px;
  line-height: 1.9;
  color: #555;
  margin: 0 0 40px;
}

/* 조항 */
.legal-articles {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.legal-article {
  padding-bottom: 28px;
  border-bottom: 1px solid #eee;
}

.legal-article:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.legal-article-title {
  font-size: 16px;
  font-weight: 700;
  color: #111;
  margin: 0 0 12px;
  line-height: 1.5;
}

.legal-article-body p {
  font-size: 15px;
  line-height: 1.85;
  color: #444;
  margin: 0 0 8px;
}

.legal-article-body p:last-child {
  margin-bottom: 0;
}

/* 하단 제정일 */
.legal-enactment {
  margin-top: 48px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  text-align: right;
}

.legal-enactment p {
  font-size: 14px;
  color: #888;
  margin: 0;
  white-space: pre-line;
  line-height: 1.6;
}

/* 하위 섹션 / 문의처 */
.legal-contact-section {
  margin-top: 64px;
}

.legal-sub-heading {
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin: 0 0 16px;
  line-height: 1.4;
}

.legal-contact-desc {
  font-size: 15px;
  line-height: 1.85;
  color: #555;
  margin: 0 0 20px;
}

.legal-contact-line {
  width: 40px;
  height: 1px;
  background: #999;
  margin-bottom: 16px;
}

.legal-contact-info p {
  font-size: 14px;
  color: #444;
  margin: 4px 0;
  line-height: 1.7;
}

.legal-inquiry-link {
  font-size: 15px;
  color: #555;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.legal-inquiry-link:hover {
  color: #004098;
}

@media (max-width: 768px) {
  .legal-page-heading {
    font-size: 24px;
  }
  .legal-mitsui-page {
    padding: 32px 16px 60px;
  }
  .legal-sub-heading {
    font-size: 20px;
  }
}
</style>
