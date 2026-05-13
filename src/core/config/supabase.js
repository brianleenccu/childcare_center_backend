require("dotenv").config();
const { createClient } = require("@supabase/supabase-js"); //操作 Supabase Storage 上傳/讀取圖片用

const supabase = createClient(
  process.env.SUPABASE_URL,
  // "https://rfzavcliggzlpkqqcrzr.supabase.co",
  process.env.SUPABASE_ANON_KEY
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmemF2Y2xpZ2d6bHBrcXFjcnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNzY1NjUsImV4cCI6MjA5MjY1MjU2NX0.PAPu8svIFjvDXUfY91yXGIRmktBCKExsOnqxlYW0z_I"
);

module.exports = supabase;
