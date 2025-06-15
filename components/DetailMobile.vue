<script setup lang="ts">
import type { Pokemon } from "~/types/pokemon";
defineProps<{
    pokemon: Pokemon;
    coverImage: string;
}>();
</script>

<template>
    <div class="flex-1 px-2 py-4 overflow-auto">
        <div
            class="flex flex-col gap-4 bg-white/30 rounded-t-md px-6 py-4 -mb-8"
        >
            <div class="flex justify-between items-center gap-2">
                <p class="text-xl font-light">
                    #{{ pokemon?.id.toString().padStart(3, "0") }}
                </p>
                <p class="text-2xl font-medium capitalize">
                    {{ sanitizeText(pokemon?.name) }}
                </p>
            </div>
            <div class="grow-2 flex items-center justify-center mb-8">
                <img
                    :src="coverImage"
                    :alt="pokemon?.name"
                    class="w-auto h-64"
                />
            </div>
        </div>
        <DetailTabs :pokemon="pokemon" />
    </div>
</template>

<style scoped></style>
