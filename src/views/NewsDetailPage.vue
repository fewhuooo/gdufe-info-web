<template>
  <div class="sub-page news-detail-page">
    <!-- 顶部学术分栏 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <div class="banner-left">
          <h1 class="banner-title">新闻详情 <span>/ ARTICLE DETAILS</span></h1>
          <p class="banner-desc">聚焦前沿数智，汇聚学术芬芳</p>
        </div>
        <div class="banner-right">
          <div class="breadcrumb">
            <router-link to="/">首页</router-link>
            <span>/</span>
            <router-link to="/news">新闻公告</router-link>
            <span>/</span>
            <span class="active">正文详情</span>
          </div>
        </div>
      </div>
      <div class="banner-pattern"></div>
    </div>

    <!-- 主体内容 -->
    <div class="container detail-content-container" v-if="article">
      <div class="detail-grid-layout">
        <!-- 左侧：正文区域 -->
        <article class="article-main-panel">
          <!-- 返回链接 -->
          <router-link to="/news" class="back-to-list-link">
            <svg class="back-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>返回新闻列表</span>
          </router-link>

          <!-- 类别标签与阅读量统计 -->
          <div class="article-meta-header">
            <span :class="['category-badge', article.category]">
              {{ article.categoryName }}
            </span>
            <div class="header-stats">
              <span class="stat-item">
                <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>阅读 {{ currentViews }} 次</span>
              </span>
              <span class="stat-item">
                <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>预计阅读 {{ readingTime }} 分钟</span>
              </span>
            </div>
          </div>

          <!-- 文章主标题 -->
          <h1 class="article-title">{{ article.title }}</h1>

          <!-- 发布元数据栏 -->
          <div class="article-info-bar">
            <div class="info-left">
              <span class="info-item">
                <strong>发布时间：</strong>{{ article.date }}
              </span>
              <span class="info-item">
                <strong>发布部门：</strong>{{ article.author }}
              </span>
              <span class="info-item">
                <strong>来源：</strong>大数据与人工智能学院
              </span>
            </div>
          </div>

          <!-- 渐变分割线 -->
          <div class="divider-line"></div>

          <!-- 导言/摘要卡片 -->
          <div class="article-summary-box" :style="{ borderLeftColor: getCategoryColor(article.category) }">
            <div class="summary-label" :style="{ color: getCategoryColor(article.category) }">【核心导读】</div>
            <p>{{ article.summary }}</p>
          </div>

          <!-- 正文排版 -->
          <div class="article-body-content">
            <div v-for="(paragraph, index) in article.content" :key="index" class="content-paragraph">
              <!-- 如果是报告信息/预告时间地点等，渲染为美观的卡片/引用块 -->
              <div v-if="isAlertParagraph(paragraph)" class="info-alert-block">
                <div class="alert-indicator" :style="{ background: getCategoryColor(article.category) }"></div>
                <div class="alert-text">{{ paragraph }}</div>
              </div>
              
              <!-- 如果是加粗标题/小标题，渲染为h3 -->
              <h3 v-else-if="isHeaderParagraph(paragraph)" class="content-sub-title">
                {{ cleanHeader(paragraph) }}
              </h3>
              
              <!-- 如果是列表项 (数字开头或点开头)，渲染为列表项 -->
              <div v-else-if="isListParagraph(paragraph)" class="content-list-item">
                <span class="list-bullet" :style="{ background: getCategoryColor(article.category) }"></span>
                <span class="list-text">{{ paragraph }}</span>
              </div>
              
              <!-- 普通段落 -->
              <p v-else class="normal-paragraph">{{ paragraph }}</p>
            </div>
          </div>

          <!-- 美丽的学术尾署声明 -->
          <div class="article-footer-signature">
            <div class="sig-logo-accent">GDUFE AI</div>
            <div class="sig-text">
              <p>广东财经大学大数据与人工智能学院</p>
              <p>数智前沿与学术创新中心 宣</p>
              <p class="sig-date">{{ article.date }}</p>
            </div>
          </div>
        </article>

        <!-- 右侧：侧边辅助栏 (最新推荐与交互工具) -->
        <aside class="detail-sidebar-panel">
          <!-- 工具卡片 -->
          <div class="sidebar-card tools-card">
            <h3 class="card-title">快捷工具</h3>
            <div class="tools-grid">
              <button class="tool-btn" @click="handlePrint" title="打印文章">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                <span>打印正文</span>
              </button>
              <button class="tool-btn" @click="handleCopyLink" title="复制文章链接">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <span>复制链接</span>
              </button>
              <button class="tool-btn" @click="handleShare" title="分享到微信">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>微信分享</span>
              </button>
            </div>
          </div>

          <!-- 推荐文章卡片 -->
          <div class="sidebar-card recommendations-card">
            <h3 class="card-title">相关推荐</h3>
            <div class="recommendations-list">
              <router-link 
                v-for="rec in relatedArticles" 
                :key="rec.id" 
                :to="'/news/' + rec.id"
                class="rec-item-link"
              >
                <div class="rec-color-bar" :style="{ background: rec.bgGradient }"></div>
                <div class="rec-content">
                  <h4 class="rec-title">{{ rec.title }}</h4>
                  <div class="rec-meta">
                    <span class="rec-date">{{ rec.date }}</span>
                    <span class="rec-cat">{{ rec.categoryName }}</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- 文章未找到状态 -->
    <div class="container error-container" v-else>
      <div class="error-box">
        <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2>新闻文章未找到</h2>
        <p>抱歉，该文章可能已被撤稿或您输入的链接有误。</p>
        <router-link to="/news" class="btn-primary">返回新闻公告列表</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { newsArticles, NewsArticle } from "../data/newsData";

