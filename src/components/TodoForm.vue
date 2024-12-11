<template>
  <form @submit.prevent="submitHandler">
    <fieldset>
      <legend>{{ formLabel }}</legend>
      <InputWithError inputId="Title" label="Title" v-model:task="todo.title" v-model:error="validationErrors.title" placeholder="Title (4-10) chars" type="text" />
      <InputWithError inputId="Task" label="Task" v-model:task="todo.task" v-model:error="validationErrors.task" placeholder="Task (10-200 chars)" type="textarea" />
      <InputWithError inputId="Date" label="Date" v-model:task="todo.targetDate" v-model:error="validationErrors.targetDate" type="date" :min="today" />
    </fieldset>
    <fieldset class="grid">
      <button type="submit" :aria-busy="loading" :disabled="loading">{{ submitLabel }}</button>
      <button type="button" class="secondary" @click="resetHandler" :aria-busy="loading" :disabled="loading">{{ resetLabel }}</button>
    </fieldset>
  </form>
</template>
<script setup>
import InputWithError from './InputWithError.vue';
import { computed } from 'vue'

const todo = defineModel('todo')
const validationErrors = defineModel('validationErrors')
const props = defineProps([
  "loading",
  "formLabel",
  "submitLabel",
  "resetLabel",
]);
const emit = defineEmits(['submit', 'reset'])

const today = computed(() => new Date().toISOString().split('T')[0])


const submitHandler = () => {
  emit('submit');
}
const resetHandler = () => {
  emit('reset');
}

</script>
<style scoped></style>
