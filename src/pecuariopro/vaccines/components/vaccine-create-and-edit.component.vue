<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";
export default {
  name: "vaccine-item-create-and-edit",
  components: { createAndEdit },
  props: {
    item: null,
    visible: Boolean,
    statuses: Array
  },
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    getSeverity(status) {
      switch (status) {
        case 'Applied':
          return 'success';
        case 'Not applied':
          return 'info';
        default:
          return null;
      }
    },
    canceledEventHandler() {
      this.$emit('canceled');
    },
    savedEventHandler() {
      console.log(this.item);
      this.submitted = true;
      // Verificar si los campos requeridos están llenos
      if (this.item.name && this.item.code && this.item.status) {
        this.$emit('saved', this.item);
      }
    }
  }
}
</script>


<template>
  <create-and-edit :entity="item" :visible="visible" entityName="Vaccine" @canceled="canceledEventHandler" @saved="savedEventHandler">
    <template #content>
      <div class="p-fluid">
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="ID">ID</label>
            <pv-input-text id="ID" v-model="item.id"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="item.name" :class="{'p-invalid': submitted && !item.name}"/>
            <small v-if="submitted && !item.name" class="p-invalid">Name is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="reason">Reason</label>
            <input id="reas" v-model="item.reason" class="p-inputtext p-component" type="text"/>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="date">Date</label>
            <input id="date" v-model="item.date" class="p-inputtext p-component" type="date"/>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="code">Code</label>
            <pv-input-text id="code" v-model="item.code" :class="{'p-invalid': submitted && !item.code}"/>
            <small v-if="submitted && !item.code" class="p-invalid">Code is required.</small>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

