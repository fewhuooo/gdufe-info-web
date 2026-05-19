<template>
  <div class="sub-page student-page">
    <!-- 头部横幅 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <div class="banner-left">
          <h1 class="banner-title">学生工作 <span>/ STUDENT AFFAIRS</span></h1>
          <p class="banner-desc">激扬青春 · 自由探索与卓越实践的第二课堂</p>
        </div>
        <div class="banner-right">
          <div class="breadcrumb">
            <router-link to="/">首页</router-link> <span>/</span> <span class="active">学生工作</span>
          </div>
        </div>
      </div>
      <div class="banner-pattern"></div>
    </div>

    <div class="container main-content-wrapper">
      <!-- 左侧：二级悬浮侧边栏 -->
      <aside class="sidebar-menu">
        <div class="sidebar-sticky">
          <h3 class="sidebar-title">学生工作</h3>
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
        <!-- 团学活动 Section -->
        <section id="activities" class="info-section scroll-anchor">
          <h3 class="pane-section-title">团学活动</h3>
          <div class="article-list">
            <div v-for="(item, idx) in activityArticles" :key="idx" class="article-item">
              <span class="article-date">{{ item.date }}</span>
              <a href="#" class="article-title-link" @click.prevent>{{ item.title }}</a>
            </div>
          </div>
        </section>

        <!-- 学术科研 Section -->
        <section id="academic" class="info-section scroll-anchor">
          <h3 class="pane-section-title">学术科研</h3>
          <div class="article-list">
            <div v-for="(item, idx) in academicArticles" :key="idx" class="article-item">
              <span class="article-date">{{ item.date }}</span>
              <a href="#" class="article-title-link" @click.prevent>{{ item.title }}</a>
            </div>
          </div>
        </section>

        <!-- 奖助贷工作 Section -->
        <section id="scholarship" class="info-section scroll-anchor">
          <h3 class="pane-section-title">奖助贷工作</h3>
          <div class="article-list">
            <div v-for="(item, idx) in scholarshipArticles" :key="idx" class="article-item">
              <span class="article-date">{{ item.date }}</span>
              <a href="#" class="article-title-link" @click.prevent>{{ item.title }}</a>
            </div>
          </div>
        </section>

        <!-- 心理健康 Section -->
        <section id="mentalhealth" class="info-section scroll-anchor">
          <h3 class="pane-section-title">心理健康</h3>
          <div class="article-list">
            <div v-for="(item, idx) in mentalHealthArticles" :key="idx" class="article-item">
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

const activeSection = ref("activities");

const subMenus = [
  { id: "activities", label: "团学活动" },
  { id: "academic", label: "学术科研" },
  { id: "scholarship", label: "奖助贷工作" },
  { id: "mentalhealth", label: "心理健康" }
];

const activityArticles = [
  { title: "立足数智特色强化育人实效——大数据与人工智能学院召开学生工作会议", date: "2026-03-05" },
  { title: "智暖腊巴，粥到情深——大数据与人工智能学院开展留校学生慰问活动", date: "2026-02-01" },
  { title: `广东财经大学百千万工程团队“三下乡”：数字非遗赋能乡村振兴`, date: "2023-08-09" },
  { title: `喜报||祝贺信息学院荣获2023年广东财经大学“四秩风华，弦歌传情”迎校庆师生合唱比赛三等奖`, date: "2023-06-09" },
  { title: `优秀学生百人宣讲团||信息学院“榜样青春 奋进广财”优秀学生事迹宣讲`, date: "2023-06-06" },
  { title: "喜报 || 信息学院羽毛球队荣获2023年广东财经大学羽毛球团体锦标赛亚军！", date: "2023-06-06" },
  { title: "菁英训练营||信息学院第一届菁英训练营——创新策划组织培训", date: "2023-06-03" },
  { title: "广东财经大学第十五届大学生学术科技季信息学院第二十三届IT文化节||网页设计大赛圆满结束！", date: "2023-06-02" },
  { title: `“筐”出热血||信息学院班级篮球赛圆满结束`, date: "2023-05-31" }
];

