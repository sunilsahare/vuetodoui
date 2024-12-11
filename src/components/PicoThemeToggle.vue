<script setup>
import { ref, onMounted, watch } from 'vue';
const theme = ref('auto');


const applyTheme = () => {
    if (theme.value === 'auto') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        theme.value = systemTheme;
    } else {
        document.documentElement.setAttribute('data-theme', theme.value);
    }
};

const toggleTheme = () => {
    if (theme.value === 'light') {
        theme.value = 'dark';
    } else if (theme.value === 'dark') {
        theme.value = 'light';
    }
    applyTheme();
};
applyTheme()
</script>
<template>
    <button @click="toggleTheme" aria-label="Toggle Theme">
        <span v-if="theme === 'light'">🌞</span>
        <span v-else-if="theme === 'dark'">🌙</span>
        <span v-else>🌓</span> <!-- Auto mode icon -->
    </button>
</template>