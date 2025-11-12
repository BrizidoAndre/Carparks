<script setup>
import {useId} from "vue";

const id = useId();
const model = defineModel();
</script>

<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" :id="id" v-model="model">
    <label class="form-check-label" :for="id">
      <slot></slot>
    </label>
  </div>
</template>
