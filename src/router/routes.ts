import { RouterOptions } from "vue-router";
import Layout from "../views/Layout.vue";

const routes: RouterOptions["routes"] = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/topic",
        name: "Topic",
        component: () => import("../views/Topic.vue"),
      },
      {
        path: "/search",
        name: "Search",
        component: () => import("../views/Search.vue"),
      },
      // {
      //   path: "/mine",
      //   name: "Mine",
      //   component: () => import("../views/Mine.vue"),
      // },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "GoBack",
    component: () => import("../views/GoBack.vue"),
    children: [
      {
        path: "/more/:pageName/:id",
        name: "More",
        component: () => import("../views/MusicMore.vue"),
      },
    ],
  },
];
export default routes;
