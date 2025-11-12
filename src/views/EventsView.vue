<script setup>

import {computed, onMounted, reactive, ref, useTemplateRef, watch} from "vue";
import {get, storage} from "@/utils.js";
import EventsFormat from "@/components/EventsFormat.vue";
import InputLabel from "@/components/InputLabel.vue";

const events = ref([]);
// filter events to not show duplicates between events and fixed events
const filteredEvents = computed(() => {
  let eventsCopy = [...events.value];
  eventsCopy = eventsCopy.filter(event => {
    return !fixedEvents.value.some(fix => fix.title === event.title);
  })
  return eventsCopy;
})
const fixedEvents = ref(storage.get(storage.eventsKey, '[]'));
const dates = reactive({
  ending_date: null,
  beginning_date: null
})
const nextPage = ref(0);
const spinnerRef = useTemplateRef('spinner');
// this observer only load more events if spinners is being observerd
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    moreEvents()
  }
})

/**
 * load events from the api request
 * @returns {Promise<void>}
 */
async function loadEvents(load = true) {
  let query = new URLSearchParams();
  if (dates.beginning_date && dates.ending_date) {
    query.append('beginning_date', dates.beginning_date);
    query.append('ending_date', dates.ending_date);
  }
  const res = await get('/events.json?' + query.toString());
  const data = await res.json();
  events.value = data.events;
  if (events.value.length > 9 && data.pages.next && load) {
    nextPage.value = data.pages.next.at(-1);
    observer.observe(spinnerRef.value);
  }
}

/**
 * load event from the api request an add to the already existing array of events
 * @returns {Promise<null>}
 */
async function moreEvents() {
  const query = new URLSearchParams();
  query.append('page', nextPage.value);
  const res = await get('/events.json?' + query.toString());
  const data = await res.json();
  events.value.push(...data.events)
  if (data.events.length < 10) {
    observer.unobserve(spinnerRef.value);
    return null;
  } else if (data.pages.next) {
    nextPage.value = data.pages.next.at(-1);
  }
}

/**
 * load events and undo the intersection observer when user is querying with filters
 */
watch(dates, value => {
  if (value.beginning_date && value.ending_date) {
    loadEvents(false)
    observer.unobserve(spinnerRef.value);
  }
})

/**
 * Fix event and updates the local storage
 * @param event
 */
function fixEvent(event) {
  fixedEvents.value.push({...event});
  storage.set(storage.eventsKey, fixedEvents.value);
}

/**
 * Unpin event and updates the local storage
 * @param i
 */
function unfixEvent(i) {
  fixedEvents.value.splice(i, 1);
  storage.set(storage.eventsKey, fixedEvents.value);
}

/**
 * load events when page is loaded
 */
onMounted(() => {
  loadEvents()
})
</script>

<template>
  <p>* to undo the date filters please reload the page</p>
  <InputLabel
      v-model="dates.beginning_date"
      type="date"
  >
    Beginning Date
  </InputLabel>
  <InputLabel
      v-model="dates.ending_date"
      type="date"
  >
    Ending Date
  </InputLabel>
  <EventsFormat
      :events="filteredEvents"
      :fixedEvents="fixedEvents"
      @fix-event="fixEvent"
      @unfix-event="unfixEvent"
  />
  <div class="spinner-border" role="status" ref="spinner">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>
