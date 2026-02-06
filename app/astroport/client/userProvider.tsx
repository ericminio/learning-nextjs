import React from "react";
import { User } from "../_domain/user";
import { Ship } from "../_domain/ship";
import { dockShip } from "../server/http/dockShip";
 
export const UserContext = React.createContext<User>(new User());

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user] = React.useState(() => new User());

  user.adapters.docker = async (user: User, ship: Ship): Promise<void> => {
  return await dockShip({ user: user.toJSON(), ship: ship.toJSON() });
};

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}