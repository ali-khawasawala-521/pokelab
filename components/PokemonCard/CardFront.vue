<script setup lang="ts">
import { typeColorMap, typeImageMap } from "~/utils/pokemonType";

import type { Pokemon } from "~/types/pokemon";

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();

const japaneseName = computed(() => {
    return pokemon?.names?.find((name) => name.language.name === "ja")?.name;
});

const bgColorClass = computed<string>(() => {
    const primaryType =
        pokemon?.types?.[0]?.type?.name?.toLowerCase() || "normal";
    return typeColorMap[primaryType] || "bg-primary";
});

const coverImage = computed(() => {
    return (
        pokemon?.sprites?.other?.dream_world?.front_default ||
        pokemon?.sprites?.other?.["official-artwork"]?.front_default
    );
});

const bgImage = computed(() => {
    const primaryType =
        pokemon?.types?.[0]?.type?.name?.toLowerCase() || "normal";
    return typeImageMap[primaryType];
});
</script>

<template>
    <div
        :class="`card_front flex flex-col gap-2 justify-between p-4 z-2 rotate-y-0 overflow-hidden ${bgColorClass}`"
    >
        <div class="relative -z-2">
            <component
                :is="bgImage"
                class="absolute text-white/10 w-full h-[400px] object-center"
            />
        </div>
        <p class="text-2xl font-bold">
            #{{ pokemon.id.toString().padStart(3, "0") }}
        </p>
        <div class="flex-1 flex items-center justify-center">
            <img
                :src="coverImage"
                :alt="pokemon.name"
                class="w-auto h-[200px] object-contain"
            />
        </div>
        <div class="flex items-center justify-between gap-4 text-xl">
            <p class="font-medium capitalize">
                {{ sanitizeText(pokemon.name) }}
            </p>
            <p>{{ japaneseName }}</p>
        </div>
    </div>
</template>

<style scoped></style>
