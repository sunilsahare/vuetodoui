import { defineStore } from 'pinia';
import { TodoModel } from "../services/TodoModel";
import { TodoService } from "../services/TodoService";
export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todos: [],
        loading: false,
        error: null,
        validationErrors: {},
    }),
    getters: {
        hasError: (state) => state.error || Object.keys(state.validationErrors).length
    },

    actions: {
        async fetchTodos(page = 0) {
            this.loading = true;
            try {
                this.todos = await TodoService.getTodos(page)
            } catch (err) {
                this.error = 'Failed to fetch todos';
            } finally {
                this.loading = false;
            }
        },
        async addTodo(newTodo) {
            const errors = TodoModel.validate(newTodo);
            if (Object.keys(errors).length > 0) {
                this.validationErrors = errors;
                return;
            }

            try {
                const result = await TodoService.addTodo(newTodo)
                this.todos.push(result)
                this.clearErrors();
            } catch (err) {
                this.error = err
            } finally {
                this.loading = false
            }


        },
        async updateTodo(updatedTodo) {
            const errors = TodoModel.validate(updatedTodo);
            if (Object.keys(errors).length > 0) {
                this.validationErrors = errors;
                return;
            }

            try {
                const result = await TodoService.updateTodo(updatedTodo)

                // If valid, update the todo
                const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
                if (index !== -1) {
                    this.todos[index] = { ...updatedTodo };
                    this.clearErrors();
                } else {
                    this.error = 'Todo not found';
                }
            } catch (err) {
                this.error = err
            } finally {
                this.loading = false
            }

        },
        async deleteTodo(id) {
            try {
                await TodoService.deleteTodo(id)
                this.todos = this.todos.filter((todo) => todo.id !== id);
            } catch (err) {
                this.error = err
            } finally {
                this.loading = false
            }
        },

        async clearErrors() {
            this.validationErrors = {}; // Clear errors
            this.error = null
        },
    },
});
