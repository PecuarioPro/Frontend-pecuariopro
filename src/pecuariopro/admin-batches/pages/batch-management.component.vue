<script>
import BatchView from "../components/batch-view.component.vue";
import {BatchApiService} from "../services/batch-api.service.js";
import {Batch} from "../model/batch.entity.js";
import BatchCreateAndEdit from "../components/batch-create-and-edit.component.vue";
import CampaignCreateAndEdit from "../../admin-campaign/components/campaign-create-and-edit.component.vue";
import CampaignView from "../../admin-campaign/components/campaign-view.vue";
import BatchFilterPage from "./batch-filter-page.component.vue";

export default {
  name: "batch-management",
  components: {BatchFilterPage, CampaignView, CampaignCreateAndEdit, BatchCreateAndEdit, BatchView},
  data() {
    return {
      batch: {},
      batchesService: null,
      batches: [],
      allBatches:[],//array for filter
      selectedBatches:[], //array for delete selected
      isVisibleCard: false,
      isEdit: false,
      submitted: false,
      deleteFlag:false,
      visibleFilter:false,
      wasFilter:false

    };
  },
  created() {
    this.batchesService = new BatchApiService();
    this.getBatches();
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({severity: "contrast", summary: "Success", detail: message, life: 3000});
    },
    findIndexById(id) {
      return this.batches.findIndex((batch) => batch.id === id);
    },
    onFilterSelected(){
    this.visibleFilter=!this.visibleFilter;
    },
    handleViewBovines(batch) {
      this.$router.push({
        name: "batchDetails",
        params: {campaignId: this.batch.campaignId, batchId: batch.id}
      });
    },
    getBatches() {
      this.batchesService.getAll().then((response) => {
        console.log(response.data);
        let batches = response.data;
        this.batches = batches.filter(batch => batch.campaignId == this.$route.params.campaignId)
            .map(batch => Batch.toDisplayableBatch(batch));
        console.log("batches filtrados",this.batches);
        this.allBatches = [...this.batches];
      });
    },

    onNewItemEventHandler() {
      this.batch = {};
      this.submitted = false;
      this.isEdit = false;
      this.isVisibleCard = true;
      console.log(`soy el flag de crear y estoy prendiendo ${this.isVisibleCard}`)
    },
    onEditItemEventHandler(item) {
      this.batch = item;
      this.submitted = false;
      this.isEdit = true;
      this.isVisibleCard = true;
      console.log(`soy el flag de editar de batch y estoy prendiendo ${this.isVisibleCard}`)
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
      if (this.batch.name.trim()) {
        if (item.id) {
          console.log("soy el update");
          this.updateBatch();
        } else {
          console.log("soy el crear");
          this.createBatch();
          console.log("Sigo del create");
        }
      }
      this.isVisibleCard = false;
      console.log(`soy el card y estoy apagandome2 ${this.isVisibleCard}`)
      this.isEdit = false;
    },
    deleteAction(){
      this.deleteFlag=!this.deleteFlag;

    },
    deleteSelection() {
      if (this.selectedBatches) {
        this.selectedBatches.forEach((batch) => {
          console.log(this.selectedBatches);
          this.batchesService.delete(batch).then(() => {
            this.batches = this.batches.filter((b) => b.id !== batch);
          });
        });
      }
      this.deleteFlag = !this.deleteFlag;
      this.allBatches = [...this.batches];
    },
    onDeleteItemEventHandler(item) {
      this.batch = item;
      this.deleteBatch();
    },

    //CRUD METHODS
    createBatch(){
      this.batch = Batch.fromDisplayableBatch(this.batch);
      //aggregate default values if is necessary
      this.batch.status= 'Empty';
      this.batch.campaignId= this.$route.params.campaignId;
      this.batchesService.create(this.batch).then((response) => {
        this.batch = Batch.toDisplayableBatch(response.data);
        this.batches.push(this.batch);
        this.notifySuccessfulAction("Batch Created");

      })
      console.log('Estas son las campaigns',this.batches);
      this.allBatches = [...this.batches];

    },
    updateBatch(){
      this.batch = Batch.fromDisplayableBatch(this.batch);
      this.batchesService.update(this.batch.id, this.batch)
          .then((response)=>{
            this.batches[this.findIndexById(response.data.id)] =
                Batch.toDisplayableBatch(response.data);
            this.notifySuccessfulAction("Batch Updated");

          });
      this.allBatches = [...this.batches];

    },
    deleteBatch(){
      this.batchesService.delete(this.batch.id)
          .then(()=>{
            this.batches=this.batches.filter((t)=>t.id !==this.batch.id);
            this.batch = {};
            this.notifySuccessfulAction("Batch Deleted");
          });
      this.allBatches = [...this.batches];
    },

    //Filter methods
    onFilter(value){
      if (typeof value !== 'string') {
        return;
      }
      const searchValue = value.toLowerCase();

      this.batches = this.allBatches.filter(batch => {
        return batch.name && batch.name.toLowerCase().includes(searchValue);
      });
      this.wasFilter = true;
    },
    onFilterForStatus(value){
      const statusValue = value.toLowerCase();

      this.batches = this.allBatches.filter(batch => {
        return batch.status.toLowerCase() === statusValue;
      });
      this.wasFilter = true;
    },
    onFilterArea(object){
      if(object.maxValue === object.minValue){
        this.batches = this.allBatches.filter( batch =>{
          return batch.area > object.minValue && batch.area < object.maxValue;
        });
      }
      else{
        this.batches = this.allBatches.filter( batch =>{
          return batch.area > object.minValue;
        });
      }
      this.wasFilter=true;
    },
    closeFilter(){
      this.batches = this.allBatches;
      this.wasFilter=false;

    }



  }
}

