<template>
  <div class="sub-page news-page">
    <div class="sub-banner">
      <div class="container banner-inner">
        <div class="banner-left">
          <h1 class="banner-title">新闻公告 <span>/ NEWS & NOTICES</span></h1>
          <p class="banner-desc">学院动态 · 通知公告 · 讲座信息 · 学术前沿</p>
        </div>
        <div class="banner-right">
          <div class="breadcrumb">
            <router-link to="/">首页</router-link> <span>/</span> <span class="active">新闻公告</span>
          </div>
        </div>
      </div>
      <div class="banner-pattern"></div>
    </div>

    <div class="container main-content-wrapper">
      <!-- 侧边栏导航 -->
      <aside class="sidebar-menu">
        <div class="sidebar-sticky">
          <h3 class="sidebar-title">新闻分类</h3>
          <ul>
            <li v-for="menu in subMenus" :key="menu.id">
              <button
                @click="scrollToAnchor(menu.id)"
                :class="{ active: activeSection === menu.id }"
              >
                {{ menu.label }}
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <!-- 右侧资讯内容 -->
      <main class="content-pane">
        <!-- 学院头条 -->
        <section id="headlines" class="info-section scroll-anchor">
          <div class="section-title-wrap">
            <h3 class="pane-section-title">学院头条</h3>
            <span class="section-subtitle-en">COLLEGE HEADLINES</span>
          </div>
          <div class="article-list">
            <router-link 
              v-for="item in headlineArticles" 
              :key="item.id" 
              :to="'/news/' + item.id" 
              class="article-item"
            >
              <div class="date-badge">
                <span class="day">{{ item.monthDay }}</span>
                <span class="year">{{ item.year }}</span>
              </div>
              <div class="article-main-info">
                <span class="article-title-link">{{ item.title }}</span>
                <p class="article-summary-preview">{{ item.summary }}</p>
                <div class="article-meta-row">
                  <span class="meta-tag"><strong class="label">部门：</strong>{{ item.author }}</span>
                  <span class="meta-tag"><strong class="label">浏览：</strong>{{ item.views }}</span>
                </div>
              </div>
              <div class="arrow-indicator">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </router-link>
          </div>
        </section>

        <!-- 讲座预告 -->
        <section id="lectures" class="info-section scroll-anchor">
          <div class="section-title-wrap">
            <h3 class="pane-section-title">讲座预告</h3>
            <span class="section-subtitle-en">LECTURE PREVIEWS</span>
          </div>
          <div class="article-list">
            <router-link 
              v-for="item in lectureArticles" 
              :key="item.id" 
              :to="'/news/' + item.id" 
              class="article-item"
            >
              <div class="date-badge lecture-badge">
                <span class="day">{{ item.monthDay }}</span>
                <span class="year">{{ item.year }}</span>
              </div>
              <div class="article-main-info">
                <span class="article-title-link">{{ item.title }}</span>
                <p class="article-summary-preview">{{ item.summary }}</p>
                <div class="article-meta-row">
                  <span class="meta-tag"><strong class="label">部门：</strong>{{ item.author }}</span>
                  <span class="meta-tag"><strong class="label">浏览：</strong>{{ item.views }}</span>
                </div>
              </div>
              <div class="arrow-indicator">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </router-link>
          </div>
        </section>

        <!-- 通知公告 -->
        <section id="notices" class="info-section scroll-anchor">
          <div class="section-title-wrap">
            <h3 class="pane-section-title">通知公告</h3>
            <span class="section-subtitle-en">ANNOUNCEMENTS</span>
          </div>
          <div class="article-list">
            <router-link 
              v-for="item in noticeArticles" 
              :key="item.id" 
              :to="'/news/' + item.id" 
              class="article-item"
            >
              <div class="date-badge notice-badge">
                <span class="day">{{ item.monthDay }}</span>
                <span class="year">{{ item.year }}</span>
              </div>
              <div class="article-main-info">
                <span class="article-title-link">{{ item.title }}</span>
                <p class="article-summary-preview">{{ item.summary }}</p>
                <div class="article-meta-row">
                  <span class="meta-tag"><strong class="label">部门：</strong>{{ item.author }}</span>
                  <span class="meta-tag"><strong class="label">浏览：</strong>{{ item.views }}</span>
                </div>
              </div>
              <div class="arrow-indicator">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </router-link>
          </div>
        </section>

        <!-- 学术信息 -->
        <section id="academic" class="info-section scroll-anchor">
          <div class="section-title-wrap">
            <h3 class="pane-section-title">学术信息</h3>
            <span class="section-subtitle-en">ACADEMIC INFO</span>
          </div>
          <div class="article-list">
            <router-link 
              v-for="item in academicArticles" 
              :key="item.id" 
              :to="'/news/' + item.id" 
              class="article-item"
            >
              <div class="date-badge academic-badge">
                <span class="day">{{ item.monthDay }}</span>
                <span class="year">{{ item.year }}</span>
              </div>
              <div class="article-main-info">
                <span class="article-title-link">{{ item.title }}</span>
                <p class="article-summary-preview">{{ item.summary }}</p>
                <div class="article-meta-row">
                  <span class="meta-tag"><strong class="label">部门：</strong>{{ item.author }}</span>
                  <span class="meta-tag"><strong class="label">浏览：</strong>{{ item.views }}</span>
                </div>
              </div>
              <div class="arrow-indicator">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </router-link>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { newsArticles } from "../data/newsData";

