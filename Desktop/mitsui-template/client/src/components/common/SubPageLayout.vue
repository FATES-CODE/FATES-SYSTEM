<template>
  <div class="subpage-wrapper" :class="{ 'has-custom-hero': !!$slots.hero || !!heroImage }">
    <slot name="hero" />

    <section 
      v-if="!$slots.hero && heroImage" 
      class="subpage-visual-hero-fullscreen"
      :style="{ backgroundImage: `url(${heroImage})` }"
    >
      <div class="visual-hero-overlay"></div>
      
      <div class="visual-hero-inner">
        <span v-if="categoryEn" class="visual-hero-category-en">{{ categoryEn }}</span>
        <h1 class="visual-hero-title">{{ pageTitle || categoryTitle }}</h1>
        <div class="visual-hero-underline"></div>
        <p v-if="pageDescription" class="visual-hero-desc">{{ pageDescription }}</p>
      </div>


    </section>

    <div id="subpage-content-start" ref="contentStartRef"></div>
    <nav class="subpage-breadcrumb" aria-label="Breadcrumb">
      <div class="subpage-container breadcrumb-container">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item">
            <router-link to="/">
              <svg class="breadcrumb-home-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span class="sr-only">HOME</span>
            </router-link>
          </li>
          <li class="breadcrumb-separator">&gt;</li>
          <li class="breadcrumb-item">
            <router-link v-if="categoryUrl" :to="categoryUrl">{{ categoryTitle }}</router-link>
            <span v-else>{{ categoryTitle }}</span>
          </li>
          <template v-if="pageTitle && pageTitle !== categoryTitle">
            <li class="breadcrumb-separator">&gt;</li>
            <li class="breadcrumb-item breadcrumb-current">{{ pageTitle }}</li>
          </template>
        </ol>
      </div>
    </nav>

    <section v-if="!$slots.hero && !heroImage && !hideHero" class="subpage-hero">
      <div class="subpage-container subpage-hero-container">
        <h1 class="subpage-hero-title">{{ pageTitle || categoryTitle }}</h1>
        <p v-if="pageDescription" class="subpage-hero-desc">{{ pageDescription }}</p>
      </div>
    </section>


    <!-- 메인 상세 컨텐츠 영역 -->
    <div class="subpage-content-area">
      <div class="subpage-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  categoryTitle: {
    type: String,
    required: true
  },
  categoryEn: {
    type: String,
    default: ''
  },
  categoryUrl: {
    type: String,
    default: ''
  },
  pageTitle: {
    type: String,
    default: ''
  },
  pageDescription: {
    type: String,
    default: ''
  },
  heroImage: {
    type: String,
    default: ''
  },
  tabs: {
    type: Array,
    default: () => []
  },
  hideHero: {
    type: Boolean,
    default: false
  }
});

const route = useRoute();
const currentPath = computed(() => route.path);
const contentStartRef = ref(null);

const scrollToContent = () => {
  if (contentStartRef.value) {
    contentStartRef.value.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }
};
</script>

<style scoped>
.subpage-visual-hero-fullscreen {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  padding-top: 110px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
}

.visual-hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    110deg,
    rgba(6, 17, 32, 0.78) 0%,
    rgba(8, 24, 44, 0.68) 50%,
    rgba(10, 26, 46, 0.60) 100%
  );
  backdrop-filter: blur(1px);
  z-index: 1;
}

.visual-hero-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.visual-hero-category-en {
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 14px;
}

.visual-hero-title {
  font-size: 52px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0;
  color: #ffffff;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

.visual-hero-underline {
  width: 52px;
  height: 3px;
  background-color: #ffffff;
  margin: 18px auto 20px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.visual-hero-desc {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.92);
  max-width: 820px;
  margin: 0 auto;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
  word-break: keep-all;
}

/* 하단 스크롤 인디케이터 */
.visual-scroll-indicator {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  z-index: 10;
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.3s ease;
  user-select: none;
}

.visual-scroll-indicator:hover {
  color: #ffffff;
  transform: translateX(-50%) translateY(3px);
}

.scroll-label {
  font-size: 10px;
  letter-spacing: 0.22em;
  font-weight: 700;
  text-transform: uppercase;
}

.scroll-mouse-track {
  width: 2px;
  height: 36px;
  background: rgba(255, 255, 255, 0.35);
  position: relative;
  overflow: hidden;
  border-radius: 1px;
}

.scroll-wheel-bar {
  width: 100%;
  height: 45%;
  background: #ffffff;
  position: absolute;
  top: -45%;
  animation: scrollTrackDown 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

@keyframes scrollTrackDown {
  0% { top: -45%; opacity: 0; }
  30% { opacity: 1; }
  85% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

@media (max-width: 768px) {
  .subpage-visual-hero-fullscreen {
    padding-top: 100px;
  }
  .visual-hero-title {
    font-size: 34px;
  }
  .visual-hero-desc {
    font-size: 15px;
  }
}
</style>
