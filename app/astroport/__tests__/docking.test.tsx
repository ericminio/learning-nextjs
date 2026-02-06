jest.mock("@domain/uuid", () => {
  return {
    uuid: () => "fixed-uuid-for-tests",
  };
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AstroportPage from "../page";
import { saveDock } from "@server/sql/commands/saveDock";

describe("Docking feature", () => {
  it("allows docking a new ship in gate-1", async () => {
    const user = userEvent.setup();
    const seededShip = "Enterprise";
    const newShip = "Millennium Falcon";
    await saveDock(seededShip, 1);

    render(<AstroportPage />);

    await waitFor(() => {
      const gate1 = document.getElementById("gate-1");
      expect(gate1).toHaveTextContent(seededShip);
    });
    const shipInput = screen.getByRole("textbox");
    const dockButton = screen.getByRole("button", { name: /dock/i });
    await user.type(shipInput, newShip);
    await user.click(dockButton);

    await waitFor(() => {
      const gate1 = document.getElementById("gate-1");
      expect(gate1).toHaveTextContent(newShip);
    });
  });
});
