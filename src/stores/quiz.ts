import { api } from "@/api";
import { IQuiz } from "@/interface/Quiz";
import { defineStore } from "pinia";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    quiz: [] as IQuiz[],
  }),
  getters: {},
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
        console.log("error", this.quiz);
      } catch (error) {
        alert(error);
        console.error("Error fetching quiz:", error);
      }
    },
    persist: true,
  },
});
