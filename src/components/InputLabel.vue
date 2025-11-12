<script setup>

import {useId} from "vue";
// by default the input type is text
const props = defineProps({
  'type': {
    default: 'text'
  }
})
const id = useId();
const model = defineModel();
</script>

<template>
  <div class="mb-3">
    <label :for="id" class="form-label">
      <slot></slot>
    </label>
    <input :type="type" class="form-control" :id="id" v-model="model">
  </div>
</template>
