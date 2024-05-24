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
      campaignService:null,
      items: [
        {
          label: 'Add',
          icon: 'pi pi-pencil',
          command: () => {
            this.$toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
        },
        {
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
            this.$toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            this.$toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
        },
        {
          label: 'Upload',
          icon: 'pi pi-upload',
          command: () => {
            this.$router.push('/fileupload');
          }
        },
        {
          label: 'Vue Website',
          icon: 'pi pi-external-link',
          command: () => {
            window.location.href = 'https://vuejs.org/';
          }
        }
      ]
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
  <section class="campaign-section">
    <div  class="container-title">
      <h2 class="title"> Panel</h2>
      <div>
        <pv-button class="mr-2 title-button" icon="pi pi-plus" label="New" severity="success" ></pv-button>
        <pv-button class="mr-2 title-button" icon="pi pi-filter" label="Filter" severity="secondary" ></pv-button>
      </div>
    </div>


    <div class="container-cards" :style="{ position: 'relative'} ">
      <div v-for="campaign in campaigns" :key="campaign.id" class="card">
        <campaign-view :campaign="campaign" @viewMore="handleViewMore"/>
      </div>

    </div>
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