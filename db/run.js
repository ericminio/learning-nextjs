const [, , dbname, sqlfilename] = process.argv;

if (!sqlfilename.endsWith(".sql")) {
  const command = `Error:
    Expecting command: node db/run.js <dbname> <seeds.sql>
    `;
  console.log(command);
  process.exit(1);
}

import fs from "fs";
const schema = fs.readFileSync(sqlfilename).toString();

import pg from "pg";

const { Pool } = pg;

const runSqlFile = async (dbname, schema) => {
  const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: dbname,
  });

  try {
    await pool.query(schema);
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

runSqlFile(dbname, schema).then(() => {
  console.log(`database ${dbname} ready`);
});
