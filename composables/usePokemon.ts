import { apiBaseUrl } from "~/utils/constant";

import type { NamedAPIResource, ChainLink } from "~/types/base";
import type {
  PokemonResponse,
  PokemonSpeciesResponse,
  EvolutionChainReponse,
} from "~/types/response";
import type { Pokemon, EvolutionChain } from "~/types/pokemon";

export const usePokemon = () => {
  const fetchPokemonById = async (id: string | number) => {
    const data = (await $fetch(
      `${apiBaseUrl}/pokemon/${id}`,
    )) as PokemonResponse;
    return data;
  };

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

  const extractSpecies = (
    chain: ChainLink,
    result: NamedAPIResource[] = [],
  ) => {
    if (!chain || !chain.species) return result;
    // Add current species
    result.push(chain.species);
    // Recursively go through the evolves_to array
    for (const evolution of chain.evolves_to) {
      extractSpecies(evolution, result);
    }

    return result;
  };

  const fetchEvolutionChain = async (url: string): Promise<EvolutionChain> => {
    const chainResponse = (await $fetch(url)) as EvolutionChainReponse;
    const chain = extractSpecies(chainResponse.chain);
    const chainPokemon = (await Promise.all(
      chain.map((c) => fetchPokemonById(c.url.split("/").slice(-2)[0])),
    )) as Pokemon[];
    return chainPokemon.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      url: `/${pokemon.name}`,
      imageUrl:
        pokemon?.sprites?.other?.dream_world?.front_default ||
        pokemon?.sprites?.other?.["official-artwork"]?.front_default,
    }));
  };

  const fetchVariants = async (pokemon: Pokemon) => {
    const variants = (await Promise.all(
      pokemon.varieties.map((variant) => fetchPokemon(variant.pokemon)),
    )) as Pokemon[];
    return variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      url: `/${variant.name}`,
      imageUrl:
        variant?.sprites?.other?.dream_world?.front_default ||
        variant?.sprites?.other?.["official-artwork"]?.front_default,
    }));
  };

  return {
    fetchPokemonData,
    fetchEvolutionChain,
    fetchVariants,
  };
};
