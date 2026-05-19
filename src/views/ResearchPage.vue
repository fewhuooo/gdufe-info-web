<template>
  <div class="sub-page research-page">
    <!-- 头部横幅 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <div class="banner-left">
          <h1 class="banner-title">学科科研 <span>/ RESEARCH</span></h1>
          <p class="banner-desc">深耕学术前沿 · 服务数字经济腾飞</p>
        </div>
        <div class="banner-right">
          <div class="breadcrumb">
            <router-link to="/">首页</router-link> <span>/</span> <span class="active">学科科研</span>
          </div>
        </div>
      </div>
      <div class="banner-pattern"></div>
    </div>

    <div class="container main-content-wrapper">
      <!-- 左侧：二级悬浮侧边栏 -->
      <aside class="sidebar-menu">
        <div class="sidebar-sticky">
          <h3 class="sidebar-title">学科科研</h3>
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
        <!-- 学科建设 Section -->
        <section id="disciplines" class="info-section scroll-anchor">
          <h3 class="pane-section-title">学科建设</h3>
          <div class="intro-box">
            <p>
              学院构建"五位一体"的学科建设新模式，交叉特色鲜明。拥有"数字经济"博士学位授权点，为高层次人才培养提供了坚实支撑。设有"智能科学与技术"（全国财经类院校唯一、广东省首批）和"管理科学与工程"2个一级学科硕士学位授权点，"技术经济及管理"二级学科硕士学位授权点，以及计算机技术、图书情报（广东省唯二）2个专业硕士学位授权点，构建了以"新工科+新商科"深度融合为特色的育人体系。
            </p>
          </div>
          <div class="discipline-grid">
            <div v-for="disc in disciplineList" :key="disc.name" class="disc-card">
              <div class="disc-header">
                <span class="disc-code">{{ disc.code }}</span>
                <span class="disc-type" :class="disc.typeClass">{{ disc.type }}</span>
              </div>
              <h4>{{ disc.name }}</h4>
              <p>{{ disc.desc }}</p>
            </div>
          </div>
        </section>

        <!-- 学术科研 Section -->
        <section id="research" class="info-section scroll-anchor">
          <h3 class="pane-section-title">学术科研</h3>
          <div class="article-list">
            <div v-for="(article, idx) in researchArticles" :key="idx" class="article-item">
              <span class="article-date">{{ article.date }}</span>
              <a href="#" class="article-title-link" @click.prevent>{{ article.title }}</a>
            </div>
          </div>
        </section>

        <!-- 管理办法 Section -->
        <section id="regulations" class="info-section scroll-anchor">
          <h3 class="pane-section-title">管理办法</h3>
          <div class="regulation-intro">
            <p>为规范学院科研管理，促进学术健康发展，根据国家和学校相关制度，结合学院实际，制定以下管理办法。</p>
          </div>
          <div class="regulation-list">
            <div v-for="(reg, idx) in regulations" :key="idx" class="regulation-item">
              <span class="reg-icon">📋</span>
              <div class="reg-content">
                <a href="#" class="reg-title" @click.prevent>{{ reg.title }}</a>
                <span class="reg-dept">{{ reg.dept }}</span>
              </div>
              <span class="reg-date">{{ reg.date }}</span>
            </div>
          </div>
        </section>

        <!-- 国际学术会议 Section -->
        <section id="conference" class="info-section scroll-anchor">
          <h3 class="pane-section-title">国际学术会议</h3>
          <div class="conference-list">
            <div v-for="(conf, idx) in conferences" :key="idx" class="conference-card">
              <div class="conference-header">
                <span class="conference-badge">{{ conf.status }}</span>
                <span class="conference-date">{{ conf.date }}</span>
              </div>
              <h4 class="conference-title">{{ conf.title }}</h4>
              <p class="conference-desc">{{ conf.desc }}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const activeSection = ref("disciplines");

const subMenus = [
  { id: "disciplines", label: "学科建设" },
  { id: "research", label: "学术科研" },
  { id: "regulations", label: "管理办法" },
  { id: "conference", label: "国际学术会议" }
];

const disciplineList = [
  {
    code: "140500",
    name: "智能科学与技术",
    type: "一级学科硕士点",
    typeClass: "type-master",
    desc: "全国财经类院校唯一、广东省首批一级学科硕士学位授权点，聚焦人工智能基础理论、智能信息处理与算法、大数据与计算智能等前沿方向。"
  },
  {
    code: "120100",
    name: "管理科学与工程",
    type: "一级学科硕士点",
    typeClass: "type-master",
    desc: "以管理科学理论为基础，融合信息技术与数据科学方法，研究管理决策优化、信息系统与商务智能等方向。"
  },
  {
    code: "120204",
    name: "技术经济及管理",
    type: "二级学科硕士点",
    typeClass: "type-sub",
    desc: "研究技术进步与经济发展之间的关系，聚焦技术创新管理、项目评估与投资决策、数字经济治理等领域。"
  },
  {
    code: "085404",
    name: "计算机技术",
    type: "专业硕士点",
    typeClass: "type-prof",
    desc: "面向信息技术产业需求，培养掌握计算机系统开发与应用的高层次应用型人才，涵盖软件工程、网络与信息安全、人工智能应用等方向。"
  },
  {
    code: "125500",
    name: "图书情报",
    type: "专业硕士点",
    typeClass: "type-prof",
    desc: "广东省唯二图书情报专业硕士学位授权点，聚焦数字图书馆、信息资源管理、数据治理与知识服务等领域。"
  }
];

