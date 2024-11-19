const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const bodyParser = require("body-parser");

const SUPABASE_URL = "https://mrqxfpnvawbiyhpdrbju.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ycXhmcG52YXdiaXlocGRyYmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MDM1NjAsImV4cCI6MjA0NzQ3OTU2MH0.ZzJ0SZkDi7gZoaVQek4h3Nl4YLm16N9cpaq7CSAvRqE"; // Replace with your Supabase API Key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Initialize Express app
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes
app.post("/notification", async (req, res) => {
  const { content } = req.body;
  const { data, error } = await supabase
    .from("notification_content")
    .insert([{ content }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// Read Users (GET /users)
app.get("/notification", async (req, res) => {
  const { data, error } = await supabase
    .from("notification_content")
    .select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// Update User (PUT /users/:id)
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const { data, error } = await supabase
    .from("users")
    .update({ name, email })
    .eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// Delete User (DELETE /users/:id)
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("users").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
