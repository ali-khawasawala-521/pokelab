<script setup lang="ts">
import type { EvolutionChain, Pokemon } from "~/types/pokemon";

defineProps<{
    pokemon: Pokemon;
    coverImage: string;
}>();

const evolutionChain = inject<EvolutionChain>("evolution-chain", []);
</script>

<template>
    <!-- Left Side -->
    <div class="w-1/3 flex flex-col gap-4 bg-white/30 rounded-l-md px-6 py-4">
        <div class="flex flex-col gap-1">
            <p class="text-xl font-light">
                #{{ pokemon?.id.toString().padStart(3, "0") }}
            </p>
            <p class="text-2xl font-medium capitalize">
                {{ sanitizeText(pokemon?.name) }}
            </p>
        </div>
        <!-- Pokemon Image -->
        <div class="grow-2 flex items-center justify-center">
            <img :src="coverImage" :alt="pokemon?.name" class="w-auto h-96" />
        </div>
        <!-- Evolution Chain -->
        <EvolutionChain
            :chain="evolutionChain"
            :type="pokemon?.types?.[0]?.type?.name || 'normal'"
        />
    </div>
    <!-- Right Side -->
    <div class="flex-1 px-2 py-4 overflow-auto right-side">
        <DetailTabs :pokemon="pokemon" />
    </div>
</template>

<style scoped>
.right-side {
    position: relative;
    height: calc(100vh - 12rem);
    overflow: hidden;
}
</style>
