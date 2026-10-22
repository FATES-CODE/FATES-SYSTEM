<template>
  <!-- Team / Recruitment Section -->
  <section id="team" class="relative py-28 bg-slate-950 overflow-hidden">
    <div class="absolute right-0 top-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Content -->
        <div>
          <div class="text-xs uppercase tracking-[0.3em] text-purple-400 font-bold mb-4">Our Team / 採用情報</div>
          <h2 class="text-3xl sm:text-4xl font-black text-white mb-6">
            想いに共感し、<br>
            <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">共に活動していただける</span><br>
            ビジネスパーソンを求む
          </h2>
          <div class="w-12 h-0.5 bg-purple-500 rounded-full mb-8"></div>
          <p class="text-slate-400 leading-relaxed mb-4">
            先進技術を駆使し、便利で快適、より人にやさしい社会の実現のために前進し続けるスペシャリスト集団です。
          </p>
          <p class="text-slate-500 leading-relaxed mb-10">
            私たちの想いに共感し、共に活動していただけるビジネスパーソンを求めています。
            CHO &amp; Companyと一緒に、ITで社会の発展につながる活動をしませんか？
          </p>

          <!-- Culture Points -->
          <div class="space-y-4 mb-10">
            <div
              v-for="item in culturePoints"
              :key="item.title"
              class="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/60"
            >
              <div class="text-2xl">{{ item.icon }}</div>
              <div>
                <div class="text-sm font-bold text-white">{{ item.title }}</div>
                <div class="text-xs text-slate-500">{{ item.desc }}</div>
              </div>
            </div>
          </div>

          <button
            @click="$emit('open-contact')"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25 transition-all active:scale-95"
          >
            Join Us! 採用情報へのお問い合わせ →
          </button>
        </div>

        <!-- Right: Image-like Card Stack -->
        <div class="relative hidden lg:block h-[480px]">
          <div
            v-for="(card, idx) in teamCards"
            :key="idx"
            :style="{ top: card.top, left: card.left, transform: `rotate(${card.rotate}deg)`, zIndex: card.z }"
            class="absolute w-72 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 hover:scale-105 hover:z-20 transition-all duration-300 cursor-pointer"
          >
            <img
              :src="card.image"
              :alt="card.label"
              class="w-full h-44 object-cover"
            />
            <div class="bg-slate-900 px-4 py-3">
              <div class="text-xs font-bold text-slate-300">{{ card.label }}</div>
              <div class="text-xs text-slate-600">{{ card.sub }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Company Profile Section -->
  <section id="profile" class="relative py-24 bg-[#090e1a]">
    <div class="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-16">
        <div class="text-xs uppercase tracking-[0.3em] text-sky-400 font-bold mb-3">About Us</div>
        <h2 class="text-4xl sm:text-5xl font-black text-white">COMPANY <span class="text-slate-500">PROFILE</span></h2>
      </div>

      <div class="grid md:grid-cols-3 gap-6 mb-16">
        <a
          v-for="card in profileCards"
          :key="card.title"
          :href="card.href"
          class="group p-8 rounded-3xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/5 transition-all text-center block"
        >
          <div class="text-5xl mb-6 group-hover:scale-110 transition-transform">{{ card.icon }}</div>
          <h3 class="text-lg font-black text-white mb-2 group-hover:text-sky-400 transition-colors">{{ card.title }}</h3>
          <p class="text-sm text-slate-500">{{ card.desc }}</p>
          <div class="mt-4 text-sky-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            {{ card.cta }} →
          </div>
        </a>
      </div>

      <!-- Company Info Table -->
      <div class="max-w-2xl mx-auto">
        <div class="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-800 bg-slate-900">
            <h3 class="font-black text-white">会社概要</h3>
          </div>
          <div class="divide-y divide-slate-800/60">
            <div
              v-for="item in companyInfo"
              :key="item.label"
              class="flex items-start gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors"
            >
              <span class="text-xs text-slate-500 font-semibold uppercase tracking-wider w-28 shrink-0 pt-0.5">{{ item.label }}</span>
              <span class="text-sm text-slate-300 leading-relaxed">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['open-contact']);

const culturePoints = [
  { icon: '🚀', title: 'フラットな組織文化', desc: '役職・年次に関係なくアイデアを出し合える環境' },
  { icon: '🌏', title: 'グローバルな業務環境', desc: '韓国・欧米パートナーとの日常的な国際連携' },
  { icon: '💡', title: '最新テクノロジーへの挑戦', desc: 'AI・IoT・5Gなど先端領域に日々触れられる仕事' },
];

const teamCards = [
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80',
    label: 'Team Collaboration',
    sub: 'Global R&D & Partnership',
    top: '10%', left: '5%', rotate: -5, z: 10
  },
  {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=700&q=80',
    label: 'Engineering Excellence',
    sub: 'IoT Hardware & Software',
    top: '30%', left: '30%', rotate: 3, z: 20
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80',
    label: 'Modern Office Culture',
    sub: 'Open & Creative Workspace',
    top: '55%', left: '8%', rotate: -2, z: 15
  },
];

const profileCards = [
  {
    icon: '🏢',
    title: '会社概要',
    desc: '弊社の会社概要はこちら',
    cta: '詳細を見る',
    href: '#'
  },
  {
    icon: '✉️',
    title: 'お問い合わせ',
    desc: 'お気軽にご相談ください',
    cta: 'フォームへ',
    href: '#contact'
  },
  {
    icon: '📍',
    title: 'アクセス',
    desc: '弊社にお越しの際は',
    cta: 'マップを見る',
    href: '#'
  },
];

const companyInfo = [
  { label: '会社名', value: 'CHO&Company 株式会社' },
  { label: '設立', value: '2013年' },
  { label: '事業内容', value: 'IoTデバイス・通信機器・AIソリューションの研究・開発・輸入販売' },
  { label: '所在地', value: '東京都' },
  { label: 'パートナー', value: 'SoftBank / 1NCE・NEC ネッツエスアイ・SKC&C・Nordic Semiconductor 他' },
  { label: 'URL', value: 'www.cho-co.jp' },
];
</script>
