<script>
import {CampaignApiService} from "../services/campaign-api.service.js";
import {Campaign} from "../model/campaign.entity.js";
import BatchManagement from "../../admin-batches/pages/batch-management.component.vue";

export default {
  name: "campaign-details",
  components: {BatchManagement},
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

  <div v-if="campaign">
    <h2>{{ campaign.name }}</h2>
    <p>Soy un detalle</p>
    <p>{{ $route.params.campaignId }}</p>
  </div>

<batch-management />

  <router-link to="/campaign">
    <button>BACK</button>
  </router-link>
</template>

<style scoped>

</style>