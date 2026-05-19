<template>
  <header :class="['app-header', { scrolled: isScrolled || route.path !== '/' }]">
    <div class="container header-grid">
      <!-- 左侧：双圆形徽章与校名学院名 -->
      <router-link to="/" class="logo-area">
        <div class="double-emblem-wrap">
          <!-- 广财大圆形徽章 -->
          <img class="gdufe-seal-img" src="@/assets/images/校徽.svg" alt="广东财经大学校徽" />
          <!-- 学院六边形现代徽章 -->
          <img class="college-logo-img" src="@/assets/images/院徽.png" alt="大数据与人工智能学院院徽" />
        </div>
        
        <div class="logo-text">
          <div class="logo-main-row">
            <img class="univ-name-img" src="@/assets/images/newlogo.png" alt="广东财经大学" />
          </div>
        </div>
      </router-link>

      <!-- 右侧导航控制栏 -->
      <div class="right-navigation-block">
        <!-- 顶部辅助行 (主题、搜索等) -->
        <div class="top-helper-row">
          <div class="helper-links">
            <a href="#" class="helper-link hide-mobile">
              <MessageCircle :size="12" class="helper-icon" />
              <span>微信公众号</span>
            </a>
            <span class="divider hide-mobile">|</span>
            <a href="#" class="helper-link lang-btn hide-mobile">EN</a>
            <span class="divider hide-mobile">|</span>
            <!-- 搜索按钮 -->
            <button class="helper-btn search-btn" @click="showSearch = true" title="全局搜索">
              <Search :size="14" />
            </button>
          </div>
        </div>

        <!-- 下部主导航行 (完全还原清华 AI 顶栏双轨共存模式：文字链接 + 悬浮小下拉) -->
        <div class="main-nav-row">
          <nav class="main-nav">
            <ul>
              <li 
                v-for="item in navItems" 
                :key="item.name"
                class="nav-item-with-dropdown"
                @mouseenter="openMegaMenu(item)"
                @mouseleave="closeMegaMenu"
              >
                <router-link :to="item.path" class="nav-link">
                  <span>{{ item.name }}</span>
                  <ChevronDown v-if="item.subMenu" :size="12" class="arrow-down" />
                </router-link>
              </li>
            </ul>
          </nav>
          
          <!-- 极简高雅清华风格汉堡按钮 (自定义动效，三横线转X) -->
          <button 
            class="hamburger-btn" 
            :class="{ active: isHamburgerOpen }" 
            @click="isHamburgerOpen = !isHamburgerOpen" 
            :title="isHamburgerOpen ? '关闭菜单' : '打开完整导航'"
          >
            <div class="hamburger-inner">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- 全局全屏搜索覆盖层 -->
    <transition name="fade">
      <div v-if="showSearch" class="search-overlay">
        <button class="close-search" @click="showSearch = false">
          <X :size="32" />
        </button>
        <div class="search-modal-content">
          <div class="search-input-wrapper">
            <Search :size="24" class="search-modal-icon" />
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="请输入搜索关键词，如：培养方案、张教授、研究生招生..." 
              @keyup.enter="handleSearch"
              ref="searchInput"
            />
          </div>
          
          <div class="search-hot-keys">
            <span>热门搜索：</span>
            <button v-for="tag in hotTags" :key="tag" @click="searchTag(tag)">
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 全屏极简全站导航大菜单 (Full Screen Navigation Overlay) -->
    <transition name="overlay-fade">
      <div v-if="isHamburgerOpen" class="full-screen-menu">
        <div class="menu-bg"></div>
        
        <div class="menu-container">
          <div class="menu-header">
            <div class="menu-brand">
              <span class="univ-name-l">广东财经大学</span>
              <span class="dept-name-l">大数据与人工智能学院</span>
            </div>
          </div>
          
          <div class="menu-content">
            <div class="menu-split-layout">
              <!-- 左侧：大字号主导航列表 -->
              <div class="menu-left-nav">
                <nav class="full-nav-list">
                  <div 
                    v-for="(item, index) in navItems" 
                    :key="item.name" 
                    class="full-nav-item"
                    :class="{ active: hoveredItemIndex === index }"
                    @mouseenter="hoveredItemIndex = index"
                  >
                    <router-link :to="item.path" class="full-nav-link" @click="isHamburgerOpen = false">
                      <span class="item-index">0{{ index + 1 }}</span>
                      <span class="item-name">{{ item.name }}</span>
                      <div class="active-indicator"></div>
                    </router-link>
                  </div>
                </nav>
              </div>

              <!-- 右侧：当前选中分类的详细详情 (Intro + Sub-links) -->
              <div class="menu-right-details">
                <transition name="detail-fade" mode="out-in">
                  <div :key="hoveredItemIndex" class="detail-panel">
                    <div class="detail-info">
                      <h2 class="detail-title">{{ navItems[hoveredItemIndex].name }}</h2>
                      <p class="detail-intro">{{ navItems[hoveredItemIndex].intro }}</p>
                    </div>

                    <div v-if="navItems[hoveredItemIndex].subMenu" class="detail-sub-grid">
                      <div v-for="sub in navItems[hoveredItemIndex].subMenu" :key="sub.title" class="detail-sub-group">
                        <h3 class="sub-group-label">{{ sub.title }}</h3>
                        <ul class="sub-links-list">
                          <li v-for="subLink in sub.items" :key="subLink.name">
                            <router-link :to="subLink.path" class="sub-item-link" @click="isHamburgerOpen = false">
                              {{ subLink.name }}
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                  </div>
                </transition>
              </div>
            </div>
          </div>
          
          <div class="menu-footer">
            <div class="menu-social">
              <a href="#"><MessageCircle :size="20" /> 微信公众号</a>
              <span class="dot">·</span>
              <a href="#">学校官网</a>
              <span class="dot">·</span>
              <a href="#">EN</a>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 全宽下拉大面板 (Mega Drawer) -->
    <transition name="slide-down-panel">
      <div 
        v-if="activeSubMenu" 
        class="fullwidth-mega-drawer"
        @mouseenter="keepMegaMenu"
        @mouseleave="closeMegaMenu"
      >
        <div class="mega-drawer-inner">
          <div class="mega-drawer-grid">
            <div 
              v-for="sub in activeSubMenu.subMenu" 
              :key="sub.title"
              class="mega-drawer-column"
            >
              <span class="mega-column-title">{{ sub.title }}</span>
              <div class="mega-column-line"></div>
              
              <ul class="mega-column-links">
                <li v-for="subLink in sub.items" :key="subLink.name">
                  <router-link 
                    :to="subLink.path" 
                    class="mega-column-link"
                    @click="activeSubMenu = null"
                  >
                    {{ subLink.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 悬浮背景遮罩 -->
    <div 
      v-if="activeSubMenu" 
      class="mega-drawer-backdrop" 
      @click="activeSubMenu = null"
    ></div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { 
  Search, 
  ChevronDown, 
  X, 
  MessageCircle,
  Menu
} from "lucide-vue-next";

// 路由与状态管理
const route = useRoute();
const isScrolled = ref(false);
const showSearch = ref(false);
const searchQuery = ref("");
const isHamburgerOpen = ref(false);
const hoveredItemIndex = ref(0);
const activeSubMenu = ref<any>(null);

// 移动端/平板专属抽屉与折叠面板状态
const isMobileOrTablet = ref(false);
const openAccordionIndex = ref<number | null>(null);

const updateScreenSize = () => {
  isMobileOrTablet.value = window.innerWidth <= 1024;
  if (!isMobileOrTablet.value) {
    openAccordionIndex.value = null;
  }
};

let megaMenuTimer: NodeJS.Timeout | null = null;

// 热门搜索词
const hotTags = ["人工智能专业", "师资队伍", "研究生招生调剂", "优秀科创平台", "党支部风采"];

// 导航数据结构
const navItems = [
  { name: "首页", path: "/" },
  { 
    name: "学院概况", 
    path: "/about",
    intro: "关于我们，展示学院的底蕴与风采。",
    subMenu: [
      {
        title: "认识学院",
        items: [
          { name: "学院简介", path: "/about" },
          { name: "领导班子", path: "/about#leadership" },
          { name: "组织机构", path: "/about#organs" },
          { name: "学院风采", path: "/about#glance" }
        ]
      },
      {
        title: "人才团队",
        items: [
          { name: "师资队伍", path: "/about#faculty-list" }
        ]
      }
    ]
  },
  { 
    name: "人才培养", 
    path: "/education",
    intro: "致力于培养具有创新精神的复合型人工智能与大数据人才。",
    subMenu: [
      {
        title: "本科生培养",
        items: [
          { name: "专业介绍", path: "/education" },
          { name: "培养方案", path: "/education#scheme" },
          { name: "课程建设", path: "/education#course" }
        ]
      },
      {
        title: "研究生教育",
        items: [
          { name: "招生信息", path: "/education#admission" },
          { name: "导师信息", path: "/education#advisors" }
        ]
      },
      {
        title: "教学资源",
        items: [
          { name: "实验室建设", path: "/education#labs" }
        ]
      }
    ]
  },
  { 
    name: "学科科研", 
    path: "/research",
    intro: "深耕学术前沿，服务地方数字经济腾飞。",
    subMenu: [
      {
        title: "学术研究",
        items: [
          { name: "学科建设", path: "/research" },
          { name: "学术成果", path: "/research#achievements" },
          { name: "科研项目", path: "/research#projects" }
        ]
      },
      {
        title: "研究载体",
        items: [
          { name: "科研平台", path: "/research#platforms" },
          { name: "国际会议", path: "/research#conferences" }
        ]
      }
    ]
  },
  { 
    name: "党建工作", 
    path: "/party",
    intro: "红心向党，筑牢新时代高校基石。",
    subMenu: [
      {
        title: "学院党建",
        items: [
          { name: "党建动态", path: "/party" },
          { name: "支部风采", path: "/party#branch" },
          { name: "教育培训", path: "/party#education" },
          { name: "在线学习", path: "/party#learning" }
        ]
      }
    ]
  },
  { 
    name: "学生天地", 
    path: "/students",
    intro: "激扬青春，探索无限创意的第二课堂。",
    subMenu: [
      {
        title: "学生活动",
        items: [
          { name: "团学活动", path: "/students" },
          { name: "竞赛获奖", path: "/students#awards" },
          { name: "心理健康", path: "/students#mental" },
          { name: "校友风采", path: "/students#alumni" }
        ]
      }
    ]
  },
  { 
    name: "招生就业", 
    path: "/admission",
    intro: "欢迎报考大数据与人工智能学院，筑梦起航！",
    subMenu: [
      {
        title: "招生服务",
        items: [
          { name: "本科招生", path: "/admission" },
          { name: "研究生招生", path: "/admission#graduate" }
        ]
      },
      {
        title: "生涯就业",
        items: [
          { name: "就业指导", path: "/admission#career" },
          { name: "招聘信息", path: "/admission#jobs" }
        ]
      }
    ]
  }
];

// Mega Menu 悬浮延时触发
const openMegaMenu = (item: any) => {
  if (megaMenuTimer) clearTimeout(megaMenuTimer);
  if (item.subMenu) {
    activeSubMenu.value = item;
  } else {
    activeSubMenu.value = null;
  }
};

const keepMegaMenu = () => {
  if (megaMenuTimer) clearTimeout(megaMenuTimer);
};

const closeMegaMenu = () => {
  megaMenuTimer = setTimeout(() => {
    activeSubMenu.value = null;
  }, 150);
};

const toggleMobileMenu = () => {
  alert("导航栏主菜单 Drawer 打开中...");
};

// 搜索栏逻辑
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    alert(`全站搜索: "${searchQuery.value}"`);
    showSearch.value = false;
    searchQuery.value = "";
  }
};

