<template>
  <section 
    class="mitsui-hero-viewport" 
    ref="heroContainerRef"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <div class="video-background-layer">
      <div 
        v-for="(vid, index) in heroVideos" 
        :key="vid.id"
        class="video-slide-item"
        :class="{ 'is-active': currentVideoIndex === index }"
      >
        <!-- 비디오 파일이 있고 정상 로드 시 비디오 재생 -->
        <video 
          v-if="vid.isVideo && !vid.hasError"
          :src="vid.src"
          autoplay 
          muted 
          loop 
          playsinline 
          class="hero-video-element"
          @error="onVideoError(index)"
        ></video>
        <img 
          v-else
          :src="vid.fallbackImage" 
          :alt="'AZAMINO Slide ' + (index + 1)" 
          class="hero-fallback-image"
        />
      </div>
    </div>

    <div 
      class="caption-stage-center"
      :class="{ 'is-active': activeCaptionStep === 1, 'is-hidden': activeCaptionStep !== 1 }"
    >

      <h1 class="center-innovation-title">Customer Innovation</h1>

      <button
        type="button"
        class="center-scroll-guide-btn"
        @click="goToStep(2)"
        title="다음 내용 보기"
      >

      </button>
    </div>

    <div 
      class="caption-stage-left-bottom"
      :class="{ 'is-active': activeCaptionStep === 2, 'is-hidden': activeCaptionStep !== 2 }"
    >
      <div class="lb-inner-container">
        <p class="lb-description-text">
          <span class="text-line line-1">{{ currentText.line1 }}</span>
          <span class="text-line line-2">{{ currentText.line2 }}</span>
          <span class="text-line line-3">{{ currentText.line3 }}</span>
        </p>
      </div>
    </div>



  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { currentLang } from '../../composables/useLanguage.js';

const heroContainerRef = ref(null);

const activeCaptionStep = ref(1);
let lastWheelTime = 0;
const WHEEL_COOLDOWN = 650;

const heroVideos = ref([
  {
    id: 1,
    isVideo: true,
    src: '/videos/video-1.mp4',
    fallbackImage: '/images/main/slide-main-tokyo.jpg',
    hasError: false
  },
  {
    id: 2,
    isVideo: false,
    src: '/videos/video-2.mp4',
    fallbackImage: '/videos/video-2.jpg',
    hasError: false
  },
  {
    id: 3,
    isVideo: false,
    src: '/videos/video-3.mp4',
    fallbackImage: '/videos/video-3.jpg',
    hasError: false
  },
  {
    id: 4,
    isVideo: false,
    src: '/videos/video-4.mp4',
    fallbackImage: '/videos/video-4.jpg',
    hasError: false
  },
  {
    id: 5,
    isVideo: false,
    src: '/videos/video-5.mp4',
    fallbackImage: '/videos/video-5.jpg',
    hasError: false
  }
]);

const currentVideoIndex = ref(0);
const isPlaying = ref(true);
let autoplayTimer = null;

const onVideoError = (index) => {
  if (heroVideos.value[index]) {
    heroVideos.value[index].hasError = true;
  }
};

const selectVideo = (idx) => {
  currentVideoIndex.value = idx;
};

const nextVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % heroVideos.value.length;
};

const prevVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value - 1 + heroVideos.value.length) % heroVideos.value.length;
};

const startAutoplay = () => {
  if (!isPlaying.value) return;
  stopAutoplay();
  autoplayTimer = setInterval(nextVideo, 8000);
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
};

const goToStep = (step) => {
  activeCaptionStep.value = step;
  lastWheelTime = Date.now();
};

const scrollDownToContent = () => {
  const nextSection = document.querySelector('.quick-topics-section') || document.querySelector('.mitsui-about-section');
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }
};

const handleWheel = (e) => {
  const scrollY = window.scrollY || window.pageYOffset;
  const isAtTop = scrollY <= 12;
  const now = Date.now();

  if (isAtTop) {
    if (e.deltaY > 15) {
      if (activeCaptionStep.value === 1) {
        e.preventDefault();
        if (now - lastWheelTime > WHEEL_COOLDOWN) {
          activeCaptionStep.value = 2;
          lastWheelTime = now;
        }
        return;
      }
      if (now - lastWheelTime < WHEEL_COOLDOWN) {
        e.preventDefault();
        return;
      }
    }
    else if (e.deltaY < -15) {
      if (activeCaptionStep.value === 2) {
        e.preventDefault();
        if (now - lastWheelTime > WHEEL_COOLDOWN) {
          activeCaptionStep.value = 1;
          lastWheelTime = now;
        }
        return;
      }
    }
  } else {
    if (scrollY <= 20 && activeCaptionStep.value === 1) {
      activeCaptionStep.value = 2;
    }
  }
};

