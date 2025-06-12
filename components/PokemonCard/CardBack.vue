<script setup lang="ts">
import { MoveRight } from "lucide-vue-next";
import { sanitizeText } from "~/utils/utility";
import { typeColorMap } from "~/utils/pokemonType";

import type { Pokemon } from "~/types/pokemon";

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();

const pokemonImage = computed(() => {
    return (
        pokemon?.sprites?.other?.showdown?.front_default ||
        pokemon?.sprites?.other?.["official-artwork"]?.front_default
    );
});

const bgColorClass = computed<string>(() => {
    const primaryType =
        pokemon?.types?.[0]?.type?.name?.toLowerCase() || "normal";
    return typeColorMap[primaryType] || "bg-primary";
});

const japaneseName = computed(() => {
    return pokemon?.names?.find((name) => name.language.name === "ja")?.name;
});

const story = computed(() => {
    const text = pokemon?.flavor_text_entries?.find(
        (entry) => entry.language.name === "en",
    )?.flavor_text as string;
    return sanitizeText(text);
});

const pokemonBasicInfo = computed(() => {
    return [
        {
            label: "Type",
            value: pokemon.types.map((t) => t.type.name).join(", "),
        },
        {
            label: "Height",
            value: pokemon.height / 10 + "m",
        },
        {
            label: "Weight",
            value: pokemon.weight / 10 + "kg",
        },
    ];
});
</script>

<template>
    <div :class="`card_back p-1 ${bgColorClass}`">
        <div class="flex flex-col gap-2 bg-white/5 rounded-lg h-full">
            <div
                class="h-[100px] flex justify-around items-center gap-4 px-2 py-4 bg-white/20 rounded-t-lg"
            >
                <p class="text-xl font-bold">
                    #{{ pokemon.id.toString().padStart(3, "0") }}
                </p>
                <img
                    :src="pokemonImage"
                    :alt="pokemon.name"
                    class="w-auto h-full object-contain pointer-events-none"
                    draggable="false"
                />
            </div>
            <div class="flex-1 flex flex-col justify-between gap-2 px-4 py-2">
                <!-- Pokemon Name & Types -->
                <div class="flex justify-between items-center gap-4">
                    <p class="text-xl capitalize">{{ pokemon.name }}</p>
                    <!-- Type Badges -->
                    <div
                        class="flex justify-center items-center gap-2 text-white/60"
                    >
                        <TypeBadge
                            v-for="type in pokemon.types"
                            :key="type.type.name"
                            :type="type.type.name"
                        />
                    </div>
                </div>
                <!-- Pokemon Story @Todo: Make Reactive with Version -->
                <p class="text-sm line-clamp-6">
                    {{ story }}
                </p>
                <!-- Pokemon Basic Info -->
                <div class="flex justify-around items-center">
                    <div
                        v-for="info in pokemonBasicInfo"
                        :key="info.label"
                        class="flex flex-col"
                    >
                        <p class="text-xs font-light">
                            {{ info.label }}
                        </p>
                        <p class="text-base font-medium capitalize">
                            {{ info.value }}
                        </p>
                    </div>
                </div>
                <!-- Card Footer -->
                <div
                    class="flex justify-between items-center gap-4 place-item-end"
                >
                    <p class="text-xl font-black text-white/30">
                        {{ japaneseName }}
                    </p>
                    <!-- <NuxtLink
                        to="/"
                        class="group text-foreground border border-foreground rounded-full p-1"
                    >
                        <MoveRight
                            class="size-4 group-hover:-rotate-45 transition duration-300"
                        />
                    </NuxtLink> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
