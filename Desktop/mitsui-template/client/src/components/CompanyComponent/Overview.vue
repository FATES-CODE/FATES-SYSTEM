<template>
  <SubPageLayout
    :category-title="pageMeta.categoryTitle"
    :category-en="pageMeta.categoryEn"
    category-url="/information"
    :page-description="pageMeta.desc"
    :page-title="pageMeta.pageTitle"
    hero-image="/images/company/business-innovation.jpg"
    :tabs="companyTabs"
  >
    <div class="mitsui-philosophy-page">

      <section class="philosophy-section mission-section">
        <span class="section-label-en">Mission</span>
        <div class="section-bar"></div>
        <h2 class="section-catchphrase">{{ pageMeta.missionCatch }}</h2>
        <p class="section-desc">{{ pageMeta.missionText }}</p>
      </section>

      <section class="philosophy-section vision-section">
        <span class="section-label-en">Vision</span>
        <div class="section-bar"></div>
        <h2 class="section-catchphrase vision-catch">{{ pageMeta.visionCatch }}</h2>
        <p class="section-desc">{{ pageMeta.visionText }}</p>
      </section>

      <section class="philosophy-section values-section">
        <span class="section-label-en values-label">Values</span>
        <div class="section-bar"></div>
        <p class="values-subtitle">{{ pageMeta.valuesSubtitle }}</p>

        <div class="values-grid">
          <div 
            v-for="(val, idx) in pageMeta.valuesList" 
            :key="idx" 
            class="value-item"
          >
            <div class="value-pictogram">
              <svg v-if="idx === 0" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="20" r="10" stroke="#333" stroke-width="2.5"/>
                <line x1="60" y1="30" x2="60" y2="65" stroke="#333" stroke-width="2.5"/>
                <line x1="60" y1="42" x2="38" y2="55" stroke="#333" stroke-width="2.5"/>
                <line x1="60" y1="42" x2="82" y2="35" stroke="#333" stroke-width="2.5"/>
                <line x1="60" y1="65" x2="42" y2="90" stroke="#333" stroke-width="2.5"/>
                <line x1="60" y1="65" x2="78" y2="90" stroke="#333" stroke-width="2.5"/>
                <path d="M82 35 L95 25 L100 30" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                <polygon points="98,22 100,30 92,28" fill="#333"/>
                <path d="M20 95 C30 60, 50 85, 60 50 C70 35, 90 40, 105 30" stroke="#333" stroke-width="1.5" stroke-dasharray="4 3" fill="none"/>
              </svg>

              <svg v-else-if="idx === 1" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="35" r="9" stroke="#333" stroke-width="2.5"/>
                <line x1="35" y1="44" x2="35" y2="72" stroke="#333" stroke-width="2.5"/>
                <line x1="35" y1="54" x2="20" y2="64" stroke="#333" stroke-width="2.5"/>
                <line x1="35" y1="54" x2="50" y2="64" stroke="#333" stroke-width="2.5"/>
                <line x1="35" y1="72" x2="25" y2="95" stroke="#333" stroke-width="2.5"/>
                <line x1="35" y1="72" x2="45" y2="95" stroke="#333" stroke-width="2.5"/>
                
                <circle cx="85" cy="35" r="9" stroke="#333" stroke-width="2.5"/>
                <line x1="85" y1="44" x2="85" y2="72" stroke="#333" stroke-width="2.5"/>
                <line x1="85" y1="54" x2="70" y2="64" stroke="#333" stroke-width="2.5"/>
                <line x1="85" y1="54" x2="100" y2="64" stroke="#333" stroke-width="2.5"/>
                <line x1="85" y1="72" x2="75" y2="95" stroke="#333" stroke-width="2.5"/>
                <line x1="85" y1="72" x2="95" y2="95" stroke="#333" stroke-width="2.5"/>

                <circle cx="60" cy="22" r="9" stroke="#333" stroke-width="2.5"/>
                <line x1="60" y1="31" x2="60" y2="59" stroke="#333" stroke-width="2.5"/>
                <line x1="60" y1="41" x2="45" y2="51" stroke="#333" stroke-width="2.5"/>
                <line x1="60" y1="41" x2="75" y2="51" stroke="#333" stroke-width="2.5"/>
                <line x1="60" y1="59" x2="50" y2="82" stroke="#333" stroke-width="2.5"/>
                <line x1="60" y1="59" x2="70" y2="82" stroke="#333" stroke-width="2.5"/>
                
                <path d="M42 100 L60 90 L78 100" stroke="#333" stroke-width="1.5" stroke-dasharray="3 3" fill="none"/>
              </svg>

              <svg v-else-if="idx === 2" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="80" width="25" height="15" stroke="#333" stroke-width="2" fill="none"/>
                <rect x="40" y="65" width="25" height="30" stroke="#333" stroke-width="2" fill="none"/>
                <rect x="65" y="50" width="25" height="45" stroke="#333" stroke-width="2" fill="none"/>
                
                <circle cx="50" cy="22" r="8" stroke="#333" stroke-width="2.5"/>
                <line x1="50" y1="30" x2="50" y2="52" stroke="#333" stroke-width="2.5"/>
                <line x1="50" y1="38" x2="37" y2="48" stroke="#333" stroke-width="2.5"/>
                <line x1="50" y1="38" x2="63" y2="30" stroke="#333" stroke-width="2.5"/>
                <line x1="50" y1="52" x2="40" y2="68" stroke="#333" stroke-width="2.5"/>
                <line x1="50" y1="52" x2="60" y2="68" stroke="#333" stroke-width="2.5"/>
                
                <path d="M70 42 L80 32 L85 37" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                <polygon points="83,29 85,37 77,35" fill="#333"/>
                
                <path d="M95 50 L105 35" stroke="#333" stroke-width="1.5" stroke-dasharray="3 3"/>
                <text x="96" y="32" font-size="14" fill="#333" font-weight="600">↑</text>
              </svg>

              <svg v-else viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="28" r="9" stroke="#333" stroke-width="2.5"/>
                <line x1="35" y1="37" x2="35" y2="65" stroke="#333" stroke-width="2.5"/>
                <line x1="35" y1="65" x2="25" y2="90" stroke="#333" stroke-width="2.5"/>
                <line x1="35" y1="65" x2="45" y2="90" stroke="#333" stroke-width="2.5"/>
                <line x1="35" y1="47" x2="20" y2="57" stroke="#333" stroke-width="2.5"/>
                
                <circle cx="85" cy="28" r="9" stroke="#333" stroke-width="2.5"/>
                <line x1="85" y1="37" x2="85" y2="65" stroke="#333" stroke-width="2.5"/>
                <line x1="85" y1="65" x2="75" y2="90" stroke="#333" stroke-width="2.5"/>
                <line x1="85" y1="65" x2="95" y2="90" stroke="#333" stroke-width="2.5"/>
                <line x1="85" y1="47" x2="100" y2="57" stroke="#333" stroke-width="2.5"/>

                <!-- 악수 -->
                <line x1="35" y1="47" x2="55" y2="52" stroke="#333" stroke-width="2.5"/>
                <line x1="85" y1="47" x2="65" y2="52" stroke="#333" stroke-width="2.5"/>
                <ellipse cx="60" cy="52" rx="8" ry="5" stroke="#333" stroke-width="2" fill="none"/>
                
                <path d="M45 98 C50 94, 55 94, 60 98 C65 94, 70 94, 75 98" stroke="#333" stroke-width="1.5" fill="none"/>
              </svg>
            </div>

            <h3 class="value-title">{{ val.title }}</h3>
            <p class="value-desc">{{ val.desc }}</p>
          </div>
        </div>
      </section>

      <div class="philosophy-divider"></div>

      <section class="profile-section">
        <h3 class="profile-title">{{ pageMeta.profileTitle }}</h3>

        <div class="profile-table-wrap">
          <table class="mitsui-style-table">
            <tbody>
              <tr v-for="row in pageMeta.tableRows" :key="row.th">
                <th scope="row" style="width: 24%; vertical-align: top;">{{ row.th }}</th>
                <td>
                  <template v-if="row.isMap">
                    <div class="overview-map-box">
                      <div class="overview-map-embed">
                        <iframe
                          :src="row.mapEmbedUrl"
                          width="100%"
                          height="360"
                          style="border: 0; display: block;"
                          allowfullscreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                          title="Google Map"
                        ></iframe>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    {{ row.td }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </SubPageLayout>
</template>

<script setup>
import { computed } from 'vue';
import SubPageLayout from '../common/SubPageLayout.vue';
import { currentLang } from '../../composables/useLanguage.js';

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

const pageMeta = computed(() => {
  const mapEmbedUrl = 'https://maps.google.com/maps?q=35.633931,139.691578&t=&z=17&ie=UTF8&iwloc=&output=embed';

  if (currentLang.value === 'ja') {
    return {
      categoryTitle: '企業情報',
      categoryEn: 'COMPANY INFO',
      pageTitle: '企業理念',
      desc: 'Mission・Vision・Valuesを通じて、新たな未来価値を共創します。',
      missionCatch: '世界中の未来をつくる',
      missionText: '大切な地球と人びとの、豊かで夢あふれる明日を実現します。人と技術、グローバルなネットワークをつなぎ、持続可能な社会の繁栄に貢献します。',
      visionCatch: 'Innovation',
      visionText: '一人ひとりの「挑戦と創造」で事業を生み育て、社会課題を解決し、成長を続ける企業グループを目指します。',
      valuesSubtitle: '「挑戦と創造」を支える価値観',
      valuesList: [
        {
          title: '変革を行動で',
          desc: '私たちは、自ら動き、自ら挑み、常に変化を生む主体であり続けます。'
        },
        {
          title: '多様性を力に',
          desc: '私たちは、自由闊達な場を築き、互いの力を掛け合わせ最高の成果を生みます。'
        },
        {
          title: '個から成長を',
          desc: '私たちは、常にプロとして自己を高め続け、個の成長を全体の成長につなげます。'
        },
        {
          title: '真摯に誠実に',
          desc: '私たちは、高い志とフェアで謙虚な心を持ち、未来に対して誇れる仕事をします。'
        }
      ],
      profileTitle: '会社概要',
      tableRows: [
        { th: '会社名', td: 'AZAMINO株式会社' },
        { th: '英語社名', td: 'AZAMINO Inc.' },
        { th: '設立', td: '2014年1月24日' },
        { th: '資本金', td: '2億円' },
        { th: '所在地', td: '〒153-0051 東京都目黒区上目黒1丁目26番1号 中目黒アトラスタワー' },
        { th: 'アクセス地図', isMap: true, mapEmbedUrl }
      ]
    };
  } else if (currentLang.value === 'en') {
    return {
      categoryTitle: 'Company',
      categoryEn: 'COMPANY INFO',
      pageTitle: 'Corporate Philosophy',
      desc: 'Creating sustainable value through our Mission, Vision, and Values.',
      missionCatch: 'Build a brighter future for the world',
      missionText: 'Connecting people, technology, and global networks to create sustainable solutions and enrich people\'s lives worldwide.',
      visionCatch: 'Innovation',
      visionText: 'A corporate group continuously generating and nurturing businesses through challenge and innovation to resolve global social issues.',
      valuesSubtitle: 'Four Core Values supporting Challenge and Creation',
      valuesList: [
        {
          title: 'Action-driven Transformation',
          desc: 'We take the initiative, embrace challenges, and constantly generate positive change.'
        },
        {
          title: 'Power in Diversity',
          desc: 'We foster an open and dynamic environment, combining diverse strengths for optimal impact.'
        },
        {
          title: 'Growth through Individuality',
          desc: 'We pursue professional excellence, turning individual growth into shared organizational success.'
        },
        {
          title: 'Integrity and Trust',
          desc: 'We maintain high ethical standards with fairness and humility, taking pride in our contributions.'
        }
      ],
      profileTitle: 'Company Profile',
      tableRows: [
        { th: 'Company Name', td: 'AZAMINO Inc.' },
        { th: 'Established', td: 'January 24, 2014' },
        { th: 'Capital', td: '200 Million JPY' },
        { th: 'Head Office', td: 'Nakameguro Atlas Tower, 1-26-1 Kamimeguro, Meguro-ku, Tokyo, Japan' },
        { th: 'Access Map', isMap: true, mapEmbedUrl }
      ]
    };
  }

  return {
    categoryTitle: '회사정보',
    categoryEn: 'COMPANY INFO',
    pageTitle: '경영이념',
    desc: '사람과 기술, 글로벌 네트워크를 연결하여 새로운 미래 가치를 창출합니다.',
    missionCatch: '세계와 사람을 연결하는 지속 가능한 미래 가치 창출',
    missionText: '소중한 사람들과 지속 가능한 내일을 위해, 글로벌 네트워크와 신뢰를 바탕으로 꿈과 희망이 넘치는 풍요로운 사회를 실현합니다.',
    visionCatch: 'Innovation',
    visionText: '임직원 한 사람 한 사람의 \'도전과 창조\'로 새로운 사업을 육성하고, 사회적 과제를 선도적으로 해결하며 지속적인 성장을 이어가는 글로벌 비즈니스 파트너.',
    valuesSubtitle: '「도전과 창조」를 뒷받침하는 4대 기본 정신',
    valuesList: [
      {
        title: '변혁을 행동으로',
        desc: '우리는 스스로 움직이고, 스스로 도전하여 현실에 안주하지 않고 끊임없이 새로운 변화를 만드는 주체로 존재합니다.'
      },
      {
        title: '다양성을 힘으로',
        desc: '자유롭고 열린 소통의 장을 조성하고, 다양한 개성과 역량을 상호 융합하여 최고의 시너지와 결실을 창출합니다.'
      },
      {
        title: '개개인의 성장을 함께',
        desc: '항상 프로페셔널로서 자기 발전에 힘쓰며, 개인의 성장을 조직과 사회 전체의 동반 성장으로 승화시킵니다.'
      },
      {
        title: '진실과 신뢰로',
        desc: '높은 윤리 의식과 공정하고 겸허한 태도로 미래와 고객 앞에 떳떳하고 신뢰받을 수 있는 비즈니스를 수행합니다.'
      }
    ],
    profileTitle: '회사개요',
    tableRows: [
      { th: '회사명', td: '아자미노 주식회사' },
      { th: '대표자', td: '대표이사' },
      { th: '설립일', td: '2014년 1월 24일' },
      { th: '자본금', td: '2억 엔' },
      { th: '본사 소재지', td: '도쿄도 메구로구 카미메구로 1-26-1 나카메구로 아틀라스 타워' },
      { th: '위치 안내', isMap: true, mapEmbedUrl }
    ]
  };
});
</script>

<style scoped>
.mitsui-philosophy-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 60px 20px 100px;
  font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
  color: #333;
}