const researchArticles = [
  { title: "我院举办'大型语言模型的双面性：网络安全视角下的利和弊'专题学术报告会", date: "2025-11-11" },
  { title: "我院举办'图神经网络及其在网络安全领域的应用'学术讲座", date: "2025-10-22" },
  { title: "学院召开2025年度国家自然科学基金申报动员会", date: "2025-01-10" },
  { title: "我院教师在IEEE Transactions系列期刊发表多篇高水平论文", date: "2024-12-20" },
  { title: "我院获批广东省自然科学基金项目2项", date: "2024-11-15" },
  { title: "我院研究生在ACM国际会议上获最佳论文提名", date: "2024-10-08" },
  { title: "学院与华为签署联合实验室共建协议", date: "2024-09-28" },
  { title: "我院教师团队获广东省计算机学会优秀论文奖", date: "2024-06-15" },
  { title: "我院举办'大数据与人工智能前沿'学术研讨会", date: "2023-12-10" },
  { title: "学院获批国家自然科学基金面上项目3项", date: "2023-09-15" },
  { title: "广州大学彭济根教授应邀到我校作学术报告", date: "2021-11-01" }
];

const regulations = [
  { title: "广东财经大学科研成果管理办法", dept: "科研处", date: "2024-03-15" },
  { title: "广东财经大学纵向科研项目管理办法", dept: "科研处", date: "2024-03-15" },
  { title: "广东财经大学横向科研项目管理办法", dept: "科研处", date: "2024-03-15" },
  { title: "大数据与人工智能学院学术委员会工作规程", dept: "学院", date: "2023-09-01" },
  { title: "大数据与人工智能学院研究生科研成果认定标准", dept: "学院", date: "2023-09-01" }
];

const conferences = [
  {
    title: "The 3rd International Conference on Advances and Applications of Machine Learning (WAAML 2025)",
    date: "2025-09-21",
    desc: "第三届机器学习进展及应用国际学术会议，由广东财经大学大数据与人工智能学院主办，聚焦机器学习前沿理论与应用，邀请国内外知名学者做主题报告。",
    status: "会议通知已发布"
  },
  {
    title: "The 3rd International Workshop on Advances and Applications of Machine Learning (WAAML 2025 Workshop)",
    date: "2025-09-21",
    desc: "第三届机器学习进展及应用国际研讨会，WAAML 2025现面向全球征集学术论文，涵盖深度学习、强化学习、联邦学习等方向。",
    status: "征文进行中"
  }
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

/* 简介 */
.intro-box {
  background-color: var(--bg-card);
  padding: 36px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  margin-bottom: 28px;
}

.intro-box p {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--text-primary);
}

/* 学科建设卡片 */
.discipline-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.disc-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s, box-shadow 0.3s;
}

.disc-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.disc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.disc-code {
  font-family: var(--font-data);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-color);
  background: rgba(26, 92, 175, 0.06);
  padding: 2px 10px;
  border-radius: 4px;
}

.disc-type {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 10px;
  color: white;
}

.type-master {
  background: var(--primary-color);
}

.type-sub {
  background: #6b7280;
}

.type-prof {
  background: var(--accent-color);
}

.disc-card h4 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 8px;
}

.disc-card p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 学术科研文章列表 */
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

/* 管理办法 */
.regulation-intro {
  margin-bottom: 20px;
}

.regulation-intro p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.regulation-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.regulation-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.3s;
}

.regulation-item:last-child {
  border-bottom: none;
}

.regulation-item:hover {
  background-color: rgba(26, 92, 175, 0.03);
}

.reg-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.reg-content {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.reg-title {
  font-size: 0.95rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.3s;
  line-height: 1.5;
}

.reg-title:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

.reg-dept {
  font-size: 0.75rem;
  color: var(--accent-color);
  background: rgba(26, 92, 175, 0.06);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  flex-shrink: 0;
}

.reg-date {
  font-family: var(--font-data);
  font-size: 0.82rem;
  color: var(--text-secondary);
  flex-shrink: 0;
}

/* 国际学术会议 */
.conference-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.conference-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 28px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s, box-shadow 0.3s;
}

.conference-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.conference-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.conference-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  background: var(--primary-color);
  padding: 4px 12px;
  border-radius: 12px;
}

.conference-date {
  font-family: var(--font-data);
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.conference-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 10px;
  line-height: 1.5;
}

.conference-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

@media (max-width: 900px) {
  .main-content-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .sidebar-menu {
    display: none;
  }
  .discipline-grid {
    grid-template-columns: 1fr;
  }
  .article-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .reg-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .regulation-item {
    flex-wrap: wrap;
  }
  .conference-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
