<template>
  <section class="faculty-showcase-section" id="faculty-section">
    <div class="container">
      <div class="showcase-header">
        <h2 class="section-title left-align">师资风采 <span>/ ACADEMIC FACULTY</span></h2>
        <div class="slider-controls">
          <button @click="slideLeft" class="control-btn" :disabled="currentIndex === 0" title="上一个">
            <ChevronLeft :size="20" />
          </button>
          <button @click="slideRight" class="control-btn" :disabled="currentIndex >= maxIndex" title="下一个">
            <ChevronRight :size="20" />
          </button>
        </div>
      </div>
      
      <!-- 轮播视口 -->
      <div class="carousel-viewport">
        <div 
          class="carousel-track" 
          :style="{ transform: `translateX(-${currentIndex * (300 + 24)}px)` }"
        >
          <div 
            v-for="teacher in teachers" 
            :key="teacher.name" 
            class="teacher-card"
          >
            <!-- 教师头像区域 -->
            <div class="avatar-area">
              <div class="avatar-glow"></div>
              <div class="avatar-img-placeholder">
                <UserRound :size="64" class="avatar-icon" />
              </div>
              <span class="honor-badge" v-if="teacher.honor">{{ teacher.honor }}</span>
            </div>
            
            <!-- 基础资料 -->
            <div class="teacher-info">
              <h3>{{ teacher.name }}</h3>
              <p class="title">{{ teacher.title }}</p>
              <p class="role">{{ teacher.role }}</p>
            </div>
            
            <!-- Hover滑出的详细面板 -->
            <div class="hover-details-panel">
              <h4>{{ teacher.name }}</h4>
              <span class="panel-title">{{ teacher.title }}</span>
              
              <div class="divider"></div>
              
              <div class="panel-section">
                <h5>研究方向：</h5>
                <p>{{ teacher.research }}</p>
              </div>
              
              <div class="panel-section">
                <h5>学术成果：</h5>
                <p class="papers">{{ teacher.achievement }}</p>
              </div>
              
              <div class="panel-footer">
                <a :href="'mailto:' + teacher.email" class="email-link">
                  <Mail :size="14" />
                  <span>{{ teacher.email }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部进度条指示点 -->
      <div class="carousel-indicators">
        <span 
          v-for="idx in maxIndex + 1" 
          :key="idx"
          :class="['indicator-dot', { active: currentIndex === idx - 1 }]"
          @click="currentIndex = idx - 1"
        ></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { ChevronLeft, ChevronRight, UserRound, Mail } from "lucide-vue-next";

const currentIndex = ref(0);

const teachers = [
  { 
    name: "李勋", 
    title: "院长 / 教授", 
    role: "博士生导师", 
    honor: "学术委员会委员",
    research: "深度学习、计算机视觉、可信AI、多模态大模型安全", 
    achievement: "主持国家自然科学基金重点项目2项，在CVPR、ICCV等顶会发表论文30余篇。",
    email: "xunli@gdufe.edu.cn" 
  },
  { 
    name: "张晓华", 
    title: "副院长 / 教授", 
    role: "博士生导师", 
    honor: "珠江学者特聘教授",
    research: "大数据挖掘、图神经网络、智能推荐系统", 
    achievement: "入选全球前2%顶尖科学家榜单，获省部级科技进步一等奖1项。",
    email: "xhzhang@gdufe.edu.cn" 
  },
  { 
    name: "陈志诚", 
    title: "系主任 / 副教授", 
    role: "硕士生导师", 
    honor: "卓越教学名师",
    research: "生成式人工智能、知识图谱、自然语言处理与信息检索", 
    achievement: "主编《大语言模型原理》教材，主持广东省重点研发专项项目1项。",
    email: "zcchen@gdufe.edu.cn" 
  },
  { 
    name: "赵敏仪", 
    title: "青年学者 / 讲师", 
    role: "博士", 
    honor: "优秀班主任",
    research: "分布式数据库系统、流式数据计算、边缘智能", 
    achievement: "主持国家青年科学基金1项，在SIGMOD、VLDB发表高水平论文3篇。",
    email: "myzhao@gdufe.edu.cn" 
  },
  { 
    name: "孙德胜", 
    title: "学科带头人 / 教授", 
    role: "博士生导师", 
    honor: "千百十工程培养对象",
    research: "网络空间安全、密码学、区块链技术与隐私保护", 
    achievement: "授权发明专利15项，主持国家级重大专项子课题及省部级项目5项。",
    email: "dssun@gdufe.edu.cn" 
  }
];

// 计算最大滑动步数 (假设宽屏每次滑1格，总共5个，单格宽300px + 24px gap)
const maxIndex = computed(() => {
  return Math.max(0, teachers.length - 3); // 默认在大屏展示3格，所以最大步长为5-3=2
});

const slideLeft = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const slideRight = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++;
  }
};

