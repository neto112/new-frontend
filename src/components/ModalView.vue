<template>
  <div>
    <div v-if="isOpen" class="fixed inset-0 flex bg-[rgba(0,0,0,0.5)]">
      <div
        :style="{ height: dialogHeight, width: dialogWidth }"
        class="bg-semi-dark-navy m-auto text-center flex flex-col justify-center gap-4"
      >
        <!-- Modal content -->
        <div class="p-8 relative bg-white shadow dark:bg-gray-700">
          <!-- Modal header -->
          <h3 v-if="title" class="uppercase font-bold text-sm md:text-base">
            {{ title }}
          </h3>
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
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: "" },
  dialogHeight: { type: String, default: "auto" }, // Padrão para altura
  dialogWidth: { type: String, default: "auto" }, // Padrão para largura
});

const { isOpen, title, dialogHeight, dialogWidth } = toRefs(props);
</script>
