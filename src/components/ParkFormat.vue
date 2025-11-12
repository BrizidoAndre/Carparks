<script setup>
import CardPark from "@/components/CardPark.vue";
import {siteConfig} from "@/utils.js";

const props = defineProps(['parks', 'fixedParks'])
const emits = defineEmits(['fixPark', 'unfixPark'])
</script>

<template>
<!--  show cards if list format is false-->
  <div v-if="!siteConfig.listFormat">
    <CardPark
        class="mb-2"
        v-for="(park, i) in fixedParks"
        v-bind="park"
        @btn-press="emits('unfixPark', i, park)"
        btn-text="Unfix me"
    />
    <CardPark
        class="mb-2"
        v-for="park in parks"
        v-bind="park"
        @btn-press="emits('fixPark',park)"
        btn-text="Fix me"
    />
  </div>
<!--  show table if list foramt is true-->
  <div v-else>
    <p>*If you want to fix or unfix, please use the card format</p>
    <table class="table">
      <thead>
      <tr
      >
        <th>Name</th>
        <th>Spaces</th>
        <th>Distance</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="park in fixedParks"
      >
        <td>{{ park.name }}</td>
        <td>{{ park.availableSpaces }}</td>
        <td>{{ park.distance }}km</td>
      </tr>
      <tr
          v-for="park in parks"
      >
        <td>{{ park.name }}</td>
        <td>{{ park.availableSpaces }}</td>
        <td>{{ park.distance }}km</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
