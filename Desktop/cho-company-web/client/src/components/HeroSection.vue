<template>
  <!-- Hero / Slider Section -->
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#090e1a]">
    <!-- Animated Background Grid -->
    <div class="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none"></div>

    <!-- Radial Glow -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-sky-600/10 blur-[120px]"></div>
      <div class="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-800/10 blur-[100px]"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Text Content -->
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            IoT Research & Design Partner
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            <span class="text-white">IT 社会に</span><br>
            <span class="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              アイデアと
            </span><br>
            <span class="text-white">グローバルの</span><br>
            <span class="text-slate-300">風を吹き込む</span>
          </h1>

          <p class="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
            ビジネスユースからパーソナルユースまで、先進的なハードウェアからアプリケーションまで幅広く対応。
            <span class="text-sky-400 font-medium">高性能・低価格・ニーズに応じたカスタマイズ</span>を提供するソリューション・カンパニー。
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4 mb-12">
            <a
              href="#products"
              class="px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all active:scale-95"
            >
              製品を見る →
            </a>
            <button
              @click="$emit('open-contact')"
              class="px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-sky-400 border border-sky-500/40 hover:bg-sky-500/10 hover:border-sky-400 transition-all"
            >
              お問い合わせ
            </button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 border-t border-slate-800 pt-8">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="text-2xl sm:text-3xl font-black text-white mb-1">{{ stat.value }}</div>
              <div class="text-xs text-slate-400 leading-tight">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Right: Product Slideshow Cards -->
        <div class="relative hidden lg:block">
          <!-- Slide wrapper -->
          <div class="relative overflow-hidden rounded-3xl border border-slate-800 shadow-2xl h-[520px]">
            <transition-group name="slide-fade" tag="div">
              <div
                v-if="currentSlide === idx"
                v-for="(slide, idx) in slides"
                :key="slide.id"
                class="absolute inset-0"
              >
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-8">
                  <span class="inline-block px-2 py-1 bg-sky-500/90 text-white text-xs font-bold rounded-md uppercase tracking-wider mb-3">
                    {{ slide.badge }}
                  </span>
                  <h3 class="text-2xl font-black text-white mb-1">{{ slide.title }}</h3>
                  <p class="text-slate-300 text-sm">{{ slide.subTitle }}</p>
                </div>
              </div>
            </transition-group>

            <!-- Slide Indicators -->
            <div class="absolute top-4 right-4 flex gap-1.5">
              <button
                v-for="(_, idx) in slides"
                :key="idx"
                @click="currentSlide = idx"
                :class="['w-2 h-2 rounded-full transition-all', currentSlide === idx ? 'bg-sky-400 w-6' : 'bg-slate-700']"
              />
            </div>
          </div>

          <!-- Floating Product Count Badge -->
          <div class="absolute -bottom-5 -left-5 px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
            <div class="text-xs text-slate-400 mb-1">Total Solutions</div>
            <div class="text-2xl font-black text-sky-400">6+</div>
          </div>

          <!-- Floating Label -->
          <div class="absolute -top-4 -right-4 px-3 py-2 bg-slate-900 border border-sky-500/30 rounded-xl text-xs font-bold text-sky-400 shadow-xl">
            FLAGSHIP PRODUCT
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
      <span class="text-xs uppercase tracking-widest">Scroll</span>
      <div class="w-0.5 h-8 bg-gradient-to-b from-slate-600 to-transparent animate-pulse"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineEmits(['open-contact']);

const currentSlide = ref(0);
let timer = null;

const stats = [
  { value: '13+', label: 'Years of\nInnovation' },
  { value: '50+', label: 'Global\nPartners' },
  { value: '6+', label: 'IoT\nProducts' },
];

const slides = [
  {
    id: 1,
    title: 'MORECA AI+',
    subTitle: 'エッジAI・ソーラーLTE一体型スマートカメラ',
    badge: 'FLAGSHIP',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    title: 'HY-CHECK',
    subTitle: 'AIoT 水道メーター遠隔検針',
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    title: 'MODULA-100',
    subTitle: 'グローバルIoTゲートウェイ',
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    title: 'ESL System',
    subTitle: 'スマートリテール 電子棚札',
    badge: 'EXPANDING',
    image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=900&q=80'
  },
];

onMounted(() => {
  timer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 4000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: scale(1.05);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
