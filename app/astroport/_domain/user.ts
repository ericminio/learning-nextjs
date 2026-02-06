import { Ship } from "./ship";
import { uuid } from "./uuid";

export class User {
  user_id: string;
  adapters : {
    docker: (user : User, ship: Ship) => Promise<void>;
  }

  constructor({ user_id }: { user_id?: string } = {}) {
    this.user_id = user_id ?? uuid();
    this.adapters = {
      docker: async () => {},
    };
  }

  toJSON() {
    return {
      user_id: this.user_id,      
    };
  }

  static fromJSON(json: ConstructorParameters<typeof User>[0]) {
    return new User(json);
  }

  docks(ship: Ship) {
    return this.adapters.docker(this, ship);
  }
}