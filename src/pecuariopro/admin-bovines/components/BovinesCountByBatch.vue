<template>
  <div class="p-fluid p-grid p-align-center">
    <div class="p-col-12">
      <h2>Bovines Count by Batch</h2>
      <div class="card large-card">
        <Chart type="pie" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { BovinesApiService } from '../services/bovines-api.service';
import Chart from 'primevue/chart';

export default defineComponent({
  name: 'BovinesCountByBatch',
  components: {
    Chart,
  },
  data() {
    return {
      batches: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Bovines Count',
            data: [],
            backgroundColor: [
              '#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850',
              '#ff6384', '#36a2eb', '#ffce56', '#cc65fe', '#ff9f40'
            ],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              fontSize: 14,
              fontColor: '#333',
            },
          },
          title: {
            display: true,
            text: 'Bovines Count by Batch',
            fontSize: 22,
            fontColor: '#333',
            padding: 20,
          },
        },
      },
    };
  },
  async created() {
    try {
      const bovinesApiService = new BovinesApiService();
      this.batches = await bovinesApiService.getBovinesCountByBatch();
      console.log('Batches:', this.batches);
      this.updateChartData();
    } catch (error) {
      console.error('Error fetching bovines by batch:', error);
    }
  },
  methods: {
    updateChartData() {
      console.log('ChartData before update:', this.chartData);
      this.chartData.labels = this.batches.map(batch => `Batch ${batch.batchId}`);
      this.chartData.datasets[0].data = this.batches.map(batch => batch.count);
      console.log('ChartData after update:', this.chartData);
    },
  },
});
</script>

<style scoped>
.card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 20px;
}

.large-card {
  width: 80%;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
