<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { Input } from "~/components/ui/input";

interface Item {
    value: string;
    label: string;
}

const router = useRouter();
const route = useRoute();

const searchQuery = ref("");

const onSubmit = () => {
    router.replace({
        query: {
            ...route.query,
            search: searchQuery.value || undefined,
        },
    });
};
</script>

<template>
    <div class="relative max-w-sm items-center rounded-md">
        <form @submit.prevent="onSubmit">
            <Input
                id="search"
                type="search"
                placeholder="Search Pokemon..."
                v-model="searchQuery"
                class="pr-10 bg-white focus-visible:ring-0"
            />
            <button
                type="submit"
                class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
            >
                <Search class="size-6 text-muted-foreground" />
            </button>
        </form>
    </div>
</template>