const searchTag = (tag: string) => {
  searchQuery.value = tag;
  nextTick(() => handleSearch());
};



// 页面滚动监听
const handleScroll = () => {
  isScrolled.value = window.scrollY > 80;
};

// 首页全屏滚动监听
const handlePageScroll = (e: Event) => {
  const customEvent = e as CustomEvent;
  isScrolled.value = customEvent.detail > 0;
};

// 聚焦搜索框
const searchInput = ref<HTMLInputElement | null>(null);
watch(showSearch, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      searchInput.value?.focus();
    }, 100);
  } else {
    document.body.style.overflow = "";
  }
});

const toggleAccordion = (index: number) => {
  if (openAccordionIndex.value === index) {
    openAccordionIndex.value = null;
  } else {
    openAccordionIndex.value = index;
  }
};

const handleLinkClick = (event: Event, item: any) => {
  if (item.subMenu) {
    event.preventDefault();
    toggleAccordion(navItems.indexOf(item));
  } else {
    isHamburgerOpen.value = false;
  }
};

const triggerSearch = () => {
  isHamburgerOpen.value = false;
  showSearch.value = true;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("page-scroll", handlePageScroll);
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);
  // 确保清除任何残存的深色模式缓存，锁定在极简浅色学术模式
  localStorage.removeItem("theme");
  document.documentElement.classList.remove("dark");
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("page-scroll", handlePageScroll);
  window.removeEventListener("resize", updateScreenSize);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: white;
  background: transparent; /* 完全透明 */
  padding: 18px 0;
}

