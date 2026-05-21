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
const updateCaption = async (req, res) => {
  try {
    const { center_id, photo_id } = req.params;
    const { caption } = req.body;

    if (!caption) {
      return res.status(400).json({ error: "請提供新的照片說明" });
    }

    const updatedRecord = await service.updateCaption(
      center_id,
      photo_id,
      caption
    );

    // 🛡️ 升級版：判斷各種「空值」狀態
    // 不管回傳是 null, [], {}, 還是 [null]，這行都能精準抓到
    const isEmpty =
      !updatedRecord ||
      (Array.isArray(updatedRecord) && updatedRecord.length === 0) ||
      (Array.isArray(updatedRecord) && updatedRecord[0] == null) ||
      (typeof updatedRecord === "object" &&
        Object.keys(updatedRecord).length === 0);

    if (isEmpty) {
      return res.status(404).json({
        success: false,
        error: `找不到中心 ${center_id} 編號 ${photo_id} 的照片，無法更新`,
      });
    }

    res.json({
      success: true,
      message: "更新成功",
      // 如果回傳是陣列 [ {json...} ]，我們取第一筆資料出來
      data: Array.isArray(updatedRecord) ? updatedRecord[0] : updatedRecord,
    });
  } catch (err) {
    console.error("❌ 更新照片說明失敗:", err);
    res.status(500).json({ error: err.message });
  }
};
// 新增 Delete 功能
const deletePhoto = async (req, res) => {
  try {
    const { center_id, photo_id } = req.params;

    const deletedRecord = await service.deletePhoto(center_id, photo_id);

    // 💡 我們先把資料庫真正回傳的東西印出來看，當作除錯紀錄
    console.log(
      `[Delete 測試] 嘗試刪除 Center:${center_id}, Photo:${photo_id}`
    );
    console.log("[Delete 回傳值]:", deletedRecord);

    // 🛡️ 更嚴格的空值檢查：防禦陣列、物件、null 等各種空狀態
    const isEmpty =
      !deletedRecord ||
      (Array.isArray(deletedRecord) && deletedRecord.length === 0) ||
      (Array.isArray(deletedRecord) && deletedRecord[0] == null) ||
      (typeof deletedRecord === "object" &&
        Object.keys(deletedRecord).length === 0);

    // 如果什麼都沒刪到，就回傳 404 錯誤
    if (isEmpty) {
      return res.status(404).json({
        success: false,
        error: `找不到中心 ${center_id} 編號 ${photo_id} 的照片，無法刪除 (可能已被刪除或不存在)`,
      });
    }

    res.json({
      success: true,
      message: `已成功刪除中心 ${center_id} 的第 ${photo_id} 張照片`,
      data: {
        deleted_center_id: parseInt(center_id),
        deleted_photo_id: parseInt(photo_id),
      },
    });
  } catch (err) {
    console.error("❌ 刪除照片失敗:", err);
    res.status(500).json({ error: err.message });
  }
};

/// 在 photo.controller.js 內新增此函數
const getPhotoCaption = async (req, res) => {
  try {
    // 從 URL 路由參數中取得 center_id 與 photo_id
    const { center_id, photo_id } = req.params;

    const record = await service.getPhotoCaption(center_id, photo_id);

    // 🛡️ 遵照你原本代碼的防禦機制，檢查是否為空值
    if (!record) {
      return res.status(404).json({
        success: false,
        error: `找不到中心 ${center_id} 編號 ${photo_id} 的照片描述`,
      });
    }

    res.json({
      success: true,
      // 直接把物件裡的 caption 字串送給前端，方便前端直接使用
      caption: record.caption,
    });
  } catch (err) {
    console.error("❌ 取得特定照片描述失敗:", err);
    res.status(500).json({ error: err.message });
  }
};

// 記得在 module.exports 補上匯出
module.exports = {
  uploadPhoto,
  getCenterPhotos,
  updateCaption,
  deletePhoto,
  getPhotoCaption, // 新增這行
};
