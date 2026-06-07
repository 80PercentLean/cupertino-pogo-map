import { CUP_POGO_CAMPFIRE, WG_CAMPFIRE } from "@/constants";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import Landing from "../Landing";

function TestComponent() {
  return (
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.unstubAllEnvs();
});

test.each([["false"], ["true"]])(
  "loads correct <Landing> when VITE_IS_CENTRAL is %s",
  (IS_CENTRAL) => {
    vi.stubEnv("VITE_IS_CENTRAL", IS_CENTRAL);

    render(<TestComponent />);

    const title =
      IS_CENTRAL === "true" ? "Wild\u00A0Goose" : "Cupertino\u00A0PoGO";

    expect(
      screen.getByRole("heading", { name: new RegExp(title, "i") }),
    ).toBeInTheDocument();

    if (IS_CENTRAL === "true") {
      expect(screen.queryAllByText(/cupertino/i)).toHaveLength(1);

      const link = screen.getByRole("link", {
        name: /Campfire Logo/i,
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", WG_CAMPFIRE);
    } else {
      expect(screen.queryAllByText(/wild goose/i)).toHaveLength(1);
      expect(screen.queryAllByText(/santa clara/i)).toHaveLength(0);
      expect(screen.queryAllByText(/central park/i)).toHaveLength(0);

      const link = screen.getByRole("link", {
        name: /Campfire Logo/i,
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", CUP_POGO_CAMPFIRE);
    }
  },
);
