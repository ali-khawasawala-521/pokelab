<script setup lang="ts">
import { TabsContent } from "@/components/ui/tabs";
import type { Pokemon } from "@/types/pokemon";

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();

const extractImageURLs = (
    obj: Record<string, any>,
    path: string = "",
): Record<string, string>[] => {
    const result = [];

    for (const key in obj) {
        const value = obj[key];
        const fullPath = path ? `${path} ${key}` : key;

        if (typeof value === "string" && value.startsWith("http")) {
            result.push({ label: fullPath, src: value });
        } else if (typeof value === "object" && value !== null) {
            result.push(...extractImageURLs(value, fullPath));
        }
    }

    return result;
};

const images = computed(() => {
    return extractImageURLs(pokemon.sprites);
});

const audios = computed(() =>
    Object.entries(pokemon.cries).map((cry) => ({
        label: sanitizeText(cry[0]) + " cry",
        src: cry[1],
        type: "audio/*",
    })),
);
</script>

<template>
    <TabsContent value="media">
        <div class="lg:overflow-auto tab-height">
            <div class="flex flex-col gap-4">
                <div
                    class="flex flex-wrap justify-center lg:justify-start items-center gap-4"
                >
                    <div
                        v-for="image in images"
                        :key="image.label"
                        class="w-18 h-18 aspect-square rounded-sm bg-white shadow-xl"
                    >
                        <img
                            :src="image.src"
                            :alt="image.label"
                            class="w-full h-full aspect-square rounded-sm"
                        />
                    </div>
                </div>
                <div
                    class="flex flex-wrap justify-center lg:justify-start items-center gap-4"
                >
                    <figure v-for="audio in audios" :key="audio.label">
                        <figcaption class="capitalize">
                            {{ audio.label }}
                        </figcaption>
                        <audio
                            controls
                            :src="audio.src"
                            :type="audio.type"
                        ></audio>
                    </figure>
                </div>
            </div>
        </div>
    </TabsContent>
</template>

<style scoped></style>