let touchStartY = 0;
const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY;
};

const handleTouchMove = (e) => {
  const scrollY = window.scrollY || window.pageYOffset;
  if (scrollY > 12) return;

  const touchY = e.touches[0].clientY;
  const diff = touchStartY - touchY;
  const now = Date.now();

  if (diff > 40 && activeCaptionStep.value === 1) {
    e.preventDefault();
    if (now - lastWheelTime > WHEEL_COOLDOWN) {
      activeCaptionStep.value = 2;
      lastWheelTime = now;
    }
  } else if (diff < -40 && activeCaptionStep.value === 2) {
    e.preventDefault();
    if (now - lastWheelTime > WHEEL_COOLDOWN) {
      activeCaptionStep.value = 1;
      lastWheelTime = now;
    }
  }
};

const textByLang = {
  ko: {
    line1: '전 세계 거점과 전방위 산업 영역에서,',
    line2: '시장 정보와 인사이트, 글로벌 파트너십과 사업 역량을 결합하여 새로운 비즈니스를 창출합니다.',
    line3: '이를 통해 미래 성장 동력을 확보하고 글로벌 시장을 선도합니다.'
  },
  en: {
    line1: 'Across global hubs and across all industries,',
    line2: 'Combining market intelligence and insights with global partnerships and business capabilities to create new ventures.',
    line3: 'This enables us to secure future growth drivers and lead the global market.'
  },
  ja: {
    line1: '世界中の拠点とあらゆる産業分野において、',
    line2: '市場情報とインサイト、グローバルパートナーシップと事業能力を組み合わせ、新たなビジネスを創出します。',
    line3: 'これにより、将来の成長動力を確保し、グローバル市場をリードします。'
  }
};

const currentText = computed(() => {
  return textByLang[currentLang.value] || textByLang.ko;
});

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  startAutoplay();

  // /videos/ 폴더 내 mp4 비디오 파일 존재 여부 자동 감지
  heroVideos.value.forEach((item, idx) => {
    if (idx > 0 && !item.isVideo) {
      fetch(item.src, { method: 'HEAD' })
        .then(res => {
          if (res.ok && res.headers.get('content-type')?.includes('video')) {
            item.isVideo = true;
          }
        })
        .catch(() => {});
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', handleTouchMove);
  stopAutoplay();
});
</script>

<style scoped>
.mitsui-hero-viewport {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 640px;
  overflow: hidden;
  background-color: #030812;
  font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
  color: #ffffff;
}

/* ==========================================================================
   5개 비디오 배경 레이어
   ========================================================================== */
.video-background-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.video-slide-item {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), visibility 1.2s ease;
  z-index: 1;
}

.video-slide-item.is-active {
  opacity: 1;
  visibility: visible;
  z-index: 2;
}

.hero-video-element,
.hero-fallback-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.hero-cinematic-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(3, 8, 18, 0.35) 0%,
    rgba(3, 8, 18, 0.72) 75%,
    rgba(3, 8, 18, 0.9) 100%
  );
  z-index: 3;
  pointer-events: none;
}

/* ==========================================================================
   1. 중앙 자막 (Customer Innovation)
   ========================================================================== */
.caption-stage-center {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  text-align: center;
  color: #ffffff;
  width: 90%;
  max-width: 1100px;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.caption-stage-center.is-hidden {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.92) translateY(-30px);
  pointer-events: none;
}

.center-badge-wrap {
  margin-bottom: 20px;
}

.center-top-tag {
  display: inline-block;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.22em;
  color: #38bdf8;
  padding: 6px 18px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(8px);
}

.center-innovation-title {
  font-size: clamp(44px, 7vw, 92px);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.03em;
  line-height: 1.08;
  margin: 0 0 34px;
  text-shadow: 0 4px 32px rgba(0, 0, 0, 0.65);
  word-break: keep-all;
}

.center-scroll-guide-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  transition: opacity 0.2s ease;
}

