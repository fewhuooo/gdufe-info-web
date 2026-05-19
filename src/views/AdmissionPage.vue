<template>
  <div class="sub-page admission-page">
    <!-- 头部横幅 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <h1 class="banner-title">招生就业 <span>/ ENROLLMENT & CAREERS</span></h1>
        <p class="banner-desc">加入大数据与AI学院 · 赋能数字时代，启航卓越人生</p>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link> <span>/</span> <span class="active">招生就业</span>
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
        <!-- 本科报考 Section -->
        <section id="undergrad" class="info-section scroll-anchor">
          <h3 class="pane-section-title">本科报考指南</h3>
          <div class="faq-box">
            <p class="emphasized">
              学院推行“计算机大类-精细化分流-校企实验班”的联合贯通培养模式，大一开展扎实的数学与算法训练，大二全面对接特色专业方向。
            </p>
            
            <div class="accordion-group">
              <div 
                v-for="(item, idx) in undergradFaqs" 
                :key="item.q" 
                class="accordion-item"
                :class="{ open: openUndergradIdx === idx }"
              >
                <button class="accordion-trigger" @click="toggleUndergrad(idx)">
                  <span class="q-icon">Q</span>
                  <h4>{{ item.q }}</h4>
                  <span class="chevron">{{ openUndergradIdx === idx ? '▲' : '▼' }}</span>
                </button>
                <div class="accordion-content">
                  <p>{{ item.a }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 研究生招生 Section -->
        <section id="grad" class="info-section scroll-anchor">
          <h3 class="pane-section-title">硕士研究生招考</h3>
          <div class="grad-box">
            <div class="grad-brief">
              <h4>招考专业：电子信息（专硕） / 计算机科学与技术（学硕）</h4>
              <p>
                招收全国统考硕士及推荐免试研究生。主要研究方向包括：深度学习理论前沿、图神经网络商业智能、工业互联网安全攻防、分布式流式数据库计算。
              </p>
              <div class="grad-timeline">
                <h5>主要时间节点：</h5>
                <ul>
                  <li><strong>09月-10月</strong>: 推荐免试生（推免生）接收申请与夏令营复试</li>
                  <li><strong>10月-11月</strong>: 全国研究生统一考试大纲发布与报名阶段</li>
                  <li><strong>12月下旬</strong>: 全国硕士研究生招生考试统考笔试阶段</li>
                  <li><strong>次年03月</strong>: 复试调剂大纲发布与面试复审阶段</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 生涯就业 Section -->
        <section id="career" class="info-section scroll-anchor">
          <h3 class="pane-section-title">毕业生生涯与就业质量</h3>
          <div class="career-stats">
            <div class="c-stat-box">
              <span class="num">98.6%</span>
              <span class="lbl">年终综合就业率</span>
            </div>
            <div class="c-stat-box">
              <span class="num">12.8 k</span>
              <span class="lbl">本科生首期平均月薪</span>
            </div>
            <div class="c-stat-box">
              <span class="num">82.3%</span>
              <span class="lbl">大湾区（广深佛）落地率</span>
            </div>
          </div>

          <div class="destinations">
            <h4>主要就业去向 (Key Recruiters)</h4>
            <div class="dest-grid">
              <div class="dest-card">
                <h5>🚀 头部互联网与科技巨头</h5>
                <p>腾讯、阿里巴巴、网易游戏、字节跳动、华为科技等。</p>
              </div>
              <div class="dest-card">
                <h5>🏦 金融机构与数据中心</h5>
                <p>四大国有银行软件开发中心、招商银行风控中心、广发证券智能投资平台。</p>
              </div>
              <div class="dest-card">
                <h5>🏫 国内知名高校深造</h5>
                <p>中山大学、华南理工大学、暨南大学、清华大学深圳研究生院等。</p>
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

const activeSection = ref("undergrad");
const openUndergradIdx = ref<number | null>(0);

const subMenus = [
  { id: "undergrad", label: "本科报考" },
  { id: "grad", label: "硕博申请" },
  { id: "career", label: "生涯就业" }
];

const undergradFaqs = [
  {
    q: "新生入校后如何申报“华为云创实验班”或“腾讯大模型先锋班”？",
    a: "入学当月举行全院新生分班考试，考察数学与基础编程逻辑。考试通过者即可编入联合校企实验班，单独配备双师资指导，执行单独的高难度培养体系。"
  },
  {
    q: "大类招生分流方案是如何执行的？",
    a: "学院目前大一执行计算机类大类培养。大一第二学期末，根据“大一平均成绩绩点占70% + 科创折算积分/专家面试占30%”的综合排名，遵循志愿优先原则开展专业精细化分流。"
  },
  {
    q: "学院对于本科生科创项目及竞赛有哪些奖励支持？",
    a: "学院设立了年均十万元的专项科创奖学金，报销参赛学生的全部路费及报名费，并提供一流的创客工作室和高性能计算算力支持。"
  }
];

const toggleUndergrad = (idx: number) => {
  if (openUndergradIdx.value === idx) {
    openUndergradIdx.value = null;
  } else {
    openUndergradIdx.value = idx;
  }
};

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

.faq-box {
  background-color: var(--bg-card);
  padding: 36px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.faq-box p.emphasized {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--primary-color);
  margin-bottom: 28px;
  font-weight: 600;
}

.dark .faq-box p.emphasized {
  color: var(--highlight-color);
}

/* FAQ 手风琴 */
.accordion-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.accordion-item {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-color);
  overflow: hidden;
  transition: all 0.3s;
}

