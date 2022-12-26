const { sequelize } = require("./database/models");

async function clearDatabase() {
  await sequelize.query("DROP SCHEMA IF EXISTS public CASCADE");
  await sequelize.query("CREATE SCHEMA public");
}

async function clearRunningQueries() {
  try {
    await sequelize.query(`
    BEGIN;
        SELECT
            pg_cancel_backend(pid),
            pid,
            state,
            age(clock_timestamp(), query_start),
            substring(trim(regexp_replace(query, '\\s+', ' ', 'g')) from 1 for 200)
        FROM pg_stat_activity
        WHERE state != 'idle' AND query NOT ILIKE '%pg_stat_activity%'
        ORDER BY query_start DESC;
    COMMIT;
  `);
  } catch (e) {
    console.error("Error clearing running queries:", e);
  }
}

module.exports = { clearDatabase, clearRunningQueries };
