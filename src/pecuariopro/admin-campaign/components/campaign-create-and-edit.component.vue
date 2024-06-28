<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";
export default {
  name: "campaign-create-and-edit",
  components:{ createAndEdit},
  props:{
    item:null,
    visible: Boolean,
    edit:Boolean
  },
  data() {
    return {
      submitted: false,
      dateError: ''
    }
  },
  methods:{
    canceledEventHandler() {
      this.$emit('canceled');
      this.submitted = false;
    },
    savedEventHandler() {
      console.log("Enviar de campaign",this.item);
      this.submitted = true;
      //&& this.item.objective && this.validateDates()
       if (this.item.name&& this.item.objective && this.validateDates()) {

         this.item.dateStart = this.formatDate(this.item.dateStart);
         this.item.dateEnd = this.formatDate(this.item.dateEnd);
         // let fullDate = new Date(this.item.date);
         // this.item.dateStart=fullDate.toISOString().split('T')[0];

         // let fullDateEnd = new Date(this.item.date);
         // this.item.dateEnd=fullDateEnd.toISOString().split('T')[0];
        console.log("si entre",this.item);
        this.item.userId =1; //aca ponle el user
          this.$emit('saved2', this.item);
       }
    },
    validateDates() {
      if (this.item.dateEnd <= this.item.dateStart) {
        this.dateError = 'End date must be after start date.';
        return false;
      }
      this.dateError = '';
      return true;
    },
    formatDate(date) {
      if (!date) return null; // Manejar caso de fecha vacía o nula

      // Convertir la fecha al formato YYYY-MM-DD
      const dt = new Date(date);
      const year = dt.getFullYear();
      const month = String(dt.getMonth() + 1).padStart(2, "0");
      const day = String(dt.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }
}
</script>

<template>
  <create-and-edit :entity="item" :edit="edit" :visible="visible" entityName="Campaign" @canceled="canceledEventHandler" @saved="savedEventHandler">
    <template #content>

      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="item.name" :class="{'p-invalid': submitted && !item.name}"/>
            <small v-if="submitted && !item.name" class="p-invalid">Name is required.</small>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <label for="objective">Objective</label>
            <pv-input-text id="objective" v-model="item.objective" :class="{'p-invalid': submitted && !item.objective}"/>
            <small v-if="submitted && !item.objective" class="p-invalid">Objective is required.</small>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <pv-calendar inputId="date-start" v-model="item.dateStart" showIcon iconDisplay="input" />
            <label for="date-start">Date Start</label>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <pv-calendar inputId="date-end" v-model="item.dateEnd" showIcon iconDisplay="input" />
            <label for="date-end">Date End</label>
            <small v-if="submitted && dateError" class="p-invalid">{{ dateError }}</small>
          </pv-float-label>
        </div>

      </div>

    </template>
  </create-and-edit>

</template>

<style scoped>

</style>