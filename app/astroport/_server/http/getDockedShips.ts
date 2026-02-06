"use server";

import { Ship } from "../../_domain/ship";
import { getDocks } from "../sql/queries/getDockedShips";

export async function getDockedShips() {
  const docks = await getDocks();
  return {
    gates: docks.map((dock: { gate_number: number, ship_name: string }) => ({
      gate_number: dock.gate_number,
      ship: dock.ship_name ? new Ship({ name: dock.ship_name }).toJSON() : null,
    })),  
  };
}