const route = useRoute();
const article = ref<NewsArticle | null>(null);
const currentViews = ref(100);

// 根据路由参数ID动态加载文章
const loadArticle = () => {
  const id = route.params.id as string;
  const found = newsArticles.find(item => item.id === id);
  if (found) {
    article.value = found;
    // 随机增加一些阅读量，使其看起来生动真实
    currentViews.value = found.views + Math.floor(Math.random() * 15) + 1;
  } else {
    article.value = null;
  }
};

onMounted(() => {
  loadArticle();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 当路由ID发生改变时（如点击推荐新闻），重新加载文章并滚动到顶部
watch(
  () => route.params.id,
  () => {
    loadArticle();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
);

// 估算阅读时间
const readingTime = computed(() => {
  if (!article.value) return 0;
  const wordCount = article.value.content.join("").length;
  // 按照普通人阅读中文500字/分钟的平均速度计算
  return Math.max(1, Math.ceil(wordCount / 450));
});

// 获取相关推荐文章（同分类或者最新发布，排除自身，取3篇）
const relatedArticles = computed(() => {
  if (!article.value) return [];
  const list = newsArticles.filter(item => item.id !== article.value?.id);
  // 优先取同分类的
  const sameCategory = list.filter(item => item.category === article.value?.category);
  const others = list.filter(item => item.category !== article.value?.category);
  
  const merged = [...sameCategory, ...others];
  return merged.slice(0, 3);
});

// 判断段落是否为通知、地点时间等多属性提醒块
const isAlertParagraph = (p: string) => {
  return p.startsWith("【学术报告预告】") || 
         p.startsWith("【学术会议】") || 
         p.startsWith("【学术沙龙预告】") ||
         p.startsWith("【名家论坛预告】");
};

// 判断段落是否为加粗的小标题
const isHeaderParagraph = (p: string) => {
  return (p.startsWith("【") && p.endsWith("】") && !isAlertParagraph(p)) || 
         p.startsWith("报告人：") ||
         p.startsWith("报告时间：") ||
         p.startsWith("报告地点：") ||
         p.startsWith("主办单位：") ||
         p.startsWith("沙龙主题：") ||
         p.startsWith("沙龙嘉宾：") ||
         p.startsWith("沙龙时间：") ||
         p.startsWith("沙龙地点：") ||
         p.startsWith("报告题目：") ||
         p.startsWith("报告人简介：") ||
         p.startsWith("报告摘要：");
};

// 判断段落是否为列表项目
const isListParagraph = (p: string) => {
  // 检查是否以阿拉伯数字加点开头 (如 1. 2.) 或 报告日程安排
  const numStartPattern = /^\d+[\.、]/;
  return numStartPattern.test(p);
};

// 清除中括号格式
const cleanHeader = (p: string) => {
  return p;
};

// 交互操作
const handlePrint = () => {
  window.print();
};

const handleCopyLink = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert("文章详情链接已成功复制至剪贴板，可粘贴分享！");
  }).catch(() => {
    alert("链接复制失败，请手动在浏览器地址栏复制。");
  });
};

