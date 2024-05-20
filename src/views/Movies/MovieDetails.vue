<template>
  <div class="bg-gray-600 h-full min-h-screen">
    <div class="mb-8 relative">
      <router-link to="/movie/tt0409591">
        <img
          src="https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
          alt="Naruto Poster"
          class="w-full h-80 object-cover relative z-0"
        />
        <div
          class="absolute left-0 right-0 bottom-0 p-4 z-10 backdrop-brightness-50"
        >
          <h2 class="text 2xl font-bold mb-2 text-white">Naruto</h2>
          <p class="text-white">
            Naruto Uzumaki, a mischievous adolescent ninja, struggles as he
            searches for recognition and dreams of becoming the Hokage, the
            village's leader and strongest ninja.
          </p>
        </div>
      </router-link>
    </div>
    <div class="mb-8">
      <form @submit.prevent="searchMovies" class="text-center">
        <input
          type="text"
          placeholder="What are you looking for?"
          v-model="search"
          class="bg-gray-500 placeholder:text-white w-full md:w-3/4 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 focus:bg-white"
        />
        <button
          type="submit"
          class="ml-3 px-8 py-2 bg-green-500 text-white rounded-r focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>
    </div>
    <div class="p-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="movie in movies"
        :key="movie.imdbID"
        class="bg-gray-500 rounded shadow relative"
      >
        <router-link :to="'/movie/' + movie.imdbID">
          <div class="relative">
            <img
              :src="movie.Poster"
              alt="Movie Poster"
              class="w-full h-80 mb-2"
            />
            <div class="capitalize absolute bottom-5 left-0 bg-green-500 text-white p-2">{{ movie.Type }}</div>
          </div>
          <div class="p-2 text-white">
            <p>{{ movie.Year }}</p>
            <h3 class="font-bold">{{ movie.Title }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const search = ref("");
const movies = ref([]);

const searchMovies = () => {
  if (search.value !== "") {
    fetch(`http://www.omdbapi.com/?apikey=77495f55&s=${search.value}`)
      .then((res) => res.json())
      .then((data) => {
        movies.value = data.Search;
        search.value = "";
      });
  }
};
</script>
