<template>
  <button
    class="box-sky bg-sky-400 rounded-2xl aspect-square flex items-center justify-center"
    @click="emit('updateBoard', index)"
    :disabled="mark.length > 0 || isCpuPlaying"
    :class="[
      isCpuPlaying ? 'cursor-wait' : '',
      highlighted && mark === 'X' ? '!bg-teal-400 !text-black' : '',
      highlighted && mark === 'O' ? 'bg-amber-400 text-black' : '',
    ]"
  >
    <XIcon
      v-if="mark === 'X'"
      class="plain-icon w-10 md:w-14 text-black"
      :class="highlighted ? '!text-black' : ''"
    />
    <XIconOutline
      v-if="mark === '' && !isCpuPlaying && currentTurn === 'X'"
      class="outline-icon w-10 md:w-14 text-black"
      :class="highlighted ? '!text-black' : ''"
    />
    <OIcon
      v-if="mark === 'O'"
      class="plain-icon w-10 md:w-14 text-black"
      :class="highlighted ? '!text-black' : ''"
    />
    <OIconOutline
      v-if="mark === '' && !isCpuPlaying && currentTurn === 'O'"
      class="outline-icon w-10 md:w-14 text-black"
      :class="highlighted ? '!text-black' : ''"
    />
  </button>
</template>

<script lang="ts" setup>
import OIcon from "@/components/icons/OIcon.vue";
import OIconOutline from "@/components/icons/OIconOutline.vue";
import XIcon from "@/components/icons/XIcon.vue";
import XIconOutline from "@/components/icons/XIconOutline.vue";

defineProps<{
  mark: string;
  index: number;
  isCpuPlaying: boolean;
  highlighted: boolean;
  currentTurn: string;
}>();

const emit = defineEmits<{
  (e: "updateBoard", index: number): void;
}>();
</script>

<style scoped>
.box-sky {
  box-shadow: inset 0px -8px 0px #178abb;
}

.outline-icon {
  display: none;
}

button:hover .outline-icon {
  display: revert;
}
</style>
