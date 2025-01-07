const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.post("/", async (req, res) => {
    const { nama, email, password, telp } = req.body;
    const { data, error } = await supabase
        .from("user")
        .insert([{ nama, email, password, telp }]);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

router.get("/", async (req, res) => {
    const { data, error } = await supabase.from("user").select("*");
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", id)
        .single();
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nama, email, password, telp } = req.body;
    const { data, error } = await supabase
        .from("user")
        .update({ nama, email, password, telp })
        .eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("user").delete().eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

module.exports = router;
