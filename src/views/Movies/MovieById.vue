<template>
  <div class="movie-detail">
    <h2>{{ movie.Title }}</h2>
    <p>{{ movie.Year }}</p>
    <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
    <p>{{ movie.Plot }}</p>
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
