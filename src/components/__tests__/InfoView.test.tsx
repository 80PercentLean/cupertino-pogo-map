import InfoView from "@/components/InfoView";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

function TestComponent() {
  return (
    <MemoryRouter>
      <InfoView />
    </MemoryRouter>
  );
}

test("matches <InfoView> default snapshot", () => {
  const { asFragment } = render(<TestComponent />);

  expect(asFragment()).toMatchSnapshot();
});

test("loads <InfoView>", () => {
  render(<TestComponent />);

  expect(
    screen.getByRole("heading", { name: /information/i }),
  ).toBeInTheDocument();
});
