import { Ship } from "@domain/ship";
import { User } from "@domain/user";
import { saveDock } from "./sql/commands/saveDock";

export const userFrom = (json : ReturnType<User["toJSON"]>) => {
  const user = User.fromJSON(json);

  user.adapters.docks = async ({ ship, gate }: { ship: Ship, gate: number }) => {
    await saveDock(ship.name, gate);
  };
  return user;
}