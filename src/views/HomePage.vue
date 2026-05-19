<template>
  <div 
    class="home-page-container" 
    @wheel="handleWheel"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- 全屏滑动总轨道 -->
    <div 
      class="page-track" 
      :style="{ transform: `translateY(-${activeIndex * 100}vh)` }"
    >
      <div id="hero" class="page-section" :class="{ 'active-section': activeIndex === 0 || revealed[0] }">
        <HeroSection />
      </div>

      <div id="news" class="page-section center-content" :class="{ 'active-section': activeIndex === 1 || revealed[1] }">
        <div class="section-container scroll-reveal">
          <NewsSection />
        </div>
      </div>

      <div id="notices" class="page-section center-content" :class="{ 'active-section': activeIndex === 2 || revealed[2] }">
        <div class="section-container scroll-reveal">
          <NoticeSection />
        </div>
      </div>

      <div id="admission" class="page-section center-content" :class="{ 'active-section': activeIndex === 3 || revealed[3] }">
        <div class="section-container scroll-reveal">
          <AdmissionVideoSection />
        </div>
      </div>

      <div id="showcase" class="page-section center-content" :class="{ 'active-section': activeIndex === 4 || revealed[4] }">
        <div class="section-container scroll-reveal">
          <CampusShowcase />
        </div>
      </div>

      <div id="links" class="page-section last-section" :class="{ 'active-section': activeIndex === 5 || revealed[5] }">
        <div class="last-section-inner">
          <div class="section-container scroll-reveal">
            <QuickLinks />
          </div>
          <!-- 融合首页底部页脚 -->
          <AppFooter />
        </div>
      </div>
    </div>

    <!-- 侧边导航指示器 (Tsinghua AI Style) -->
    <nav class="side-nav">
      <button 
        v-for="(section, idx) in sections" 
        :key="section.id" 
        @click="goToSection(idx)"
        :class="{ active: activeIndex === idx }"
        :title="section.label"
      >
        <span class="nav-label">{{ section.label }}</span>
        <span class="dot-wrapper">
          <span class="nav-dot-inner"></span>
        </span>
      </button>
    </nav>

    <!-- 方案 B：对角线数智极简流线 (边缘等高数学函数流线，绝不污染正文) -->
    <div class="academic-curves-bg">
      <!-- 右上角波形群 -->
      <svg class="corner-curve-svg curve-top-right" viewBox="0 0 400 300" preserveAspectRatio="none">
        <path d="M 120,0 C 220,90 280,40 400,100" />
        <path d="M 70,0 C 190,110 250,60 400,140" />
        <path d="M 20,0 C 160,130 220,80 400,180" />
      </svg>
      <!-- 左下角波形群 -->
      <svg class="corner-curve-svg curve-bottom-left" viewBox="0 0 400 300" preserveAspectRatio="none">
        <path d="M 0,180 C 120,80 180,130 280,300" />
        <path d="M 0,140 C 150,60 210,110 330,300" />
        <path d="M 0,100 C 180,40 240,90 380,300" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import HeroSection from '../components/home/HeroSection.vue';
import NewsSection from '../components/home/NewsSection.vue';
import NoticeSection from '../components/home/NoticeSection.vue';
import AdmissionVideoSection from '../components/home/AdmissionVideoSection.vue';
import CampusShowcase from '../components/home/CampusShowcase.vue';
import QuickLinks from '../components/home/QuickLinks.vue';
import AppFooter from '../components/layout/AppFooter.vue';

const activeIndex = ref(0);
const revealed = ref<boolean[]>([true, false, false, false, false, false]);
const isScrolling = ref(false);

const sections = [
  { id: 'hero', label: '首屏首展' },
  { id: 'news', label: '学院头条' },
  { id: 'notices', label: '通知公告' },
  { id: 'admission', label: '招生视频' },
  { id: 'showcase', label: '学院风采' },
  { id: 'links', label: '快速通道' }
];

