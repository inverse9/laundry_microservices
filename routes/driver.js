const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, foto, plat_nomor } = req.body;
  const { data, error } = await supabase
    .from("driver")
    .insert([{ user_id, foto, plat_nomor }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("driver").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("driver")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id, foto, plat_nomor } = req.body;
  const { data, error } = await supabase
    .from("driver")
    .update({ user_id, foto, plat_nomor })
    .eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("driver").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

module.exports = router;
