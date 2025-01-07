const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.post("/", async (req, res) => {
    const { laundry_id, nama, harga } = req.body;
    const { data, error } = await supabase
        .from("service")
        .insert([{ laundry_id, nama, harga }]);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

router.get("/", async (req, res) => {
    const { data, error } = await supabase.from("service").select("*");
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from("service")
        .select("*")
        .eq("id", id)
        .single();
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { laundry_id, nama, harga } = req.body;
    const { data, error } = await supabase
        .from("service")
        .update({ laundry_id, nama, harga })
        .eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("service").delete().eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

module.exports = router;
