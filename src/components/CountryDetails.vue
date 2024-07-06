

<template>
    <div v-if="country" class="container mt-4">
        <h2 class="text-center mb-4">{{ country.name.common }}</h2>
        <div class="row">
            <div class="col-md-6">
                <img :src="flagUrl" :alt="`Flag of ${country.name.common}`" class="img-fluid rounded mb-3">
            </div>
            <div class="col-md-6">
                <ul class="list-group">
                    <li class="list-group-item">
                        <strong>Capital:</strong> {{ country.capital }}
                    </li>
                    <li class="list-group-item">
                        <strong>Area:</strong> {{ country.area }} km2
                    </li>
                    <li class="list-group-item">
                        <strong>Region:</strong> {{ country.region }}
                    </li>
                    <li class="list-group-item">
                        <strong>Borders:</strong> {{ country.borders }}
                    </li>
                    <li class="list-group-item">
                        <strong>Subregion:</strong> {{ country.subregion }}
                    </li>
                    <li class="list-group-item">
                        <strong>Official Languages:</strong> {{ getOfficialLanguages() }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div v-else class="container mt-4">
        <p>Loading...</p>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const country = ref(null);
const route = useRoute();
const alpha3Code = route.params.alpha3Code;

onMounted(async () => {
    await fetchCountryDetails();
});

const fetchCountryDetails = async () => {
    const response = await fetch(`https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`);
    const data = await response.json();
    country.value = data;
};

const flagUrl = computed(() => {
    if (country.value) {
        const alpha2Code = country.value.alpha2Code.toLowerCase();
        return `https://flagcdn.com/72x54/${alpha2Code}.png`;
    } else {
        return '';
    }
});

const getOfficialLanguages = () => {
    return country.value && country.value.languages
        ? Object.values(country.value.languages).join(', ')
        : 'Unknown';
};
</script>
<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
}

.list-group-item {
  background-color: #f8f9fa;
}

.container {
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  background-color: #ffffff;
}
</style>