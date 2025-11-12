<script setup>

import ParkFormat from "@/components/ParkFormat.vue";
import {ref} from "vue";
import {storage} from "@/utils.js";
import EventsFormat from "@/components/EventsFormat.vue";

const parks = ref(storage.get(storage.parksKey, '[]'));
const events = ref(storage.get(storage.eventsKey, '[]'));

/**
 * clear everything in storage
 */
function clearStorage() {
  storage.clear();
  parks.value = [];
  events.value = [];
}
</script>

<template>
  <button class="btn btn-danger mb-2" @click="clearStorage">Clear Pinned</button>
  <ParkFormat
      :parks="[]"
      :fixed-parks="parks"
  />
  <EventsFormat
      :events="[]"
      :fixed-events="events"
  />
</template>
