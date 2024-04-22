<template>
  <div v-if="getQuiz.length > 0 && showQuiz" class="p-4 mx-auto md:w-1/2">
    <h2 class="text-2xl font-semibold mb-4">
      Question {{ currentQuestion.key + 1 }}/{{ getQuiz.length }}:
      {{ currentQuestion.question }}
    </h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
      <button
        v-for="(answer, option) in currentQuestion.answers"
        :key="option"
        class="flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mb-4 md:mb-0 lg:mb-0"
        :class="{
          'bg-blue-400 hover:bg-blue-600 cursor-not-allowed':
            currentQuestion.rightAnswer !== null,
          'text-white font-bold py-2 px-4 rounded': true,
        }"
        :disabled="currentQuestion.rightAnswer !== null"
        @click="checkAnswer(answer)"
      >
        {{ answer }}
        <IconCheck
          v-if="
            currentQuestion.rightAnswer === true && selectedAnswer === answer
          "
          class="text-green-700 ml-2 w-6 h-6 fill-current"
        />
        <IconCancel
          v-else-if="
            currentQuestion.rightAnswer === false && selectedAnswer === answer
          "
          class="text-red-700 ml-2 w-6 h-6 fill-current"
        />
      </button>
    </div>
    <button
      @click="nextQuestion"
      class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Next question
    </button>
  </div>
  <ModalView :isOpen="showModal">
    <template #description>
      <h2 class="text-xl bg font-bold mb-4">Quiz Concluído!</h2>
      <p class="text-base mb-4">
        You got {{ correctAnswersCount }} out of {{ getQuiz.length }} questions
        correct.
      </p>
      <p class="text-base mb-4">{{ getFeedbackMessage() }}</p>
    </template>
    <button
      @click="restartQuiz"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Reiniciar Quiz
    </button>
  </ModalView>
</template>

<script lang="ts" setup>
import ModalView from "@/components/ModalView.vue";
import IconCancel from "@/components/icons/IconCancel.vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import { useQuizStore } from "@/stores/quiz";
import { computed, onMounted, ref } from "vue";

const quizStore = useQuizStore();
const currentQuestionIndex = ref(0);
const showQuiz = ref(true);
const showModal = ref(false);
const selectedAnswer = ref<null | string>(null);

const getQuiz = computed(() => quizStore.quiz);

const currentQuestion = computed(
  () => getQuiz.value[currentQuestionIndex.value]
);

const checkAnswer = (answer: string) => {
  selectedAnswer.value = answer;
  currentQuestion.value.rightAnswer =
    currentQuestion.value.correct_answer === answer;
};

const nextQuestion = () => {
  selectedAnswer.value = null;
  currentQuestionIndex.value++;
  if (currentQuestionIndex.value === getQuiz.value.length) {
    showQuiz.value = false;
    showModal.value = true;
  }
};

const correctAnswersCount = computed(() => {
  return getQuiz.value.filter((question) => question.rightAnswer === true)
    .length;
});

const getFeedbackMessage = () => {
  const correctCount = correctAnswersCount.value;
  if (correctCount === 10) {
    return "Congratulations! You got all the questions right!";
  } else if (correctCount >= 7) {
    return "You did well";
  } else {
    return "You need to improve more";
  }
};

const restartQuiz = () => {
  currentQuestionIndex.value = 0;
  showQuiz.value = true;
  showModal.value = false;
};

onMounted(async () => {
  await quizStore.fetchQuiz();
});
</script>
