import { render, screen } from "@testing-library/react";
import TopBar from "./TopBar";

test("loads <TopBar>", async () => {
  render(<TopBar />);

  expect(screen.getByText(/top bar/i)).toBeInTheDocument();
});
