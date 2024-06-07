<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";
export default {
  name: "bovine-create-and-edit.component",
  components: { createAndEdit },
  props: {
    item: null,
    item2:null,
    visible: Boolean,
    statuses: Array
  },
  data() {
    return {
      submitted: false,
    }
  },
  methods:{
    created(){
      this.item2=this.item.origin;
      console.log(this.item);
    },
    canceledEventHandler() {
      this.$emit('canceled');
    },
    savedEventHandler() {
      console.log(this.item);
      this.submitted = true;
     this.updateItem();
      // Verificar si los campos requeridos están llenos
      if (this.item.name && this.item.weight && this.item.raza) {
        this.$emit('saved2', this.item);
      }
    },
    updateItem() {
      if (!this.item.origin) {
        this.item.origin = {};
      }
      this.item.origin = this.item2;
      this.item.batchId = this.$route.params.batchId;
      console.log(this.item);
    }

  }
}
</script>

<template>
  <create-and-edit :entity="this.item" :visible="visible" entityName="Bovine" @canceled="canceledEventHandler" @saved="savedEventHandler" size="extra-large">
    <template #content>
      <div class="p-fluid container-dialog">

        <div class="container-form">
          <div class="field mt-5 container-field">
            <label for="name">Name</label>
            <pv-float-label>
              <pv-input-text id="name" v-model="this.item.name" :class="{'p-invalid': submitted && !this.item.name}"/>
              <small v-if="submitted && !this.item.name" class="p-invalid">Name is required.</small>
            </pv-float-label>
          </div>
          <div class="field mt-5 container-field">
            <label for="race">Race</label>
            <pv-float-label>
              <pv-input-text id="race" v-model="this.item.raza" :class="{'p-invalid': submitted && !this.item.race}"/>
              <small v-if="submitted && !this.item.raza" class="p-invalid">Race is required.</small>
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="date">Date</label>
            <pv-float-label>
              <pv-calendar inputId="date" v-model="this.item.date" showIcon iconDisplay="input" :class="{'p-invalid': submitted && !this.item.date}"/>
              <small v-if="submitted && !this.item.date" class="p-invalid">Date is required.</small>
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="weight">Weight</label>
            <pv-float-label>
              <pv-input-number id="weight" v-model="this.item.weight" :class="{'p-invalid': submitted && !this.item.weight}"/>
              <small v-if="submitted && !this.item.weight" class="p-invalid">Weight is required.</small>
            </pv-float-label>
          </div>
          <div class="field mt-5 container-field">
            <label for="department">Department</label>
            <pv-float-label>
              <pv-input-text id="department" v-model="this.item2.department" class="p-inputtext p-component" />
            </pv-float-label>
          </div>
          <div class="field mt-5 container-field">
            <label for="city">City</label>
            <pv-float-label>
              <pv-input-text id="city" v-model="this.item2.city" class="p-inputtext p-component" />
            </pv-float-label>
          </div>
          <div class="field mt-5 container-field">
            <label for="district">District</label>
            <pv-float-label>
              <pv-input-text id="district" v-model="this.item2.district" class="p-inputtext p-component" />
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="observations">Additional Information</label>
            <pv-float-label>
              <pv-textarea v-model="this.item.observations" autoResize rows="10" cols="30" />
            </pv-float-label>
          </div>
        </div>

        <div class="container-gallery">
          hsdffds

        </div>


      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
.container-field label{
  margin-bottom:5px;
}

@media (min-width: 1400px){
  .container-dialog{
    display:flex;
    gap:20px;
  }
  .container-form{
    width:400px;
    display:flex;
    flex-direction:column;
    align-items: center;
  }
  .container-field{
    width:100%;
  }

}


</style>