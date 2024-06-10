<script>
import VeterinariansViewComponent from "../components/veterinarians-view.component.vue";
import {VeterinarianApiService} from "../services/veterinarian-api.service.js";
import {Veterinarian} from "../model/veterinarian.js";

export default {
  name: "Veterinarians-management",
  components: { VeterinariansViewComponent },
  props: {},
  data() {
    return {
      title: { singular: 'Veterinarian', plural: 'Veterinarians' },
      veterinarians: [],  // Inicializar veterinarians aquí
      allVeterinarians: [],
      veterinarianService: null
    };
  },
  created() {
    this.veterinarianService = new VeterinarianApiService();
    this.veterinarianService.getAll().then((response) => {
      console.log(response.data);
      this.veterinarians = response.data.map((veterinarian) => {
        return new Veterinarian(
            veterinarian.id,
            veterinarian.first_name,
            veterinarian.last_name,
            veterinarian.speciality,
            veterinarian.phone_number,
            veterinarian.email,
            veterinarian.work_start_time,
            veterinarian.work_end_time,
            veterinarian.city,
            veterinarian.status,
            veterinarian.linkedin,
            veterinarian.photoUrl
        );
      });
      this.allVeterinarians = [...this.veterinarians];  // Hacer una copia de veterinarians
      console.log("Array", this.veterinarians);
    }).catch(error => {
      console.error("Error:", error);
    });
  }
};
</script>

<template>
  <section class="veterinarians-management">
    <pv-toast/>
    <h2 class="title">Our Veterinarians</h2>
    <!-- Cards-->
    <div class="container-veterinarians">
      <div class="row">
        <div v-for="veterinarian in veterinarians" :key="veterinarian.id" class="col-md-6">
          <VeterinariansViewComponent :veterinarian="veterinarian"/>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.title {
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.container-veterinarians {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding:10px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
}

.col-md-6 {
  flex: 0 0 100%;
  max-width: 100%;
  padding: 15px;
}

@media (min-width: 768px) {
  .col-md-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (min-width: 1024px) {
  .col-md-6 {
    flex: 0 0 33.3333%;
    max-width: 33.3333%;
  }
}
</style>
