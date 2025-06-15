<script setup lang="ts">
import { Globe, Github, Linkedin } from "lucide-vue-next";

defineProps<{
    isTransparent?: boolean;
}>();
</script>

<template>
    <footer
        :class="`flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4 px-4 py-2 text-[#f0f0f0] ${isTransparent ? 'bg-black/50' : 'bg-black'}`"
    >
        <!-- Powered By -->
        <a
            href="https://pokeapi.co"
            target="_blank"
            class="flex justify-center items-center gap-2"
        >
            <span class="text-base">Powered by</span>
            <img
                src="@/assets/images/pokeapi.png"
                alt="Pokelab"
                class="w-16 h-auto"
            />
        </a>

        <!-- Social Media -->
        <div class="flex justify-between items-center gap-4">
            <a
                href="https://zamarmardesign.com"
                target="_blank"
                class="border rounded-full p-2 border-[#f0f0f0]"
            >
                <Globe />
            </a>
            <a
                href="https://github.com/ali-khawasawala-521"
                target="_blank"
                class="border rounded-full p-2 border-[#f0f0f0]"
            >
                <Github />
            </a>
            <a
                href="https://linkedin.com/in/ali-asgar-khawasawala"
                target="_blank"
                class="border rounded-full p-2 border-[#f0f0f0]"
            >
                <Linkedin />
            </a>
        </div>
    </footer>
</template>

<style scoped></style>
