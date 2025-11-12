<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import CardPark from "@/components/CardPark.vue";
import {get} from "@/utils.js";

const route = useRoute();
</script>

<template>
  <router-link to="/events" class="btn btn-primary mb-2">Go back</router-link>
  <div class="card mb-2">
    <img :src="'http://172.16.21.53' + route.query.image" class="card-img-top"
         :alt="route.query.title + '\'s image cover'">
    <div class="card-body">
      <p class="card-title">{{ route.query.title }}</p>
      <p class="card-text">{{ route.query.date }}</p>
    </div>
  </div>
</template>
