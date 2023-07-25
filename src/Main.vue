<template>
  <div
    :class="{
      fixed: true,
      'top-0': true,
      'left-0': true,
      'h-screen': true,
      'w-full': true,
      'bg-primary': true,
      'p-3': true,
    }"
  >
    <div>UAHEIUAHEUIAHEIUAHEIUAHEUI</div>
    <div>
      <h1>This component uses Component API.</h1>
      <h2>Reusable data {{ reuseData }}</h2>
      <h2>Calling the reusable method {{ reuseMethod() }}</h2>
      <div>{{ formatPriceValue(50000) }}</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import useComp from "./useComp";

export default {
  setup() {
    const { reuseData, reuseMethod, formatPriceValue } = useComp();
    return { reuseData, reuseMethod, formatPriceValue };
  },
};
</script>

<style scoped>
.selected-icon {
  background: red;
}
</style>