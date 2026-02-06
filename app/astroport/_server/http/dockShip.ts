"use server";

import { userFrom } from "../domainProvider";
import { Ship } from "@domain/ship";
import { User } from "@domain/user";

export async function dockShip(params: { 
  user: ReturnType<User["toJSON"]>; 
  ship: ReturnType<Ship["toJSON"]>; 
}): Promise<void> {
  const user = userFrom(params.user);
  await user.docks(new Ship(params.ship));
}
