import pg from "pg";

const { Pool } = pg;

function getDbName() {
  if (process.env.NODE_ENV === "test") {
    return "learning_nextjs_test";
  } else {
    return "learning_nextjs";
  }
}

let pool = null;

export async function getConnection() {
  if (!pool) {
    pool = new Pool({
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "postgres",
      database: getDbName(),
    });
  }
  return pool;
}

export async function getDbFile() {
  return getDbName();
}

export async function runQuery(db, sqlStatement, params) {
  // Convert ? placeholders to $1, $2, etc. for PostgreSQL
  let paramIndex = 0;
  const pgStatement = sqlStatement.replace(/\?/g, () => `$${++paramIndex}`);

  const result = await db.query(pgStatement, params);
  return result.rows;
}

export async function commit() {
  // PostgreSQL auto-commits by default, no action needed
}

export async function closeConnection() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