const activeSection = ref("headlines");

const subMenus = [
  { id: "headlines", label: "学院头条" },
  { id: "lectures", label: "讲座预告" },
  { id: "notices", label: "通知公告" },
  { id: "academic", label: "学术信息" }
];

// 归类新闻计算属性
const headlineArticles = computed(() => {
  return newsArticles.filter(item => item.category === "headlines");
});

const lectureArticles = computed(() => {
  return newsArticles.filter(item => item.category === "lectures");
});

const noticeArticles = computed(() => {
  return newsArticles.filter(item => item.category === "notices");
});

const academicArticles = computed(() => {
  return newsArticles.filter(item => item.category === "academic");
});

// 锚点跳转
const scrollToAnchor = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 140; // 考虑顶栏固定高度
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

// 页面滚动联动高亮
const handleScroll = () => {
  const scrollPosition = window.scrollY + 180;
  for (const menu of subMenus) {
    const el = document.getElementById(menu.id);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = menu.id;
        break;
      }
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  setTimeout(handleScroll, 100);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.news-page {
  padding-top: 80px;
  min-height: 100vh;
  background-color: var(--bg-color);
}

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
  margin-bottom: 0;
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
  text-shadow: -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3), 1px 1px 0 rgba(0,0,0,0.3);
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

.main-content-wrapper {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 48px;
  padding: 60px 0;
  width: 96% !important;
  max-width: 1750px !important;
  margin: 0 auto;
}

.sidebar-sticky {
  position: sticky;
  top: 140px;
}

.sidebar-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--secondary-color);
  margin-bottom: 20px;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 12px;
}

.sidebar-menu ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu button {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.sidebar-menu button:hover {
  background-color: rgba(26, 92, 175, 0.05);
  color: var(--primary-color);
}

.sidebar-menu button.active {
  background-color: rgba(26, 92, 175, 0.08);
  color: var(--primary-color);
  border-left-color: var(--primary-color);
  font-weight: 700;
}

.content-pane {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.section-title-wrap {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 24px;
}

.pane-section-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--secondary-color);
  border-left: 4px solid var(--accent-color);
  padding-left: 12px;
  margin: 0;
}

#lectures .pane-section-title {
  border-left-color: #bb3e03;
}
#notices .pane-section-title {
  border-left-color: #2a9d8f;
}
#academic .pane-section-title {
  border-left-color: #023047;
}

.section-subtitle-en {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-secondary);
  opacity: 0.6;
  letter-spacing: 0.5px;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 高雅的列表卡片 */
.article-item {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: var(--shadow-sm);
  position: relative;
}

.article-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: rgba(26, 92, 175, 0.2);
}

/* 日期微标 */
.date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: var(--border-radius);
  background-color: rgba(26, 92, 175, 0.06);
  border-left: 3px solid var(--accent-color);
  flex-shrink: 0;
  line-height: 1.2;
}

.date-badge.lecture-badge {
  border-left-color: #bb3e03;
  background-color: rgba(187, 62, 3, 0.05);
}

.date-badge.notice-badge {
  border-left-color: #2a9d8f;
  background-color: rgba(42, 157, 143, 0.05);
}

.date-badge.academic-badge {
  border-left-color: #023047;
  background-color: rgba(2, 48, 71, 0.05);
}

.date-badge .day {
  font-family: var(--font-data);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--secondary-color);
}

.date-badge.lecture-badge .day { color: #bb3e03; }
.date-badge.notice-badge .day { color: #2a9d8f; }
.date-badge.academic-badge .day { color: #023047; }

.date-badge .year {
  font-family: var(--font-data);
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-top: 2px;
}

/* 标题与摘要 */
.article-main-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.article-title-link {
  font-family: var(--font-heading);
  font-size: 1.12rem;
  font-weight: 700;
  color: var(--secondary-color);
  transition: color 0.3s;
  line-height: 1.4;
}

.article-item:hover .article-title-link {
  color: var(--accent-color);
}

.article-summary-preview {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta-row {
  display: flex;
  gap: 20px;
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.meta-tag .label {
  color: var(--text-primary);
  font-weight: 600;
}

/* 箭头指标 */
.arrow-indicator {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  flex-shrink: 0;
  transition: all 0.3s;
}

.arrow-indicator svg {
  width: 14px;
  height: 14px;
}

.article-item:hover .arrow-indicator {
  background-color: var(--accent-color);
  color: white;
  border-color: var(--accent-color);
  transform: translateX(4px);
}

@media (max-width: 900px) {
  .main-content-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .sidebar-menu {
    display: none;
  }
  .article-item {
    gap: 16px;
    padding: 16px;
  }
  .date-badge {
    width: 60px;
    height: 60px;
  }
  .date-badge .day {
    font-size: 0.98rem;
  }
}

@media (max-width: 600px) {
  .article-item {
    flex-direction: column;
    align-items: stretch;
  }
  .date-badge {
    flex-direction: row;
    width: auto;
    height: auto;
    padding: 6px 12px;
    gap: 8px;
    border-left: none;
    border-top: 3px solid var(--accent-color);
    align-self: flex-start;
  }
  .arrow-indicator {
    display: none;
  }
}
</style>
