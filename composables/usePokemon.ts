import type { NamedAPIResource } from "~/types/base";
import type { PokemonResponse, PokemonSpeciesResponse } from "~/types/response";
import type { Pokemon } from "~/types/pokemon";

export const usePokemon = () => {
  const fetchPokemon = async (listItem: NamedAPIResource) => {
    if (!listItem) return;
    const data = (await $fetch(listItem.url)) as PokemonResponse;
    return data;
  };

  const fetchPokemonSpecies = async (url: string) => {
    const data = (await $fetch(url)) as PokemonSpeciesResponse;
    return data;
  };

  const fetchPokemonData = async (listItem: NamedAPIResource) => {
    const pokemon = (await fetchPokemon(listItem)) as PokemonResponse;
    const species = await fetchPokemonSpecies(pokemon.species.url);
    return { ...species, ...pokemon } as Pokemon;
  };

  return {
    fetchPokemonData,
  };
};
