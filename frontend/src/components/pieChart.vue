<template>
    <div class="chart-container">
      <canvas id="chart"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import Chart from "chart.js/auto";
  import { onMounted } from 'vue';
  
  const data = {
  labels: ["77002", "77030", "77077","77056"],
  datasets: [
    {
      label: "My First Dataset",
      data: ['32', '11', '103', '59'],
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
  
  onMounted(() => {
    const canvas = document.getElementById("chart") as HTMLCanvasElement;
    canvas.width = 50; // adjust canvas width and height
    canvas.height = 50;
    new Chart(canvas, config);
  });
  
  </script>
  
  <style scoped>
  .chart-container {
    width: 300px;
    height: 300px;
  }
  </style>
  