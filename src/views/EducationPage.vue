<template>
  <div class="sub-page education-page">
    <!-- 头部横幅 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <h1 class="banner-title">人才培养 <span>/ EDUCATION</span></h1>
        <p class="banner-desc">新工科 + 新商科 · 深度融合育人体系</p>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link> <span>/</span> <span class="active">人才培养</span>
        </div>
      </div>
      <div class="banner-pattern"></div>
    </div>

    <div class="container main-content-wrapper">
      <!-- 左侧：二级悬浮侧边栏 -->
      <aside class="sidebar-menu">
        <div class="sidebar-sticky">
          <h3 class="sidebar-title">人才培养</h3>
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
        <!-- 专业建设 Section -->
        <section id="majors" class="info-section scroll-anchor">
          <h3 class="pane-section-title">专业建设</h3>
          <p class="section-intro-text">
            学院设有计算机科学与技术、软件工程、人工智能、大数据管理与应用、电子商务5个本科专业，以及"3+2"中外联合培养计算机类专业和计算机科学与技术（实验区）。其中，电子商务专业入选国家首批一流本科专业建设点（广东省首批唯一）。
          </p>
          <div class="major-grid">
            <div v-for="major in majors" :key="major.name" class="major-card" :class="{ 'major-card--featured': major.featured }">
              <div class="major-header">
                <span class="major-icon">{{ major.icon }}</span>
                <div>
                  <h4>{{ major.name }}</h4>
                  <span v-if="major.badge" class="major-badge">{{ major.badge }}</span>
                </div>
              </div>
              <p class="major-intro">{{ major.intro }}</p>
              <div class="major-section">
                <h5>核心课程</h5>
                <div class="course-badges">
                  <span v-for="course in major.courses" :key="course" class="course-badge">{{ course }}</span>
                </div>
              </div>
              <div class="major-section">
                <h5>师资配置</h5>
                <p>{{ major.faculty }}</p>
              </div>
              <div class="major-section">
                <h5>未来发展</h5>
                <p>{{ major.future }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 培养方案 Section -->
        <section id="scheme" class="info-section scroll-anchor">
          <h3 class="pane-section-title">培养方案</h3>
          <div class="intro-box">
            <p>
              学院坚持"新工科+新商科"深度融合的育人理念，构建分层递进、逻辑闭环的专业课程体系。2025级各专业培养方案已全面更新，紧密对接粤港澳大湾区数字经济发展需求，强化实践教学与产教融合。
            </p>
          </div>
          <div class="scheme-grid">
            <div v-for="item in schemeList" :key="item.name" class="scheme-card">
              <span class="scheme-icon">📄</span>
              <div class="scheme-info">
                <h4>{{ item.name }}</h4>
                <span class="scheme-year">{{ item.year }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 课程建设 Section -->
        <section id="course" class="info-section scroll-anchor">
          <h3 class="pane-section-title">课程建设</h3>
          <div class="intro-box">
            <p>
              学院课程建设成果显著。《互联网+思维与技术》《可视化移动编程》两门课程入选教育部国家智慧教育平台首批优质课程；获批教育部"智能制造领域中外人文交流人才培养基地"重点项目；累计建成国家级及省级精品课程、在线开放课程9门，获批省级质量工程项目14项。2023年12月获批教育部"电子商务专业虚拟教研室"，《电子商务》课程认定为广东省2023年度省级一流本科课程。
            </p>
          </div>
          <div class="stat-grid">
            <div class="stat-card">
              <span class="stat-number">9</span>
              <span class="stat-unit">门</span>
              <span class="stat-label">国家级及省级精品课程</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">14</span>
              <span class="stat-unit">项</span>
              <span class="stat-label">省级质量工程项目</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">2</span>
              <span class="stat-unit">门</span>
              <span class="stat-label">国家智慧教育平台优质课程</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">1</span>
              <span class="stat-unit">个</span>
              <span class="stat-label">教育部虚拟教研室</span>
            </div>
          </div>
        </section>

        <!-- 实验室建设 Section -->
        <section id="labs" class="info-section scroll-anchor">
          <h3 class="pane-section-title">实验室建设</h3>
          <div class="intro-box">
            <p>
              学院拥有广东省智能商务工程研究中心（学校"首个"省级工程技术研究中心）、广东省数字经济协同创新重点实验室等核心省级平台。广东财经大学数字化创新综合实验平台已完成建设并进入校级验收阶段，大数据与人工智能学院实训实验室智能化改造项目正式启动，打造AI赋能的一体化教学新生态。
            </p>
          </div>
          <div class="lab-grid">
            <div v-for="lab in labs" :key="lab.name" class="lab-card">
              <div class="lab-header-bar">
                <span class="lab-tag">{{ lab.area }}</span>
              </div>
              <div class="lab-body">
                <h4>{{ lab.name }}</h4>
                <p>{{ lab.desc }}</p>
                <div class="lab-specs">
                  <span v-for="spec in lab.specs" :key="spec">{{ spec }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const activeSection = ref("majors");

const subMenus = [
  { id: "majors", label: "专业建设" },
  { id: "scheme", label: "培养方案" },
  { id: "course", label: "课程建设" },
  { id: "labs", label: "实验室建设" }
];

const majors = [
  {
    name: "人工智能",
    icon: "🤖",
    badge: "新工科前沿",
    featured: false,
    intro: "面向国家和粤港澳大湾区建设发展战略需要，培养掌握数学、计算机科学、人工智能基础理论及核心技术，具备机器学习、深度学习、自然语言处理、计算机视觉等领域的专业能力，兼具创新精神、实践能力与跨学科综合素质的应用型复合型高级专门人才。",
    courses: ["人工智能导论", "C++程序设计", "Python语言程序设计", "统计分析", "数据结构", "机器学习基础", "最优化方法", "自然语言处理", "深度学习与计算机视觉", "智能优化算法"],
    faculty: "专任教师13人，教授2人，副教授7人，具有博士学位92.3%，硕士及以上学位100%。",
    future: "毕业生可在人工智能相关领域进行算法研发、系统设计、技术应用与管理工作，或在银行、证券、保险、电信等企事业单位从事智能软件开发、智能技术应用、大数据处理等工作。也可继续攻读人工智能、计算机科学与技术、电子信息、软件工程等专业的硕士学位。"
  },
  {
    name: "计算机科学与技术",
    icon: "💻",
    badge: "",
    featured: false,
    intro: "面向国家科技发展与粤港澳大湾区战略需求，培养德智体美劳全面发展、掌握人工智能与计算机科学基础理论与核心技术的高素质人才。注重人工智能技术与行业场景深度融合，强化学生在金融科技、智慧城市等领域的系统开发与应用能力。",
    courses: ["高等数学", "C++程序设计", "Python编程实践", "数据结构", "算法分析与设计", "软件工程", "操作系统", "计算机网络", "机器学习基础", "自然语言处理", "智能优化算法", "深度学习与计算机视觉"],
    faculty: "拥有一支涵盖博士、硕士研究生导师、教授、副教授等职称的师资队伍。",
    future: "毕业生可在人工智能、大数据、金融科技、智慧政务、智能制造等方向就业，可报考政府信息管理、科技管理等岗位，也可继续攻读人工智能、计算机科学与技术、软件工程等硕士专业，或申请英、美、澳等知名高校深造。"
  },
  {
    name: "软件工程",
    icon: "⚙️",
    badge: "",
    featured: false,
    intro: `以"扎根湾区、技术赋能、财经特色"为核心竞争力，通过分层培养模式、产教深度融合、国际化资源导入三大引擎，掌握软件工程技术、软件工程管理以及软件服务工程的基本知识与技能。毕业生可在银行、证券、政务等金融领域及IT行业从事软件全生命周期管理、智能系统研发及数字化转型工作。`,
    courses: ["数据结构", "算法分析与设计", "计算机组成原理", "数据库原理", "操作系统", "软件建模与分析", "软件质量保证与测试", "计算机网络", "软件项目管理"],
    faculty: "专任教师12人，其中教授2人，副教授3人，教师多数具有博士学位，毕业于中山大学、华南理工大学、电子科技大学等国内外知名高校。",
    future: `毕业生年均就业率98.2%，40%进入互联网、IT科技领域，入职腾讯、微众银行等企业。考公方向可报考央行金融科技监管岗、税务总局信息化建设岗等职位。深造方向可攻读计算机科学与技术、金融科技等硕士，学院与悉尼大学、悉尼科技大学等国际顶尖高校联合培养。`
  },
  {
    name: "大数据管理与应用",
    icon: "📊",
    badge: "",
    featured: false,
    intro: `面向大湾区经济发展战略需要，培养掌握大数据处理关键核心技术以及经济管理基础理论和方法，具有数据定量分析能力、大数据应用实践及创新创业能力，满足大数据时代需要的"懂管理、强技术、擅应用"的高质量复合型人才。`,
    courses: ["大数据技术原理", "大数据治理", "机器学习", "Python程序设计", "Hadoop技术原理", "数据库原理", "数据采集与预处理", "数据可视化技术", "管理统计学", "商务智能", "文本数据挖掘", "AI+金融"],
    faculty: "系部专任教师15人，其中教授2人、副教授6人、讲师7人，博士学位占比87%。",
    future: "毕业生可进入政府部门从事大数据开发、政务大数据分析、数据治理等岗位，或在工商企业、金融机构从事大数据管理与分析、系统分析与设计、信息化战略制定等工作。也可在人工智能、计算机科学、管理科学与工程等方向继续深造。"
  },
  {
    name: "电子商务",
    icon: "🛒",
    badge: "国家一流专业",
    featured: true,
    intro: `广东财经大学电子商务专业创办于2002年，2019年入选首批"国家级一流本科专业建设点"，评级为A。形成了鲜明的"湾区融通"与"数智驱动"特色，致力于培养创新型、复合型、应用型电子商务高素质人才。`,
    courses: ["管理学", "微观经济学", "市场营销", "Python编程基础", "数据结构", "数据库原理", "电子商务原理", "电子商务物流与供应链", "网络营销", "移动电子商务", "互联网金融与电子支付", "商务数据分析基础"],
    faculty: "专任教师13人，其中教授2人，副教授3人，师资力量在商务智能等方向具备扎实科研基础和企业合作背景。",
    future: "毕业生就职于今日头条、网易有道、中国建设银行等大型国有企事业单位。可在管理科学与工程、技术经济及管理、工商管理等方向继续攻读硕士、博士学位，或申请悉尼大学、阿姆斯特丹大学等世界一流高校深造。"
  },
  {
    name: `"3+2"中外联合培养`,
    icon: "🌍",
    badge: "国际项目",
    featured: false,
    intro: `采用"3+2"中外联合培养模式，前三年在广东财经大学学习，后两年赴澳大利亚悉尼科技大学（UTS）攻读硕士，完成学业后可获得广东财经大学工学学士学位及UTS硕士学位（教育部认证）。旨在培养具备家国情怀、国际视野、专业素养和持续发展潜力的复合型计算机人才。`,
    courses: ["计算机科学导论", "面向对象程序设计", "数据结构与算法", "操作系统", "数据库原理", "计算机网络", "离散数学", "机器学习", "大数据基础", "云计算", "图像处理"],
    faculty: "师资涵盖教授、副教授与博士研究生导师，教师多毕业于中山大学、华南理工大学、北京航空航天大学、南洋理工大学、新南威尔士大学等国内外知名高校。",
    future: "本项目自带硕士阶段，完成UTS硕士课程后可进一步申请博士学位。毕业生可从事大模型研发、机器学习工程、系统架构、信息安全等技术岗位，就业单位包括世界500强企业、外资研发机构、高校科研机构等。"
  },
  {
    name: "计算机科学与技术（实验区）",
    icon: "🔬",
    badge: "实验区",
    featured: false,
    intro: "聚焦人工智能、大数据、云计算、物联网等前沿领域，面向粤港澳大湾区科技创新与数字产业升级对高素质人才的强烈需求。采用项目驱动与学术研讨相结合的教学模式，强化工程能力与技术创新精神，注重跨学科融合与真实产业场景对接。",
    courses: ["人工智能导论", "Python程序设计", "数据结构与算法", "操作系统", "数据库系统", "计算机网络", "深度学习与图神经网络", "大数据处理技术", "云计算架构与开发", "机器学习工程实践", "智能系统开发方法"],
    faculty: "教师团队由教授、副教授、讲师组成，教师多数具有博士学位，毕业于中山大学、华南理工大学、北京航空航天大学、电子科技大学等国内外知名高校，拥有部分海外博士或留学背景教师。",
    future: "毕业生可在人工智能、大数据、智慧城市、金融科技、智能制造等领域担任算法工程师、平台研发工程师、数据分析师、智能系统设计师等关键岗位，也可继续攻读硕士、博士学位或申请世界一流高校深造。"
  }
];

const schemeList = [
  { name: "计算机科学与技术专业培养方案", year: "2025级" },
  { name: "计算机科学与技术（实验区）专业培养方案", year: "2025级" },
  { name: `计算机科学与技术（中外联合培养项目班）专业培养方案`, year: "2025级" },
  { name: "软件工程专业培养方案", year: "2025级" },
  { name: "人工智能专业培养方案", year: "2025级" },
  { name: "大数据管理与应用专业培养方案", year: "2025级" },
  { name: `大数据管理与应用（数据治理）专业培养方案`, year: "2025级" },
  { name: `电子商务（大数据决策分析）专业培养方案`, year: "2025级" }
];

const labs = [
  {
    name: "广东省智能商务工程研究中心",
    area: "省级平台",
    desc: `学校"首个"省级工程技术研究中心（2018年获批），聚焦智能商务关键技术研究与产业化应用。`,
    specs: ["智能商务", "省级工程中心"]
  },
  {
    name: "广东省数字经济协同创新重点实验室",
    area: "省级平台",
    desc: "2024年7月获批，致力于数字经济前沿理论与关键技术创新研究。",
    specs: ["数字经济", "协同创新"]
  },
  {
    name: "数字化创新综合实验平台",
    area: "校级平台",
    desc: "广东财经大学数字化创新综合实验平台已完成建设，正式进入校级验收阶段。",
    specs: ["数字化创新", "综合实验"]
  },
  {
    name: "实训实验室智能化改造项目",
    area: "教学设施",
    desc: "大数据与人工智能学院实训实验室智能化改造项目正式启动，打造AI赋能的一体化教学新生态。",
    specs: ["AI赋能", "智能实训"]
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

.section-intro-text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

.intro-box {
  background-color: var(--bg-card);
  padding: 36px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.intro-box p {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--text-primary);
}

/* 专业卡片 */
.major-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.major-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 28px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s, box-shadow 0.3s;
}

.major-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.major-card--featured {
  border-left: 4px solid var(--accent-color);
}

.major-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.major-icon {
  font-size: 1.8rem;
}

.major-header h4 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--secondary-color);
}

.major-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  color: white;
  background: var(--primary-color);
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
  vertical-align: middle;
}

.major-intro {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.major-section {
  margin-bottom: 14px;
}

.major-section:last-child {
  margin-bottom: 0;
}

.major-section h5 {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
  border-left: 2px solid var(--accent-color);
  padding-left: 8px;
}

.major-section p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 课程标签 */
.course-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.course-badge {
  background-color: rgba(26, 92, 175, 0.05);
  color: var(--secondary-color);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 16px;
  border: 1px solid rgba(26, 92, 175, 0.1);
  transition: all 0.3s;
}

.course-badge:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* 培养方案列表 */
.scheme-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.scheme-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 18px 20px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s;
}

.scheme-card:hover {
  transform: translateY(-2px);
}

.scheme-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}

