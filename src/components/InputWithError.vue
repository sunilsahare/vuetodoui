<script setup>
const props = defineProps([
    "type",
    "placeholder",
    "label",
    "min",
    "inputId"
]);
const task = defineModel('task')
const error = defineModel('error')


const clearError = (a) => {
    error.value = ''
}

</script>
<template>
    <label v-if="label" :for="inputId">{{ label }}</label>
    <input v-if="type !== 'textarea'" v-model="task" :id="inputId" :type="type" :placeholder="placeholder" :min="min" :aria-invalid="error ? 'true' : 'false'" @input="clearError" />
    <textarea v-if="type === 'textarea'" v-model="task" :id="inputId" :placeholder="placeholder" :aria-invalid="error ? 'true' : 'false'" @input="clearError"></textarea>
    <small v-if="error">{{ error }}</small>
</template>