/* 滚动激活时：保持完全透明，无描边，无阴影 */
.app-header.scrolled {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-bottom: none !important;
  box-shadow: none !important;
  padding: 10px 0;
  color: var(--secondary-color); /* 变为高贵端庄的深紫色 */
}

/* 递归转化 scrolled 状态下的子项为深色 */
.app-header.scrolled .logo-area,
.app-header.scrolled .gdufe-seal-svg,
.app-header.scrolled .college-logo-svg,
.app-header.scrolled .gdufe-seal-img,
.app-header.scrolled .college-logo-img,
.app-header.scrolled .univ-name,
.app-header.scrolled .dept-name,
.app-header.scrolled .logo-en-row,
.app-header.scrolled .nav-link,
.app-header.scrolled .helper-link,
.app-header.scrolled .helper-btn,
.app-header.scrolled .divider,
.app-header.scrolled .hamburger-btn {
  color: var(--secondary-color) !important;
  transition: color 0.3s ease;
}

/* scrolled 状态下 Hover 的专属高亮色过渡 */
.app-header.scrolled .nav-link:hover,
.app-header.scrolled .helper-link:hover,
.app-header.scrolled .helper-btn:hover {
  color: var(--highlight-color) !important;
  text-shadow: none !important;
}

/* 暗黑模式下的滚动状态：同样保持全透明 */
.dark .app-header.scrolled {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-bottom: none !important;
  box-shadow: none !important;
  color: rgba(255, 255, 255, 0.95);
}

