<template>
    <div class="container mt-4">
        <h2 class="text-center mb-4">Countries List</h2>
        <div class="row">
            <div class="col-12">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center"
                        v-for="country in countries" :key="country.alpha3Code">
                        <router-link :to="'/' + country.alpha3Code">
                            <img :src="getFlagUrl(country.alpha2Code)" :alt="`Flag of ${country.name.common}`"
                                class="flag-img me-2">
                            {{ country.name.common }}
                        </router-link>
                    </li>
                </ul>
            </div>
            </div>
        </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const countries = ref([]);
const route = useRoute();

onMounted(async () => {
    try {
        const response = await fetch('https://ih-countries-api.herokuapp.com/countries');
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        countries.value = data;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
});

const getFlagUrl = (alpha2Code) => {
    return `https://flagcdn.com/72x54/${alpha2Code.toLowerCase()}.png`;
};
</script>

<style scoped>
.flag-img {
    width: 50px;
    height: 30px;
    object-fit: cover;
}

.list-group-item:hover {
    background-color: #f8f9fa;
}

.list-group-item {
    height: 150px;
    width: 300px;
}

.list-group {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>