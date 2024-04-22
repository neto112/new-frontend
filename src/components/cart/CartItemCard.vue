<template>
  <div class="bg-white shadow-gray p-10 rounded-md text-left">
    <div class="flex justify-between">
      <h3>{{ product.name }}</h3>
      <h4>In Cart: {{ product.quantity }}</h4>
      <h4>Total Cost: {{ item_cost.toFixed(2) }}</h4>
    </div>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["product"]);

const description = computed(() => props.product.description.substring(0, 120));
const item_cost = computed(() => props.product.price * props.product.quantity);
</script>
