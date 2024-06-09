<template>
  <div class="statistics-container">
    <div class="stat-card">
      <h3>Min Weight</h3>
      <p>{{ stats.minWeight }} kg</p>
    </div>
    <div class="stat-card">
      <h3>Max Weight</h3>
      <p>{{ stats.maxWeight }} kg</p>
    </div>
    <div class="stat-card">
      <h3>Total Weight</h3>
      <p>{{ stats.totalWeight }} kg</p>
    </div>
    <div class="stat-card">
      <h3>Average Weight</h3>
      <p>{{ stats.averageWeight }} kg</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { BovinesApiService } from '../services/bovines-api.service';

export default defineComponent({
  name: 'BovinesStatsByWeight',
  setup() {
    const stats = ref({
      minWeight: 0,
      maxWeight: 0,
      totalWeight: 0,
      averageWeight: 0,
    });

    const fetchStatsByWeight = async () => {
      const bovinesApiService = new BovinesApiService();
      stats.value = await bovinesApiService.getStatsByWeight();
    };

    onMounted(fetchStatsByWeight);

    return {
      stats,
    };
  },
});
</script>

<style scoped>
.statistics-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.stat-card {
  flex: 0 0 calc(50% - 20px); /* Two cards per row */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

.stat-card h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
}

.stat-card p {
  font-size: 1.2em;
  color: #666;
}
</style>
