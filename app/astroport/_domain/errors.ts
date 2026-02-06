export class AstroportIsFullError extends Error {
  constructor() {
    super("Astroport is full");
    this.name = "AstroportIsFullError";
  }
}

export class GateNotAvailableError extends Error {
  constructor() {
    super("Gate is not available");
    this.name = "GateNotAvailableError";
  }
}
