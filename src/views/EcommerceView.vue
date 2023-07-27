<template>
  <div>
    <ProductDescriptionDrawer
      :product="product"
      :active="active.product_drawer"
      v-on:close-product-drawer="closeProductDrawer()"
    />
    <div class="flex flex-wrap justify-center">olá</div>
    <ProductSummaryCard
      v-for="product in items"
      :key="product"
      :product="product"
      v-on:view-product="viewProduct($event)"
    />
  </div>
</template>

<script setup lang="ts">
import items from "../data/cart";
import { ref, Ref } from "vue";
import { Product } from "../interface/Product";
import ProductDescriptionDrawer from "../components/products/ProductDescriptionDrawer.vue";
import ProductSummaryCard from "../components/products/ProductSummaryCard.vue";

const product: Ref<Product | null> = ref(null);
const active: Ref<{ product_drawer: boolean }> = ref({ product_drawer: false });

function viewProduct(item: Product) {
  product.value = item;
  active.value.product_drawer = true;
}

function closeProductDrawer() {
  active.value.product_drawer = false;
}
</script>