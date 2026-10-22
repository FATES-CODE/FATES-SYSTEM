<template>
  <SubPageLayout
    :category-title="pageMeta.categoryTitle"
    :category-en="pageMeta.categoryEn"
    :page-title="pageMeta.pageTitle"
    :hide-hero="true"
  >
    <div class="legal-mitsui-page">
      <h1 class="legal-page-heading">{{ pageMeta.pageTitle }}</h1>

      <nav class="legal-inline-nav">
        <template v-for="(tab, idx) in legalTabs" :key="idx">
          <router-link 
            :to="tab.url" 
            class="legal-nav-link"
            :class="{ 'is-current': tab.url === '/privacy' }"
          >{{ tab.name }}</router-link>
          <span v-if="idx < legalTabs.length - 1" class="legal-nav-sep">｜</span>
        </template>
      </nav>

      <p class="legal-intro-text">{{ pageMeta.intro }}</p>
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

      <div class="legal-enactment">
        <p>{{ pageMeta.enactment }}</p>
      </div>

      <div class="legal-sub-sections">
        <section class="legal-sub-section" v-for="(sub, sIdx) in pageMeta.subSections" :key="sIdx">
          <h2 class="legal-sub-heading">{{ sub.heading }}</h2>
          <div class="legal-sub-body" v-if="sub.body">
            <p v-for="(p, pIdx) in sub.body" :key="pIdx">{{ p }}</p>
          </div>
        </section>
      </div>

      <section class="legal-contact-section" v-if="pageMeta.contactTitle">
        <h2 class="legal-sub-heading">{{ pageMeta.contactTitle }}</h2>
        <p class="legal-contact-desc">{{ pageMeta.contactDesc }}</p>
        <div class="legal-contact-line"></div>
        <div class="legal-contact-info">
          <p>{{ pageMeta.contactAddr }}</p>
          <p><strong>{{ pageMeta.companyLabel }}:</strong> AZAMINO Inc.</p>
          <p><strong>{{ pageMeta.emailLabel }}:</strong> azamino.ltd@gmail.co.jp</p>
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
      pageTitle: '個人情報保護方針',
      intro: 'AZAMINO株式会社（以下「当社」）は、高度情報通信社会における個人情報の重要性を認識し、個人情報の保護に関する法令および規範を遵守し、以下の方針に基づき個人情報の適正な管理と保護に努めます。',
      articles: [
        {
          title: '1.個人情報の取得、利用、提供',
          paragraphs: [
            '当社は、適法かつ公正な手段によって、利用目的を明示した上で個人情報を取得いたします。取得した個人情報は、お問い合わせへの回答、製品およびサービスのご案内、契約の履行、その他事前に特定した目的の範囲内でのみ利用いたします。'
          ]
        },
        {
          title: '2.安全対策の実施',
          paragraphs: [
            '当社は、個人情報への不正アクセスについても、必要な安全性確保の対策を実施し、適切かつ合理的なレベルの安全対策を実施し、個人情報への不正アクセスや、個人情報の紛失、破壊、改ざん及び漏えい等の予防ならびに是正に努めます。'
          ]
        },
        {
          title: '3.個人情報の第三者提供について',
          paragraphs: [
            '当社は、法令に定める場合を除き、事前にご本人の同意を得ることなく、個人情報を第三者に開示・提供いたしません。'
          ]
        },
        {
          title: '4.法令・規範の遵守',
          paragraphs: [
            '当社は、個人情報の取扱いにおいて、個人情報保護に関して、変更するとともに、これを全従業者及び関連するグループ会社に周知させ適正に利用してまいります。'
          ]
        },
        {
          title: '5.グローバル・グループベースでの推進',
          paragraphs: [
            '当社は、グローバルベースで個人情報保護に活動を推進し、また、当社グループ全体としても同様の取り組みを推進してまいります。'
          ]
        }
      ],
      enactment: '2024年1月24日\nAZAMINO株式会社',
      subSections: [
        { heading: '個人情報の取扱いについて' },
        { heading: 'プライバシーポリシー' }
      ],
      contactTitle: 'ご本人の個人情報に関するご相談窓口',
      contactDesc: '当社は、ご本人の個人情報の取扱・管理に関する苦情または相談があった場合には、当社の確認のうえ適切に対応いたします。なお以下について個人情報保護・管理者及び個人情報に関しては、相談窓口に連絡ください。',
      contactAddr: '〒153-0051 東京都目黒区上目黒1丁目26番1号',
      companyLabel: '事業者名',
      emailLabel: 'お問い合わせ窓口'
    };
  } else if (currentLang.value === 'en') {
    return {
      categoryTitle: 'Policy & Terms',
      categoryEn: 'POLICY & TERMS',
      pageTitle: 'Privacy Policy',
      intro: 'AZAMINO Inc. (hereinafter referred to as "the Company") recognizes the importance of personal data and is committed to protecting user privacy in compliance with applicable data protection laws.',
      articles: [
        {
          title: '1. Lawful Collection of Information',
          paragraphs: [
            'The Company collects personal data by fair and lawful means, specifying the purpose of use in advance. Personal information collected is utilized strictly for customer inquiry management, fulfillment of commercial agreements, and notification regarding our products and corporate services.'
          ]
        },
        {
          title: '2. Security Safeguards',
          paragraphs: [
            'We implement reasonable organizational and technical security measures to safeguard personal data against unauthorized access, loss, alteration, or leakage.'
          ]
        },
        {
          title: '3. Provision to Third Parties',
          paragraphs: [
            'The Company does not disclose or transfer personal data to third parties without prior consent, except where required by law.'
          ]
        },
        {
          title: '4. Compliance with Laws and Regulations',
          paragraphs: [
            'We comply with all applicable laws and regulations regarding personal data protection and continuously review and improve our practices.'
          ]
        },
        {
          title: '5. Global Group-wide Commitment',
          paragraphs: [
            'We promote personal data protection on a global basis and ensure the same standards across all group companies.'
          ]
        }
      ],
      enactment: 'January 24, 2024\nAZAMINO Inc.',
      subSections: [
        { heading: 'Handling of Personal Information' },
        { heading: 'Privacy Policy' }
      ],
      contactTitle: 'Contact for Privacy Inquiries',
      contactDesc: 'If you have any questions regarding our handling of personal information, please contact our data governance office.',
      contactAddr: 'Nakameguro Atlas Tower, 1-26-1 Kamimeguro, Meguro-ku, Tokyo, Japan',
      companyLabel: 'Entity Name',
      emailLabel: 'Inquiry Email'
    };
  }

  return {
    categoryTitle: '이용안내 및 정책',
    categoryEn: 'POLICY & TERMS',
    pageTitle: '개인정보처리방침',
    intro: 'AZAMINO Inc.(이하 "당사")는 개인정보보호법 등 관련 법령을 철저히 준수하며, 정보주체의 소중한 개인정보를 안전하게 보호하고 권익을 보장하기 위해 다음과 같은 개인정보처리방침을 제정하여 운영하고 있습니다.',
    articles: [
      {
        title: '1.개인정보의 취득, 이용, 제공',
        paragraphs: [
          '회사는 적법하고 공정한 수단에 의해 이용 목적을 명시한 후 개인정보를 취득합니다. 취득한 개인정보는 문의 응대, 제품 및 서비스 안내, 계약 이행 등 사전에 특정한 목적 범위 내에서만 이용합니다.'
        ]
      },
      {
        title: '2.안전 대책의 실시',
        paragraphs: [
          '회사는 개인정보에 대한 부정 접근, 분실, 파괴, 변조 및 유출 등을 방지하기 위해 필요하고 적절한 수준의 안전 관리 조치를 실시하고, 예방 및 시정에 힘씁니다.'
        ]
      },
      {
        title: '3.개인정보의 제3자 제공',
        paragraphs: [
          '회사는 법령에서 정하는 경우를 제외하고, 사전에 본인의 동의 없이 개인정보를 외부에 개시·제공하지 않습니다.'
        ]
      },
      {
        title: '4.법령·규범의 준수',
        paragraphs: [
          '회사는 개인정보 취급에 있어 개인정보 보호에 관한 법령 및 규범을 준수하며, 이를 전 임직원 및 관련 그룹사에 주지하여 적정하게 운영해 나갑니다.'
        ]
      },
      {
        title: '5.글로벌·그룹 차원의 추진',
        paragraphs: [
          '회사는 글로벌 차원에서 개인정보 보호 활동을 추진하고, 그룹 전체적으로도 동일한 수준의 보호 노력을 기울여 나갑니다.'
        ]
      }
    ],
    enactment: '2024년 1월 24일\nAZAMINO Inc.',
    subSections: [
      { heading: '개인정보의 취급에 관하여' },
      { heading: '프라이버시 정책' }
    ],
    contactTitle: '개인정보에 관한 상담 창구',
    contactDesc: '개인정보의 취급·관리에 관한 불만 또는 상담이 있으신 경우, 확인 후 적절히 대응합니다. 아래 담당 부서로 연락해 주시기 바랍니다.',
    contactAddr: '〒153-0051 도쿄도 메구로구 카미메구로 1-26-1',
    companyLabel: '회사명',
    emailLabel: '개인정보 담당 메일'
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

/* 하위 섹션 */
.legal-sub-sections {
  margin-top: 64px;
}

.legal-sub-section {
  margin-bottom: 40px;
}

.legal-sub-heading {
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin: 0 0 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
  line-height: 1.4;
}

.legal-sub-body p {
  font-size: 15px;
  line-height: 1.85;
  color: #444;
  margin: 0 0 8px;
}

/* 문의처 */
.legal-contact-section {
  margin-top: 20px;
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
