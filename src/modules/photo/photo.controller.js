const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");
const service = require("./photo.service");

dotenv.config(); //這行會自動去讀取 .env 檔案，並把內容塞進 process.env
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const uploadPhoto = async (req, res) => {
  try {
    const file = req.file;
    const { center_id, caption, uploaded_at } = req.body;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // 1. 上傳至 Supabase Bucket
    const fileName = `${Date.now()}-${file.originalname}`;
    const { error: uploadError } = await supabase.storage
      .from("facillity_photo")
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (uploadError) throw uploadError;

    // 2. 取得公開 URL
    const { data } = supabase.storage
      .from("facillity_photo")
      .getPublicUrl(fileName);
    const imageUrl = data.publicUrl;

    // 3. 呼叫服務層寫入資料庫
    const payload = {
      center_id: parseInt(center_id),
      uploaded_at: uploaded_at,
      caption: caption,
      url: imageUrl,
    };

    const record = await service.addPhotoRecord(payload);
    console.log("資料庫回傳的 record:", record);
    res.json({
      success: true,
      imageUrl: imageUrl,
      data: record, // 新增這行：將完整的資料庫紀錄回傳給前端
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCenterPhotos = async (req, res) => {
  try {
    // 從網址路徑中取得 center_id (對應 routes 裡的 :center_id)
    const { center_id } = req.params;

    // 呼叫 Service
    const records = await service.getCenterPhotos(center_id);

    // 回傳成功狀態與資料
    res.json({
      success: true,
      data: records,
    });
  } catch (err) {
    console.error("取得照片失敗:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadPhoto,
  getCenterPhotos,
};
