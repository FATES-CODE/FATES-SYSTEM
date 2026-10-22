<template>
  <section class="mitsui-globe-section" id="mitsui-globe-section">
    <div class="globe-container">
      <div class="globe-layout">
        <!-- 좌측 컬럼: 360 혁신 타이포그래피 + 3D 회전 지구본 (우측 스크롤 시 스티키 고정) -->
        <div class="globe-left-col">
          <div class="globe-top-rule"></div>
          <span class="globe-tag">Innovation</span>
          <h2 class="globe-main-title">
            Continuing to<br />
            challenge and create,<br />
            for brighter futures.
          </h2>
          <p v-if="currentContent.desc" class="globe-sub-desc">
            {{ currentContent.desc }}
          </p>

          <!-- 3D 인터랙티브 회전 지구본 -->
          <div class="earth-canvas-wrapper" ref="earthContainerRef">
            <canvas ref="earthCanvasRef" class="earth-canvas"></canvas>
            <div class="earth-halo-glow"></div>
          </div>
        </div>

        <!-- 우측 컬럼: 세로로 3개 나열되는 비디오 쇼케이스 -->
        <div class="globe-right-col">
          <div class="video-cards-stack">
            <article
              v-for="(vid, idx) in videoList"
              :key="vid.id"
              class="video-showcase-card"
            >
              <!-- 비디오 뷰어 -->
              <div class="video-media-wrap">
                <video
                  :ref="el => setVideoRef(el, idx)"
                  :src="vid.src"
                  autoplay
                  muted
                  loop
                  playsinline
                  preload="auto"
                  class="showcase-video"
                  @timeupdate="e => onTimeUpdate(e, idx)"
                ></video>
                <button 
                  type="button"
                  class="video-play-btn" 
                  @click="togglePlay(idx)"
                  :title="playingStates[idx] ? 'Pause' : 'Play'"
                  aria-label="재생/일시정지"
                >
                  <svg v-if="!playingStates[idx]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                </button>
              </div>




              <div class="showcase-bottom-bar">


                <div class="showcase-meta">
                  <h3 class="meta-title">{{ vid.title }}</h3>
                </div>


              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import * as THREE from 'three';
import { currentLang } from '../../composables/useLanguage.js';

const textsByLang = {
  ko: {
    desc: '아자미노는 한국과 일본을 잇는 비즈니스 네트워크와 정밀한 데이터 기반 통찰력으로 지속 가능한 무역 솔루션을 실현합니다.',
    allBizBtn: 'All Business'
  },
  ja: {
    desc: 'AZAMINOは、緻密な市場分析と強固なインフラを通じて、持続可能な貿易ソリューションを実現します。',
    allBizBtn: 'All Business'
  },
  en: {
    desc: 'Azamino delivers sustainable trade solutions through sophisticated market analysis and robust infrastructure.',
    allBizBtn: 'All Business'
  }
};

const currentContent = computed(() => {
  return textsByLang[currentLang.value] || textsByLang.ja;
});

const videoList = [
  {
    id: 1,
    category: 'Corporate (DX)',
    title: 'Nutritional foods designed for dysphagia and geriatric care',
    src: '/videos/gaigosixyokuhin.mp4'
  },
  {
    id: 2,
    category: 'Chemicals & Energy',
    title: 'Shockproof, heavy-duty portable safe',
    src: '/videos/kane.mp4'
  },
  {
    id: 3,
    category: 'Global Trading & DX',
    title: 'Performance chemicals and specialty polymer solutions',
    src: '/videos/mainbanner-3.mp4'
  }
];

const videoRefs = ref([]);
const playingStates = ref([true, true, true]);
const progressValues = ref([0, 0, 0]);

const setVideoRef = (el, idx) => {
  if (el) videoRefs.value[idx] = el;
};

const togglePlay = (idx) => {
  const vid = videoRefs.value[idx];
  if (!vid) return;
  if (vid.paused) {
    vid.play();
    playingStates.value[idx] = true;
  } else {
    vid.pause();
    playingStates.value[idx] = false;
  }
};

const onTimeUpdate = (e, idx) => {
  const vid = e.target;
  if (vid && vid.duration) {
    progressValues.value[idx] = (vid.currentTime / vid.duration) * 100;
  }
};

const earthContainerRef = ref(null);
const earthCanvasRef = ref(null);

