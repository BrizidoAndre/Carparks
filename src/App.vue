<script setup>
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import {ref} from "vue";

const route = useRoute();
const router = useRouter();
const sidemenu = ref(false);
</script>

<template>
  <header class="container d-flex justify-content-between py-3 bg-body-secondary position-sticky z-3 top-0">
    <h1>{{ route.name }}</h1>
    <button class="btn btn-primary" @click="router.back()">&leftarrow;</button>
  </header>
  <main class="pb-5 pt-3 container">
    <RouterView/>
  </main>
  <footer class="container bg-body-secondary py-2 position-fixed bottom-0 z-3 footer-website">
<!--    this svg is the hamburguer button for side menu-->
    <svg viewBox="0 0 100 100" class="svg-menu" aria-label="Press to toggle the side menu" @click="sidemenu = !sidemenu">
      <rect fill="white" x="0" width="100%" height="20" y="0" rx="12"></rect>
      <rect fill="white" x="0" width="100%" height="20" y="33%" rx="12"></rect>
      <rect fill="white" x="0" width="100%" height="20" y="66%" rx="12"></rect>
    </svg>
    <nav class="sidemenu" :class="[sidemenu && 'sidemenu-open']">
      <ul class="d-flex justify-content-between list-unstyled m-0">
        <li>
          <router-link class="nav-link m-0" to="/">Parking</router-link>
        </li>
        <li>
          <router-link class="nav-link m-0" to="/events">Events</router-link>
        </li>
        <li>
          <router-link class="nav-link m-0" to="/weather">Weather</router-link>
        </li>
        <li>
          <router-link class="nav-link m-0" to="/fixed">Fixed</router-link>
        </li>
        <li>
          <router-link class="nav-link m-0" to="/settings">Settings</router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped>
.container{
  max-width: 400px;
}
.svg-menu {
  display: none;
}

.footer-website{
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
}

/**
only have side menu when the mobile is in landscape mode
 */
@media (orientation: landscape) {
  .svg-menu {
    display: block;
    width: 30px;
    aspect-ratio: 1;
    cursor: pointer;
  }

  .footer-website {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 1;
  }

  .sidemenu {
    position: fixed;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, .7);
    padding: 2rem;
    transform: translateY(100%);
    transition: .4s;
    z-index: -1;
  }

  .sidemenu-open {
    transform: translateY(-100%);
  }

  .list-unstyled {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
}
</style>
