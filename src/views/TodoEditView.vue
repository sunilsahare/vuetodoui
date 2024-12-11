<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import { useRouter } from 'vue-router'
import TodoForm from '../components/TodoForm.vue'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const todoStore = useTodoStore()
const router = useRouter()

const editingTodo = ref(null)

const updateTodo = async () => {
    await todoStore.updateTodo(editingTodo.value)
    if (!todoStore.hasError) {
        router.push('/')
    }
}

const cancelEdit = () => {
    router.push('/')
    todoStore.clearErrors()
}

onMounted(async () => {
    const todo = todoStore.todos.find(t => t.id === props.id)
    if (todo) {
        editingTodo.value = { ...todo }
    } else {
        // If todo not found, redirect to list
        router.push('/')
    }
})
</script>
<template>
    <section id="todo-edit">
        <h2>Edit Todo</h2>
        <div v-if="todoStore.error" class="error-message"> {{ todoStore.error }} </div>
        <TodoForm v-if="editingTodo" :loading="todoStore.loading" v-model:todo="editingTodo" v-model:validationErrors="todoStore.validationErrors" form-label="Edit: Todo" submit-label="Update Todo" reset-label="Cancel" @submit="updateTodo" @reset="cancelEdit" />
    </section>
</template>
<style scoped>
.error-message {
    color: red;
    margin-bottom: 15px;
}
</style>