let scene, camera, renderer, earthMesh, cloudsMesh, animationFrameId;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotationX = 0;
let targetRotationY = 0;

const initEarth = () => {
  const container = earthContainerRef.value;
  const canvas = earthCanvasRef.value;
  if (!container || !canvas) return;

  const width = container.clientWidth || 380;
  const height = container.clientHeight || 380;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 2.68;

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 조명 설정
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
  sunLight.position.set(4, 2.5, 3.5);
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.25);
  rimLight.position.set(-3, -2, -2);
  scene.add(rimLight);

  // 고화질 텍스처 로드
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('/images/earth/earth_atmos_2048.jpg');
  const specularTexture = textureLoader.load('/images/earth/earth_specular_2048.jpg');
  const normalTexture = textureLoader.load('/images/earth/earth_normal_2048.jpg');
  const cloudsTexture = textureLoader.load('/images/earth/earth_clouds_1024.png');

  // 지구 구체
  const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    roughnessMap: specularTexture,
    roughness: 0.65,
    metalness: 0.1,
    normalMap: normalTexture,
    normalScale: new THREE.Vector2(0.5, 0.5)
  });
  earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  earthMesh.rotation.z = 0.41;
  scene.add(earthMesh);

  // 구름 레이어
  const cloudsGeometry = new THREE.SphereGeometry(1.018, 64, 64);
  const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: cloudsTexture,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
  cloudsMesh.rotation.z = 0.41;
  scene.add(cloudsMesh);

  // 마우스 인터랙티브 드래그 회전
  canvas.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onTouchEnd);

  animate();
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);

  if (!isDragging) {
    earthMesh.rotation.y += 0.0022;
    cloudsMesh.rotation.y += 0.0028;
  } else {
    earthMesh.rotation.y += targetRotationY;
    cloudsMesh.rotation.y += targetRotationY * 1.05;
    earthMesh.rotation.x += targetRotationX;
    cloudsMesh.rotation.x += targetRotationX;
    targetRotationX *= 0.92;
    targetRotationY *= 0.92;
  }

  renderer.render(scene, camera);
};

const onMouseDown = (e) => {
  isDragging = true;
  previousMousePosition = { x: e.clientX, y: e.clientY };
};

const onMouseMove = (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - previousMousePosition.x;
  const deltaY = e.clientY - previousMousePosition.y;

  targetRotationY = deltaX * 0.004;
  targetRotationX = deltaY * 0.004;

  previousMousePosition = { x: e.clientX, y: e.clientY };
};

const onMouseUp = () => {
  isDragging = false;
};

const onTouchStart = (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
};

const onTouchMove = (e) => {
  if (!isDragging || e.touches.length !== 1) return;
  const deltaX = e.touches[0].clientX - previousMousePosition.x;
  const deltaY = e.touches[0].clientY - previousMousePosition.y;

  targetRotationY = deltaX * 0.004;
  targetRotationX = deltaY * 0.004;

  previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
};

const onTouchEnd = () => {
  isDragging = false;
};

const handleResize = () => {
  if (!earthContainerRef.value || !renderer || !camera) return;
  const width = earthContainerRef.value.clientWidth;
  const height = earthContainerRef.value.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

onMounted(() => {
  nextTick(() => {
    initEarth();
    window.addEventListener('resize', handleResize);

    // 페이지 진입 시 비디오 즉시 재생 보장
    videoRefs.value.forEach((v, i) => {
      if (v) {
        v.muted = true;
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              playingStates.value[i] = true;
            })
            .catch(() => {
              playingStates.value[i] = false;
            });
        }
      }
    });
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(animationFrameId);

  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('touchmove', onTouchMove);
  window.removeEventListener('touchend', onTouchEnd);

  if (renderer) renderer.dispose();
  if (earthMesh) {
    earthMesh.geometry.dispose();
    earthMesh.material.dispose();
  }
  if (cloudsMesh) {
    cloudsMesh.geometry.dispose();
    cloudsMesh.material.dispose();
  }
});
</script>

<style scoped>
/* ==========================================================================
   미쓰이 360 글로벌 혁신 섹션 (다크 배경)
   ========================================================================== */
