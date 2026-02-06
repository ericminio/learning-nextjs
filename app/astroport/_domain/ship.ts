export class Ship {
  name: string;
  
  constructor({name}: {name: string}) {
    this.name = name;
  }

  toJSON() {
    return { name: this.name };
  }

  static fromJSON(json: { name: string }) {
    return new Ship(json);
  }
}