.dark .accordion-item {
  background-color: rgba(255, 255, 255, 0.02);
}

.accordion-trigger {
  width: 100%;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  text-align: left;
  gap: 16px;
  transition: all 0.3s;
}

.accordion-trigger .q-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.accordion-trigger h4 {
  font-family: var(--font-heading);
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--secondary-color);
  flex-grow: 1;
}

.dark .accordion-trigger h4 {
  color: white;
}

.accordion-trigger .chevron {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out, padding 0.3s ease;
  padding: 0 24px;
  background-color: var(--bg-card);
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.accordion-item.open {
  border-color: rgba(26, 92, 175, 0.25);
  box-shadow: var(--shadow-sm);
}

.accordion-item.open .accordion-content {
  max-height: 200px;
  padding: 0 24px 24px 70px;
  border-top: 1px dashed var(--border-color);
}

/* 研究生考日程 */
.grad-box {
  background-color: var(--bg-card);
  padding: 36px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.grad-brief h4 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}

.dark .grad-brief h4 {
  color: white;
}

.grad-brief p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 24px;
}

.grad-timeline h5 {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 14px;
}

.dark .grad-timeline h5 {
  color: var(--highlight-color);
}

.grad-timeline ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.grad-timeline li {
  font-size: 0.85rem;
  color: var(--text-primary);
  display: flex;
  gap: 10px;
}

.grad-timeline li strong {
  color: var(--accent-color);
  flex-shrink: 0;
  width: 100px;
}

/* 就业统计 */
.career-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 36px;
}

.c-stat-box {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px 16px;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.c-stat-box .num {
  font-family: var(--font-data);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--secondary-color);
  display: block;
}

.dark .c-stat-box .num {
  color: var(--highlight-color);
}

.c-stat-box .lbl {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 4px;
  display: block;
}

/* 就业去向 */
.destinations {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 30px;
  box-shadow: var(--shadow-sm);
}

.destinations h4 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 20px;
  border-bottom: 1px dashed var(--border-color);
  padding-bottom: 10px;
}

.dark .destinations h4 {
  color: white;
}

.dest-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.dest-card {
  background-color: var(--bg-color);
  padding: 20px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.dark .dest-card {
  background-color: rgba(255, 255, 255, 0.02);
}

.dest-card h5 {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 8px;
}

.dark .dest-card h5 {
  color: white;
}

.dest-card p {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

@media (max-width: 900px) {
  .main-content-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .sidebar-menu {
    display: none;
  }
  .career-stats, .dest-grid {
    grid-template-columns: 1fr;
  }
}
</style>
