<script setup>
import {useRoute, useRouter} from "vue-router";

const props = defineProps(['availableSpaces', 'latitude', 'longitude', 'location', 'name', 'distance', 'btnText'])
const emits = defineEmits(['btnPress'])

const router = useRouter();

/**
 * when the card is pressed it will go to its single view page
 */
function focus(distance, name) {
  router.push({
    name: 'ParkSingle',
    query: {
      distance, name
    }
  })
}
</script>

<template>
  <div class="card" @click="focus(distance, name)">
    <div class="card-body">
      <p class="card-title">{{ name }}</p>
      <p class="card-subtitle mb-2 text-body-secondary">{{ location }}</p>
      <p class="card-text">Distance: {{ distance }}km</p>
      <p class="card-text">Available Spaces: {{ availableSpaces }}</p>
      <button class="btn btn-secondary" @click.stop="emits('btnPress')">{{ btnText }}</button>
    </div>
  </div>
</template>
