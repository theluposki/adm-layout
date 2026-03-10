import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/home.vue"
import About from "@/pages/about.vue"
import Config from "@/pages/config.vue"
import Users from "@/pages/users/users.vue"


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      children: [
        {
          path: '',
          name: 'list',
          component: () => import('@/pages/users/list.vue'),
        },
        {
          path: 'add',
          name: 'add',
          component: () => import('@/pages/users/add.vue'),
        },
      ]
    },
    {
      path: "/setup",
      name: "setup",
      component: Config
    },
  ],
});

export default router;
