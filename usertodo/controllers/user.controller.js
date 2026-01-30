import { supabase } from "../db.js";

export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const { data: existing } = await supabase
    .from("users")
    .select()
    .eq("email", email)
    .single();

  if (existing)
    return res.status(409).json({ message: "Email already exists" });

  const { data, error } = await supabase.from("users").insert([
    { name, email, password }
  ]);

  if (error) return res.status(500).json(error);

  res.json({ message: "User created" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) return res.status(400).json(error);

  res.json({ message: "User + Todos deleted" });
};