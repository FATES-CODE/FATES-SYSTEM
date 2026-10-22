<template>
  <section id="concept" class="relative py-28 overflow-hidden bg-slate-950">
    <!-- BG Decoration -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute left-0 top-0 w-96 h-96 bg-sky-600/5 rounded-full blur-[100px]"></div>
      <div class="absolute right-0 bottom-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[80px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-20 items-center">
        <!-- Left: Main Text -->
        <div>
          <div class="text-xs uppercase tracking-[0.3em] text-sky-400 font-bold mb-4">Our Philosophy</div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white mb-6">
            世界のどこでも、<br>
            <span class="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              どんな人でも、
            </span><br>
            どんなときでも
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-sky-500 to-transparent rounded-full mb-8"></div>
          <p class="text-slate-400 text-lg leading-relaxed mb-6">
            私たちの想いは、ITでビジネスをパワーアップし、人々の暮らしをより楽しく快適にすること。
          </p>
          <p class="text-slate-500 text-base leading-relaxed mb-10">
            「高性能・低価格・ニーズに応じたカスタマイズ」を提供できる総合ソリューションベンダーを目指し、
            グローバルな技術を活用した、より良いサービスの提供に注力しています。
          </p>

          <a href="#products" class="inline-flex items-center gap-2 text-sky-400 font-bold text-sm hover:gap-4 transition-all group">
            <span>製品・ソリューションを見る</span>
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <!-- Right: Concept Cards (3 Pillars) -->
        <div class="grid gap-4">
          <div
            v-for="(pillar, idx) in pillars"
            :key="idx"
            class="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 hover:bg-slate-900 transition-all duration-300"
          >
            <div class="flex items-start gap-4">
              <div :class="['w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl', pillar.bg]">
                {{ pillar.icon }}
              </div>
              <div>
                <h3 class="font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">{{ pillar.title }}</h3>
                <p class="text-slate-400 text-sm leading-relaxed">{{ pillar.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Partner Logos Area -->
      <div class="mt-24 border-t border-slate-800 pt-12">
        <div class="text-center text-xs uppercase tracking-[0.3em] text-slate-600 mb-8 font-semibold">Business Partners & Platforms</div>
        <div class="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          <div
            v-for="partner in partners"
            :key="partner"
            class="px-6 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-500 text-sm font-bold tracking-wide hover:border-slate-700 hover:text-slate-300 transition-all"
          >
            {{ partner }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const pillars = [
  {
    icon: '🌍',
    bg: 'bg-sky-500/10',
    title: 'グローバル技術の融合',
    description: '世界最先端の半導体・通信技術をいち早く日本市場へ投入。グローバルパートナーシップを通じて最高水準の製品を提供します。'
  },
  {
    icon: '⚡',
    bg: 'bg-amber-500/10',
    title: '高性能・低価格・カスタマイズ',
    description: 'ビジネスユースからパーソナルユースまで、先進的なハードウェアとソフトウェアを組み合わせ、お客様のニーズに応じたカスタマイズを実現。'
  },
  {
    icon: '🔗',
    bg: 'bg-emerald-500/10',
    title: 'IoTでつながる未来を創る',
    description: '通信・カメラ・AI・センサーを融合した総合IoTプラットフォームにより、社会インフラのスマート化と業務効率化を推進します。'
  }
];

const partners = [
  'SoftBank / 1NCE',
  'Nordic Semiconductor',
  'NEC ネッツエスアイ',
  'SKC&C Korea',
  'BIGLOBE',
  'SORACOM',
];
</script>
