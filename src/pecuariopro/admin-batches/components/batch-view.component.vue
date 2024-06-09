<script>

import {Batch} from "../model/batch.entity.js";

export default {
  name: "batch-view",
  components: {},
  props:{
    batch: Batch
  },
  data(){

    return {
      items: [

        {
          label: 'Update',
          icon: 'pi pi-pencil',
          command: () => {
            this.$emit('Edit',this.batch);
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            this.$emit('Delete',this.batch);
          }
        }
      ]
    }


  },

  methods:{
    viewBovines(){
      this.$emit('viewBovines',this.batch);
    }
  }
}
</script>

<template>
  <div :style="{ position: 'relative'} ">

      <pv-speed-dial :model="items" direction="down" mask :style="{ right: '-10px', top: '-15px' }" />

    <pv-card  class="custom-card">


      <template #title>{{batch.name}}
        </template>
      <template #subtitle>
        <div class="container-subtitle"> <p style="font-weight:bold">Area: </p>
          <p>{{batch.area}}</p>
        </div>

      </template>
      <template #content>
        <div>
          <p style="font-weight:bold">Status</p>
          <p>{{batch.status}}</p>
        </div>

      </template>
      <template #footer>
        <div class="flex gap-3 mt-1">
          <pv-button label="View Bovines" class="w-full" @click="viewBovines" />
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
.container-subtitle{
  display:flex;
  gap:5px;
}
</style>