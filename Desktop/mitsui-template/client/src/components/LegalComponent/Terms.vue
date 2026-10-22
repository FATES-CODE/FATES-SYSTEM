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

      <!-- 인라인 내비게이션 (버튼X, 텍스트 링크) -->
      <nav class="legal-inline-nav">
        <template v-for="(tab, idx) in legalTabs" :key="idx">
          <router-link 
            :to="tab.url" 
            class="legal-nav-link"
            :class="{ 'is-current': tab.url === '/terms' }"
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
      pageTitle: '利用規約',
      intro: 'AZAMINO株式会社（以下「当社」）の公式ウェブサイトをご利用いただき、誠にありがとうございます。本ウェブサイトをご利用されるにあたり、以下の利用条件をよくお読みいただき、同意の上ご利用いただきますようお願い申し上げます。',
      articles: [
        {
          title: '1.著作権および知的財産権',
          paragraphs: [
            '本ウェブサイトに掲載されている文章、画像、デザイン、ロゴマーク、プログラム等の著作権およびその他知的財産権は、当社または正当な権利を有する第三者に帰属します。',
            '利用者は、私的使用その他法律によって明示的に認められる範囲を超えて、これらを無断で複製、転送、改変、配布することはできません。'
          ]
        },
        {
          title: '2.免責事項',
          paragraphs: [
            '当社は、本ウェブサイトに情報を掲載するにあたり細心の注意を払っておりますが、その正確性、有用性、確実性についてはいかなる保証も行うものではありません。',
            '本ウェブサイトの利用または利用不能により生じた一切の損害について、当社は法律に別段の定めがある場合を除き、責任を負いません。'
          ]
        },
        {
          title: '3.リンクについて',
          paragraphs: [
            '本ウェブサイトへのリンクは原則として自由ですが、公序良俗に反するサイトや当社の信用を毀損する恐れのあるサイトからのリンクはお断りいたします。'
          ]
        },
        {
          title: '4.準拠法および管轄裁判所',
          paragraphs: [
            '本ウェブサイトの利用ならびに本利用条件の解釈および適用は、別段の定めがない限り、日本法に準拠するものとします。また、本ウェブサイトに関わる一切の紛争については、東京地方裁判所を専属的合意管轄裁判所とします。'
          ]
        }
      ],
      enactment: '制定日：2024年1月24日\nAZAMINO株式会社'
    };
  } else if (currentLang.value === 'en') {
    return {
      categoryTitle: 'Policy & Terms',
      categoryEn: 'POLICY & TERMS',
      pageTitle: 'Terms of Use',
      intro: 'Thank you for visiting the official website of AZAMINO Inc. (hereinafter referred to as "the Company"). Please read these Terms of Use carefully before accessing or using this website.',
      articles: [
        {
          title: '1. Copyright and Intellectual Property Rights',
          paragraphs: [
            'All text, graphics, logos, images, and software on this website are the property of the Company or its content suppliers and are protected by applicable intellectual property laws.',
            'You may not reproduce, distribute, modify, or create derivative works without prior written consent from the Company.'
          ]
        },
        {
          title: '2. Disclaimer',
          paragraphs: [
            'While the Company endeavors to maintain the accuracy of all information on this website, we make no representations or warranties of any kind regarding completeness, accuracy, or suitability.',
            'The Company shall not be liable for any direct or indirect damages arising out of the use or inability to use this website.'
          ]
        },
        {
          title: '3. Prohibited Actions',
          paragraphs: [
            'Users must not violate applicable laws, infringe upon intellectual property, or conduct unauthorized attempts to access or disrupt our systems and services.'
          ]
        },
        {
          title: '4. Governing Law and Jurisdiction',
          paragraphs: [
            'These Terms of Use shall be governed by and construed in accordance with the laws of Japan. Any disputes arising in connection with this website shall be submitted to the exclusive jurisdiction of the Tokyo District Court.'
          ]
        }
      ],
      enactment: 'Enacted: January 24, 2024\nAZAMINO Inc.'
    };
  }

  return {
    categoryTitle: '이용안내 및 정책',
    categoryEn: 'POLICY & TERMS',
    pageTitle: '이용약관',
    intro: 'AZAMINO Inc.(이하 "회사")의 공식 웹사이트를 방문해 주셔서 감사합니다. 본 웹사이트를 이용하시기 전에 아래의 이용 조건을 주의 깊게 확인하시고 동의하여 주시기 바랍니다.',
    articles: [
      {
        title: '1.목적 및 적용 범위',
        paragraphs: [
          '본 약관은 회사가 운영하는 공식 웹사이트(이하 "사이트")의 제반 서비스 이용에 있어 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
          '이용자가 본 사이트를 계속하여 이용하는 경우 본 약관의 내용을 충분히 숙지하고 동의한 것으로 간주합니다.'
        ]
      },
      {
        title: '2.저작권 및 지적재산권',
        paragraphs: [
          '본 사이트에 게재된 모든 텍스트, 이미지, 영상, CI/BI 로고, 제품 디자인 및 소프트웨어의 저작권과 지적재산권은 회사 및 해당 정당 권리자에게 귀속됩니다.',
          '이용자는 회사의 사전 서면 승낙 없이 본 사이트의 정보를 무단 복제, 전송, 출판, 배포, 기타 영리 목적으로 이용하거나 제3자에게 제공할 수 없습니다.'
        ]
      },
      {
        title: '3.서비스 제공 및 면책',
        paragraphs: [
          '회사는 최신의 정확한 정보를 제공하기 위해 최선을 다하나, 사이트에 포함된 정보의 완전성, 신뢰성에 대해 보증하지 아니하며 기술적 오류나 예기치 않은 시스템 중단에 대해 고의 또는 중과실이 없는 한 책임을 지지 않습니다.',
          '회사는 사전 공지 후 사이트의 내용이나 서비스를 변경하거나 운영을 중단할 수 있습니다.'
        ]
      },
      {
        title: '4.준거법 및 관할법원',
        paragraphs: [
          '본 약관 및 사이트 이용과 관련한 모든 분쟁에 대해서는 대한민국 법령을 준거법으로 하며, 분쟁 발생 시 회사의 본점 소재지를 관할하는 법원을 전속 관할법원으로 합니다.'
        ]
      }
    ],
    enactment: '제정일자: 2024년 1월 24일\nAZAMINO Inc.'
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

@media (max-width: 768px) {
  .legal-page-heading {
    font-size: 24px;
  }
  .legal-mitsui-page {
    padding: 32px 16px 60px;
  }
}
</style>
