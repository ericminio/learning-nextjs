"use server";

import { getDocks } from "../sql/queries/getDocks";

export async function getDockedShip() {
  const docks = await getDocks();
  const dock = docks.find((dock: { gate_number: number }) => dock.gate_number === 1);
  return { ship: dock?.ship_name ?? "" };
}
