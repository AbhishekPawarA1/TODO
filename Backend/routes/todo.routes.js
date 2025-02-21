const express = require("express");
const {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/delete/:id", deleteTodo);
router.patch("/update/:id", updateTodo);

module.exports = router;
