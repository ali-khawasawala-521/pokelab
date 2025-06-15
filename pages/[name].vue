<script setup lang="ts">
import type { NamedAPIResource } from "~/types/base";
import type { Pokemon, EvolutionChain } from "~/types/pokemon";

const route = useRoute();
const { fetchPokemonList } = usePokemonIndex();
const { fetchEvolutionChain, fetchPokemonData } = usePokemon();

const pokemonName = route.params.name as string;

const isLoading = ref<boolean>(true);
const pokemon = ref<Pokemon>();
const evolutionChain = ref<EvolutionChain>([]);

const coverImage = computed(() => {
    return (
        pokemon.value?.sprites?.other?.dream_world?.front_default ||
        pokemon.value?.sprites?.other?.["official-artwork"]?.front_default
    );
});

const bgColorClass = computed<string>(() => {
    const primaryType =
        pokemon.value?.types?.[0]?.type?.name?.toLowerCase() || "normal";
    return typeColorMap[primaryType] || "bg-primary";
});

const loadPokemon = async (item?: NamedAPIResource) => {
    if (!item) return;
    isLoading.value = true;
    const newPokemon = await fetchPokemonData(item);
    const newEvolutionChain = await fetchEvolutionChain(
        newPokemon.evolution_chain.url,
    );
    pokemon.value = newPokemon;
    evolutionChain.value = newEvolutionChain;
    setTimeout(() => {
        document.body.classList.add(bgColorClass.value);
        isLoading.value = false;
    }, 300);
};

provide("evolution-chain", evolutionChain);

onMounted(async () => {
    // document.body.classList.add("overflow-hidden");
    const list = await fetchPokemonList();
    const pokemon = list.find((itm) => itm.name === pokemonName);
    await loadPokemon(pokemon);
});

onUnmounted(() => {
    // document.body.classList.remove("overflow-hidden");
    document.body.classList.remove(bgColorClass.value);
});

definePageMeta({
    layout: "detail",
});
</script>

<template>
    <Transition class="">
        <main
            v-if="!isLoading && pokemon"
            class="grow-2 m-2 bg-white/20 rounded-md"
        >
            <div class="hidden lg:flex flex-col lg:flex-row gap-4">
                <DetailDesktop :pokemon="pokemon" :coverImage="coverImage" />
            </div>
            <div class="lg:hidden flex-col lg:flex-row gap-4">
                <DetailMobile :pokemon="pokemon" :coverImage="coverImage" />
            </div>
        </main>
        <div
            v-else
            class="fixed inset-0 bg-white flex flex-col justify-center items-center gap-4"
        >
            <PokemonLoading />
            <h1 class="capitalize">Loading {{ pokemonName }}...</h1>
        </div>
    </Transition>
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
