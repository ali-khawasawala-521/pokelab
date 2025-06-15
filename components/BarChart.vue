<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    Title,
    Tooltip,
    BarElement,
    CategoryScale,
    LinearScale,
    ChartDataLabels,
);

withDefaults(
    defineProps<{
        chartData: any;
        chartOptions?: Object;
    }>(),
    {
        chartOptions: () => ({
            responsive: true,
            maintainAspectRatio: true,
        }),
    },
);
</script>

<template>
    <Bar :data="chartData" :options="chartOptions" />
</template>
