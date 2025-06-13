<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import type { AcceptableValue } from "reka-ui";
import type { NamedAPIResource } from "~/types/base";

const route = useRoute();
const router = useRouter();
const { fetchPokemonTypeList, localListData } = usePokemonType();

const emit = defineEmits<{
    (e: "select:pokemonType", value: NamedAPIResource[] | null): void;
}>();

const availableTypes = computed(() =>
    localListData.value
        .map((type) => ({ value: type.name, label: useCapitalize(type.name) }))
        .filter(
            (type) => !["shadow", "stellar", "unknown"].includes(type.value),
        ),
);
const availablePokemon = ref<NamedAPIResource[]>([]);
const selectedType = ref<string | null>(null);

const onSelect = async (type: AcceptableValue) => {
    const pokemonType = type as string;
    const typeUrl = localListData.value.find(
        (type) => type.name === pokemonType,
    )?.url;

    if (!typeUrl) return;
    const { pokemon } = await $fetch(typeUrl);
    availablePokemon.value = pokemon.map((p) => p.pokemon as NamedAPIResource);
    emit("select:pokemonType", availablePokemon.value);
};

const resetType = () => {
    emit("select:pokemonType", null);
    selectedType.value = null;
};

watch(route, () => {
    selectedType.value = null;
});

onMounted(async () => {
    await fetchPokemonTypeList();
});
</script>

<template>
    <div class="flex justify-center items-center gap-4">
        <Select
            v-model:modelValue="selectedType"
            @update:model-value="onSelect"
        >
            <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Pokémon Type</SelectLabel>
                    <SelectItem
                        v-for="type in availableTypes"
                        :value="type.value"
                        >{{ type.label }}</SelectItem
                    >
                </SelectGroup>
            </SelectContent>
        </Select>
        <Button size="sm" :disabled="!selectedType" @click="resetType">
            Reset
        </Button>
    </div>
</template>
