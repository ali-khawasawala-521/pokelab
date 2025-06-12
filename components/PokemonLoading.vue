<script setup lang="ts"></script>

<template>
    <div class="pokemon"></div>
</template>

<style scoped>
.pokemon {
    position: relative;
    height: 100px;
    width: 100px;
    background: linear-gradient(to bottom, red 50%, white 50%);
    border-radius: 50%;
    border: 8px solid black;
    animation: spin 1s linear infinite;
}

.pokemon::before {
    content: "";
    position: absolute;
    height: 8px;
    width: 90px;
    background: black;
    top: 50%;
    transform: translateY(-50%);
}

.pokemon::after {
    content: "";
    position: absolute;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow:
        inset 0 0 0 8px black,
        inset 0 0 0 10px white,
        inset 0 0 0 12px black;
}

/* Spin Animation */
@keyframes spin {
    0% {
        scale: 0.9;
        transform: rotate(0deg);
    }
    50% {
        scale: 1;
        transform: rotate(180deg);
    }
    100% {
        scale: 0.9;
        transform: rotate(360deg);
    }
}
</style>
