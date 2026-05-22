<template>
  <section class="notice-announcements-section" id="notice-section">
    <div class="container">
      <div class="notice-layout-grid">
        
        <!-- 左侧：通知公告 -->
        <div class="notice-left-col">
          <div class="column-header">
            <div class="title-with-icon">
              <!-- 抽象紫金火羽校徽图标 -->
              <div class="emblem-container">
                <svg class="purple-emblem" viewBox="0 0 64 64" fill="currentColor">
                  <path d="M32,4 C38,12 48,22 48,32 C48,44 38,54 32,60 C26,54 16,44 16,32 C16,22 26,12 32,4 Z" class="emblem-bg" />
                  <path d="M32,10 C35,18 42,24 42,32 C42,40 35,46 32,52 C29,46 22,40 22,32 C22,24 29,18 32,10 Z" class="emblem-fg" />
                </svg>
              </div>
              <h3 class="column-title">通知公告</h3>
            </div>
            <router-link to="/news#notices" class="view-more-btn">
              <span>查看更多</span>
              <svg class="chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </router-link>
          </div>

          <!-- 4条经典列表 -->
          <div class="notice-list-container">
            <router-link 
              v-for="item in notices" 
              :key="item.title" 
              :to="'/news/' + item.id"
              class="notice-list-item"
            >
              <h4 class="notice-item-title">{{ item.title }}</h4>
              <span class="notice-item-date">{{ item.date }}</span>
            </router-link>
          </div>

          <!-- 底部学校主楼线描装饰 (完美契合截图背景) -->
          <div class="campus-drawing-overlay">
            <svg viewBox="0 0 400 120" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M20 110h360M40 110V80h30v30M70 110V50h50v60M120 110V30h40v80M160 110V60h55v50M215 110V90h30v20M245 110V45h45v65M290 110V75h45v35M335 110V95h25v15" class="building-outline" />
              <path d="M45 80l12-10 13 10M75 50l25-18 25 18M125 30l20-15 20 15M250 45l22-16 23 16" class="roof-outline" />
            </svg>
          </div>
        </div>

        <!-- 右侧：学术信息 -->
        <div class="notice-right-col">
          <div class="column-header">
            <div class="title-with-icon">
              <!-- 抽象紫金火羽校徽图标 -->
              <div class="emblem-container">
                <svg class="purple-emblem" viewBox="0 0 64 64" fill="currentColor">
                  <path d="M32,4 C38,12 48,22 48,32 C48,44 38,54 32,60 C26,54 16,44 16,32 C16,22 26,12 32,4 Z" class="emblem-bg" />
                  <path d="M32,10 C35,18 42,24 42,32 C42,40 35,46 32,52 C29,46 22,40 22,32 C22,24 29,18 32,10 Z" class="emblem-fg" />
                </svg>
              </div>
              <h3 class="column-title">学术信息</h3>
            </div>
            <router-link to="/news#academic" class="view-more-btn">
              <span>查看更多</span>
              <svg class="chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </router-link>
          </div>

          <!-- 2x2 学术信息卡片宫格 -->
          <div class="academic-grid-2x2">
            <router-link 
              v-for="card in academics" 
              :key="card.title" 
              :to="'/news/' + card.id"
              class="academic-card-item"
              :class="{ 'highlighted-active': card.highlight }"
            >
              <!-- 浮动左上角 3D 折叠绶带 date Badge -->
              <div class="ribbon-date-badge">
                <span class="ribbon-text">{{ card.date }}</span>
                <span class="ribbon-fold"></span>
              </div>

              <!-- 卡片正文标题 -->
              <div class="academic-card-body">
                <h4 class="academic-card-title">{{ card.title }}</h4>
              </div>
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Left notifications data
const notices = ref([
  {
    title: "关于2025级普教本科生辅修专业报名的通知",
    date: "2026.4.29",
    id: "11"
  },
  {
    title: "广东财经大学大数据与人工智能学院2026年智能科学与技术专业硕士研究生招生简章",
    date: "2026.4.09",
    id: "12"
  },
  {
    title: "广东财经大学大数据与人工智能学院2026年硕士研究生招生考试调剂通知",
    date: "2026.4.08",
    id: "13"
  },
  {
    title: "广东财经大学大数据与人工智能学院2026年硕士研究生招生考试调剂工作办法",
    date: "2026.4.01",
    id: "14"
  }
]);

