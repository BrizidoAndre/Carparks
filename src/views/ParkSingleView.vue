<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import CardPark from "@/components/CardPark.vue";
import {get} from "@/utils.js";

const park = ref();
const route = useRoute();

/**
 * get carparks in this view to always get the correct result
 * @returns {Promise<void>}
 */
async function loadParks() {
  const res = await get('/carparks.json');
  const data = await res.json();
  park.value = data[route.query.name];
}

/**
 * get parks when page is loaded
 */
onMounted(() => {
  loadParks()
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <p class="card-title">{{ route?.query?.name }}</p>
      <p class="card-subtitle mb-2 text-body-secondary">{{ park?.location }}</p>
      <p class="card-text">Distance: {{ route?.query?.distance }}km</p>
      <p class="card-text">Available Spaces: {{ park?.availableSpaces }}</p>
    </div>
    <div class="card-footer">
      <RouterLink class="btn btn-primary" to="/">Go back</RouterLink>
    </div>
  </div>
</template>
