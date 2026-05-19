<template>
  <section class="event-showcase-section" id="event-section">
    <div class="container">
      <div class="event-grid">
        
        <!-- 左侧：赛事详情与交互报名面板 -->
        <div class="event-left-col">
          <!-- 赛事前缀标签 -->
          <div class="festival-tag">
            <span class="tag-glow"></span>
            <span class="tag-text">第26届 IT文化节 // 网页设计大赛</span>
          </div>

          <!-- 赛事主标题 -->
          <h2 class="event-main-title">
            <span class="academy-pre">大数据与人工智能学院</span>
            <span class="title-bold">网页设计大赛</span>
          </h2>

          <p class="event-desc">
            为学院官网建设征集兼具「权威感」、「美观度」与「实用性」的优秀网页设计方案。
            支持 AI 辅助设计与开发，积攒真实学术商业项目经历，优秀方案可作为学院官网重设计建设优化蓝本！
          </p>

          <!-- 智能联动双节点时间线 (根据当前时间2026.05.19完美契合) -->
          <div class="timeline-box">
            <div class="timeline-line"></div>
            
            <div class="timeline-node active">
              <div class="node-dot">
                <span class="pulse-ring"></span>
              </div>
              <div class="node-content">
                <span class="node-label">报名开启</span>
                <span class="node-date">5月19日 (今日)</span>
              </div>
            </div>

            <div class="timeline-node">
              <div class="node-dot"></div>
              <div class="node-content">
                <span class="node-label">作品截止</span>
                <span class="node-date">5月26日</span>
              </div>
            </div>
          </div>

          <!-- 参赛福利 3D 卡片 -->
          <div class="benefits-container">
            <div class="benefit-card">
              <div class="benefit-icon">🎖️</div>
              <span class="benefit-name">院级权威证书</span>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🎁</div>
              <span class="benefit-name">定制专属纪念品</span>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">💻</div>
              <span class="benefit-name">官方集中展示机会</span>
            </div>
          </div>

          <!-- 交互控制按钮 -->
          <div class="action-buttons-row">
            <button class="primary-reg-btn" @click="showModal = true">
              <span>立即扫码报名 / 进群</span>
              <svg class="qr-btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
          </div>
        </div>

        <!-- 右侧：高保真 3D 浮雕交互海报区 -->
        <div class="event-right-col">
          <div 
            class="poster-3d-wrapper"
            ref="posterCard"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
            :style="{ transform: transformStyle }"
            @click="showModal = true"
          >
            <!-- 水晶多维高光反光涂层 -->
            <div class="glare-layer" :style="glareStyle"></div>

            <!-- 主图 -->
            <img 
              src="/src/assets/images/it_culture_poster.png" 
              alt="学院官网设计大赛海报" 
              class="poster-image"
            />

            <!-- 浮动悬浮透视贴纸 -->
            <div class="poster-sticker">
              <span class="sticker-glow"></span>
              <span class="sticker-text">AI 辅助 ✅</span>
            </div>

            <!-- 四角微晶刻度线 -->
            <span class="corner-tick top-left"></span>
            <span class="corner-tick top-right"></span>
            <span class="corner-tick bottom-left"></span>
            <span class="corner-tick bottom-right"></span>
          </div>
        </div>

      </div>
    </div>

    <!-- 水晶毛玻璃扫码 Modal 弹窗 -->
    <transition name="modal-fade">
      <div v-if="showModal" class="glass-modal-overlay" @click.self="showModal = false">
        <div class="modal-card">
          <button class="close-modal-btn" @click="showModal = false">&times;</button>
          
          <h3 class="modal-title">扫码加入官方群</h3>
          <p class="modal-subtitle">群内提供模版领取、问题解答与参赛组队指导</p>

          <!-- 从海报高拟真截取的进群二维码展示区 -->
          <div class="qr-showcase-box">
            <div class="qr-scanner-line"></div>
            <!-- 使用海报自带二维码的视觉化替代 -->
            <div class="qr-image-placeholder">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="10" y="10" width="25" height="25" fill="currentColor" opacity="0.1" />
                <rect x="15" y="15" width="15" height="15" />
                <rect x="65" y="10" width="25" height="25" fill="currentColor" opacity="0.1" />
                <rect x="70" y="15" width="15" height="15" />
                <rect x="10" y="65" width="25" height="25" fill="currentColor" opacity="0.1" />
                <rect x="15" y="70" width="15" height="15" />
                <!-- 内部随机像素点阵 -->
                <path d="M45 15h5v5h-5zM55 10h10v5H55zM45 30h10v5H45zM30 45h15v5H30zM50 50h10v10H50zM65 45h5v5h-5zM60 65h10v5H60zM45 75h10v10H45zM75 75h5v5h-5z" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div class="modal-footer-tag">领取模版 / 查看要求 / 在线答疑</div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showModal = ref(false);
