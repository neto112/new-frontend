<template>
  <div>
    <h1>Your Cart</h1>
    <CartItemCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
    <!-- CartSummaryPaymentCard -->
    <div>
      <h3>Cart Total: ${{ cart_total.toFixed(2) }}</h3>
      <button class="view-product-button">Pay by Credit Card</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartItemCard from "../components/cart/CartItemCard.vue";
import CartSummaryPaymentCard from "../components/cart/CartSummaryPaymentCard.vue";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();
const cart_total = cartStore.cartTotal;
const products = cartStore.cartItems;
</script>

