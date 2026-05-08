const pool = require('../../core/config/db');

const TABLE = 'childcare_center';

const findAll = async () => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} ORDER BY center_id`
  );
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE center_id = $1`,
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
    `UPDATE ${TABLE} SET ${set} WHERE center_id = $${keys.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  await pool.query(
    `DELETE FROM ${TABLE} WHERE center_id = $1`,
    [id]
  );
};

const CAPACITY_RANGES = {
  '1-15':  { min: 1,  max: 15 },
  '16-30': { min: 16, max: 30 },
  '31-45': { min: 31, max: 45 },
  '46-60': { min: 46, max: 60 },
};

const findByCapacityRange = async (range) => {
  const bounds = CAPACITY_RANGES[range];
  if (!bounds) throw Object.assign(new Error(`Invalid range. Valid values: ${Object.keys(CAPACITY_RANGES).join(', ')}`), { status: 400 });

  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE total_capacity BETWEEN $1 AND $2 ORDER BY center_id`,
    [bounds.min, bounds.max]
  );
  return result.rows;
};

const findByOperationType = async (type) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE operation_type = $1 ORDER BY center_id`,
    [type]
  );
  return result.rows;
};

module.exports = { findAll, findById, create, update, remove, findByCapacityRange, findByOperationType };
