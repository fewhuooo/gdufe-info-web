<template>
  <div class="sub-page showcase-page">
    <!-- 顶部 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <div class="banner-left">
          <h1 class="banner-title">学院风采 <span>/ CAMPUS SHOWCASE</span></h1>
          <p class="banner-desc">教学科研 · 学术交流 · 第二课堂 · 美丽校园</p>
        </div>
        <div class="banner-right">
          <div class="breadcrumb">
            <router-link to="/">首页</router-link> <span>/</span> <span class="active">学院风采</span>
          </div>
        </div>
      </div>
      <div class="banner-pattern"></div>
    </div>

    <!-- 主体画廊区域 -->
    <div class="container gallery-container-wrapper">
      
      <!-- 智能控制工具栏 -->
      <div class="gallery-controls-bar">
        <!-- 分类选择器 -->
        <div class="filter-tabs">
          <button 
            v-for="tab in filterTabs" 
            :key="tab.id"
            :class="{ active: activeFilter === tab.id }"
            @click="activeFilter = tab.id"
            class="filter-tab-btn"
          >
            <span class="tab-label">{{ tab.name }}</span>
            <span class="tab-badge">{{ getCategoryCount(tab.id) }}</span>
          </button>
        </div>

        <!-- 幻灯片自动轮播开关 -->
        <div class="slideshow-toggle-wrapper">
          <button 
            @click="toggleAutoplay" 
            class="slideshow-btn" 
            :class="{ playing: isAutoplayActive }"
            title="自动轮播画廊"
          >
            <svg class="play-icon" v-if="!isAutoplayActive" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <svg class="pause-icon" v-else viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
            <span>{{ isAutoplayActive ? '暂停轮播' : '自动放映' }}</span>
          </button>
        </div>
      </div>

      <!-- 网格照片展墙 -->
      <transition-group 
        name="gallery-grid" 
        tag="div" 
        class="gallery-grid"
      >
        <div 
          v-for="(item, idx) in filteredItems" 
          :key="item.id"
          class="gallery-card"
          @click="openLightbox(item)"
        >
          <!-- 图片载入层 -->
          <div class="card-image-box">
            <img :src="item.image" :alt="item.title" loading="lazy" />
            <div class="image-overlay">
              <div class="zoom-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
          </div>

          <!-- 卡片说明层 -->
          <div class="card-info-box">
            <div class="card-meta">
              <span class="card-tag-badge" :class="item.category">{{ item.categoryName }}</span>
              <span class="card-index">0{{ item.id }}</span>
            </div>
            <h3 class="card-title-text">{{ item.title }}</h3>
            <p class="card-desc-preview">{{ item.desc }}</p>
          </div>
          
          <!-- 科创微晶格刻度框线 -->
          <div class="card-border-glow"></div>
        </div>
      </transition-group>

      <!-- 缺省状态 -->
      <div v-if="filteredItems.length === 0" class="gallery-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <p>暂无该分类风采图片</p>
      </div>

    </div>

    <!-- 顶配沉浸式 Lightbox 弹窗 -->
    <transition name="lightbox-fade">
      <div 
        v-if="isLightboxOpen" 
        class="lightbox-overlay"
        @click.self="closeLightbox"
      >
        <!-- 顶部控制面板 -->
        <div class="lightbox-header">
          <div class="lightbox-title-section">
            <span class="lightbox-badge" :class="activeLightboxItem.category">
              {{ activeLightboxItem.categoryName }}
            </span>
            <span class="lightbox-counter">{{ currentLightboxIndex + 1 }} / {{ filteredItems.length }}</span>
          </div>
          <div class="lightbox-controls">
            <!-- 播放进度圈 (Autoplay 时显示) -->
            <div class="autoplay-timer-circle" v-if="isAutoplayActive">
              <svg viewBox="0 0 36 36" class="timer-svg">
                <path 
                  class="timer-bg" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path 
                  class="timer-stroke" 
                  :style="{ strokeDasharray: autoplayProgress + ', 100' }"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
            
            <button class="control-btn" @click="toggleAutoplay" :title="isAutoplayActive ? '暂停' : '轮播'">
              <svg v-if="!isAutoplayActive" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </button>
            <button class="control-btn close-btn" @click="closeLightbox" title="关闭 (Esc)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- 左右切换按键 -->
        <button class="nav-btn prev-btn" @click="navigateLightbox('prev')" title="上一张 (←)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button class="nav-btn next-btn" @click="navigateLightbox('next')" title="下一张 (→)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <!-- 居中高保真图片展示 -->
        <div class="lightbox-media-container" @click.self="closeLightbox">
          <transition name="lightbox-image-slide" mode="out-in">
            <img 
              :key="activeLightboxItem.id" 
              :src="activeLightboxItem.image" 
              :alt="activeLightboxItem.title"
              class="lightbox-image" 
            />
          </transition>
        </div>

        <!-- 底部磨砂玻璃详情面板 -->
        <div class="lightbox-footer-panel">
          <div class="footer-panel-inner">
            <h2 class="lightbox-item-title">{{ activeLightboxItem.title }}</h2>
            <p class="lightbox-item-desc">{{ activeLightboxItem.desc }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { showcaseItems, ShowcaseItem } from '../data/showcaseData';

// Filter tabs definitions
const filterTabs = [
  { id: 'all', name: '全部' },
  { id: 'research', name: '教学科研' },
  { id: 'exchange', name: '学术交流' },
  { id: 'activities', name: '第二课堂' },
  { id: 'campus', name: '美丽校园' }
];

const activeFilter = ref('all');

// Compute items based on selected tab filter
const filteredItems = computed(() => {
  if (activeFilter.value === 'all') {
    return showcaseItems;
  }
  return showcaseItems.filter(item => item.category === activeFilter.value);
});

// Helper: dynamic category counters
const getCategoryCount = (categoryId: string) => {
  if (categoryId === 'all') {
    return showcaseItems.length;
  }
  return showcaseItems.filter(item => item.category === categoryId).length;
};

// Lightbox state management
const isLightboxOpen = ref(false);
const activeLightboxItem = ref<ShowcaseItem>(showcaseItems[0]);

// Find active item's index in the currently filtered list
const currentLightboxIndex = computed(() => {
  return filteredItems.value.findIndex(item => item.id === activeLightboxItem.value.id);
});

const openLightbox = (item: ShowcaseItem) => {
  activeLightboxItem.value = item;
  isLightboxOpen.value = true;
  document.body.style.overflow = 'hidden'; // Lock background scroll
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
  isAutoplayActive.value = false; // Turn off slideshow on close
  document.body.style.overflow = ''; // Release scroll
};

// Navigate lightbox left or right
const navigateLightbox = (direction: 'next' | 'prev') => {
  if (filteredItems.value.length <= 1) return;
  
  let newIdx = currentLightboxIndex.value;
  if (direction === 'next') {
    newIdx = (currentLightboxIndex.value + 1) % filteredItems.value.length;
  } else {
    newIdx = (currentLightboxIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length;
  }
  
  activeLightboxItem.value = filteredItems.value[newIdx];
  // Reset progress bar on manual switch
  if (isAutoplayActive.value) {
    resetAutoplayTimer();
  }
};

// Autoplay Slideshow system
const isAutoplayActive = ref(false);
const autoplayProgress = ref(0);
let autoplayTimer: number | null = null;
let progressTimer: number | null = null;
const slideDuration = 5000; // 5 seconds per slide

const toggleAutoplay = () => {
  isAutoplayActive.value = !isAutoplayActive.value;
  if (isAutoplayActive.value) {
    // If lightbox is not open, open it with the first active item
    if (!isLightboxOpen.value && filteredItems.value.length > 0) {
      openLightbox(filteredItems.value[0]);
    }
    startAutoplay();
  } else {
    stopAutoplay();
  }
};

const startAutoplay = () => {
  stopAutoplay();
  autoplayProgress.value = 0;
  
  // Progress animation tick (every 50ms)
  const tickTime = 50;
  const increments = (tickTime / slideDuration) * 100;
  
  progressTimer = window.setInterval(() => {
    autoplayProgress.value = Math.min(autoplayProgress.value + increments, 100);
    if (autoplayProgress.value >= 100) {
      navigateLightbox('next');
      autoplayProgress.value = 0;
    }
  }, tickTime);
};

const stopAutoplay = () => {
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
  autoplayProgress.value = 0;
};

const resetAutoplayTimer = () => {
  if (isAutoplayActive.value) {
    startAutoplay();
  }
};

// Watchers
watch(activeFilter, () => {
  // If active filter changes and lightbox is open, ensure active item updates to first item or closes
  if (isLightboxOpen.value) {
    if (filteredItems.value.length > 0) {
      activeLightboxItem.value = filteredItems.value[0];
    } else {
      closeLightbox();
    }
  }
});

// Keyboard navigation listeners
const handleKeyDown = (e: KeyboardEvent) => {
  if (!isLightboxOpen.value) return;
  if (e.key === 'ArrowRight') {
    navigateLightbox('next');
  } else if (e.key === 'ArrowLeft') {
    navigateLightbox('prev');
  } else if (e.key === 'Escape') {
    closeLightbox();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  stopAutoplay();
  document.body.style.overflow = '';
});
</script>

<style scoped>
.showcase-page {
  background-color: #faf9fd; /* 精美浅晶灰紫色底 */
  min-height: 100vh;
  padding-bottom: 80px;
}

.dark .showcase-page {
  background-color: #0b090f;
}

/* sub-banner custom override */
.sub-banner {
  background-color: var(--secondary-color);
  padding: 50px 0;
  position: relative;
  overflow: hidden;
  color: white;
  margin-bottom: 40px;
  background-image: linear-gradient(135deg, #10002b 0%, #240046 60%, #3c096c 100%);
}

.banner-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
  width: 96% !important;
  max-width: 1750px !important;
}

.banner-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 10px 0;
}

.banner-title span {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.7;
  letter-spacing: 1px;
}

.banner-desc {
  font-size: 1rem;
  opacity: 0.85;
  margin: 0;
}

.breadcrumb {
  font-size: 0.9rem;
}

.breadcrumb a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb a:hover {
  color: var(--accent-color);
}

.breadcrumb span {
  margin: 0 8px;
  opacity: 0.5;
}

.breadcrumb .active {
  color: white;
  font-weight: 600;
}

.banner-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.7;
  pointer-events: none;
  z-index: 1;
}

