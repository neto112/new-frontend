<template>
  <div v-if="isOpen" class="fixed inset-0 flex bg-[rgba(0,0,0,0.5)]">
    <div
      :style="{ height: dialogHeight, width: dialogWidth }"
      class="bg-semi-dark-navy m-auto text-center flex flex-col justify-center gap-4"
    >
      <!-- Modal content -->
      <div class="mx-2 p-8 relative bg-white shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex justify-between items-center">
          <h3 v-if="title" class="uppercase font-bold text-sm md:text-base">
            {{ title }}
          </h3>
          <button
            v-if="isClose"
            @click="resetModal"
            class="bg-white text-blue-500 rounded-lg p-2 text-lg font-semibold hover:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <Close />
          </button>
        </div>
        <!-- Modal body -->
        <div class="text-2xl md:text-[40px] uppercase font-bold">
          <slot name="description"></slot>
        </div>
        <div class="mt-2">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, toRefs } from "vue";
import Close from "vue-material-design-icons/Close.vue";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: "" },
  dialogHeight: { type: String, default: "auto" }, // Default for height
  dialogWidth: { type: String, default: "auto" }, // Default for width
  isClose: { type: Boolean, default: false },
});

const { isOpen, title, dialogHeight, dialogWidth } = toRefs(props);

const emits = defineEmits(["close"]);
const resetModal = () => emits("close");
</script>
