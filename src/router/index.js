import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/addproduct',
    name: 'addProduct',
    component: () => import(/* webpackChunkName: "about" */ '../views/addProduct.vue')
  },
  {
    path: '/product',
    name: 'AllProduct',
    component: () => import(/* webpackChunkName: "about" */ '../views/AllProduct.vue')
  },
  {
    path: '/detail/:id',
    name: 'DetailPesanan',
    component: () => import(/* webpackChunkName: "about" */ '../views/DetailPesanan.vue')
  },
  {
    path: '/keranjang',
    name: 'CartPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/CartPage.vue')
  },
  {
    path: '/sukses-pesan',
    name: 'SuksesPesan',
    component: () => import(/* webpackChunkName: "about" */ '../views/SuksesPesan.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
