import { commit, runQuery, getConnection, getDbFile } from "../../../../db/sql";

export const saveDock = async (ship: string, gateNumber: number) => {
  const db = await getConnection(await getDbFile());
  await runQuery(db, `update gates set ship_name = ? where gate_number = ?`, [
    ship,
    gateNumber,
  ]);
  await commit(db);
};
