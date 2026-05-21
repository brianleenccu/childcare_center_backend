const pool = require('../../core/config/db');

const TABLE = 'favorite_item';

const findById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE fav_item_id = $1`,
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

const remove = async (id) => {
  await pool.query(
    `DELETE FROM ${TABLE} WHERE fav_item_id = $1`,
    [id]
  );
};

module.exports = { findById, create, remove };
