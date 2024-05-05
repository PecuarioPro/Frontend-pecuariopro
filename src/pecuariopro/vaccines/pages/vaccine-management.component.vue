<script>
import DataManager from "../../../shared/components/data-manager.component.vue";
import VaccineCreateAndEdit from "../components/vaccine-create-and-edit.component.vue";
import {Vaccine} from "../model/vaccine.entity.js";
import{VaccinesApiService} from "../services/vaccine-api.service.js";
export default {
  name: "vaccine-management",
  components: { VaccineCreateAndEdit, DataManager},
  data() {
    return {
      title: { singular: 'Vaccine', plural: 'Vaccines' },
      vaccines: [],
      vaccine: {},
      selectedVaccines: [],
      vaccineService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
      showWelcomeMessage: true
    }
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({severity: "success", summary: "Success", detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.vaccines.findIndex((vaccine) => vaccine.id === id);
    },
    onNewItemEventHandler() {
      this.vaccine = {};
      this.submitted = false;
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
    },
    onEditItemEventHandler(item) {
      this.vaccine = item;
      this.submitted = false;
      this.isEdit = true;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItemEventHandler(item) {
      this.vaccine = item;
      this.deleteVaccine();
    },
    onDeleteSelectedItemsEventHandler(selectedItems) {
      this.selectedVaccines = selectedItems;
      this.deleteSelectedVaccines();
    },
    onCanceledEventHandler() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSavedEventHandler(item) {
      this.submitted = true;
      if (this.vaccine.name && this.vaccine.code) {
        if (this.isEdit) {
          this.updateVaccine();
        } else {
          this.createVaccine();
        }
      }
      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },
    createVaccine() {
      this.vaccine = Vaccine.fromDisplayableVaccine(this.vaccine);
      this.vaccineService.create(this.vaccine)
          .then((response) => {
            this.vaccine = Vaccine.toDisplayableVaccine(response.data);
            this.vaccines.push(this.vaccine);
            this.notifySuccessfulAction("Vaccine Created");
            this.createAndEditDialogIsVisible = false;
          })
          .catch((error) => {
            console.error('Error creating vaccine:', error);
          });
    },

    updateVaccine() {
      this.vaccine = Vaccine.fromDisplayableVaccine(this.vaccine);
      this.vaccineService
          .update(this.vaccine.id, this.vaccine)
          .then((response) => {
            this.vaccines[this.findIndexById(response.data.id)] =
                Vaccine.toDisplayableVaccine(response.data);
            this.notifySuccessfulAction("Vaccine Updated");
          })
          .catch((error) => {
            console.error('Error updating vaccine:', error);
          });
    },
    deleteVaccine() {
      this.vaccineService.delete(this.vaccine.id)
          .then(() => {
            this.vaccines = this.vaccines.filter((v) => v.id !== this.vaccine.id);
            this.vaccine = {};
            this.notifySuccessfulAction("Vaccine Deleted");
          });
    },
    deleteSelectedVaccines() {
      this.selectedVaccines.forEach((vaccine) => {
        this.vaccineService.delete(vaccine.id).then(() => {
          this.vaccines = this.vaccines.filter((v) => v.id !== this.vaccine.id);
        });
      });
      this.notifySuccessfulAction("Vaccines Deleted");
    },
    hideWelcomeMessage() {
      setTimeout(() => {
        this.showWelcomeMessage = false;
      }, 5000);
    }
  },
  created() {
    this.vaccineService = new VaccinesApiService();

    this.vaccineService.getAll().then((response) => {
      console.log(response.data);
      let vaccines = response.data;
      this.vaccines = vaccines.map((vaccine) => Vaccine.toDisplayableVaccine(vaccine));
    });
  },
  mounted() {
    this.hideWelcomeMessage();
  }
}
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <div>
    <div v-if="showWelcomeMessage" class="welcome-message-overlay">
      <div class="welcome-message">
        <h2>Welcome!!</h2>
        <h2>to the Vaccine Administration of Your Farm</h2>
        <div class="tip-container">
          <div class="tip-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="tip-message">
            <p>Tip: Look carefully at the code for good animal care</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full">
    <data-manager
        class="custom-table"
        :title="title"
        v-bind:items="vaccines"
        v-on:new-item="onNewItemEventHandler"
        v-on:edit-item="onEditItemEventHandler($event)"
        v-on:delete-item="onDeleteItemEventHandler($event)"
        v-on:delete-selected-items="onDeleteSelectedItemsEventHandler($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id"   header="id"    style="min-width: 10rem"/>
        <pv-column :sortable="true" field="name" header="Name"  style="min-width: 20rem"/>
        <pv-column :sortable="true" field="reason" header="Reason" style="min-width: 20rem"/>
        <pv-column :sortable="true" field="date" header="Date"  style="min-width: 15rem"/>
        <pv-column :sortable="true" field="code" header="Code"  style="min-width: 15rem"/>
      </template>
    </data-manager>
    <vaccine-create-and-edit
        :item="vaccine"
        :edit="isEdit"
        :visible="createAndEditDialogIsVisible"
        v-on:canceled="onCanceledEventHandler"
        v-on:saved="onSavedEventHandler($event)"/>
  </div>
</template>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 960px) {
  :deep(.p-toolbar) {
    flex-wrap: wrap;

  }
}

@media (min-width: 1024px) {
  .vaccines {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.welcome-message-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.welcome-message {
  background-color: #023F3A;
  color : #E1D29A;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.tip-container {
  margin-top: 20px;
}

.tip-icon {
  margin-bottom: 10px;
}

.tip-message {
  margin-top: 10px;
}
</style>