const posterCard = ref<HTMLElement | null>(null);

// 3D Parallax Tilt variables
const transformStyle = ref('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
const glareStyle = ref('opacity: 0');

const handleMouseMove = (e: MouseEvent) => {
  if (!posterCard.value) return;
  const rect = posterCard.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const xc = rect.width / 2;
  const yc = rect.height / 2;
  
  // 倾斜弧度比例
  const rotateX = -(y - yc) / 12;
  const rotateY = (x - xc) / 12;
  
  transformStyle.value = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;
  
  // 浮光炫彩折射
  const px = (x / rect.width) * 100;
  const py = (y / rect.height) * 100;
  glareStyle.value = `background: radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 80%); opacity: 1;`;
};

const handleMouseLeave = () => {
  transformStyle.value = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  glareStyle.value = 'opacity: 0; transition: all 0.5s ease;';
};
</script>

<style scoped>
.event-showcase-section {
  padding: 0;
  background-color: transparent;
  width: 100%;
}

.event-showcase-section .container {
  width: 96% !important;
  max-width: 1750px !important;
  margin: 0 auto;
  padding: 0;
}

.event-grid {
  display: grid;
  grid-template-columns: 1fr 1.05fr; /* 左右对称微晶分栏 */
  gap: 80px;
  width: 100%;
  align-items: center;
}

/* 左侧栏目内容 */
.event-left-col {
  display: flex;
  flex-direction: column;
}

/* IT文化节前缀微标签 */
.festival-tag {
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(123, 44, 191, 0.08);
  border: 1px solid rgba(123, 44, 191, 0.2);
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 20px;
  position: relative;
}

.tag-glow {
  width: 6px;
  height: 6px;
  background-color: var(--accent-color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-color);
}

.tag-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-color);
  letter-spacing: 0.5px;
}

/* 赛事主标题 */
.event-main-title {
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
}

.academy-pre {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.title-bold {
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--secondary-color);
  letter-spacing: 1px;
}

.dark .title-bold {
  color: white;
}

.event-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0 0 28px 0;
}

/* 双时间节点时间线 */
.timeline-box {
  display: flex;
  gap: 48px;
  margin-bottom: 32px;
  position: relative;
  padding-left: 8px;
}

.timeline-line {
  position: absolute;
  top: 15px;
  left: 20px;
  right: 180px;
  height: 2px;
  background-color: var(--border-color);
  z-index: 1;
}

.timeline-node {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  position: relative;
  z-index: 2;
}

.node-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--border-color);
  border: 3px solid var(--bg-card);
  margin-top: 8px;
  transition: all 0.3s;
}

.timeline-node.active .node-dot {
  background-color: var(--accent-color);
  border-color: #f4f3f9;
  transform: scale(1.2);
}

.pulse-ring {
  position: absolute;
  top: -1px;
  left: -1px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid var(--accent-color);
  animation: pulse-glow 1.8s infinite ease-in-out;
}

.node-content {
  display: flex;
  flex-direction: column;
}

.node-label {
  font-size: 0.82rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 2px;
}

.node-date {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--secondary-color);
}

.dark .node-date {
  color: white;
}

.timeline-node.active .node-date {
  color: var(--accent-color);
}

/* 福利卡片排版 */
.benefits-container {
  display: flex;
  gap: 16px;
  margin-bottom: 36px;
}

