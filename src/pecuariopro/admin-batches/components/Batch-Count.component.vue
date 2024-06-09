<template>
  <div class="card batch-count">
    <div class="card-header">
      <i class="pi pi-home"></i>
      <span class="title">Batches</span>
    </div>
    <div class="card-content">
      <div class="count">
        {{ totalBatches }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { BatchApiService } from '../services/batch-api.service';

export default defineComponent({
  name: 'BatchCountComponent',
  setup() {
    const totalBatches = ref<number>(0);
    const batchApiService = new BatchApiService();

    const fetchTotalBatches = async () => {
      try {
        totalBatches.value = await batchApiService.getTotalBatches();
      } catch (error) {
        console.error('Error fetching total batches:', error);
      }
    };

    onMounted(fetchTotalBatches);

    return {
      totalBatches
    };
  }
});
</script>

<style scoped>
.card {
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.card-header i {
  font-size: 1.5rem;
  margin-right: 10px;
}

.card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.icon {
  font-size: 2.5rem;
}

.count {
  font-size: 2rem;
  margin-top: 10px;
  font-weight: bold;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
