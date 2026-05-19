<template>
  <section class="admission-video-section" id="admission-section">
    <div class="container">
      <div class="admission-grid">
        
        <!-- 左侧：文字列表与品牌水印背景 -->
        <div class="admission-left-col">
          <!-- 栏目头部 -->
          <div class="column-header">
            <div class="title-with-icon">
              <div class="emblem-container">
                <svg class="purple-emblem" viewBox="0 0 64 64" fill="currentColor">
                  <path d="M32,4 C38,12 48,22 48,32 C48,44 38,54 32,60 C26,54 16,44 16,32 C16,22 26,12 32,4 Z" class="emblem-bg" />
                  <path d="M32,10 C35,18 42,24 42,32 C42,40 35,46 32,52 C29,46 22,40 22,32 C22,24 29,18 32,10 Z" class="emblem-fg" />
                </svg>
              </div>
              <h3 class="column-title">招生视频</h3>
            </div>
          </div>

          <!-- 选项菜单列表 -->
          <div class="menu-list-wrapper">
            <div 
              v-for="item in menuItems" 
              :key="item.name" 
              class="menu-list-item"
            >
              <div class="item-left-group">
                <!-- 纯手绘矢量微晶立体图标，完美适配清华风 -->
                <div class="item-icon-box" v-html="item.iconSvg"></div>
                <span class="item-name-text">{{ item.name }}</span>
              </div>
              
              <div class="item-right-arrow">
                <svg class="chevron-right-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：招生视频播放区 -->
        <div class="admission-right-col">
          <div class="video-card-container">
            <!-- 刚刚由AI高拟真生成的广财校运会背景大图 -->
            <img 
              src="/src/assets/images/gdufe_sports_day.png" 
              alt="广东财经大学教职工趣味运动会" 
              class="video-cover-img"
            />
            
            <!-- 水晶磨砂黑色渐变底层标题遮罩 -->
            <div class="video-bottom-overlay">
              <h4 class="video-overlay-title">招生宣传视频</h4>
            </div>

            <!-- 经典白圈圆形发光播放按钮 (完全融合截图) -->
            <div class="video-play-btn-wrapper">
              <div class="circular-play-button">
                <svg class="play-arrow-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </div>
            </div>

            <!-- 微晶高科技边框线装饰 -->
            <div class="video-border-highlight"></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Menu items with high-fidelity inline SVGs perfectly matching the academic icon style in screenshot
const menuItems = ref([
  {
    name: '实习实践',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`
  },
  {
    name: '校园生活',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`
  },
  {
    name: '合作交流',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
  },
  {
    name: '查看更多',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>`
  }
]);
</script>

<style scoped>
.admission-video-section {
  padding: 0;
  background-color: transparent;
  width: 100%;
}

.admission-video-section .container {
  width: 100% !important;
  max-width: var(--container-width) !important;
  margin: 0 auto;
  padding: 0 20px;
}

.admission-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr; /* 精准左右分栏比例 */
  gap: 64px;
  width: 100%;
  align-items: stretch;
}

/* 左侧栏目及背景水印 */
.admission-left-col {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  overflow: hidden;
}

/* 栏目头部样式 */
.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 12px;
  margin-bottom: 24px;
  z-index: 2;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 12px;
}

.emblem-container {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.purple-emblem {
  width: 100%;
  height: 100%;
}

.emblem-bg {
  color: var(--accent-color);
  opacity: 0.15;
}

.emblem-fg {
  color: var(--accent-color);
}

.column-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin: 0;
  letter-spacing: 0.5px;
}

.dark .column-title {
  color: white;
}

/* 文字选项列表 (高度拟真合并截图) */
.menu-list-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 2;
}

.menu-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px;
  border-bottom: 1px dashed var(--border-color);
  cursor: pointer;
  background-color: transparent;
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: var(--border-radius); /* 完美适配方正直角 */
}

.menu-list-item:hover {
  background-color: rgba(123, 44, 191, 0.04); /* 极薄水晶淡紫色 */
  transform: translateX(4px);
}

.dark .menu-list-item:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

.item-left-group {
  display: flex;
  align-items: center;
  gap: 18px;
}

.item-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  width: 24px;
  height: 24px;
  transition: color 0.3s;
}

.menu-list-item:hover .item-icon-box {
  color: var(--accent-color);
}

:deep(.menu-icon) {
  width: 22px;
  height: 22px;
  stroke-width: 1.8;
}

.item-name-text {
  font-family: var(--font-heading);
  font-size: 1.15rem; /* 大气磅礴的字号 */
  font-weight: 600;
  color: var(--secondary-color);
  transition: color 0.3s;
}

.dark .item-name-text {
  color: rgba(255, 255, 255, 0.95);
}

.menu-list-item:hover .item-name-text {
  color: var(--accent-color);
}

.item-right-arrow {
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  opacity: 0.6;
  transition: all 0.3s;
}

.menu-list-item:hover .item-right-arrow {
  color: var(--accent-color);
  opacity: 1;
  transform: translateX(3px);
}

.chevron-right-svg {
  width: 18px;
  height: 18px;
}

/* 右侧视频卡片区 */
.admission-right-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-card-container {
  position: relative;
  width: 100%;
  height: 450px; /* 大图展示，给足分量 */
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  background-color: #000;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.video-card-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(13, 27, 42, 0.15);
}

.dark .video-card-container:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
}

.video-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.video-card-container:hover .video-cover-img {
  transform: scale(1.03);
}

/* 水晶黑色底部遮罩 */
.video-bottom-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 100%);
  padding: 24px 32px;
  box-sizing: border-box;
  z-index: 2;
}

.video-overlay-title {
  font-family: var(--font-heading);
  font-size: 1.35rem; /* 字号加大以匹配宽屏 */
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 经典圆形发光播放按钮 */
.video-play-btn-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  pointer-events: none;
}

.circular-play-button {
  width: 72px;
  height: 72px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15), 0 0 0 6px rgba(255, 255, 255, 0.2);
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--accent-color);
}

.video-card-container:hover .circular-play-button {
  background-color: white;
  transform: scale(1.08);
  color: var(--accent-color);
  box-shadow: 0 0 32px rgba(123, 44, 191, 0.4), 0 0 0 8px rgba(255, 255, 255, 0.25);
}

.play-arrow-svg {
  width: 28px;
  height: 28px;
  margin-left: 4px; /* 精调播放键三角形中心点视觉微移 */
}

/* 水晶边框线 */
.video-border-highlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  pointer-events: none;
  z-index: 4;
}

@media (max-width: 1024px) {
  .admission-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .video-card-container {
    height: 320px;
  }
}
</style>
