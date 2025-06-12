import { apiBaseUrl } from "~/utils/constant";

import type { NamedAPIResource } from "~/types/base";
import type { Response } from "~/types/response";

const localListData = ref<NamedAPIResource[]>([]);

export const usePokemonIndex = () => {
  const fetchPokemonList = async () => {
    const data = (await $fetch(`${apiBaseUrl}/pokemon?limit=1500`)) as Response;
    localListData.value = data.results;
    return data.results;
  };

  return {
    localListData,
    fetchPokemonList,
  };
};
