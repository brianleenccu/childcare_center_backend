/*import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const upload = multer();

app.use(express.static("public"));

const supabase = createClient(
  process.env.SUPABASE_URL,

  //   "https://rfzavcliggzlpkqqcrzr.supabase.co",
  process.env.SUPABASE_ANON_KEY
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmemF2Y2xpZ2d6bHBrcXFjcnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNzY1NjUsImV4cCI6MjA5MjY1MjU2NX0.PAPu8svIFjvDXUfY91yXGIRmktBCKExsOnqxlYW0z_I"
);

app.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const fileName = Date.now() + "-" + file.originalname;

    const { error } = await supabase.storage
      .from("facillity_photo")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      return res.status(500).json(error);
    }

    const { data } = supabase.storage
      .from("facility_photo")
      .getPublicUrl(fileName);

    res.json({
      success: true,
      imageUrl: data.publicUrl,
    });
    console.log("圖片上傳成功，URL:", data.publicUrl);
    // 建構url到table中
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});*/
