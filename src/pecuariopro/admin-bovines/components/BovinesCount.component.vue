<template>
  <div class="card bovines-count">
    <div class="card-header">
      <i class="pi pi-cow"></i>
      <span class="title">Total Bovines</span>
    </div>
    <div class="card-content">
      <div class="count">
        {{ bovinesCount }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { BovinesApiService } from '../services/bovines-api.service';

export default defineComponent({
  name: 'BovinesCount',
  setup() {
    const bovinesCount = ref(0);

    const fetchBovinesCount = async () => {
      const bovinesApiService = new BovinesApiService();
      bovinesCount.value = await bovinesApiService.getTotalBovines();
    };

    onMounted(fetchBovinesCount);

    return {
      bovinesCount,
    };
  },
});
</script>

<style scoped>
.card {
  background-color: #fff;
  color: #000000;
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
