<script>
import {CampaignApiService} from "../services/campaign-api.service.js";
import {Campaign} from "../model/campaign.entity.js";
import BatchManagement from "../../admin-batches/pages/batch-management.component.vue";

export default {
  name: "campaign-details",
  components: { BatchManagement},
  data(){
    return {
      campaign: null,
      campaignService: null
    };

  },
  created(){
    this.campaignService = new CampaignApiService();
    this.findCampaign();
    // this.campaignService.getAll().then((response) => {
    //   console.log(response.data);
    //   let campaigns = response.data;
    //   this.campaigns = campaigns.map((campaign) => {
    //     let startDate = new Date(campaign.dateStart);
    //     let endDate = new Date(campaign.dateEnd);
    //     return Campaign.fromDisplayableCampaign({
    //       id: campaign.id,
    //       name: campaign.name,
    //       dateStart: startDate,
    //       dateEnd: endDate,
    //       objective: campaign.objective,
    //       batches: campaign.batches,
    //       workers: campaign.workers
    //     });
    //   });
    //   console.log("este es el array",this.campaigns);
    // });



  },
  watch:{
    '$route.params.campaignId': function(newVal, oldVal) {
      this.findCampaign();
    }
  },
  methods:{
    findCampaign() {
      // Aquí puedes usar el ID de la campaña pasado como prop
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
            campaignData.condition
        );
        console.log("soy la campaign escogida ", this.campaign);

      }).catch(error => {
        console.error("Error al buscar la campaña:", error);
      });
    }

  }

}
</script>

<template>
<div class="batch-section">
  <div  class="container-title">
    <router-link to="/campaign">
      <pv-button icon="pi pi-arrow-left" class="title-button-2" rounded ></pv-button>
    </router-link>
    <h1 v-if="campaign" class="title">{{ campaign.name }}</h1>
  </div>

  <batch-management />

</div>


</template>

<style scoped>
.batch-section{
  padding:20px;
}
.container-title{
  display:flex;
  flex-direction:column;
  align-items:start;
  gap:5px;
}

.title-button-2{
  border-radius: 15px;
  color:white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.title-button-2:hover {
  background-color: #27272a;
  color: #34d399;
}
.title{
  font-size:30px;
}
@media (min-width: 750px) {

.container-title{
  flex-direction:row;
  align-items: center;
}


}
</style>