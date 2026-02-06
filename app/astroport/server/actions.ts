"use server";

import { saveDock } from "./commands/saveDock.js";
import { getDocks } from "./queries/getDocks.js";

export async function dockShip(ship: string) {
  await saveDock(ship, 1);
  return { success: true };
}

export async function getDockedShip() {
  const docks = await getDocks();
  const dock = docks.find((dock: { gate_number: number }) => dock.gate_number === 1);
  return { ship: dock?.ship_name ?? "" };
}
