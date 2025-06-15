<script setup lang="ts"></script>

<template>
    <div class="flex flex-col min-h-screen">
        <Header isTransparent />
        <slot />
        <Footer isTransparent />
    </div>
</template>

<style scoped></style>
