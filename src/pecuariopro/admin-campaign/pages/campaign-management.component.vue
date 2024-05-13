<script>
import CampaignView from "../components/campaign-view.vue";
import {CampaignApiService} from "../services/campaign-api.service.js";
import {Campaign} from "../model/campaign.entity.js";

export default {
  name: "campaign-management",
  components: {CampaignView},
  props: {
  },
  data(){
    return{
      campaign: {},
      campaigns: [],
      campaignService:null
    }

  },
  created(){
    this.campaignService = new CampaignApiService();
    this.campaignService.getAll().then((response) => {
      console.log(response.data);
      let campaigns = response.data;
      this.campaigns = campaigns.map((campaign) => {
        let startDate = new Date(campaign.dateStart);
        let endDate = new Date(campaign.dateEnd);
        return Campaign.fromDisplayableCampaign({
          id: campaign.id,
          name: campaign.name,
          dateStart: startDate,
          dateEnd: endDate,
          objective: campaign.objective,
          batches: campaign.batches,
          workers: campaign.workers
        });
      });
      console.log("este es el array",this.campaigns);
    });


  },
  methods:{
    handleViewMore(campaign) {
      this.$router.push({ name: 'campaignDetails', params: { campaignId: campaign.id }});
      //, params: { id: campaign.id }
    },

    createCampaign(){
      this.campaign = Campaign.fromDisplayableCampaign(this.campaign);
      this.campaignService.create(this.campaign).then((response) => {
        this.campaign = Campaign.toDisplayableCampaign(response.data);
        this.campaigns.push(this.campaign);

      })
    }
  }
}
</script>

<template>
<div v-for="campaign in campaigns" :key="campaign.id">
  <campaign-view :campaign="campaign" @viewMore="handleViewMore"/>
</div>


</template>

<style scoped>

</style>