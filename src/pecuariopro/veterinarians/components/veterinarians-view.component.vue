<script>
export default {
  name: "VeterinariansViewComponent",
  props: {
    veterinarian: {
      type: Object,
      required: true
    }
  },
  methods: {
  }
};
</script>

<template>
  <div :style="{ position: 'relative' }">
    <pv-toast />
    <div>
      <pv-card class="custom-card">
        <template #title>
          <div class="card-header">
            <p class="card-title">{{ veterinarian.first_name }} {{ veterinarian.last_name }}</p>
            <img :src="veterinarian.photoUrl" alt="Veterinarian Photo" class="veterinarian-photo" />
          </div>
        </template>


        <template #content>
          <div class="card-content">
            <div>
              <p>Speciality: {{ veterinarian.speciality }}</p>
            </div>
            <div>
              <p>Phone Number: {{ veterinarian.phone_number }}</p>
            </div>
            <div>
              <p>Email: {{ veterinarian.email }}</p>
            </div>
            <div>
              <p>Work Start Time: {{ veterinarian.work_start_time }}</p>
            </div>
            <div>
              <p>Work End Time: {{ veterinarian.work_end_time }}</p>
            </div>
            <div>
              <p>City: {{ veterinarian.city }}</p>
            </div>
            <div>
              <p>LinkedIn: <a :href="veterinarian.linkedin" target="_blank">{{ veterinarian.linkedin }}</a></p>
            </div>
          </div>
        </template>
        <!-- Cards
        <template #footer>
          <div class="card-footer">
            <pv-button label="View More" class="w-full" @click="viewMoreInfo(veterinarian)" />
          </div>
        </template>-->
      </pv-card>
    </div>
  </div>
</template>

<style>
.custom-card {
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-title {
  font-weight: bold;
}
.veterinarian-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}
.card-content p {
  margin: 5px 0;
}
.card-footer {
  display: flex;
  justify-content: center;
}
</style>