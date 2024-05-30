import { api } from "@/api";
import type { IMovies } from "@/interface/Movies";
import { defineStore } from "pinia";

export const useMoviesStore = defineStore({
  id: "movies",
  state: () => ({
    movie: {} as IMovies,
    movies: [] as IMovies[],
  }),
  actions: {
    async getMovieById(id: number) {
      try {
        const response = await api.getMovieById(id);
        this.movie = response.data
      } catch (error) {
        alert(error);
        console.error("Error fetching movie:", error)
      }
    },
    async getSearchMovies(search: string) {
      try {
        const response = await api.getSearchMovies(search);
        this.movies = response.data.Search
      } catch (error) {
        alert(error);
        console.log("Error fetching search movies:", error)
      }
    },
  },
});
