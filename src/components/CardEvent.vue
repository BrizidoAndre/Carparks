<script setup>
import {useRouter} from "vue-router";

const props = defineProps(['title', 'image', 'date', 'btnText'])
const emits = defineEmits(['btnPress'])
const router = useRouter();

/**
 * when the card is pressed it will go to its single view page
 */
function focus() {
  router.push({
    name: 'EventSingle',
    query: props
  })
}
</script>

<template>
  <div class="card mb-2" @click="focus">
    <img :src="'http://172.16.21.53' + image" class="card-img-top" :alt="title + '\'s image cover'" loading="lazy">
    <div class="card-body">
      <p class="card-title">{{ title }}</p>
      <p class="card-text">{{ date }}</p>
      <button class="btn btn-secondary" @click.stop="emits('btnPress')">{{ btnText }}</button>
    </div>
  </div>
</template>
