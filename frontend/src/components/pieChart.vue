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
  labels: ["Total Events"],
  datasets: [
    {
      label: "My First Dataset",
      data: ['32'],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(165, 42, 42)"
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
onMounted(async () => { // Use async function for fetching data
  const canvas = document.getElementById("chart") as HTMLCanvasElement;
  canvas.width = 50; // adjust canvas width and height
  canvas.height = 50;
  try {
    const response = await Axios.get('http://localhost:3000/clients/'); // Fetch data from API
    const totalClients = response.data.length; // Count total clients

    // Fetch data from another API to get total orgs
    const orgResponse = await Axios.get('http://localhost:3000/org/getorg'); // Fetch data from org API
    const totalOrgs = orgResponse.data.length; // Count total orgs

    // Update data and re-render chart
    data.labels.push("Total Clients", "Total Organizations");
    data.datasets[0].data.push(totalClients, totalOrgs);
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
