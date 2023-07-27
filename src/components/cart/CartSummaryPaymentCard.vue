<template>
  <div class="cart-item">
    <h3>Cart Total: ${{ cart_total.toFixed(2) }}</h3>
    <button class="view-product-button">Pay by Credit Card</button>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../../stores/cart";

const cartStore = useCartStore();
const cart_total = cartStore.cartTotal;
</script>