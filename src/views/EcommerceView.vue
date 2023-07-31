<template>
  <div>
    <img src="@/assets/img/home-cart.png" alt="HomeCart" style="width: 100%" />
    <div class="grid grid-cols-2 m-4 w-[70%] mx-auto">
      <div
        class="bg-gray-200 rounded-lg shadow-md p-4 m-2 grid grid-cols-5"
        v-for="product in items"
        :key="product"
      >
        <div class="col-span-4">
          <h3 class="text-xl font-semibold">{{ product.name }}</h3>
          <h5 class="text-gray-600">Price: ${{ product.price.toFixed(2) }}</h5>
          <p class="text-gray-800">
            Description: {{ product.description.substring(0, 150) }}
          </p>
          <p class="text-gray-600">{{ product.category }}</p>
        </div>

        <div class="flex row-auto justify-self-end self-center">
          <MinusCircle
            class="cursor-pointer text-blue-600"
            @click="removeFromCart(product)"
          />
          <h4 class="px-1">{{ productTotal(product) }}</h4>
          <PlusCircle
            class="cursor-pointer text-blue-600"
            @click="addToCart(product)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import items from "../data/cart";
import { Product } from "../interface/Product";
import ProductDescriptionDrawer from "../components/products/ProductDescriptionDrawer.vue";
import { useCartStore } from "@/stores/cart";
import MinusCircle from "vue-material-design-icons/MinusCircle.vue";
import PlusCircle from "vue-material-design-icons/PlusCircle.vue";

const cartStore = useCartStore();

const addToCart = (product: Product) => {
  return cartStore.addToCart(product);
};

const removeFromCart = (product: Product) => {
  return cartStore.removeFromCart(product);
};

const productTotal = (product: Product) => {
  const item = cartStore.productQuantity(product);
  if (!item) {
    return 0;
  }
  return item;
};
</script>

<style scoped>
</style>