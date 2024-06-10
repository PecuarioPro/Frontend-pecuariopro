
<template>
  <div class="bovine-component">
    <h1 class="title">Bovines</h1>
    <div class="search-container">
      <h2>Busca a tu bovino:</h2>
      <input v-model="searchTerm" type="text" placeholder="Ingresa el nombre del bovino..." class="search-input" />
    </div>
    <div v-for="group in filteredBovines" :key="group.batchId" class="batch-group">
      <h2>Batch ID: {{ group.batchId }}</h2>
      <div class="bovine-list">
        <div v-for="bovine in group.bovines" :key="bovine.id" class="bovine-card">
          <img :src="bovine.imgUrls[0]" alt="Bovine Image" class="bovine-image">
          <h3>{{ bovine.name }}</h3>
          <p><strong>Breed:</strong> {{ bovine.raza }}</p>
          <p><strong>Weight:</strong> {{ bovine.weight }} kg</p>
          <p><strong>Date:</strong> {{ bovine.date }}</p>
          <p><strong>Origin:</strong> {{ formatOrigin(bovine.origin) }}</p>
          <p><strong>Observations:</strong> {{ bovine.observations || 'None' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {BovinesApiService} from "../services/bovines-api.service.js";

export default {
  name: "bovine-total",
  data() {
    return {
      groupedBovines: [],
      searchTerm: ''
    };
  },
  computed: {
    filteredBovines() {
      if (!this.searchTerm) {
        return this.groupedBovines;
      }
      return this.groupedBovines.filter(group => {
        return group.bovines.some(bovine => bovine.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      });
    }
  },
  created() {
    const bovinesApiService = new BovinesApiService();

    bovinesApiService.getBovinesGroupedByBatchId().then(grouped => {
      this.groupedBovines = grouped;
    });
  },
  methods: {
    formatOrigin(origin) {
      if (!origin || (!origin.department && !origin.city && !origin.district)) {
        return 'Unknown';
      }
      return `${origin.department || ''}, ${origin.city || ''}, ${origin.district || ''}`.replace(/, , /g, '').replace(/, $/, '');
    }
  }
};
</script>

<style scoped>
.bovine-component {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 16px;
  background-color: #1a1a1a;
}
h2{
  color: #00ff84;
  top: auto;

}
.bovine-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 16px;
  background-color: #1a1a1a;
}

.bovine-component h1 {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: center;
}

.search-input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #00ff84;
  width: 20%;
  color: #00ff84;
  background-color: #1a1a1a;
}

.batch-group {
  border: 1px solid #2c2c2c;
  border-radius: 8px;
  padding: 16px;
  background-color: #2c2c2c;
}

input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  margin-bottom: 20px;
}

.bovine-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.bovine-card {
  border: 1px solid #00ff84;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  background-color: #00ff84;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  color: #000000;
}

.bovine-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 16px;
}

h3 {
  margin: 16px 0 8px;
}

p {
  margin: 4px 0;
}

</style>