.scheme-info h4 {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--secondary-color);
  line-height: 1.4;
}

.scheme-year {
  font-size: 0.75rem;
  color: var(--primary-color);
  font-weight: 600;
}

/* 统计数据卡片 */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.stat-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px 16px;
  box-shadow: var(--shadow-sm);
  text-align: center;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-3px);
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-color);
  line-height: 1;
}

.stat-unit {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-left: 2px;
}

.stat-label {
  display: block;
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin-top: 8px;
  font-weight: 500;
}

/* 实验室 */
.lab-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 24px;
}

.lab-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s;
}

.lab-card:hover {
  transform: translateY(-3px);
}

.lab-header-bar {
  height: 8px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
}

.lab-body {
  padding: 24px;
}

.lab-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent-color);
  background: rgba(26, 92, 175, 0.08);
  padding: 2px 10px;
  border-radius: 10px;
  margin-bottom: 12px;
}

.lab-body h4 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 8px;
}

.lab-body p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 14px;
}

.lab-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  border-top: 1px dashed var(--border-color);
  padding-top: 12px;
}

.lab-specs span {
  font-size: 0.72rem;
  color: var(--primary-color);
  background-color: rgba(26, 92, 175, 0.06);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

@media (max-width: 900px) {
  .main-content-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .sidebar-menu {
    display: none;
  }
  .scheme-grid {
    grid-template-columns: 1fr;
  }
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .lab-grid {
    grid-template-columns: 1fr;
  }
}
</style>
