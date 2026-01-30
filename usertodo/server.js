import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(3000, () => console.log("Server running"));