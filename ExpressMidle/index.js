import express from "express";
import todosRouter from "./routes/todos.routes.js";
import loggerMiddleware from "./middleware/logger.middleware.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(loggerMiddleware); // App-level logging middleware

// Routes
app.use("/todos", todosRouter);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
