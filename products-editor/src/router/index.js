import { createRouter, createWebHistory } from 'vue-router'
import ProductsList from '../views/ProductsList.vue'

const routes = [
  {
    path: '/',
    name: 'ProductsList',
    component: ProductsList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
