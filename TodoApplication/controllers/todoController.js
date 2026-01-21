import todos from "../models/todoModel.js";

// Get all todos
export const getTodos = (req, res) => {
  try {
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// Add new todo
export const addTodo = (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }
    const newTodo = { id: todos.length + 1, task, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to add todo" });
  }
};

// Update todo
export const updateTodo = (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const todo = todos.find(t => t.id === parseInt(id));

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.completed = completed;
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

// Delete todo
export const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    const index = todos.findIndex(t => t.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todos.splice(index, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