/* 暗黑模式下，即便 scrolled 激活，也必须保持高亮白色文字 */
.dark .app-header.scrolled .logo-area,
.dark .app-header.scrolled .gdufe-seal-svg,
.dark .app-header.scrolled .college-logo-svg,
.dark .app-header.scrolled .gdufe-seal-img,
.dark .app-header.scrolled .college-logo-img,
.dark .app-header.scrolled .univ-name,
.dark .app-header.scrolled .dept-name,
.dark .app-header.scrolled .logo-en-row,
.dark .app-header.scrolled .nav-link,
.dark .app-header.scrolled .helper-link,
.dark .app-header.scrolled .helper-btn,
.dark .app-header.scrolled .divider,
.dark .app-header.scrolled .hamburger-btn {
  color: rgba(255, 255, 255, 0.95) !important;
}

.dark .app-header.scrolled .nav-link:hover,
.dark .app-header.scrolled .helper-link:hover,
.dark .app-header.scrolled .helper-btn:hover {
  color: var(--highlight-color) !important;
}

/* 顶部栅格布局：左侧品牌，右侧组合层，极大拓宽以彻底贴近左右两侧边缘 */
.app-header .header-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 96% !important; /* 极大拓宽，左右留 2% 呼吸气垫，让品牌与导航贴近两侧 */
  max-width: 1750px !important; /* 宽屏适配 */
  margin: 0 auto;
}

/* 左侧品牌区 */
.logo-area {
  display: flex;
  align-items: center;
  gap: 20px; /* 大气舒张间距 */
  color: white;
  flex-shrink: 0;
}

.double-emblem-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gdufe-seal-svg,
.college-logo-svg,
.gdufe-seal-img,
.college-logo-img {
  width: 68px; /* 进一步放大至 68px，气势磅礴 */
  height: 68px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-main-row {
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.univ-name {
  font-family: var(--font-heading);
  font-size: 1.7rem; /* 大幅提升至 1.7rem，极具名校厚重感的书法体气势 */
  font-weight: 800;
  letter-spacing: 1px;
}

.univ-name-img {
  height: 3.0rem; /* 进一步放大至 3.0rem，清晰舒展 */
  width: auto;
  object-fit: contain;
  vertical-align: middle;
  transition: all 0.3s ease;
}

/* 如果 logo 是白色，在滚动白底时自动转化为高贵的深港紫质感 */
.app-header.scrolled .univ-name-img {
  filter: brightness(0.18) sepia(1) hue-rotate(240deg) saturate(3);
}

.dept-name {
  font-family: var(--font-heading);
  font-size: 1.4rem; /* 提升至 1.4rem */
  font-weight: 500;
  opacity: 0.95;
}

.logo-en-row {
  font-family: var(--font-heading);
  font-size: 0.85rem; /* 提升至 0.85rem */
  font-weight: 500;
  opacity: 0.75;
  margin-top: 5px;
  letter-spacing: 0.6px;
}

/* 右侧组合栏 (顶部辅助行 + 底部导航行) */
.right-navigation-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex: 1;
}

/* 1. 顶部辅助小字栏 */
.top-helper-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2px;
}

.helper-links {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.85rem; /* 从 0.75rem 提升至 0.85rem，可读性更佳 */
  opacity: 0.85;
}

.helper-link {
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s;
  font-weight: 500;
}

.helper-link:hover {
  opacity: 1;
  text-shadow: 0 0 4px rgba(255,255,255,0.4);
}

.helper-icon {
  opacity: 0.9;
}

.divider {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.8rem;
}

.helper-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.helper-btn:hover {
  opacity: 1;
  text-shadow: 0 0 4px rgba(255,255,255,0.4);
}

/* 2. 下部主导航行 */
.main-nav-row {
  display: flex;
  align-items: center;
  gap: 22px;
}

