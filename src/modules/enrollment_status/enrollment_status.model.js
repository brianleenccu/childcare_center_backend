const pool = require("../../core/config/db");

const TABLE = "enrollment_status";

exports.getAllEnrollmentStatus = async () => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} ORDER BY enrollment_id ASC`
  );
  return result.rows;
};

exports.getEnrollmentStatusById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE enrollment_id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

exports.getEnrollmentStatusByCenterId = async (centerId) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE}
     WHERE center_id = $1
     ORDER BY enrollment_id ASC`,
    [centerId]
  );
  return result.rows;
};

exports.createEnrollmentStatus = async (record) => {
  const payload = {
    ...record,
    updated_at: new Date().toISOString(),
  };

  const keys = Object.keys(payload);
  const values = Object.values(payload);
  const columns = keys.join(", ");
  const params = keys.map((_, index) => `$${index + 1}`).join(", ");

  const result = await pool.query(
    `INSERT INTO ${TABLE} (${columns}) VALUES (${params}) RETURNING *`,
    values
  );

  return result.rows[0];
};

exports.updateEnrollmentStatus = async (id, updates) => {
  const { center_id, enrollment_id, ...safeUpdates } = updates;
  const payload = {
    ...safeUpdates,
    updated_at: new Date().toISOString(),
  };

  const keys = Object.keys(payload);
  const values = Object.values(payload);

  if (keys.length === 0) {
    throw new Error("No fields provided for update.");
  }

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const result = await pool.query(
    `UPDATE ${TABLE}
     SET ${setClause}
     WHERE enrollment_id = $${keys.length + 1}
     RETURNING *`,
    [...values, id]
  );

  return result.rows[0] || null;
};

exports.deleteEnrollmentStatus = async (id) => {
  const result = await pool.query(
    `DELETE FROM ${TABLE} WHERE enrollment_id = $1 RETURNING *`,
    [id]
  );

  return result.rows[0] || null;
};
