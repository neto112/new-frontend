<template>
  <div class="word">
    <span class="letter" v-for="(letter, i) in letters" :key="i">
      {{ correctLetters.includes(letter) ? letter : "" }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  letters: { type: Array<string>; required: true };
  correctLetters: { type: Array<string>; default: () => [] };
}>();
</script>