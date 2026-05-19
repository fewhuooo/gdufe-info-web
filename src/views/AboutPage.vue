<template>
  <div class="sub-page about-page">
    <!-- 头部横幅 Banner -->
    <div class="sub-banner">
      <div class="container banner-inner">
        <div class="banner-left">
          <h1 class="banner-title">学院概况 <span>/ ABOUT US</span></h1>
          <p class="banner-desc">理工固本 · 财经铸魂</p>
        </div>
        <div class="banner-right">
          <div class="breadcrumb">
            <router-link to="/">首页</router-link> <span>/</span> <span class="active">学院概况</span>
          </div>
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
              广东财经大学大数据与人工智能学院（原信息学院）始于1992年成立的计算中心，历经经济信息管理系（1997年）、信息学院（2000年）等发展阶段，于2025年6月正式更名升级。
            </p>
            <p>
              学院以"理工固本，财经铸魂，求学院内涵发展之经，谋学科跨越发展之道"为发展理念，紧密围绕国家大数据与人工智能战略，设有计算机科学与技术、软件工程、人工智能、大数据管理与应用、电子商务5个本科专业。其中，电子商务专业入选国家首批一流本科专业建设点（广东省首批唯一）。
            </p>
          </div>
        </section>

        <!-- 学科建设 Section -->
        <section id="discipline" class="info-section scroll-anchor">
          <h3 class="pane-section-title">学科建设</h3>
          <div class="intro-box">
            <p>
              学院构建"五位一体"的学科建设新模式，交叉特色鲜明。拥有"数字经济"博士学位授权点，为高层次人才培养提供了坚实支撑。设有"智能科学与技术"（全国财经类院校唯一、广东省首批）和"管理科学与工程"2个一级学科硕士学位授权点，"技术经济及管理"二级学科硕士学位授权点，以及计算机技术、图书情报（广东省唯二）2个专业硕士学位授权点，构建了以"新工科+新商科"深度融合为特色的育人体系。
            </p>
          </div>
          <div class="degree-grid">
            <div class="degree-card">
              <div class="degree-icon">🏛️</div>
              <h4>博士学位授权点</h4>
              <p>"数字经济"博士学位授权点</p>
            </div>
            <div class="degree-card">
              <div class="degree-icon">🎓</div>
              <h4>一级学科硕士点</h4>
              <p>"智能科学与技术"（全国财经类院校唯一、广东省首批）<br>"管理科学与工程"</p>
            </div>
            <div class="degree-card">
              <div class="degree-icon">📘</div>
              <h4>二级学科硕士点</h4>
              <p>"技术经济及管理"</p>
            </div>
            <div class="degree-card">
              <div class="degree-icon">📋</div>
              <h4>专业硕士学位点</h4>
              <p>计算机技术<br>图书情报（广东省唯二）</p>
            </div>
          </div>
        </section>

        <!-- 科研平台 Section -->
        <section id="platform" class="info-section scroll-anchor">
          <h3 class="pane-section-title">科研平台</h3>
          <div class="intro-box">
            <p>
              学院科研与教学平台实力雄厚。拥有广东省智能商务工程研究中心（学校"首个"省级工程技术研究中心，2018年获批）、广东省数字经济协同创新重点实验室（2024年7月获批）、人工智能与数字经济产业学院（省级）等核心省级平台，以及教育部电子商务虚拟教研室（2023年11月获批）。
            </p>
            <p>
              课程建设成果显著，《互联网+思维与技术》《可视化移动编程》两门课程入选教育部国家智慧教育平台首批优质课程；获批教育部"智能制造领域中外人文交流人才培养基地"重点项目；累计建成国家级及省级精品课程、在线开放课程9门，获批省级质量工程项目14项。
            </p>
          </div>
        </section>

        <!-- 师资队伍 Section -->
        <section id="faculty" class="info-section scroll-anchor">
          <h3 class="pane-section-title">师资队伍</h3>
          <div class="intro-box">
            <p>
              学院努力打造一支结构优化，厚德博学，精干高效，富有创新精神和国际视野的创新型师资队伍。现有教职工89人，其中专任教师71人。专任教师中具有高级职称比例高，拥有博士学位教师占比78%，具有海外访学经历教师占比达33.8%。拥有博士生导师2人、硕士生导师31人，"双师双能型"教师26人。
            </p>
            <p>
              高层次人才云集，包括吉林省"长白山学者"特聘教授1人、广东省"千百十人才工程"培养对象11人、南粤优秀教师1人。学院构建了由教育部教指委委员领衔、校内外实践导师协同参与的多元指导体系，全方位保障人才培养质量。
            </p>
          </div>
          <div class="stat-grid">
            <div class="stat-card">
              <span class="stat-number">89</span>
              <span class="stat-unit">人</span>
              <span class="stat-label">教职工</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">71</span>
              <span class="stat-unit">人</span>
              <span class="stat-label">专任教师</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">78</span>
              <span class="stat-unit">%</span>
              <span class="stat-label">博士学位教师占比</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">33.8</span>
              <span class="stat-unit">%</span>
              <span class="stat-label">海外访学经历教师占比</span>
            </div>
          </div>
        </section>

        <!-- 科研成果 Section -->
        <section id="research" class="info-section scroll-anchor">
          <h3 class="pane-section-title">科研成果</h3>
          <div class="intro-box">
            <p>
              学院科研成果丰硕，服务社会成效突出。近年来，教师承担国家及省部级科研项目142项，其中国家自然科学基金等纵向项目重大专项48项；创新性开展教育部产学研合作项目17项。发表学术论文1071篇，其中SCI二区以上论文占比高达86%；获国家授权发明专利9项。科研成果获评广东省计算机学会优秀论文奖、高等教育教学成果奖等省部级奖励5项；4项决策咨询报告获佛山市委政研室等官方机构采纳，彰显智库贡献。
            </p>
          </div>
          <div class="stat-grid">
            <div class="stat-card">
              <span class="stat-number">142</span>
              <span class="stat-unit">项</span>
              <span class="stat-label">国家及省部级科研项目</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">1071</span>
              <span class="stat-unit">篇</span>
              <span class="stat-label">发表学术论文</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">86</span>
              <span class="stat-unit">%</span>
              <span class="stat-label">SCI二区以上论文占比</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">9</span>
              <span class="stat-unit">项</span>
              <span class="stat-label">国家授权发明专利</span>
            </div>
          </div>
        </section>

        <!-- 人才培养 Section -->
        <section id="talent" class="info-section scroll-anchor">
          <h3 class="pane-section-title">人才培养</h3>
          <div class="intro-box">
            <p>
              学院人才培养质量优异，国际化特色鲜明。毕业生深受社会欢迎，就职于腾讯、华为、字节跳动等世界五百强企业，以及中国人民银行、工商银行等金融机构、广东广播电视台、药品监督管理局等政府机关或大型企事业单位，研究生就业率持续保持100%。部分毕业生考入国内外知名高校攻读博士学位。
            </p>
            <p>
              学生在中国大学生程序设计竞赛（国家级特等奖）、蓝桥杯全国总决赛（一等奖）、中国教育机器人大赛（国家级一等奖）等高水平学科竞赛中屡获殊荣，累计获国家级奖项51项、省级奖项282项，并在高水平国际期刊（中科院一、二区）发表多篇学术论文。
            </p>
            <p>
              学院与悉尼科技大学（2025年QS世界排名第88位，2023软科计算机科学与技术专业世界第17位、全澳第1）合作建立"3+2"本硕连读菁英班，着力培养具有全球竞争力的智能技术高层次人才。
            </p>
          </div>
          <div class="stat-grid">
            <div class="stat-card">
              <span class="stat-number">100</span>
              <span class="stat-unit">%</span>
              <span class="stat-label">研究生就业率</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">51</span>
              <span class="stat-unit">项</span>
              <span class="stat-label">国家级竞赛奖项</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">282</span>
              <span class="stat-unit">项</span>
              <span class="stat-label">省级竞赛奖项</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">3+2</span>
              <span class="stat-unit"></span>
              <span class="stat-label">本硕连读菁英班</span>
            </div>
          </div>
        </section>

        <!-- 领导班子 Section -->
        <section id="leadership" class="info-section scroll-anchor">
          <h3 class="pane-section-title">领导班子</h3>
          <div class="leader-grid">
            <div v-for="leader in leadership" :key="leader.name" class="leader-card">
              <div class="leader-avatar">
                <span class="avatar-text">{{ leader.name.slice(-2) }}</span>
              </div>
              <div class="leader-body">
                <div class="leader-header">
                  <h4>{{ leader.name }}</h4>
                  <span class="leader-role">{{ leader.role }}</span>
                </div>
                <p class="leader-duty">{{ leader.duty }}</p>
                <div class="leader-detail">
                  <p>{{ leader.background }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 数据来源说明 -->
        <div class="data-note">
          （数据统计截止：2025年8月7日）
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const activeSection = ref("intro");

const subMenus = [
  { id: "intro", label: "学院简介" },
  { id: "discipline", label: "学科建设" },
  { id: "platform", label: "科研平台" },
  { id: "faculty", label: "师资队伍" },
  { id: "research", label: "科研成果" },
  { id: "talent", label: "人才培养" },
  { id: "leadership", label: "领导班子" }
];

const leadership = [
  {
    name: "王丽敏",
    role: "院长 / 教授、博士生导师",
    duty: "负责学院行政全面工作、学科建设。",
    background: `吉林省"长白山学者"特聘教授，吉林省"拔尖创新人才"，吉林省高校"新世纪科学技术优秀人才"。国家首批"一流本科专业"电子商务负责人。2007年毕业于吉林大学计算机应用技术专业，获得工学博士学位。主要研究方向为人工智能、大数据分析、商务智能与优化管理。发表学术论文116篇，出版学术专著4部，主持国家级及省部级项目46项，荣获"全国商业科技进步奖"等奖项32项。曾赴悉尼大学、悉尼科技大学、多伦多大学、麦克马斯特大学、特拉华州立大学等国外高校做访问学者和国际交流与合作。`
  },
  {
    name: "廖凌杰",
    role: "党委书记",
    duty: "负责学院党委全面工作，负责本单位法制工作。",
    background: "中共党员，汉族，本科毕业于广东财经大学（原广东商学院）信息学院信息管理专业，硕士研究生毕业于中山大学公共管理专业（MPA）。历任信息学院政治辅导员，党委学生工作部就业指导中心科员及副主任科员、学生管理科副科长及科长，校工会综合岗负责人，校工会专职副主席。"
  },
  {
    name: "龙启艳",
    role: "党委副书记",
    duty: "分管学生工作。",
    background: "中共党员，汉族，硕士研究生，毕业于南京师范大学对外汉语专业。历任外国语学院学科秘书、研究生辅导员、办公室主任。参与教育部人文社科项目、主持广东财经大学研究生教育改革项目等研究，曾公开发表论文多篇；曾获广东省高校学生资助先进工作者。"
  },
  {
    name: "胡建军",
    role: "副院长 / 博士、副教授",
    duty: "分管本科教学、实验室、办学国际化建设等工作。",
    background: `民主建国会会员，2006年博士毕业于四川大学计算机学院数据库与知识工程研究所，2009年在华南理工大学计算机学院智能计算实验室完成博士后研究工作。主要从事大数据分析及应用、智能信息处理、智能算法设计等方向的研究与教学工作。在国内外重要期刊和国际会议发表论文十余篇，其中5篇被SCI、EI检索，主持或参与国家级及省部级基金多项，获省级科技进步奖1项，市科技进步奖1项。广东省"千百十"人才校级培养对象。`
  },
  {
    name: "胡苏",
    role: "副院长 / 博士、副教授",
    duty: "分管科研、研究生教育、附属科研平台等工作。",
    background: "中共党员，管理科学与工程及计算机技术硕士生导师。广东省计算机学会大数据专委会委员，广东省电子商务协会专委会委员。2015年博士毕业于中山大学计算机软件理论专业。研究方向为知识图谱、深度学习、智能优化理论及其在供应链管理应用研究。博士毕业后曾在华为技术有限公司工作4年，任大数据分析团队负责人、大数据科学家。主持与参与国家级及省部级项目三十余项，在SCI一区等期刊、权威国际会议发表高水平论文三十余篇。"
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
  opacity: 0.95;
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
  color: #fff;
  text-shadow: -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3), 1px 1px 0 rgba(0,0,0,0.3);
}

.breadcrumb a {
  color: #ffffff;
  transition: opacity 0.3s;
}

.breadcrumb a:hover {
  opacity: 1;
  text-decoration: underline;
}

.breadcrumb span.active {
  color: #ffffff;
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

/* 学科建设 - 学位卡片 */
.degree-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 24px;
}

.degree-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s, box-shadow 0.3s;
}

