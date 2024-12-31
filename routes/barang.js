const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.post("/", async (req, res) => {
  const { laundry_id, user_id, berat, harga } = req.body;
  const { data, error } = await supabase
    .from("barang")
    .insert([{ laundry_id, user_id, berat, harga }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("barang").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

module.exports = router;