const handleShare = () => {
  alert("已生成微信分享海报卡片（模拟演示）。请使用手机微信扫描屏幕以进行分享。");
};

// 获取品类色彩
const getCategoryColor = (cat: string) => {
  switch (cat) {
    case 'headlines': return 'var(--accent-color)';
    case 'lectures': return '#bb3e03';
    case 'notices': return '#2a9d8f';
    case 'academic': return '#023047';
    default: return 'var(--primary-color)';
  }
};
</script>

<style scoped>
.news-detail-page {
  padding-top: 80px;
  min-height: 100vh;
  background-color: var(--bg-color);
}

/* banner样式复用 */
.sub-banner {
  height: 280px;
  background-image: url('@/assets/images/subpage_banner_bg.png');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
}

.banner-inner {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 96% !important;
  max-width: 1750px !important;
  margin: 0 auto;
}

.banner-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.banner-right {
  display: flex;
  align-items: center;
}

.banner-title {
  font-family: var(--font-heading);
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: 2px;
  display: inline;
  color: #fff;
  text-shadow: -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3), 1px 1px 0 rgba(0,0,0,0.3);
}

.banner-title span {
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 400;
  color: #fff;
  text-shadow: -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3), 1px 1px 0 rgba(0,0,0,0.3);
}

.banner-desc {
  font-size: 1rem;
  opacity: 0.95;
  letter-spacing: 4px;
  margin-top: 8px;
  color: #fff;
  text-shadow: -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3), 1px 1px 0 rgba(0,0,0,0.3);
}

.breadcrumb {
  font-size: 0.85rem;
  display: flex;
  gap: 8px;
  color: white;
}

.breadcrumb a {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb span.active {
  color: #fff;
  font-weight: 600;
}

.banner-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.4;
  z-index: 1;
}

/* 主栅格 */
.detail-content-container {
  width: 96% !important;
  max-width: 1750px !important;
  margin: 0 auto;
  padding: 60px 0;
}

.detail-grid-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 48px;
  align-items: start;
}

/* 文章左侧面板 */
.article-main-panel {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 48px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s ease;
}

.back-to-list-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 600;
  margin-bottom: 30px;
  transition: color 0.3s;
}

.back-to-list-link:hover {
  color: var(--accent-color);
}

.back-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.back-to-list-link:hover .back-arrow {
  transform: translateX(-4px);
}

.article-meta-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
}

.category-badge {
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
}

