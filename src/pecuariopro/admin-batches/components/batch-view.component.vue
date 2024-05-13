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
  <pv-card style="width: 25rem; overflow: hidden">
    <template #title>{{batch.name}}</template>
    <template #subtitle>
      <p>Area: </p>
      <p>{{batch.area}}</p>
    </template>
    <template #content>
      <div>
        <p>Status</p>
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

</style>