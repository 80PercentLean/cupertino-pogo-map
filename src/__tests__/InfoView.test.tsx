import InfoView from "@/InfoView";
import { render, screen } from "@testing-library/react";

test("loads <InfoView>", () => {
  render(<InfoView />);

  expect(screen.getByRole("heading", { name: /info/i })).toBeInTheDocument();
});

test("loads <InfoView> and matches snapshot", () => {
  const { asFragment } = render(<InfoView />);

  expect(asFragment()).toMatchSnapshot();
});
