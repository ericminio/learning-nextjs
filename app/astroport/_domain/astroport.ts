import { Ship } from "./ship";
import { User } from "./user";

export class Astroport {
  name: string;
  gate_count: number;
  ships: Ship[];

  adapters : {
    getDockedShip: (gate: number) => Promise<Ship | null>;
    docker: (user : User, ship: Ship) => Promise<void>;
  }
  
  constructor({name, gate_count}: {name: string, gate_count: number}) {
    this.name = name;
    this.gate_count = gate_count;
    this.ships = [];
    this.adapters = {
      getDockedShip: async () => null,
      docker: async () => {},
    };
  }

  toJSON() {
    return { 
      name: this.name, 
      gate_count: this.gate_count 
    };
  }

  static fromJSON(json: { name: string, gate_count: number }) {
    return new Astroport(json);
  }

  async getDockedShip({ gate }: { gate: number }) {
    const ship = await this.adapters.getDockedShip(gate);
    if (ship) {
      this.ships.push(ship);
      return ship;
    }
    return null;
  }

  async docks(user: User, ship: Ship) {
    return this.adapters.docker(user, ship);
  }
}