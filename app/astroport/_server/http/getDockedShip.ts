"use server";

import { Ship } from "../../_domain/ship";
import { getDocks } from "../sql/queries/getDocks";

export async function getDockedShip(gate: number) {
  const docks = await getDocks();
  const dock = docks.find((dock: { gate_number: number }) => dock.gate_number === gate);
  
  return dock ? new Ship({ name: dock.ship_name }).toJSON() : null;
}
