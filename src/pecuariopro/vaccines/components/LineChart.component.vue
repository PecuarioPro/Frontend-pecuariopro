<template>
  <div class="chart-container">
    <line-chart :data="chartData" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'LineChart',
  components: {
    LineChart: Line, // Registra el componente de gráfico de línea
  },
  props: ['chartData', 'chartOptions'],
  mounted() {
    // No es necesario llamar a this.renderChart() manualmente si estás pasando 'chartData' y 'chartOptions' como props
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px; /* Ajusta la altura según sea necesario */
  width: 600px; /* Ajusta el ancho según sea necesario */
}
</style>
