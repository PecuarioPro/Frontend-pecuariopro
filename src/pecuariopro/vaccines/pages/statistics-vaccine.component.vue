<template>
  <div class="cards-container">
    <div class="card">
      <div class="card-header">
        <div class="chart-title">Number of Vaccines per Year</div>
      </div>
      <div class="card-body">
        <Chart type="bar" :data="chartData" :options="chartOptions" style="width: 100%; height: 100%;" />
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="chart-title">Number of Vaccines per Month</div>
      </div>
      <div class="card-body">
        <monthly-stats/>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'primevue/chart';
import { VaccinesApiService } from "../services/vaccine-api.service.js";
import MonthlyStats from "../components/MonthlyStats.component.vue";

export default {
  name: 'StatisticsVaccine',
  components: {
    Chart,
    MonthlyStats
  },
  data() {
    return {
      vaccinesData: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          }
        }
      }
    };
  },
  computed: {
    chartData() {
      if (!this.vaccinesData.length) return {};

      const labels = this.vaccinesData.map(item => item.year.toString());
      const data = this.vaccinesData.map(item => item.count);

      return {
        labels: labels,
        datasets: [{
          label: 'Number of Vaccines per Year',
          backgroundColor: '#32C793',
          data: data
        }]
      };
    }
  },
  async created() {
    try {
      const vaccinesApiService = new VaccinesApiService();
      this.vaccinesData = await vaccinesApiService.getVaccinesGroupedByYear();
    } catch (error) {
      console.error('Error fetching vaccines data:', error);
    }
  }
};
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  flex: 1 1 calc(50% - 20px);
  max-width: calc(50% - 20px);
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
}

.card-header {
  text-align: center;
  margin-bottom: 20px;
}

.chart-title {
  font-size: 24px;
  font-weight: bold;
  color: #495057;
}

.card-body {
  width: 100%;
  height: 400px;
}

@media (max-width: 768px) {
  .card {
    flex: 1 1 100%;
    max-width: 100%;
    padding: 10px;
  }

  .chart-title {
    font-size: 20px;
  }

  .card-body {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 5px;
  }

  .chart-title {
    font-size: 18px;
  }

  .card-body {
    height: 200px;
  }
}
</style>
