<template>
  <div>
    <div>
      <p v-show="wrongLetters.length > 0" class="text-red-500 font-semibold">
        Wrong
      </p>
      <span
        v-for="(letter, i) in wrongLetters"
        :key="i"
        class="inline-block bg-red-200 mx-1 px-2 py-1 rounded-lg text-red-800 font-medium"
      >
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  wrongLetters: { type: Array<string>; default: () => [] };
}>();
</script>
