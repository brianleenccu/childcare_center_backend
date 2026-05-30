const pool = require("../../core/config/db");

const TABLE = "evaluation_record";

const normalizeGovernmentEvaluationPayload = (payload) => {
  const normalized = { ...payload };

  if (
    Object.prototype.hasOwnProperty.call(normalized, "evaluation_result") &&
    !Object.prototype.hasOwnProperty.call(normalized, "evalution_result")
  ) {
    normalized.evalution_result = normalized.evaluation_result;
    delete normalized.evaluation_result;
  }

  return normalized;
};

exports.getAllGovernmentEvaluations = async () => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} ORDER BY evaluation_id ASC`,
  );
  return result.rows;
};

exports.getGovernmentEvaluationById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE} WHERE evaluation_id = $1`,
    [id],
  );
  return result.rows[0] || null;
};

exports.getGovernmentEvaluationsByCenterId = async (centerId) => {
  const result = await pool.query(
    `SELECT * FROM ${TABLE}
     WHERE center_id = $1
     ORDER BY completion_date DESC`,
    [centerId],
  );
  return result.rows;
};

exports.createGovernmentEvaluation = async (record) => {
  const payload = normalizeGovernmentEvaluationPayload(record);

  const keys = Object.keys(payload);
  const values = Object.values(payload);
  const columns = keys.join(", ");
  const params = keys.map((_, index) => `$${index + 1}`).join(", ");

  const result = await pool.query(
    `INSERT INTO ${TABLE} (${columns}) VALUES (${params}) RETURNING *`,
    values,
  );

  return result.rows[0];
};

exports.updateGovernmentEvaluation = async (id, updates) => {
  const payload = normalizeGovernmentEvaluationPayload(updates);

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
     WHERE evaluation_id = $${keys.length + 1}
     RETURNING *`,
    [...values, id],
  );

  return result.rows[0] || null;
};

exports.deleteGovernmentEvaluation = async (id) => {
  const result = await pool.query(
    `DELETE FROM ${TABLE} WHERE evaluation_id = $1 RETURNING *`,
    [id],
  );

  return result.rows[0] || null;
};
