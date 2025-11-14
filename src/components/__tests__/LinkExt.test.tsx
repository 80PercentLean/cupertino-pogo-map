import LinkExt from "@/components/LinkExt";
import { render, screen } from "@testing-library/react";

test("matches <LinkExt> default snapshot", () => {
  const { asFragment } = render(
    <LinkExt href="https://chatgpt.com">ChatGPT</LinkExt>,
  );

  expect(asFragment()).toMatchSnapshot();
});

test("does not set rel & target attributes when <LinkExt>'s openNewWindow prop is falsy", () => {
  render(<LinkExt href="http://localhost">localhost</LinkExt>);

  const link = screen.getByText(/localhost/i);
  expect(link).not.toHaveAttribute("rel", "noopener noreferrer");
  expect(link).not.toHaveAttribute("target", "_blank");
});

test("sets rel & target attributes when <LinkExt>'s openNewWindow prop is set to true", () => {
  render(
    <LinkExt href="https://google.com" openNewWindow>
      Google
    </LinkExt>,
  );

  const link = screen.getByText(/google/i);
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  expect(link).toHaveAttribute("target", "_blank");
});
