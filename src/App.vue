<template>
  <AppHeader />
  <main :class="['main-content', { 'subpage-content': route.path !== '/' }]">
    <router-view />
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
}

.main-content.subpage-content {
  padding-top: 125px; /* 留出增大后的顶部固定大导航栏的高度，防止子页内容被顶栏遮挡 */
}
</style>
