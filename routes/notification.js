const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, notification_content_id } = req.body;
  const { data, error } = await supabase
    .from("notification")
    .insert([{ user_id, notification_content_id }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("notification").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("notification")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id, notification_content_id } = req.body;
  const { data, error } = await supabase
    .from("notification")
    .update({ user_id, notification_content_id })
    .eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("notification")
    .delete()
    .eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});
module.exports = router;
