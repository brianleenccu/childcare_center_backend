const supabase = require("../../core/config/supabase");

const executeSql = async (query, params) => {
  const { data, error } = await supabase.rpc("exec_sql", {
    sql_query: query,
    query_params: params,
  });
  if (error) throw error;
  return data;
};

const createAdminRecord = async (payload) => {
  const { username, email, password, created_at } = payload;

  const sql = `
    INSERT INTO administrator (username, email, password, created_at)
    VALUES ($1::text, $2::text, $3::text, $4::timestamp)
    RETURNING row_to_json(administrator);
  `;

  // 參數陣列剩下 4 個
  const result = await executeSql(sql, [
    username, // $1
    email, // $2
    password, // $3
    created_at, // $4
  ]);

  return result;
};

const getAdminByEmail = async (email) => {
  const sql = `
  SELECT row_to_json(administrator) 
  FROM administrator 
  WHERE email = $1::text;
  `;
  const result = await executeSql(sql, [email]);

  console.log("🔍 [DB 尋找信箱結果]:", result);

  // 1. 如果是 null 或 undefined，直接回傳 null
  if (!result) return null;

  // 2. 如果是空陣列 []，回傳 null
  if (Array.isArray(result) && result.length === 0) return null;

  // 3. 如果是空物件 {}，回傳 null (這就是你現在卡住的地方！)
  if (typeof result === "object" && Object.keys(result).length === 0)
    return null;

  // 4. 走到這代表真的有資料，我們把資料拿出來
  let data = Array.isArray(result) ? result[0] : result;

  // 如果資料被包在 row_to_json 裡面，把它拆開
  if (data && data.row_to_json) {
    data = data.row_to_json;
  }

  return data;
};

module.exports = { createAdminRecord, getAdminByEmail };
