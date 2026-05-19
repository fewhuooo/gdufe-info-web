<template>
  <section class="campus-showcase-section" id="showcase-section">
    <div class="container">
      
      <!-- 栏目头部 -->
      <div class="column-header">
        <div class="title-with-icon">
          <div class="emblem-container">
            <svg class="purple-emblem" viewBox="0 0 64 64" fill="currentColor">
              <path d="M32,4 C38,12 48,22 48,32 C48,44 38,54 32,60 C26,54 16,44 16,32 C16,22 26,12 32,4 Z" class="emblem-bg" />
              <path d="M32,10 C35,18 42,24 42,32 C42,40 35,46 32,52 C29,46 22,40 22,32 C22,24 29,18 32,10 Z" class="emblem-fg" />
            </svg>
          </div>
          <h3 class="column-title">学院风采</h3>
        </div>
        <router-link to="/about" class="view-more-btn">
          <span>更多风采</span>
          <svg class="chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </router-link>
      </div>

      <!-- 交互式风采风光风琴折叠展墙 (Flex Accordion Showcase) -->
      <div class="accordion-wrapper">
        <div 
          v-for="(item, idx) in showcaseItems" 
          :key="item.title"
          class="accordion-card"
          :class="{ active: activeCard === idx }"
          @mouseenter="activeCard = idx"
          :style="{ 
            backgroundImage: `linear-gradient(to bottom, rgba(13, 27, 42, 0.2) 0%, rgba(13, 27, 42, 0.9) 100%), url(${item.image})` 
          }"
        >
          <!-- 磨砂分类标签 (浮动于左上角) -->
          <div class="card-category-badge">
            <span class="badge-dot"></span>
            <span class="badge-text">{{ item.category }}</span>
          </div>

          <!-- 正文信息块 (底部上滑浮现) -->
          <div class="card-content-box">
            <span class="card-index-num">0{{ idx + 1 }}</span>
            <h4 class="card-title">{{ item.title }}</h4>
            <p class="card-desc">{{ item.desc }}</p>
          </div>

          <!-- 微晶格刻度框线 -->
          <div class="card-mesh-grid"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeCard = ref(0);

// High fidelity academic showcase data. Images can be easily replaced by the user.
const showcaseItems = ref([
  {
    category: '教学科研',
    title: '数智极客实验室',
    desc: '配备顶尖高算力算力集群，支持大模型训练与大数据智能前沿探索科研实践。',
    image: '/src/assets/images/gdufe_sports_day.png' // Default demo image
  },
  {
    category: '学术交流',
    title: '海峡两岸前沿学术研讨会',
    desc: '定期开展国内外顶尖知名学者专题学术研讨会，碰撞学术与科技前沿的火花。',
    image: '/src/assets/images/gdufe_sports_day.png'
  },
  {
    category: '第二课堂',
    title: 'IT文化节科技创新挑战赛',
    desc: '丰富的科技类与创新竞赛活动，鼓励同学们在代码与设计实践中释放创造力。',
    image: '/src/assets/images/gdufe_sports_day.png'
  },
  {
    category: '美丽校园',
    title: '晨曦中的逸夫图书馆',
    desc: '绿树掩映中的广财学术朝圣之地，见证着每一位学子的拼搏与成长岁月。',
    image: '/src/assets/images/gdufe_sports_day.png'
  }
]);
</script>

<style scoped>
.campus-showcase-section {
  padding: 0;
  background-color: transparent;
  width: 100%;
}

.campus-showcase-section .container {
  width: 96% !important;
  max-width: 1750px !important;
  margin: 0 auto;
  padding: 0;
}

/* 栏目头部样式 */
.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 12px;
  margin-bottom: 32px;
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

.view-more-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.88rem;
  color: var(--accent-color);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.view-more-btn:hover {
  opacity: 0.8;
  transform: translateX(3px);
}

.chevron-right {
  width: 16px;
  height: 16px;
}

/* 风琴展墙核心容器 */
.accordion-wrapper {
  display: flex;
  width: 100%;
  height: 480px; /* 大图高度，极具气势 */
  gap: 16px;
}

/* 折叠卡片 */
.accordion-card {
  position: relative;
  flex: 1; /* 默认均等占比 */
  height: 100%;
  border-radius: var(--border-radius-lg); /* 微晶方正直角 3px */
  background-size: cover;
  background-position: center;
  background-color: var(--secondary-color); /* 智能回退学术底色 */
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  box-sizing: border-box;
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1); /* 高级缓动平滑过渡 */
}

/* 激活状态：宽度大拉伸 */
.accordion-card.active {
  flex: 3; /* 大幅拉伸视觉跨度 */
  box-shadow: var(--shadow-lg);
}

/* 分类小标签 */
.card-category-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 6px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 3;
  transition: background 0.3s;
}

.accordion-card.active .card-category-badge {
  background: rgba(255, 255, 255, 0.95);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: white;
  transition: background 0.3s;
}

.accordion-card.active .badge-dot {
  background-color: var(--accent-color);
}

.badge-text {
  font-size: 0.78rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.5px;
  transition: color 0.3s;
}

.accordion-card.active .badge-text {
  color: var(--secondary-color);
}

/* 信息文字排版 */
.card-content-box {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.card-index-num {
  font-family: var(--font-data);
  font-size: 2.2rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 8px;
  line-height: 1;
  transition: color 0.3s, transform 0.5s;
}

.accordion-card.active .card-index-num {
  color: var(--accent-color);
  transform: translateY(-2px);
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0 0 10px 0;
  white-space: nowrap; /* 保持单行显示 */
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 描述文字：非激活状态完全隐蔽，激活状态平滑上浮显现 */
.card-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin: 0;
  max-width: 650px;
  opacity: 0;
  height: 0;
  overflow: hidden;
  transform: translateY(15px);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.accordion-card.active .card-desc {
  opacity: 1;
  height: auto;
  margin-top: 4px;
  transform: translateY(0);
}

/* 极客风格科创网格浮层 */
.card-mesh-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.5s;
}

.accordion-card.active .card-mesh-grid {
  opacity: 0.15;
}

@media (max-width: 768px) {
  .accordion-wrapper {
    flex-direction: column;
    height: 650px;
    gap: 12px;
  }
  
  .accordion-card {
    width: 100%;
    padding: 20px;
  }
  
  .accordion-card.active {
    flex: 2;
  }
}
</style>
