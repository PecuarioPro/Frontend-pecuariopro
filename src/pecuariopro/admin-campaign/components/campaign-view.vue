<script>
import {Campaign} from "../model/campaign.entity.js";

export default {
  name: "campaign-view",
  components: {},
  props: {
    campaign: Campaign
  },
  data(){

    return {
      items: [

        {
          label: 'Update',
          icon: 'pi pi-pencil',
          command: () => {
            this.$emit('Edit',this.campaign);
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            this.$emit('Delete',this.campaign);
          }
        }
      ]
    }


  },
  methods:{
    viewMore(){
      this.$emit('viewMore', this.campaign);
    },
    formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }
}
</script>

<template>
  <div :style="{ position: 'relative'} ">
    <pv-toast />
    <pv-speed-dial :model="items" direction="down" mask :style="{ right: '-10px', top: '-15px' }" />

    <pv-card class="custom-card">


      <template #title >
        <p class="card-title"> {{ campaign.name }}</p>
      </template>

      <template #content>
        <div class="card-content">
          <div>
            <p>Start</p>
            <p>{{ formatDate(campaign.dateStart) }}</p>
          </div>

          <div>
            <p>End</p>
            <p>{{ formatDate(campaign.dateEnd) }}</p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="card-footer">
          <pv-button label="View More" class="w-full" @click="viewMore" />
        </div>
      </template>
    </pv-card>
  </div>

</template>

<style scoped>
.custom-card {
  width: 20rem;
  height: 20rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding:0.5rem;
}

.card-title{
  font-size: 20px;
}

.card-content {
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 0.1rem;
  display:flex;
  justify-content: space-between;

}

.card-content div {
  margin-bottom: 0.5rem;
}

.card-content p {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-footer {
  margin-top: auto;
}

@media (min-width: 750px) {
  .custom-card {
    width: 20rem;
    height: 20rem;
  }
}

@media (min-width: 1400px) {
  
}
</style>