<template>
  <section class="hero-section">
    <!-- 主页大背景图卡槽 (支持后面直接上传替换) -->
    <div class="banner-image-background"></div>
    <div class="dark-gradient-overlay"></div>

    <div class="hero-container container">
      <!-- 极简高雅学术大标题 -->
      <div class="hero-banner-content scroll-reveal">
        <h1 class="banner-title">大数据与人工智能学院</h1>
        <h2 class="banner-subtitle">School of Big Data & Artificial Intelligence</h2>
        <div class="accent-line"></div>
        <p class="banner-intro">数据驱动智能 · 创新引领未来</p>
        
        <!-- 辅助操作按钮 -->
        <div class="banner-actions">
          <router-link to="/about" class="btn btn-primary btn-lg">了解学院</router-link>
          <router-link to="/admission" class="btn btn-outline btn-lg">招生简章</router-link>
        </div>
      </div>
    </div>

    <!-- 底部滚动提醒 -->
    <div class="scroll-mouse-hint">
      <span class="hint-text">SCROLL DOWN</span>
      <div class="mouse-shape">
        <span class="mouse-wheel"></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 精简版首页大图 Banner
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 650px;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: white;
}

/* 主 Banner 图片背景，备用为学术蓝深邃网格渐变，方便后续用户直接上传图片 */
.banner-image-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/佛山校区.jpg');
  background-size: cover;
  background-position: center;
  z-index: 1;
}

/* 暗色渐变遮罩，确保任何上传的图片上方的白字均能高对比度清晰显示 */
.dark-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.8) 0%, 
    rgba(0, 0, 0, 0.4) 50%, 
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: 2;
}

.hero-container {
  position: relative;
  z-index: 3;
  width: 100%;
  padding: 0 40px;
  display: flex;
  justify-content: flex-start;
}

/* 极简学术排版 */
.hero-banner-content {
  max-width: 800px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.banner-title {
  font-family: var(--font-heading);
  font-size: 3.8rem;
  font-weight: 800;
  letter-spacing: 4px;
  margin: 0;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
}

.banner-subtitle {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 2px;
  margin: 0;
  opacity: 0.9;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  line-height: 1.2;
}

.accent-line {
  width: 80px;
  height: 4px;
  background-color: var(--highlight-color);
  border-radius: 2px;
  margin-top: 8px;
  box-shadow: 0 0 10px var(--highlight-color);
}

.banner-intro {
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 6px;
  opacity: 0.85;
  margin: 12px 0 20px 0;
}

.banner-actions {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.btn-lg {
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(26, 92, 175, 0.4);
}

.btn-outline {
  background: none;
  border: 1px solid white;
  color: white;
}

.btn-outline:hover {
  background-color: white;
  color: #0b1535;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

/* 底部鼠标提醒 */
.scroll-mouse-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 5;
  opacity: 0.7;
}

.hint-text {
  font-size: 0.7rem;
  letter-spacing: 3px;
  font-weight: 700;
}

.mouse-shape {
  width: 22px;
  height: 36px;
  border: 2px solid white;
  border-radius: 11px;
  position: relative;
}

.mouse-wheel {
  width: 4px;
  height: 8px;
  background-color: white;
  border-radius: 2px;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll-wheel-anim 1.5s infinite;
}

@keyframes scroll-wheel-anim {
  0% { transform: translate(-50%, 0); opacity: 1; }
  100% { transform: translate(-50%, 12px); opacity: 0; }
}

@media (max-width: 1024px) {
  .hero-container {
    padding: 0 20px;
    justify-content: center;
  }
  .hero-banner-content {
    text-align: center;
    align-items: center;
  }
  .banner-title {
    font-size: 2.6rem;
  }
  .banner-subtitle {
    font-size: 1.2rem;
  }
  .banner-intro {
    font-size: 1rem;
    letter-spacing: 3px;
  }
  .banner-actions {
    justify-content: center;
  }
}
</style>