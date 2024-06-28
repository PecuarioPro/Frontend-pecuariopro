<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";
import {BreedsApiService} from "../../admin-bovines/services/breeds-api.service.js";
import {DepartmentsApiService} from "../../../shared/services/origin/departments-api.service.js";
import {CitiesApiService} from "../../../shared/services/origin/cities-api.service.js";
import {DistrictsApiService} from "../../../shared/services/origin/districts-api.service.js";

export default {
  name: "batch-create-and-edit",
  components: {createAndEdit},
  props:{
    item:null,
    item2:null,
    visible: Boolean,
    edit:Boolean
  },
  data() {
    return {
      submitted: false,
      dateError: '',
      statusOptions:[
        { name: 'Empty'},
        { name: 'Busy' },
        { name: 'Full' }
      ],
      departments:null,
      selectedDepartments:null,
      cities:null,
      selectedCities:null,
      districts:null,
      selectedDistricts:null,
      breedsService:null,
      departmentService:null,
      cityService:null,
      districtService:null,

    }
  },
  watch: {
    visible: function(newValue, oldValue) {
      if (!newValue) {
        this.resetForm();
      }
    },
    'item2.department'(newValue) {
      this.filterCities();
    },
    'item2.city'(newValue) {
      this.filterDistricts();
    }
  },

  created(){
    this.breedsService = new BreedsApiService();
    this.departmentService = new DepartmentsApiService();
    this.cityService = new CitiesApiService();
    this.districtService = new DistrictsApiService();


    this.departmentService.getAll().then((response)=>{
      this.departments = response.data;
      console.log(this.departments);
      this.auxDepartments = this.departments.map(department => department.name);
      console.log(this.departments);

    });
    this.cityService.getAll().then((response) => {
      this.allCities = response.data;
      this.auxCities = this.allCities.map(city => city.name);
    });
    this.districtService.getAll().then((response) => {
      this.allDistricts = response.data;
      this.auxDistricts = this.allDistricts.map(district => district.name);
    });
    this.selectedDepartments = this.item2.department;

    console.log("breeds",this.breeds);
    console.log("bovine create and edit",this.item);
  },

  methods:{
    resetForm() {
      this.submitted = false;
    },
    canceledEventHandler() {
      this.$emit('canceled');
      this.submitted = false;
    },
    savedEventHandler() {
      console.log("Enviar de batch",this.item);
      this.submitted = true;
      if (this.item.name && this.item.area) {
        console.log("si entre");
        this.$emit('saved2', this.item);
      }
    },
    filterCities() {
      console.log(this.departments);
      console.log(this.item.date);
      if (this.item2.department) {
        this.selectedDepartments=this.item2.department;
        console.log(this.departments);
        this.selectedDepartments = this.departments.find(department => department.name === this.selectedDepartments );
        this.cities = this.allCities.filter(city => city.departmentId === this.selectedDepartments.id);
        this.auxCities = this.cities.map(city => city.name);
        console.log("toy aca en el if");
        this.selectedCities = null;
        this.districts = null;
        this.selectedDistricts = null;
      } else {
        this.cities = null;
        this.selectedCities = null;
        this.districts = null;
        this.selectedDistricts = null;
      }
    },filterDistricts() {
      if (this.item2.city) {
        this.selectedCities=this.item2.city;
        this.selectedCities = this.cities.find(city => city.name === this.selectedCities);
        this.districts = this.allDistricts.filter(district => district.cityId === this.selectedCities.id);
        this.auxDistricts = this.districts.map(district => district.name);
        this.selectedDistricts = null;
      } else {
        this.districts = null;
        this.selectedDistricts = null;
      }
    }



  }
}
</script>

<template>
  <create-and-edit :entity="item" :edit="edit" :visible="visible" entityName="Batch" @canceled="canceledEventHandler" @saved="savedEventHandler">
    <template #content>

      <div class="p-fluid">
        <div class="field mt-5">
          <label for="name" class="label-input">Name</label>
          <pv-float-label>

            <pv-input-text id="name" v-model="item.name" :class="{'p-invalid': submitted && !item.name}"/>
            <small v-if="submitted && !item.name" class="p-invalid">Name is required.</small>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <label for="area" class="label-input">Area</label>
          <pv-float-label >
            <pv-input-number  v-model="item.area" inputId="area" mode="decimal" showButtons :step="10" :min="0"/>
            <small v-if="!submitted" class="down-input-label">Area is in meters.</small>
            <small v-if="submitted && !item.area" class="p-invalid">Area is required.</small>
          </pv-float-label>
        </div>
        <div class="field mt-5" v-if="edit">
          <label for="name" class="label-input">Status</label>
          <pv-float-label>
            <pv-dropdown v-model="item.status"  :options="statusOptions" optionLabel="name"  optionValue="name" placeholder="Select a Status" class="w-full " />
            <small v-if="submitted && !item.status" class="p-invalid">Status is required.</small>
          </pv-float-label>
        </div>
        <div class="field mt-3 container-field">
          <label for="race">Department</label>
          <pv-dropdown v-model="this.item2.department" :options="this.auxDepartments" filter placeholder="Select a Department" >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value }}</div>
              </div>
              <span v-else>
            {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option }}</div>
              </div>
            </template>
          </pv-dropdown>
        </div>
        <div class="field mt-3 container-field">
          <label for="race">City</label>
          <pv-dropdown v-model="this.item2.city" :options="this.auxCities" filter placeholder="Select a City" :disabled="!this.cities">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value }}</div>
              </div>
              <span v-else>
            {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option }}</div>
              </div>
            </template>
          </pv-dropdown>
        </div>
        <div class="field mt-3 container-field">
          <label for="race">District</label>
          <pv-dropdown v-model="this.item2.district" :options="this.auxDistricts" filter placeholder="Select a District" :disabled="!this.districts">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value }}</div>
              </div>
              <span v-else>
            {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option }}</div>
              </div>
            </template>
          </pv-dropdown>

        </div>


      </div>

    </template>
  </create-and-edit>
</template>

<style scoped>
.label-input{
  font-size:15px;
}
.down-input-label{
  color:#CACEDE;
  font-weight:300;
}
</style>