const academicArticles = [
  { title: `喜报|| 大数据与人工智能学院学子在第十九届“挑战杯”全国大学生课外学术科技作品竞赛“人工智能+”专项赛中荣获国赛三等奖`, date: "2025-11-11" },
  { title: "喜报 || 大数据与人工智能学院学子在中国大学生计算机设计大赛中再创佳绩", date: "2025-09-13" },
  { title: `信息学院在第十五届全国电子商务“创新、创意及创业”挑战赛广东赛区选拔赛中荣获佳绩`, date: "2025-08-23" },
  { title: `信息学院在第十八届“挑战杯”广东省大学生课外学术科技作品竞赛中荣获佳绩`, date: "2025-08-23" },
  { title: "信息学院王丽敏教授论文入选ESI全球Top1%高被引论文", date: "2025-08-23" },
  { title: `信息学院在第十二届“挑战杯”大学生课外学术科技作品竞赛中荣获佳绩`, date: "2025-08-23" },
  { title: `第十四届全国大学生电子商务“创新、创意及创业”挑战赛广东财经大学选拔赛圆满结束`, date: "2025-08-23" },
  { title: `信息学院承办第十五届全国大学生电子商务“三创赛”校赛`, date: "2025-04-23" }
];

const scholarshipArticles = [
  { title: "粤西家访暖人心，校友助力传真情——大数据与人工智能学院赴粤西开展家访工作", date: "2026-01-21" },
  { title: `信息学院“榴园筑梦”宣讲团开展考研、就业经验分享会`, date: "2025-08-23" },
  { title: "信息学院举办考研指导和经验分享会", date: "2025-08-23" },
  { title: `信息学院举办大学生暑期“三下乡”社会实践活动经验交流会`, date: "2025-08-23" },
  { title: "信息学院举办2023-2024院长奖学金评选答辩会", date: "2025-08-23" },
  { title: "信息学院举办2023年大学生职业规划大赛", date: "2025-08-23" },
  { title: "信息学院举办2022-2023学年院长奖学金答辩会", date: "2025-08-23" },
  { title: "广东财经大学2023年青木奖学金答辩会顺利举行", date: "2025-08-23" },
  { title: "信息学院举办2024年寒假线上和线下家访送温暖活动", date: "2025-08-22" },
  { title: "信息学院研究生文佳豪获登2021-2022学年度研究生代表名录", date: "2023-05-06" }
];

const mentalHealthArticles = [
  { title: "新学期·心力量·新成长——大数据与人工智能学院举办心理委员培训暨情景剧比赛动员会", date: "2026-04-08" },
  { title: "筑牢心理防线 护航青春成长——信息学院佛山校区开展学生骨干心理健康专题培训会", date: "2025-09-11" },
  { title: "信息学院召开2022级班委工作会议暨心理辅导站培训", date: "2025-09-11" },
  { title: "信息学院心理工作站开展业务培训", date: "2025-09-11" },
  { title: `信息学院团委联合“心职导航”辅导员工作室开展“悦纳自我，以爱育心”主题心理团体辅导活动`, date: "2025-09-11" },
  { title: `信息学院开展“适应与核心能力提升”主题心理团体辅导活动`, date: "2025-09-11" },
  { title: `信息学院开展“怀抱青春，以美润心”主题心理团体辅导活动`, date: "2025-09-11" },
  { title: `信息学院开展“怀抱梦想，以德润心”主题心理团体辅导活动`, date: "2025-09-11" },
  { title: `信息学院开展“怀抱绿意，以劳润心”主题心理团体辅导活动`, date: "2025-09-11" },
  { title: "入学教育||学期伊始气象新，信念照耀新生行", date: "2025-09-11" },
  { title: `信息学院举办“家长赋能，心理护航”专题讲座`, date: "2025-08-29" }
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
