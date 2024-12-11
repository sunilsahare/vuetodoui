<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import { useRouter } from 'vue-router'
import TodoForm from '../components/TodoForm.vue'

const todoStore = useTodoStore()
const router = useRouter()

const newTodo = ref({
    user: '',
    task: '',
    done: false,
    targetDate: ''
})

const addTodo = async () => {
    await todoStore.addTodo(newTodo.value)
    if (!todoStore.hasError) {
        router.push('/')
    }
}

const resetForm = () => {
    newTodo.value = {
        user: '',
        task: '',
        done: false,
        targetDate: ''
    }
    todoStore.clearErrors()
}
</script>
<template>
    <section id="todo-add">
        <h2>Add New Todo</h2>
        <div v-if="todoStore.error" class="error-message"> {{ todoStore.error }} </div>
        <TodoForm :loading="todoStore.loading" v-model:todo="newTodo" v-model:validationErrors="todoStore.validationErrors" form-label="Add: Todo" submit-label="Add Todo" reset-label="Reset" @submit="addTodo" @reset="resetForm" />
    </section>
</template>
<style scoped>
.error-message {
    color: red;
    margin-bottom: 15px;
}
</style>
