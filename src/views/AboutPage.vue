<template>
  <div class="sub-page about-page">
    <!-- 头部横幅 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <h1 class="banner-title">学院概况 <span>/ ABOUT US</span></h1>
        <p class="banner-desc">数据驱动智能 · 创新引领未来</p>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link> <span>/</span> <span class="active">学院概况</span>
        </div>
      </div>
      <div class="banner-pattern"></div>
    </div>

    <div class="container main-content-wrapper">
      <!-- 左侧：二级悬浮侧边栏 -->
      <aside class="sidebar-menu">
        <div class="sidebar-sticky">
          <h3 class="sidebar-title">学院概况</h3>
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
        <!-- 学院简介 Section -->
        <section id="intro" class="info-section scroll-anchor">
          <h3 class="pane-section-title">学院简介</h3>
          <div class="intro-box">
            <p class="emphasized">
              广东财经大学大数据与人工智能学院是适应国家大数据战略和人工智能发展趋势，于2020年正式组建的教学科研单位。学院前身为1984年创办的计算机科学系，具有40余年的信息技术办学底蕴。
            </p>
            <p>
              学院拥有一支结构合理、学术精湛、充满活力的教师队伍。现有教职工80余人，其中教授12人、副教授25人，博士学位的教师占比超85%。拥有“珠江学者特聘教授”、“广东省优秀青年教师”、“南粤优秀教师”等省级以上高层次人才多名。
            </p>
            <p>
              学院始终以“数据驱动智能，创新引领未来”为核心理念，深度对接粤港澳大湾区数字经济腾飞与人工智能产业转型升级。近年来，学院承担国家级科研项目十余项、省部级重点课题30余项，在国际权威期刊发表高水平学术成果200余篇，产学研联合成效显著，与腾讯、阿里、华为等多家数字经济领军企业共建多个联合实验平台。
            </p>
          </div>
        </section>

        <!-- 领导班子 Section -->
        <section id="leadership" class="info-section scroll-anchor">
          <h3 class="pane-section-title">领导班子</h3>
          <div class="leadership-grid">
            <div v-for="leader in leadership" :key="leader.name" class="leader-card">
              <div class="leader-avatar-placeholder">
                <UserRound :size="36" />
              </div>
              <div class="leader-info">
                <h4>{{ leader.name }}</h4>
                <span class="leader-role">{{ leader.role }}</span>
                <p class="leader-duty">{{ leader.duty }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 组织机构 Section -->
        <section id="organs" class="info-section scroll-anchor">
          <h3 class="pane-section-title">组织机构</h3>
          <div class="org-layout">
            <div class="org-card">
              <h4>教学管理机构 (系部)</h4>
              <ul>
                <li>🤖 人工智能系</li>
                <li>🖥️ 计算机科学与技术系</li>
                <li>📊 数据科学与大数据技术系</li>
                <li>🔐 网络空间安全系</li>
              </ul>
            </div>
            
            <div class="org-card">
              <h4>研究与实验机构</h4>
              <ul>
                <li>🔬 大数据与生成式AI联合实验室 (腾讯云共建)</li>
                <li>💻 广东省大数据商业智能工程技术研究中心</li>
                <li>📡 智能系统设计与嵌入式硬件中心</li>
                <li>🛡️ 密码应用与数字安全检测实验室</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 师资队伍 Section -->
        <section id="faculty-list" class="info-section scroll-anchor">
          <h3 class="pane-section-title">师资队伍</h3>
          <div class="faculty-brief-box">
            <p>
              学院按系部配备了顶尖的师资队伍。我们支持高素质、国际化的师资网络建设，在数据存储、机器视觉、神经网络等多个优势研究领域拥有核心学科带头人。
            </p>
            <router-link to="/about" class="view-more-btn">
              <span>查看完整教授名录</span>
              <ArrowRight :size="16" />
            </router-link>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { UserRound, ArrowRight } from "lucide-vue-next";

const activeSection = ref("intro");

const subMenus = [
  { id: "intro", label: "学院简介" },
  { id: "leadership", label: "领导班子" },
  { id: "organs", label: "组织机构" },
  { id: "faculty-list", label: "师资队伍" }
];

const leadership = [
  { name: "张教授", role: "党总支书记", duty: "主持学院党委全面工作，分管党建、干部工作、廉政建设、校友工作。" },
  { name: "李教授", role: "院长 / 教授、博士生导师", duty: "主持学院行政全面工作，分管发展规划、学科建设、师资队伍、财务审计。" },
  { name: "副张教授", role: "副院长 / 博士生导师", duty: "分管研究生招生与教学培养、科研项目管理、国内外学术交流合作、平台建设。" },
  { name: "副李书记", role: "党总支副书记", duty: "分管学生日常管理、共青团建设、大学生科创竞赛、招生与就业指导工作。" }
];

const scrollToAnchor = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 100; // 减去 Header 悬浮高度
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
  padding-top: 80px; /* 留出 header 高度 */
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
  top: 110px; /* 固定定位 */
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

/* 右侧内容面 */
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
  margin-bottom: 20px;
}

.intro-box p:last-child {
  margin-bottom: 0;
}

.intro-box p.emphasized {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color);
}

.dark .intro-box p.emphasized {
  color: var(--highlight-color);
}

/* 领导班子卡片 */
.leadership-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.leader-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  background-color: var(--bg-card);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  align-items: flex-start;
  transition: transform 0.3s;
}

.leader-card:hover {
  transform: translateY(-3px);
}

.leader-avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d2b4e 0%, #1a5caf 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.leader-info h4 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 4px;
}

.dark .leader-info h4 {
  color: white;
}

.leader-role {
  font-size: 0.85rem;
  color: var(--primary-color);
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
}

.dark .leader-role {
  color: var(--highlight-color);
}

.leader-duty {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 组织机构 */
.org-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.org-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 30px;
  box-shadow: var(--shadow-sm);
}

.org-card h4 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--secondary-color);
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}

.dark .org-card h4 {
  color: white;
}

.org-card ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.org-card li {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* 师资简介 */
.faculty-brief-box {
  background-color: var(--bg-card);
  padding: 32px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
}

.faculty-brief-box p {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.6;
}

.view-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--primary-color);
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.dark .view-more-btn {
  color: var(--highlight-color);
}

.view-more-btn:hover {
  gap: 10px;
}

@media (max-width: 900px) {
  .main-content-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .sidebar-menu {
    display: none; /* 移动端隐藏侧栏菜单 */
  }
  .leadership-grid, .org-layout {
    grid-template-columns: 1fr;
  }
}
</style>
