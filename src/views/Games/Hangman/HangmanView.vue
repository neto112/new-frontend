<template>
  <div class="bg-gray-100 w-[100%] lg:w-[40%] mx-auto lg:p-8">
    <div class="text-2xl text-center font-semibold py-4">Hangman</div>
    <div class="text-center">Find the hidden word - Enter a letter</div>
    <div class="grid grid-cols-2 gap-4 p-3 pb-16 md:p-5 mx-auto">
      <div>
        <FigureView :wrong-count="wrongLetters.length" />
      </div>
      <div>
        <WrongLetters :wrong-letters="wrongLetters" />
      </div>
    </div>
    <WordView :letters="letters" :correct-letters="correctLetters" />
    <PopupView :status="status" :word="word" @reset="reset" />
    <div
      class="bg-opacity-30 lg:p-3 text-center transition-transform transform translate-y-[-50px]"
    >
      <p>You have already entered this letter</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import FigureView from "./FigureView.vue";
import PopupView from "./PopupView.vue";
import WordView from "./WordView.vue";
import WrongLetters from "./WrongLetters.vue";
import onKeydown from "@/assets/onKeydown";

const words = ["programming", "vuejs", "composition", "hangman", "english"];
const randomWord = () => words[Math.floor(Math.random() * words.length)];

const word = ref(randomWord());
const guessedLetters = ref<string[]>([]);

const letters = computed(() => word.value.split(""));

const wrongLetters = computed(() =>
  guessedLetters.value.filter((l) => !letters.value.includes(l))
);

const correctLetters = computed(() =>
  guessedLetters.value.filter((l) => letters.value.includes(l))
);

const status = computed(() => {
  if (wrongLetters.value.length === 6) {
    return "lose";
  }
  if (letters.value.every((l) => correctLetters.value.includes(l))) {
    return "win";
  }
  return "";
});

const reset = () => {
  guessedLetters.value = [];
  word.value = randomWord();
};

const notification = ref(false);
const showNotification = () => {
  notification.value = true;
  setTimeout(() => (notification.value = false), 2000);
};

onKeydown((event: KeyboardEvent) => {
  const letter = event.key.toLowerCase();
  if (event.keyCode < 65 || event.keyCode > 90) return;
  if (status.value) return;
  if (guessedLetters.value.includes(letter)) {
    showNotification();
    return;
  }
  guessedLetters.value.push(letter);
});
</script>