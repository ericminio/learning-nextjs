import { commit, runQuery, getConnection, getDbFile } from "../../../../db/sql";

export const clearDocks = async () => {
  const db = await getConnection(await getDbFile());
  await runQuery(db, `update gates set ship_name = NULL`);
  await commit(db);
};
