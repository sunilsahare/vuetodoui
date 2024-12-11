<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import TodoTable from '../components/TodoTable.vue'
import { useRouter } from 'vue-router'
import TodoCards from '@/components/TodoCards.vue';
import { useStorage } from '@vueuse/core';

const todoStore = useTodoStore()
const router = useRouter()

const showCard = useStorage('todo-view-preference', 'table');

const editTodo = (id) => {
    router.push({ name: 'TodoEdit', params: { id } })
}

const deleteTodo = async (id) => {
    await todoStore.deleteTodo(id)
}

onMounted(async () => {
    await todoStore.fetchTodos()
})

</script>
<template>
    <section id="todo-list">
        <h2>Todo List</h2><small>
            <p>
                <label>view as:<input type="radio" v-model="showCard" value="card" />cards<input type="radio" v-model="showCard" value="table" />table</label>
            </p>
        </small>
        <div v-if="todoStore.error" class="error-message"> {{ todoStore.error }} </div>
        <TodoCards v-if="showCard === 'card'" :loading="todoStore.loading" :todos="todoStore.todos" @edit-click="editTodo" @remove-click="deleteTodo" />
        <TodoTable v-if="showCard === 'table'" :loading="todoStore.loading" :todos="todoStore.todos" @edit-click="editTodo" @remove-click="deleteTodo" />
    </section>
</template>
<style scoped>
.error-message {
    color: red;
    margin-bottom: 15px;
}
</style>
