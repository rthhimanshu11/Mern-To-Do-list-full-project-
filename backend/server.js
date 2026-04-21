const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect("mongodb+srv://rthhimanshu11_db_user:MernTodo123@cluster0.er1acny.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});