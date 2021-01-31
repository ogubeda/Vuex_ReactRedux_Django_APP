import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue';

export const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home,
    }
  ],
})
