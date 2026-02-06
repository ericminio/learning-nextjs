import React from "react";
import { User } from "@domain/user";
import { Ship } from "@domain/ship";
import { dockShip } from "@server/http/dockShip";
import { getDockedShip } from "@server/http/getDockedShip";
import { Astroport } from "../_domain/astroport";
 
export const DomainContext = React.createContext<{user:User, astroport: Astroport}>(
  { user: new User(), astroport: new Astroport({ name: "default" }) }
);

export function DomainProvider({ children }: { children: React.ReactNode }) {
  const [user] = React.useState(() => new User());
  const [astroport] = React.useState(() => new Astroport({ name: "Hidden Face Gateway" }));

  user.adapters.docker = async (user: User, ship: Ship): Promise<void> => {
    return await dockShip({ user: user.toJSON(), ship: ship.toJSON() });
  };
  astroport.adapters.getDockedShip = async (gate: number): Promise<Ship | null> => {
    const result = await getDockedShip(gate);
    if (result) {
      return Ship.fromJSON(result);
    }
    return null;
  };

  return (
    <DomainContext.Provider value={{ user, astroport }}>
      {children}
    </DomainContext.Provider>
  );
}