import { createRouter, createWebHistory } from "vue-router";
import CountriesList from "../components/CountriesList.vue";
import CountryDetails from "../components/CountryDetails.vue";

const routes = [
  {
    path: "/",
    name: "CountriesList",
    component: CountriesList,
  },
  {
    path: "/:alpha3Code",
    name: "CountryDetails",
    component: CountryDetails,
    props: true,
  },
];


const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;
