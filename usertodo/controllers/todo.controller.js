import { supabase } from "../db.js";

export const addTodo = async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title || !userId)
    return res.status(400).json({ message: "Missing fields" });

  const { error } = await supabase.from("todos").insert([
    { title, description, user_id: userId }
  ]);

  if (error) return res.status(400).json(error);

  res.json({ message: "Todo added" });
};

export const getTodos = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);

  if (error) return res.status(400).json(error);

  res.json(data);
};

export const updateTodo = async (req, res) => {
  const { todoId } = req.params;

  const { title, description, is_completed } = req.body;

  const { error } = await supabase
    .from("todos")
    .update({ title, description, is_completed })
    .eq("id", todoId);

  if (error) return res.status(400).json(error);

  res.json({ message: "Todo updated" });
};

export const toggleTodoStatus = async (req, res) => {
  const { todoId } = req.params;

  // 1. Fetch current status
  const { data: todo, error: fetchError } = await supabase
    .from("todos")
    .select("is_completed")
    .eq("id", todoId)
    .single();

  if (fetchError || !todo)
    return res.status(404).json({ message: "Todo not found" });

  // 2. Toggle
  const { error } = await supabase
    .from("todos")
    .update({ is_completed: !todo.is_completed })
    .eq("id", todoId);

  if (error) return res.status(400).json(error);

  res.json({ message: "Status toggled" });
};
export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  const { error } = await supabase.from("todos").delete().eq("id", todoId);

  if (error) return res.status(400).json(error);

  res.json({ message: "Todo deleted" });
};