const goToSection = (index: number) => {
  if (isScrolling.value) return;
  isScrolling.value = true;
  activeIndex.value = index;
  setTimeout(() => {
    isScrolling.value = false;
  }, 1200);
};

// 触发 Header scrolled 伴随事件
watch(activeIndex, (newVal) => {
  revealed.value[newVal] = true;
  window.dispatchEvent(new CustomEvent('page-scroll', { detail: newVal }));
});

// 仿清华 AI 旗舰滑轮切换 (带 1200ms 高级阻尼锁，解决惯性与跳屏 Bug)
const handleWheel = (e: WheelEvent) => {
  e.preventDefault();
  if (isScrolling.value) return;

  const deltaY = e.deltaY;
  // 过滤微弱误触
  if (Math.abs(deltaY) < 30) return;

  if (deltaY > 0) {
    if (activeIndex.value < sections.length - 1) {
      isScrolling.value = true;
      activeIndex.value++;
      setTimeout(() => {
        isScrolling.value = false;
      }, 1200);
    }
  } else {
    if (activeIndex.value > 0) {
      isScrolling.value = true;
      activeIndex.value--;
      setTimeout(() => {
        isScrolling.value = false;
      }, 1200);
    }
  }
};

// 移动端轻扫手势
let touchStartY = 0;
const handleTouchStart = (e: TouchEvent) => {
  touchStartY = e.touches[0].clientY;
};

const handleTouchEnd = (e: TouchEvent) => {
  if (isScrolling.value) return;
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (Math.abs(deltaY) > 50) {
    if (deltaY > 0) {
      if (activeIndex.value < sections.length - 1) {
        isScrolling.value = true;
        activeIndex.value++;
        setTimeout(() => {
          isScrolling.value = false;
        }, 1200);
      }
    } else {
      if (activeIndex.value > 0) {
        isScrolling.value = true;
        activeIndex.value--;
        setTimeout(() => {
          isScrolling.value = false;
        }, 1200);
      }
    }
  }
};

onMounted(() => {
  // 全屏模式下首页溢出锁定
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
});
</script>

<style scoped>
.home-page-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /* 极简高雅的珍珠淡紫柔光渐变底色，完美兼顾“高级不素”与“绝对清爽零干扰”的终极解决方案 */
  background: radial-gradient(circle at 5% 5%, #F4EEFB 0%, #F8F7FC 55%, #FFFFFF 100%);
}

/* 全屏纵向滑动轨道，应用 1.2s 高级贝塞尔缓入缓出 */
.page-track {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 1.2s cubic-bezier(0.66, 0, 0.34, 1);
  will-change: transform;
}

/* 单个 Section 全视口容器 */
.page-section {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 2; /* 抬高至 2 层，覆盖在粒子特效之上，保持文字图片的前置清晰度 */
  background-color: transparent; /* 背景透明以使下方 Level 1 粒子与 Level 0 大底色完美透出 */
  overflow: hidden;
  box-sizing: border-box;
  flex-shrink: 0;
  padding-top: 120px; /* 每一个 slide 顶部预留出 120px 宽裕的空白，完美躲避顶栏 */
}

/* 第一个 slide 的 banner 必须占满全屏，不加顶部避让 padding */
#hero.page-section {
  padding-top: 0 !important;
}

/* 垂直居中 Section 内容 */
.page-section.center-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 最后一屏极简学术流 (QuickLinks + AppFooter 并行适配单屏) */
.page-section.last-section {
  display: flex;
  flex-direction: column;
}

.last-section-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.last-section-inner .section-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 20px;
}

/* 侧边悬浮指示点 */
.side-nav {
  position: fixed;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 95;
}

.side-nav button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;
  outline: none;
  position: relative;
  padding: 4px 0;
}

