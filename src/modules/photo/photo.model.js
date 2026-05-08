const supabase = require("../../core/config/supabase");

/**
 * 尚未設定administrator/ parent/viewer權限
 */
const executeSql = async (query, params) => {
  const { data, error } = await supabase.rpc("exec_sql", {
    sql_query: query,
    query_params: params,
  });
  if (error) throw error;
  return data;
};
//    Upload: Administrators can upload photos of a centre's environment and facilities, each with an optional caption, stored and associated with the centre record in the database.

const createPhotoRecord = async (payload) => {
  const { center_id, uploaded_at, caption, url } = payload;

  // 依照你要求的順序: $1:center_id, $2:uploaded_at, $3:caption, $4:url
  const sql = `
    INSERT INTO facility_photo (center_id, uploaded_at, caption, url)
    VALUES ($1::int8, $2::timestamp, $3::text, $4::text)
    RETURNING row_to_json(facility_photo);
  `;
  // 參數陣列順序必須嚴格對應 $1 ~ $4
  const result = await executeSql(sql, [
    center_id, // $1
    uploaded_at, // $2
    caption, // $3
    url, // $4
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

module.exports = {
  createPhotoRecord,
  getPhotosByCenter,
};
