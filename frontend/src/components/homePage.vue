<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted } from 'vue';

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const config = {
  type: "pie",
  data: data,
  options: {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 8 // adjust font size of legend labels
          }
        }
      }
    }
  }
};

onMounted(() => {
  const chartContainer = document.getElementById("chart-container");
  const canvas = chartContainer.querySelector("canvas");
  canvas.width = 50; // adjust canvas width and height
  canvas.height = 50;
  const myChart = new Chart(canvas, config);
});

</script>

<template>
  <div id="chart-container">
    <canvas></canvas>
  </div>
</template>

<style scoped>
#chart-container {
  width: 200px;
  height: 200px;
}
</style>
