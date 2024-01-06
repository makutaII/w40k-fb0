import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/about',
    name: 'about ',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    // разделение кода на уровне маршрута
     // это генерирует отдельный чанк (about.[hash].js) для этого маршрута
     // который загружается лениво при посещении маршрута.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
    {
    path: '/skill',
    name: 'skill ',
    component: () => import('../views/SkillView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
