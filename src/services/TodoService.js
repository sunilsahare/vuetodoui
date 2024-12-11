import axios from "axios";
import { TodoModel } from "./TodoModel";
import { useUserStore } from "@/stores/userStore";

const API_BASE_URL = "http://localhost:8090/todos";

export const TodoService = {

   pagination: {
      page: 0,
      size: 3,
      totalPages: 0,
      sortBy: "id",
      sortDirection: "asc",
  },

  async getTodos(page = 0) {
    try {
      this.pagination.page = page
      const pageNumber = this.pagination.page;
      const userStore = useUserStore();
      const url = `${API_BASE_URL}/filter/users/${userStore.username}?page=${pageNumber}&size=${this.pagination.size}&sortBy=${this.pagination.sortBy}&sortDirection=${this.pagination.sortDirection}`;

      const response = await axios.get(API_BASE_URL);
      this.pagination.totalPages = response.data.totalPages;
      console.log('Get Response - ',response.data.content);
      // return response.data.content;
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch todos");
    }
  },

  async addTodo(todo) {
    const validationErrors = TodoModel.validate(todo);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }
    const userStore = useUserStore();
    todo.user = userStore.username

    try {
      const response = await axios.post(API_BASE_URL, todo);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add todo");
    }
  },

  async updateTodo(todo) {
    const validationErrors = TodoModel.validate(todo);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }
    const userStore = useUserStore();
    todo.user = userStore.username
    try {
      const response = await axios.put(`${API_BASE_URL}/${todo.id}`, todo);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update todo");
    }
  },

  async deleteTodo(id) {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      throw new Error("Failed to delete todo");
    }
  },
}