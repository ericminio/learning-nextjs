"use server";

import { Astroport } from "../../_domain/astroport";
import { getAstroport as getAstroportFromDb } from "../sql/queries/getAstroport";

export async function getAstroport() {
  const row = await getAstroportFromDb();
  if (!row) {
    return null;
  }
  return new Astroport({
    name: row.astroport_name,
    gate_count: row.gate_count,
  }).toJSON();
}
