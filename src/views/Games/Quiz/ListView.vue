<template>
  <div v-if="quizStore.quiz.length > 0" class="p-4 mx-auto w-1/2">
    <h2 class="text-2xl font-semibold mb-4">
      Pergunta: {{ currentQuestion.question }}
    </h2>
    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="(answer, option) in currentQuestion.answers"
        :key="option"
        class="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        :class="{
          'bg-blue-500 hover:bg-blue-700': currentQuestion.rightAnswer === true,
          'bg-gray-500 cursor-not-allowed':
            currentQuestion.rightAnswer === false,
          'text-white font-bold py-2 px-4 rounded': true,
        }"
        :disabled="currentQuestion.rightAnswer !== null"
        @click="checkAnswer(answer)"
      >
        {{ answer }}
        <IconCheck
          v-if="currentQuestion.rightAnswer === true"
          class="text-green-500 w-6 h-6 fill-current"
        />
        <IconCancel
          v-else-if="!currentQuestion.rightAnswer === false"
          class="text-red-500 w-6 h-6 fill-current"
        />
      </button>
    </div>
    <button
      @click="nextQuestion"
      class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Próxima pergunta
    </button>
  </div>
</template>

<script lang="ts" setup>
import { IQuiz } from "@/interface/Quiz";
import { useQuizStore } from "@/stores/quiz";
import { computed, onMounted, ref } from "vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconCancel from "@/components/icons/IconCancel.vue";

const quizStore = useQuizStore();
const currentQuestion = ref<IQuiz>({});
const showResult = ref(false);

const getQuiz = computed(() => {
  return quizStore.quiz;
});

const checkAnswer = (answer: IQuiz) => {
  showResult.value = true;
  currentQuestion.value.rightAnswer =
    currentQuestion.value.correct_answer === answer;
};

onMounted(async () => {
  await quizStore.fetchQuiz();
  currentQuestion.value = getQuiz.value[0];
});
</script>
