# 广东财经大学——大数据与人工智能学院官方门户网站
> **GDUFE - School of Big Data & Artificial Intelligence Official Website**

本项目是专为广东财经大学大数据与人工智能学院量身定制的高奢、响应式、多交互学术门户网站。采用最前沿的 **Vue 3 (Composition API) + Vite 5 + TypeScript** 构建，在设计美学上深度借鉴了清华大学数智化学术流线风格，融入了智能双主题系统、全屏阻尼滑动交互、动态首帧视频解码以及 Gemini AI 智能悬浮助手，为师生提供极致流畅且具科技感的浏览体验。

---

## ✨ 核心亮点与高奢设计

### 1. 🌌 清华风全屏单页阻尼滚动轨道 (`HomePage.vue`)
* 首页采用了极简学术高奢布局，由六大板块（首屏首展、学院头条、通知公告、招生视频、学院风采、快速通道与页脚）组成全视口单页纵向滑动轨道。
* **1.2s 贝塞尔曲线平滑过渡**：配合 `cubic-bezier(0.66, 0, 0.34, 1)`，创造无极丝滑的划屏手感。
* **高精智能滚动锁定**：内置 `1200ms` 物理惯性阻尼锁，完美解决由于触控板或鼠标滚轮惯性导致的连跳多屏、乱跳屏 Bug。
* **侧边呼吸气泡指示器**：仿清华 AI 旗舰风格，采用官方学术紫与呼吸光圈晕染，律动感十足。

### 🌓 2. 极致微晶科技感与智能双主题
* **珍珠紫柔光流线大底**：轻盈的珍珠淡紫柔光渐变背景，配合对角线等高数学函数流线（Academic Curves），学术探索感与空间感跃然屏上。
* **智能暗黑模式 (Dark Mode)**：提供对物理自然环境的暗度自适应适配。在暗黑模式下，所有卡片转化为高科技微晶磨砂材质，搭配极淡霓虹微晶框线与微白透光线，奢华护眼。
* **高阶微交互**：按钮悬浮微升、风采卡片视差悬浮、科创边界呼吸灯带（Neon Borders），每一个像素级交互均带给用户极致的惊艳感。

### 📸 3. 实景风采大图智能映射 (`NewsSection.vue` & `CampusShowcase.vue`)
* **告别单调渐变**：所有新闻大卡片及格点背景已完美映射为最新整理的实景风采大图（`1.jpg` - `5.jpg`）。
* **多元视觉轮转**：在【学院头条】与【讲座预告】两大 Tab 中，图片采用了智能倒序与顺序的错开轮转显示，多维度展现广财校园的青春朝气。
* **手风琴风采展墙**：在「学院风采」板块中，采用高级多维手风琴折叠交互，用户鼠标悬停时卡片自动伸展，极具张力。

### 🎥 4. HTML5 视频首帧动态预览图技术 (`AdmissionVideoSection.vue`)
* **零额外资源开销**：直接通过 `<video>` 标签的 `preload="metadata"` 属性由浏览器自动拉取视频首帧进行解码渲染，无需额外加载大体积封面图片。
* **高奢交互蒙层**：当视频处于暂停或未播放状态时，在首帧画面上柔和叠加密致的“水晶磨砂黑色底部遮罩”与带有白圈圆形发光动画的“经典播放按钮”。
* **无缝无损播放**：点击卡片后，交互遮罩以 0.4s 的 `video-fade` 淡出，视频直接原地无缝启动并智能唤出原生控制条（音量、全屏、进度条），一气呵成。

### 🤖 5. 嵌入式 Gemini AI 智能悬浮助手 (`GeminiChatOverlay.vue`)
* 首页右下角常驻高雅紫色微晶体 AI 悬浮球。
* 点击一键横向划出磨砂玻璃质感的 AI 侧边聊天面板，支持全方位智能化校园问答，完美展现学院的大数据与人工智能学科特色！

---

## 🛠️ 技术栈与架构

* **核心框架**：Vue 3 (Composition API)
* **构建工具**：Vite 5
* **编程语言**：TypeScript
* **路由管理**：Vue Router (History 路由模式)
* **矢量图标**：Lucide Vue Next
* **样式系统**：Vanilla CSS (纯手工高精订制，拒绝 Tailwind 的臃肿，确保在所有浏览器上 100% 渲染吻合设计稿)

---

## 📂 项目关键目录结构说明

