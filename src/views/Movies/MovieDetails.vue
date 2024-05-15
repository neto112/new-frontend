<template>
  <div>
    <div>
      <router-link to="/movie/tt0409591">
        <img
          src="https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
          alt="Naruto Poster"
          class="featured-img"
        />
        <div class="detail">
          <h3>Naruto</h3>
          <p>
            Naruto Uzumaki, a mischievous adolescent ninja, struggles as he
            searches for recognition and dreams of becoming the Hokage, the
            village's leader and strongest ninja.
          </p>
        </div>
      </router-link>
    </div>
    <form @submit.prevent="searchMovies()">
      <input
        type="text"
        placeholder="What are you looking for?"
        v-model="search"
      />
      <input type="submit" value="search" />
    </form>
    <div>
      <div v-for="movie in movies" :key="movie.imdbID">
        <router-link :to="'/movie/' + movie.imdbID">
          <div>
            <img :src="movie.Poster" alt="Movie Poster" />
            <div>{{ movie.Type }}</div>
          </div>
          <div>
            <p>{{ movie.Year }}</p>
            <h3>{{ movie.Title }}</h3>
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
