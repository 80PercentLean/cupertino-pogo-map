import LinkExt from "@/components/LinkExt";
import { render, screen } from "@testing-library/react";

test("loads <LinkExt> and matches snapshot", () => {
  const { asFragment } = render(
    <LinkExt href="https://chatgpt.com">ChatGPT</LinkExt>,
  );

  expect(asFragment()).toMatchSnapshot();
});

test("does not set rel attribute when <LinkExt>'s openNewWindow prop is falsy", () => {
  render(<LinkExt href="http://localhost">localhost</LinkExt>);

  expect(screen.getByText(/localhost/i)).not.toHaveAttribute(
    "rel",
    "noopener noreferrer",
  );
});

test("sets rel attribute when <LinkExt>'s openNewWindow prop is set to true", () => {
  render(
    <LinkExt href="https://google.com" openNewWindow>
      Google
    </LinkExt>,
  );

  expect(screen.getByText(/google/i)).toHaveAttribute(
    "rel",
    "noopener noreferrer",
  );
});
