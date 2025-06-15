import type { PokemonResponse, PokemonSpeciesResponse } from "./response";

export type Pokemon = PokemonResponse & PokemonSpeciesResponse;

export type EvolutionChain = EvolutionChainItem[];

export type Variants = VariantItem[];

interface EvolutionChainItem {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
}

interface VariantItem {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
}
