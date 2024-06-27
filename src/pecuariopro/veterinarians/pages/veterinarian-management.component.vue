<script>
import {VeterinarianApiService} from "../services/veterinarian-api.service.js";
import {Veterinarian} from "../model/veterinarian.js";
import VeterinarianEdit from "../components/veterinarian-edit.component.vue";
import VeterinarianCreateAndEdit from "../components/veterinarian-create-and-edit.component.vue";

export default {
  name: "Veterinarians-management",
  components: {VeterinarianCreateAndEdit, VeterinarianEdit},
  props: {},
  data() {
    return {
      title: { singular: 'Veterinarian', plural: 'Veterinarians' },
      veterinarian: {},
      veterinarians: [],  // Inicializar veterinarians aquí
      origin:{},
      selectedVeterinarians:[],
      veterinarianService:null,
      isVisibleCard: false,
      isEdit: false,
      submitted: false,
      createAndEditDialogIsVisible:false
    };
  },
  created(){
    this.veterinarianService = new VeterinarianApiService();
    this.veterinarianService.getAll().then((response) => {
      console.log(response.data);
      let veterinarians = response.data;
      console.log(veterinarians);
      this.veterinarians = veterinarians.map((veterinarian) => Veterinarian.toDisplayableVeterinarian(veterinarian));
    });
    console.log(`flag: ${this.isVisibleCard}`);

    // Show advertising
    this.showWarningMessage();

  },
  methods:{
    showWarningMessage() {
      console.log("This is a warning message");
    },
    notifySuccessfulAction(message){
      this.$toast.add({severity:"success", summary: "Success", detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.veterinarians.findIndex((veterinarian) => veterinarian.id === id);
    },
    onNewItemEventHandler() {
      this.veterinarian = {};
      this.submitted = false;
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
    },
    onEditItemEventHandler(item) {
      this.veterinarian = item;
      this.submitted = false;
      this.isEdit = true;
      this.createAndEditDialogIsVisible = true;
    },
    onCanceledEventHandler() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSavedEventHandler(item) {
      this.submitted = true;
      if (this.veterinarian.first_name && this.veterinarian.last_name && this.veterinarian.speciality && this.veterinarian.phone_number && this.veterinarian.email && this.veterinarian.city && this.veterinarian.status && this.veterinarian.photoUrl) {
        if (this.isEdit) {
          this.updateVeterinarian();
        } else {
          this.createVeterinarian();
        }
      }
      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },
    onDeleteItemEventHandler(item) {
      this.veterinarian = item;
      this.deleteVeterinarian();
    },

    onDeleteSelectedItemsEventHandler(selectedItems) {
      this.selectedVeterinarians= selectedItems;
      this.deleteSelectedVeterinarian();
    },

    deleteVeterinarian(){
      this.veterinarianService.delete(this.veterinarian.id)
          .then(()=>{
            this.veterinarians=this.veterinarians.filter((t)=>t.id !==this.veterinarian.id);
            this.veterinarian = {};
            this.notifySuccessfulAction("Veterinarian Deleted");
          })
    },

    deleteSelectedVeterinarian(){
      this.selectedVeterinarians.forEach((veterinarian)=>{
        this.veterinarianService.delete(veterinarian.id).then(() =>{
          this.veterinarians = this.veterinarians.filter((t) => t.id !==this.veterinarian.id);
        });
      });
      this.notifySuccessfulAction("Veterinarian Deleted");
    },

    createVeterinarian() {
      this.veterinarian = Veterinarian.fromDisplayableVeterinarian(this.veterinarian);
      this.veterinarianService.create(this.veterinarian)
          .then((response) => {
            this.veterinarian = Veterinarian.toDisplayableVeterinarian(response.data);
            this.veterinarians.push(this.veterinarian);
            this.notifySuccessfulAction("Veterinarian Created");
            this.createAndEditDialogIsVisible=false;
          })
          .catch((error) => {
            console.error('Error creating veterinarian:', error);
          });
    },

    updateVeterinarian() {
      this.veterinarian = Veterinarian.fromDisplayableVeterinarian(this.veterinarian);
      this.veterinarianService
          .update(this.veterinarian.id, this.veterinarian)
          .then((response) => {
            this.veterinarians[this.findIndexById(response.data.id)] =
                Veterinarian.fromDisplayableVeterinarian(response.data);
            this.notifySuccessfulAction("Veterinarian Updated");
          })
          .catch((error) => {
            console.error('Error updating veterinarian:', error);
          });
    }
  }
}

</script>

<template>
  <div class="veterinarian-full principal-container">
    <!-- veterinarian Data Manager -->
    <veterinarian-edit
        class="custom-table"
        :title=title
        v-bind:items="veterinarians"
        v-on:new-item="onNewItemEventHandler"
        v-on:edit-item="onEditItemEventHandler($event)"
        v-on:delete-item="onDeleteItemEventHandler($event)"
        v-on:delete-selected-items="onDeleteSelectedItemsEventHandler($event)">

      <template #custom-columns>
        <!-- Id Column -->
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 6rem"/>
        <!-- First Name Column -->
        <pv-column :sortable="true" field="first_name" header="First Name" style="min-width: 6rem"/>
        <!-- Last Name Column -->
        <pv-column :sortable="true" field="last_name" header="Last Name" style="min-width: 6rem"/>
        <!-- Speciality Column -->
        <pv-column :sortable="false" field="speciality" header="Speciality" style="min-width: 6rem"/>
        <!-- Email Column -->
        <pv-column :sortable="false" field="email" header="Email" style="min-width: 6rem"/>
        <!-- Phone Number Column -->
        <pv-column :sortable="false" field="phone_number" header="Phone Number" style="min-width: 6rem"/>
        <!-- City Column -->
        <pv-column :sortable="false" field="city" header="City" style="min-width: 6rem"/>
        <!-- Status Column -->
        <pv-column :sortable="false" field="on_job_status" header="Status" style="min-width: 6rem"/>
        <!-- Photo Url Column -->
        <pv-column :sortable="false" field="photoUrl" header="Photo Url" style="min-width: 6rem"/>
      </template>
    </veterinarian-edit>

    <veterinarian-create-and-edit
        :item="veterinarian"
        :edit="isEdit"
        :visible="createAndEditDialogIsVisible"
        v-on:canceled="onCanceledEventHandler"
        v-on:saved="onSavedEventHandler($event)"/>
  </div>
</template>

<style scoped>
.principal-container{
  padding:10px;
}
</style>