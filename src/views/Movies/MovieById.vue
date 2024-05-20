<template>
  <div class="-mt-10 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-4xl mx-auto p-6 bg-green-300 rounded shadow-lg">
      <div class="flex flex-col lg:flex-row">
        <img
          :src="movie.Poster"
          alt="Movie Poster"
          class="w-full lg:w-1/3 rounded mb-4 lg:mb-0"
        />
        <div class="lg:ml-4 flex-1">
          <h1 class="text-3xl font-bold mb-2">{{ movie.Title }}</h1>
          <p class="text-gray-700 mb-1">
            <strong>Year:</strong> {{ movie.Year }}
          </p>
          <p class="text-gray-700 mb-1">
            <strong>Rated:</strong> {{ movie.Rated }}
          </p>
          <p class="text-gray-700 mb-1">
            <strong>Released:</strong> {{ movie.Released }}
          </p>
          <p class="text-gray-700 mb-1">
            <strong>Runtime:</strong> {{ movie.Runtime }}
          </p>
          <p class="text-gray-700 mb-1">
            <strong>Genre:</strong> {{ movie.Genre }}
          </p>
          <p class="text-gray-700 mb-1">
            <strong>Director:</strong> {{ movie.Director }}
          </p>
          <p class="text-gray-700 mb-1">
            <strong>Writer:</strong> {{ movie.Writer }}
          </p>
          <p class="text-gray-700 mb-1">
            <strong>Actors:</strong> {{ movie.Actors }}
          </p>
          <p class="text-gray-700 mb-1">
            <strong>Language:</strong> {{ movie.Language }}
          </p>
          <p class="text-gray-700 mb-1">
            <strong>Country:</strong> {{ movie.Country }}
          </p>
          <p class="text-gray-700 mb-1">
            <strong>IMDb Rating:</strong> {{ movie.imdbRating }} ({{
              movie.imdbVotes
            }}
            votes)
          </p>
          <p class="text-gray-700 mb-1">
            <strong>Plot:</strong> {{ movie.Plot }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const movie = ref({});
const route = useRoute();

onBeforeMount(() => {
  fetch(
    `http://www.omdbapi.com/?apikey=77495f55&i=${route.params.id}&plot=full`
  )
    .then((res) => res.json())
    .then((data) => {
      movie.value = data;
    });
});
</script>
