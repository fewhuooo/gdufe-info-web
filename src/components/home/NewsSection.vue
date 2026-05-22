<template>
  <section class="news-announcements-section" id="news-section">
    <div class="container">
      <!-- 头部：左侧双 Tab，右侧清华风圆形 MORE 按钮 -->
      <div class="section-header-row">
        <div class="tabs-header-wrap">
          <button 
            :class="{ active: activeTab === 'headlines' }"
            @click="activeTab = 'headlines'"
            class="tab-btn"
          >
            学院头条
          </button>
          <span class="vertical-divider">|</span>
          <button 
            :class="{ active: activeTab === 'lectures' }"
            @click="activeTab = 'lectures'"
            class="tab-btn"
          >
            讲座预告
          </button>
        </div>
        
        <!-- 圆形 MORE 按钮 -->
        <router-link :to="activeTab === 'headlines' ? '/news#headlines' : '/news#lectures'" class="circular-more-btn" title="查看更多">
          <span class="more-text">MORE</span>
          <svg class="arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </router-link>
      </div>
      
      <!-- 主内容网格：左侧大 featured 卡，右侧 2x2 grid -->
      <transition name="fade-slide" mode="out-in">
        <div :key="activeTab" class="news-layout-grid">
          <!-- 左侧大焦点图 -->
          <div class="featured-card">
            <div class="featured-image-container">
              <div class="featured-image-overlay"></div>
              <div class="featured-img-placeholder">
                <img 
                  v-if="currentData.featured.image" 
                  :src="currentData.featured.image" 
                  class="news-img" 
                  alt="Featured News"
                />
                <div v-else :style="{ background: currentData.featured.bgGradient, width: '100%', height: '100%' }">
                  <div class="abstract-dots"></div>
                  <div class="featured-logo-accent">GDUFE AI</div>
                </div>
              </div>
              <!-- 浮动左下角 date Badge -->
              <div class="featured-date-badge">
                <span class="date-day">{{ currentData.featured.date }}</span>
                <span class="date-year">{{ currentData.featured.year }}</span>
              </div>
            </div>
            
            <div class="featured-content-box">
              <h3 class="featured-title">{{ currentData.featured.title }}</h3>
              <p class="featured-summary">{{ currentData.featured.summary }}</p>
              <router-link :to="currentData.featured.link" class="featured-more-link">
                <span>更多详情</span>
                <svg class="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </router-link>
            </div>
          </div>
          
          <!-- 右侧 2x2 宫格 -->
          <div class="grid-2x2-wrapper">
            <router-link 
              v-for="card in currentData.grid" 
              :key="card.title" 
              :to="card.link"
              class="grid-card-item"
            >
              <div class="grid-card-img">
                <img 
                  v-if="card.image" 
                  :src="card.image" 
                  class="news-img" 
                  alt="News item"
                />
                <div v-else :style="{ background: card.bgGradient, width: '100%', height: '100%' }">
                  <div class="grid-card-mesh"></div>
                  <div class="grid-card-label">GDUFE</div>
                </div>
              </div>
              
              <!-- 浮动左上角 date Badge (带边条，完全吻合截图) -->
              <div class="grid-date-badge">
                <span class="grid-day">{{ card.date }}</span>
                <span class="grid-year">{{ card.year }}</span>
              </div>
              
              <!-- 覆盖于图片下方的渐变文字罩 -->
              <div class="grid-text-overlay">
                <h4 class="grid-card-title">{{ card.title }}</h4>
              </div>
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import img1 from '@/assets/images/1.jpg';
import img2 from '@/assets/images/2.jpg';
import img3 from '@/assets/images/3.png';
import img4 from '@/assets/images/4.jpg';
import img5 from '@/assets/images/5.jpg';

// 选项卡状态
const activeTab = ref("headlines");

