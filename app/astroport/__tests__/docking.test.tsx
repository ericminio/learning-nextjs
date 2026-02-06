import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AstroportPage from "../page";
import { saveDock } from "@server/sql/commands/saveDock";

describe("Docking", () => {
  it("assigns next available gate", async () => {
    await saveDock("Enterprise", 1);

    render(<AstroportPage />);
    await waitFor(() => {
      const gate1 = document.getElementById("gate-1");
      expect(gate1).toHaveTextContent("Enterprise");
    });

    const shipInput = screen.getByRole("textbox");
    const dockButton = screen.getByRole("button", { name: /dock/i });
    const user = userEvent.setup();
    await user.type(shipInput, "Millennium Falcon");
    await user.click(dockButton);
    await waitFor(() => {
      const gate2 = document.getElementById("gate-2");
      expect(gate2).toHaveTextContent("Millennium Falcon");
    });
  });
});
