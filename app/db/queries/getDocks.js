import { getConnection, runQuery } from "../sql.js";

export const getDocks = async () => {
  const db = await getConnection(`db/node_api_exercise.sqlite`);
  return await runQuery(db, `SELECT gate_number, ship_name FROM gates`);
};
