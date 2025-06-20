<script setup lang="ts">
import { Mars, Venus } from "lucide-vue-next";
import { TabsContent } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { sanitizeText } from "~/utils/utility";

import type { Pokemon, EvolutionChain } from "@/types/pokemon";

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();

const evolutionChain = inject<EvolutionChain>("evolution-chain", []);

const statsLabels: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Special Attack",
    "special-defense": "Special Defense",
    speed: "Speed",
};

const story = ref<string>(
    sanitizeText(
        pokemon.flavor_text_entries.find(
            (entry) => entry.language.name === "en",
        )?.flavor_text || "",
    ),
);

const borderColorClass = computed<string>(() => {
    const primaryType =
        pokemon?.types?.[0]?.type?.name?.toLowerCase() || "normal";
    return typeBorderColorMap[primaryType] || "border-primary";
});

const stories = computed(() => {
    return pokemon.flavor_text_entries.filter(
        (entry) => entry.language.name === "en",
    );
});

const version = ref<Record<string, boolean>>(
    Object.fromEntries(
        stories.value?.map((s) => [
            s.version.name,
            s.version.name === stories.value[0].version.name,
        ]),
    ),
);

const versions = computed({
    get() {
        return stories.value?.map((s) => s.version.name);
    },
    set(value: string) {
        version.value = Object.fromEntries(
            versions.value.map((v) => [v, v === value]),
        );
    },
});

const basicInfo = computed(() => {
    return [
        {
            label: "Type",
            value: pokemon.types.map((t) => t.type.name).join(", "),
            isText: true,
        },
        {
            label: "Category",
            value:
                pokemon.genera.find((g) => g.language.name === "en")?.genus ||
                "",
            isText: true,
        },
        {
            label: "Height",
            value: pokemon.height / 10 + "m",
            isText: true,
        },
        {
            label: "Weight",
            value: pokemon.weight / 10 + "kg",
            isText: true,
        },
        {
            label: "Gender",
            value: pokemon.gender_rate === -1 ? "Genderless" : "Male/Female",
            component: () =>
                h(
                    "div",
                    { class: "flex items-center justify-center gap-2" },
                    {
                        default: () => [
                            h(Mars, { class: "text-blue-500" }),
                            h(Venus, { class: "text-pink-500" }),
                        ],
                    },
                ),
            isText: pokemon.gender_rate === -1,
        },
        {
            label: "Habitat",
            value: pokemon.habitat?.name || "",
            isText: true,
        },
        ...pokemon.abilities
            .filter((a) => !a.is_hidden)
            .map((a) => ({
                label: "Ability",
                value: a.ability.name,
                isText: true,
            })),
    ];
});

const statChartMaxValue = computed(
    () =>
        Math.ceil(
            Math.max(...pokemon.stats.map((stat) => stat.base_stat)) / 50,
        ) * 50,
);

const statChartOptions = computed(() => ({
    chart: {
        id: "pokemon-stats-chart",
        width: 500,
        toolbar: {
            show: false,
        },
        fontFamily: "Poppins, sans-serif",
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            borderRadiusApplication: "around",
            barHeight: "50%",
            horizontal: true,
            colors: {
                backgroundBarColors: ["#f0f0f0"],
                backgroundBarOpacity: 0.5,
                backgroundBarRadius: 4,
            },
        },
    },
    grid: {
        show: false,
    },
    xaxis: {
        categories: pokemon.stats.map((stat) => statsLabels[stat.stat.name]),
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            style: {
                fontSize: "14px",
                fontWeight: "300",
            },
            offsetY: 3,
        },
    },
    dataLabels: {
        style: {
            fontSize: "12px",
            colors: ["#262626"],
        },
    },
    responsive: [
        {
            breakpoint: 768,
            options: {
                chart: {
                    height: 300,
                    width: 300,
                },
            },
        },
    ],
}));

const statChartSeries = computed(() => [
    {
        name: "Base Stat",
        data: pokemon.stats.map((stat) => stat.base_stat),
        color: ["#f0f0f0"],
    },
]);

const toggleVersion = (ver: string) => {
    versions.value = ver;
    story.value = sanitizeText(
        pokemon.flavor_text_entries.find(
            (entry) =>
                entry.language.name === "en" && entry.version.name === ver,
        )?.flavor_text || "",
    );
};
</script>

<template>
    <TabsContent value="about">
        <div class="lg:overflow-auto tab-height">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-1">
                    <h2>Story</h2>
                    <p>{{ story }}</p>
                </div>
                <!-- Versions -->
                <div class="flex flex-col gap-1">
                    <h2>Versions</h2>
                    <div class="flex flex-wrap items-center gap-1">
                        <Toggle
                            v-for="ver in versions"
                            :key="ver"
                            :value="ver"
                            v-model:modelValue="version[ver]"
                            variant="outline"
                            :aria-label="`Toggle ${ver}`"
                            :class="`cursor-pointer text-sm font-light bg-white/20 ${borderColorClass}`"
                            @click="toggleVersion(ver)"
                        >
                            <p class="capitalize">{{ sanitizeText(ver) }}</p>
                        </Toggle>
                    </div>
                </div>
                <!-- Basic Info -->
                <div
                    class="flex flex-wrap justify-center lg:justify-start items-center gap-4"
                >
                    <div
                        v-for="info in basicInfo"
                        :key="info.label"
                        class="flex flex-col justify-center items-center bg-white/80 rounded-sm p-2 shadow-xl h-[80px] w-[160px]"
                    >
                        <p
                            class="capitalize text-center"
                            style="font-size: 0.75rem; font-weight: 300"
                        >
                            {{ info.label }}
                        </p>
                        <p
                            v-if="info.isText"
                            class="capitalize text-center"
                            style="font-size: 1rem; font-weight: 400"
                        >
                            {{ info.value }}
                        </p>
                        <component v-else :is="info?.component" />
                    </div>
                </div>
                <!-- Evolution Chain -->
                <div class="lg:hidden flex flex-col gap-1">
                    <h2>Evolution Chain</h2>
                    <EvolutionChain
                        :chain="evolutionChain"
                        :type="pokemon.types[0].type.name"
                        :show-title="false"
                    />
                </div>
                <!-- Stats -->
                <div class="flex flex-col gap-1">
                    <h2>Stats</h2>
                    <div class="w-max-sm lg:w-max-md">
                        <BarChart
                            :series="statChartSeries"
                            :options="statChartOptions"
                        />
                    </div>
                </div>
            </div>
        </div>
    </TabsContent>
</template>
