<template>
  <div
    v-if="finalMessage"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="bg-blue-500 rounded-lg shadow-lg p-6">
      <h2 class="text-white text-2xl">{{ finalMessage }}</h2>
      <h3 v-show="status === 'lose'" class="text-white">
        ...the word was: {{ word }}
      </h3>
      <button
        @click="reset"
        class="bg-white text-blue-500 rounded-lg px-4 py-2 mt-4 text-lg font-semibold hover:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Play Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  status: { type: String, default: "" },
  word: { type: String, default: "" },
});

const emits = defineEmits(["reset"]);

const finalMessage = computed(() => {
  if (props.status === "win") return "Congratulations! You won! 😃";
  if (props.status === "lose") return "Unfortunately you lost. 😕";
  return "";
});

const reset = () => emits("reset");
</script>
