<script setup>
import TodoFooter from './TodoFooter.vue';
import TodoHeader from './TodoHeader.vue';

</script>
<template>
    <TodoHeader />
    <main class="container">
        <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </RouterView>
    </main>
    <TodoFooter />
</template>
<style scoped></style>
