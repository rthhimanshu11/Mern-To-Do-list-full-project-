import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/todos"
});

export const getTodos = () => API.get("/");

export const createTodo = (todo) =>
  API.post("/", {
    text: todo.text,
    completed: false,
  });


export const updateTodo = (id, updatedTodo) =>
  API.put(`/${id}`, updatedTodo);

export const deleteTodo = (id) =>
  API.delete(`/${id}`);