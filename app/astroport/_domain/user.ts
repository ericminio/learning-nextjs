import { Astroport } from "./astroport";
import { Ship } from "./ship";
import { uuid } from "./uuid";

export class User {
  user_id: string;
  name: string;
  ship?: Ship;

  adapters: {
    docks: ({
      user,
      ship,
      gate,
    }: {
      user: User;
      ship: Ship;
      gate: number;
    }) => Promise<void>;
  };

  constructor({ name, user_id }: { name: string; user_id?: string }) {
    this.name = name;
    this.user_id = user_id ?? uuid();
    this.adapters = {
      docks: async () => {},
    };
  }

  toJSON() {
    return {
      user_id: this.user_id,
      name: this.name,
    };
  }

  static fromJSON(json: ReturnType<User["toJSON"]>) {
    return new User({
      user_id: json.user_id,
      name: json.name,
    });
  }

  async flies({ ship }: { ship: Ship }) {
    this.ship = ship;
  }

  async requestsGate({ astroport }: { astroport: Astroport }) {
    return astroport.assignGate();
  }

  async docks({ astroport, gate }: { astroport: Astroport; gate: number }) {
    await astroport.docks({ ship: this.ship!, gate });
    await this.adapters.docks({ user: this, ship: this.ship!, gate });
  }
}
