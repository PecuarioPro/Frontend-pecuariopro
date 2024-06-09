<template>
  <div class="statistics-container">
    <div class="statistics-card">
      <div class="card-counts" >
        <CampaignCount />
        <br>
        <BovinesCount />
        <br>
        <BatchCount />
      </div>
    </div>
    <div class="statistics-card">
      <div class="card">
        <BovinesStatsByWeight />
      </div>
    </div>
    <div class="statistics-card">
      <div class="card">
        <BovinesCountByBatch />
      </div>
    </div>
  </div>
</template>

<script>
import BovinesStatsByWeight from "../admin-bovines/components/BovinesStatsByWeight.vue";
import BovinesCountByBatch from "../admin-bovines/components/BovinesCountByBatch.vue";
import BatchCount from "../admin-batches/components/Batch-Count.component.vue";
import CampaignCount from "../admin-campaign/components/CampaignCount.component.vue";
import BovinesCount from "../admin-bovines/components/BovinesCount.component.vue";

export default {
  name: 'Statistics',
  components: {
    BatchCount,
    CampaignCount,
    BovinesCount,
    BovinesStatsByWeight,
    BovinesCountByBatch
  }
};
</script>

<style scoped>
.statistics-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.statistics-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background-color: #34d399;
  color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .statistics-container {
    grid-template-columns: 1fr;
  }
}
</style>
