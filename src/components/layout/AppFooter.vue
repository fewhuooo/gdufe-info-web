<template>
  <footer class="app-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <div class="logo-text">
          <h1>广东财经大学</h1>
          <h2>大数据与人工智能学院</h2>
          <p class="en-name">School of Big Data and AI</p>
        </div>
      </div>

      <div class="footer-links">
        <div class="link-group">
          <h3>快速导航</h3>
          <ul>
            <li><router-link to="/about">学院概况</router-link></li>
            <li><router-link to="/education">人才培养</router-link></li>
            <li><router-link to="/research">学科科研</router-link></li>
            <li><router-link to="/admission">招生就业</router-link></li>
          </ul>
        </div>
        <div class="link-group">
          <h3>联系我们</h3>
          <ul>
            <li>地址：广州市海珠区仑头路21号</li>
            <li>电话：020-8409xxxx</li>
            <li>邮箱：info@gdufe.edu.cn</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom container">
      <div class="copyright">
        &copy; {{ new Date().getFullYear() }} 广东财经大学 大数据与人工智能学院 版权所有
      </div>
      <div class="icp">
        <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备05000001号</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--gradient-footer);
  color: white;
  padding: 24px 0 12px;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 24px;
}
.logo-text h1 {
  font-size: 1.25rem;
  margin-bottom: 2px;
}
.logo-text h2 {
  font-size: 0.95rem;
  font-weight: 400;
  margin-bottom: 4px;
}
.en-name {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.7);
}

.footer-links {
  display: flex;
  gap: 48px;
}
.link-group h3 {
  font-size: 0.95rem;
  margin-bottom: 12px;
  position: relative;
}
.link-group h3::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 20px;
  height: 2px;
  background-color: var(--accent-color);
}
.link-group ul {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.link-group a, .link-group li {
  color: rgba(255,255,255,0.8);
  font-size: 0.8rem;
  transition: color 0.3s;
}
.link-group a:hover {
  color: var(--accent-color);
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.6);
}
.footer-bottom a {
  color: inherit;
}
.footer-bottom a:hover {
  color: white;
}
</style>