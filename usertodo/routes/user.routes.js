import express from "express";
import { signupUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.delete("/:id", deleteUser);

export default router;