/* main container */
.gallery-container-wrapper {
  width: 96% !important;
  max-width: 1750px !important;
  margin: 0 auto;
}

/* Control tools bar */
.gallery-controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(13, 27, 42, 0.06);
  padding-bottom: 20px;
  flex-wrap: wrap;
  gap: 20px;
}

.dark .gallery-controls-bar {
  border-bottom-color: rgba(255, 255, 255, 0.06);
}

/* Tabs */
.filter-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-tab-btn {
  background: white;
  border: 1px solid rgba(13, 27, 42, 0.06);
  padding: 12px 24px;
  border-radius: 30px;
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--shadow-sm);
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .filter-tab-btn {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
}

.filter-tab-btn:hover {
  transform: translateY(-2px);
  border-color: var(--accent-color);
  color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(123, 44, 191, 0.1);
}

.filter-tab-btn.active {
  background: var(--accent-color);
  color: white;
  border-color: var(--accent-color);
  box-shadow: 0 8px 24px rgba(123, 44, 191, 0.25);
}

.tab-badge {
  font-family: var(--font-data);
  font-size: 0.78rem;
  font-weight: 700;
  background: rgba(13, 27, 42, 0.05);
  padding: 2px 8px;
  border-radius: 10px;
  color: var(--text-secondary);
  transition: all 0.3s;
}

