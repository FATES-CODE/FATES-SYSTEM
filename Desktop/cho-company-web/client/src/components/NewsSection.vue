<template>
  <!-- News Ticker + Card Section -->
  <section id="news" class="relative bg-slate-950 border-y border-slate-800 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section Header -->
      <div class="flex items-end justify-between mb-10">
        <div>
          <div class="text-xs uppercase tracking-[0.3em] text-sky-400 font-bold mb-2">Latest Updates</div>
          <h2 class="text-3xl sm:text-4xl font-black text-white">NEWS</h2>
        </div>
        <div class="hidden sm:block text-xs text-slate-500 uppercase tracking-widest">お知らせ・ニュース</div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="h-14 bg-slate-900 rounded-xl animate-pulse"></div>
      </div>

      <!-- News List -->
      <div v-else class="space-y-3">
        <a
          v-for="item in displayedNews"
          :key="item._id"
          :href="item.link !== '#' ? item.link : undefined"
          :target="item.link !== '#' ? '_blank' : undefined"
          :class="[
            'group flex items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-200',
            item.isHighlight
              ? 'bg-sky-500/5 border-sky-500/25 hover:bg-sky-500/10 hover:border-sky-500/40'
              : 'bg-slate-900/60 border-slate-800/60 hover:bg-slate-900 hover:border-slate-700',
            item.link !== '#' ? 'cursor-pointer' : 'cursor-default'
          ]"
        >
          <!-- Date + Badge -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 min-w-fit shrink-0">
            <span class="text-xs text-slate-500 font-mono whitespace-nowrap">{{ item.date }}</span>
            <span :class="[
              'inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border shrink-0',
              categoryStyle(item.category)
            ]">
              {{ item.category }}
            </span>
          </div>

          <!-- Title + Summary -->
          <div class="flex-1 min-w-0">
            <p :class="['text-sm font-medium leading-relaxed truncate', item.link !== '#' ? 'text-slate-200 group-hover:text-sky-400' : 'text-slate-300']">
              {{ item.title }}
            </p>
            <p v-if="item.summary" class="text-xs text-slate-500 mt-0.5 truncate hidden sm:block">
              {{ item.summary }}
            </p>
          </div>

          <!-- Arrow Icon for links -->
          <div v-if="item.link !== '#'" class="shrink-0 text-slate-700 group-hover:text-sky-400 transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </a>
      </div>

      <!-- Show More / Less Toggle -->
      <div class="mt-6 text-center">
        <button
          v-if="news.length > 6"
          @click="showAll = !showAll"
          class="px-6 py-2.5 rounded-full text-sm font-semibold border border-slate-700 text-slate-300 hover:border-sky-500/50 hover:text-sky-400 transition-all"
        >
          {{ showAll ? '折りたたむ ↑' : `さらに表示 (${news.length - 6}件) ↓` }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchNews } from '../api/index.js';

const news = ref([]);
const loading = ref(true);
const showAll = ref(false);

const displayedNews = computed(() =>
  showAll.value ? news.value : news.value.slice(0, 6)
);

const categoryStyle = (cat) => {
  const map = {
    EXHIBITION: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    PRODUCT: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    PRESS: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    MEDIA: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    PARTNERSHIP: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    NEWS: 'bg-slate-700/40 text-slate-400 border-slate-700',
  };
  return map[cat] || map['NEWS'];
};

onMounted(async () => {
  try {
    const res = await fetchNews();
    news.value = res.data || [];
  } catch (e) {
    console.error('Failed to load news:', e);
  } finally {
    loading.value = false;
  }
});
</script>
