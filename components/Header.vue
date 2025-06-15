<script setup lang="ts">
import PokemonLogo from "~/assets/images/pokemon.svg";
defineProps<{
    isTransparent?: boolean;
}>();
</script>

<template>
    <header
        :class="`flex flex-col md:flex-row justify-between items-center gap-2 px-6 py-2 min-h-20 ${isTransparent ? 'bg-black/20' : 'bg-blue-500'}`"
    >
        <!-- Logo -->
        <NuxtLink to="/">
            <PokemonLogo class="w-24 h-auto" />
        </NuxtLink>
        <!-- Search Bar -->
        <SearchBar />
    </header>
</template>

<style scoped></style>
