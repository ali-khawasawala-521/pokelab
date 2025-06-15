<script setup lang="ts">
import { Button } from "~/components/ui/button";

import type { NamedAPIResource } from "~/types/base";
import type { Pokemon } from "~/types/pokemon";

const route = useRoute();
const { fetchPokemonList, localListData } = usePokemonIndex();
const { fetchPokemonData } = usePokemon();

const limit = ref<[number, number]>([0, 50]);
const pokemon = ref<Pokemon[]>([]);
const isLoading = ref<boolean>(true);
const searchQuery = ref<string | null>(null);
const currentListData = ref<NamedAPIResource[]>([]);
const searchListData = ref<NamedAPIResource[]>([]);
const showGoTopButton = ref<boolean>(false);

const canSearch = computed(() => {
    return searchQuery.value !== null && searchQuery.value !== "";
});
const canLoadMore = computed(() => {
    if (searchQuery.value) {
        return pokemon.value.length < searchListData.value.length;
    } else {
        return pokemon.value.length < currentListData.value.length;
    }
});

const loadPokemon = async (list: NamedAPIResource[]) => {
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
        loadPokemon(currentListData.value);
    }
};

const handleSearchAndFilter = (list: NamedAPIResource[] | null) => {
    const listData = list ? list : localListData.value;
    currentListData.value = listData;

    const searchList = listData.filter((p) =>
        canSearch
            ? p.name
                  .toLowerCase()
                  .includes(searchQuery?.value?.toLowerCase() || "")
            : true,
    ) as NamedAPIResource[];
    searchListData.value = searchList;
    resetPokemonData();
    loadPokemon(searchList);
};

const resetPokemonData = () => {
    limit.value = [0, 50];
    pokemon.value = [];
};

const handleScroll = () => {
    showGoTopButton.value = window.scrollY > 400;
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

watch(isLoading, (val) => {
    document.body.style.overflow = val ? "hidden" : "";
});

watch(route, () => {
    resetPokemonData();
    if (route.query?.search) {
        searchQuery.value = route.query.search as string;
        handleSearchAndFilter(currentListData.value);
    } else {
        searchQuery.value = null;
        currentListData.value = localListData.value;
        loadPokemon(currentListData.value);
    }
});

onMounted(() => {
    window.addEventListener("scroll", handleScroll);

    fetchPokemonList().then((list) => {
        currentListData.value = list;
        if (route.query?.search) {
            searchQuery.value = route.query.search as string;
            handleSearchAndFilter(list);
        } else {
            loadPokemon(list);
        }
    });
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
    <main
        class="container grow-2 flex flex-col items-center gap-4 py-2 mx-auto"
    >
        <div
            class="w-full flex justify-center md:justify-end items-center gap-4 px-4"
        >
            <TypeSelector @select:pokemonType="handleSearchAndFilter" />
        </div>
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
        <div
            v-if="!pokemon?.length && !isLoading"
            class="grow-2 flex items-center"
        >
            <EmptyPokeball />
        </div>
        <Transition>
            <GoTop v-show="showGoTopButton" @click="scrollToTop" />
        </Transition>
    </main>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
