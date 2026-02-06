"use server";

import { userFrom } from "./userProvider";
import { Ship } from "../_domain/ship";
import { getDocks } from "./queries/getDocks";
import { User } from "../_domain/user";

export async function dockShip(params: { 
  user: ConstructorParameters<typeof User>[0]; 
  ship: ConstructorParameters<typeof Ship>[0] 
}): Promise<void> {
  const user = userFrom(params.user);
  await user.docks(new Ship(params.ship));
}

export async function getDockedShip() {
  const docks = await getDocks();
  const dock = docks.find((dock: { gate_number: number }) => dock.gate_number === 1);
  return { ship: dock?.ship_name ?? "" };
}
