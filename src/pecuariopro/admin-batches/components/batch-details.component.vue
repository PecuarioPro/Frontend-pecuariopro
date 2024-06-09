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
      console.log("soy el id del gtByiD",this.$route.params.batchId,typeof this.$route.params.batchId)
      this.batchesService.getById(this.$route.params.batchId).then((response) => {
        console.log(response.data);
        let _batch = response.data;
        this.batch = Batch.toDisplayableBatch(_batch);
      });
    }


  }
}
</script>

<template>
  <div class="principal-container">
    <h2>{{ this.batch.name }}</h2>
  </div>
  <bovine-management :batch-id="this.batch.id"/>
</template>

<style scoped>
.principal-container{
  padding:20px;
}
</style>