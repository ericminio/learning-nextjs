import { Ship } from "@domain/ship";
import { User } from "@domain/user";
import { saveDock } from "./sql/commands/saveDock";

export const userFrom = (json : ConstructorParameters<typeof User>[0]) => {
  const user = User.fromJSON(json);

  user.adapters.docker = async (user: User, ship: Ship) => {
    await saveDock(ship.name, 1);
  };
  return user;
}