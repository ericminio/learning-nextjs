import { Astroport } from "../astroport";
import { AstroportIsFullError, GateNotAvailableError } from "../errors";
import { Ship } from "../ship";
import { User } from "../user";

describe("Astroport Docking", () => {
  let astroport: Astroport;
  let alice: User;
  let bob: User;
  let enterprise: Ship;
  let falcon: Ship;

  beforeEach(async () => {
    astroport = new Astroport({ name: "charon", gate_count: 2 });
    alice = new User({ name: "alice" });
    bob = new User({ name: "bob" });
    enterprise = new Ship({ name: "enterprise" });
    falcon = new Ship({ name: "falcon" });

    await alice.flies({ ship: enterprise });
    await bob.flies({ ship: falcon });
  });

  it("requires communication", async () => {
    const gate = await alice.requestsGate({ astroport });
    await alice.docks({ astroport, gate });

    expect(await astroport.getDockedShip({ gate })).toBe(enterprise);
  });

  it("assigns next available gate", async () => {
    const gate = await alice.requestsGate({ astroport });
    await alice.docks({ astroport, gate });

    const gate2 = await bob.requestsGate({ astroport });
    await bob.docks({ astroport, gate: gate2 });

    expect(await astroport.getDockedShip({ gate })).toBe(enterprise);
    expect(await astroport.getDockedShip({ gate: gate2 })).toBe(falcon);
  });

  it("rejects request when full", async () => {
    const astroport = new Astroport({ name: "charon", gate_count: 1 });
    const gate = await alice.requestsGate({ astroport });
    await alice.docks({ astroport, gate });

    try {
      await bob.requestsGate({ astroport });
      throw new Error("Expected error for full astroport");
    } catch (error) {
      expect(error instanceof AstroportIsFullError).toBe(true);
    }
  });

  it("reports when docking is forced", async () => {
    const astroport = new Astroport({ name: "charon", gate_count: 1 });
    const gate = await alice.requestsGate({ astroport });
    await alice.docks({ astroport, gate });

    try {
      await bob.docks({ astroport, gate });
      throw new Error("Expected error for occupied gate");
    } catch (error) {
      expect(error instanceof GateNotAvailableError).toBe(true);
    }
  });
});