.mitsui-globe-section {
  background-color: #0b0e14;
  color: #ffffff;
  padding: 100px 0 120px;
  position: relative;
  overflow: visible;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.globe-container {
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
  padding: 0 52px;
  box-sizing: border-box;
}

.globe-layout {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 64px;
  position: relative;
}

/* ==========================================================================
   좌측: 타이포그래피 & 3D 회전 지구본 (우측 스크롤 시 스티키 고정)
   ========================================================================== */
.globe-left-col {
  display: flex;
  flex-direction: column;
  position: -webkit-sticky;
  position: sticky;
  top: 90px;
  align-self: flex-start;
  flex: 0 0 440px;
  max-width: 460px;
  z-index: 5;
}

.globe-top-rule {
  width: 100%;
  max-width: 300px;
  height: 1.5px;
  background-color: rgba(255, 255, 255, 0.75);
  margin-bottom: 20px;
}

.globe-tag {
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 14px;
  display: block;
}

.globe-main-title {
  font-size: clamp(28px, 2.8vw, 40px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: #ffffff;
  margin: 0 0 16px;
  word-break: keep-all;
}

.globe-sub-desc {
  font-size: 13.5px;
  color: #94a3b8;
  line-height: 1.65;
  margin: 0 0 16px;
  max-width: 420px;
  word-break: keep-all;
}

/* 3D 지구본 래퍼 */
.earth-canvas-wrapper {
  position: relative;
  width: 340px;
  height: 340px;
  margin-top: 6px;
  cursor: grab;
  user-select: none;
}

.earth-canvas-wrapper:active {
  cursor: grabbing;
}

.earth-canvas {
  width: 100%;
  height: 100%;
  display: block;
  outline: none;
}

.earth-halo-glow {
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  box-shadow: 0 0 45px 8px rgba(56, 189, 248, 0.22), inset 0 0 35px 3px rgba(56, 189, 248, 0.15);
  pointer-events: none;
}

/* ==========================================================================
   우측: 세로로 3개 나열되는 비디오 쇼케이스 스택
   ========================================================================== */
.globe-right-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.video-cards-stack {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.video-showcase-card {
  position: relative;
  width: 100%;
  background: #161b22;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.video-showcase-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
}

.video-media-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000000;
  overflow: hidden;
}

.showcase-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-play-btn {
  position: absolute;
  bottom: 22px;
  right: 22px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s;
}

.video-play-btn:hover {
  transform: scale(1.08);
  background: rgba(0, 0, 0, 0.8);
}

.video-play-btn svg {
  width: 18px;
  height: 18px;
}

.video-progress-track {
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.12);
  position: relative;
}

.video-progress-bar {
  height: 100%;
  background: #ffffff;
  transition: width 0.1s linear;
}

/* 하단 메타 & 전체 사업 링크 바 */
.showcase-bottom-bar {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  background: #11161d;
}

.all-biz-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #21262d;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  padding: 10px 18px;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  flex-shrink: 0;
}

.all-biz-btn:hover {
  background: #30363d;
  border-color: rgba(255, 255, 255, 0.35);
}

.btn-arrow-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.45);
  transition: transform 0.2s ease;
}

.btn-arrow-icon svg {
  width: 11px;
  height: 11px;
}

.all-biz-btn:hover .btn-arrow-icon {
  transform: translateX(3px);
}

.showcase-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  overflow: hidden;
}

.meta-category {
  font-size: 11.5px;
  font-weight: 600;
  color: #8b949e;
  letter-spacing: 0.03em;
}

.meta-title {
  font-size: 15.5px;
  font-weight: 700;
  color: #f0f6fc;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video-num-indicator {
  font-size: 13px;
  font-weight: 800;
  color: #64748b;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
}

/* ==========================================================================
   반응형 브레이크포인트
   ========================================================================== */
@media (max-width: 1080px) {
  .globe-layout {
    flex-direction: column;
    gap: 48px;
  }

  .globe-left-col {
    position: static;
    flex: none;
    max-width: 100%;
    width: 100%;
  }

  .earth-canvas-wrapper {
    margin: 16px auto 0;
    width: 320px;
    height: 320px;
  }

  .globe-top-rule {
    max-width: 100%;
  }

  .video-cards-stack {
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .mitsui-globe-section {
    padding: 70px 0;
  }

  .globe-container {
    padding: 0 20px;
  }

  .earth-canvas-wrapper {
    width: 280px;
    height: 280px;
  }

  .showcase-bottom-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    padding: 16px;
  }

  .all-biz-btn {
    width: 100%;
    justify-content: space-between;
  }
}
</style>