```text
gdufe-info-web/
├── dist/                   # 生产环境编译打包输出目录 (打包后自动生成)
├── src/
│   ├── assets/             # 静态资源中心
│   │   ├── images/         # 整合优化后的图片目录 (已清除根目录所有冗余图片)
│   │   │   ├── 1.jpg ~ 5.jpg           # 学院风采实景图 (用于新闻与风采展示)
│   │   │   ├── newlogo.png             # 官方规范 Logo
│   │   │   ├── 佛山校区.jpg             # 首页主 Banner 大图
│   │   │   ├── subpage_banner_bg.png   # 全站子页面通用的 Banner 磨砂底图
│   │   │   ├── 院徽.png & 校徽.svg      # 官方标准标识
│   │   │   └── gdufe_sports_day.png    # 教师运动会备用大图
│   │   └── video/          # 视频资源目录
│   │       └── a5050563-290c-4da4-bc3a-974d5b6e2acb.mp4  # 招生宣传视频
│   ├── components/         # 组件目录
│   │   ├── home/           # 首页各板块组件 (NewsSection, AdmissionVideoSection 等)
│   │   └── layout/         # 全局布局组件 (AppHeader, AppFooter, GeminiChatOverlay 等)
│   ├── data/               # 静态数据管理中心 (showcaseData.ts 等，使用 ESM 模块化导入图片)
│   ├── router/             # 路由配置 (基于 history 模式的响应式子页面导航)
│   ├── views/              # 页面视图 (AboutPage, NewsPage, ShowcasePage 等独立子页面)
│   ├── App.vue             # 主应用入口
│   └── main.ts             # 挂载入口
├── vite.config.ts          # Vite 核心配置文件
└── package.json            # 依赖与脚本定义
```

---

## 🚀 本地开发指南

在本地开始运行或开发此项目，请确保已安装 **Node.js (v18.0 或更高版本)**。

### 1. 克隆项目
```bash
git clone https://github.com/fewhuooo/gdufe-info-web.git
cd gdufe-info-web
```

### 2. 安装依赖项
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```
启动成功后，在浏览器中打开命令行提示的地址（通常为 `http://localhost:5173/`）即可开启丝滑的开发预览。

---

## 🌐 生产部署指南

当开发完成，需要将项目打包部署至服务器上时，请参考以下部署流程。

### 1. 项目打包编译
在项目根目录运行以下命令：
```bash
npm run build
```
编译完成后，Vite 将会在根目录下生成一个 `dist` 文件夹。该文件夹包含了所有经过压缩、混淆、哈希重命名的 HTML、CSS、JavaScript 以及图片和视频资源。**您只需要将 `dist` 文件夹内的内容发布到您的静态 Web 服务器即可。**

---

### 2. 常用 Web 服务器配置示例

由于本项目使用了 Vue Router 的 `History 模式`，为保证用户刷新子页面（例如 `/about`、`/news`）时不会出现 **404 Not Found** 错误，您需要在服务器上配置 **单页应用 (SPA) 路由重定向 fallback**。

#### A. Nginx 配置示例
编辑您的虚拟主机配置文件，在 `server` 块中加入 `try_files` 配置：
```nginx
server {
    listen       80;
    server_name  your-college-domain.com;

    location / {
        root   /var/www/gdufe-info-web/dist; # 指向您的打包 dist 实际路径
        index  index.html index.htm;
        
        # 核心配置：如果请求的文件不存在，自动 fallback 重定向到 index.html
        try_files $uri $uri/ /index.html;
    }

    # 针对静态大资源（视频、高清图片）的缓存配置（可选）
    location ~* \.(mp4|jpg|jpeg|png|gif|svg|ico|css|js)$ {
        root /var/www/gdufe-info-web/dist;
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }
}
```

#### B. 腾讯云 Web 托管 / 阿里云 OSS 静态托管
* 如果使用云开发静态托管或对象存储托管，请在平台的「控制台」->「基础配置」->「静态网站托管」中，将 **「默认首页」** 和 **「错误文档」** 均设置为 `index.html`。这会自动开启 History 路由 fallback 功能。

#### C. Vercel 部署
若将项目部署于 Vercel，可在项目根目录下创建 `vercel.json` 文件，内容如下以自动处理 SPA 重定向：
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### D. GitHub Pages 部署
由于 GitHub Pages 默认不支持 History 路由刷新，部署在 GitHub Pages 时建议采用以下两种方案之一：
1. 将 `src/router/index.ts` 中的路由模式修改为 `createWebHashHistory()` (Hash 模式，链接中会带 `#` 符号)；
2. 或者在 `dist` 目录中复制一份 `index.html` 并命名为 `404.html`，GitHub Pages 遇到未找到路由时会自动加载 `404.html`，从而被 Vue Router 接管路由。

---

## ⚡ 性能优化建议

1. **视频托管分离（可选）**：目前的招生视频（44.6 MB）已集成在项目中由 Vite 统一打包分发。在线上大规模访问时，若对服务器带宽有顾虑，建议将 `a5050563-290c-4da4-bc3a-974d5b6e2acb.mp4` 上传至腾讯云 COS、阿里云 OSS 等**内容分发网络 (CDN)** 上，并在 `AdmissionVideoSection.vue` 中将 `admissionVideo` 的 `src` 修改为 CDN 的绝对 URL，以获得极致的视频加载速度并大幅降低源站带宽负荷。
2. **静态图片压缩**：图片已经过预压缩，Vite 在打包时会自动优化部分图片的加载流。

---

## 🤝 贡献与支持

如有任何设计微调需求或功能更新设想，欢迎向本仓库提交 Pull Request 或发起 Issue。广东财经大学大数据与人工智能学院官方门户网站开发团队将竭诚为您服务！

* **Design Concept by**: Antigravity (Powered by Google Deepmind)
* **Author / Code Maintainer**: fewhuooo
