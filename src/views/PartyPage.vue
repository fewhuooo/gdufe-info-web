<template>
  <div class="sub-page party-page">
    <!-- 头部横幅 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <h1 class="banner-title">党建工作 <span>/ PARTY BUILDING</span></h1>
        <p class="banner-desc">红心铸魂，科创先锋 · 新时代高校党建标杆示范</p>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link> <span>/</span> <span class="active">党建工作</span>
        </div>
      </div>
      <div class="banner-pattern"></div>
    </div>

    <div class="container main-content-wrapper">
      <!-- 左侧：二级悬浮侧边栏 -->
      <aside class="sidebar-menu">
        <div class="sidebar-sticky">
          <h3 class="sidebar-title">党建工作</h3>
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
        <!-- 思想建设 Section -->
        <section id="thought" class="info-section scroll-anchor">
          <h3 class="pane-section-title">思想领航与政治理论学习</h3>
          <div class="thought-box">
            <p class="emphasized">
              学院党委始终以习近平新时代中国特色社会主义思想为指引，牢牢把握立德树人根本任务，把政治理论学习与学院科技创新紧密融合，打造“红色智算，科研报国”特色育人工程。
            </p>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-date">2026.05</div>
                <div class="timeline-content">
                  <h4>开展党总支理论学习中心组（扩大）专题研讨会</h4>
                  <p>聚焦“人工智能伦理与可信数据治理”，深学细悟发展新质生产力与安全底线的逻辑辩证关系，凝聚科技自立自强思想共识。</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-date">2026.04</div>
                <div class="timeline-content">
                  <h4>组织开展“青春心向党，红色AI创未来”红色教育实践</h4>
                  <p>党员教师骨干赴国家级超算中心联合开展主题党日活动，把党的二十大精神落实到具体的“卡脖子”技术研究工作中。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 支部风采 Section -->
        <section id="branches" class="info-section scroll-anchor">
          <h3 class="pane-section-title">支部风采与标杆示范</h3>
          <p class="section-intro-text">
            学院积极构筑“筑垒工程”，按照“支部建在系部上，支部建在团队中”的发展战略，形成党政同心、教研共促的高效支部格局。
          </p>
          
          <div class="branch-grid">
            <div class="branch-card">
              <div class="branch-icon">⚙️</div>
              <h4>教工第一党支部 (人工智能系)</h4>
              <p>入选省级“样板党支部”创建单位。支部骨干教师100%拥有博士学位，将算法攻坚与立德树人教学深度融通，获评优秀教学模范称号。</p>
            </div>
            <div class="branch-card">
              <div class="branch-icon">🎓</div>
              <h4>研究生第一党支部 (大模型方向)</h4>
              <p>由硕博研究生及高年级青年创客党员组成。在“挑战杯”夺金项目及“创青春”国家大奖赛中，党员骨干始终发挥着第一梯队先锋示范效应。</p>
            </div>
          </div>
        </section>

        <!-- 教育培训 Section -->
        <section id="trainings" class="info-section scroll-anchor">
          <h3 class="pane-section-title">基层党员教育与在线党校</h3>
          <div class="training-box">
            <div class="training-info">
              <h4>学院青年党员理论宣讲团与入党先锋课</h4>
              <p>
                学院党建云平台全面实施数字化管理，定期更新发布“学习微课堂”、“榜样宣讲会”，开设面向入党积极分子、预备党员的多类型党校网络面授班，切实保障教育管理“全链条”闭环。
              </p>
              <a href="#" class="btn btn-primary training-btn">进入“红色智算”云学堂</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const activeSection = ref("thought");

const subMenus = [
  { id: "thought", label: "思想领航" },
  { id: "branches", label: "支部风采" },
  { id: "trainings", label: "教育培训" }
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

.thought-box {
  background-color: var(--bg-card);
  padding: 36px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.thought-box p.emphasized {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--primary-color);
  margin-bottom: 30px;
  font-weight: 600;
}

.dark .thought-box p.emphasized {
  color: var(--highlight-color);
}

/* 垂直时间线 */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  padding-left: 20px;
}

.timeline::before {
  content: "";
  position: absolute;
  top: 0;
  left: 4px;
  width: 2px;
  height: 100%;
  background-color: var(--border-color);
}

.timeline-item {
  position: relative;
}

.timeline-date {
  font-family: var(--font-data);
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--accent-color);
  background-color: var(--bg-card);
  position: absolute;
  left: -20px;
  top: 0;
  padding-right: 10px;
  z-index: 2;
}

.timeline-content {
  margin-left: 60px;
}

.timeline-content h4 {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 6px;
}

.dark .timeline-content h4 {
  color: white;
}

.timeline-content p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 支部风采网格 */
.branch-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.branch-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 30px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s;
}

.branch-card:hover {
  transform: translateY(-3px);
}

.branch-icon {
  font-size: 2rem;
  margin-bottom: 16px;
}

.branch-card h4 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 10px;
}

.dark .branch-card h4 {
  color: white;
}

.branch-card p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 教育培训 */
.training-box {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 36px;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
}

.training-info h4 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 12px;
}

.dark .training-info h4 {
  color: white;
}

.training-info p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 24px;
}

.training-btn {
  padding: 12px 28px;
  font-weight: 600;
  border-radius: 30px;
}

@media (max-width: 900px) {
  .main-content-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .sidebar-menu {
    display: none;
  }
  .branch-grid {
    grid-template-columns: 1fr;
  }
}
</style>
