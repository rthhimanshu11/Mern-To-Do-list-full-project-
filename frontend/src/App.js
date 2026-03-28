import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("https://mern-to-do-5h3k.onrender.com/api/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text) return;
   await axios.post("https://mern-to-do-5h3k.onrender.com/api/todos", {
  text: text
});
    setText("");
    fetchTodos();
  };

 const toggleComplete = async (id) => {
  await axios.put(`https://mern-to-do-5h3k.onrender.com/api/todos/${id}`);
  fetchTodos();
};
 const deleteTodo = async (id) => {
   await axios.delete(`https://mern-to-do-5h3k.onrender.com/api/todos/${id}`);
   fetchTodos();
};
  // ✅ RETURN MUST BE INSIDE App()
  return (
    <div className="container">
      <h2>MERN To-Do List</h2>

      <form
  onSubmit={(e) => {
    e.preventDefault();   // stops page refresh
    addTodo();
  }}
>
  <input
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Enter task"
  />
  <button type="submit">Add</button>
</form>

      <ul>
        {todos.map(todo => (
          <li
  key={todo._id}
  className={todo.completed ? "completed" : ""}
>
  <span>{todo.text}</span>

  <div className="right">
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={() => toggleComplete(todo._id)}
  />

  {!todo.completed && (
    <button onClick={() => deleteTodo(todo._id)}>❌</button>
  )}
</div>
</li>
        ))}
      </ul>
    </div>
  );
}

// ✅ export AFTER function ends
export default App;
