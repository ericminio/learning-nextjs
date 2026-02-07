import { getConnection, getDbFile, runQuery } from "../../../../db/sql.js";

export const getAstroport = async () => {
  const db = await getConnection(await getDbFile());
  const rows = await runQuery(
    db,
    `SELECT astroport_name, COUNT(*) as gate_count FROM gates GROUP BY astroport_name LIMIT 1`,
  );
  return rows[0] || null;
};