.center-scroll-guide-btn:hover {
  opacity: 0.8;
}

.scroll-mouse-icon {
  width: 22px;
  height: 34px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
  box-sizing: border-box;
}

.scroll-wheel {
  width: 3px;
  height: 6px;
  background-color: #38bdf8;
  border-radius: 2px;
  animation: scrollWheelAnim 1.6s ease-in-out infinite;
}

@keyframes scrollWheelAnim {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(12px); opacity: 0; }
}

.scroll-guide-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.7);
}

/* ==========================================================================
   2. 왼쪽 하단 자막 (스크롤 후 나타나는 3줄 설명)
   ========================================================================== */
.caption-stage-left-bottom {
  position: absolute;
  bottom: 84px;
  left: 64px;
  z-index: 10;
  max-width: 980px;
  color: #ffffff;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.caption-stage-left-bottom.is-hidden {
  opacity: 0;
  transform: translateY(40px);
  pointer-events: none;
}

.lb-inner-container {
  display: flex;
  flex-direction: column;
}

.lb-tag-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.lb-accent-bar {
  display: inline-block;
  width: 3.5px;
  height: 24px;
  background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%);
  border-radius: 2px;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.5);
}

.lb-category-name {
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #38bdf8;
  text-transform: uppercase;
}

.step-back-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-left: 6px;
}

.step-back-btn:hover {
  background: #38bdf8;
  color: #000000;
}

.lb-description-text {
  font-size: clamp(17px, 1.85vw, 24px);
  font-weight: 600;
  line-height: 1.65;
  color: #ffffff;
  margin: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
  word-break: keep-all;
}

.text-line {
  display: block;
}

.text-line.line-1 {
  color: #f1f5f9;
}

.text-line.line-2 {
  color: #ffffff;
}

.text-line.line-3 {
  color: #93c5fd;
  font-weight: 700;
}

.lb-scroll-next-hint {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #38bdf8;
  cursor: pointer;
  transition: transform 0.2s ease;
  width: fit-content;
}

.lb-scroll-next-hint svg {
  width: 14px;
  height: 14px;
  animation: bounceDown 1.5s infinite;
}

@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}

.lb-scroll-next-hint:hover {
  transform: translateX(4px);
}

/* ==========================================================================
   자막 단계 도트 (1 / 2)
   ========================================================================== */
.caption-step-dots {
  position: absolute;
  left: 28px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 15;
}

.step-dot-btn {
  width: 6px;
  height: 24px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.step-dot-btn.active {
  background: #38bdf8;
  height: 38px;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
}

/* ==========================================================================
   3. 우측 하단 5개 비디오 컨트롤러 (01 ~ 05)
   ========================================================================== */
.hero-video-controls-bar {
  position: absolute;
  bottom: 40px;
  right: 56px;
  z-index: 15;
}

.controls-pill-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(6, 15, 28, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 40px;
  padding: 6px 12px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.vid-ctrl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vid-ctrl-btn svg {
  width: 14px;
  height: 14px;
}

.vid-ctrl-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #38bdf8;
}

.vid-numbers-group {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 4px;
}

.vid-num-pill {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
  background: transparent;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: all 0.25s ease;
  font-feature-settings: "tnum";
}

.vid-num-pill:hover {
  color: #ffffff;
}

.vid-num-pill.active {
  background: #38bdf8;
  color: #06111f;
  box-shadow: 0 0 14px rgba(56, 189, 248, 0.5);
}

@media (max-width: 1024px) {
  .caption-stage-left-bottom {
    bottom: 90px;
    left: 36px;
    right: 36px;
  }
  .hero-video-controls-bar {
    bottom: 24px;
    right: 24px;
  }
  .caption-step-dots {
    display: none;
  }
}

@media (max-width: 768px) {
  .mitsui-hero-viewport {
    min-height: 580px;
  }
  .center-innovation-title {
    font-size: 38px;
  }
  .caption-stage-left-bottom {
    bottom: 84px;
    left: 20px;
    right: 20px;
  }
  .lb-description-text {
    font-size: 15px;
    line-height: 1.6;
  }
  .hero-video-controls-bar {
    bottom: 20px;
    right: 16px;
  }
  .controls-pill-wrapper {
    padding: 4px 8px;
    gap: 4px;
  }
  .vid-num-pill {
    padding: 4px 6px;
    font-size: 11px;
  }
}
</style>
