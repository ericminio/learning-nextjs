import { Ship } from "../_domain/ship";
import { User } from "../_domain/user";
import { saveDock } from "./sql/commands/saveDock";

export const userFrom = (json : ConstructorParameters<typeof User>[0]) => {
  const user = User.fromJSON(json);

  user.adapters.docker = async (user: User, ship: Ship) => {
    await saveDock(ship.name, 1);
  };
  return user;
}