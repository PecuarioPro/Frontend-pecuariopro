<script>
import {Campaign} from "../model/campaign.entity.js";

export default {
  name: "campaign-view",
  props: {
    campaign: Campaign
  },
  methods:{
    viewMore(){
      this.$emit('viewMore', this.campaign);
    }
  }
}
</script>

<template>

  <pv-card style="width: 25rem; overflow: hidden">
    <template #title>{{campaign.name}}</template>
    <template #subtitle>
      <p>Objective: </p>
      <p>{{campaign.objective}}</p>
    </template>
    <template #content>
      <div>
        <p>Start</p>
        <p>{{campaign.dateStart}}</p>
      </div>

      <div>
        <p>End</p>
        <p>{{campaign.dateEnd}}</p>
       </div>
    </template>
    <template #footer>
      <div class="flex gap-3 mt-1">
        <pv-button label="View More" class="w-full" @click="viewMore" />
      </div>
    </template>
  </pv-card>
</template>

<style scoped>

</style>