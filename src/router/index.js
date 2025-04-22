import { createRouter, createWebHistory } from 'vue-router'
import RocketList from '@/pages/RocketList.vue'
import RocketDetail from '@/pages/RocketDetail.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/rockets' },
    { path: '/rockets', component: RocketList },
    { path: '/rockets/:id', component: RocketDetail, props: true }
  ],
})

export default router
