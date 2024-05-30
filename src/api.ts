import axios from "axios";
import env from "./env";

export const api = {
  async getQuiz() {
    return axios.get("https://opentdb.com/api.php?amount=10&category=9");
  },
  async getMovieById(id: number) {
    return axios.get(
      `https://www.omdbapi.com/?apikey=${env.api_key_movie}&i=${id}&plot=full`
    );
  },
  async getSearchMovies(search: string) {
    return axios.get(
      `http://www.omdbapi.com/?apikey=${env.api_key_movie}&s=${search}`
    );
  },
};
