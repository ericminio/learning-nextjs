import { commit, db, runQuery } from "../sql";

export const saveDock = async (ship, gateNumber) => {
  await runQuery(db, `update gates set ship_name = ? where gate_number = ?`, [
    ship,
    gateNumber,
  ]);
  await commit(db);
};
