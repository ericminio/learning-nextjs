import React, { useEffect } from "react";
import { Astroport } from "@domain/astroport";
import { User } from "@domain/user";
import { Ship } from "@domain/ship";
import { dockShip } from "@server/http/dockShip";
import { getDockedShips } from "@server/http/getDockedShips";

const createAstroport = () =>
  new Astroport({
    name: "Hidden Face Gateway",
    gate_count: 3,
  });
const createUser = () => new User({ name: "Bob" });

export const DomainContext = React.createContext<{
  user: User;
  astroport: Astroport;
  astroportUpdated: number;
}>({ user: createUser(), astroport: createAstroport(), astroportUpdated: 0 });

export function DomainProvider({ children }: { children: React.ReactNode }) {
  const [astroport] = React.useState(() => createAstroport());
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
    const loadDockedShips = async () => {
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
            astroport.docks({
              ship: Ship.fromJSON(ship),
              gate: gate_number,
            });
          },
        );
      setAstroportUpdated(Date.now());
    };
    void loadDockedShips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DomainContext.Provider value={{ user, astroport, astroportUpdated }}>
      {children}
    </DomainContext.Provider>
  );
}
