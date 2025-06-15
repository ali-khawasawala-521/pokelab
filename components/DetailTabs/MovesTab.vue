<script setup lang="ts">
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import type { Pokemon } from "@/types/pokemon";

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();

const moves = computed(() => {
    return pokemon.moves.map((move) => move.move.name);
});
</script>

<template>
    <TabsContent value="moves">
        <div class="lg:overflow-auto tab-height">
            <div class="flex flex-wrap justify-center items-center gap-4">
                <div
                    v-for="move in moves"
                    :key="move"
                    class="flex flex-col justify-center items-center bg-white/80 rounded-sm p-2 shadow-xl h-[80px] w-[160px]"
                >
                    <p
                        class="capitalize text-center"
                        style="font-size: 1rem; font-weight: 400"
                    >
                        {{ sanitizeText(move) }}
                    </p>
                </div>
            </div>
        </div>
    </TabsContent>
</template>

<style scoped></style>
