<template>
  <CartOutline v-if="totalItems === 0" />
  <!-- PRODUCT DESCRIPTION DRAWER -->
  <!-- Modal toggle -->
  <button
    v-else
    type="button"
    @click="viewProduct"
    class="relative inline-flex items-center px-2.5 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <Cart />
    <div
      class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900"
    >
      {{ totalItems }}
    </div>
  </button>

  <!-- Main modal -->
  <div
    v-if="showCart"
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="w-[60%] max-h-[32rem] mx-auto overflow-y-auto rounded-lg">
      <!-- Modal content -->
      <div class="relative bg-white shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Your Cart
          </h3>
          <button
            type="button"
            class="text-blue-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="showCart = false"
          >
            <Close />
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 grid grid-cols-4">
          <div class="col-span-3">
            <div
              v-for="product in cartStore.cartItems"
              :key="product.id"
              class="p-4 m-2 shadow-xl rounded-xl bg-gray-100"
            >
              <div
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {{ product.name }}
              </div>
              <div class="font-normal text-lg text-gray-500 dark:text-gray-400">
                Category: {{ product.category }}
              </div>
              <p>{{ product.description }}</p>
              <h3 class="mt-4">${{ product.price.toFixed(2) }}</h3>
              <div class="flex items-center">
                <p>
                  Quantity: <b>{{ product.quantity }}</b>
                </p>
                <button
                  class="rounded-lg ml-2 p-1 px-2 text-white bg-red-600"
                  @click="removeAllQuantityFromCart(product)"
                >
                  <TrashCan />
                </button>
              </div>
            </div>
          </div>
          <div class="p-4 text-center col-span-1">
            <h4>Cart total: ${{ cartStore.cartTotal.toFixed(2) }}</h4>
            <button
              class="text-white text-sm rounded-lg px-5 py-2.5 bg-blue-700 hover:bg-blue-950 focus:ring-4"
            >
              Pay by Credit Card
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useCartStore } from "../../stores/cart";
import Cart from "vue-material-design-icons/Cart.vue";
import CartOutline from "vue-material-design-icons/CartOutline.vue";
import Close from "vue-material-design-icons/Close.vue";
import TrashCan from "vue-material-design-icons/TrashCan.vue";
import { Product } from "../../interface/Product";

const showCart = ref(false);

const cartStore = useCartStore();
const totalItems = computed(() => {
  return cartStore.cartItems.reduce((total, item) => total + item.quantity, 0);
});

const removeAllQuantityFromCart = (product: Product) => {
  return cartStore.removeAllQuantityFromCart(product);
};

function viewProduct() {
  showCart.value = true;
}
</script>