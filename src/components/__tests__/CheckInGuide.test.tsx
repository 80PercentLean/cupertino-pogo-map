import { CAMPFIRE_PATH } from "@/constants";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import CheckInGuide from "../CheckInGuide";

function TestComponent() {
  return (
    <MemoryRouter>
      <CheckInGuide />
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.unstubAllEnvs();
});

test.each([["false"], ["true"]])(
  "loads correct <CheckInGuide> when VITE_IS_CENTRAL is %s",
  async (IS_CENTRAL) => {
    vi.stubEnv("VITE_IS_CENTRAL", IS_CENTRAL);
    render(<TestComponent />);

    expect(
      screen.getByRole("heading", {
        name: /How To Check Into Meetups For Free Rewards & Special Bonuses/i,
      }),
    ).toBeInTheDocument();

    if (IS_CENTRAL === "true") {
      // Wild Goose-related text should be found
      expect(screen.getAllByText(/wild goose/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/santa clara/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/central park/i).length).toBeGreaterThan(0);

      // Cupertino-related text should not be found
      expect(screen.queryAllByText(/cupertino/i)).toHaveLength(0);
      expect(screen.queryAllByText(/memorial park/i)).toHaveLength(0);
      expect(screen.queryAllByText(/de anza college/i)).toHaveLength(0);
    } else {
      // Cupertino-related text should be found
      expect(screen.getAllByText(/cupertino/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/memorial park/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/de anza college/i).length).toBeGreaterThan(0);

      // Wild Goose-related text should not be found
      expect(screen.queryAllByText(/wild goose/i)).toHaveLength(0);
      expect(screen.queryAllByText(/santa clara/i)).toHaveLength(0);
      expect(screen.queryAllByText(/central park/i)).toHaveLength(0);
    }

    const campfireLink = await screen.findByRole("link", {
      name: /Download the Niantic Campfire app/i,
    });

    expect(campfireLink).toBeInTheDocument();
    expect(campfireLink).toHaveAttribute("href", CAMPFIRE_PATH);
  },
);
