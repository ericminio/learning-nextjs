import { AstroportIsFullError, GateNotAvailableError } from "./errors";
import { Ship } from "./ship";

export class Astroport {
  name: string;
  gate_count: number;
  gates: Ship[];

  constructor({ name, gate_count }: { name: string; gate_count: number }) {
    this.name = name;
    this.gate_count = gate_count;
    this.gates = new Array(gate_count).fill(null);
  }

  toJSON() {
    return {
      name: this.name,
      gate_count: this.gate_count,
    };
  }

  static fromJSON(json: { name: string; gate_count: number }) {
    return new Astroport(json);
  }

  async getDockedShip({ gate }: { gate: number }) {
    return this.gates[gate];
  }

  async assignGate() {
    const availableGate = this.gates.findIndex((g) => g === null);
    if (availableGate === -1) {
      throw new AstroportIsFullError();
    }
    return availableGate;
  }

  async docks({ ship, gate }: { ship: Ship; gate: number }) {
    if (this.gates[gate] !== null) {
      throw new GateNotAvailableError();
    }
    this.gates[gate] = ship;
  }
}
