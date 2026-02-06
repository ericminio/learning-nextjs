import { Ship } from "@domain/ship";
import { User } from "@domain/user";
import { saveDock } from "./sql/commands/saveDock";

export const userFrom = (json : ReturnType<User["toJSON"]>) => {
  const user = User.fromJSON(json);

  user.astroport.adapters.docker = async (user: User, ship: Ship) => {
    await saveDock(ship.name, 1);
  };
  return user;
}