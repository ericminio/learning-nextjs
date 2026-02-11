import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { truncateTable } from "@/db/truncateTable";
import { Astroport } from "@domain/astroport";
import { createAstroport } from "@server/sql/commands/createAstroport";
import { AppRouter } from "@/jest.setup";

describe("Home", () => {
  beforeEach(async () => {
    await truncateTable("gates");
    await createAstroport(new Astroport({ name: "Gateway", gate_count: 3 }));
  });

  it("provides link to astroport management", async () => {
    const { getByText, getByRole } = render(<AppRouter />);
    await waitFor(() => {
      expect(getByText(/Enter Astroport/)).toBeInTheDocument();
    });

    const enter = getByRole("button", { name: /enter/i });
    const user = userEvent.setup();
    await user.click(enter);
    await waitFor(() => {
      expect(getByText(/Gateway/)).toBeInTheDocument();
    });
  });
});
