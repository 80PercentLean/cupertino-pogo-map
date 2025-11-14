import ViewCtrl from "@/components/ViewCtrl";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

function TestComponent() {
  return (
    <MemoryRouter>
      <ViewCtrl />
    </MemoryRouter>
  );
}

test("matches <ViewCtrl> default snapshot", () => {
  const { asFragment } = render(<TestComponent />);

  expect(asFragment()).toMatchSnapshot();
});

test("loads <ViewCtrl>", () => {
  render(<TestComponent />);

  expect(screen.getByRole("link", { name: /map/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /list/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /info/i })).toBeInTheDocument();
});
