require("dotenv").config();
const { createClient } = require("@supabase/supabase-js"); //操作 Supabase Storage 上傳/讀取圖片用

const supabase = createClient(
  process.env.SUPABASE_URL,

  process.env.SUPABASE_ANON_KEY
);

module.exports = supabase;
