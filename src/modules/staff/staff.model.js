const pool = require("../../core/config/db");

const TABLE = "staff";

exports.getAllStaff = async () => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} ORDER BY staff_id ASC`,
  );
  return result.rows;
};

exports.getStaffById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE staff_id = $1`,
    [id],
  );
  return result.rows[0] || null;
};

exports.getStaffByCenterId = async (centerId) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE center_id = $1 ORDER BY staff_id ASC`,
    [centerId],
  );
  return result.rows;
};

exports.createStaff = async (staff) => {
  const keys = Object.keys(staff);
  const values = Object.values(staff);
  const columns = keys.join(", ");
  const params = keys.map((_, index) => `$${index + 1}`).join(", ");

  const result = await pool.query(
    `INSERT INTO ${TABLE} (${columns}) VALUES (${params}) RETURNING *`,
    values,
  );

  return result.rows[0];
};

exports.updateStaff = async (id, updates) => {
  const keys = Object.keys(updates);
  const values = Object.values(updates);

  if (keys.length === 0) {
    throw new Error("No fields provided for update.");
  }

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const result = await pool.query(
    `UPDATE ${TABLE}
     SET ${setClause}
     WHERE staff_id = $${keys.length + 1}
     RETURNING *`,
    [...values, id],
  );

  return result.rows[0] || null;
};

exports.deleteStaff = async (id) => {
  const result = await pool.query(
    `DELETE FROM ${TABLE} WHERE staff_id = $1 RETURNING *`,
    [id],
  );

  return result.rows[0] || null;
};
