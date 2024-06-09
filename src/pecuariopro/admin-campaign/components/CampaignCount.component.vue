<template>
  <div class="card campaign-count">
    <div class="card-header">
      <i class="pi pi-calendar"></i>
      <span class="title">Campaigns</span>
    </div>
    <div class="card-content">
      <div class="count">
        {{ totalCampaigns }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { CampaignApiService } from '../services/campaign-api.service';

export default defineComponent({
  name: 'CampaignCountComponent',
  setup() {
    const totalCampaigns = ref<number>(0);
    const campaignApiService = new CampaignApiService();

    const fetchTotalCampaigns = async () => {
      try {
        totalCampaigns.value = await campaignApiService.getTotalCampaigns();
      } catch (error) {
        console.error('Error fetching total campaigns:', error);
      }
    };

    onMounted(fetchTotalCampaigns);

    return {
      totalCampaigns
    };
  }
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
