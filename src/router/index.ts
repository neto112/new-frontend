import MovieById from "@/views/Movies/MovieById.vue";
import MovieDetails from "@/views/Movies/MovieDetails.vue";
import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "../MainComponent.vue";
import RouterComponent from "../components/RouterComponent.vue";
import DashboardView from "../views/DashboardView.vue";
import EcommerceView from "../views/EcommerceView.vue";
import HangmanView from "../views/Games/Hangman/HangmanView.vue";
import PegSolitaire from "../views/Games/PegSolitaire/PegSolitaire.vue";
import ListView from "../views/Games/Quiz/ListView.vue";
import TicTacToe from "../views/Games/TicTacToe/TicTacToe.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainComponent,
      children: [
        { path: "dashboard", component: DashboardView },
        { path: "ecommerce", component: EcommerceView },
        {
          path: "games",
          component: RouterComponent,
          children: [
            { path: "quiz", component: ListView },
            { path: "tictactoe", component: TicTacToe },
            { path: "hangman", component: HangmanView },
            { path: "peg-solitaire", component: PegSolitaire },
          ],
        },
        {
          path: "movie",
          component: RouterComponent,
          children: [
            { path: "", component: MovieDetails },
            { path: ":id", component: MovieById },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, _from, next) => {
  if (to.path === "/") {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