// 响应式屏幕步长调整
const handleResize = () => {
  if (window.innerWidth <= 600) {
    currentIndex.value = Math.min(currentIndex.value, teachers.length - 1);
  } else if (window.innerWidth <= 1024) {
    currentIndex.value = Math.min(currentIndex.value, teachers.length - 2);
  } else {
    currentIndex.value = Math.min(currentIndex.value, teachers.length - 3);
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.faculty-showcase-section {
  padding: 100px 0;
  background-color: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  position: relative;
}

.dark .faculty-showcase-section {
  background-color: #061525;
}

.showcase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.showcase-header .section-title {
  margin-bottom: 0;
  text-align: left;
}

.showcase-header .section-title::after {
  margin: 0.8rem 0 0 0;
}

.showcase-header .section-title span {
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 滑动控制器 */
.slider-controls {
  display: flex;
  gap: 12px;
}

.control-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  color: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: var(--shadow-sm);
}

.dark .control-btn {
  background-color: var(--bg-card);
  color: white;
  border-color: rgba(255, 255, 255, 0.1);
}

.control-btn:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: scale(1.05);
}

.control-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* 轮播视口与滚动轨道 */
.carousel-viewport {
  overflow: hidden;
  padding: 15px 4px;
  width: 100%;
}

.carousel-track {
  display: flex;
  gap: 24px;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  width: max-content;
}

/* 教师卡片样式 */
.teacher-card {
  width: 300px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 36px 24px;
  text-align: center;
  position: relative;
  transition: all 0.3s;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.dark .teacher-card {
  background-color: var(--bg-card);
}

.teacher-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
  border-color: rgba(26, 92, 175, 0.2);
}

/* 头像区域 */
.avatar-area {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
}

.avatar-img-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d2b4e 0%, #1a5caf 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(13, 43, 78, 0.15);
}

.avatar-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--primary-color);
  opacity: 0.1;
  filter: blur(10px);
  transition: transform 0.4s;
  z-index: 1;
}

.teacher-card:hover .avatar-glow {
  transform: scale(1.2);
  opacity: 0.2;
}

.honor-badge {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--accent-color);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  z-index: 3;
  box-shadow: var(--shadow-sm);
  white-space: nowrap;
}

/* 基本资料描述 */
.teacher-info h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 6px;
}

.dark .teacher-info h3 {
  color: white;
}

.teacher-info .title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.dark .teacher-info .title {
  color: var(--highlight-color);
}

.teacher-info .role {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* Hover滑出面板 */
.hover-details-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(13, 43, 78, 0.96);
  backdrop-filter: blur(15px);
  padding: 32px 24px;
  color: white;
  display: flex;
  flex-direction: column;
  text-align: left;
  z-index: 10;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.teacher-card:hover .hover-details-panel {
  transform: translateY(0);
}

.hover-details-panel h4 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.panel-title {
  font-size: 0.85rem;
  color: var(--accent-color);
  font-weight: 600;
  letter-spacing: 1px;
}

.divider {
  width: 30px;
  height: 2px;
  background-color: var(--accent-color);
  margin: 14px 0;
}

.panel-section {
  margin-bottom: 14px;
}

.panel-section h5 {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
  font-weight: 600;
}

.panel-section p {
  font-size: 0.825rem;
  line-height: 1.5;
  opacity: 0.95;
}

.panel-section p.papers {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.panel-footer {
  margin-top: auto;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 12px;
}

.email-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s;
}

.email-link:hover {
  color: var(--accent-color);
}

/* 进度条指示点 */
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(13, 43, 78, 0.15);
  cursor: pointer;
  transition: all 0.3s;
}

.dark .indicator-dot {
  background-color: rgba(255, 255, 255, 0.2);
}

.indicator-dot.active {
  width: 24px;
  border-radius: 4px;
  background-color: var(--primary-color);
}

.dark .indicator-dot.active {
  background-color: var(--highlight-color);
}

@media (max-width: 1024px) {
  .carousel-viewport {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
