import { getConnection, getDbFile, runQuery } from "../sql.js";

export const getDocks = async () => {
  const db = await getConnection(await getDbFile());
  return await runQuery(db, `SELECT gate_number, ship_name FROM gates`);
};
