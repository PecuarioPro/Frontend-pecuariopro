<script>
import CampaignView from "../components/campaign-view.vue";
import {CampaignApiService} from "../services/campaign-api.service.js";
import {Campaign} from "../model/campaign.entity.js";
import CampaignCreateAndEdit from "../components/campaign-create-and-edit.component.vue";

export default {
  name: "campaign-management",
  components: {CampaignCreateAndEdit, CampaignView},
  props: {
  },
  data(){
    return{
      title:{ singular: 'Bovine', plural: 'Bovines' },
      campaign: {},
      campaigns: [],
      campaignService:null,
      isVisibleCard: false,
      isEdit: false,
      submitted: false
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

  onNewItemEventHandler() {
    this.campaign = {};
    this.submitted = false;
    this.isEdit = false;
    this.isVisibleCard = true;
    console.log(`soy el flag de crear y estoy prendiendo ${this.isVisibleCard}`)
  },
  onCanceledEventHandler() {
    this.submitted = false;
    this.isEdit = false;
    this.isVisibleCard=false;
    console.log(`soy el flag y estoy apagandome1 ${this.isVisibleCard}`)
  },
  onSavedEventHandler(item) {
    this.submitted = true;
    if (this.campaign.name) {
      if (item.id) {
        console.log("soy el update");
        this.updateCampaign();
      } else {
        console.log("soy el crear");
        this.createCampaign();
        console.log("Sigo del create");
      }
    }
    this.isVisibleCard = false;
    console.log(`soy el card y estoy apagandome2 ${this.isVisibleCard}`)
    this.isEdit = false;
  },

    createCampaign(){
      this.campaign = Campaign.fromDisplayableCampaign(this.campaign);
      this.campaignService.create(this.campaign).then((response) => {
        this.campaign = Campaign.toDisplayableCampaign(response.data);
        this.campaigns.push(this.campaign);

      })
    },
    updateCampaign(){
      this.campaign = Campaign.fromDisplayableCampaign(this.campaign);
      this.campaignService.update(this.campaign.id, this.campaign)
          .then((response)=>{
            this.campaign[this.findIndexById(response.data.id)] =
                Campaign.toDisplayableCampaign(response.data);
            this.notifySuccessfulAction("Campaign Updated");
          });
    }
  }
}
</script>

<template>
  <section class="campaign-section">
    <div  class="container-title">
      <h2 class="title"> Panel</h2>
      <div>
        <pv-button class="mr-2 title-button" icon="pi pi-plus" label="New" severity="success" @click="onNewItemEventHandler"></pv-button>
        <pv-button class="mr-2 title-button" icon="pi pi-filter" label="Filter" severity="secondary" ></pv-button>
      </div>
    </div>


    <div class="container-cards" :style="{ position: 'relative'} ">
      <div v-for="campaign in campaigns" :key="campaign.id" class="card">
        <campaign-view :campaign="campaign" @viewMore="handleViewMore"/>
      </div>

    </div>
    <campaign-create-and-edit
        :item="campaign"
        :visible="isVisibleCard"
        :edit="isEdit"
        v-on:canceled="onCanceledEventHandler"
        v-on:saved="onSavedEventHandler($event)"/>
  </section>




</template>

<style scoped>
.campaign-section{
  padding:20px;
}
.container-cards{
  display:flex;
  justify-content:center;
  flex-wrap: wrap;
  margin-top: 100px;
  height: 100vh;
  gap:20px;
  width: 100%;
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

@media (min-width: 750px) {
}

@media (min-width: 1400px) {

}

</style>