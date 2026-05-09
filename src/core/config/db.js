const { Pool, types } = require('pg');

// Return timestamp (OID 1114) as raw string instead of Date object
// so the format stays as "2024-06-01 02:00:00"
types.setTypeParser(1114, (val) => val);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
