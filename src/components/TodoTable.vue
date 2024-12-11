<template>
    <table v-if="todos && todos.length">
        <thead>
            <tr>
                <th style="cursor: pointer;" @click="sort('title')">Title</th>
                <th style="cursor: pointer;" @click="sort('task')">Task</th>
                <th>Date</th>
                <th>Done?</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="todo in todos" :key="todo.id">
                <td>{{ todo.title }}({{ todo.user }}) </td>
                <td>{{ todo.task }}</td>
                <td>{{ todo.targetDate }}</td>
                <td><input type="checkbox" v-model="todo.done" /></td>
                <td><button :aria-busy="loading" :disabled="loading" @click="() => editHandler(todo.id)">Edit</button></td>
                <td><button :aria-busy="loading" :disabled="loading" @click="() => deleteHandler(todo.id)">Delete</button></td>
            </tr>
        </tbody>
    </table>

    <div class="pagination">
      <button :disabled="TodoService.pagination.page === 0" @click="previousPage()">Previous</button>
      <span> Page {{TodoService.pagination.page + 1 }} of {{TodoService.pagination.totalPages}}</span>
      <button class="page-link" :disabled="TodoService.pagination.page === TodoService.pagination.totalPages-1" @click="nextPage()">Next</button>
    </div>

</template>
<script setup>
import {TodoService} from "@/services/TodoService.js";
import {ref} from "vue";
import {useTodoStore} from "@/stores/todoStore.js";

const todoStore = useTodoStore();

const props = defineProps([
    "todos",
    "loading"
]);

const emit = defineEmits(['editClick', 'removeClick'])

const editHandler = (id) => {
    emit('editClick', id);
}
const deleteHandler = (id) => {
    emit('removeClick', id);
}

const nextPage = () => {
  if (currentPage.value < TodoService.pagination.totalPages - 1) {
    fetchTodos(currentPage.value+1);
  }
};

const previousPage = () => {
  if (currentPage.value > 0) {
    fetchTodos(currentPage.value-1);
  }
};

const sort  = (columnName) => {
    TodoService.pagination.sortBy = columnName;
    TodoService.pagination.sortDirection = TodoService.pagination.sortDirection === 'asc' ? "asc" : "desc";
    fetchTodos(currentPage.value);
}

const fetchTodos = async (page) => {
  currentPage.value = page;
  await todoStore.fetchTodos(currentPage.value);
};

let currentPage = ref(0);

</script>
<style scoped>
  .pagination {
    background: blanchedalmond;
    text-align: right;
    margin-top: 20px;
  }

  button {
    margin: 0 5px;
    padding: 5px 10px;
  }


</style>