import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AstroportPage from "../page";
import { saveDock } from "@server/sql/commands/saveDock";
import { clearDocks } from "@server/sql/commands/clearDocks";

describe("Docking", () => {
  beforeEach(async () => {
    await clearDocks();
  });

  it("assigns next available gate", async () => {
    await saveDock("Voyager", 0);

    render(<AstroportPage />);
    await waitFor(() => {
      const gate1 = document.getElementById("gate-1");
      expect(gate1).toHaveTextContent("Voyager");
    });

    const shipInput = screen.getByRole("textbox");
    const dockButton = screen.getByRole("button", { name: /dock/i });
    const user = userEvent.setup();
    await user.type(shipInput, "Discovery");
    await user.click(dockButton);
    await waitFor(() => {
      const gate2 = document.getElementById("gate-2");
      expect(gate2).toHaveTextContent("Discovery");
    });
  });

  it("is not possible when a astroport is full", async () => {
    await saveDock("Enterprise", 0);
    await saveDock("Millennium Falcon", 1);
    await saveDock("X-Wing", 2);

    const { getByText } = render(<AstroportPage />);
    await waitFor(() => {
      const gate1 = document.getElementById("gate-1");
      expect(gate1).toHaveTextContent("Enterprise");
    });

    const shipInput = screen.getByRole("textbox");
    const dockButton = screen.getByRole("button", { name: /dock/i });
    const user = userEvent.setup();
    await user.type(shipInput, "Arcadia");
    await user.click(dockButton);

    await waitFor(() => {
      expect(getByText(/Astroport is full/)).toBeInTheDocument();
    });
  });
});
