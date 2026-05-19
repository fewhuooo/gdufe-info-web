import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomePage.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutPage.vue")
    },
    {
      path: "/education",
      name: "education",
      component: () => import("../views/EducationPage.vue")
    },
    {
      path: "/research",
      name: "research",
      component: () => import("../views/ResearchPage.vue")
    },
    {
      path: "/party",
      name: "party",
      component: () => import("../views/PartyPage.vue")
    },
    {
      path: "/students",
      name: "students",
      component: () => import("../views/StudentPage.vue")
    },
    {
      path: "/admission",
      name: "admission",
      component: () => import("../views/AdmissionPage.vue")
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
