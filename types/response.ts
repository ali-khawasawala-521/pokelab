import type {
  Ability,
  Cries,
  Form,
  GameIndex,
  Move,
  NamedAPIResource,
  FlavorTextEntry,
  GenusEntry,
  NameEntry,
  PalParkEncounter,
  PokedexNumber,
  Variety,
  Type,
} from "./base";

export interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PokemonResponse {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  weight: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  species: NamedAPIResource;
  types: Type[];
  sprites: Record<string, any>;
}

export interface PokemonSpeciesResponse {
  base_happiness: number;
  capture_rate: number;
  color: NamedAPIResource;
  egg_groups: NamedAPIResource[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: NamedAPIResource | null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: GenusEntry[];
  generation: NamedAPIResource;
  growth_rate: NamedAPIResource;
  habitat: NamedAPIResource;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: NameEntry[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: NamedAPIResource;
  varieties: Variety[];
}
