<script setup>
import Navbar from './components/Navbar.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const countries = ref([]);

const fetchCountries = async () => {
  try {
    const response = await fetch('https://ih-countries-api.herokuapp.com/countries');
    const data = await response.json(countries);
    countries.value = data;
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

onMounted(fetchCountries);
</script>

<template>
  <div class="app">
    <Navbar />
    <router-view :countries="countries" />
  </div>
</template>

<style scoped>
.flag-img {
  width: 36px;
  /* Adjust as per your design */
  height: auto;
  margin-right: 8px;
  /* Example margin */
}
</style>