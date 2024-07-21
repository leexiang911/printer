import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/components/AppLayout.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: Layout,
      children: [
        {
          path: '/',
          component: () => import('../views/IndexView.vue')
        },
        {
          path: '/:xxx(.*)*',
          component: () => import('../views/ErrorView.vue'),
          name: "404error"
        }, {
          path: '/print',
          component: () => import('../views/HomeView.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
