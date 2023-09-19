<template>
  <div v-if="finalMessage" class="popup-container" id="popup-container">
    <div class="popup">
      <h2>{{ finalMessage }}</h2>
      <h3 v-show="status === 'lose'">...the word was: {{ word }}</h3>
      <button @click="reset">Play Again</button>
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