</script>

<template>
  <section>
    <pv-toast />
    <div  class="container-title">
      <h2 class="title"> My Batches</h2>
      <div>
        <div class="button-group-desktop" v-if="!deleteFlag">
          <pv-button class="mr-2 title-button btn-new" icon="pi pi-plus" label="New" severity="secondary" @click="onNewItemEventHandler"></pv-button>
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-filter" label="Filter" severity="secondary" text @click="onFilterSelected"></pv-button>
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-trash" severity="secondary" text @click="deleteAction"></pv-button>
        </div>
        <div class="button-group-mobile" v-if="!deleteFlag">
          <pv-button class="mr-2 icon-button btn-new" icon="pi pi-plus" severity="secondary" @click="onNewItemEventHandler"></pv-button>
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-filter" severity="secondary" text></pv-button>
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-trash" severity="secondary" text @click="deleteAction"></pv-button>
        </div>

        <div v-if="deleteFlag">
          <pv-button class="mr-2 title-button" icon="pi pi-trash" severity="success" label="Delete" @click="deleteSelection"></pv-button>
          <pv-button class="mr-2 title-button"  severity="secondary" v-if="deleteFlag" label="Cancel" @click="deleteAction"></pv-button>
        </div>

      </div>
    </div>

    <div class="on-filter flex display-flex align-items-center flex-direction-row justify-content-space-between " v-if=" wasFilter!==false" >
      <div class="filter-total-results flex gap-3">
        <p> Total Results:</p>
        <p>{{batches.length.toString()}}</p>
      </div>

      <pv-button class="mr-2 title-button " icon="pi pi-times" text rounded severity="secondary"  @click="closeFilter"></pv-button>
    </div>


    <div class="container-cards">
      <div v-for="batch in batches" :key="batch.id">
        <div class="flex align-items-center" v-if="deleteFlag">
          <pv-checkbox v-model="selectedBatches" :inputId="batch.id" name="batch" :value="batch.id" ></pv-checkbox>
        </div>
        <batch-view :batch="batch" @viewBovines="handleViewBovines" @Edit="onEditItemEventHandler" @Delete="onDeleteItemEventHandler"/>
      </div>
    </div>
  </section>
<batch-create-and-edit
    :item="batch"
    :visible="isVisibleCard"
    :edit="isEdit"
    @canceled="onCanceledEventHandler"
    @saved2="onSavedEventHandler($event)"/>

  <div class="app-content">

    <template>
      <div class="card flex justify-content-center">
        <pv-sidebar v-model:visible="visibleFilter"  position="right" style="width: 25rem;">
          <batch-filter-page @closeFilter="onFilterSelected"
                       @filter1="onFilter($event)"
                       @filter-status="onFilterForStatus($event)"
                       @filter-area="onFilterArea($event)"
          />
        </pv-sidebar>
      </div>
    </template>
  </div>




</template>

<style scoped>
.container-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 100px;
  height: 100vh;
  gap: 20px;
  width: 100%;
}
.title{
  font-weight:500;
  font-size:25px;
}
.container-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #34d399;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.title-button {
  height: 50px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
}
.btn-action:hover {
  color: #32C793;
}
.btn-new:hover {
  color: #32C793;
}
.button-group-desktop {
  display: none;
}
.button-group-mobile {
  display: flex;
}
.on-filter{
  width: 100%;
  justify-content: space-between;
}
@media (min-width: 750px) {
  .container-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0px;
  }
  .button-group-desktop {
    display: flex;
  }
  .button-group-mobile {
    display: none;
  }
}
</style>