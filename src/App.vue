<script setup>
import { useUserStore } from './stores/userStore';
const userStore = useUserStore()
userStore.load();
</script>
<template>
  <router-view />
</template>
<style scoped></style>
