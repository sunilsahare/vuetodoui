<template>
    <footer>Hi '{{ useUserStore().username }} '</footer>
</template>
<script setup>
import { useUserStore } from '@/stores/userStore';


</script>
<style scoped>
footer {
    background-color: var(--todo-background);
}
</style>
