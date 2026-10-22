<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
      isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-slate-800 shadow-xl py-3' : 'bg-slate-950/70 backdrop-blur-sm border-slate-800/60 py-4'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="#" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <span class="text-white font-black text-xl tracking-tighter">C</span>
          </div>
          <div>
            <div class="text-xl font-extrabold tracking-wider text-white group-hover:text-sky-400 transition-colors">
              CHO<span class="text-sky-400 font-light">&</span>Company
            </div>
            <div class="text-[10px] text-slate-400 tracking-widest uppercase">IoT Research & Design</div>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-1">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            class="group relative px-4 py-2 text-center rounded-lg hover:bg-slate-800/60 transition-all duration-200"
          >
            <div class="text-xs font-bold tracking-widest text-slate-200 group-hover:text-sky-400 transition-colors uppercase font-mono">
              {{ item.name }}
            </div>
            <div class="text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors">
              {{ item.jpName }}
            </div>
            <!-- Active indicator line -->
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-sky-400 group-hover:w-3/4 transition-all duration-300"></span>
          </a>
        </nav>

        <!-- Right Slogan & Contact Action -->
        <div class="hidden xl:flex items-center gap-6">
          <div class="text-right border-r border-slate-800 pr-6">
            <span class="text-xs text-slate-300 font-medium block">CHO&Company は</span>
            <span class="text-xs text-sky-400 font-bold">IoT リサーチ＆デザインのパートナーです</span>
          </div>

          <button
            @click="$emit('open-contact')"
            class="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-500/25 transition-all hover:shadow-sky-500/40 active:scale-95"
          >
            Contact Us
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center gap-3 lg:hidden">
          <button
            @click="$emit('open-contact')"
            class="px-3 py-1.5 rounded-full text-xs font-medium text-white bg-sky-600 hover:bg-sky-500"
          >
            Contact
          </button>
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            aria-label="Toggle Menu"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg v-else class="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown -->
      <div 
        v-if="isMobileMenuOpen"
        class="lg:hidden mt-4 pt-4 border-t border-slate-800 bg-slate-950/95 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
      >
        <div class="space-y-2">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click="isMobileMenuOpen = false"
            class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
          >
            <div>
              <div class="text-sm font-bold text-white uppercase">{{ item.name }}</div>
              <div class="text-xs text-slate-400">{{ item.jpName }}</div>
            </div>
            <span class="text-sky-400 text-sm">→</span>
          </a>
        </div>

        <div class="mt-4 pt-4 border-t border-slate-900 text-center">
          <p class="text-xs text-slate-400 mb-3">IoT リサーチ＆デザインのパートナー</p>
          <button
            @click="isMobileMenuOpen = false; $emit('open-contact')"
            class="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-500 shadow-lg"
          >
            お問い合わせ / Contact Us
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineEmits(['open-contact']);

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const navItems = [
  { name: 'CONCEPT', jpName: '経営理念', href: '#concept' },
  { name: 'VISION', jpName: '事業構想', href: '#vision' },
  { name: 'PRODUCTS', jpName: '製品情報', href: '#products' },
  { name: 'BUSINESS', jpName: '事業展開', href: '#business' },
  { name: 'OUR TEAM', jpName: '採用情報', href: '#team' },
  { name: 'COMPANY', jpName: '会社概要', href: '#profile' },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
