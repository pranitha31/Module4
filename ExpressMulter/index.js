import express from "express";
import usersRouter from "./routes/users.routes.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/users", usersRouter);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
