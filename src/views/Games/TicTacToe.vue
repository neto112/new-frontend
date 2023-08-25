<template>
  <div>
    <div
      class="text-slate-950 leading-tight min-h-screen flex items-center justify-center p-6 font-medium"
    >
      <div class="w-[30%] mx-auto" v-if="!opponent">
        <h1 class="sr-only">TicTacToe</h1>
        <img
          src="@/assets/logo.svg"
          alt="Logo"
          class="h-8 mb-8 mx-auto lg:mb-10"
        />
        <div class="box-sky bg-sky-400 rounded-2xl p-6 pb-[30px] text-center">
          <h2 class="uppercase font-bold tracking-wide mb-6">
            Pick Player 1's mark
          </h2>
          <div
            class="flex rounded-[10px] bg-white h-[72px] mb-4 p-2 lg:mb-[26px]"
          >
            <input
              type="radio"
              name="mark"
              id="X"
              value="X"
              class="hidden"
              v-model="mark"
            />
            <label
              for="X"
              class="flex-1 flex items-center justify-center rounded-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-300"
            >
              <XIcon class="w-8" />
            </label>
            <input
              type="radio"
              name="mark"
              id="O"
              value="O"
              class="hidden"
              v-model="mark"
            />
            <label
              for="O"
              class="flex-1 flex items-center justify-center rounded-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-300"
            >
              <OIcon class="w-8" />
            </label>
          </div>
          <p class="uppercase font-medium text-sm opacity-60">
            Remember: X goes first
          </p>
        </div>
        <button
          class="box-amber bg-amber-400 w-full rounded-2xl mt-8 p-[14px] pb-[22px] md:p-[17px] md:pb-[25px]"
          @click="opponent = 'cpu'"
        >
          New game (vs CPU)
        </button>
        <button
          class="box-green bg-green-600 w-full rounded-2xl mt-4 p-[14px] pb-[22px] md:p-[17px] md:pb-[25px]"
          @click="opponent = 'player'"
        >
          New game (vs Player)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import XIcon from "@/components/XIcon.vue";
import OIcon from "@/components/OIcon.vue";
import { ref } from "vue";

const opponent = ref("");
const mark = ref("O");
</script>

<style scoped>
.box-sky {
  box-shadow: inset 0px -8px 0px #178abb;
}

.box-amber {
  box-shadow: inset 0px -8px 0px #cc8b13;
}

.box-green {
  box-shadow: inset 0px -8px 0px #118c87 !important;
}

input:checked + label {
  background: #178abb;
  color: rgb(12 74 110);
}
</style>