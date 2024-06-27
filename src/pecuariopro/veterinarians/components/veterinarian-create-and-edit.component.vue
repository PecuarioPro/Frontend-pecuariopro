<script >
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";
export default {
  name: "veterinarians-create-and-edit",
  components: { createAndEdit },
  props:{
    item: null,
    item2: null,
    visible: Boolean,
    statuses: Array
  },
  data(){
    return {
      submitted: false
    }
  },
  methods:{
    canceledEventHandler(){
      this.$emit('canceled');
    },
    savedEventHandler(){
      console.log(this.item);
      this.submitted = true;
      this.updateItem();
      if (this.item.name && this.item.campaigns_id && this.item.name && this.item.last_name && this.item.email && this.item.on_job_status && this.item.job_description) {
        this.$emit('saved', this.item);
      }
    },
    updateItem() {
      if (!this.item.origin) {
        this.item.origin = {};
      }
      this.item.origin = this.item2;
      console.log(this.item);
    }
  }
}
</script>

<template>
  <create-and-edit :entity="item" :visible = "visible" entityName="Veterinarian" @canceled="canceledEventHandler" @saved="savedEventHandler">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="first_name">Name</label>
            <pv-input-text id="first_name" v-model="item.first_name" :class="{'p-invalid': submitted && !item.first_name}"/>
            <small v-if="submitted && !item.first_name" class="p-invalid">First Name is Required.</small>/
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="last_name">Last Name</label>
            <pv-input-text id="last_name" v-model="item.last_name" :class="{'p-invalid': submitted && !item.last_name}"/>
            <small v-if="submitted && !item.last_name" class="p-invalid">Last Name is Required.</small>
          </pv-float-label>/
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="speciality">Speciality</label>
            <pv-input-text id="speciality" v-model="item.speciality" :class="{'p-invalid': submitted && !item.speciality}"/>
            <small v-if="submitted && !item.speciality" class="p-invalid">Speciality is Required.</small>
          </pv-float-label>/
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="phone_number">Phone Number</label>
            <pv-input-text id="phone_number" v-model="item.phone_number" :class="{'p-invalid': submitted && !item.phone_number}"/>
            <small v-if="submitted && !item.phone_number" class="p-invalid">Phone Number is Required.</small>
          </pv-float-label>/
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="email">Email</label>
            <pv-input-text id="email" v-model="item.email" :class="{'p-invalid': submitted && !item.email}"/>
            <small v-if="submitted && !item.email" class="p-invalid">Email is Required.</small>
          </pv-float-label>/
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="city">City</label>
            <pv-input-text id="city" v-model="item.city" :class="{'p-invalid': submitted && !item.city}"/>
            <small v-if="submitted && !item.city" class="p-invalid">City is Required.</small>
          </pv-float-label>/
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="photoUrl">Photo Url</label>
            <pv-input-text id="photoUrl" v-model="item.photoUrl" :class="{'p-invalid': submitted && !item.photoUrl}"/>
            <small v-if="submitted && !item.photoUrl" class="p-invalid">Photo Url is Required.</small>
          </pv-float-label>/
        </div>
      </div>
    </template>
  </create-and-edit>
</template>