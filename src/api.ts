import axios from 'axios'

export const api = {
  async getQuiz() {
    return axios.get('https://opentdb.com/api.php?amount=10&category=9')
  },
}