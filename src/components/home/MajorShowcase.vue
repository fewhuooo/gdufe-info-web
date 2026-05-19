<template>
  <section class="major-showcase-section" id="major-section">
    <div class="container">
      <h2 class="section-title">特色专业 <span>/ CORE MAJORS</span></h2>
      
      <div class="major-grid">
        <div 
          v-for="(major, idx) in majors" 
          :key="major.title" 
          class="major-card-wrapper"
        >
          <!-- 磨砂玻璃质感卡片 -->
          <div class="major-card" :class="'card-theme-' + idx">
            <!-- 背景光晕效果 -->
            <div class="card-glow"></div>
            
            <div class="card-header">
              <div class="icon-wrapper">
                <component :is="major.icon" :size="32" class="vector-icon" />
              </div>
              <span class="eng-label">{{ major.eng }}</span>
            </div>
            
            <div class="card-body">
              <h3>{{ major.title }}</h3>
              <p class="desc">{{ major.desc }}</p>
              
              <!-- 展开显示专业特色要点 -->
              <ul class="highlights">
                <li v-for="point in major.points" :key="point">
                  <span class="dot">•</span> {{ point }}
                </li>
              </ul>
            </div>
            
            <div class="card-footer">
              <a href="#" class="details-btn">
                <span>专业详情</span>
                <span class="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Cpu, BrainCircuit, Database, ShieldCheck } from "lucide-vue-next";

const majors = [
  { 
    icon: Cpu, 
    eng: "Computer Science",
    title: "计算机科学与技术", 
    desc: "广东省一流本科专业建设点。培养具备计算机软硬件协同设计、全栈软件开发与复杂工程问题求解能力的复合型高级技术人才。",
    points: ["卓越工程师培养计划", "计算机体系结构实验室", "软硬件协同实践"]
  },
  { 
    icon: BrainCircuit, 
    eng: "Artificial Intelligence",
    title: "人工智能", 
    desc: "学院核心特色前沿专业。致力于深度学习、自然语言处理、计算机视觉等前沿算法的创新研究与智能化行业系统落地。",
    points: ["智能算法研究中心", "大模型技术实践班", "产学研协同育人"]
  },
  { 
    icon: Database, 
    eng: "Big Data & Application",
    title: "大数据管理与应用", 
    desc: "交叉融合商科底蕴与工科技术。培养熟练掌握数据挖掘、数据分析决策与商业智能落地的高素质应用型数据科学家。",
    points: ["智能商业分析平台", "海量分布式数据计算", "数据挖掘与可视化"]
  },
  { 
    icon: ShieldCheck, 
    eng: "Information Security",
    title: "信息安全", 
    desc: "网络空间安全战略重点。面向企事业单位在数字化转型过程中的云安全、数据防泄露与密码学工程防护人才缺口。",
    points: ["网络攻防对抗平台", "数据脱敏与隐私保护", "区块链合规检测"]
  }
];
</script>

<style scoped>
.major-showcase-section {
  padding: 100px 0;
  background: linear-gradient(180deg, var(--bg-color) 0%, rgba(26, 92, 175, 0.03) 100%);
  position: relative;
  overflow: hidden;
}

/* 增加科技感网格背景线 */
.major-showcase-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(26, 92, 175, 0.05) 1.2px, transparent 1.2px);
  background-size: 32px 32px;
  pointer-events: none;
}

.section-title span {
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.major-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.major-card-wrapper {
  position: relative;
}

/* 玻璃卡片基础样式 */
.major-card {
  height: 100%;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

/* 暗色模式玻璃反射 */
.dark .major-card {
  background: rgba(13, 43, 78, 0.7);
  backdrop-filter: blur(12px);
  border-color: rgba(255, 255, 255, 0.05);
}

/* 背景呼吸光晕 */
.card-glow {
  position: absolute;
  top: -50px;
  left: -50px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: -1;
}

/* 4个主题色彩区分 */
.card-theme-0 .card-glow { background-color: var(--primary-color); }
.card-theme-1 .card-glow { background-color: var(--highlight-color); }
.card-theme-2 .card-glow { background-color: var(--accent-color); }
.card-theme-3 .card-glow { background-color: #EF4444; }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: rgba(26, 92, 175, 0.06);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;
}

.card-theme-1 .icon-wrapper { background-color: rgba(0, 174, 239, 0.06); color: var(--highlight-color); }
.card-theme-2 .icon-wrapper { background-color: rgba(200, 168, 78, 0.08); color: var(--accent-color); }
.card-theme-3 .icon-wrapper { background-color: rgba(239, 68, 68, 0.06); color: #EF4444; }

.vector-icon {
  transition: transform 0.4s;
}

.eng-label {
  font-family: var(--font-data);
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.card-body h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--secondary-color);
  margin-bottom: 12px;
}

.dark .card-body h3 {
  color: white;
}

.card-body .desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  min-height: 84px;
}

/* 专业特色要点展示 */
.highlights {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px dashed var(--border-color);
  padding-top: 16px;
  margin-bottom: 24px;
}

.highlights li {
  font-size: 0.8rem;
  color: var(--text-primary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.highlights .dot {
  color: var(--primary-color);
  font-weight: 900;
}

.card-theme-1 .dot { color: var(--highlight-color); }
.card-theme-2 .dot { color: var(--accent-color); }
.card-theme-3 .dot { color: #EF4444; }

/* 卡片脚部动作 */
.details-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--secondary-color);
  transition: all 0.3s;
}

.dark .details-btn {
  color: white;
}

.details-btn .arrow {
  transition: transform 0.3s;
}

/* 悬浮爆发动画 */
.major-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
  border-color: rgba(26, 92, 175, 0.15);
}

.dark .major-card:hover {
  background: rgba(13, 43, 78, 0.85);
  border-color: rgba(255, 255, 255, 0.15);
}

.major-card:hover .card-glow {
  opacity: 0.15;
}

.major-card:hover .icon-wrapper {
  transform: scale(1.05);
}

.card-theme-0:hover .icon-wrapper { background-color: var(--primary-color); color: white; }
.card-theme-1:hover .icon-wrapper { background-color: var(--highlight-color); color: white; }
.card-theme-2:hover .icon-wrapper { background-color: var(--accent-color); color: white; }
.card-theme-3:hover .icon-wrapper { background-color: #EF4444; color: white; }

.major-card:hover .vector-icon {
  transform: rotate(15deg);
}

.major-card:hover .details-btn {
  color: var(--primary-color);
}

.dark .major-card:hover .details-btn {
  color: var(--highlight-color);
}

.major-card:hover .details-btn .arrow {
  transform: translateX(4px);
}

@media (max-width: 1200px) {
  .major-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .major-grid {
    grid-template-columns: 1fr;
  }
}
</style>
