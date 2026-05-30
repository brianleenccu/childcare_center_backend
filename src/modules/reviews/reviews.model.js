const pool = require('../../core/config/db');

const TABLE = 'reviews';

const findById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE review_id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

const create = async (payload) => {
  const keys = Object.keys(payload);
  const values = Object.values(payload);
  const cols = keys.join(', ');
  const params = keys.map((_, i) => `$${i + 1}`).join(', ');

  const result = await pool.query(
    `INSERT INTO ${TABLE} (${cols}) VALUES (${params}) RETURNING *`,
    values
  );
  return result.rows[0];
};

const update = async (id, payload) => {
  const keys = Object.keys(payload);
  const values = Object.values(payload);
  const set = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');

  const result = await pool.query(
    `UPDATE ${TABLE} SET ${set} WHERE review_id = $${keys.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  await pool.query(
    `DELETE FROM ${TABLE} WHERE review_id = $1`,
    [id]
  );
};

const findByParentId = async (parentId) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE parent_id = $1 ORDER BY created_at DESC`,
    [parentId]
  );
  return result.rows;
};

const findByCenterId = async (centerId) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE center_id = $1 ORDER BY created_at DESC`,
    [centerId]
  );
  return result.rows;
};

module.exports = { findById, findByParentId, findByCenterId, create, update, remove };
