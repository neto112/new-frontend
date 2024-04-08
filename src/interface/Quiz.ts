export interface IQuiz {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  answers: string[];
  answer: string;
  rightAnswer: boolean | null;
  key: number;
}
