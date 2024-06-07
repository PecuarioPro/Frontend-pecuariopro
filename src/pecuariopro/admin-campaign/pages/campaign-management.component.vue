<script>
import CampaignView from "../components/campaign-view.vue";
import {CampaignApiService} from "../services/campaign-api.service.js";
import {Campaign} from "../model/campaign.entity.js";
import CampaignCreateAndEdit from "../components/campaign-create-and-edit.component.vue";
import FilterPage from "./filter-page.component.vue";


export default {
  name: "campaign-management",
  components: {FilterPage, CampaignCreateAndEdit, CampaignView},
  props: {
  },
  data(){
    return{
      title:{ singular: 'Bovine', plural: 'Bovines' },
      campaign: {},
      campaigns: [],
      allCampaigns:[],//array for filter
      campaignService:null,
      selectedCampaigns:[],//array for delete selected
      isVisibleCard: false,
      isEdit: false,
      submitted: false,
      deleteFlag:false,
      visibleFilter:false,
      wasFilter:false
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
          condition: campaign.condition
        });
      });
      console.log("este es el array",this.campaigns);
      this.allCampaigns = [...this.campaigns];
    });


  },
  methods:{
    notifySuccessfulAction(message) {
      this.$toast.add({severity: "contrast", summary: "Success", detail: message, life: 3000});
    },
    handleViewMore(campaign) {
      this.$router.push({ name: 'campaignDetails', params: { campaignId: campaign.id }});
      //, params: { id: campaign.id }
    },
    findIndexById(id) {
      return this.campaigns.findIndex((campaign) => campaign.id === id);
    },

    onFilterSelected(){
      this.visibleFilter=!this.visibleFilter;
    },


    onNewItemEventHandler() {
    this.campaign = {};
    this.submitted = false;
    this.isEdit = false;
    this.isVisibleCard = true;
    console.log(`soy el flag de crear y estoy prendiendo ${this.isVisibleCard}`)
  },
    onEditItemEventHandler(item) {
      this.campaign = item;
      this.submitted = false;
      this.isEdit = true;
      this.isVisibleCard = true;
      console.log(`soy el flag de editar de campaign y estoy prendiendo ${this.isVisibleCard}`)
      // this.createAndEditDialogIsVisible = true aqui ira la card para editar;
    },

  onCanceledEventHandler() {
    this.submitted = false;
    this.isEdit = false;
    this.isVisibleCard=false;
    console.log(`soy el flag y estoy apagandome1 ${this.isVisibleCard}`)
  },
  onSavedEventHandler(item) {
    this.submitted = true;
    if (this.campaign.name.trim()) {
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
    toggleSelection(campaign) {
      const index = this.selectedCampaigns.findIndex(c => c.id === campaign.id);
      if (index > -1) {
        this.selectedCampaigns.splice(index, 1);
      } else {
        this.selectedCampaigns.push(campaign);
      }
      console.log('Selected campaigns:', this.selectedCampaigns);
    },

    deleteAction(){
      this.deleteFlag=!this.deleteFlag;

    },
    deleteSelection() {
      if (this.selectedCampaigns) {
        this.selectedCampaigns.forEach((campaign) => {
          console.log(this.selectedCampaigns);
          this.campaignService.delete(campaign).then(() => {
            this.campaigns = this.campaigns.filter((c) => c.id !== campaign);
          });
        });
      }
      this.deleteFlag = !this.deleteFlag;
      this.allCampaigns = [...this.campaigns];
    },
  onDeleteItemEventHandler(item) {
    this.campaign = item;
    this.deleteCampaign();
  },
    //CRUD METHODS
    createCampaign(){
      this.campaign = Campaign.fromDisplayableCampaign(this.campaign);
      this.campaign.condition='Active';
      this.campaignService.create(this.campaign).then((response) => {
        this.campaign = Campaign.toDisplayableCampaign(response.data);
        this.campaigns.push(this.campaign);
        this.notifySuccessfulAction("Campaign Created");
      })
      console.log('Estas son las campaigns',this.campaigns);
      this.allCampaigns = [...this.campaigns];

    },
    updateCampaign(){
      this.campaign = Campaign.fromDisplayableCampaign(this.campaign);
      this.campaignService.update(this.campaign.id, this.campaign)
          .then((response)=>{
            this.campaigns[this.findIndexById(response.data.id)] =
                Campaign.toDisplayableCampaign(response.data);
            this.notifySuccessfulAction("Campaign Updated");
          });
      this.allCampaigns = [...this.campaigns];

    },
    deleteCampaign(){
      this.campaignService.delete(this.campaign.id)
          .then(()=>{
            this.campaigns=this.campaigns.filter((t)=>t.id !==this.campaign.id);
            this.campaign = {};
            this.notifySuccessfulAction("Campaign Deleted");
          })
      this.allCampaigns = [...this.campaigns];
    },

    onFilter(value) {
      if (typeof value !== 'string') {
        return;
      }

      const searchValue = value.toLowerCase();

      this.campaigns = this.allCampaigns.filter(campaign => {
        return campaign.name && campaign.name.toLowerCase().includes(searchValue);
      });
      this.wasFilter=true;
    },

    onFilterForCondition(value){
      const conditionValue = value.toLowerCase();

      this.campaigns = this.allCampaigns.filter(campaign => {
        return campaign.condition.toLowerCase() === conditionValue;
      });
      this.wasFilter=true;
    },

    onFilterForDuration(object){
      this.campaigns = this.allCampaigns.filter( campaign =>{
        console.log('Soy campaign', this,campaign.id,this.campaign.duration,object);
        return campaign.duration > object.minValue && campaign.duration < object.maxValue;
      });
      this.wasFilter=true;
    },

    onFilterDate(object){
      this.campaigns = this.allCampaigns.filter(campaign =>{
        return campaign.dateStart >= object.initial && campaign.dateEnd <= object.final;
      });
      this.wasFilter=true;
    },
    closeFilter(){
     this.campaigns=this.allCampaigns;
     this.wasFilter=false;
    }

  }
}
</script>

<template>
  <section class="campaign-section" :style="{ position: 'relative'} ">
    <pv-toast />
    <div class="container-title">
      <p class="container-title--title">My campaigns</p>
      <div>
        <div class="button-group-desktop" v-if="!deleteFlag">
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-plus" label="New" severity="secondary" @click="onNewItemEventHandler"></pv-button>
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-filter" label="Filter" severity="secondary" text  @click="onFilterSelected"></pv-button>
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-trash" severity="secondary" text  @click="deleteAction"></pv-button>
        </div>

        <div class="button-group-mobile" v-if="!deleteFlag">
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-plus" severity="secondary"  @click="onNewItemEventHandler"></pv-button>
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-filter" severity="secondary" @click="onFilterSelected"></pv-button>
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-trash" severity="secondary" @click="deleteAction"></pv-button>
        </div>

        <div v-if="deleteFlag">
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-trash" severity="secondary" label="Delete" @click="deleteSelection"></pv-button>
          <pv-button class="mr-2 title-button btn-action"  severity="secondary" v-if="deleteFlag" text label="Cancel" @click="deleteAction"></pv-button>
        </div>

      </div>
    </div>

    <div class="on-filter flex display-flex align-items-center flex-direction-row justify-content-space-between " v-if=" wasFilter!==false" >
      <div class="filter-total-results flex gap-3">
        <p> Total Results:</p>
        <p>{{campaigns.length.toString()}}</p>
      </div>

      <pv-button class="mr-2 title-button " icon="pi pi-times" text rounded severity="secondary"  @click="closeFilter"></pv-button>
    </div>


    <div class="container-cards" >
      <div v-for="campaign in campaigns" :key="campaign.id" class="card">
        <div class="flex align-items-center" v-if="deleteFlag">
          <pv-checkbox v-model="selectedCampaigns" :inputId="campaign.id" name="campaign" :value="campaign.id" ></pv-checkbox>
        </div>
        <campaign-view :campaign="campaign" @viewMore="handleViewMore" @Edit="onEditItemEventHandler" @Delete="onDeleteItemEventHandler"/>
      </div>

    </div>
    <campaign-create-and-edit
        :item="campaign"
        :visible="isVisibleCard"
        :edit="isEdit"
        @canceled="onCanceledEventHandler"
        @saved2="onSavedEventHandler($event)"/>

    <div class="app-content">

      <template>
        <div class="card flex justify-content-center">
          <pv-sidebar v-model:visible="visibleFilter"  position="right" style="width: 25rem;">
              <filter-page @closeFilter="onFilterSelected"
                           @filter1="onFilter($event)"
                           @filter-condition="onFilterForCondition($event)"
                           @filter-duration="onFilterForDuration($event)"
                           @filter-date="onFilterDate($event)"


              />
          </pv-sidebar>
        </div>
      </template>
    </div>

  </section>




</template>

<style scoped>
.campaign-section{
  padding:20px;
}
.on-filter{
  width: 100%;
  justify-content: space-between;
}
.container-cards{
  display:flex;
  justify-content:center;
  flex-wrap: wrap;
  margin-top: 50px;
  height: 100vh;
  gap:20px;
  width: 100%;
}
.container-title{
  margin-top: 15px;
  display:flex;
  flex-direction:column;
  justify-content: space-between;
  padding:8px;
  border-bottom:#32C793 1px solid ;
}
.title-button{
  height:50px;
  color:white;
  font-size:15px;
  font-weight:500;
  text-align: center;
}

.btn-action:hover{
  color:#32C793;
}

.filter-total-results p{
  font-weight:500;
}

.button-group-desktop {
  display: none;
}

.button-group-mobile {
  display: flex;
}

.container-title--title{
  font-weight:500;
  font-size:25px;
}

@media (min-width: 750px) {

  .container-title{
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items:center;
    padding-bottom:0px;
  }
  .button-group-desktop {
    display: flex;
  }

  .button-group-mobile {
    display: none;
  }

}

@media (min-width: 1400px) {

}

</style>