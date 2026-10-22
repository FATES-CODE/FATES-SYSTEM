<template>
  <footer class="bg-slate-950 border-t border-slate-800">
    <!-- Top Banner -->
    <div class="border-b border-slate-900 bg-gradient-to-r from-sky-500/5 via-transparent to-blue-600/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="text-xl font-black text-white mb-1">IoT リサーチ＆デザインのパートナー</h3>
          <p class="text-sm text-slate-500">お気軽にご相談・お問い合わせください</p>
        </div>
        <button
          @click="$emit('open-contact')"
          class="px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 transition-all whitespace-nowrap"
        >
          Contact Us →
        </button>
      </div>
    </div>

    <!-- Footer Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 xl:gap-12 mb-16">
        <!-- Logo + About -->
        <div class="col-span-2 sm:col-span-3 lg:col-span-2">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center">
              <span class="text-white font-black text-lg">C</span>
            </div>
            <div>
              <div class="text-base font-extrabold tracking-wider text-white">
                CHO<span class="text-sky-400 font-light">&</span>Company
              </div>
              <div class="text-[10px] text-slate-500 tracking-widest uppercase">IoT Research & Design</div>
            </div>
          </div>
          <p class="text-slate-500 text-xs leading-relaxed mb-5 max-w-xs">
            IT社会にアイデアとグローバルの風を吹き込むソリューション・カンパニー。
            通信・AI・カメラ・IoTデバイスを通じて、社会の発展に貢献します。
          </p>
          <!-- Social Links Placeholder -->
          <div class="flex gap-3">
            <div v-for="s in socials" :key="s.name"
              class="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 text-sm hover:border-slate-700 hover:text-slate-400 transition-all cursor-pointer"
            >
              {{ s.icon }}
            </div>
          </div>
        </div>

        <!-- Nav Columns -->
        <div v-for="col in footerNav" :key="col.heading">
          <h4 class="text-xs font-black text-slate-200 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span class="w-3 h-0.5 bg-sky-500 rounded-full"></span>
            {{ col.heading }}
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in col.links" :key="link.label">
              <a
                :href="link.href"
                class="text-xs text-slate-500 hover:text-sky-400 transition-colors leading-relaxed"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-slate-700">
          © {{ new Date().getFullYear() }} CHO&amp;Company, Ltd. All Rights Reserved.
        </p>
        <div class="flex items-center gap-4 text-xs text-slate-700">
          <a href="#" class="hover:text-slate-500 transition-colors">プライバシーポリシー</a>
          <span>·</span>
          <a href="#" class="hover:text-slate-500 transition-colors">利用規約</a>
          <span>·</span>
          <span>Made with Vue.js + Node.js + MongoDB</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineEmits(['open-contact']);

const socials = [
  { name: 'YouTube', icon: '▶' },
  { name: 'Twitter/X', icon: '𝕏' },
  { name: 'LinkedIn', icon: 'in' },
];

const footerNav = [
  {
    heading: 'CONCEPT',
    links: [
      { label: '経営理念', href: '#concept' },
      { label: '社長あいさつ', href: '#concept' },
      { label: '事業案内', href: '#concept' },
    ]
  },
  {
    heading: 'PRODUCTS',
    links: [
      { label: 'MORECA AI+', href: '#products' },
      { label: 'HY-CHECK', href: '#products' },
      { label: 'MODULA-100', href: '#products' },
      { label: 'ESL 電子棚札', href: '#products' },
      { label: 'ISR Series', href: '#products' },
    ]
  },
  {
    heading: 'COMPANY',
    links: [
      { label: '会社概要', href: '#profile' },
      { label: 'パートナー採用', href: '#business' },
      { label: '採用情報', href: '#team' },
      { label: 'アクセス', href: '#profile' },
      { label: 'お問い合わせ', href: '#' },
    ]
  }
];
</script>
