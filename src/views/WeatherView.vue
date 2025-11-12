<script setup>
import {onMounted, ref} from "vue";
import {get, siteConfig} from "@/utils.js";
import CardWeather from "@/components/CardWeather.vue";

const weathers = ref([]);

/**
 * load weather from the api
 * @returns {Promise<void>}
 */
async function loadWeathers() {
  const res = await get('/weather.json');
  const data = await res.json();
  weathers.value = data;
}

/**
 * get weather when page is loaded
 */
onMounted(() => {
  loadWeathers();
})
</script>

<template>
  <div class="container-weather" v-if="!siteConfig.listFormat">
    <CardWeather
        class="my-2 card-weather"
        v-for="weather in weathers"
        v-bind="weather"
    />
  </div>
  <table v-else class="table">
    <thead>
    <tr>
      <th>Date</th>
      <th>Status</th>
      <th>Place</th>
      <th>Min</th>
      <th>Max</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="weather in weathers"
    >
      <td>{{weather.date}}</td>
      <td>{{weather.status}}</td>
      <td>{{weather.location}}</td>
      <td>{{weather.lower_temperature}}</td>
      <td>{{ weather.upper_temperature}}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
@media (orientation: landscape) {
  .container-weather {
    display: flex;
    gap: .5rem;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
  }

  .card-weather {
    min-width: 100%;
    scroll-snap-align: center;
  }
}
</style>
