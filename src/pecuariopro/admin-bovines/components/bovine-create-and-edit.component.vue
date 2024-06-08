<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "bovine-create-and-edit.component",
  components: {createAndEdit },
  props: {
    item: null,
    item2:null,
    visible: Boolean,
    statuses: Array
  },
  inject: ['firebaseStorage'],
  data() {
    return {
      submitted: false,
      dialogSize: 'default',
      files: [],
      totalSize: 0,
      totalSizePercent: 0,
    }
  },
  watch: {
    visible: function(newValue, oldValue) {
      if (!newValue) {
        this.resetForm();
      }
    }
  },
  mounted() {
    this.detectScreenSize();
    window.addEventListener('resize', this.detectScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.detectScreenSize);
  },

  methods:{
    created(){
      this.item2=this.item.origin;
      console.log(this.item);
    },
    resetForm() {
      this.submitted = false;
    },

    detectScreenSize() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        this.dialogSize = 'standard';
      } else if (screenWidth >= 768 && screenWidth < 1200) {
        this.dialogSize = 'large';
      } else {
        this.dialogSize = 'extra-large';
      }
    },
    canceledEventHandler() {
      this.$emit('canceled');
    },
    async savedEventHandler() {
      console.log(this.submitted,"soy sub");
      console.log("AHO",this.item);
      this.updateItem();
      if (this.item.name && this.item.weight && this.item.raza) {
        try {
          await this.uploadFilesToFirebase();
          this.$emit('saved2', this.item);
        } catch (error) {
          console.error('Error uploading files:', error);
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload files.', life: 3000 });
        }
      }
      this.submitted = true;
    },
    updateItem() {
      if (!this.item.origin) {
        this.item.origin = {};
      }
      this.item.origin = this.item2;
      this.item.batchId = this.$route.params.batchId;
      console.log(this.item);
    },
    onSelectedFiles(event) {
      this.files = event.files;
      this.totalSize = this.files.reduce((acc, file) => acc + file.size, 0);
      this.totalSizePercent = this.totalSize / 10;
    },
    async uploadFilesToFirebase() {
      try {
        const uploadPromises = this.files.map(file => {
          const storageRef = ref(this.firebaseStorage, `PecuarioPro-bovines-resources/${file.name}`);
          return uploadBytes(storageRef, file).then(snapshot => {
            console.log(`Uploaded ${file.name}`);
            return getDownloadURL(snapshot.ref).then(url => {
              console.log(`File available at ${url}`);
              return url; // Retornar la URL para usarla más tarde
            });
          }).catch(error => {
            console.error(`Error uploading ${file.name}:`, error);
            throw error;
          });
        });

        // Esperar a que todas las promesas se resuelvan y obtener las URLs
        const urls = await Promise.all(uploadPromises);

        // Asignar las URLs al atributo imgUrls de tu ítem
        this.item.imgUrls = urls; // Asumiendo que this.bovine es la instancia de tu ítem Bovine

        this.$toast.add({ severity: 'info', summary: 'Success', detail: 'Files Uploaded', life: 3000 });
      } catch (error) {
        console.error('Error uploading files:', error);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'File Upload Failed', life: 3000 });
      }
    }



  }
}
</script>

<template>
  <create-and-edit :entity="this.item" :visible="visible" entityName="Bovine" @canceled="canceledEventHandler" @saved="savedEventHandler" :size="this.dialogSize">
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

<!--        <div class="container-gallery ">-->
<!--          <div class="card">-->
<!--            <pv-toast />-->
<!--            <input type="file" name="product_image" id="fileInput" change style="display: none;">-->
<!--            <pv-button class="mr-2 flex" iconPos="center" text label="Add Images"></pv-button>-->
<!--          </div>-->
<!--        </div>-->

        <div class="container-gallery">
          <div class="card">
            <pv-toast />
            <pv-file-upload name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
              <template #header="slotProps">
                <div class="custom-header">
                  <p>Archivos para cargar: {{ slotProps.files.length }}</p>
                  <pv-button @click="slotProps.chooseCallback" icon="pi pi-images" text label="Add image"></pv-button>
                  <pv-button @click="slotProps.clearCallback" class="pi pi-trash"  text ></pv-button>
                </div>
              </template>

              <template #empty>
                <p>Drag and drop files to here to upload.</p>
              </template>S
            </pv-file-upload>
          </div>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
.container-field label{
  margin-bottom:5px;
}
.card{
  width:100%;
  height:auto;
}
@media (min-width: 1200px){
  .container-dialog{
    display:flex;
    gap:20px;
    width:100%;
    height:100%;

  }
  .container-form{
    width:400px;
    display:flex;
    flex-direction:column;
    align-items: center;
    height:auto;
  }
  .container-gallery{
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
    width:680px;
    margin-top:40px;
  }
  .container-field{
    width:100%;
  }

}


</style>