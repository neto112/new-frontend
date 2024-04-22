<template>
  <div class="text-center pb-12">
    <template v-for="(letter, i) in letters" :key="i">
      <span
        class="border-b-2 border-blue-500 text-3xl w-5 h-8 text-center inline-block mx-1"
      >
        {{ correctLetters.includes(letter) ? letter : "" }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  letters: { type: Array<string>; required: true };
  correctLetters: { type: Array<string>; default: () => [] };
}>();
</script>
