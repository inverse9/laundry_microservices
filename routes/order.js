const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.post("/", async (req, res) => {
    const { user_id, laundry_id, driver_id, barang_id, service_id, total } = req.body;
    const { data, error } = await supabase
        .from("order")
        .insert([{ user_id, laundry_id, driver_id, barang_id, service_id, total }]);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

router.get("/", async (req, res) => {
    const { data, error } = await supabase.from("order").select("*");
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from("order")
        .select("*")
        .eq("id", id)
        .single();
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { user_id, laundry_id, driver_id, barang_id, service_id, total } = req.body;
    const { data, error } = await supabase
        .from("order")
        .update({ user_id, laundry_id, driver_id, barang_id, service_id, total })
        .eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("order").delete().eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

module.exports = router;
