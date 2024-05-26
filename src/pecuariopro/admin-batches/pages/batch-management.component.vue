<script>
import BatchView from "../components/batch-view.component.vue";
import {BatchApiService} from "../services/batch-api.service.js";
import {Batch} from "../model/batch.entity.js";

export default {
  name: "batch-management",
  components: {BatchView},
  data() {
    return {
      batch: {},
      batchesService: null,
      batches: [],
      selectedBatches:[],
      isVisibleCard: false,
      submitted: false,
      deleteFlag:false
    };
  },
  created() {
    this.batchesService = new BatchApiService();
    this.getBatches();
  },
  methods: {

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
      });
    },

    onNewItemEventHandler() {
      this.batch = {};
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
    },


    //CRUD METHODS
    createBatch(){
      this.batch = Batch.fromDisplayableBatch(this.batch);
      //aggregate default values if is necessary
      this.batchesService.create(this.batch).then((response) => {
        this.batch = Batch.toDisplayableBatch(response.data);
        this.batches.push(this.batch);

      })
      console.log('Estas son las campaigns',this.batches);
    },
    updateBatch(){
      this.batch = Batch.fromDisplayableBatch(this.batch);
      this.batchesService.update(this.batch.id, this.batch)
          .then((response)=>{
            this.batch[this.findIndexById(response.data.id)] =
                Batch.toDisplayableBatch(response.data);
          });
    }

  }
}

</script>

<template>
  <section>
    <div  class="container-title">
      <h2 class="title"> My Batches</h2>
      <div>
        <div v-if="!deleteFlag">
          <pv-button class="mr-2 title-button" icon="pi pi-plus" label="New" severity="success" @click="onNewItemEventHandler"></pv-button>
          <pv-button class="mr-2 title-button" icon="pi pi-filter" label="Filter" severity="secondary" ></pv-button>
          <pv-button class="mr-2 title-button" icon="pi pi-trash" severity="secondary" v-if="!deleteFlag" @click="deleteAction"></pv-button>
        </div>

        <div v-if="deleteFlag">
          <pv-button class="mr-2 title-button" icon="pi pi-trash" severity="success" label="Delete" @click="deleteSelection"></pv-button>
          <pv-button class="mr-2 title-button"  severity="secondary" v-if="deleteFlag" label="Cancel" @click="deleteAction"></pv-button>
        </div>

      </div>
    </div>

    <div class="container-cards">
      <div v-for="batch in batches" :key="batch.id">
        <div class="flex align-items-center" v-if="deleteFlag">
          <pv-checkbox v-model="selectedBatches" :inputId="batch.id" name="batch" :value="batch.id" ></pv-checkbox>
        </div>
        <batch-view :batch="batch" @viewBovines="handleViewBovines"/>
      </div>
    </div>
  </section>


</template>

<style scoped>
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
  border-bottom: 1px solid #34d399; /* borde de color verde */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* sombra para resaltar */

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