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
