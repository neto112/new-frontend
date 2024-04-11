<template>
  <div>
    <!-- drawer init and show -->
    <header class="bg-white shadow-md p-2 w-full sticky top-0 z-10">
      <div class="items-center justify-between flex">
        <ul class="flex items-center">
          <li>
            <button
              type="button"
              class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <Menu @click="toggleNavigation" />
            </button>
          </li>
          <li>
            <div class="flex-1 px-4">Welcome</div>
          </li>
        </ul>
        <ul class="flex space-x-2 items-center">
          <li class="relative">
            <div>
              <button
                @click="toggleLanguage"
                class="relative inline-flex items-center px-2.5 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <Translate class="mr-2" />
                <span v-if="i18n.global.locale === 'en-US'">🇺🇸</span>
                <span v-else-if="i18n.global.locale === 'pt-BR'">🇧🇷</span>
                <span v-else>🇪🇸</span>
              </button>
            </div>

            <ul
              v-show="showLanguageMenu"
              class="absolute z-10 top-full left-0 mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg"
            >
              <li v-for="language in languages" :key="language.code">
                <button
                  @click="changeLanguage(language.code)"
                  class="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <span class="mr-2">{{ language.flag }}</span>
                  <span>{{ language.name }}</span>
                </button>
              </li>
            </ul>
          </li>
          <li>
            <ProductDescriptionDrawer />
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </div>
    </header>

    <!-- drawer component -->
    <div
      v-show="showNagivation"
      class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-gray-50 w-80 dark:bg-gray-800"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <h5
        id="drawer-navigation-label"
        class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        Menu
      </h5>
      <button
        type="button"
        @click="showNagivation = false"
        data-drawer-hide="drawer-navigation"
        aria-controls="drawer-navigation"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <div class="py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
          <li>
            <a
              href="/dashboard"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <ViewDashboard />
              <span class="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <button
              @click="toggleGames"
              type="button"
              class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <Controller class="text-blue-500" />
              <span class="flex-1 ml-3 text-left whitespace-nowrap"
                >Games
              </span>
              <ChevronDown />
            </button>
            <ul id="dropdown-example" class="py-2 space-y-2" v-show="showGames">
              <li>
                <a
                  href="/games/tictactoe"
                  class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >TicTacToe
                </a>
              </li>
              <li>
                <a
                  href="/games/quiz"
                  class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Quiz
                </a>
              </li>
              <li>
                <a
                  href="/games/hangman"
                  class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Hangman
                </a>
              </li>
              <li>
                <a
                  href="/games/peg-solitaire"
                  class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Peg Solitaire
                </a>
              </li>
            </ul>
          </li>

          <li>
            <button
              @click="toggleEcommerce"
              type="button"
              class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <Cart class="text-red-500" />
              <span class="flex-1 ml-3 text-left whitespace-nowrap"
                >E-commerce
              </span>
              <ChevronDown />
            </button>
            <ul
              id="dropdown-example"
              class="py-2 space-y-2"
              v-show="showEcommerce"
            >
              <li>
                <a
                  href="/ecommerce"
                  class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Products
                </a>
              </li>
              <!-- <li>
                <a
                  href="#"
                  class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Billing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Invoice
                </a>
              </li> -->
            </ul>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <Login />
              <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <Logout />
              <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import i18n from "@/locales";
import { ref } from "vue";
import Cart from "vue-material-design-icons/Cart.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import Controller from "vue-material-design-icons/Controller.vue";
import Login from "vue-material-design-icons/Login.vue";
import Logout from "vue-material-design-icons/Logout.vue";
import Menu from "vue-material-design-icons/Menu.vue";
import Translate from "vue-material-design-icons/Translate.vue";
import ViewDashboard from "vue-material-design-icons/ViewDashboard.vue";
import ProductDescriptionDrawer from "./components/cart/ProductDescriptionDrawer.vue";

const showNagivation = ref(false);
const showEcommerce = ref(false);
const showGames = ref(false);
const showLanguageMenu = ref(false);
const languages = ref([
  { code: "en-EN", flag: "🇺🇸", name: "English" },
  { code: "pt-BR", flag: "🇧🇷", name: "Português" },
  { code: "es-ES", flag: "🇪🇸", name: "Spain" },
]);

const toggleNavigation = () => {
  showNagivation.value = !showNagivation.value;
};

const toggleEcommerce = () => {
  showEcommerce.value = !showEcommerce.value;
};

const toggleGames = () => {
  showGames.value = !showGames.value;
};

const changeLanguage = (code: string) => {
  i18n.global.locale = code as "pt-BR" | "es-ES" | "en-US";
  showLanguageMenu.value = false;
};

const toggleLanguage = () => {
  showLanguageMenu.value = !showLanguageMenu.value;
};
</script>
