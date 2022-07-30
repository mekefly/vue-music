import Home from "../views/Home/index.vue";

import { RouterOptions } from "vue-router";
import Layout from "../views/Layout.vue";
import PlayBar from "../views/PlayBar/PlayBar.vue";

const routes: RouterOptions["routes"] = [
  {
    path: "/",
    name: "PlayBar",
    component: PlayBar,
    children: [
      {
        path: "/",
        name: "Layout",
        component: Layout,
        children: [
          { path: "/", name: "Home", component: Home },
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
          {
            path: "/mine",
            name: "Mine",
            component: () => import("../views/Mine.vue"),
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
    ],
  },
];
export default routes;
