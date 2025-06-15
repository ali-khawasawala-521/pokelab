export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Ability {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export type Form = NamedAPIResource;

export interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export type MoveLearnMethod = NamedAPIResource;

export type VersionGroup = NamedAPIResource;

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  order: number | null;
  version_group: VersionGroup;
}

export interface Move {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface GenusEntry {
  genus: string;
  language: NamedAPIResource;
}

export interface NameEntry {
  name: string;
  language: NamedAPIResource;
}

export interface PalParkEncounter {
  area: NamedAPIResource;
  base_score: number;
  rate: number;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: NamedAPIResource;
}

export interface Variety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

export interface Type {
  slot: number;
  type: NamedAPIResource;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface EvolutionDetail {
  gender: number | null;
  held_item: NamedAPIResource | null;
  item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedAPIResource | null;
  trigger: NamedAPIResource;
  turn_upside_down: boolean;
}

export interface ChainLink {
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
  is_baby: boolean;
  species: NamedAPIResource;
}
