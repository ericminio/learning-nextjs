import React from "react";
import { User } from "@domain/user";
import { Ship } from "@domain/ship";
import { dockShip } from "@server/http/dockShip";
import { getDockedShip } from "@server/http/getDockedShip";
import { Astroport } from "../_domain/astroport";
 
const defaultAstropport = new Astroport({ name: "default", gate_count: 0 });
const defaultUser = new User({ astroport: defaultAstropport });

export const DomainContext = React.createContext<{user:User, astroport: Astroport}>(
  { user: defaultUser, astroport: defaultAstropport }
);

export function DomainProvider({ children }: { children: React.ReactNode }) {
  const [astroport] = React.useState(() => new Astroport({ name: "Hidden Face Gateway", gate_count: 3 }));
  
  astroport.adapters.docker = async (user: User, ship: Ship): Promise<void> => {
    return await dockShip({ user: user.toJSON(), ship: ship.toJSON() });
  };
  astroport.adapters.getDockedShip = async (gate: number): Promise<Ship | null> => {
    const result = await getDockedShip(gate);
    if (result) {
      return Ship.fromJSON(result);
    }
    return null;
  };

  const [user] = React.useState(() => new User({ astroport }));
  
  return (
    <DomainContext.Provider value={{ user, astroport }}>
      {children}
    </DomainContext.Provider>
  );
}