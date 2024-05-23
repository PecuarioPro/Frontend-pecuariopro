<script>
import {CampaignApiService} from "../../admin-campaign/services/campaign-api.service.js";

import {Batch} from "../model/batch.entity.js";
import {BatchApiService} from "../services/batch-api.service.js";
import BovineManagement from "../../admin-bovines/pages/bovine-management.component.vue";

export default {
  name: "batch-details",
  components: {BovineManagement},
  data(){
    return{
      batch:null,
      batchesService:null,

    }
  },
  created(){
    this.batchesService = new BatchApiService();
    this.campaignService = new CampaignApiService();
    this.findBatch();
  },
  methods: {
    findBatch(){
      this.batchesService.getById(this.$route.params.batchId).then((response) => {
        console.log(response.data);
        this.batch = response.data;
      });
    }


  }
}
</script>

<template>
  <div>
    <h2>{{ batch.name }}</h2>
    <p>Soy un detalle batch</p>
    <p>{{ $route.params.batchId }}</p>
    <p>Soy un detalle campaign</p>
  </div>
  <bovine-management/>
</template>

<style scoped>

</style>