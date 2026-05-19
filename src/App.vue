<template>
  <AppHeader />
  <main :class="['main-content', { 'subpage-content': route.path !== '/' }]">
    <router-view v-slot="{ Component }">
      <transition name="fade-page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>
  <AppFooter v-if="route.path !== '/'" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";

const route = useRoute();
</script>

<style>
.main-content {
  width: 100%;
  min-height: calc(100vh - 80px);
  overflow-x: hidden; /* 防止过场动画在横向产生多余的滚动条 */
}

.main-content.subpage-content {
  padding-top: 125px; /* 留出增大后的顶部固定大导航栏的高度，防止子页内容被顶栏遮挡 */
}

/* 高雅的纵向位移淡入淡出页面过场动画 */
.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-page-enter-from {
  opacity: 0;
  transform: translateY(18px); /* 自下向上滑入 */
}

.fade-page-leave-to {
  opacity: 0;
  transform: translateY(-18px); /* 向上滑动淡出 */
}
</style>
