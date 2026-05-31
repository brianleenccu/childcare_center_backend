const pool = require('../../core/config/db');

const TABLE = 'waitlist';

// 查詢某家長在某機構是否已在候補名單
const findByParentAndCenter = async (parentId, centerId) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE parent_id = $1 AND center_id = $2`,
    [parentId, centerId]
  );
  return result.rows[0] || null;
};

// 查詢某機構的所有候補名單
const findByCenterId = async (centerId) => {
  const result = await pool.query(
    `SELECT w.*, p.name AS parent_name, p.phone AS parent_phone
     FROM ${TABLE} w
     JOIN parent p ON p.parent_id = w.parent_id
     WHERE w.center_id = $1
     ORDER BY w.joined_at ASC`,
    [centerId]
  );
  return result.rows;
};

// 查詢某家長的所有候補記錄
const findByParentId = async (parentId) => {
  const result = await pool.query(
    `SELECT w.*, c.name AS center_name, c.district, c.category
     FROM ${TABLE} w
     JOIN childcare_center c ON c.center_id = w.center_id
     WHERE w.parent_id = $1
     ORDER BY w.joined_at DESC`,
    [parentId]
  );
  return result.rows;
};

// 新增候補記錄
const create = async (parentId, centerId) => {
  const result = await pool.query(
    `INSERT INTO ${TABLE} (parent_id, center_id, joined_at)
     VALUES ($1, $2, NOW())
     RETURNING *`,
    [parentId, centerId]
  );
  return result.rows[0];
};

// 刪除候補記錄（by waitlist_id，需確認是該家長的）
const remove = async (waitlistId, parentId) => {
  const result = await pool.query(
    `DELETE FROM ${TABLE}
     WHERE waitlist_id = $1 AND parent_id = $2
     RETURNING *`,
    [waitlistId, parentId]
  );
  return result.rows[0] || null;
};

// 同步更新 enrollment_status 的 waitlist_count
const syncWaitlistCount = async (centerId) => {
  await pool.query(
    `UPDATE enrollment_status
     SET waitlist_count = (
       SELECT COUNT(*) FROM ${TABLE} WHERE center_id = $1
     )
     WHERE center_id = $1`,
    [centerId]
  );
};

module.exports = {
  findByParentAndCenter,
  findByCenterId,
  findByParentId,
  create,
  remove,
  syncWaitlistCount,
};