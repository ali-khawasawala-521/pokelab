<script setup lang="ts">
import { Button } from "~/components/ui/button";

import type { NamedAPIResource } from "~/types/base";
import type { Pokemon } from "~/types/pokemon";

const route = useRoute();
const { fetchPokemonList, localListData } = usePokemonIndex();
const { fetchPokemonData } = usePokemon();

const limit = ref<[number, number]>([0, 50]);
const pokemon = ref<Pokemon[]>([]);
const isLoading = ref<boolean>(false);
const searchQuery = ref<string | null>(null);
const searchListData = ref<NamedAPIResource[]>([]);
const canLoadMore = computed(() => {
    if (searchQuery.value) {
        return pokemon.value.length < searchListData.value.length;
    } else {
        return pokemon.value.length < localListData.value.length;
    }
});

const loadPokemon = async (list?: NamedAPIResource[]) => {
    if (!list) return;
    const data = list.slice(limit.value[0], limit.value[1]);
    isLoading.value = true;
    const newPokemon = await Promise.all(data.map((d) => fetchPokemonData(d)));
    pokemon.value.push(...newPokemon);
    isLoading.value = false;
};

const loadMore = () => {
    if (canLoadMore.value) {
        isLoading.value = true;
        limit.value = [limit.value[1], limit.value[1] + 50];
        loadPokemon(localListData.value);
    }
};

const searchPokemon = () => {
    const searchList = localListData.value.filter((p) =>
        p.name.toLowerCase().includes(searchQuery?.value?.toLowerCase() || ""),
    ) as NamedAPIResource[];
    searchListData.value = searchList;
    loadPokemon(searchList);
};

const resetPokemonData = () => {
    limit.value = [0, 50];
    pokemon.value = [];
};

useHead({
    title: "Pokélab",
});

watch(isLoading, (val) => {
    document.body.style.overflow = val ? "hidden" : "";
});

watch(route, () => {
    resetPokemonData();
    if (route.query?.search) {
        searchQuery.value = route.query.search as string;
        searchPokemon();
    } else {
        searchQuery.value = null;
        loadPokemon(localListData.value);
    }
});

onMounted(() => {
    fetchPokemonList().then((list) => {
        if (route.query?.search) {
            searchQuery.value = route.query.search as string;
            searchPokemon();
        } else {
            loadPokemon(list);
        }
    });
});
</script>

<template>
    <div
        class="flex-1 flex flex-col justify-center items-center gap-4 py-2 overflow-hidden"
    >
        <div
            v-if="pokemon?.length"
            class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
        >
            <PokemonCard v-for="p in pokemon" :key="p.name" :pokemon="p" />
        </div>
        <div
            v-if="!isLoading && pokemon?.length && canLoadMore"
            class="flex items-center justify-center"
        >
            <Button @click="loadMore">Load More</Button>
        </div>
        <div
            v-if="isLoading"
            class="fixed inset-0 flex items-center justify-center bg-foreground/50 z-50"
        >
            <PokemonLoading />
        </div>
        <div v-if="!pokemon?.length && !isLoading">
            <EmptyPokeball />
        </div>
    </div>
</template>

<style scoped></style>
