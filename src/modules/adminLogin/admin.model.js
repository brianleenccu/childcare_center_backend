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
  const { center_id, username, email, password, is_verified, created_at } =
    payload;

  // 使用參數化查詢，順序必須嚴格對應 $1 ~ $6
  const sql = `
    INSERT INTO administrator (center_id, username, email, password, is_verified, created_at)
    VALUES ($1::int8, $2::text, $3::text, $4::text, $5::boolean, $6::timestamp)
    RETURNING *;
  `;

  // 將資料轉為陣列傳遞給 exec_sql
  const result = await executeSql(sql, [
    center_id, // $1
    username, // $2
    email, // $3
    password, // $4 (已加密)
    is_verified, // $5
    created_at, // $6
  ]);

  // exec_sql + RETURNING * 會回傳一個物件，直接 return
  return result;
};

module.exports = { createAdminRecord };
