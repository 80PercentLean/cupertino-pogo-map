import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BtnMyLocation from "../BtnMyLocation";

test("matches <BtnMyLocation> default snapshot", () => {
  const { asFragment } = render(<BtnMyLocation />);

  expect(asFragment()).toMatchSnapshot();
});

test("remains inactive when <BtnMyLocation> is pressed but no location is set", async () => {
  const user = userEvent.setup();

  render(<BtnMyLocation />);

  const icon = screen.getByTestId("btn-my-location-icon");

  // Button should start in inactive mode
  expect(icon).toHaveClass("bg-gray-400");

  await user.click(screen.getByRole("button"));

  // Button should still be in inactive mode
  expect(icon).toHaveClass("bg-gray-400");
});

describe("<BtnMyLocation> with geolocation API mock", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis.navigator, "geolocation", {
      value: {
        getCurrentPosition: vi.fn(),
        watchPosition: vi.fn(),
        clearWatch: vi.fn(),
      },
      configurable: true, // allows overriding in other tests
    });
  });

  it("becomes active when button is pressed and location is set", async () => {
    const user = userEvent.setup();

    let watchCallback: PositionCallback;

    vi.spyOn(
      globalThis.navigator.geolocation,
      "watchPosition",
    ).mockImplementation((success: PositionCallback) => {
      watchCallback = success;
      return 1; // fake watch ID
    });

    render(<BtnMyLocation />);

    const icon = screen.getByTestId("btn-my-location-icon");

    // Button should start in inactive mode
    expect(icon).toHaveClass("bg-gray-400");

    await user.click(screen.getByRole("button"));

    // Mock the component subscribing to watchPosition
    act(() => {
      watchCallback({
        coords: {
          accuracy: 40,
          altitude: 0,
          altitudeAccuracy: null,
          heading: null,
          latitude: 1.02,
          longitude: 1.02,
          speed: null,
          toJSON() {
            return {
              accuracy: this.accuracy,
              altitude: this.altitude,
              altitudeAccuracy: this.altitudeAccuracy,
              heading: this.heading,
              latitude: this.latitude,
              longitude: this.longitude,
              speed: this.speed,
            };
          },
        },
        timestamp: Date.now(),
        toJSON() {
          return {
            accuracy: this.coords.accuracy,
            altitude: this.coords.altitude,
            altitudeAccuracy: this.coords.altitudeAccuracy,
            heading: this.coords.heading,
            latitude: this.coords.latitude,
            longitude: this.coords.longitude,
            speed: this.coords.speed,
          };
        },
      });
    });

    // Button should be in active mode
    expect(icon).toHaveClass("bg-[#5c84f0]");
  });
});
