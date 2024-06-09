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
            <div class="card-info">
              <p class="card-subtitle">Speciality:</p>
              <p class="card-value">{{ veterinarian.speciality }}</p>
            </div>
            <div class="card-info">
              <p class="card-subtitle">Phone Number:</p>
              <p class="card-value">{{ veterinarian.phone_number }}</p>
            </div>
            <div class="card-info">
              <p class="card-subtitle">Email:</p>
              <p class="card-value">{{ veterinarian.email }}</p>
            </div>
            <div class="card-info">
              <p class="card-subtitle">Work Start Time:</p>
              <p class="card-value">{{ veterinarian.work_start_time }}</p>
            </div>
            <div class="card-info">
              <p class="card-subtitle">Work End Time:</p>
              <p class="card-value">{{ veterinarian.work_end_time }}</p>
            </div>
            <div class="card-info">
              <p class="card-subtitle">City:</p>
              <p class="card-value">{{ veterinarian.city }}</p>
            </div>
            <div class="card-info">
              <p class="card-subtitle">LinkedIn:</p>
              <p class="card-value"><a :href="veterinarian.linkedin" target="_blank">{{ veterinarian.linkedin }}</a></p>
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
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.custom-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.card-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.veterinarian-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 10px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-info {
  display: flex;
  gap: 5px;
  align-items: center;
}

.card-subtitle {
  font-weight: bold;
  font-size: 1rem;
}

.card-value {
  font-size: 0.9rem;
  margin-left: 5px;
}

.card-footer {
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .veterinarian-photo {
    width: 150px;
    height: 150px;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .card-subtitle {
    font-size: 1.1rem;
  }

  .card-value {
    font-size: 1rem;
  }
}
</style>