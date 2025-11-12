<script setup>
import {siteConfig} from "@/utils.js";
import CardEvent from "@/components/CardEvent.vue";

const props = defineProps(['events', 'fixedEvents'])
const emits = defineEmits(['fixEvent', 'unfixEvent'])
</script>

<template>
<!--  show card if list format is false-->
  <div v-if="!siteConfig.listFormat">
    <CardEvent
        v-for="(event,i) in fixedEvents"
        v-bind="event"
        btn-text="Unfix"
        @btn-press="emits('unfixEvent', i, event)"
    />
    <CardEvent
        v-for="event in events"
        v-bind="event"
        btn-text="Fix"
        @btn-press="emits('fixEvent', event)"
    />
  </div>
<!--  show table if list format is true-->
  <div v-else>
    <table class="table">
      <thead>
      <tr>
        <th>Title</th>
        <th>Image</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="event in fixedEvents"
      >
        <td>{{ event.title }}</td>
        <td>
          <img :src="'http://172.16.21.53' + event.image" class="card-img-top" :alt="event.title + '\'s image cover'" loading="lazy">
        </td>
        <td>{{ event.date }}</td>
      </tr>
      <tr
          v-for="event in events"
      >
        <td>{{ event.title }}</td>
        <td>
          <img :src="'http://172.16.21.53' + event.image" class="card-img-top" :alt="event.title + '\'s image cover'" loading="lazy">
        </td>
        <td>{{ event.date }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
