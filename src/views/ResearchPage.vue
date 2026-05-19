<template>
  <div class="sub-page research-page">
    <!-- 头部横幅 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <h1 class="banner-title">学科科研 <span>/ RESEARCH</span></h1>
        <p class="banner-desc">探求真理，攻坚前沿 · 大数据与智能计算的学术高峰</p>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link> <span>/</span> <span class="active">学科科研</span>
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
        <!-- 学科体系 Section -->
        <section id="disciplines" class="info-section scroll-anchor">
          <h3 class="pane-section-title">学科体系</h3>
          <div class="discipline-content">
            <p class="emphasized">
              学院拥有“计算机科学与技术”一级学科硕士学位授权点、“大数据商业智能”二级学科硕士学位授权点以及“电子信息”专业硕士授权领域，已形成了“大数据建模-智能算法开发-网络安全治理”三位一体的立体化学科链条。
            </p>
            <div class="discipline-grid">
              <div class="disc-card">
                <div class="disc-number">01</div>
                <h4>智能信息处理与算法</h4>
                <p>深耕机器视觉、大规模自然语言生成、多模态智能表征以及神经架构搜索（NAS）。</p>
              </div>
              <div class="disc-card">
                <div class="disc-number">02</div>
                <h4>大数据与计算智能</h4>
                <p>聚焦高维海量数据存储管理、分布式计算架构（Spark/Flink）、图数据库表示学习及隐私合规分析。</p>
              </div>
              <div class="disc-card">
                <div class="disc-number">03</div>
                <h4>网络空间与密码安全</h4>
                <p>研究端到端高强密码防护体系、数据隐私防泄露脱敏、区块链信任合规安全共识算法等关键工程问题。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 学术成就 Section -->
        <section id="outputs" class="info-section scroll-anchor">
          <h3 class="pane-section-title">学术成就与论文发表</h3>
          <div class="outputs-stats">
            <div class="stat-card">
              <span class="num">200+</span>
              <span class="lbl">SCI/EI高水平论文</span>
            </div>
            <div class="stat-card">
              <span class="num">15+</span>
              <span class="lbl">国家级基金立项</span>
            </div>
            <div class="stat-card">
              <span class="num">30+</span>
              <span class="lbl">发明专利授权</span>
            </div>
            <div class="stat-card">
              <span class="num">1200万</span>
              <span class="lbl">年均到账科研经费</span>
            </div>
          </div>

          <div class="recent-papers">
            <h4>代表性学术成果 (Representative Publications)</h4>
            <ul class="paper-list">
              <li>
                <span class="paper-year">2026</span>
                <div class="paper-detail">
                  <p class="paper-title">"Cross-Modal Fusion and Regularization for Sparse Heterogeneous Data Mining"</p>
                  <p class="paper-author">张晓华(通讯作者), 李博士. <strong>IEEE Transactions on Cybernetics</strong> (IF: 11.8)</p>
                </div>
              </li>
              <li>
                <span class="paper-year">2025</span>
                <div class="paper-detail">
                  <p class="paper-title">"Privacy-Preserving Multi-Party Decentralized Machine Learning Over Blockchain"</p>
                  <p class="paper-author">孙德胜(第一作者), 陈博士. <strong>IEEE Transactions on Information Forensics and Security</strong> (IF: 7.2)</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- 科研平台 Section -->
        <section id="platforms" class="info-section scroll-anchor">
          <h3 class="pane-section-title">核心科研载体</h3>
          <div class="platforms-list">
            <div class="platform-item">
              <div class="plat-badge">省级</div>
              <div class="plat-info">
                <h4>广东省大数据与商业智能工程技术研究中心</h4>
                <p>省级重点平台。聚焦粤港澳大湾区现代服务业数字化建设，打通从复杂异构数据源接入到商业智能挖掘的全栈技术链条。</p>
              </div>
            </div>
            <div class="platform-item">
              <div class="plat-badge">校企共建</div>
              <div class="plat-info">
                <h4>生成式人工智能校企融合创新中心 (联合腾讯云)</h4>
                <p>面向新一代AI基础理论，深度合作GPU大规模分布式调度算法、垂直领域大模型参数微调及企业数字资产安全治理。</p>
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

const activeSection = ref("disciplines");

const subMenus = [
  { id: "disciplines", label: "学科体系" },
  { id: "outputs", label: "学术成就" },
  { id: "platforms", label: "核心科研载体" }
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

.discipline-content p.emphasized {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--primary-color);
  background-color: var(--bg-card);
  padding: 24px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  margin-bottom: 28px;
}

.dark .discipline-content p.emphasized {
  color: var(--highlight-color);
}

/* 学科网格 */
.discipline-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.disc-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  position: relative;
}

.disc-number {
  font-family: var(--font-data);
  font-size: 2rem;
  font-weight: 800;
  color: rgba(26, 92, 175, 0.15);
  margin-bottom: 12px;
}

.dark .disc-number {
  color: rgba(255, 255, 255, 0.1);
}

.disc-card h4 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 8px;
}

.dark .disc-card h4 {
  color: white;
}

.disc-card p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 学术成果统计 */
.outputs-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 36px;
}

.stat-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px 16px;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.stat-card .num {
  font-family: var(--font-data);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--secondary-color);
  display: block;
}

.dark .stat-card .num {
  color: var(--highlight-color);
}

.stat-card .lbl {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 4px;
  display: block;
}

/* 代表作列表 */
.recent-papers {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 30px;
  box-shadow: var(--shadow-sm);
}

.recent-papers h4 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 20px;
  border-bottom: 1px dashed var(--border-color);
  padding-bottom: 10px;
}

.dark .recent-papers h4 {
  color: white;
}

.paper-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.paper-list li {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.paper-year {
  font-family: var(--font-data);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--accent-color);
  background-color: rgba(200, 168, 78, 0.1);
  padding: 4px 12px;
  border-radius: 4px;
  flex-shrink: 0;
}

.paper-detail p {
  line-height: 1.5;
}

.paper-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.paper-author {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 4px;
}

/* 科研载体 */
.platforms-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.platform-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 24px;
  padding: 24px;
  background-color: var(--bg-card);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  align-items: center;
}

.plat-badge {
  background-color: rgba(26, 92, 175, 0.08);
  color: var(--primary-color);
  font-weight: 700;
  font-size: 0.85rem;
  padding: 8px 12px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid rgba(26, 92, 175, 0.15);
}

.platform-item:last-child .plat-badge {
  background-color: rgba(200, 168, 78, 0.1);
  color: var(--accent-color);
  border-color: rgba(200, 168, 78, 0.2);
}

.plat-info h4 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 6px;
}

.dark .plat-info h4 {
  color: white;
}

.plat-info p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .main-content-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .sidebar-menu {
    display: none;
  }
  .discipline-grid, .outputs-stats {
    grid-template-columns: 1fr;
  }
  .platform-item {
    grid-template-columns: 1fr;
    gap: 16px;
    text-align: center;
  }
  .plat-badge {
    width: max-content;
    margin: 0 auto;
  }
}
</style>
