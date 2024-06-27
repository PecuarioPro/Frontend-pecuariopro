<script>
import {Veterinarian} from "../model/veterinarian.js";
export default {
  name: "veterinarian-card",
  components: {},
  props: {
    veterinarian: Veterinarian,
  },
}
</script>

<template>
  <div class="card-container">
    <pv-toast/>
    <pv-card class="custom-card" >

      <template #header >
        <div class="card-header">
          <img :src="veterinarian.photoUrl" alt="Veterinarian Photo" class="veterinarian-photo" />
        </div>
      </template>

      <template #title >
        <div class="card-title"> {{ veterinarian.name + " " + veterinarian.last_name }} </div>
      </template>

      <template #subtitle>
        <div> Speciality: {{ veterinarian.speciality }} </div>
      </template>

      <template #content>
        <div>
          <br/>
          <p style="font-weight: bold">Status:</p>
          <pv-avatar :label="veterinarian.on_job_status" class="mr-2" style="background-color: #34d399; color: #020617; width: 10rem;" />
        </div>
      </template>

      <template #footer>
        <div class="gap-3 mt-1">
          <p style="font-weight: bold">Email:</p>
          <pv-avatar :label="veterinarian.email" class="mr-2" style="background-color: #34d399; color: #020617; width: 20rem;" />
        </div>
      </template>

    </pv-card>
  </div>

</template>

<style scoped>

.card-header{
  display: flex;
  justify-content: center;
  margin: 1rem;
}

.veterinarian-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 10px;
}

.card-container{
  position: relative;
}

.custom-card {
  overflow: hidden;
  margin: 0.5rem;
}

.card-title{
  font-size: 25px;
}

@media (min-width: 750px) {
  .custom-card {
    width: 30rem;
    height: 30rem;
  }
}
</style>