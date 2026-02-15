import { commit, getConnection, runQuery } from "@/app/db/sql";

export const truncateTable = async (tableName: string) => {
  const db = await getConnection();
  await runQuery(db, `delete from ${tableName}`);
  await commit();
};
