import fs from "fs";

const dbPath = "./src/db.json";

const readDB = () => JSON.parse(fs.readFileSync(dbPath));

export default function uniqueEmailMiddleware(req, res, next) {
  const db = readDB();
  const exists = db.users.find(u => u.email === req.body.email);

  if (exists) {
    return res.status(409).json({ error: "Email already exists" });
  }
  next();
}
