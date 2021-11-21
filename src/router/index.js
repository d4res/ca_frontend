import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import test from '../views/test.vue'
import request from '../components/request.vue'
import revoke from '../components/revoke.vue'
import download from '../components/download.vue'
import verify from '../components/verify.vue'
import info from '../components/info.vue'
import userinfo from '../components/userinfo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'request',
        name: 'request',
        component: request
      },
      {
        path: 'download',
        name: 'download',
        component: download
      },
      {
        path: 'revoke',
        name: 'revoke',
        component: revoke
      },
      {
        path: 'verify',
        name: 'verify',
        component: verify
      },
      {
        path: 'info',
        name: 'info',
        component: info
      },
      {
        path: 'userinfo',
        name: 'userinfo',
        component: userinfo
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
