import { Router } from "express";
import fs from "fs";

const router = Router();
const dbPath = "./src/db.json";

// Helper: read & write db.json
const readDB = () => JSON.parse(fs.readFileSync(dbPath));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Create User
router.post("/add", (req, res) => {
  const db = readDB();
  const newUser = { id: Date.now().toString(), ...req.body };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

// Get All Users
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.users);
});

// Get Single User
router.get("/:userId", (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.params.userId);
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// Update User
router.put("/update/:userId", (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(u => u.id === req.params.userId);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  db.users[index] = { ...db.users[index], ...req.body };
  writeDB(db);
  res.json(db.users[index]);
});

// Delete User
router.delete("/delete/:userId", (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(u => u.id === req.params.userId);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  const deleted = db.users.splice(index, 1);
  writeDB(db);
  res.json(deleted[0]);
});

export default router;