// 1. 学院头条 (Headlines) 数据集
const headlinesData = {
  featured: {
    title: "我院学子在第十六届“挑战杯”全国大学生课外学术科技作品竞赛中喜获特等奖",
    date: "05-18",
    year: "2026",
    summary: "在刚刚落幕的全国“挑战杯”决赛中，我院由张教授指导的“基于大模型的智慧金融风控系统”项目历经多轮激烈角逐，凭借卓越的算法创新性与广阔的应用前景，在数万个项目中脱颖而出，勇夺全国特等奖...",
    link: "/news/1",
    bgGradient: "linear-gradient(135deg, #10002b 0%, #3c096c 50%, #7b2cbf 100%)", // 尊贵的学术紫调
    image: img1
  },
  grid: [
    {
      title: "学院举办“腾讯之友——大数据与人工智能学院焕蓝梦想奖学金”颁奖仪式",
      date: "05-15",
      year: "2026",
      link: "/news/2",
      bgGradient: "linear-gradient(135deg, #1d3557, #457b9d)",
      image: img2
    },
    {
      title: "大数据与人工智能学院召开2026届毕业生毕业设计（论文）线上线下动员大会",
      date: "05-12",
      year: "2026",
      link: "/news/3",
      bgGradient: "linear-gradient(135deg, #2a9d8f, #264653)",
      image: img3
    },
    {
      title: "我院青年教师在国际顶级学术期刊IEEE Transactions发表自注意力建模高水平成果",
      date: "05-09",
      year: "2026",
      link: "/news/4",
      bgGradient: "linear-gradient(135deg, #6b705c, #a5a58d)",
      image: img4
    },
    {
      title: "学院与腾讯云科技签署战略协议，共建“大数据与生成式AI”校企联合实验室",
      date: "05-07",
      year: "2026",
      link: "/news/5",
      bgGradient: "linear-gradient(135deg, #3d5a80, #98c1d9)",
      image: img5
    }
  ]
};

// 2. 讲座预告 (Lectures) 数据集
const lecturesData = {
  featured: {
    title: "【学术报告】大语言模型在多模态理解中的前沿进展与应用实践 (主讲人：欧洲科学院院士)",
    date: "05-24",
    year: "2026",
    summary: "本期卓越讲坛特邀多模态机器学习与大语言模型领域的国际泰斗，围绕跨模态配准算法、大规模语义对齐及边缘部署等前沿议题开展多维度分享...",
    link: "/news/6",
    bgGradient: "linear-gradient(135deg, #03071e 0%, #6f1d1b 50%, #bb3e03 100%)", // 深红/砖红色调
    image: img5
  },
  grid: [
    {
      title: "【卓越讲坛】高维统计学习与可解释深度神经网络的数理理论探索学术交流会",
      date: "05-20",
      year: "2026",
      link: "/news/7",
      bgGradient: "linear-gradient(135deg, #2b2d42, #8d99ae)",
      image: img4
    },
    {
      title: "【学术会议】第七届智能算法与商业分析国际研讨会 (IEEE IABA 2026) 参会指南",
      date: "05-17",
      year: "2026",
      link: "/news/8",
      bgGradient: "linear-gradient(135deg, #023047, #219ebc)",
      image: img3
    },
    {
      title: "【学术沙龙】知识图谱构建与大模型知识检索增强技术 (RAG) 专题交流研讨会",
      date: "05-12",
      year: "2026",
      link: "/news/9",
      bgGradient: "linear-gradient(135deg, #4a4e69, #9a8c98)",
      image: img2
    },
    {
      title: "【名家论坛】基于生成式AI的医疗影像智能诊断系统与可信评测体系构建名家论坛",
      date: "05-08",
      year: "2026",
      link: "/news/10",
      bgGradient: "linear-gradient(135deg, #386641, #6a994e)",
      image: img1
    }
  ]
};

// 计算当前激活的数据
const currentData = computed(() => {
  return activeTab.value === "headlines" ? headlinesData : lecturesData;
});
</script>

<style scoped>
.news-announcements-section {
  padding: 0; /* 移除冗余内边距，完全交由外层轨道容器进行全屏布局管理 */
  background-color: transparent;
  width: 100%;
}

/* 极致拓宽至 96%，拉开左右边界，展现宽银幕大格局 */
.news-announcements-section .container {
  width: 96% !important;
  max-width: 1750px !important;
  margin: 0 auto;
  padding: 0;
}

/* 头部排版：左侧 Tab，右侧 MORE */
.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.tabs-header-wrap {
  display: flex;
  align-items: center;
  gap: 18px;
}

.tab-btn {
  background: none;
  border: none;
  font-family: var(--font-heading);
  font-size: 1.8rem; /* 提升至 1.8rem，更加磅礴的领袖感 */
  font-weight: 700;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  padding: 4px 0;
}

.tab-btn.active {
  color: var(--secondary-color);
}

.dark .tab-btn.active {
  color: white;
}

/* 紫红色/高雅学术色划线 */
.tab-btn::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--accent-color);
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.tab-btn.active::after {
  transform: scaleX(1);
}

.vertical-divider {
  color: rgba(0, 0, 0, 0.15);
  font-size: 1.4rem;
  font-weight: 300;
}

.dark .vertical-divider {
  color: rgba(255, 255, 255, 0.15);
}

/* 圆形 MORE 按钮 */
.circular-more-btn {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(13, 27, 42, 0.15);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-secondary);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.dark .circular-more-btn {
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--text-secondary);
}

