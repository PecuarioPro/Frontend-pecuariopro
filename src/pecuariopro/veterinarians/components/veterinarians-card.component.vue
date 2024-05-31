<script>
  import {Veterinarian} from "../model/veterinarian.js";
  export default {
    name: 'veterinarians-card',
    components: {},
    props: {
      veterinarian: Veterinarian
    },
    data(){

      return {
        items: [

          {
            label: 'Update',
            icon: 'pi pi-pencil',
            command: () => {
              this.$emit('Edit',this.veterinarian);
            }
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
              this.$emit('Delete',this.veterinarian);
            }
          },
          {
            label: 'Upload',
            icon: 'pi pi-upload'
            // ,
            // command: () => {
            //   this.$router.push('/fileupload');
            // }
          }
        ]
      }


    },
    methods:{
      viewMore(){
        this.$emit('viewMore', this.veterinarian);
      },
      formatDate(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
      }
    }
  }
</script>

<template>

</template>

<style>

</style>