"use server";

import { userFrom } from "../domainProvider";
import { Ship } from "@domain/ship";
import { User } from "@domain/user";
import { Astroport } from "../../_domain/astroport";

export async function dockShip(params: { 
  user: ReturnType<User["toJSON"]>; 
  ship: ReturnType<Ship["toJSON"]>; 
  gate: number;
}): Promise<void> {
  const user = userFrom(params.user);
  const ship = Ship.fromJSON(params.ship);
  await user.flies({ ship });
  await user.docks({ astroport: new Astroport({ name: "ignored", gate_count: 3 }), gate: params.gate });
}
