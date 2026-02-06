import { commit, runQuery, getConnection } from "../sql";

export const saveDock = async (ship, gateNumber) => {
  const db = await getConnection(`db/node_api_exercise.sqlite`);
  await runQuery(db, `update gates set ship_name = ? where gate_number = ?`, [
    ship,
    gateNumber,
  ]);
  await commit(db);
};
