import { Astroport } from "@domain/astroport";
import { commit, runQuery, getConnection, getDbFile } from "../../../../db/sql";

export const createAstroport = async (astroport: Astroport) => {
  const db = await getConnection(await getDbFile());
  for (let i = 0; i < astroport.gate_count; i++) {
    await runQuery(
      db,
      `insert into gates (astroport_name, gate_number) values (?, ?)`,
      [astroport.name, i],
    );
  }
  await commit(db);
};
