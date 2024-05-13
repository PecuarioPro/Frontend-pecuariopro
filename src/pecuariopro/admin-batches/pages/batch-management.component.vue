<script>
import {Campaign} from "../../admin-campaign/model/campaign.entity.js";
import BatchView from "../components/batch-view.component.vue";
import {CampaignApiService} from "../../admin-campaign/services/campaign-api.service.js";

export default {
  name: "batch-management",
  components: {BatchView},
  data(){
    return {
      batch:{},
      campaign: null,
      campaignService: null,
      batches: []
    };
  },
  created() {
    this.campaignService = new CampaignApiService();
    this.getBatches();
  },
  methods:{
    // getBatches(){
    //   console.log("soy la campaign especifica",this.campaign);
    //   if (this.campaign) {
    //     this.batches = this.campaign.batches;
    //   } else {
    //     // Manejar el caso en que this.campaign sea null, por ejemplo, establecer batches como un array vacío
    //     this.batches = [];
    //   }
    // },
    handleViewBovines(batch) {
      this.$router.push({
        name: "batchDetails",
        params: { campaignId: this.campaign.id, batchId: batch.id }
      });
    },
    getBatches() {

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
        console.log("soy la campaign escogida 2", this.campaign);
        this.batches=this.campaign.batches;

      }).catch(error => {
        console.error("Error al buscar la campaña:", error);
      });
    }
  }
}
</script>

<template>
  <div v-for="batch in batches" :key="batch.id">
    <batch-view :batch="batch" @viewBovines="handleViewBovines"/>
  </div>
</template>

<style scoped>

</style>