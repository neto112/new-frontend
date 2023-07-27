<template>
  <div>
    <h1>Your Cart</h1>
    <CartItemCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
    <CartSummaryPaymentCard />
  </div>
</template>

<script setup lang="ts">
import CartItemCard from "../components/cart/CartItemCard.vue";
import CartSummaryPaymentCard from "../components/cart/CartSummaryPaymentCard.vue";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();
const products = cartStore.cartItems;
</script>