.category-badge.headlines { background-color: var(--accent-color); }
.category-badge.lectures { background-color: #bb3e03; }
.category-badge.notices { background-color: #2a9d8f; }
.category-badge.academic { background-color: #023047; }

.header-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.stat-icon {
  width: 14px;
  height: 14px;
}

.article-title {
  font-family: var(--font-heading);
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--secondary-color);
  line-height: 1.4;
  margin-bottom: 24px;
}

.article-info-bar {
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  padding: 14px 20px;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.info-left {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.info-item strong {
  color: var(--text-primary);
  font-weight: 600;
}

.divider-line {
  height: 1px;
  background: linear-gradient(to right, var(--border-color) 0%, rgba(0,0,0,0) 100%);
  margin-bottom: 32px;
}

/* 导读区 */
.article-summary-box {
  background-color: var(--bg-color);
  border-left: 4px solid var(--accent-color);
  padding: 20px 24px;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  margin-bottom: 36px;
}

.summary-label {
  font-weight: 800;
  font-size: 0.95rem;
  margin-bottom: 6px;
  letter-spacing: 1px;
}

.article-summary-box p {
  font-size: 0.98rem;
  line-height: 1.6;
  color: var(--text-primary);
  font-weight: 500;
  margin: 0;
}

/* 正文排版 */
.article-body-content {
  font-size: 1.08rem;
  line-height: 1.85;
  color: var(--text-primary);
  margin-bottom: 48px;
}

.content-paragraph {
  margin-bottom: 24px;
}

.normal-paragraph {
  text-align: justify;
  text-indent: 2em; /* 首行缩进两个字符 */
  margin: 0;
}

/* 提醒板卡 */
.info-alert-block {
  background: linear-gradient(135deg, rgba(26, 92, 175, 0.05) 0%, rgba(26, 92, 175, 0.02) 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  position: relative;
  overflow: hidden;
  margin: 32px 0;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
}

.alert-indicator {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: var(--accent-color);
}

.alert-text {
  font-weight: 800;
  color: var(--secondary-color);
  font-size: 1.15rem;
  letter-spacing: 0.5px;
}

/* 子标题 */
.content-sub-title {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-top: 36px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 8px;
}

/* 列表项 */
.content-list-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-left: 12px;
  margin-bottom: 12px;
}

.list-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent-color);
  flex-shrink: 0;
  margin-top: 11px;
}

.list-text {
  font-size: 1.05rem;
  line-height: 1.7;
}

/* 文章落款 */
.article-footer-signature {
  border-top: 1px dashed var(--border-color);
  padding-top: 30px;
  margin-top: 48px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
}

.sig-logo-accent {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 900;
  color: rgba(26, 92, 175, 0.06);
  letter-spacing: 2px;
}

.sig-text {
  text-align: right;
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.sig-text p {
  margin: 0;
}

.sig-date {
  font-family: var(--font-data);
  font-weight: 600;
}

/* 侧边辅助栏 */
.detail-sidebar-panel {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.sidebar-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 20px;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 10px;
}

/* 快捷工具 */
.tools-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

.tool-btn {
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 12px 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  transition: all 0.3s;
}

.tool-btn svg {
  width: 18px;
  height: 18px;
}

.tool-btn span {
  font-size: 0.78rem;
  font-weight: 600;
}

.tool-btn:hover {
  background-color: rgba(26, 92, 175, 0.05);
  color: var(--accent-color);
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

/* 相关推荐 */
.recommendations-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rec-item-link {
  display: flex;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s;
}

.rec-color-bar {
  width: 4px;
  flex-shrink: 0;
}

.rec-content {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}

.rec-title {
  font-family: var(--font-heading);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rec-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.rec-date {
  font-family: var(--font-data);
}

.rec-item-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
  border-color: rgba(26, 92, 175, 0.2);
}

.rec-item-link:hover .rec-title {
  color: var(--accent-color);
}

/* 未找到页面 */
.error-container {
  padding: 100px 20px;
  display: flex;
  justify-content: center;
}

.error-box {
  text-align: center;
  max-width: 500px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 48px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.error-icon {
  width: 64px;
  height: 64px;
  color: #bb3e03;
  margin-bottom: 20px;
}

.error-box h2 {
  font-family: var(--font-heading);
  color: var(--secondary-color);
  margin-bottom: 12px;
}

.error-box p {
  color: var(--text-secondary);
  font-size: 0.98rem;
  margin-bottom: 30px;
}

.btn-primary {
  display: inline-block;
  background-color: var(--accent-color);
  color: white;
  padding: 12px 28px;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* 移动端自适应 */
@media (max-width: 1024px) {
  .detail-grid-layout {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  
  .article-main-panel {
    padding: 30px;
  }
}

@media (max-width: 600px) {
  .article-main-panel {
    padding: 20px 16px;
  }
  
  .article-title {
    font-size: 1.6rem;
  }
  
  .article-meta-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .header-stats {
    width: 100%;
    justify-content: space-between;
  }
  
  .info-left {
    flex-direction: column;
    gap: 8px;
  }
  
  .article-summary-box {
    padding: 16px;
  }
  
  .normal-paragraph {
    text-indent: 0; /* 移动端可不缩进，方便移动端阅读 */
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
