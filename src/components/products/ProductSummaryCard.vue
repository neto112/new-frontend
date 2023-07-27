<template>
  <div class="card bg-white rounded-lg shadow-md p-4">
    <h3 class="text-xl font-semibold">{{ product.name }}</h3>
    <h5 class="text-gray-600">Price: ${{ product.price.toFixed(2) }}</h5>
    <p class="text-gray-800">Description: {{ description }}</p>
    <p class="text-gray-600">{{ product.category }}</p>
    <button
      @click="$emit('view-product', product)"
      class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      View
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps(["product"]);
const description = computed(() => props.product.description.substring(0, 150));
</script>

<style scoped>
</style>