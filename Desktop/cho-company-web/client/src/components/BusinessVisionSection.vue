<template>
  <!-- Business Section -->
  <section id="business" class="relative py-28 overflow-hidden bg-slate-950">
    <!-- Big decorative text -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <span class="text-[20vw] font-black text-slate-900/40 leading-none">GLOBAL</span>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Visual Globe-ish element -->
        <div class="relative flex justify-center">
          <div class="relative w-80 h-80">
            <!-- Outer rings -->
            <div class="absolute inset-0 rounded-full border-2 border-sky-500/10 animate-[spin_20s_linear_infinite]"></div>
            <div class="absolute inset-6 rounded-full border border-sky-500/15 animate-[spin_15s_linear_infinite_reverse]"></div>
            <div class="absolute inset-12 rounded-full border border-sky-400/20 animate-[spin_10s_linear_infinite]"></div>
            <!-- Core -->
            <div class="absolute inset-16 rounded-full bg-gradient-to-br from-sky-600/30 to-blue-800/30 flex items-center justify-center border border-sky-500/30 backdrop-blur">
              <span class="text-6xl">🌏</span>
            </div>

            <!-- Floating partner dots -->
            <div
              v-for="(dot, i) in orbDots"
              :key="i"
              :style="{ top: dot.top, left: dot.left }"
              class="absolute w-8 h-8 rounded-full bg-slate-900 border-2 flex items-center justify-center text-xs shadow-lg"
              :class="dot.border"
            >
              {{ dot.icon }}
            </div>
          </div>
        </div>

        <!-- Right: Content -->
        <div>
          <div class="text-xs uppercase tracking-[0.3em] text-sky-400 font-bold mb-4">Partnership</div>
          <h2 class="text-3xl sm:text-4xl font-black text-white mb-6">
            戦略的な技術や製品を持つ企業との<br>
            <span class="text-slate-500">パートナーシップを求む</span>
          </h2>
          <div class="w-12 h-0.5 bg-sky-500 rounded-full mb-8"></div>

          <p class="text-slate-400 leading-relaxed mb-6">
            多種多様なソリューションにおいて、パートナー企業とともに日本国内の企業向けにご提案・ローカライズを行うこと。
            それが私たちのビジネスであり、使命です。
          </p>
          <p class="text-slate-500 leading-relaxed mb-10">
            私たちの想いに共感し、共に活動していただけるパートナー企業・団体を求めています。
            CHO &amp; Companyと一緒に、ITで社会の発展につながる活動をしませんか？
          </p>

          <!-- Business Pillars -->
          <div class="grid grid-cols-2 gap-4 mb-10">
            <div
              v-for="item in businessItems"
              :key="item.title"
              class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/30 transition-all"
            >
              <div class="text-2xl mb-2">{{ item.icon }}</div>
              <div class="text-sm font-bold text-white mb-1">{{ item.title }}</div>
              <div class="text-xs text-slate-500 leading-relaxed">{{ item.desc }}</div>
            </div>
          </div>

          <button
            @click="$emit('open-contact')"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/30 transition-all active:scale-95"
          >
            パートナーシップのご相談 →
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Vision Section -->
  <section id="vision" class="relative py-28 overflow-hidden bg-gradient-to-b from-[#090e1a] to-slate-950">
    <div class="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-16">
        <div class="text-xs uppercase tracking-[0.3em] text-sky-400 font-bold mb-3">Future Vision</div>
        <h2 class="text-4xl sm:text-5xl font-black text-white">
          IT が繋ぐ、<span class="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">人と社会</span>
        </h2>
      </div>

      <!-- Vision Timeline / Roadmap -->
      <div class="relative max-w-4xl mx-auto">
        <!-- Vertical line -->
        <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-sky-500/20 to-transparent hidden md:block"></div>

        <div class="space-y-12">
          <div
            v-for="(item, idx) in visionItems"
            :key="idx"
            :class="['relative grid md:grid-cols-2 gap-8 items-center', idx % 2 === 1 ? 'md:[&>*:first-child]:order-last' : '']"
          >
            <!-- Content -->
            <div :class="['p-6 rounded-2xl border bg-slate-900/70 border-slate-800 hover:border-sky-500/30 transition-all', idx % 2 === 0 ? 'md:text-right' : '']">
              <div class="text-3xl mb-3">{{ item.icon }}</div>
              <h3 class="text-lg font-black text-white mb-2">{{ item.title }}</h3>
              <p class="text-slate-400 text-sm leading-relaxed">{{ item.description }}</p>
            </div>

            <!-- Center dot (only visible on md+) -->
            <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-sky-500 items-center justify-center text-sky-400 font-black text-sm z-10">
              {{ idx + 1 }}
            </div>

            <!-- Empty spacer -->
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['open-contact']);

const orbDots = [
  { top: '8%', left: '50%', icon: '📡', border: 'border-sky-500/50' },
  { top: '50%', left: '92%', icon: '🤝', border: 'border-emerald-500/50' },
  { top: '82%', left: '55%', icon: '💡', border: 'border-amber-500/50' },
  { top: '55%', left: '2%', icon: '🔒', border: 'border-purple-500/50' },
];

const businessItems = [
  { icon: '📦', title: '製品輸入販売', desc: '海外先端製品の日本市場への導入・展開' },
  { icon: '🔧', title: 'カスタマイズ開発', desc: 'お客様要件に合わせたハード/ソフト開発' },
  { icon: '🌐', title: 'グローバル展開', desc: '韓国・欧州等のパートナーとの共同事業' },
  { icon: '📊', title: 'SIパートナー支援', desc: '代理店・SIerへの技術・営業サポート' },
];

const visionItems = [
  {
    icon: '📶',
    title: 'IoT でつながる社会インフラ',
    description: '水道・電力・交通などの社会インフラをスマート化。遠隔監視・自動制御により、より安全で効率的な社会を実現します。'
  },
  {
    icon: '🤖',
    title: 'エッジAIによるリアルタイム分析',
    description: 'クラウドを介さずデバイス上でAI推論を実行。低遅延・高セキュリティなエッジインテリジェンスで次世代ソリューションを提供。'
  },
  {
    icon: '🌍',
    title: 'グローバルパートナーとの共創',
    description: '韓国・欧州・北米の優れたテクノロジー企業と連携し、世界最高水準のソリューションを日本へ、日本の技術を世界へ展開します。'
  },
  {
    icon: '♻️',
    title: '持続可能なスマート社会へ',
    description: 'ソーラー給電IoT・省エネ通信モジュールなどのグリーンテクノロジーを活用し、環境負荷を低減しながら社会課題を解決します。'
  },
];
</script>
