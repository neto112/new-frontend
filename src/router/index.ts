import { createRouter, createWebHistory } from 'vue-router'
// import RouterComponent from '../components/RouterComponent.vue'
import MainComponent from '../MainComponent.vue'
import DashboardView from '../views/DashboardView.vue'
import EcommerceView from '../views/EcommerceView.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainComponent,
      children: [
        { path: 'dashboard', component: DashboardView },
        { path: 'ecommerce', component: EcommerceView },
      ]
    },
  ]
})

export default router
