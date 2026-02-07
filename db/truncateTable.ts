import { commit, getConnection, getDbFile, runQuery } from "@/app/db/sql";

export const truncateTable = async (tableName: string) => {
  const db = await getConnection(await getDbFile());
  await runQuery(db, `delete from ${tableName}`);
  await commit(db);
};
