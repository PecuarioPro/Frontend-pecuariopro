<script>

import {Batch} from "../model/batch.entity.js";

export default {
  name: "batch-view",
  props:{
    batch: Batch
  },
  methods:{
    viewBovines(){
      this.$emit('viewBovines',this.batch);
    }
  }
}
</script>

<template>
  <pv-card style="overflow: hidden" class="custom-card">
    <template #title>{{batch.name}}</template>
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