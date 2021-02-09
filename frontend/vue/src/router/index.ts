import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/song/:slug',
    name: 'Song',
    component: () => import("@/views/Song.vue"),
    props: true

  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/Login.vue")
  },
  {
    name: "register",
    path: "/register",
    component: () => import("@/views/Register.vue")
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