.main-nav > ul {
  display: flex;
  gap: 2.2rem; /* 字与字之间更具开阔感与皇家学术之美 */
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.main-nav > ul > li {
  position: relative;
}

.nav-link {
  font-weight: 600;
  font-size: 1.05rem; /* 从 0.95rem 提升至 1.05rem，完美均衡 */
  color: white;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
  padding: 6px 0;
}

.nav-link:hover {
  opacity: 1;
  text-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
}

.arrow-down {
  opacity: 0.75;
  transition: transform 0.3s;
}

.main-nav li:hover .arrow-down {
  transform: rotate(180deg);
}

/* 极简汉堡三横按钮 */
.hamburger-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
  border-radius: 4px;
}

.hamburger-btn:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

/* Mega Menu 大面板下拉样式 */
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(13, 27, 42, 0.96);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 3px solid var(--highlight-color);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  padding: 36px 0;
  color: white;
  z-index: 99;
}

.mega-menu-inner {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 50px;
}

.mega-info-box h3 {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}

.mega-info-box p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.menu-accent-line {
  width: 30px;
  height: 3px;
  background-color: var(--highlight-color);
  margin-top: 16px;
  border-radius: 1.5px;
}

.mega-links-grid {
  display: flex;
  gap: 60px;
}

.mega-link-group {
  flex: 1;
}

.group-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--highlight-color);
  margin-bottom: 16px;
  border-left: 3px solid var(--highlight-color);
  padding-left: 8px;
}

.mega-link-group ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mega-link-group a {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.2s;
}

.mega-link-group a:hover {
  color: var(--highlight-color);
  padding-left: 4px;
}

/* 全局全屏搜索覆盖 */
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(13, 27, 42, 0.97);
  backdrop-filter: blur(20px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.close-search {
  position: absolute;
  top: 40px;
  right: 40px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.close-search:hover {
  opacity: 1;
}

.search-modal-content {
  width: 90%;
  max-width: 800px;
  text-align: center;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  border-bottom: 2px solid rgba(255,255,255,0.25);
  padding-bottom: 12px;
  margin-bottom: 24px;
  transition: border-bottom-color 0.3s;
}

.search-input-wrapper:focus-within {
  border-bottom-color: var(--highlight-color);
}

.search-modal-icon {
  margin-right: 18px;
  opacity: 0.8;
}

.search-input-wrapper input {
  background: none;
  border: none;
  outline: none;
  font-size: 1.5rem;
  color: white;
  width: 100%;
}

.search-input-wrapper input::placeholder {
  color: rgba(255,255,255,0.4);
}

.search-hot-keys {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.9rem;
}

.search-hot-keys span {
  opacity: 0.6;
}

.search-hot-keys button {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.search-hot-keys button:hover {
  background: var(--highlight-color);
  border-color: var(--highlight-color);
  transform: translateY(-1px);
}

/* 过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* ==========================================
   清华 AI 风格：悬浮小下拉菜单 (Simple Dropdown)
   ========================================== */
.nav-item-with-dropdown {
  position: relative;
}

.simple-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 12px);
  min-width: 160px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 6px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  padding: 12px 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 150;
  border: 1px solid rgba(123, 44, 191, 0.08);
}

.dark .simple-dropdown {
  background: rgba(25, 12, 35, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
}

/* 顶部小三角形 */
.dropdown-arrow {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid rgba(255, 255, 255, 0.98);
}

.dark .dropdown-arrow {
  border-bottom-color: rgba(25, 12, 35, 0.98);
}

.dropdown-content {
  display: flex;
  flex-direction: column;
}

.dropdown-group {
  padding: 8px 0;
}

.dropdown-group:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  margin-bottom: 4px;
}

.dark .dropdown-group:not(:last-child) {
  border-bottom-color: rgba(255, 255, 255, 0.04);
}

.dropdown-group-title {
  padding: 0 20px 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--highlight-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
}

.simple-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.dropdown-item-link {
  display: block;
  padding: 10px 20px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  text-align: left;
  transition: all 0.2s ease;
  text-decoration: none;
  white-space: nowrap;
}

.dark .dropdown-item-link {
  color: rgba(255, 255, 255, 0.85);
}

.dropdown-item-link:hover {
  background-color: rgba(123, 44, 191, 0.06);
  color: var(--highlight-color) !important;
  padding-left: 24px;
}

.dark .dropdown-item-link:hover {
  background-color: rgba(255, 255, 255, 0.06);
  color: var(--highlight-color) !important;
}

/* ==========================================
   清华 AI 风格：全宽下拉大面板 (Mega Drawer)
   ========================================== */
.fullwidth-mega-drawer {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.97); /* 完美高斯模糊 */
  backdrop-filter: blur(12px);
  border-bottom: 3px solid var(--highlight-color);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
  z-index: 1000;
  box-sizing: border-box;
}

