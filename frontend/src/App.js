import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";

const API = "https://mern-to-do-5h3k.onrender.com/api/todos";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editId) {
      await axios.put(`${API}/${editId}`, { text });
      setEditId(null);
    } else {
      await axios.post(API, { text });
    }

    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setText(todo.text);
    setEditId(todo._id);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">

        {/* Top Right Button */}
        <div className="top-bar">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <h2>MERN Todo App</h2>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter a todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">
            {editId ? "Update" : "Add"}
          </button>
        </form>

        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <span>{todo.text}</span>

              <div>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;