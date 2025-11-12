<script setup>

import Checkbox from "@/components/Checkbox.vue";
import {siteConfig} from "@/utils.js";
import Radio from "@/components/Radio.vue";
</script>

<template>
  <p>Reload the page if you want to follow the system's theme</p>
  <Checkbox
      v-model="siteConfig.darkTheme"
  >
    Dark theme
  </Checkbox>
  <Checkbox
      v-model="siteConfig.listFormat"
  >
    List format
  </Checkbox>
  <Checkbox
      v-model="siteConfig.ascending"
  >
    Ascending order
  </Checkbox>
  <Radio
      v-model="siteConfig.sortType"
      name="sort"
      value="name"
  >
    Name
  </Radio>
  <Radio
      v-model="siteConfig.sortType"
      name="sort"
      value="distance"
  >
    Distance
  </Radio>
  <Radio
      v-model="siteConfig.sortType"
      name="sort"
      value="availableSpaces"
  >
    Available Spaces
  </Radio>
</template>
