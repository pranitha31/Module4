import express from "express";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
