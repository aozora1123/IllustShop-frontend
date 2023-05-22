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

export default router