.dark .fullwidth-mega-drawer {
  background: rgba(20, 4, 25, 0.97);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

.mega-drawer-inner {
  width: 90% !important;
  max-width: 1440px !important;
  margin: 0 auto;
  padding: 40px 0;
  box-sizing: border-box;
}

.mega-drawer-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7列平铺，大气开阔 */
  gap: 24px;
}

.mega-drawer-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mega-column-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--secondary-color);
  text-decoration: none;
  transition: color 0.2s;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  width: fit-content;
}

.dark .mega-column-title {
  color: white;
}

.mega-column-title:hover {
  color: var(--highlight-color);
}

.mega-column-line {
  width: 18px;
  height: 3px;
  background-color: var(--highlight-color);
  border-radius: 1.5px;
  margin-top: -6px;
  margin-bottom: 4px;
}

.mega-column-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.mega-column-link {
  font-size: 0.9rem;
  color: #4a5568;
  text-decoration: none;
  transition: all 0.2s ease;
}

.dark .mega-column-link {
  color: rgba(255, 255, 255, 0.7);
}

.mega-column-link:hover {
  color: var(--highlight-color) !important;
  padding-left: 4px;
}

/* 底部背景模糊遮罩，支持点击收回 */
.mega-drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(13, 27, 42, 0.25);
  backdrop-filter: blur(4px);
  z-index: -1; /* 置于大下拉卡片底层 */
}

/* 清华 AI 官方动效：顺滑向下展开与淡入 */
.slide-down-panel-enter-active,
.slide-down-panel-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-down-panel-enter-from,
.slide-down-panel-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 极简汉堡按钮 (自定义动效，三横线转X) */
.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3001; /* 确保在全屏菜单之上 */
  position: relative;
  transition: all 0.3s ease;
  padding: 0;
  margin-left: 10px;
}

.hamburger-inner {
  width: 26px;
  height: 18px;
  position: relative;
}

.hamburger-inner span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background-color: white;
  border-radius: 2px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.app-header.scrolled .hamburger-inner span {
  background-color: var(--secondary-color);
}

.dark .app-header.scrolled .hamburger-inner span {
  background-color: white;
}

.hamburger-inner span:nth-child(1) { top: 0px; }
.hamburger-inner span:nth-child(2) { top: 8px; }
.hamburger-inner span:nth-child(3) { top: 16px; }

/* 激活状态 (X) */
.hamburger-btn.active .hamburger-inner span {
  background-color: var(--secondary-color) !important; /* 全屏菜单打开时为深色以与白色底色契合 */
}

.hamburger-btn.active .hamburger-inner span:nth-child(1) {
  top: 8px;
  transform: rotate(135deg);
}

.hamburger-btn.active .hamburger-inner span:nth-child(2) {
  opacity: 0;
  left: -40px;
}

.hamburger-btn.active .hamburger-inner span:nth-child(3) {
  top: 8px;
  transform: rotate(-135deg);
}

/* ==========================================
   全新极致响应式适配策略 (Desktop -> Mobile)
   ========================================== */

/* 1025px - 1440px: 中等宽屏笔记本适配，微调字号 and 间距，防止换行溢出 */
@media (max-width: 1440px) and (min-width: 1025px) {
  .gdufe-seal-svg,
  .college-logo-svg,
  .gdufe-seal-img,
  .college-logo-img {
    width: 54px;
    height: 54px;
  }
  .double-emblem-wrap {
    gap: 8px;
  }
  .logo-area {
    gap: 12px;
  }
  .univ-name {
    font-size: 1.45rem;
  }
  .univ-name-img {
    height: 2.4rem;
  }
  .dept-name {
    font-size: 1.15rem;
  }
  .logo-en-row {
    font-size: 0.75rem;
    margin-top: 2px;
  }
  .main-nav ul {
    gap: 1.2rem; /* 大幅缩小导航项间距，确保不溢出 */
  }
  .nav-link {
    font-size: 0.95rem;
  }
}

/* 1025px - 1200px: 紧凑笔记本适配，隐藏英文，极窄间距 */
@media (max-width: 1200px) and (min-width: 1025px) {
  .gdufe-seal-svg,
  .college-logo-svg,
  .gdufe-seal-img,
  .college-logo-img {
    width: 48px;
    height: 48px;
  }
  .logo-text {
    max-width: 280px;
  }
  .univ-name {
    font-size: 1.25rem;
  }
  .univ-name-img {
    height: 2.1rem;
  }
  .dept-name {
    font-size: 1.05rem;
  }
  .logo-en-row {
    display: none; /* 隐藏英文，确保中文完整展示 */
  }
  .main-nav ul {
    gap: 0.8rem; /* 极窄间距 */
  }
  .nav-link {
    font-size: 0.9rem;
  }
}

