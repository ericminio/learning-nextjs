import { Astroport } from "./astroport";
import { Ship } from "./ship";

export class User {
  name: string;
  ship?: Ship;

  adapters : {
    docks: ({user, ship, gate}:{user: User, ship: Ship, gate: number}) => Promise<void>;
  }

  constructor({ name }: { name: string }) {
    this.name = name;
    this.adapters = {
      docks: async () => {},
    };
  }

  toJSON() {
    return {
      name: this.name,   
    };
  }

  static fromJSON(json: ReturnType<User["toJSON"]>) {
    return new User({
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
    await astroport.docks({ user: this, ship: this.ship!, gate });
    await this.adapters.docks({ user: this, ship: this.ship!, gate });
  }
}