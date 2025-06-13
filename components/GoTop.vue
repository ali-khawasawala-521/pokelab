<script setup lang="ts">
import { ChevronUp } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
</script>

<template>
    <div class="fixed bottom-20 right-4">
        <Button size="icon" class="rounded-full cursor-pointer size-12">
            <ChevronUp class="size-6" />
        </Button>
    </div>
</template>
