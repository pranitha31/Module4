import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

// Utility: read db.json
const readData = () => {
  const data = fs.readFileSync("db.json", "utf-8");
  return JSON.parse(data);
};

// Utility: write db.json
const writeData = (data) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
};

// GET /students → fetch all
app.get("/students", (req, res) => {
  const students = readData();
  res.json(students);
});

// POST /students → add new
app.post("/students", (req, res) => {
  const students = readData();
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  writeData(students);
  res.status(201).json({ message: "Student added successfully", student: newStudent });
});

// PUT /students → update by id
app.put("/students", (req, res) => {
  const { id, ...updates } = req.body;
  let students = readData();
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students[index] = { ...students[index], ...updates };
  writeData(students);
  res.json({ message: "Student updated successfully", student: students[index] });
});

// DELETE /students/:id → delete by id
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let students = readData();
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const deleted = students.splice(index, 1);
  writeData(students);
  res.json({ message: "Student deleted successfully", student: deleted[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
