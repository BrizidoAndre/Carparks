<script setup>
import {useId} from "vue";

const id = useId();
const model = defineModel();
const props = defineProps(['value', 'name'])
</script>

<template>
  <div class="form-check">
    <input class="form-check-input" type="radio" :value="value" :name="name" :id="id" v-model="model">
    <label class="form-check-label" :for="id">
      <slot></slot>
    </label>
  </div>
</template>
