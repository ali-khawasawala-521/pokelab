<script setup lang="ts">
import { typeImageMap } from "~/utils/pokemonType";

const { type } = defineProps<{
    type: string;
}>();

const typeImage = computed<string>(() => {
    return type ? typeImageMap[type.toLowerCase()] : null;
});
</script>

<template>
    <component v-if="typeImage" :is="typeImage" class="w-8 h-8" />
</template>

<style scoped></style>
