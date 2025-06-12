<script setup lang="ts">
import CardFront from "./CardFront.vue";
import CardBack from "./CardBack.vue";

import type { Pokemon } from "~/types/pokemon";

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();
</script>

<template>
    <div class="card-wrapper">
        <div
            v-if="!pokemon"
            class="w-[300px] h-[400px] border border-foreground rounded-md flex items-center justify-center"
        >
            <PokemonLoading />
        </div>
        <div v-else class="card">
            <CardFront :pokemon="pokemon" />
            <CardBack :pokemon="pokemon" />
        </div>
    </div>
</template>

<style>
.card-wrapper,
.card,
.card_front,
.card_back {
    height: 400px;
    width: 300px;
}

.card-wrapper {
    perspective: 1000px;
    cursor: pointer;
}

.card {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.card-wrapper:hover .card {
    transform: rotateY(180deg);
}

.card_front,
.card_back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 1rem;
}

.card_back {
    transform: rotateY(180deg);
}
</style>
