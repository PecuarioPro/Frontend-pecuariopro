<template>
  <div class="vaccine-count">
    <div class="icon">
      <i class="pi pi-syringe"></i>
    </div>
    <div class="count">
      {{ totalVaccines }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { VaccinesApiService } from '../services/vaccine-api.service';

export default defineComponent({
  name: 'VaccineCountComponent',
  setup() {
    const totalVaccines = ref<number>(0);
    const vaccinesApiService = new VaccinesApiService();

    const fetchTotalVaccines = async () => {
      try {
        totalVaccines.value = await vaccinesApiService.getTotalVaccines();
      } catch (error) {
        console.error('Error fetching total vaccines:', error);
      }
    };

    onMounted(fetchTotalVaccines);

    return {
      totalVaccines
    };
  }
});
</script>

<style scoped>
.vaccine-count {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #32C793;
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.vaccine-count .icon {
  font-size: 36px;
  margin-right: 10px;
}

.vaccine-count .count {
  font-size: 36px;
  font-weight: bold;
}
</style>
