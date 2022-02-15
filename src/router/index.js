import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/tracking",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/tracking",
    name: "Tracking",
    component: () => import("../views/Tracking.vue"),
  },
  {
    path: "/racers",
    name: "Racers",
    component: () => import("../views/Racers.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
