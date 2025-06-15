<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutTab from "./AboutTab.vue";
import MovesTab from "./MovesTab.vue";
import MediaTab from "./MediaTab.vue";
import VariantsTab from "./VariantsTab.vue";

import type { Pokemon } from "~/types/pokemon";

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();

const tabs = computed<any[]>(() =>
    [
        {
            label: "About",
            value: "about",
        },
        {
            label: "Moves",
            value: "moves",
        },
        {
            label: "Media",
            value: "media",
        },
        pokemon.varieties.length > 1 && {
            label: "Variants",
            value: "variants",
        },
    ].filter(Boolean),
);

const tabGridCols = computed(() =>
    tabs.value.length === 4 ? "grid-cols-4" : "grid-cols-3",
);
</script>

<template>
    <Tabs default-value="about" class="detail">
        <TabsList :class="`grid w-full ${tabGridCols}`">
            <TabsTrigger
                v-for="tab in tabs"
                :key="tab?.label"
                :value="tab?.value"
                class="cursor-pointer"
            >
                {{ tab?.label }}
            </TabsTrigger>
        </TabsList>
        <AboutTab :pokemon="pokemon" />
        <MovesTab :pokemon="pokemon" />
        <MediaTab :pokemon="pokemon" />
        <VariantsTab :pokemon="pokemon" />
    </Tabs>
</template>
