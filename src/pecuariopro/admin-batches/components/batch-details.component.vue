<script>
import {CampaignApiService} from "../../admin-campaign/services/campaign-api.service.js";
import {Campaign} from "../../admin-campaign/model/campaign.entity.js";

export default {
  name: "batch-details",
  data(){
    return{
      batch:null,
      campaign:null,
      campaignService:null
    }
  },
  created(){
    this.campaignService = new CampaignApiService();
    this.findCampaign();
    this.findBatchFromCampaign();
  },
  methods: {
    findCampaign() {
      this.campaignService.getById(this.$route.params.campaignId).then(response => {
        const campaignData = response.data;
        const startDate = new Date(campaignData.dateStart);
        const endDate = new Date(campaignData.dateEnd);

        this.campaign = new Campaign(
            campaignData.id,
            campaignData.name,
            startDate,
            endDate,
            campaignData.objective,
            campaignData.batches,
            campaignData.workers
        );
      }).catch(error => {
        console.error("Error al buscar la campaña:", error);
      });
    },

    findBatchFromCampaign(){
      console.log("batch id",this.$route.params.batchId);
      this.batch=this.campaign.getBatchById(this.$route.params.batchId);
    }

  }
}
</script>

<template>
<div>
  <h2>{{ batch.name }}</h2>
  <h2>{{ campaign.name }}</h2>
  <p>Soy un detalle batch</p>
  <p>{{ $route.params.batchId }}</p>
  <p>Soy un detalle campaign</p>
  <p>{{ $route.params.campaignId }}</p>
</div>
</template>

<style scoped>

</style>