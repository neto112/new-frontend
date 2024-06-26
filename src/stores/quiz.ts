import { api } from "@/api";
import type { IQuiz } from "@/interface/Quiz";
import { defineStore } from "pinia";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    quiz: [] as IQuiz[],
  }),
  actions: {
    async fetchQuiz() {
      try {
        const response = await api.getQuiz();
        let index = 0;
        const data = response.data.results;
        this.quiz = data.map((question: IQuiz) => {
          question.answers = [
            question.correct_answer,
            ...question.incorrect_answers,
          ];
          for (let i = question.incorrect_answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [question.answers[i], question.answers[j]] = [
              question.answers[j],
              question.answers[i],
            ];
          }
          question.rightAnswer = null;
          question.key = index;
          index++;
          return question;
        });
      } catch (error) {
        alert(error);
        console.error("Error fetching quiz:", error);
      }
    },
  },
});