/* 1024px 以下: 平板及移动端主适配 */
@media (max-width: 1024px) {
  .main-nav {
    display: none !important;
  }
  .hide-mobile {
    display: none !important;
  }
  .header-grid {
    padding: 6px 16px; /* 更精致的上下内边距 */
  }
  
  /* 让所有功能性按钮在一排完美水平对齐 */
  .right-navigation-block {
    flex-direction: row !important;
    align-items: center !important;
    gap: 10px !important;
    flex: initial;
  }
  .top-helper-row {
    margin-bottom: 0 !important;
  }
  .helper-links {
    gap: 10px !important;
  }
  .helper-links .divider {
    display: none !important; /* 隐藏分隔线，保持极简 */
  }
  
  /* 给功能按钮加上精致的毛玻璃微背景，触控感极佳 */
  .helper-btn {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex !important;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }
  .app-header.scrolled .helper-btn {
    background-color: rgba(74, 18, 94, 0.06);
  }
  .dark .app-header.scrolled .helper-btn {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .helper-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .app-header.scrolled .helper-btn:hover {
    background-color: rgba(74, 18, 94, 0.12);
  }
  .dark .app-header.scrolled .helper-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .hamburger-btn {
    background-color: rgba(255, 255, 255, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 6px;
    margin-left: 0 !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .app-header.scrolled .hamburger-btn {
    background-color: rgba(74, 18, 94, 0.06);
  }
  .dark .app-header.scrolled .hamburger-btn {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .hamburger-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .app-header.scrolled .hamburger-btn:hover {
    background-color: rgba(74, 18, 94, 0.12);
  }
  
  .univ-name {
    font-size: 1.25rem;
  }
  .univ-name-img {
    height: 2.1rem;
  }
  .dept-name {
    font-size: 1.05rem;
  }
  .logo-en-row {
    display: none;
  }
  .gdufe-seal-svg,
  .college-logo-svg,
  .gdufe-seal-img,
  .college-logo-img {
    width: 48px;
    height: 48px;
  }
  
  /* 解决抽屉高过屏幕时的滚动截断问题，限制 max-height 并开启局部滚动 */
  .fullwidth-mega-drawer {
    max-height: calc(100vh - 72px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .mega-drawer-inner {
    padding: 30px 20px;
  }
  .mega-drawer-grid {
    grid-template-columns: repeat(4, 1fr) !important; /* 1024px 以下平移为 4 列，清爽宽大 */
    gap: 20px;
  }
}

/* 768px 以下: 手机端/小平板适配，校名院名垂直排列 */
@media (max-width: 768px) {
  .logo-text {
    justify-content: center;
  }
  .logo-main-row {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 2px !important;
  }
  .univ-name {
    font-size: 1.15rem !important;
    line-height: 1.2;
  }
  .univ-name-img {
    height: 1.9rem !important;
  }
  .dept-name {
    font-size: 0.95rem !important;
    line-height: 1.2;
    opacity: 0.9;
  }
  .gdufe-seal-svg,
  .college-logo-svg,
  .gdufe-seal-img,
  .college-logo-img {
    width: 42px !important;
    height: 42px !important;
  }
  .double-emblem-wrap {
    gap: 6px !important;
  }
  .mega-drawer-grid {
    grid-template-columns: repeat(2, 1fr) !important; /* 768px 以下平移为 2 列 */
    gap: 24px 16px;
  }
  .hide-tablet {
    display: none !important;
  }
}

/* 480px 以下: 极小手机端适配，仅保留广财圆形校徽 */
@media (max-width: 480px) {
  .college-logo-svg,
  .college-logo-img {
    display: none !important; /* 极小手机端隐藏学院六边形，仅保留广财圆形校徽 */
  }
  .double-emblem-wrap {
    gap: 0 !important;
  }
  .univ-name {
    font-size: 1.1rem !important;
  }
  .univ-name-img {
    height: 1.7rem !important;
  }
  .dept-name {
    font-size: 0.85rem !important;
  }
  .mega-drawer-grid {
    grid-template-columns: 1fr !important; /* 480px 以下平移为单列垂直排布 */
    gap: 20px;
  }
  .mega-column-line {
    margin-bottom: 2px;
  }
}

/* ==========================================
   全屏极简全站导航大菜单 (Full Screen Menu Styles)
   ========================================== */
.full-screen-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3000;
  display: flex;
  color: var(--secondary-color);
  overflow: hidden;
  backdrop-filter: blur(20px); /* 磨砂玻璃质感，使底部主页模糊透出 */
  -webkit-backdrop-filter: blur(20px);
}

.menu-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.85); /* 85% 半透明白底，完美穿透 */
  z-index: -1;
}

.menu-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 100px 5% 40px; /* 增加顶部边距，避开 Header */
  box-sizing: border-box;
}

.menu-header {
  margin-bottom: 30px;
  flex-shrink: 0;
}

.menu-brand {
  display: flex;
  flex-direction: column;
}

.univ-name-l {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.dept-name-l {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  opacity: 0.8;
  margin-top: 4px;
}

.menu-content {
  flex: 1;
  overflow-y: auto; /* 允许垂直滚动，防止小屏幕截断 */
  padding-right: 15px;
  margin: 20px 0;
}

/* 自定义滚动条 */
.menu-content::-webkit-scrollbar {
  width: 4px;
}
.menu-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
.menu-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.menu-split-layout {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 60px;
  width: 100%;
  min-height: min-content;
}

/* 左侧主导航列表 */
.menu-left-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
}

.full-nav-item {
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.full-nav-link {
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  color: rgba(74, 18, 94, 0.45);
  padding: 10px 0;
  transition: all 0.3s ease;
}

.item-index {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--highlight-color);
  opacity: 0.6;
}

.item-name {
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.active-indicator {
  width: 0;
  height: 2px;
  background-color: var(--highlight-color);
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  margin-left: 10px;
}

.full-nav-item.active .full-nav-link {
  color: var(--secondary-color);
  transform: translateX(10px);
}

.full-nav-item.active .active-indicator {
  width: 30px;
}

/* 右侧详细面板 */
.menu-right-details {
  position: relative;
  background: rgba(74, 18, 94, 0.02);
  border-radius: 24px;
  padding: 50px;
  border: 1px solid rgba(74, 18, 94, 0.08);
  display: flex;
  align-items: flex-start;
  min-height: 400px;
  overflow: hidden;
}

.detail-panel {
  width: 100%;
  z-index: 1;
}

.detail-info {
  margin-bottom: 40px;
  max-width: 100%;
}

.detail-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 15px;
  background: linear-gradient(to right, var(--primary-color), var(--highlight-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.detail-intro {
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--text-secondary);
  max-width: 500px;
}

.detail-sub-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
}

.sub-group-label {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--highlight-color);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 15px;
  opacity: 0.8;
}

.sub-links-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.sub-item-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1.15rem;
  transition: all 0.2s ease;
  display: inline-block;
}

.sub-item-link:hover {
  color: var(--primary-color);
  transform: translateX(5px);
}

.bg-number {
  position: absolute;
  bottom: -30px;
  right: -10px;
  font-size: 18rem;
  font-weight: 900;
  color: rgba(74, 18, 94, 0.03);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

/* Animations */
.detail-fade-enter-active,
.detail-fade-leave-active {
  transition: all 0.3s ease;
}

.detail-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.detail-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Overlay Transition */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.5s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.menu-footer {
  flex-shrink: 0;
  margin-top: 20px;
  padding-top: 25px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-social {
  display: flex;
  align-items: center;
  gap: 20px;
}

.menu-social a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}

.menu-social a:hover {
  color: var(--primary-color);
}

.dot {
  opacity: 0.2;
}

.menu-theme-toggle button {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 18px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  transition: all 0.3s;
}

.menu-theme-toggle button:hover {
  background: white;
  color: #0d1b2a;
}

/* 响应式调整 */
@media (max-width: 1440px) {
  .item-name {
    font-size: 2rem;
  }
  .detail-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 1200px) {
  .menu-split-layout {
    grid-template-columns: 320px 1fr;
    gap: 40px;
  }
}

@media (max-width: 1024px) {
  .menu-container {
    padding-top: 90px;
  }
  .menu-split-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .menu-left-nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px 20px;
    padding: 10px 0;
  }
  .full-nav-link {
    padding: 5px 0;
  }
  .item-name {
    font-size: 1.4rem;
  }
  .active-indicator {
    display: none;
  }
  .menu-right-details {
    padding: 30px;
    min-height: auto;
  }
  .detail-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .menu-container {
    padding: 80px 6% 30px;
  }
  .univ-name-l {
    font-size: 1.4rem;
  }
  .dept-name-l {
    font-size: 0.9rem;
  }
  .menu-left-nav {
    gap: 10px 15px;
  }
  .item-name {
    font-size: 1.2rem;
  }
  .detail-info {
    margin-bottom: 25px;
  }
  .detail-intro {
    font-size: 1rem;
  }
  .detail-sub-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .menu-footer {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
}

@media (max-height: 700px) {
  .menu-container {
    padding-top: 70px;
  }
  .menu-header {
    margin-bottom: 10px;
  }
  .detail-title {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  .detail-info {
    margin-bottom: 20px;
  }
}

</style>