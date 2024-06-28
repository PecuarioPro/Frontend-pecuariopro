<script>
import VeterinariansCard from "../components/veterinarian-card.component.vue";
import {VeterinarianApiService} from "../services/veterinarian-api.service.js";
import {Veterinarian} from "../model/veterinarian.js";
export default {
  name: "Veterinarians-view",
  components: {VeterinariansCard},
  props: {},
  data() {
    return {
      title: {singular: 'Veterinarian', plural: 'Veterinarians'},
      veterinarian: {},
      veterinarians: [],
      veterinarianService: null,
      isVisibleCard: false,
      visibleFilter:false
    }
  },
  created(){
    this.veterinarianService = new VeterinarianApiService();
    this.veterinarianService.getAll().then((response) => {
      console.log(response.data);
      let veterinarians = response.data;
      this.veterinarianService = veterinarians.map((veterinarian) => {
        return Veterinarian.fromDisplayableVeterinarian({
          id: veterinarian.id,
          first_name: veterinarian.first_name,
          last_name: veterinarian.last_name,
          speciality: veterinarian.speciality,
          phone_number: veterinarian.phone_number,
          email: veterinarian.email,
          city: veterinarian.city,
          status: veterinarian.status,
          linkedin: veterinarian.linkedin,
          photoUrl: veterinarian.photoUrl
        });
      });
    });
  }
}
</script>

<template>
  <section class="veterinarians-view">
    <pv-toast/>
    <!-- Title -->
    <div class="container-title">
      <h2 class="title"> Veterinarian View </h2>
    </div>

    <!-- Toolbar -->
    <pv-toolbar class="mb-4">

      <!-- Edit Button -->
      <template #center>
        <router-link to="/veterinarian-manage" rel="noopener">
          <pv-button class="mr-2" icon="pi pi-pencil" label="Edit" raised/>
        </router-link>
      </template>

    </pv-toolbar>


    <!-- Cards -->
    <div class="container-veterinarian">
      <div v-for="veterinarian in veterinarians" :key="veterinarian.id" class="card">
        <veterinarians-card :veterinarian="veterinarian"/>
      </div>
    </div>
  </section>
</template>

<style scoped>
.veterinarians-view {
  padding: 20px;
  position: relative;
}

.container-veterinarian {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 100px;
  height: 100vh;
  gap: 20px;
  width: 100%;
}

.container-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

}
</style>