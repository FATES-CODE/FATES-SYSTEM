<template>
  <div class="min-h-screen">
    <!-- Navbar -->
    <Navbar @open-contact="contactOpen = true" />

    <!-- Page Sections -->
    <main>
      <HeroSection @open-contact="contactOpen = true" />
      <NewsSection />
      <ConceptSection />
      <ProductsSection @open-contact="contactOpen = true" />
      <BusinessVisionSection @open-contact="contactOpen = true" />
      <TeamProfileSection @open-contact="contactOpen = true" />
    </main>

    <!-- Footer -->
    <Footer @open-contact="contactOpen = true" />

    <!-- Contact Modal (global) -->
    <ContactModal v-model="contactOpen" />

    <!-- Scroll-to-top FAB -->
    <Transition name="fab">
      <button
        v-show="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/50 shadow-xl transition-all active:scale-90"
        aria-label="Scroll to top"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import NewsSection from './components/NewsSection.vue';
import ConceptSection from './components/ConceptSection.vue';
import ProductsSection from './components/ProductsSection.vue';
import BusinessVisionSection from './components/BusinessVisionSection.vue';
import TeamProfileSection from './components/TeamProfileSection.vue';
import ContactModal from './components/ContactModal.vue';
import Footer from './components/Footer.vue';

const contactOpen = ref(false);
const showScrollTop = ref(false);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
.fab-enter-active,
.fab-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.9);
}
</style>
