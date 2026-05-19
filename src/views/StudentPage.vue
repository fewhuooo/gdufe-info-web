<template>
  <div class="sub-page student-page">
    <!-- 头部横幅 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <h1 class="banner-title">学生天地 <span>/ STUDENT LIFE</span></h1>
        <p class="banner-desc">青春飞扬，科创筑梦 · 自由探索与卓越实践的第二课堂</p>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link> <span>/</span> <span class="active">学生天地</span>
        </div>
      </div>
      <div class="banner-pattern"></div>
    </div>

    <div class="container main-content-wrapper">
      <!-- 左侧：二级悬浮侧边栏 -->
      <aside class="sidebar-menu">
        <div class="sidebar-sticky">
          <h3 class="sidebar-title">学生天地</h3>
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
          <h3 class="pane-section-title">团学活动与丰富校园文化</h3>
          <div class="activities-showcase">
            <div class="act-card">
              <div class="act-img-placeholder">🎨</div>
              <div class="act-info">
                <h4>第一届“智算未来”科技艺术节</h4>
                <p>将严谨的数字逻辑与充满灵感的视觉艺术结合，由学生自行编写AI渲染脚本进行大屏实时交互演练，吸引全校千余名师生参会体验。</p>
              </div>
            </div>
            
            <div class="act-card">
              <div class="act-img-placeholder">💻</div>
              <div class="act-info">
                <h4>“24小时极限编程”青年黑客松挑战赛</h4>
                <p>学院传统金牌活动。以“大湾区数字生活”为命题，党员骨干带头组队，现场封闭式研发24小时，最终输出多款创意十足的应用系统。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 竞赛获奖 Section -->
        <section id="awards" class="info-section scroll-anchor">
          <h3 class="pane-section-title">学科竞赛与创新创业成果</h3>
          <p class="section-intro-text">
            学院高度重视学生的实践动手能力，通过成立“科创导航工作室”，指导学生在大赛中攻坚克难，连创佳绩。
          </p>
          
          <div class="awards-table-wrapper">
            <table class="awards-table">
              <thead>
                <tr>
                  <th>年度</th>
                  <th>赛事名称</th>
                  <th>获奖项</th>
                  <th>参赛团队/个人</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="year">2026</td>
                  <td class="event">第十六届“挑战杯”全国大学生学术作品竞赛</td>
                  <td class="award gold">全国特等奖</td>
                  <td>金融风控智能开发组</td>
                </tr>
                <tr>
                  <td class="year">2025</td>
                  <td class="event">ACM-ICPC 国际大学生程序设计竞赛（省级）</td>
                  <td class="award silver">金奖 (第1名)</td>
                  <td>算法极客队</td>
                </tr>
                <tr>
                  <td class="year">2025</td>
                  <td class="event">第十四届“蓝桥杯”全国软件人才设计大赛</td>
                  <td class="award">一等奖 (5人)</td>
                  <td>李明、王华 等</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 校友风采 Section -->
        <section id="alumni" class="info-section scroll-anchor">
          <h3 class="pane-section-title">优秀校友力量</h3>
          <div class="alumni-grid">
            <div v-for="alum in alumni" :key="alum.name" class="alumni-card">
              <div class="alumni-badge">{{ alum.batch }}届</div>
              <h4>{{ alum.name }}</h4>
              <span class="alumni-company">{{ alum.company }}</span>
              <p class="alumni-desc">{{ alum.desc }}</p>
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
  { id: "awards", label: "竞赛获奖" },
  { id: "alumni", label: "优秀校友" }
];

const alumni = [
  {
    name: "林建安",
    batch: "2021",
    company: "腾讯科技有限公司 · 算法工程师",
    desc: "在校期间曾任计算机协会会长，毕业后直通腾讯WXG团队，主导微信AI搜索排序模型优化。"
  },
  {
    name: "陈雨晴",
    batch: "2022",
    company: "清华大学计算机系 · 在读博士",
    desc: "连续三年绩点专业第一，手握多项科创国家特等奖，目前在清华深研院深耕可解释三维重构算法。"
  },
  {
    name: "黄天翔",
    batch: "2023",
    company: "数智云合科技 · 创始人 & CEO",
    desc: "大三期间依托学院国家级大创项目开启孵化，毕业即拿到数百万天使轮投资，服务多地政务大屏研发。"
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

/* 团学活动卡片 */
.activities-showcase {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.act-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
}

.act-img-placeholder {
  font-size: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(26, 92, 175, 0.06);
  color: var(--primary-color);
  border-right: 1px solid var(--border-color);
}

.act-info {
  padding: 24px 30px;
}

.act-info h4 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 8px;
}

.dark .act-info h4 {
  color: white;
}

.act-info p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 竞赛获奖表格 */
.awards-table-wrapper {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.awards-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.awards-table th, .awards-table td {
  padding: 18px 24px;
  font-size: 0.9rem;
}

.awards-table th {
  background-color: rgba(26, 92, 175, 0.04);
  color: var(--secondary-color);
  font-weight: 700;
  border-bottom: 2px solid var(--border-color);
}

.dark class .awards-table th {
  background-color: rgba(255, 255, 255, 0.03);
  color: white;
}

.awards-table td {
  border-bottom: 1px solid var(--border-color);
}

.awards-table tr:last-child td {
  border-bottom: none;
}

.awards-table .year {
  font-family: var(--font-data);
  font-weight: 700;
  color: var(--primary-color);
}

.dark .awards-table .year {
  color: var(--highlight-color);
}

.awards-table .event {
  font-weight: 600;
  color: var(--text-primary);
}

.awards-table .award {
  font-weight: 700;
}

.awards-table .award.gold { color: #EF4444; }
.awards-table .award.silver { color: var(--accent-color); }

/* 校友力量 */
.alumni-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.alumni-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 30px 24px;
  box-shadow: var(--shadow-sm);
  position: relative;
  transition: transform 0.3s;
}

.alumni-card:hover {
  transform: translateY(-4px);
}

.alumni-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(200, 168, 78, 0.1);
  color: var(--accent-color);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

.alumni-card h4 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 4px;
}

.dark .alumni-card h4 {
  color: white;
}

.alumni-company {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-color);
  display: block;
  margin-bottom: 12px;
}

.dark .alumni-company {
  color: var(--highlight-color);
}

.alumni-desc {
  font-size: 0.8rem;
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
  .act-card {
    grid-template-columns: 1fr;
  }
  .act-img-placeholder {
    height: 100px;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
  .alumni-grid {
    grid-template-columns: 1fr;
  }
}
</style>