.benefit-card {
  flex: 1;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 16px;
  border-radius: var(--border-radius); /* 方正直角风格 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
}

.benefit-card:hover {
  transform: translateY(-3px);
  border-color: var(--accent-color);
  box-shadow: var(--shadow-md);
}

.benefit-icon {
  font-size: 1.6rem;
}

.benefit-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--secondary-color);
  text-align: center;
}

.dark .benefit-name {
  color: rgba(255, 255, 255, 0.9);
}

/* 扫码按钮 */
.primary-reg-btn {
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 16px 36px;
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: var(--border-radius); /* 极致方正 */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 14px rgba(123, 44, 191, 0.25);
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.primary-reg-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 20%;
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%);
  transform: skewX(-25deg);
  animation: shine-flow 4s infinite ease-in-out;
}

.primary-reg-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(123, 44, 191, 0.4);
  opacity: 0.95;
}

.qr-btn-svg {
  width: 20px;
  height: 20px;
}

/* 右侧高维 3D 悬浮海报区 */
.event-right-col {
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
}

.poster-3d-wrapper {
  position: relative;
  width: 380px; /* 大气海报跨度 */
  height: 520px;
  background-color: #0d1b2a;
  border-radius: var(--border-radius); /* 方正直角适配 */
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: box-shadow 0.15s, transform 0.15s ease-out;
  transform-style: preserve-3d;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 海报高光反光遮罩层 */
.glare-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

/* 浮动透视贴纸标签 */
.poster-sticker {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #7b2cbf 0%, #3c096c 100%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  padding: 4px 12px;
  font-size: 0.72rem;
  font-weight: 700;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transform: translateZ(30px); /* 突出卡片正面 30px 空隙，拉伸 3D 视差空间 */
  z-index: 3;
}

.sticker-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(123, 44, 191, 0.6);
  animation: pulse-glow 2s infinite;
}

/* 微晶刻度边角十字星 */
.corner-tick {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  z-index: 4;
}

.top-left { top: 12px; left: 12px; border-right: none; border-bottom: none; }
.top-right { top: 12px; right: 12px; border-left: none; border-bottom: none; }
.bottom-left { bottom: 12px; left: 12px; border-right: none; border-top: none; }
.bottom-right { bottom: 12px; right: 12px; border-left: none; border-top: none; }

/* 水晶磨砂毛玻璃弹窗 (Glassmorphic Modal) */
.glass-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(6, 21, 37, 0.6);
  backdrop-filter: blur(8px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-card {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  width: 380px;
  padding: 36px;
  box-sizing: border-box;
  border-radius: var(--border-radius); /* 方正直角 */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dark .modal-card {
  background-color: rgba(13, 43, 78, 0.85);
  border-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.close-modal-btn {
  position: absolute;
  top: 14px;
  right: 18px;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: var(--text-secondary);
  cursor: pointer;
}

.close-modal-btn:hover {
  color: var(--accent-color);
}

.modal-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin: 0 0 8px 0;
  text-align: center;
}

.dark .modal-title {
  color: white;
}

.modal-subtitle {
  font-size: 0.82rem;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.4;
  margin: 0 0 28px 0;
}

/* 进群二维码扫描仪动效 */
.qr-showcase-box {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: white;
  border: 2px solid var(--accent-color);
  padding: 16px;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 24px;
}

.qr-image-placeholder {
  width: 100%;
  height: 100%;
  color: var(--secondary-color);
}

.qr-scanner-line {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  height: 3px;
  background-color: var(--accent-color);
  box-shadow: 0 0 10px var(--accent-color);
  z-index: 2;
  animation: scan-up-down 3s infinite linear;
}

.modal-footer-tag {
  font-size: 0.85rem;
  color: var(--accent-color);
  font-weight: 700;
  letter-spacing: 0.5px;
  border-top: 1px dashed var(--border-color);
  width: 100%;
  padding-top: 14px;
  text-align: center;
}

/* Animations */
@keyframes pulse-glow {
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.3); opacity: 0; }
  100% { transform: scale(0.95); opacity: 0; }
}

@keyframes scan-up-down {
  0% { top: 12px; }
  50% { top: 185px; }
  100% { top: 12px; }
}

@keyframes shine-flow {
  0% { left: -50%; }
  30% { left: 150%; }
  100% { left: 150%; }
}

/* Modal Fade Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@media (max-width: 1024px) {
  .event-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .poster-3d-wrapper {
    width: 320px;
    height: 440px;
  }
}
</style>
