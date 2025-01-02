const express = require("express");
const supabase = require("../config/supabase");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("foto"), async (req, res) => {
  const { user_id, nama, alamat, telp } = req.body;
  const foto = req.file ? `uploads/${req.file.filename}` : undefined;

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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("laundry")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

router.put("/:id", upload.single("foto"), async (req, res) => {
  const { id } = req.params;
  const { user_id, nama, alamat, telp } = req.body;
  const foto = req.file ? `uploads/${req.file.filename}` : undefined;

  const { data, error } = await supabase
    .from("laundry")
    .update({ user_id, nama, alamat, foto, telp })
    .eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("laundry").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});
module.exports = router;
