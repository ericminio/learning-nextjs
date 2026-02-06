import { commit, runQuery, getConnection, getDbFile } from "../sql";

export const saveDock = async (ship, gateNumber) => {
  const db = await getConnection(await getDbFile());
  await runQuery(db, `update gates set ship_name = ? where gate_number = ?`, [
    ship,
    gateNumber,
  ]);
  await commit(db);
};
