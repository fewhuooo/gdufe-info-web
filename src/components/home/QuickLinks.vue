<template>
  <section class="quick-links-section" id="links-section">
    <div class="container grid-layout">
      <!-- 左侧：校园风光/视觉展示 -->
      <div class="campus-gallery-wrapper">
        <h3 class="subsection-title">校园光影 <span>/ CAMPUS SCENERY</span></h3>
        <div class="gallery-grid">
          <div class="gallery-item large">
            <div class="image-placeholder gradient-1"></div>
            <div class="gallery-info">
              <h4>第一教学楼</h4>
              <p>学院主要教学与研究场所</p>
            </div>
          </div>
          <div class="gallery-item">
            <div class="image-placeholder gradient-2"></div>
            <div class="gallery-info">
              <h4>人工智能实验室</h4>
              <p>前沿算法与计算中心</p>
            </div>
          </div>
          <div class="gallery-item">
            <div class="image-placeholder gradient-3"></div>
            <div class="gallery-info">
              <h4>逸夫图书馆</h4>
              <p>学术殿堂与知识宝库</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：快捷入口 -->
      <div class="quick-actions-wrapper">
        <h3 class="subsection-title">快捷入口 <span>/ QUICK LINKS</span></h3>
        <div class="links-grid">
          <a v-for="link in links" :key="link.title" :href="link.url" class="link-card" target="_blank">
            <div class="icon-box">
              <component :is="link.icon" :size="24" />
            </div>
            <div class="link-info">
              <h4>{{ link.title }}</h4>
              <p>{{ link.desc }}</p>
            </div>
            <div class="arrow-indicator">→</div>
          </a>
        </div>
        
        <div class="action-footer">
          <a href="#" class="special-btn mailbox">
            <Mail :size="18" />
            <span>院长信箱</span>
          </a>
          <a href="#" class="special-btn recruit">
            <Briefcase :size="18" />
            <span>人才招聘</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { 
  BookOpen, 
  School, 
  FileCheck, 
  Atom, 
  GraduationCap, 
  Globe,
  Mail,
  Briefcase
} from "lucide-vue-next";

const links = [
  { icon: School, title: "学校主页", desc: "广东财经大学官方网站", url: "https://www.gdufe.edu.cn/" },
  { icon: FileCheck, title: "教务处", desc: "教学管理与选课系统门户", url: "#" },
  { icon: Atom, title: "科研处", desc: "科研项目申报与学术管理", url: "#" },
  { icon: BookOpen, title: "图书馆", desc: "图书检索与电子学术资源", url: "#" },
  { icon: GraduationCap, title: "研究生处", desc: "研究生招生与培养管理", url: "#" },
  { icon: Globe, title: "信息门户", desc: "校内综合信息服务平台", url: "#" }
];
</script>

<style scoped>
.quick-links-section {
  padding: 80px 0;
  background-color: var(--bg-color);
  position: relative;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
}

.subsection-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 24px;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.subsection-title span {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 左侧画廊样式 */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 180px);
  gap: 16px;
}

.gallery-item {
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}

.gallery-item.large {
  grid-row: span 2;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.gradient-1 {
  background: linear-gradient(135deg, #0d2b4e 0%, #1a5caf 100%);
}

.gradient-2 {
  background: linear-gradient(135deg, #1a5caf 0%, #00aeef 100%);
}

.gradient-3 {
  background: linear-gradient(135deg, #0d2b4e 0%, #c8a84e 100%);
}

.gallery-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(13, 43, 78, 0.9) 0%, rgba(13, 43, 78, 0) 100%);
  color: white;
  z-index: 2;
  transition: transform 0.3s;
}

.gallery-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.gallery-info p {
  font-size: 0.8rem;
  opacity: 0.8;
}

.gallery-item:hover .image-placeholder {
  transform: scale(1.08);
}

/* 右侧链接卡片样式 */
.links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.link-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: var(--bg-card);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.link-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--primary-color);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: rgba(26, 92, 175, 0.06);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.link-info {
  flex-grow: 1;
}

.link-info h4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 2px;
}

.link-info p {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.arrow-indicator {
  font-size: 1.1rem;
  color: var(--text-secondary);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.link-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: rgba(26, 92, 175, 0.2);
}

.link-card:hover::before {
  transform: scaleY(1);
}

.link-card:hover .icon-box {
  background-color: var(--primary-color);
  color: white;
}

.link-card:hover .arrow-indicator {
  opacity: 1;
  transform: translateX(0);
  color: var(--primary-color);
}

/* 特色按钮区 */
.action-footer {
  display: flex;
  gap: 16px;
}

.special-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  border-radius: var(--border-radius-lg);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.special-btn.mailbox {
  background-color: var(--secondary-color);
  color: white;
}

.special-btn.mailbox:hover {
  background-color: #153e6b;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.special-btn.recruit {
  background-color: rgba(200, 168, 78, 0.1);
  color: var(--accent-color);
  border: 1px solid rgba(200, 168, 78, 0.3);
}

.special-btn.recruit:hover {
  background-color: var(--accent-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

@media (max-width: 1024px) {
  .quick-links-section {
    padding: 40px 0;
  }
  .grid-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .subsection-title {
    margin-bottom: 16px;
    font-size: 1.2rem;
  }
  
  /* 画廊改为上1下2的两排布局 */
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 120px 120px;
    gap: 12px;
  }
  .gallery-item.large {
    grid-column: span 2;
    grid-row: span 1;
  }
  .gallery-info {
    padding: 12px;
  }
  .gallery-info h4 {
    font-size: 0.95rem;
  }
  
  /* 快捷入口强制两排/两列布局 */
  .links-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }
  .link-card {
    padding: 10px;
  }
  .icon-box {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
  .icon-box svg {
    width: 18px;
    height: 18px;
  }
  .link-info h4 {
    font-size: 0.85rem;
  }
  .link-info p {
    display: none; /* 移动端隐藏描述以节省空间 */
  }
  
  /* 底部按钮保持同行两列 */
  .action-footer {
    flex-direction: row;
    gap: 12px;
  }
  .special-btn {
    padding: 12px;
    font-size: 0.85rem;
  }
}
</style>
