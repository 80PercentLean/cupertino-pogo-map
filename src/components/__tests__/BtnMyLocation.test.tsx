import { render } from "@testing-library/react";

import BtnMyLocation from "../BtnMyLocation";

test("matches <BtnMyLocation> default snapshot", () => {
  const { asFragment } = render(<BtnMyLocation />);

  expect(asFragment()).toMatchSnapshot();
});
