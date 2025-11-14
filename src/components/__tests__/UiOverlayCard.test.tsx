import UiOverlayCard from "@/components/UiOverlayCard";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

test("matches <UiOverlayCard> default snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UiOverlayCard title="Lipsum" />
    </MemoryRouter>,
  );

  expect(asFragment()).toMatchSnapshot();
});

test("loads <UiOverlayCard> with title", () => {
  render(
    <MemoryRouter>
      <UiOverlayCard title="Lipsum" />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { name: /lipsum/i })).toBeInTheDocument();
});

test("loads <UiOverlayCard> with title & content", () => {
  render(
    <MemoryRouter>
      <UiOverlayCard title="Lipsum">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare
          ornare pulvinar. Nam nec est eget massa fermentum consequat. Integer
          non auctor est. Phasellus dapibus ex eu blandit convallis. Nunc
          accumsan tortor eget sapien sodales ullamcorper. Nam egestas lectus
          feugiat dolor scelerisque, eu tempor nisi rutrum. Cras eu sapien sem.
          Fusce id lacinia mi, nec volutpat libero. Duis aliquet id orci eget
          bibendum.
        </p>
        <p>
          Ut efficitur pretium sapien vel aliquet. Maecenas bibendum felis
          augue, fermentum viverra orci eleifend at. Nulla nec enim semper,
          malesuada odio in, dignissim augue. Suspendisse eu venenatis nisl, in
          cursus quam. Nulla feugiat sodales tortor nec congue. Duis et
          convallis est. Aenean volutpat, eros ut tempor imperdiet, nunc arcu
          porttitor lorem, eu dignissim nibh eros nec odio. Nam ut est sem. In
          cursus libero vitae orci semper fringilla. Maecenas ultrices volutpat
          tellus, vel facilisis nulla sodales a. Curabitur non massa arcu. Cras
          lorem ligula, dictum id neque sit amet, luctus vehicula lorem.
          Suspendisse eu eros at nibh venenatis pretium sed vitae felis.
        </p>
      </UiOverlayCard>
    </MemoryRouter>,
  );

  expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
});
