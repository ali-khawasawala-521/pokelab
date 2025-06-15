<script setup lang="ts">
import { TabsContent } from "@/components/ui/tabs";
import type { Pokemon, Variants } from "@/types/pokemon";

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();

const { fetchVariants } = usePokemon();

const variants = ref<Variants>([]);

onMounted(async () => {
    variants.value = await fetchVariants(pokemon);
});
</script>

<template>
    <TabsContent value="variants">
        <div class="lg:overflow-auto lg:tab-height">
            <div class="flex flex-wrap justify-center gap-2">
                <NuxtLink
                    v-for="variant in variants"
                    :key="variant.id"
                    class="w-[300px] flex justify-around items-center gap-4 bg-white/80 px-4 py-2 rounded-sm shadow-xl"
                    :to="variant.url"
                >
                    <img
                        :src="variant.imageUrl"
                        :alt="variant.name"
                        class="w-24 h-24 aspect-square"
                    />
                    <span class="text-xl font-light capitalize">{{
                        sanitizeText(variant.name)
                    }}</span>
                </NuxtLink>
            </div>
        </div>
    </TabsContent>
</template>

<style scoped></style>
