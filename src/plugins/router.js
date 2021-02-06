import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: 'build',
    meta: {
      title: '正在加载'
    }
  },
  {
    path: '/build',
    name: 'build',
    component: () => import('../views/build.vue')
  },
  {
    path: '/middle',
    name: 'middle',
    component: () => import('../views/middle.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
