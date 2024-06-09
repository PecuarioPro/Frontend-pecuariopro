<template>
      <Chart type="bar" :data="chartData" :options="chartOptions" style="width: 100%; height: 100%;" />
</template>

<script>
import Chart from 'primevue/chart';
import { VaccinesApiService } from "../services/vaccine-api.service.js";

export default {
  name: 'monthly-stats',
  components: {
    Chart
  },
  data() {
    return {
      monthlyData: [],
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
      if (!this.monthlyData.length) return {};

      const labels = this.monthlyData.map(item => item.month);
      const data = this.monthlyData.map(item => item.count);

      return {
        labels: labels,
        datasets: [{
          label: 'Number of Vaccines per Month',
          backgroundColor: '#32C793',
          data: data
        }]
      };
    }
  },
  async created() {
    try {
      const vaccinesApiService = new VaccinesApiService();
      this.monthlyData = await vaccinesApiService.getVaccinesGroupedByMonth();
    } catch (error) {
      console.error('Error fetching vaccines data:', error);
    }
  }
};
</script>