.filter-tab-btn.active .tab-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.dark .tab-badge {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

/* Autoplay toggle button */
.slideshow-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid rgba(13, 27, 42, 0.06);
  padding: 12px 20px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--secondary-color);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
}

.dark .slideshow-btn {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.05);
  color: white;
}

.slideshow-btn:hover {
  background-color: #f7f4ff;
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.dark .slideshow-btn:hover {
  background-color: rgba(123, 44, 191, 0.15);
}

.slideshow-btn.playing {
  background: #2ec4b6;
  color: white;
  border-color: #2ec4b6;
  box-shadow: 0 8px 20px rgba(46, 196, 182, 0.3);
}

.play-icon, .pause-icon {
  width: 14px;
  height: 14px;
}

/* Responsive grid layout */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 32px;
  width: 100%;
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

/* Showcase cards with hover scale */
.gallery-card {
  position: relative;
  background: white;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(13, 27, 42, 0.04);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dark .gallery-card {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.04);
}

.gallery-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(123, 44, 191, 0.2);
}

.card-image-box {
  position: relative;
  width: 100%;
  padding-top: 60%; /* 5:3 Aspect ratio */
  background-color: var(--secondary-color);
  overflow: hidden;
}

.card-image-box img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.gallery-card:hover .card-image-box img {
  transform: scale(1.08);
}

/* Image overlay on hover */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(36, 0, 70, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 2;
}

.gallery-card:hover .image-overlay {
  opacity: 1;
}