.dot-wrapper {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #ffffff; /* 纯白精致小线条边框 */
  background-color: var(--primary-color); /* GDUFE 官方学术紫底色 */
  box-shadow: 0 0 6px rgba(74, 18, 94, 0.25), 0 1.5px 3px rgba(0, 0, 0, 0.08); /* 精致小光晕与投影 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 晕染外圈 - 精细化紧凑晕染效果 */
.dot-wrapper::after {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(123, 44, 191, 0.3) 0%, rgba(123, 44, 191, 0) 70%);
  opacity: 0.5;
  transition: all 0.4s ease;
  pointer-events: none;
  filter: blur(1px); /* 微弱模糊，强化边界晕染 */
  z-index: -1;
}

.nav-dot-inner {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #ffffff; /* 纯白核心 */
  opacity: 0.5;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 文字标签 */
.nav-label {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  opacity: 0;
  transform: translateX(12px);
  transition: all 0.3s ease;
  pointer-events: none;
  white-space: nowrap;
  background-color: rgba(74, 18, 94, 0.95); /* 皇家紫气泡底 */
  padding: 4px 10px;
  border-radius: 4px;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Hover 触发交互效果 */
.side-nav button:hover .dot-wrapper {
  border-color: #ffffff;
  background-color: var(--highlight-color); /* 悬浮换亮紫色 */
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(123, 44, 191, 0.5), 0 1.5px 3px rgba(0, 0, 0, 0.1);
}

.side-nav button:hover .dot-wrapper::after {
  background: radial-gradient(circle, rgba(123, 44, 191, 0.4) 0%, rgba(123, 44, 191, 0) 70%);
  transform: scale(1.15);
  opacity: 0.8;
}

.side-nav button:hover .nav-dot-inner {
  opacity: 0.9;
  background-color: #ffffff;
}

.side-nav button:hover .nav-label {
  opacity: 1;
  transform: translateX(0);
}

/* 激活状态 */
.side-nav button.active .dot-wrapper {
  border-color: #ffffff; /* 保持纯白线条 */
  background-color: var(--highlight-color); /* 激活换亮紫底色 */
  box-shadow: 0 0 10px 2px rgba(123, 44, 191, 0.5), 0 0 5px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.15); /* 紧凑立体亮光晕 */
  transform: scale(1.15);
}

/* 激活时晕染外圈呈现紧凑呼吸律动 */
.side-nav button.active .dot-wrapper::after {
  background: radial-gradient(circle, rgba(123, 44, 191, 0.45) 0%, rgba(123, 44, 191, 0) 70%);
  transform: scale(1.25);
  opacity: 0.85;
  animation: dot-halo-pulse 2s infinite ease-in-out;
}

.side-nav button.active .nav-dot-inner {
  opacity: 1;
  width: 5px;
  height: 5px;
  background-color: #ffffff; /* 纯白激活中心星 */
}

/* 精细化边缘光圈呼吸晕染动画 */
@keyframes dot-halo-pulse {
  0% {
    transform: scale(1.0);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.85;
  }
  100% {
    transform: scale(1.0);
    opacity: 0.5;
  }
}

/* Section 视口载入渐现动画 */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.active-section .scroll-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1024px) {
  .side-nav {
    display: none;
  }
}

/* ==========================================
   方案 B：对角线数智极简流线 (边缘等高数学函数流线)
   ========================================== */
.academic-curves-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* 嵌在 Level 0 渐变之上，Level 2 内容之下 */
  pointer-events: none; /* 完全穿透，零点击干扰 */
  overflow: hidden;
}

.corner-curve-svg {
  position: absolute;
  fill: none;
  stroke: rgba(123, 44, 191, 0.08); /* 广财紫极淡线条，保持高奢质感 */
  stroke-width: 1.2px;
  transition: stroke 0.3s ease;
}

.dark .corner-curve-svg {
  stroke: rgba(255, 255, 255, 0.04); /* 暗黑模式下用微白透光线 */
}

/* 右上角流线 */
.curve-top-right {
  top: 0;
  right: 0;
  width: 32vw;
  height: 45vh;
}

/* 左下角流线 */
.curve-bottom-left {
  bottom: 0;
  left: 0;
  width: 32vw;
  height: 45vh;
}
</style>
