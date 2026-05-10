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

const CATEGORIES = new Set(['托嬰中心', '幼兒園', '托兒所']);

const findByCategory = async (category) => {
  if (!CATEGORIES.has(category)) {
    throw Object.assign(
      new Error(`Invalid category. Valid values: ${[...CATEGORIES].join(', ')}`),
      { status: 400 }
    );
  }
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE category = $1 ORDER BY center_id`,
    [category]
  );
  return result.rows;
};

const TAIPEI_DISTRICTS = new Set([
  '中正區', '萬華區', '大同區', '中山區',
  '松山區', '大安區', '信義區', '內湖區',
  '南港區', '士林區', '北投區', '文山區',
]);

const findByDistrict = async (district) => {
  if (!TAIPEI_DISTRICTS.has(district)) {
    throw Object.assign(
      new Error(`Invalid district. Valid values: ${[...TAIPEI_DISTRICTS].join(', ')}`),
      { status: 400 }
    );
  }
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE district = $1 ORDER BY center_id`,
    [district]
  );
  return result.rows;
};

const RATIO_MAP = {
  '1:1': 1.0,
  '1:2': 0.5,
  '1:3': 1.0 / 3,
  '1:4': 0.25,
  '1:5': 0.2,
};

const findByTeacherStudentRatio = async (ratio) => {
  const value = RATIO_MAP[ratio];
  if (value === undefined) {
    throw Object.assign(
      new Error(`Invalid ratio. Valid values: ${Object.keys(RATIO_MAP).join(', ')}`),
      { status: 400 }
    );
  }
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE teacher_student_ratio >= $1 - 0.001 ORDER BY center_id`,
    [value]
  );
  return result.rows;
};

const TIME_RE = /^([01]\d|2[0-2]):([0-5]\d)$/;

const validateTime = (time) => {
  if (!TIME_RE.test(time)) {
    throw Object.assign(new Error('Invalid time format. Use HH:MM (e.g. 07:30)'), { status: 400 });
  }
  const [h, m] = time.split(':').map(Number);
  if (h < 6 || (h === 22 && m > 0)) {
    throw Object.assign(new Error('Time must be between 06:00 and 22:00'), { status: 400 });
  }
};

const findByTimeRange = async (openTime, closeTime) => {
  validateTime(openTime);
  validateTime(closeTime);
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE open_time >= $1 AND close_time <= $2 ORDER BY center_id`,
    [`${openTime}:00`, `${closeTime}:00`]
  );
  return result.rows;
};

module.exports = { findAll, findById, create, update, remove, findByCapacityRange, findByOperationType, findByCategory, findByDistrict, findByTimeRange, findByTeacherStudentRatio };