.zoom-icon-wrapper {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: white;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transform: scale(0.8);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.gallery-card:hover .zoom-icon-wrapper {
  transform: scale(1);
}

.zoom-icon-wrapper svg {
  width: 24px;
  height: 24px;
}

/* Card metadata and content */
.card-info-box {
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-tag-badge {
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 12px;
  letter-spacing: 0.5px;
}

.card-tag-badge.research {
  background-color: rgba(123, 44, 191, 0.08);
  color: var(--accent-color);
}

.card-tag-badge.exchange {
  background-color: rgba(0, 150, 136, 0.08);
  color: #009688;
}

.card-tag-badge.activities {
  background-color: rgba(255, 152, 0, 0.08);
  color: #f57c00;
}

.card-tag-badge.campus {
  background-color: rgba(33, 150, 243, 0.08);
  color: #1976d2;
}

.card-index {
  font-family: var(--font-data);
  font-size: 1.1rem;
  font-weight: 800;
  color: rgba(13, 27, 42, 0.15);
}

.dark .card-index {
  color: rgba(255, 255, 255, 0.15);
}

.card-title-text {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin: 0 0 10px 0;
  line-height: 1.4;
  transition: color 0.3s;
}

.dark .card-title-text {
  color: white;
}

.gallery-card:hover .card-title-text {
  color: var(--accent-color);
}

.card-desc-preview {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Neon micro borders */
.card-border-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 0;
  background-color: var(--accent-color);
  transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.gallery-card:hover .card-border-glow {
  width: 100%;
}

/* Empty State */
.gallery-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: var(--text-secondary);
}

.gallery-empty-state svg {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.gallery-empty-state p {
  font-size: 1.1rem;
  font-weight: 500;
}

/* High Fidelity Immersive Lightbox styles */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(7, 3, 15, 0.94);
  backdrop-filter: blur(15px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.lightbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  z-index: 10;
}

.lightbox-title-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.lightbox-badge {
  font-size: 0.85rem;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 20px;
  color: white;
}

.lightbox-badge.research { background-color: var(--accent-color); }
.lightbox-badge.exchange { background-color: #009688; }
.lightbox-badge.activities { background-color: #f57c00; }
.lightbox-badge.campus { background-color: #1976d2; }

.lightbox-counter {
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-data);
  font-weight: 600;
  font-size: 1rem;
}

.lightbox-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Autoplay Loader Circle Dynamic Dash style */
.autoplay-timer-circle {
  width: 32px;
  height: 32px;
}

.timer-svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.timer-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 3;
}

.timer-stroke {
  fill: none;
  stroke: #2ec4b6;
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dasharray 0.05s linear;
}

.control-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:hover {
  background: white;
  color: var(--secondary-color);
  transform: scale(1.05);
}

.control-btn svg {
  width: 20px;
  height: 20px;
}

.close-btn:hover {
  background-color: #ff4d4d;
  border-color: #ff4d4d;
  color: white;
}

/* Nav arrows style */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.nav-btn:hover {
  background: white;
  color: var(--secondary-color);
  border-color: white;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.prev-btn { left: 40px; }
.next-btn { right: 40px; }

.nav-btn svg {
  width: 28px;
  height: 28px;
}

/* Media area */
.lightbox-media-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 140px;
  overflow: hidden;
}

.lightbox-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

/* Glass footer panel */
.lightbox-footer-panel {
  background: rgba(18, 11, 28, 0.6);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 30px 40px;
  z-index: 10;
}

.footer-panel-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  color: white;
}

.lightbox-item-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  letter-spacing: 0.5px;
}

.lightbox-item-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin: 0;
}

/* Responsive fixes */
@media (max-width: 768px) {
  .lightbox-header {
    padding: 15px 20px;
  }
  .lightbox-media-container {
    padding: 20px;
  }
  .nav-btn {
    width: 48px;
    height: 48px;
  }
  .prev-btn { left: 10px; }
  .next-btn { right: 10px; }
  .lightbox-footer-panel {
    padding: 20px;
  }
  .lightbox-item-title {
    font-size: 1.25rem;
  }
  .lightbox-item-desc {
    font-size: 0.85rem;
  }
}

/* Animations */
.gallery-grid-enter-active,
.gallery-grid-leave-active {
  transition: all 0.5s ease;
}

.gallery-grid-enter-from,
.gallery-grid-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(30px);
}

.gallery-grid-move {
  transition: transform 0.5s ease;
}

/* Lightbox Fade animation */
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.4s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

/* Image slide animation */
.lightbox-image-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.lightbox-image-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.lightbox-image-slide-enter-from {
  opacity: 0;
  transform: scale(0.97) translateY(10px);
}

.lightbox-image-slide-leave-to {
  opacity: 0;
  transform: scale(0.97) translateY(-10px);
}
</style>
