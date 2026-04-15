import React, { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add or Update Todo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      if (editingId) {
        await updateTodo(editingId, { text });
        setEditingId(null);
      } else {
        await createTodo({ text });
      }
      setText("");
      fetchTodos();
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // Edit Todo
  const handleEdit = (todo) => {
    setText(todo.text);
    setEditingId(todo._id);
  };

  // Delete Todo
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>MERN Todo App</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter a todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Todo List */}
      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo._id} style={styles.listItem}>
            <span>{todo.text}</span>
            <div>
              <button
                onClick={() => handleEdit(todo)}
                style={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Inline Styling
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#333",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "70%",
    fontSize: "16px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f4f4f4",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
  },
  editButton: {
    marginRight: "10px",
    padding: "5px 10px",
    backgroundColor: "#ffc107",
    border: "none",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default App;