//const supabase = require("../../core/config/supabase");

const pool = require("../../core/config/db");
/*const executeSql = async (query, params) => {
  const { data, error } = await supabase.rpc("exec_sql", {
    sql_query: query,
    query_params: params,
  });
  if (error) throw error;
  return data;
};
*/
// 2. 替換掉原本那個呼叫 supabase 的 executeSql
const executeSql = async (query, params) => {
  // 使用 pg pool 直接執行 SQL
  const result = await pool.query(query, params);
  // pg 回傳的資料都放在 rows 裡面，所以我們回傳 rows
  return result.rows;
};

const createParentRecord = async (payload) => {
  const { name, email, password, phone, created_at } = payload;

  // 💡 parent_id 由資料庫自動生成，所以 INSERT 語法中不需要寫 parent_id
  const sql = `
    INSERT INTO parent (name, email, password, phone, created_at)
    VALUES ($1::text, $2::text, $3::text, $4::text, $5::timestamp)
    RETURNING row_to_json(parent);
  `;

  const result = await executeSql(sql, [
    name,
    email,
    password,
    phone,
    created_at,
  ]);

  return Array.isArray(result) ? result[0] : result;
};

// 尋找家長 (用於登入驗證)
const getParentByEmail = async (email) => {
  const sql = `
    SELECT row_to_json(parent) 
    FROM parent 
    WHERE email = $1::text;
  `;
  const result = await executeSql(sql, [email]);

  console.log("🔍 [DB 尋找家長信箱結果]:", result);

  // 🛡️ 絕對防禦機制：對付各種 Supabase 的空值與空物件
  const isEmpty =
    !result ||
    (Array.isArray(result) && result.length === 0) ||
    (Array.isArray(result) && result[0] == null) ||
    (typeof result === "object" && Object.keys(result).length === 0);

  if (isEmpty) return null;

  let data = Array.isArray(result) ? result[0] : result;

  if (data && data.row_to_json) {
    data = data.row_to_json;
  }

  return data;
};

module.exports = { createParentRecord, getParentByEmail };
