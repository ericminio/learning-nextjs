import { Ship } from "./ship";

export class Astroport {
  name: string;
  adapters : {
      getDockedShip: (gate: number) => Promise<Ship | null>;
    }
  
  constructor({name}: {name: string}) {
    this.name = name;
    this.adapters = {
      getDockedShip: async () => null,
    };
  }

  toJSON() {
    return { name: this.name };
  }

  static fromJSON(json: { name: string }) {
    return new Astroport(json);
  }

  getDockedShip({ gate }: { gate: number }) {
    return this.adapters.getDockedShip(gate);
  }
}