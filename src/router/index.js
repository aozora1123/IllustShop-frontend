import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/components/IndexPage.vue'
import NotFound from '@/components/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    alias: '/index',
    component: IndexPage,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "product" */ '@/components/ProductPage.vue'),
    children: [
      {
        path: ':category',
        component: () => import(/* webpackChunkName: "product" */ '@/components/SelectProduct.vue'),
      },
    ],
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "account" */ '@/components/RegisterPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "account" */ '@/components/LoginPage.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    meta: { requiresAuth: true }, // 須登入才可存取
    component: () => import(/* webpackChunkName: "account" */ '@/components/UserCart.vue'),
  },
  {
    // 非指定的路由位址，皆對應到NotFound
    path: '/:pathMatch(.*)*', // will match everything and put it under `$route.params.pathMatch`
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 設定Navigation Guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      // 使用者已登入
      next();
    } else {
      // 使用者未登入，導向登入頁面
      next('/login');
    }
  } else {
    // 不需要驗證的路由
    next();
  }
});


export default router
