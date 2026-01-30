const supabase = require('../services/userService');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;

    // Check duplicate email
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword, age, role }])
      .select();

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error || !data) return res.status(404).json({ error: "User not found" });
  res.json(data);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const { data, error } = await supabase.from('users').update(updates).eq('id', id).select();
  if (error || !data.length) return res.status(404).json({ error: "User not found" });
  res.json(data[0]);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('users').delete().eq('id', id).select();
  if (error || !data.length) return res.status(404).json({ error: "User not found" });
  res.json({ message: "User deleted successfully" });
};
