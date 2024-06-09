<script>


export default {
  name: "filter-page",
  components: {},
  props: {
    visible: Boolean
  },
  data(){
    return{
      conditions:[
        {name: "Active", key: "A"},
        {name: "Finished", key: "F"}
      ],
      selectedConditions:null,
      minmaxValues:{},
      minValue:null,
      maxValue:null,
      filterNameValue:null,
      initialDateValue:null,
      finalDateValue:null,
      datesValue:{}
    }

  },
  methods: {
    close() {
      this.$emit('closeFilter');
    },
    filterForName(){
      this.$emit('filter1',this.filterNameValue);
      this.close();
    },
    filterForCondition(){
      if(this.selectedConditions){
        this.$emit('filter-condition',this.selectedConditions);
        this.close();
      }
    },
    filterForDuration(){
      console.log(this.minValue,this.maxValue);
      if(this.minValue !=null && this.maxValue != null){
        this.minmaxValues.minValue = this.minValue;
        this. minmaxValues.maxValue = this.maxValue;
        this.$emit('filter-duration', this.minmaxValues);
        this.close();
      }


    },
    filterForDate(){
      console.log(typeof this.initialDateValue);
      this.datesValue.initial=this.initialDateValue;
      this.datesValue.final=this.finalDateValue;
      this.$emit('filter-date', this.datesValue);
      this.close();

    }

  }
}
</script>

<template>
    <div class="filter-container">
      <div class="card">
        <pv-stepper orientation="vertical">
          <pv-stepper-panel header="Name" class="panel-with-large-header">
            <template #content="{ nextCallback }">
              <div class="flex flex-column h-12rem">
                <div class=" border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium " id="container-name">
                  <pv-icon-field iconPosition="left">
                    <pv-input-icon class="pi pi-search" > </pv-input-icon>
                    <pv-input-text placeholder="Search" v-model="filterNameValue" @change="filterForName"/>
                  </pv-icon-field>
                  <p class="custom-paragraph">Search for the name of your campaign </p>
                </div>
              </div>
              <div class="flex py-4 container-buttons-actions" >
                <pv-button label="Filter" severity="Primary" class="container-buttons-actions__filter" @click="filterForName" />
                <pv-button label="Cancel"  severity="secondary" @click="close" />
              </div>
            </template>
          </pv-stepper-panel>
          <pv-stepper-panel header="Condition">
            <template #content="{ prevCallback, nextCallback }">
              <div class="flex flex-column h-10rem">
                <div class=" border-round surface-ground flex-auto flex align-items-center font-medium " id="container-condition">
                  <div class="flex flex-column gap-2 container-radio-buttons flex ">
                    <p>Select the condition</p>
                    <div v-for="condition of conditions" :key="condition.key" class="flex align-items-center gap-2 " :style="{ margin: '5px 0' }">
                      <pv-radio-button v-model="selectedConditions" :inputId="condition.key" name="condition" :value="condition.name" />
                      <label :for="condition.key">{{ condition.name }}</label>
                    </div>
                  </div>

                </div>
              </div>
              <div class="flex py-4 container-buttons-actions"  >
                <pv-button label="Filter" severity="Primary" class="container-buttons-actions__filter" @click="filterForCondition" />
                <pv-button label="Cancel"  severity="secondary" @click="close" />
              </div>
            </template>
          </pv-stepper-panel>
          <pv-stepper-panel header="Duration">
            <template #content="{ prevCallback }">
              <div class="flex flex-column h-12.5rem">
                <div class="surface-border border-round surface-ground flex-auto flex flex-column justify-content-center align-items-center font-medium">


                  <div class="flex-auto flex justify-content-center align-items-center font-medium">
                    <div class="input-number-duration ">
                      <p class="custom-paragraph">MIN</p>
                      <pv-input-number v-model="minValue" showButtons buttonLayout="vertical" style="width: 3rem" :min="0" :max="99" >
                        <template #incrementbuttonicon>
                          <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                          <span class="pi pi-minus" />
                        </template>
                      </pv-input-number>
                    </div>

                    <div :class="['input-number-duration', { 'hidden': minValue === null }]">
                      <p class="custom-paragraph">MAX</p>
                      <pv-input-number v-model="maxValue" showButtons buttonLayout="vertical" style="width: 3rem" :min="this.minValue" :max="99" >
                        <template #incrementbuttonicon>
                          <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                          <span class="pi pi-minus" />
                        </template>
                      </pv-input-number>
                    </div>
                  </div>

                  <p class="custom-paragraph">The duration is in days</p>

                </div>
              </div>
              <div class="flex py-4 container-buttons-actions" >
                <pv-button label="Filter" severity="Primary" class="container-buttons-actions__filter" @click="filterForDuration" />
                <pv-button label="Cancel"  severity="secondary" @click="close" />
              </div>
            </template>
          </pv-stepper-panel>

          <pv-stepper-panel header="Date">
            <template #content="{ prevCallback }">
              <div class="flex flex-column h-12rem">
                <div class="surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium container-dates">
                  <pv-float-label>
                    <pv-calendar class="calendar-dates" v-model="initialDateValue" showIcon iconDisplay="input" touchUI inputId="toDate"/>
                    <label for="toDate">Initial Date</label>
                  </pv-float-label>

                  <pv-float-label>
                    <pv-calendar class="calendar-dates" v-model="finalDateValue" showIcon iconDisplay="input" touchUI inputId="toDate"/>
                    <label for="toDate">Final Date</label>
                  </pv-float-label>

                </div>
              </div>
              <div class="flex py-4 container-buttons-actions" >
                <pv-button label="Filter" severity="Primary" class="container-buttons-actions__filter" @click="filterForDate" />
                <pv-button label="Cancel"  severity="secondary" @click="close" />
              </div>
            </template>
          </pv-stepper-panel>
        </pv-stepper>
      </div>
    </div>

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

#container-name{
  flex-direction:column;
  overflow: hidden;
}
.custom-paragraph {
  width: 80%;
  height: auto;
  text-align: center;
  line-height: normal;
  opacity: 80%;
}
.container-radio-buttons{
  padding:15px;
}
.container-radio-buttons p{
  opacity: 80%;
}
.input-number-duration{
  overflow: hidden;
  text-align: center;
  margin:0 15px;
}
.container-dates{
  flex-direction:column;
  gap:30px;
  align-items: center;
}
.calendar-dates:hover{
  cursor:pointer;
}
.hidden {
  display: none;
}
</style>