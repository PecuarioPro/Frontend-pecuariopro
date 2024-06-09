<script>
import {VeterinarianApiService} from "../services/veterinarian-api.service.js";
import {Veterinarian} from "../model/veterinarian.js";
export default {
  name: "veterinarian-details",
  data(){
    return {
      veterinarian: null,
      VeterinarianService: null
    };

  },
  created(){
    this.VeterinarianService = new VeterinarianApiService();
    this.findVeterinarian();
  },
  watch:{
    '$route.params.veterinarianId': function(newVal, oldVal) {
      this.findVeterinarian();
    }
  },
  methods:{
    findVeterinarian() {
      this.VeterinarianService.getById(this.$route.params.veterinarianId).then(response => {
        const VeterinarianData = response.data;
        this.veterinarian = new Veterinarian(
            VeterinarianData.id,
            VeterinarianData.first_name,
            VeterinarianData.last_name,
            VeterinarianData.speciality,
            VeterinarianData.phone_number,
            VeterinarianData.email,
            VeterinarianData.work_start_time,
            VeterinarianData.work_end_time,
            VeterinarianData.city,
            VeterinarianData.status
        );
        console.log("veterinario yo te eligo ", this.veterinarian);

      }).catch(error => {
        console.error("Error:", error);
      });
    }
  }
}
</script>

<template>
  <div class="veterinarian-section">
    <div  class="container-title">
      <h1 v-if="veterinarian" class="title">{{ veterinarian.name }}</h1>
    </div>
  </div>


</template>

<style scoped>
.batch-section{
  padding:20px;
}
.container-title{
  display:flex;
  align-items:center;
  gap:5px;
}
</style>