
<template>
  <div>
    <pie-chart :data="chartData" :options="chartOptions" vaccines=""></pie-chart>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {
  name: 'PieChart',
  components: {
    PieChart: Pie
  },
  props: {
    vaccines: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      const labels = [];
      const data = [];

      this.vaccines.forEach(vaccine => {
        if (!labels.includes(vaccine.reason)) {
          labels.push(vaccine.reason);
        }
        const index = labels.indexOf(vaccine.reason);
        data[index] = (data[index] || 0) + 1;
      });

      return {
        labels,
        datasets: [
          {
            label: 'Distribution by Reason',
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
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
