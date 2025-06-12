<script setup lang="ts">
import PokemonLogo from "~/assets/images/pokemon.svg";
defineProps<{
    background?: string;
}>();
</script>

<template>
    <header
        :class="`flex flex-col md:flex-row justify-between items-center gap-2 px-6 py-2 min-h-20 ${background || 'bg-blue-500'}`"
    >
        <!-- Logo -->
        <div>
            <PokemonLogo class="w-24 h-auto" />
        </div>
        <!-- Search Bar -->
        <SearchBar />
    </header>
</template>

<style scoped></style>
