const supabase = require("../../core/config/supabase");
// 1. 改成引入朋友的 db.js 連線池
const pool = require("../../core/config/db");

/**
 * 尚未設定administrator/ parent/viewer權限
 */
const executeSql = async (query, params) => {
  // 2. 改用 pool 執行 SQL
  const result = await pool.query(query, params);

  // 🛡️ 絕對防禦機制：確保回傳的資料格式正確
  // 如果是 SELECT json_agg 的情況，回傳的結構會有點不同
  if (result.rows && result.rows.length > 0) {
    if (result.rows[0].coalesce) return result.rows[0].coalesce; // 針對 getPhotosByCenter 的回傳
    if (result.rows[0].row_to_json) return result.rows[0].row_to_json; // 針對有 RETURNING 的回傳
    return result.rows;
  }
  return null;
};
//    Upload: Administrators can upload photos of a centre's environment and facilities, each with an optional caption, stored and associated with the centre record in the database.

const createPhotoRecord = async (payload) => {
  // 💡 1. 我們不再需要從 payload 拿出 uploaded_at 了
  const { center_id, caption, url } = payload;

  // 💡 2. 把原本的 $2 換成 PostgreSQL 內建的 NOW()
  const sql = `
    INSERT INTO facility_photo (center_id, uploaded_at, caption, url)
    VALUES ($1::int8, NOW(), $2::text, $3::text)
    RETURNING row_to_json(facility_photo);
  `;

  // 💡 3. 陣列裡的參數跟著變少，順序也要對齊！
  const result = await executeSql(sql, [
    center_id, // 對應 $1
    caption, // 對應 $2
    url, // 對應 $3
  ]);

  return result;
};

const getPhotosByCenter = async (center_id) => {
  // 使用 json_agg 將多筆資料打包成陣列。COALESCE 確保如果沒照片時回傳空陣列 []，而不是 null
  const sql = `
    SELECT COALESCE(json_agg(t), '[]'::json) FROM (
      SELECT * FROM facility_photo 
      WHERE center_id = $1::int8 
      ORDER BY uploaded_at DESC
    ) t;
  `;
  const result = await executeSql(sql, [center_id]);
  return result;
};
const updatePhotoCaption = async (center_id, photo_id, caption) => {
  const sql = `
    UPDATE facility_photo 
    SET caption = $1::text 
    WHERE center_id = $2::int8 AND photo_id = $3::int8 
    RETURNING row_to_json(facility_photo);
  `;
  // $1 是新的說明文字, $2 是中心的 ID, $3 是照片的 ID
  return await executeSql(sql, [caption, center_id, photo_id]);
};
const deletePhotoRecord = async (center_id, photo_id) => {
  const sql = `
    DELETE FROM facility_photo 
    WHERE center_id = $1::int8 AND photo_id = $2::int8 
    RETURNING row_to_json(facility_photo);
  `;
  return await executeSql(sql, [center_id, photo_id]);
};
module.exports = {
  createPhotoRecord,
  getPhotosByCenter,
  updatePhotoCaption,
  deletePhotoRecord,
};
