<script>
//import DataManager from "../../../shared/components/data-manager.component.vue";
import { StaffApiService } from "../services/staff-api.service.js";
import { Staff } from "../model/staff.entity.js"
//import PvColumn from "../../../main.js";
import StaffEdit from "../components/staff-edit.component.vue"

export default {
  name: "staff-management",
  //components: {StaffEdit, DataManager },
  components: { StaffEdit },
  data(){
    return {
      title:{ singular: 'Staff', plural: 'Staffs' },
      staffs:[],
      staff:{},
      origin:{},
      selectedStaffs:[],
      staffService:null,
      isVisibleCard: false,
      isEdit: false,
      submitted: false,
    }
  },

  created(){
    //this.origin = new Origin;
    this.staffService = new StaffApiService();
    this.staffService.getAll().then((response) => {
      console.log(response.data);
      let staffs = response.data;
      console.log(staffs);
      this.staffs = staffs.map((staff) => Staff.toDisplayableStaff(staff));
    });
    console.log(`flag: ${this.isVisibleCard}`);

  },

  methods:{

    notifySuccessfulAction(message){
      this.$toast.add({severity:"success", summary: "Success", detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.staffs.findIndex((staff) => staff.id === id);
    },

    onDeleteItemEventHandler(item) {
      this.staff = item;
      this.deleteStaff();
    },

    onDeleteSelectedItemsEventHandler(selectedItems) {
      this.selectedStaffs= selectedItems;
      this.deleteSelectedStaffs();
    },

    deleteStaff(){
      this.staffService.delete(this.staff.id)
          .then(()=>{
            this.staffs=this.staffs.filter((t)=>t.id !==this.staff.id);
            this.staff = {};
            this.notifySuccessfulAction("Staff Deleted");
          })
    },

    deleteSelectedStaffs(){
      this.selectedStaffs.forEach((staff)=>{
        this.staffService.delete(staff.id).then(() =>{
          this.staffs = this.staffs.filter((t) => t.id !==this.staff.id);
        });
      });
      this.notifySuccessfulAction("Staff Deleted");
    }
  }
}

</script>

<template>
  <div class="staff-full">
    <!-- Staff Data Manager -->
    <staff-edit
        :title=title
        v-bind:items="staffs"
        v-on:delete-item="onDeleteItemEventHandler($event)"
        v-on:delete-selected-items="onDeleteSelectedItemsEventHandler($event)">

      <template #custom-columns>
        <!-- Id Column -->
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 6rem"/>
        <!-- Campaigns Column -->
        <pv-column :sortable="true" field="campaigns_id" header="Campaigns" style="min-width: 6rem"/>
        <!-- Name Column -->
        <pv-column :sortable="true" field="name" header="Name" style="min-width: 6rem"/>
        <!-- Status Column -->
        <pv-column :sortable="false" field="on_job_status" header="Status" style="min-width: 6rem"/>
        <!-- Job Description Column -->
        <pv-column :sortable="false" field="job_description" header="Job" style="min-width: 6rem"/>
        <!-- Date Start Column -->
        <!--<pv-column :sortable="false" field="date_start" header="Date Start" style="min-width: 6rem"/>-->
        <!-- Date End Column -->
        <!--<pv-column :sortable="false" field="date_end" header="Date End" style="min-width: 6rem"/>-->
      </template>
    </staff-edit>

    <!--<staff-edit
    :item="staff"
    :visible="isVisibleCard"
    />-->

  </div>

</template>

<style scoped>

</style>