.circular-more-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: scale(1.05);
}

.more-text {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 1px;
}

.arrow-svg {
  width: 12px;
  height: 12px;
}

/* 主内容网格 */
.news-layout-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr; /* 两栏 */
  gap: 28px;
  width: 100%;
  align-items: stretch;
}

/* 左侧大卡片 */
.featured-card {
  background-color: var(--bg-card);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.featured-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.featured-image-container {
  position: relative;
  height: 18.125rem; /* 换算为 18.125rem，支持等比流式缩放 */
  width: 100%;
  overflow: hidden;
}

.featured-img-placeholder {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.featured-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 100%);
  z-index: 1;
}

/* 点阵背景微装饰 */
.abstract-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.35;
}

.featured-logo-accent {
  position: absolute;
  right: 20px;
  top: 20px;
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.15);
  letter-spacing: 2px;
}

/* 浮动大卡片左下角 date Badge */
.featured-date-badge {
  position: absolute;
  bottom: -15px;
  left: 24px;
  background-color: var(--accent-color);
  color: white;
  padding: 8px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  z-index: 3;
  line-height: 1.1;
}

.date-day {
  font-size: 1.1rem; /* 提升至 1.1rem */
  font-weight: 700;
}

.date-year {
  font-size: 0.72rem; /* 提升至 0.72rem */
  font-weight: 400;
  opacity: 0.85;
}

.featured-content-box {
  padding: 32px 24px 24px 24px; /* 升级 padding */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.featured-title {
  font-family: var(--font-heading);
  font-size: 1.35rem; /* 大幅提升至 1.35rem，端庄且充满张力 */
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 10px;
  line-height: 1.4;
  transition: color 0.3s;
}

.dark .featured-title {
  color: white;
}

.featured-card:hover .featured-title {
  color: var(--accent-color);
}

.featured-summary {
  font-size: 0.92rem; /* 提升至 0.92rem */
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured-more-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent-color);
  font-weight: 700;
  font-size: 0.9rem; /* 提升至 0.9rem */
  margin-top: auto;
  text-decoration: none;
  transition: all 0.3s;
}

.featured-more-link:hover {
  opacity: 0.85;
}

.featured-more-link:hover .link-arrow {
  transform: translateX(4px);
}

.link-arrow {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

/* 右侧 2x2 宫格 */
.grid-2x2-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
}

.grid-card-item {
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  height: 13.75rem; /* 换算为 13.75rem，配合宽屏大视觉流式缩放 */
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.grid-card-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.grid-card-img {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.5s ease;
}

.grid-card-item:hover .grid-card-img {
  transform: scale(1.04);
}

.grid-card-mesh {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 15px 15px;
  opacity: 0.25;
}

.grid-card-label {
  position: absolute;
  right: 15px;
  top: 15px;
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.08);
}

/* 右侧宫格浮动左上角 date Badge (带左边条，完全吻合截图) */
.grid-date-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(255, 255, 255, 0.95);
  border-left: 3px solid var(--accent-color);
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  line-height: 1.1;
  border-radius: 0 4px 4px 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.grid-day {
  font-size: 0.92rem; /* 提升至 0.92rem */
  font-weight: 700;
  color: #0d1b2a;
}

.grid-year {
  font-size: 0.65rem; /* 提升至 0.65rem */
  font-weight: 500;
  color: #555;
  margin-top: 1px;
}

/* 覆盖于图片下方的暗梯度渐变标题 */
.grid-text-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.45) 60%, rgba(0, 0, 0, 0) 100%);
  padding: 16px 18px; /* 扩展 padding */
  box-sizing: border-box;
  z-index: 2;
}

.grid-card-title {
  font-family: var(--font-heading);
  font-size: 1.02rem; /* 提升至 1.02rem */
  font-weight: 600;
  color: white !important;
  line-height: 1.35;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  transition: color 0.3s;
}

.grid-card-item:hover .grid-card-title {
  color: var(--highlight-color) !important;
}

/* 动效切换 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

@media (max-width: 1024px) {
  .news-layout-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .featured-image-container {
    height: 12rem;
  }
  .featured-content-box {
    padding: 16px;
  }
  .featured-title {
    font-size: 1.15rem;
    margin-bottom: 6px;
  }
  .featured-summary {
    font-size: 0.85rem;
    margin-bottom: 8px;
    -webkit-line-clamp: 2;
  }
  .grid-2x2-wrapper {
    gap: 12px;
  }
  .grid-card-item {
    height: 8.5rem;
  }
  .grid-card-title {
    font-size: 0.9rem;
  }
}
</style>
