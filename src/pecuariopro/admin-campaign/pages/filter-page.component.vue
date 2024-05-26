<script>

export default {
  name: "filter-page",
  components: {},
  props: {
    visible: Boolean
  },
  methods: {
    close() {
      this.$emit('closeFilter');
    }
  }
}
</script>

<template>
  <pv-sidebar :visible="visible" header="Filter Campaigns" position="right" style="width: 20rem;" :class="{ 'sidebar-transition': visible }" @hide="close">
    <template #container="{ closeCallback }">
      <div class="filter-container">
        <pv-button type="button" @click="close" icon="pi pi-times" class="button-close"></pv-button>
        <div class="card">
          <pv-stepper orientation="vertical">
            <pv-stepper-panel header="Name">
              <template #content="{ nextCallback }">
                <div class="flex flex-column h-12rem">
                  <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div>
                </div>
                <div class="flex py-4 container-buttons-actions" >
                  <pv-button label="Filter" severity="Primary" class="container-buttons-actions__filter" @click="nextCallback" />
                  <pv-button label="Cancel"  severity="secondary" @click="close" />
                </div>
              </template>
            </pv-stepper-panel>
            <pv-stepper-panel header="Condition">
              <template #content="{ prevCallback, nextCallback }">
                <div class="flex flex-column h-12rem">
                  <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
                </div>
                <div class="flex py-4 gap-2">
                  <pv-button label="Filter" severity="Primary" class="container-buttons-actions__filter" @click="nextCallback" />
                  <pv-button label="Cancel"  severity="secondary" @click="close" />
                </div>
              </template>
            </pv-stepper-panel>
            <pv-stepper-panel header="Duration">
              <template #content="{ prevCallback }">
                <div class="flex flex-column h-12rem">
                  <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
                </div>
                <div class="flex py-4">
                  <pv-button label="Filter" severity="Primary" class="container-buttons-actions__filter" @click="nextCallback" />
                  <pv-button label="Cancel"  severity="secondary" @click="close" />
                </div>
              </template>
            </pv-stepper-panel>
            <pv-stepper-panel header="Date">
              <template #content="{ prevCallback }">
                <div class="flex flex-column h-12rem">
                  <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content VI</div>
                </div>
                <div class="flex py-4">
                  <pv-button label="Filter" severity="Primary" class="container-buttons-actions__filter" @click="nextCallback" />
                  <pv-button label="Cancel"  severity="secondary" @click="close" />
                </div>
              </template>
            </pv-stepper-panel>
          </pv-stepper>
        </div>
      </div>
    </template>
  </pv-sidebar>
</template>

<style scoped>
.filter-content {
  padding: 20px;
}

.button-close{
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-top: 5px;
  margin-left: 5px;
}

.button-close:hover{
  background-color: #27272a;
  color: #ffffff;
}
.container-buttons-actions{
  gap:5px;
}
.container-buttons-actions__filter{
  background-color:transparent;
  border: 1px solid #34d399;
  color: white;
}
.container-buttons-actions__filter:hover{
  background-color:#34d399;
  border: 1px solid #34d399;
  color: #27272a;
}
.sidebar-transition {
  transition: width 2s ease;
}
</style>