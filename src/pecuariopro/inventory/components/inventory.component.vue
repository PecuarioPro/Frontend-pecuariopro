<template>
  <div class="container">
    <h1 class="animated-title" style="margin-bottom: 80px;">Management Inventory</h1>
    <div class="cards-container">
      <div class="card" v-for="card in cards" :key="card.title">
        <pv-card>
          <template #title>
            <div class="card-title">
              {{ card.title }}
              <i :class="card.icon" class="card-icon"></i>
            </div>
          </template>
          <template #content>
            <div class="card-description">{{ card.description }}</div>
          </template>
          <template #footer>
            <div class="card-footer">
              <pv-button label="View" @click="showInventoryDialog(card.title)"></pv-button>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
  </div>

  <pv-dialog v-model:visible="displayDialog" :header="selectedInventory" :style="{ width: '50vw' }" :modal="true">
    <div>Inventory For {{ selectedInventory }}</div>

    <div v-if="selectedInventory === 'Food'">
      <h4>Food Inventory Description</h4>
      <pv-toolbar>
        <template #start>
          <pv-button icon="pi pi-plus" class="mr-2" severity="secondary" />
          <pv-button icon="pi pi-print" class="mr-2" severity="secondary" />
          <pv-button icon="pi pi-upload" severity="secondary" />
        </template>
        <template #center>
          <pv-icon-field iconPosition="left">
            <pv-input-icon>
              <i class="pi pi-search" />
            </pv-input-icon>
            <pv-input-text placeholder="Search" />
          </pv-icon-field>
        </template>
        <template #end>
          <pv-split-button label="Save" :model="items1"></pv-split-button>
        </template>
      </pv-toolbar>
    </div>
    <div v-else-if="selectedInventory === 'Vaccine'">
      <h4>Vaccine Inventory Description</h4>
      <pv-toolbar>
        <template #start>
          <pv-button icon="pi pi-plus" class="mr-2" severity="secondary" />
          <pv-button icon="pi pi-print" class="mr-2" severity="secondary" />
          <pv-button icon="pi pi-upload" severity="secondary" />
        </template>
        <template #center>
          <pv-icon-field iconPosition="left">
            <pv-input-icon>
              <i class="pi pi-search" />
            </pv-input-icon>
            <pv-input-text placeholder="Search" />
          </pv-icon-field>
        </template>
        <template #end>
          <pv-split-button label="Save" :model="items1"></pv-split-button>
        </template>
      </pv-toolbar>
    </div>
    <div v-else-if="selectedInventory === 'Tools'">
      <h4>Tools Inventory Description</h4>
      <pv-toolbar>
        <template #start>
          <pv-button icon="pi pi-plus" class="mr-2" severity="secondary" />
          <pv-button icon="pi pi-print" class="mr-2" severity="secondary" />
          <pv-button icon="pi pi-upload" severity="secondary" />
        </template>
        <template #center>
          <pv-icon-field iconPosition="left">
            <pv-input-icon>
              <i class="pi pi-search" />
            </pv-input-icon>
            <pv-input-text placeholder="Search" />
          </pv-icon-field>
        </template>
        <template #end>
          <pv-split-button label="Save" :model="items1"></pv-split-button>
        </template>
      </pv-toolbar>
    </div>

    <div class="product-list">
      <ul>
        <li v-for="item in items" :key="item.id">
          <div class="product-list-item">
            <div class="product-details">
              <h5 class="product-title">{{ item.name }}</h5>
              <img :src="item.image" alt="Item Image" class="product-image" @error="onImageError"/>
              <div class="product-quantity">Quantity: {{ item.quantity }}</div>
            </div>
            <div class="product-action">
              <pv-button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editItem(item)"></pv-button>
              <pv-button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteItem(item)"></pv-button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <template #footer>
      <pv-button label="Close" @click="closeDialog"></pv-button>
      <pv-button label="Add" @click="openAddDialog"></pv-button>
    </template>
  </pv-dialog>


  <pv-dialog v-model:visible="displayAddDialog" :header="'Add ' + selectedInventory" :style="{ width: '30vw' }" :modal="true">
    <div class="form-group">
      <label for="name">Name</label>
      <pv-input-text v-model="newItem.name" id="name" placeholder="Enter item name" />
    </div>
    <div class="form-group">
      <label for="quantity">Quantity</label>
      <pv-input-number v-model="newItem.quantity" id="quantity" placeholder="Enter item quantity" />
    </div>
    <div class="form-group" v-if="selectedInventory === 'Food'">
      <label for="image">Image URL</label>
      <pv-input-text v-model="newItem.image" id="image" placeholder="Enter image URL" />
    </div>

    <template #footer>
      <pv-button label="Cancel" @click="closeAddDialog"></pv-button>
      <pv-button label="Save" @click="saveNewItem"></pv-button>
    </template>
  </pv-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const displayDialog = ref(false);
    const displayAddDialog = ref(false);
    const selectedInventory = ref('');
    const items = ref([]);
    const newItem = ref({
      name: '',
      quantity: 0,
      image: ''
    });
    const items1 = ref([
      {
        label: 'Update',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ]);

    const cards = [
      { title: 'Food', description: 'Inventory', icon: 'pi pi-apple' },
      { title: 'Vaccine', description: 'Inventory', icon: 'pi pi-wrench' },
      { title: 'Tools', description: 'Inventory', icon: 'pi pi-pen-to-square' }
    ];

    const showInventoryDialog = (title) => {
      selectedInventory.value = title;
      loadInventoryData(title);
      displayDialog.value = true;
    };

    const loadInventoryData = (title) => {
      if (title === 'Food') {
        items.value = [
          { id: 1, name: 'Pasture', quantity: 10, image: 'src/assets/pasto.png' },
          { id: 2, name: 'Wheat', quantity: 5, image: 'src/assets/trigo.png' },
          { id: 3, name: 'Heno', quantity: 20, image: 'src/assets/heno.png' }
        ];
      } else if (title === 'Vaccine') {
        items.value = [
          { id: 1, name: 'Vaccine(Fever vaccine)', quantity: 15, image: 'src/assets/jeringa.png' },
          { id: 2, name: 'Vaccine(Brucellosis vaccine)', quantity: 8, image: 'src/assets/jeringa.png' },
          { id: 3, name: 'Vaccine(Anthrax vaccine)', quantity: 25, image: 'src/assets/jeringa.png' }
        ];
      } else if (title === 'Tools') {
        items.value = [
          { id: 1, name: 'Hammer', quantity: 3, image: 'src/assets/hammer.png' },
          { id: 2, name: 'Pliers', quantity: 10, image: 'src/assets/pliers.png' },
          { id: 3, name: 'Bucket', quantity: 7, image: 'src/assets/gansito.png' }
        ];
      }
    };

    const openAddDialog = () => {
      newItem.value = { name: '', quantity: 0, image: '' };
      displayAddDialog.value = true;
    };

    const saveNewItem = () => {
      items.value.push({ ...newItem.value, id: items.value.length + 1 });
      closeAddDialog();
    };

    const closeAddDialog = () => {
      displayAddDialog.value = false;
    };

    const addItem = () => {
      openAddDialog();
    };

    const editItem = (item) => {
      // implementar backend
    };

    const deleteItem = (item) => {
      // implementar backend
    };

    const closeDialog = () => {
      displayDialog.value = false;
    };

    const onImageError = (event) => {
      event.target.src = 'https://example.com/images/default.jpg'; // Fallback image
    };

    return {
      displayDialog,
      displayAddDialog,
      selectedInventory,
      items,
      newItem,
      cards,
      items1,
      showInventoryDialog,
      closeDialog,
      addItem,
      openAddDialog,
      saveNewItem,
      closeAddDialog,
      editItem,
      deleteItem,
      onImageError
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}
.animated-title {
  font-size: 3rem;
  font-weight: bold;
  animation: fadeIn 2s ease-in-out;
  text-align: center;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.cards-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: scale(1.05);
}

.card-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
}

.card-icon {
  font-size: 3rem;
  margin-top: 10px;
}

.card-description {
  text-align: center;
  margin: 20px 0;
}

.card-footer {
  display: flex;
  justify-content: center;
}

.product-list-item {
  border-bottom: 1px solid var(--surface-d);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.product-image {
  max-width: 50px;
  max-height: 50px;
  margin-bottom: 0.5rem;
}

.product-quantity {
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.product-action {
  display: flex;
  justify-content: flex-end;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

.form-group input {
  width: 100%;
}
</style>
