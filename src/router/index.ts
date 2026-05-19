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
      path: "/news",
      name: "news",
      component: () => import("../views/NewsPage.vue")
    },
    {
      path: "/news/:id",
      name: "news-detail",
      component: () => import("../views/NewsDetailPage.vue")
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
    },
    {
      path: "/showcase",
      name: "showcase",
      component: () => import("../views/ShowcasePage.vue")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const el = document.getElementById(to.hash.slice(1));
          if (el) {
            resolve({ top: el.offsetTop - 90, behavior: "smooth" });
          } else {
            resolve({ top: 0 });
          }
        }, 300);
      });
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

export default router;