// Right academic grid data (Card 3 highlighted in solid purple as shown in the screenshot)
const academics = ref([
  {
    date: "2025.12.10",
    title: "2025机器学习进展及应用学术会议 (WAAML 2025) 在我校召开",
    highlight: false,
    id: "15"
  },
  {
    date: "2025.11.11",
    title: "我院举办“大型语言模型的双面性：网络安全视角下的利和弊”专题学术报告会",
    highlight: false,
    id: "16"
  },
  {
    date: "2025.9.11",
    title: "我院举办“复杂经济管理下的统计学习与管理决策”专题学术报告会",
    highlight: true,
    id: "17"
  },
  {
    date: "2025.8.29",
    title: "我院邀请吉林大学王晰巍教授作图书情报专题指导报告",
    highlight: false,
    id: "18"
  }
]);
</script>

<style scoped>
.notice-announcements-section {
  padding: 0;
  background-color: transparent;
  width: 100%;
}

.notice-announcements-section .container {
  width: 96% !important;
  max-width: 1750px !important;
  margin: 0 auto;
  padding: 0;
}

.notice-layout-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr; /* 左右两栏完美对称比例 */
  gap: 64px; /* 宽裕呼吸感间距 */
  width: 100%;
}

/* 通用栏目头部样式 */
.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 12px;
  margin-bottom: 28px;
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

/* 左栏：通知公告列表 */
.notice-left-col {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.notice-list-container {
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.notice-list-item {
  padding: 16px 0;
  border-bottom: 1px dashed var(--border-color);
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none; /* 清除链接下划线 */
  display: block; /* 作为块级元素渲染以换行 */
}

.notice-list-item:last-child {
  border-bottom: none;
}

.notice-item-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--secondary-color);
  line-height: 1.5;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s;
}

.dark .notice-item-title {
  color: rgba(255, 255, 255, 0.95);
}

.notice-list-item:hover .notice-item-title {
  color: var(--accent-color);
}

.notice-item-date {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 线绘建筑背景图浮层 */
.campus-drawing-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  pointer-events: none;
  opacity: 0.15;
  z-index: 1;
}

.dark .campus-drawing-overlay {
  opacity: 0.06;
}

.campus-drawing-overlay svg {
  width: 100%;
  height: 100%;
}

.building-outline, .roof-outline {
  stroke: var(--secondary-color);
}

.dark .building-outline, .dark .roof-outline {
  stroke: white;
}

/* 右栏：学术卡片宫格 */
.academic-grid-2x2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.25rem;
}

.academic-card-item {
  position: relative;
  background-color: #f6f5fa; /* 精美浅粉/淡紫色背景 */
  border-radius: var(--border-radius-lg);
  height: 11.25rem; /* 对齐高度，换算为 11.25rem */
  border: 1px solid rgba(13, 27, 42, 0.04);
  box-shadow: var(--shadow-sm);
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  box-sizing: border-box;
  text-decoration: none; /* 清除链接下划线 */
}

.dark .academic-card-item {
  background-color: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.05);
}

.academic-card-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: rgba(123, 44, 191, 0.15);
}

/* 浮动 3D 折叠绶带 Date Badge */
.ribbon-date-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background-color: var(--accent-color); /* 默认紫红色 */
  color: white;
  padding: 4px 10px;
  font-size: 0.78rem;
  font-weight: 700;
  border-radius: 2px 2px 2px 0;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.12);
  z-index: 2;
}

/* 绶带下部 3D 三角折边效果 */
.ribbon-fold {
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 4px 0 0;
  border-color: #3c096c transparent transparent transparent; /* 深阴影色 */
}

.academic-card-body {
  margin-top: 12px;
}

.academic-card-title {
  font-family: var(--font-heading);
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--secondary-color);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s;
}

.dark .academic-card-title {
  color: rgba(255, 255, 255, 0.9);
}

.academic-card-item:hover .academic-card-title {
  color: var(--accent-color);
}

/* 第 3 张卡片的激活高亮态 (Solid rich violet as shown in screenshot) */
.academic-card-item.highlighted-active {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color);
}

.academic-card-item.highlighted-active .academic-card-title {
  color: white !important;
}

.academic-card-item.highlighted-active .ribbon-date-badge {
  background-color: white !important;
  color: var(--accent-color) !important;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.08);
}

.academic-card-item.highlighted-active .ribbon-fold {
  border-color: #eaeaea transparent transparent transparent !important;
}

.academic-card-item.highlighted-active:hover {
  box-shadow: 0 8px 24px rgba(123, 44, 191, 0.3);
}

@media (max-width: 1024px) {
  .notice-layout-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .column-header {
    margin-bottom: 12px;
  }
  .notice-list-item {
    padding: 10px 0;
  }
  .notice-item-title {
    font-size: 0.95rem;
    margin: 0 0 4px 0;
  }
  .academic-grid-2x2 {
    gap: 12px;
  }
  .academic-card-item {
    height: 7.5rem;
    padding: 1rem;
  }
  .academic-card-title {
    font-size: 0.9rem;
    -webkit-line-clamp: 2;
  }
}
</style>
