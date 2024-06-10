<!-- components/BarChart.vue -->
<template>
  <div>
    <bar-chart :data="chartData" :options="chartOptions" vaccines=""></bar-chart>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: {
    BarChart: Bar
  },
  props: {
    vaccines: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      const recentVaccines = this.vaccines.filter(vaccine => new Date(vaccine.date) >= new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
      const labels = [];
      const data = [];

      recentVaccines.forEach(vaccine => {
        const date = new Date(vaccine.date).toISOString().slice(0, 10);
        if (!labels.includes(date)) {
          labels.push(date);
        }
        const index = labels.indexOf(date);
        data[index] = (data[index] || 0) + 1;
      });

      return {
        labels,
        datasets: [
          {
            label: 'Vaccines Administered in the Last Year',
            backgroundColor: '#FF6384',
            data
          }
        ]
      };
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 40vh;
  width: 80vw;
}
</style>
