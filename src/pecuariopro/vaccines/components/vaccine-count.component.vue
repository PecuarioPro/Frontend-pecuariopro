<template>
  <div class="vaccine-count">
    <p>Total Vaccines: {{ totalVaccines }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { VaccinesApiService } from '../services/vaccine-api.service';

export default defineComponent({
  name: 'VaccineCount',
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
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
