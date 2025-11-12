import {reactive, watch} from "vue";

export const API_URL = 'http://localhost/module_c_api.php';

/**
 * get values from the api
 * @param url Must start with "/"
 * @returns {Promise<Response>}
 */
export async function get(url) {
    return await fetch(API_URL + url);
}

/**
 * The custom storage object
 * this object manages the localStorage and its variables
 */
export const storage = {
    get: (key, defaultValue) => {
        return JSON.parse(localStorage.getItem(key) || defaultValue);
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    clear: () => {
        localStorage.clear();
    },
    parksKey: 'fixedParks',
    eventsKey: 'fixedEvents',
}

/**
 * get distance between two cardinal points
 * @param latitude1
 * @param longitude1
 * @param latitude2
 * @param longitude2
 * @returns {number}
 */
export function getDistanceFromLatLonInKm(latitude1, longitude1, latitude2, longitude2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(latitude2 - latitude1);  // deg2rad below
    var dLon = deg2rad(longitude2 - longitude1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}


function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

/**
 * The configuration file to be accessed in all properties
 */
export const siteConfig = reactive({
    darkTheme: getDarkPreference().matches,
    listFormat: false,
    ascending: true,
    sortType: 'distance',
})

/**
 * update the bootstrap theme when user alter the darktheme propertie or when the page is first loaded
 */
watch(siteConfig, value => {
    document.body.dataset.bsTheme = value.darkTheme ? 'dark' : 'light';
}, {
    immediate: true
})

/**
 * Get if current browser prefers dark theme
 * @returns {MediaQueryList}
 */
function getDarkPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)');
}