.degree-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.degree-icon {
  font-size: 1.8rem;
  margin-bottom: 12px;
}

.degree-card h4 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 8px;
}

.degree-card p {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
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

/* 数据来源说明 */
.data-note {
  text-align: center;
  font-size: 0.82rem;
  color: var(--text-secondary);
  padding: 20px 0 40px;
  opacity: 0.7;
}

/* 领导班子 */
.leader-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.leader-card {
  display: flex;
  gap: 24px;
  padding: 28px;
  background-color: var(--bg-card);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  align-items: flex-start;
  transition: transform 0.3s, box-shadow 0.3s;
}

.leader-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.leader-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d2b4e 0%, #1a5caf 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-text {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 800;
  color: white;
  letter-spacing: 2px;
}

.leader-body {
  flex: 1;
  min-width: 0;
}

.leader-header {
  display: inline;
  gap: 12px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.leader-header h4 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--secondary-color);
}

.leader-role {
  font-size: 0.88rem;
  color: var(--primary-color);
  font-weight: 600;
}

.leader-duty {
  font-size: 0.88rem;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 12px;
  padding: 6px 12px;
  background: rgba(26, 92, 175, 0.06);
  border-radius: var(--border-radius);
  display: inline-block;
}

.leader-detail p {
  font-size: 0.88rem;
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
  .degree-grid {
    grid-template-columns: 1fr;
  }
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .leader-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .leader-header {
    justify-content: center;
  }
  .leader-duty {
    display: block;
    text-align: center;
  }
}
</style>
