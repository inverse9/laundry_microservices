const { createClient } = require("@supabase/supabase-js");
const SUPABASE_URL = "https://mrqxfpnvawbiyhpdrbju.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ycXhmcG52YXdiaXlocGRyYmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MDM1NjAsImV4cCI6MjA0NzQ3OTU2MH0.ZzJ0SZkDi7gZoaVQek4h3Nl4YLm16N9cpaq7CSAvRqE"; // Replace with your Supabase API Key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
