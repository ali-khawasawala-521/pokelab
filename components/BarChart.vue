<script setup lang="ts">
defineProps<{
    options?: Object;
    series: any;
}>();
</script>

<template>
    <apexchart
        width="500"
        type="bar"
        :options="options"
        :series="series"
    ></apexchart>
</template>
