import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import Home from '@/views/layout/home'
import Cart from '@/views/layout/cart'
import Category from '@/views/layout/category'
import User from '@/views/layout/user'

import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/cart', component: Cart },
        { path: '/category', component: Category },
        { path: '/user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    // 查看商品详情页，需要传递商品id
    { path: '/searchlist', component: SearchList },
    { path: '/search', component: Search },
    { path: '/prodetail/:id', component: ProDetail }
  ]
})

const authUrl = ['/pay', '/myoder']
// 全局前置导航路由守卫
router.beforeEach((to, from, next) => {
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  // 有token则放行权限页面，没有则跳回至登录界面
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
