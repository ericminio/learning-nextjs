"use server";

import { userFrom } from "../userProvider";
import { Ship } from "../../_domain/ship";
import { User } from "../../_domain/user";

export async function dockShip(params: { 
  user: ConstructorParameters<typeof User>[0]; 
  ship: ConstructorParameters<typeof Ship>[0] 
}): Promise<void> {
  const user = userFrom(params.user);
  await user.docks(new Ship(params.ship));
}
