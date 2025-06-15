<script setup lang="ts">
import type { EvolutionChain } from "~/types/pokemon";

const { type, showTitle = true } = defineProps<{
    chain: EvolutionChain;
    type: string;
    showTitle?: boolean;
}>();

const borderColorClass = computed<string>(() => {
    const primaryType = type?.toLowerCase() || "normal";
    return typeBorderColorMap[primaryType] || "border-primary";
});
</script>

<template>
    <div class="relative">
        <p
            v-if="showTitle"
            class="absolute -top-10 left-[50%] -translate-x-[50%] text-6xl font-bold text-white/20"
        >
            Evolution
        </p>
        <div class="flex justify-center items-center text-center gap-8">
            <div v-for="(pokemon, index) in chain" :key="pokemon.id">
                <div>
                    <NuxtLink
                        :to="pokemon.url"
                        :class="`relative flex flex-col items-center justify-center gap-2 w-18 xl:w-24 2xl:w-28 h-auto aspect-square rounded-full border-2 p-2 bg-white/30 ${borderColorClass} ${index > 0 && 'evol-circle'}`"
                    >
                        <img
                            :src="pokemon.imageUrl"
                            class="aspect-square object-contain object-center"
                        />
                    </NuxtLink>
                    <p class="capitalize">{{ pokemon.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.evol-circle::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -2.25rem;
    width: 2.25rem;
    height: 0.25rem;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: -1;
}
</style>
