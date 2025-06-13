import { apiBaseUrl } from "~/utils/constant";

import type { NamedAPIResource } from "~/types/base";
import type { Response } from "~/types/response";

const localListData = ref<NamedAPIResource[]>([]);

export const usePokemonType = () => {
  const fetchPokemonTypeList = async () => {
    const data = (await $fetch(`${apiBaseUrl}/type?limit=50`)) as Response;
    localListData.value = data.results;
    return data.results;
  };

  return {
    localListData,
    fetchPokemonTypeList,
  };
};
