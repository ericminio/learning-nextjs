import { Astroport } from "./astroport";
import { Ship } from "./ship";
import { uuid } from "./uuid";

export class User {
  user_id: string;
  astroport: Astroport;

  constructor({ user_id, astroport }: { user_id?: string, astroport: Astroport }) {
    this.user_id = user_id ?? uuid();
    this.astroport = astroport;
  }

  toJSON() {
    return {
      user_id: this.user_id, 
      astroport: this.astroport.toJSON()     
    };
  }

  static fromJSON(json: ReturnType<User["toJSON"]>) {
    return new User({
      user_id: json.user_id, 
      astroport: Astroport.fromJSON(json.astroport)
    });
  }

  async docks(ship: Ship) {
    return this.astroport.docks(this, ship);
  }
}