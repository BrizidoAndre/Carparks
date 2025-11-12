<script setup>
import Rainy from "@/components/Rainy.vue";
import Sunny from "@/components/Sunny.vue";
import Cloudy from "@/components/Cloudy.vue";

const props = defineProps(['location', 'date', 'status', 'lower_temperature', 'upper_temperature'])
// themes object to select the icon based on the current status
const themes = {
  'Rainy': Rainy,
  'Sunny': Sunny,
  'Cloudy': Cloudy
}
</script>

<template>
  <div class="card text-center">
    <div class="card-header">
      {{ date }}
    </div>
    <div class="card-body">
      <component :is="themes[status]"></component>
      <p class="card-title">{{ location }}</p>
      <p class="card-text">{{ lower_temperature }}º - {{ upper_temperature }}º</p>
    </div>
    <div class="card-footer text-body-secondary">
      {{ status }}
    </div>
  </div>
</template>

<style scoped>
.card:hover {
  animation: stroke 2s linear 1;
}

@keyframes stroke {
  from {
    stroke-dashoffset: 200;
    stroke-dasharray: 50;
  }
  to {
    stroke-dashoffset: 0;
    stroke-dasharray: 200;
  }
}
</style>
