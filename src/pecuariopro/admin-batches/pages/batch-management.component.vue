<script>
import {Campaign} from "../../admin-campaign/model/campaign.entity.js";
import BatchView from "../components/batch-view.component.vue";
import {CampaignApiService} from "../../admin-campaign/services/campaign-api.service.js";
import {BatchApiService} from "../services/batch-api.service.js";
import {Batch} from "../model/batch.entity.js";

export default {
  name: "batch-management",
  components: {BatchView},
  data() {
    return {
      batch: {},
      batchesService: null,
      batches: []
    };
  },
  created() {
    this.batchesService = new BatchApiService();
    this.getBatches();
  },
  methods: {
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
        params: {campaignId: this.batch.campaignId, batchId: batch.id}
      });
    },
    getBatches() {
      this.batchesService.getAll().then((response) => {
        console.log(response.data);
        let batches = response.data;
        this.batches = batches.filter(batch => batch.campaignId == this.$route.params.campaignId)
            .map(batch => Batch.toDisplayableBatch(batch));
        console.log("batches filtrados",this.batches);
      });
    }





    // this.campaignService.getById(this.$route.params.campaignId).then(response => {
    //   const campaignData = response.data;
    //   const startDate = new Date(campaignData.dateStart);
    //   const endDate = new Date(campaignData.dateEnd);
    //
    //   this.campaign = new Campaign(
    //       campaignData.id,
    //       campaignData.name,
    //       startDate,
    //       endDate,
    //       campaignData.objective,
    //       campaignData.batches,
    //       campaignData.workers
    //   );
    //   console.log("soy la campaign escogida 2", this.campaign);
    //   this.batches=this.campaign.batches;
    //
    // }).catch(error => {
    //   console.error("Error al buscar la campaña:", error);
    // });
  }
}

</script>

<template>
  <div class="container-cards">
    <div v-for="batch in batches" :key="batch.id">
      <batch-view :batch="batch" @viewBovines="handleViewBovines"/>
    </div>
  </div>

</template>

<style scoped>
.container-cards{
  display:flex;
  justify-content:center;
  flex-wrap: wrap;
  margin-top: 100px;
  height: 100vh;
  gap:20px;
  width: 100%;
}


@media (min-width: 750px) {
}

@media (min-width: 1400px) {

}
</style>