/* ========== 공통 섹션 스타일 (Mission / Vision) ========== */
.philosophy-section {
  text-align: center;
  padding: 56px 0;
  border-bottom: 1px solid #e0e0e0;
}

.philosophy-section:first-child {
  padding-top: 0;
}

.section-label-en {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: black;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.values-label {
  color: #8B0000;
}

.section-bar {
  width: 36px;
  height: 2px;
  background: #333;
  margin: 0 auto 28px;
}

.section-catchphrase {
  font-size: 30px;
  font-weight: 800;
  color: #111;
  margin: 0 0 20px;
  line-height: 1.45;
  letter-spacing: -0.01em;
}

.vision-catch {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-style: italic;
  font-weight: 700;
  font-size: 28px;
  color: #111;
}

.section-desc {
  font-size: 15px;
  line-height: 1.9;
  color: #666;
  max-width: 680px;
  margin: 0 auto;
}

/* ========== Values 섹션 ========== */
.values-section {
  border-bottom: none;
  padding-bottom: 0;
}

.values-subtitle {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 40px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px 60px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.value-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.value-pictogram {
  width: 110px;
  height: 110px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-pictogram svg {
  width: 100%;
  height: 100%;
}

.value-title {
  font-size: 22px;
  font-weight: 800;
  color: #111;
  margin: 0 0 10px;
  line-height: 1.4;
}

.value-desc {
  font-size: 14px;
  line-height: 1.8;
  color: #666;
  margin: 0;
  max-width: 300px;
}

/* ========== 구분선 ========== */
.philosophy-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 64px 0 48px;
}

/* ========== 회사개요 테이블 ========== */
.profile-section {
  margin-top: 0;
}

.profile-title {
  font-size: 22px;
  font-weight: 700;
  color: #111;
  margin: 0 0 28px;
  padding-bottom: 14px;
  border-bottom: 2px solid #333;
}

.mitsui-style-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.mitsui-style-table th,
.mitsui-style-table td {
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.7;
  border-bottom: 1px solid #e8e8e8;
}

.mitsui-style-table tr:last-child th,
.mitsui-style-table tr:last-child td {
  border-bottom: none;
}

.mitsui-style-table th {
  background-color: #f9f9f9;
  color: #111;
  font-weight: 600;
  text-align: left;
  border-right: 1px solid #e8e8e8;
}

.mitsui-style-table td {
  color: #444;
}

.overview-map-box {
  margin-top: 8px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

/* ========== 모바일 ========== */
@media (max-width: 768px) {
  .mitsui-philosophy-page {
    padding: 40px 16px 60px;
  }

  .philosophy-section {
    padding: 36px 0;
  }

  .section-catchphrase {
    font-size: 22px;
  }

  .vision-catch {
    font-size: 20px;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .value-pictogram {
    width: 90px;
    height: 90px;
  }

  .value-title {
    font-size: 18px;
  }

  .mitsui-style-table th,
  .mitsui-style-table td {
    padding: 12px 14px;
    font-size: 14px;
  }
}
</style>
