<script setup>
import InputLabel from "@/components/InputLabel.vue";
import {computed, onMounted, ref} from "vue";
import ParkFormat from "@/components/ParkFormat.vue";
import {get, getDistanceFromLatLonInKm, siteConfig, storage} from "@/utils.js";
import {useRoute} from "vue-router";

const route = useRoute();
const search = ref('');
const parks = ref([]);
// order park based if the park name includes the search string or if does not exist in fixed parks assay
const orderedParks = computed(() => {
  let parksCopy = [...parks.value];
  parksCopy = parksCopy.filter(park => {
    return park.name.includes(search.value) && !fixedParks.value.some(fix => fix.name === park.name);
  })
  return orderByKey(parksCopy, siteConfig.sortType);
})
const fixedParks = ref(storage.get(storage.parksKey, '[]'));

/**
 * order parks array by its key
 * @param parks
 * @param key
 * @returns {*[]}
 */
function orderByKey(parks, key) {
  let parksCopy = [...parks];
  if (siteConfig.ascending) {
    parksCopy.sort((a, b) => {
      return a[key] > b[key] ? 1 : -1;
    })
  } else {
    parksCopy.sort((a, b) => {
      return a[key] < b[key] ? 1 : -1;
    })
  }
  return parksCopy;
}

/**
 * Load carparks from the api and try to add the distance
 * @returns {Promise<void>}
 */
async function loadParks() {
  const res = await get('/carparks.json');
  const data = await res.json();
  navigator.geolocation.getCurrentPosition((crd) => onSuccess(crd, data), () => onError(data));
}

/**
 * when current location is successfully obtained
 * @param crd
 * @param parks
 */
function onSuccess(crd, parks) {
  const {coords} = crd;
  const {latitude, longitude} = coords;
  addNameAndDistance(parks, latitude, longitude);
}

/**
 * when location is not obtained
 * @param parks
 */
function onError(parks) {
  let {latitude, longitude} = route.query;
  if (!latitude || !longitude) {
    latitude = 31.123;
    longitude = 30.123;
  }
  addNameAndDistance(parks, latitude, longitude);
}

/**
 * Add distance and  name to parks variable
 * @param currentParks
 * @param latitude
 * @param longitude
 */
function addNameAndDistance(currentParks, latitude, longitude) {
  let parksCopy = [];
  for (const currentParksKey in currentParks) {
    const item = currentParks[currentParksKey];
    const distanceFormatted = Math.round(getDistanceFromLatLonInKm(latitude, longitude, item.latitude, item.longitude) * 100) / 100;
    parksCopy.push({
      ...item,
      name: currentParksKey,
      distance: distanceFormatted,
    })
  }
  parks.value = [...parksCopy];
}

onMounted(() => {
  loadParks()
})

/**
 * fixing park and saving in local storage
 * @param park
 */
function fixPark(park) {
  fixedParks.value.push({...park});
  storage.set(storage.parksKey, fixedParks.value);
}

/**
 * Unpinning park and updatings the localstorage
 * @param i
 * @param park
 */
function unfixPark(i, park) {
  fixedParks.value.splice(i, 1);
  storage.set(storage.parksKey, fixedParks.value);
}
</script>

<template>
  <InputLabel
      v-model="search"
  >
    Search
  </InputLabel>
  <ParkFormat
      :parks="orderedParks"
      :fixed-parks="fixedParks"
      @fixPark="fixPark"
      @unfixPark="unfixPark"
  />
</template>
