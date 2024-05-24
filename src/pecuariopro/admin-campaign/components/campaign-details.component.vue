<script>
import {CampaignApiService} from "../services/campaign-api.service.js";
import {Campaign} from "../model/campaign.entity.js";
import BatchManagement from "../../admin-batches/pages/batch-management.component.vue";
import PvButton from "../../../main.js";

export default {
  name: "campaign-details",
  components: {PvButton, BatchManagement},
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
            campaignData.batches,
            campaignData.workers
        );
        console.log("soy la campaign escogida ", this.campaign);

      }).catch(error => {
        console.error("Error al buscar la campaña:", error);
      });
    }

    // findCampaign(){
    //   console.log("SOY EL PARAMETRO", typeof this.$route.params.campaignId);
    //   this.campaign= this.campaigns.find(campaign => campaign.id == this.$route.params.campaignId);
    //   console.log("Hola soy la campaign");
    //   console.log(this.campaign);
    // }
  }

}
</script>

<template>
<div class="batch-section">
  <div  class="container-title">
    <h2 v-if="campaign" class="title">{{ campaign.name }}</h2>
    <pv-button class="title-button">Add</pv-button>
  </div>

  <batch-management />

  <router-link to="/campaign">

  </router-link>

</div>


</template>

<style scoped>
.batch-section{
  padding:20px;
}
.container-title{
  display:flex;
  justify-content: space-between;
  background-color: #E1D29A;
}

</style>