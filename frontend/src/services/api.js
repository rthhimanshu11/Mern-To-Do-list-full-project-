import axios from "axios";

// Backend API Base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api/todos",
});

// Get all todos
export const getTodos = () => API.get("/");

// Create a new todo
export const createTodo = (todo) => API.post("/", todo);

// Update a todo
export const updateTodo = (id, updatedTodo) =>
  API.put(`/${id}`, updatedTodo);

// Delete a todo
export const deleteTodo = (id) => API.delete(`/${id}`);