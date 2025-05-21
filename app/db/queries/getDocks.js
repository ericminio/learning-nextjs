import { db, runQuery } from "../sql.js";

export const getDocks = async () => {
  return await runQuery(db, `SELECT gate_number, ship_name FROM gates`);
};
