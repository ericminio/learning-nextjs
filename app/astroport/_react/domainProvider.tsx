import React, { useEffect } from "react";
import { Astroport } from "@domain/astroport";
import { User } from "@domain/user";
import { Ship } from "@domain/ship";
import { dockShip } from "@server/http/dockShip";
import { getDockedShips } from "@server/http/getDockedShips";
import { getAstroport } from "@server/http/getAstroport";

const createUser = () => new User({ name: "Bob" });

export const DomainContext = React.createContext<{
  user: User;
  astroport: Astroport | null;
  astroportUpdated: number;
}>({ user: createUser(), astroport: null, astroportUpdated: 0 });

export function DomainProvider({ children }: { children: React.ReactNode }) {
  const [astroport, setAstroport] = React.useState<Astroport | null>(null);
  const [user] = React.useState(() => createUser());
  const [astroportUpdated, setAstroportUpdated] = React.useState(0);

  user.adapters.docks = async ({
    user,
    ship,
    gate,
  }: {
    user: User;
    ship: Ship;
    gate: number;
  }): Promise<void> => {
    await dockShip({
      user: user.toJSON(),
      ship: ship.toJSON(),
      gate,
    });
    setAstroportUpdated(Date.now());
  };

  useEffect(() => {
    const loadAstroport = async () => {
      const json = await getAstroport();
      const loadedAstroport = Astroport.fromJSON(json);
      const { gates } = await getDockedShips();
      gates
        .filter(
          ({
            ship,
          }: {
            gate_number: number;
            ship: ReturnType<Ship["toJSON"]>;
          }) => ship !== null,
        )
        .forEach(
          ({
            gate_number,
            ship,
          }: {
            gate_number: number;
            ship: ReturnType<Ship["toJSON"]>;
          }) => {
            loadedAstroport.docks({
              ship: Ship.fromJSON(ship),
              gate: gate_number,
            });
          },
        );
      setAstroport(loadedAstroport);
      setAstroportUpdated(Date.now());
    };
    void loadAstroport();
  }, []);

  return (
    <DomainContext.Provider value={{ user, astroport, astroportUpdated }}>
      {children}
    </DomainContext.Provider>
  );
}
