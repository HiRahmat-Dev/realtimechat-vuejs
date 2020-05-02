import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../views/Chat.vue'
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
