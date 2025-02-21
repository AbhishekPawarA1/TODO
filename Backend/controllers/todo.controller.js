const Todo = require("../models/todo.model");

// Get all Todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.send({ message: "Todo list", todos });
  } catch (error) {
    return res.status(500).send({ message: "Error fetching todos", error });
  }
};

// Add a new Todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const todo = await Todo.create({ title, description, status, priority });
    return res.send({ message: "Todo added", todo });
  } catch (error) {
    return res.status(500).send({ message: "Error creating todo", error });
  }
};

// Delete a Todo
exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByIdAndDelete(id);
    return res.send({ message: "Todo deleted", todo });
  } catch (error) {
    return res.status(500).send({ message: "Error deleting todo", error });
  }
};

// Update a Todo
exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    return res.send({ message: "Todo updated", todo });
  } catch (error) {
    return res.status(500).send({ message: "Error updating todo", error });
  }
};
