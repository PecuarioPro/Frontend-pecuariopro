<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";
export default {
  name: "bovine-create-and-edit.component",
  components: { createAndEdit },
  props: {
    item: null,
    formData: {
      department: null,
      city: null,
      district: null
    },
    visible: Boolean,
    statuses: Array
  },
  data() {
    return {
      submitted: false
    }
  },
  methods:{
    canceledEventHandler() {
      this.$emit('canceled');
    },
    savedEventHandler() {
      console.log(this.item);
      this.submitted = true;
      this.updateItem(this.formData);
      // Verificar si los campos requeridos están llenos
      if (this.item.name && this.item.weight && this.item.raza) {
        this.$emit('saved', this.item);
      }
    },
    updateItem(formData) {
      if (!this.item.origin) {
        this.item.origin = {};
      }
      this.item.origin = this.formData;
    }

  }
}
</script>

<template>
  <create-and-edit :entity="this.item" :visible="visible" entityName="Bovine" @canceled="canceledEventHandler" @saved="savedEventHandler">
    <template #content>
      <div class="p-fluid">
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="ID">ID</label>
            <pv-input-text id="ID" v-model="this.item.id"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="this.item.name" :class="{'p-invalid': submitted && !this.item.name}"/>
            <small v-if="submitted && !this.item.name" class="p-invalid">Name is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="race">Race</label>
            <input id="race" v-model="this.item.raza" class="p-inputtext p-component" type="text"/>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="date">Date</label>
            <input id="date" v-model="this.item.date" class="p-inputtext p-component" type="date"/>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="weight">Weight</label>
            <pv-input-number id="weight" v-model="this.item.weight" />
            <small v-if="submitted && !this.item.weight" class="p-invalid">Weight is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="department">Department</label>
            <input id="department" v-model="this.item.department" class="p-inputtext p-component" />
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="city">City</label>
            <input id="city" v-model="this.item.city" class="p-inputtext p-component" />
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="district">District</label>
            <input id="district" v-model="this.item.district" class="p-inputtext p-component" />
          </pv-float-label>
        </div>

        <div class="p-field mt-5">
          <pv-float-label>
            <label for="district">Additional Information</label>
            <pv-textarea v-model="this.item.observations" autoResize rows="10" cols="30" />
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>

</style>