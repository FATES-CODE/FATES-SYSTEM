<template>
  <section id="products" class="relative py-28 bg-[#090e1a]">
    <!-- Background -->
    <div class="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-600/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <!-- Header -->
      <div class="text-center mb-16">
        <div class="text-xs uppercase tracking-[0.3em] text-sky-400 font-bold mb-3">製品情報</div>
        <h2 class="text-4xl sm:text-5xl font-black text-white mb-5">
          PRODUCTS & <span class="text-slate-500">SOLUTIONS</span>
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          先進的なハードウェアからアプリケーションまで幅広く対応。<br class="hidden sm:block">
          ハードウェアやソフトウェア双方の企画提案から開発・販売まで、お任せいただけます。
        </p>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-2 mt-8">
          <button
            v-for="cat in categories"
            :key="cat.value"
            @click="selectedCategory = cat.value"
            :class="[
              'px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all',
              selectedCategory === cat.value
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
            ]"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="h-80 bg-slate-900 rounded-3xl animate-pulse"></div>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product._id"
          class="group relative bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 cursor-pointer flex flex-col"
          @click="openModal(product)"
        >
          <!-- Product Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="product.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'"
              :alt="product.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

            <!-- Badge -->
            <span
              v-if="product.badge"
              :class="['absolute top-4 left-4 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-lg', badgeStyle(product.badge)]"
            >
              {{ product.badge }}
            </span>

            <!-- External Link Indicator -->
            <div v-if="product.externalLink && product.externalLink !== '#'"
              class="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-6 flex flex-col flex-1">
            <div class="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-2">{{ product.category }}</div>
            <h3 class="text-xl font-black text-white mb-1 group-hover:text-sky-400 transition-colors">{{ product.title }}</h3>
            <p class="text-sm text-slate-400 mb-4 leading-relaxed line-clamp-2">{{ product.subTitle }}</p>

            <!-- Features Preview -->
            <div class="mt-auto space-y-1.5">
              <div
                v-for="(feat, fi) in product.features.slice(0, 2)"
                :key="fi"
                class="flex items-start gap-2 text-xs text-slate-500"
              >
                <span class="text-sky-500 mt-0.5 shrink-0">✓</span>
                <span>{{ feat }}</span>
              </div>
            </div>

            <!-- Detail Button -->
            <div class="mt-5 flex items-center gap-3">
              <button class="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-300 hover:bg-sky-500 hover:text-white transition-all border border-slate-700 hover:border-sky-500">
                詳細を見る
              </button>
              <a
                v-if="product.externalLink && product.externalLink !== '#'"
                :href="product.externalLink"
                target="_blank"
                @click.stop
                class="w-10 h-10 shrink-0 rounded-xl border border-slate-700 flex items-center justify-center text-slate-400 hover:border-sky-500 hover:text-sky-400 transition-all"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Detail Modal -->
    <transition name="modal-fade">
      <div
        v-if="selectedProduct"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="selectedProduct = null"
      >
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div class="relative bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Modal Header Image -->
          <div class="relative h-56 overflow-hidden rounded-t-3xl">
            <img
              :src="selectedProduct.image"
              :alt="selectedProduct.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
            <button
              @click="selectedProduct = null"
              class="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500/70 transition-colors"
            >
              ✕
            </button>
            <div class="absolute bottom-4 left-6">
              <span :class="['px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-lg', badgeStyle(selectedProduct.badge)]">
                {{ selectedProduct.badge }}
              </span>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="p-8">
            <div class="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-2">{{ selectedProduct.category }}</div>
            <h3 class="text-3xl font-black text-white mb-2">{{ selectedProduct.title }}</h3>
            <p class="text-slate-400 text-sm mb-6">{{ selectedProduct.subTitle }}</p>

            <p class="text-slate-300 leading-relaxed mb-8">{{ selectedProduct.description }}</p>

            <!-- Features List -->
            <div class="space-y-3 mb-8">
              <div class="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">主な特長</div>
              <div
                v-for="(feat, fi) in selectedProduct.features"
                :key="fi"
                class="flex items-start gap-3 text-sm text-slate-300"
              >
                <span class="w-5 h-5 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 text-xs shrink-0 mt-0.5">✓</span>
                <span>{{ feat }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3">
              <a
                v-if="selectedProduct.externalLink && selectedProduct.externalLink !== '#'"
                :href="selectedProduct.externalLink"
                target="_blank"
                class="flex-1 py-3 rounded-xl text-sm font-bold text-center bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 transition-all"
              >
                公式サイトを見る →
              </a>
              <button
                @click="selectedProduct = null; $emit('open-contact')"
                class="flex-1 py-3 rounded-xl text-sm font-bold border border-slate-700 text-slate-300 hover:border-sky-500/50 hover:text-sky-400 transition-all"
              >
                お問い合わせ
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchProducts } from '../api/index.js';

defineEmits(['open-contact']);

const allProducts = ref([]);
const loading = ref(true);
const selectedProduct = ref(null);
const selectedCategory = ref('all');

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'AI & Camera', label: 'AI & Camera' },
  { value: 'IoT Hardware', label: 'IoT Hardware' },
  { value: 'Smart City / AIoT', label: 'Smart City' },
  { value: 'Retail Tech', label: 'Retail' },
  { value: 'Security Solution', label: 'Security' },
  { value: 'Network Device', label: 'Network' },
];

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return allProducts.value;
  return allProducts.value.filter(p => p.category === selectedCategory.value);
});

const badgeStyle = (badge) => {
  const map = {
    'FLAGSHIP': 'bg-sky-500 text-white',
    'NEW': 'bg-emerald-500 text-white',
    'POPULAR': 'bg-purple-500 text-white',
    'EXPANDING': 'bg-amber-500 text-white',
    'ENTERPRISE': 'bg-rose-500 text-white',
    'PROVEN': 'bg-slate-600 text-white',
  };
  return map[badge] || 'bg-slate-700 text-slate-300';
};

const openModal = (product) => {
  selectedProduct.value = product;
};

onMounted(async () => {
  try {
    const res = await fetchProducts();
    allProducts.value = res.data || [];
  } catch (e) {
    console.error('Failed to load products:', e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
