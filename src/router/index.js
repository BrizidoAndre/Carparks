import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventsView from "@/views/EventsView.vue";
import WeatherView from "@/views/WeatherView.vue";
import FixedView from "@/views/FixedView.vue";
import SettingsView from "@/views/SettingsView.vue";
import ParkSingleView from "@/views/ParkSingleView.vue";
import EventSingleView from "@/views/EventSingleView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Parking',
            component: HomeView,
        },
        {
            path: '/events',
            name: 'Events',
            component: EventsView,
        },
        {
            path: '/weather',
            name: 'Weather',
            component: WeatherView,
        },
        {
            path: '/fixed',
            name: 'Fixed',
            component: FixedView,
        },
        {
            path: '/settings',
            name: 'Settings',
            component: SettingsView,
        },
        {
            path: '/park-single',
            name: 'ParkSingle',
            component: ParkSingleView,
        },
        {
            path: '/event-single',
            name: 'EventSingle',
            component: EventSingleView,
        },
    ],
})

export default router
