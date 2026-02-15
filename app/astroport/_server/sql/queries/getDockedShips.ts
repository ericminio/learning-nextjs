import { getConnection, runQuery } from "../../../../db/sql.js";

export const getDocks = async () => {
  const db = await getConnection();
  return await runQuery(db, `SELECT gate_number, ship_name FROM gates`);
};
