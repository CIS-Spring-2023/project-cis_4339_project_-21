<template>
  <div class="chart-container">
    <canvas id="chart"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted } from 'vue';
import Axios from 'axios'; // Import Axios

const data = {
  labels: [],
  datasets: [
    {
      label: "My First Dataset",
      data: [''],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(165, 42, 42)",
        "rgb(0, 0, 128)",
        "rgb(128, 128, 0)"
      ],
      hoverOffset: 4,
    },
  ],
};

const plugins = {
  legend: {
    labels: {
      font: {
        size: 8 // adjust font size of legend labels
      }
    }
  },
  tooltip: {
    callbacks: {
      label: function (context:any) {
        const label = context.label || '';
        const value = context.parsed || 0;
        const percentage = Math.round(value / data.datasets[0].data.reduce((a, b) => a + b, 0) * 100);
        return `${label}: ${value} (${percentage}%)`;
      }
    }
  },
  datalabels: {
    color: '#fff',
    formatter: function (value:any, context:any) {
      const label = context.chart.data.labels[context.dataIndex];
      const percentage = Math.round(value / data.datasets[0].data.reduce((a, b) => a + b, 0) * 100);
      return `${label}: ${value} (${percentage}%)`;
    }
  }
};

const config = {
  type: "pie",
  data,
  plugins
};
onMounted(async () => {
  const canvas = document.getElementById("chart") as HTMLCanvasElement;
  canvas.width = 50;
  canvas.height = 50;
  try {
    const response = await Axios.get('http://localhost:3000/clients/getclient');
    const clients = response.data;
    const counts = Object.entries(
      clients.reduce((acc, client) => {
        const { zip } = client.address;
        if (zip) {
          if (acc[zip]) {
            acc[zip] += 1;
          } else {
            acc[zip] = 1;
          }
        }
        return acc;
      }, {})
    ).map(([zip, count]) => ({ zip, count }));
    data.labels = counts.map(({ zip, count }, index) => ` ${zip}`);
    data.datasets[0].data = counts.map(({ count }) => count);
    new Chart(canvas, config);
  } catch (error) {
    console.error(error);
  }
});



</script>

<style scoped>
.chart-container {
  width: 300px;
  height: 300px;
}
</style>
