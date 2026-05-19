<template>
  <div class="sub-page admission-page">
    <!-- 头部横幅 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <div class="banner-left">
          <h1 class="banner-title">招生就业 <span>/ ADMISSION & CAREER</span></h1>
          <p class="banner-desc">筑梦起航 · 欢迎报考大数据与人工智能学院</p>
        </div>
        <div class="banner-right">
          <div class="breadcrumb">
            <router-link to="/">首页</router-link> <span>/</span> <span class="active">招生就业</span>
          </div>
        </div>
      </div>
      <div class="banner-pattern"></div>
    </div>

    <div class="container main-content-wrapper">
      <!-- 左侧：二级悬浮侧边栏 -->
      <aside class="sidebar-menu">
        <div class="sidebar-sticky">
          <h3 class="sidebar-title">招生就业</h3>
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

      <!-- 右侧：详细内容面板 -->
      <main class="content-pane">
        <!-- 招生工作 Section -->
        <section id="enrollment" class="info-section scroll-anchor">
          <h3 class="pane-section-title">招生工作</h3>
          <div class="article-list">
            <div v-for="(item, idx) in enrollmentArticles" :key="idx" class="article-item">
              <span class="article-date">{{ item.date }}</span>
              <a href="#" class="article-title-link" @click.prevent>{{ item.title }}</a>
            </div>
          </div>
        </section>

        <!-- 就业工作 Section -->
        <section id="career" class="info-section scroll-anchor">
          <h3 class="pane-section-title">就业工作</h3>
          <div class="article-list">
            <div v-for="(item, idx) in careerArticles" :key="idx" class="article-item">
              <span class="article-date">{{ item.date }}</span>
              <a href="#" class="article-title-link" @click.prevent>{{ item.title }}</a>
            </div>
          </div>
        </section>

        <!-- 招聘信息 Section -->
        <section id="recruitment" class="info-section scroll-anchor">
          <h3 class="pane-section-title">招聘信息</h3>
          <div class="article-list">
            <div v-for="(item, idx) in recruitmentArticles" :key="idx" class="article-item">
              <span class="article-date">{{ item.date }}</span>
              <a href="#" class="article-title-link" @click.prevent>{{ item.title }}</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const activeSection = ref("enrollment");

const subMenus = [
  { id: "enrollment", label: "招生工作" },
  { id: "career", label: "就业工作" },
  { id: "recruitment", label: "招聘信息" }
];

const enrollmentArticles = [
  { title: `广东财经大学大数据与人工智能学院2026年硕士研究生招生考试调剂通知`, date: "2026-04-08" },
  { title: `广州瑞米设计有限公司开展宣讲会`, date: "2022-05-26" },
  { title: `信息学院召开2022届毕业生就业工作推进会`, date: "2022-05-17" }
];

const careerArticles = [
  { title: `访企拓岗促就业——大数据与人工智能学院走访云蝶科技有限公司`, date: "2026-03-27" },
  { title: `大数据与人工智能学院组织学生参加“百万英才汇南粤”2026年春季大型综合招聘会`, date: "2026-03-16" },
  { title: `访企拓岗促就业——大数据与人工智能学院走访校友企业广州锐谷信息科技有限公司`, date: "2026-03-12" },
  { title: `访企拓岗促就业——大数据与人工智能学院走访京华信息科技股份有限公司`, date: "2026-03-12" },
  { title: `访企拓岗促就业——大数据与人工智能学院走访广东鸿数科技有限公司`, date: "2026-02-05" },
  { title: `访企拓岗促就业——大数据与人工智能学院走访深圳市图拉斯科技有限公司`, date: "2025-12-11" },
  { title: `大数据与人工智能学院成功举办2026届毕业生就业工作启动大会`, date: "2025-10-15" },
  { title: `访企拓岗促就业——大数据与人工智能学院走访广州优诺创新科技有限公司`, date: "2025-09-23" },
  { title: `大数据与人工智能学院2025届本科毕业生升学捷报`, date: "2025-08-24" },
  { title: `我院举办“二战”考公考研座谈会暨基层项目政策宣讲会`, date: "2025-08-24" }
];

const recruitmentArticles = [
  { title: `我院成功举办2025年春季招聘会`, date: "2025-08-24" },
  { title: `我院领导率队助力学子逐梦跨境电商领域`, date: "2025-08-24" },
  { title: `院组织学生参加“百万英才汇南粤” 春季大型招聘`, date: "2025-08-24" },
  { title: `我院召开校企供需对接会`, date: "2025-08-22" },
  { title: `2023年7月9日至7月15日招聘信息`, date: "2023-07-09" },
  { title: `2023年7月2日至7月8日招聘信息`, date: "2023-07-02" },
  { title: `2023年6月11日至6月17日招聘信息`, date: "2023-06-11" },
  { title: `2023年6月4日至6月10日招聘信息`, date: "2023-06-03" },
  { title: `2023年5月28日至6月3日招聘信息`, date: "2023-05-28" },
  { title: `2023年5月21日至5月27日招聘信息`, date: "2023-05-21" },
  { title: `2023年4月24日至4月30日招聘信息`, date: "2023-04-24" },
  { title: `2023年4月17日至4月23日招聘信息`, date: "2023-04-17" },
  { title: `2023年4月10日至4月16日招聘信息`, date: "2023-04-10" },
  { title: `2023年3月27日至4月2日招聘信息`, date: "2023-03-25" }
];

const scrollToAnchor = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 100;
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

const handleScroll = () => {
  const scrollPosition = window.scrollY + 140;

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
.sub-page {
  padding-top: 80px;
  min-height: 100vh;
  background-color: var(--bg-color);
}

/* 子页横幅 Banner */
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
  width: 100%;
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
  gap: 12px;
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
  opacity: 1;
  color: white;
}

.breadcrumb a {
  color: white;
  transition: opacity 0.3s;
}

.breadcrumb a:hover {
  opacity: 1;
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

/* 主体布局 */
.main-content-wrapper {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 48px;
  padding: 60px 20px;
}

/* 侧边导航 */
.sidebar-sticky {
  position: sticky;
  top: 110px;
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

/* 右侧内容 */
.content-pane {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.pane-section-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--secondary-color);
  border-left: 4px solid var(--accent-color);
  padding-left: 12px;
  margin-bottom: 24px;
}

/* 文章列表 */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.article-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 24px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.3s;
}

.article-item:last-child {
  border-bottom: none;
}

.article-item:hover {
  background-color: rgba(26, 92, 175, 0.03);
}

.article-date {
  font-family: var(--font-data);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-color);
  flex-shrink: 0;
  width: 90px;
}

.article-title-link {
  font-size: 0.95rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.3s;
  line-height: 1.5;
}

.article-title-link:hover {
  color: var(--primary-color);
  text-decoration: underline;
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
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
