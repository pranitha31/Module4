import { Router } from "express";
import fs from "fs";

const router = Router();
const dbPath = "./src/db.json";

const readDB = () => JSON.parse(fs.readFileSync(dbPath));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Create Todo
router.post("/add", (req, res) => {
  const db = readDB();
  const newTodo = { id: Date.now().toString(), ...req.body };
  db.todos.push(newTodo);
  writeDB(db);
  res.status(201).json(newTodo);
});

// Get All Todos
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.todos);
});

// Get Single Todo
router.get("/:todoId", (req, res) => {
  const db = readDB();
  const todo = db.todos.find(t => t.id === req.params.todoId);
  todo ? res.json(todo) : res.status(404).json({ message: "Todo not found" });
});

// Update Todo
router.put("/update/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(t => t.id === req.params.todoId);
  if (index === -1) return res.status(404).json({ message: "Todo not found" });
  db.todos[index] = { ...db.todos[index], ...req.body };
  writeDB(db);
  res.json(db.todos[index]);
});

// Delete Todo
router.delete("/delete/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(t => t.id === req.params.todoId);
  if (index === -1) return res.status(404).json({ message: "Todo not found" });
  const deleted = db.todos.splice(index, 1);
  writeDB(db);
  res.json(deleted[0]);
});

export default router;
