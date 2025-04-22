import { createRouter, createWebHistory } from 'vue-router'
import RocketList from '@/pages/RocketList.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/rockets' },
    { path: '/rockets', component: RocketList }
  ],
})

export default router
