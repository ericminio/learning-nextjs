import React from "react";
import { dockShip } from "../server/actions";
import { User } from "../_domain/user";
import { Ship } from "../_domain/ship";
 
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