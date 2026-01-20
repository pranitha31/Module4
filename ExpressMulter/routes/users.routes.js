import { Router } from "express";
import fs from "fs";
import upload from "../middleware/upload.middleware.js";
import uniqueEmailMiddleware from "../middleware/uniqueEmail.middleware.js";
import cloudinary from "../config/cloudinary.config.js";

const router = Router();
const dbPath = "./src/db.json";

const readDB = () => JSON.parse(fs.readFileSync(dbPath));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Signup Route
router.post("/signup", upload, uniqueEmailMiddleware, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Profile image is required" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "profiles" },
      (error, uploaded) => {
        if (error) {
          return res.status(500).json({ error: "Cloudinary upload failed" });
        }

        const db = readDB();
        const newUser = {
          id: Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          profilePic: uploaded.secure_url,
        };

        db.users.push(newUser);
        writeDB(db);

        res.status(201).json({
          message: "User registered successfully",
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            profilePic: newUser.profilePic,
          },
        });
      }
    );

    // Pipe file buffer to Cloudinary
    result.end(req.file.buffer);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
