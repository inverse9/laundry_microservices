const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, nama, alamat, foto, telp } = req.body;
  const { data, error } = await supabase
    .from("laundry")
    .insert([{ user_id, nama, alamat, foto, telp }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("laundry").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

module.exports = router;
