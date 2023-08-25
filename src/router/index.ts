import { createRouter, createWebHistory } from 'vue-router'
// import RouterComponent from '../components/RouterComponent.vue'
import MainComponent from '../MainComponent.vue'
import DashboardView from '../views/DashboardView.vue'
import EcommerceView from '../views/EcommerceView.vue'
import TicTacToe from '../views/Games/TicTacToe.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainComponent,
      children: [
        { path: 'dashboard', component: DashboardView },
        { path: 'ecommerce', component: EcommerceView },
        { path: 'games', component: TicTacToe },
      ]
    },
  ]
})

router.beforeEach((to, _from, next) => {
  if (to.path === "/") {
    next("/dashboard")
  } else {
    next();
  }
})

export default router
