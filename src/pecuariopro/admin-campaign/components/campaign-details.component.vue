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
    <div>
      <pv-button class="mr-2 title-button" icon="pi pi-plus" label="New" severity="success" ></pv-button>
      <pv-button class="mr-2 title-button" icon="pi pi-filter" label="Filter" severity="secondary" ></pv-button>
    </div>


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
  align-items:center;

}
.title-button{
  height:50px;
  color:white;
  font-size:15px;
  font-weight:500;
  text-align: center;
}

</style>