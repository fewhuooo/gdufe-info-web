<template>
  <div class="sub-page education-page">
    <!-- 头部横幅 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <h1 class="banner-title">人才培养 <span>/ EDUCATION</span></h1>
        <p class="banner-desc">融汇通识教育与专业底蕴 · 铸就大数据与AI中坚力量</p>
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
        <!-- 培养特色 Section -->
        <section id="features" class="info-section scroll-anchor">
          <h3 class="pane-section-title">培养特色</h3>
          <div class="features-grid">
            <div class="feature-box">
              <div class="feature-icon">🚀</div>
              <h4>产学研融通创新</h4>
              <p>紧密联合华为、腾讯、阿里等头部大厂共建联合实验，实施“双导师制”，让项目实践直通工业前沿。</p>
            </div>
            <div class="feature-box">
              <div class="feature-icon">🧠</div>
              <h4>全科素养与AI前沿</h4>
              <p>既打牢传统计算机软硬件基本功，又重点倾斜“大模型微调”、“强化学习”等前沿AI算法的探索能力。</p>
            </div>
            <div class="feature-box">
              <div class="feature-icon">🏆</div>
              <h4>科创竞赛常态推进</h4>
              <p>拥有专门的科创工作室与指导委员会，大二起全面吸纳学生进入实验室参与教师科研课题，赛学并进。</p>
            </div>
          </div>
        </section>

        <!-- 核心课程矩阵 Section -->
        <section id="courses" class="info-section scroll-anchor">
          <h3 class="pane-section-title">核心课程矩阵</h3>
          <p class="section-intro-text">
            学院构建了分层递进、逻辑闭环的“硬核”专业课程体系，涵盖计算机科学基础、大数据技术架构及核心AI算法体系。
          </p>
          <div class="courses-matrix">
            <div v-for="category in courseStructure" :key="category.type" class="course-type-card">
              <h4>{{ category.type }}</h4>
              <div class="course-badges">
                <span v-for="course in category.items" :key="course" class="course-badge">
                  {{ course }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 实验资源 Section -->
        <section id="labs" class="info-section scroll-anchor">
          <h3 class="pane-section-title">实验室与实践载体</h3>
          <p class="section-intro-text">
            学院配备了千万级高算力计算集群及专业的研发测试平台，为本科与研究生教学提供了全方位的算力与硬件资源支持。
          </p>
          
          <div class="labs-gallery">
            <div v-for="lab in labs" :key="lab.name" class="lab-card">
              <div class="lab-img-overlay">
                <span class="lab-tag">{{ lab.area }}</span>
              </div>
              <div class="lab-info">
                <h4>{{ lab.name }}</h4>
                <p>{{ lab.desc }}</p>
                <div class="spec-list">
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

const activeSection = ref("features");

const subMenus = [
  { id: "features", label: "培养特色" },
  { id: "courses", label: "核心课程矩阵" },
  { id: "labs", label: "实验室与实践载体" }
];

const courseStructure = [
  {
    type: "计算机科学基础 (CS Foundation)",
    items: ["数据结构与算法", "计算机组成原理", "操作系统", "计算机网络", "数据库系统原理", "面向对象程序设计 (Java/C++)"]
  },
  {
    type: "大数据工程与分析 (Big Data Track)",
    items: ["分布式计算技术 (Hadoop/Spark)", "数据仓库与ETL", "NoSQL数据库", "数据采集与预处理", "商业智能与数据可视化", "高维数据分析"]
  },
  {
    type: "人工智能与算法前沿 (AI Track)",
    items: ["机器学习基础", "深度学习与大模型导论", "计算机视觉", "自然语言处理", "知识图谱与语义网", "强化学习与推荐算法"]
  }
];

const labs = [
  {
    name: "大数据建模与商业智能实验中心",
    area: "大数据应用",
    desc: "拥有省级虚拟仿真教学平台，支撑海量金融、政务及电商领域的真实业务建模实践。",
    specs: ["Spark集群", "商业BI可视化", "100+节点计算规模"]
  },
  {
    name: "智能算法与生成式AI算力平台",
    area: "人工智能",
    desc: "配备了多卡高性能GPU算力集群，全面支撑学生在本科大三阶段开展大语言模型微调与机器视觉训练。",
    specs: ["NVIDIA A100/H800算力", "PyTorch研发框架", "大模型开发工具链"]
  },
  {
    name: "网络攻防与信息安全演练基地",
    area: "信息安全",
    desc: "高度仿真的靶场演练平台，专注于云安全攻防、密码学安全应用及企业级信息合规渗透检测。",
    specs: ["攻防靶场系统", "区块链隐私检测", "威胁情报分析仪"]
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
  background: var(--gradient-hero);
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
}

.banner-inner {
  position: relative;
  z-index: 2;
}

.banner-title {
  font-family: var(--font-heading);
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: 2px;
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.banner-title span {
  font-size: 1.1rem;
  opacity: 0.7;
  font-weight: 400;
}

.banner-desc {
  font-size: 1rem;
  opacity: 0.9;
  letter-spacing: 4px;
  margin-top: 8px;
  margin-bottom: 24px;
}

.breadcrumb {
  font-size: 0.85rem;
  display: flex;
  gap: 8px;
  opacity: 0.85;
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
  color: var(--accent-color);
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

.dark .sidebar-title {
  color: white;
  border-bottom-color: var(--highlight-color);
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

.dark .sidebar-menu button.active {
  background-color: rgba(0, 174, 239, 0.08);
  color: var(--highlight-color);
  border-left-color: var(--highlight-color);
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

.dark .pane-section-title {
  color: white;
}

.section-intro-text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

/* 培养特色特色小卡片 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-box {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 30px 24px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s;
}

.feature-box:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 2.2rem;
  margin-bottom: 16px;
}

.feature-box h4 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 10px;
}

.dark .feature-box h4 {
  color: white;
}

.feature-box p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 核心课程矩阵 */
.courses-matrix {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.course-type-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.course-type-card h4 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 16px;
  border-bottom: 1px dashed var(--border-color);
  padding-bottom: 10px;
}

.dark .course-type-card h4 {
  color: var(--highlight-color);
}

.course-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.course-badge {
  background-color: rgba(26, 92, 175, 0.05);
  color: var(--secondary-color);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(26, 92, 175, 0.1);
  transition: all 0.3s;
}

.dark .course-badge {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-color: rgba(255, 255, 255, 0.1);
}

.course-badge:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-1px);
}

.dark .course-badge:hover {
  background-color: var(--highlight-color);
  border-color: var(--highlight-color);
  color: var(--secondary-color);
}

/* 实验资源画廊 */
.labs-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.lab-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;
}

.lab-card:hover {
  transform: translateY(-3px);
}

.lab-img-overlay {
  height: 120px;
  background: linear-gradient(135deg, #0d2b4e 0%, #1a5caf 100%);
  position: relative;
}

.lab-img-overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.3;
}

.lab-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  background-color: var(--accent-color);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
}

.lab-info {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.lab-info h4 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 8px;
  line-height: 1.4;
}

.dark .lab-info h4 {
  color: white;
}

.lab-info p {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 14px;
  min-height: 72px;
}

.spec-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  border-top: 1px dashed var(--border-color);
  padding-top: 12px;
}

.spec-list span {
  font-size: 0.7rem;
  color: var(--primary-color);
  background-color: rgba(26, 92, 175, 0.06);
  padding: 2px 6px;
  border-radius: 2px;
  font-weight: 600;
}

.dark .spec-list span {
  color: var(--highlight-color);
  background-color: rgba(255, 255, 255, 0.06);
}

@media (max-width: 900px) {
  .main-content-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .sidebar-menu {
    display: none;
  }
  .features-grid, .labs-gallery {
    grid-template-columns: 1fr;
  }
}
</style>
