<template>
  <div>
    <!-- drawer init and show -->
    <header class="bg-white shadow-md">
      <div class="px-4 py-2 flex items-center">
        <button
          type="button"
          class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <Menu @click="toggleNavigation" />
        </button>
        <div class="flex-1 px-4">Seja bem vindo</div>
        <Logout />
        {{ totalItems }}
        <CartOutline v-if="totalItems === 0" />
        <Cart v-else />
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
                  >Products</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Billing</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Invoice</a
                >
              </li>
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
import { ref } from "vue";
import useComp from "./useComp";
import ViewDashboard from "vue-material-design-icons/ViewDashboard.vue";
import Cart from "vue-material-design-icons/Cart.vue";
import CartOutline from "vue-material-design-icons/CartOutline.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import Login from "vue-material-design-icons/Login.vue";
import Logout from "vue-material-design-icons/Logout.vue";
import Menu from "vue-material-design-icons/Menu.vue";

import { useCartStore } from "./stores/cart";

const cartStore = useCartStore();
const totalItems = cartStore.cartItems
  .map((i) => i.quantity)
  .reduce((a, b) => a + b, 0);

const showNagivation = ref(true);
const showEcommerce = ref(false);
const showDrawer = ref(false);

const toggleNavigation = () => {
  showNagivation.value = !showNagivation.value;
};

const toggleEcommerce = () => {
  console.log(showEcommerce.value, "teste");
  showEcommerce.value = !showEcommerce.value;
};

const toggleDrawer = () => {
  showDrawer.value = !showDrawer.value;
};

const { reuseData, reuseMethod, formatPriceValue } = useComp();
</script>

<style scoped>
.selected-icon {
  background: red;
}
</style>