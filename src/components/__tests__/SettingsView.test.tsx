import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import SettingsView from "../SettingsView";
import { useStore } from "../hooks/store";

function TestComponent() {
  return (
    <MemoryRouter>
      <SettingsView />
    </MemoryRouter>
  );
}

const expectWayfarerModeToTurnedOn = async (user: UserEvent) => {
  // Check that the Wayfarer section is not visible
  expect(
    screen.queryByRole("group", { name: /Wayfarer Settings/i }),
  ).not.toBeInTheDocument();

  const switchEle = screen.getByRole("switch", {
    name: /Enable Wayfarer Mode/i,
  });
  expect(switchEle).toBeInTheDocument();
  expect(switchEle).not.toBeChecked();

  expect(useStore.getState().wayfarerMode).toBe(false);
  expect(localStorage.getItem("wayfarerMode")).toBe(null);

  // Click the switch to turn on the switch
  await user.click(switchEle);

  expect(switchEle).toBeChecked();

  // Check that the Wayfarer section is visible
  expect(
    screen.getByRole("group", { name: /Wayfarer Settings/i }),
  ).toBeInTheDocument();

  expect(useStore.getState().wayfarerMode).toBe(true);
  expect(localStorage.getItem("wayfarerMode")).toBe("true");

  return switchEle;
};

afterEach(() => {
  localStorage.clear();
});

test("loads <SettingsView>", () => {
  render(<TestComponent />);

  expect(screen.getByRole("heading", { name: /Settings/i }));
});

test("enables disable animations when switch is clicked", async () => {
  const user = userEvent.setup();

  render(<TestComponent />);

  const switchEle = screen.getByRole("switch", {
    name: /Disable animations/i,
  });
  expect(switchEle).toBeInTheDocument();
  expect(switchEle).not.toBeChecked();

  expect(useStore.getState().disableAnimations).toBe(false);
  expect(localStorage.getItem("disableAnimations")).toBe(null);

  await user.click(switchEle);

  expect(switchEle).toBeChecked();

  expect(useStore.getState().disableAnimations).toBe(true);
  expect(localStorage.getItem("disableAnimations")).toBe("true");
});

test("enables simple markers when switch is clicked", async () => {
  const user = userEvent.setup();

  render(<TestComponent />);

  const switchEle = screen.getByRole("switch", {
    name: /Use simple markers/i,
  });
  expect(switchEle).toBeInTheDocument();
  expect(switchEle).not.toBeChecked();

  expect(useStore.getState().isSimpleMarkerEnabled).toBe(false);
  expect(localStorage.getItem("isSimpleMarkerEnabled")).toBe(null);

  await user.click(switchEle);

  expect(switchEle).toBeChecked();

  expect(useStore.getState().isSimpleMarkerEnabled).toBe(true);
  expect(localStorage.getItem("isSimpleMarkerEnabled")).toBe("true");
});

test("disables legend when switch is clicked", async () => {
  const user = userEvent.setup();

  render(<TestComponent />);

  const switchEle = screen.getByRole("switch", {
    name: /Turn off legend/i,
  });
  expect(switchEle).toBeInTheDocument();
  expect(switchEle).not.toBeChecked();

  expect(useStore.getState().isLegendOff).toBe(false);
  expect(localStorage.getItem("isLegendOff")).toBe(null);

  await user.click(switchEle);

  expect(switchEle).toBeChecked();

  expect(useStore.getState().isLegendOff).toBe(true);
  expect(localStorage.getItem("isLegendOff")).toBe("true");
});

test("changes location range type when select is used", async () => {
  /**
   * Check that the select dropdown is closed.
   */
  const expectSelectToBeClosed = () => {
    expect(
      screen.queryByRole("option", {
        name: /POI Interaction Range/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("option", {
        name: /Wild Spawn Visibility/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("option", {
        name: /Location Accuracy/i,
      }),
    ).not.toBeInTheDocument();
  };

  const user = userEvent.setup();

  render(<TestComponent />);

  const selectEle = screen.getByRole("combobox", {
    name: /My Location Range Type/i,
  });
  expect(selectEle).toBeInTheDocument();
  expect(selectEle).toHaveTextContent(/POI Interaction Range/i);

  expect(useStore.getState().myLocationRangeType).toBe("poi");
  expect(localStorage.getItem("myLocationRangeType")).toBe(null);

  // Check that the select dropdown is closed
  expect(
    screen.queryByRole("option", {
      name: /POI Interaction Range/i,
    }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("option", {
      name: /Wild Spawn Visibility/i,
    }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("option", {
      name: /Location Accuracy/i,
    }),
  ).not.toBeInTheDocument();

  // Click the label to open the select dropdown
  await user.click(selectEle);

  // Check all options are shown in the dropdown
  let optionPoi = screen.getByRole("option", {
    name: /POI Interaction Range/i,
  });
  const optionWildSpawn = screen.getByRole("option", {
    name: /Wild Spawn Visibility/i,
  });
  let optionLocationAccuracy = screen.getByRole("option", {
    name: /Location Accuracy/i,
  });

  expect(optionPoi).toBeInTheDocument();
  expect(optionWildSpawn).toBeInTheDocument();
  expect(optionLocationAccuracy).toBeInTheDocument();

  // Click wild spawn option
  await user.click(optionWildSpawn);

  expectSelectToBeClosed();

  // Check that select has changed to wild spawn
  expect(selectEle).toHaveTextContent(/Wild Spawn Visibility/i);

  expect(useStore.getState().myLocationRangeType).toBe("wild-spawn");
  expect(localStorage.getItem("myLocationRangeType")).toBe('"wild-spawn"');

  // Click the label to reopen the select dropdown
  await user.click(selectEle);

  // Click the location accuracy option
  optionLocationAccuracy = screen.getByRole("option", {
    name: /Location Accuracy/i,
  });
  await user.click(optionLocationAccuracy);

  expectSelectToBeClosed();

  // Check that select has changed to location accuracy
  expect(selectEle).toHaveTextContent(/Location Accuracy/i);

  expect(useStore.getState().myLocationRangeType).toBe("location-accuracy");
  expect(localStorage.getItem("myLocationRangeType")).toBe(
    '"location-accuracy"',
  );

  // Click the label to reopen the select dropdown
  await user.click(selectEle);

  // Click the POI option
  optionPoi = screen.getByRole("option", {
    name: /POI Interaction Range/i,
  });
  await user.click(optionPoi);

  expectSelectToBeClosed();

  expect(selectEle).toHaveTextContent(/POI Interaction Range/i);

  expect(useStore.getState().myLocationRangeType).toBe("poi");
  expect(localStorage.getItem("myLocationRangeType")).toBe('"poi"');
});

describe("wayfarer mode", () => {
  it("toggles when switch is clicked", async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const switchEle = await expectWayfarerModeToTurnedOn(user);

    // Click the switch to turn off the switch
    await user.click(switchEle);

    expect(switchEle).not.toBeChecked();
    // Check that the Wayfarer section is not visible again
    expect(
      screen.queryByRole("group", { name: /Wayfarer Settings/i }),
    ).not.toBeInTheDocument();

    expect(useStore.getState().wayfarerMode).toBe(false);
    expect(localStorage.getItem("wayfarerMode")).toBe("false");
  });

  test("enables hidden POIs when switch is clicked", async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    await expectWayfarerModeToTurnedOn(user);

    const switchEle = screen.getByRole("switch", {
      name: /Show hidden POIs/i,
    });
    expect(switchEle).toBeInTheDocument();
    expect(switchEle).not.toBeChecked();

    expect(useStore.getState().modifiers.isHidden).toBe(false);
    expect(localStorage.getItem("isHidden")).toBe(null);

    await user.click(switchEle);

    expect(switchEle).toBeChecked();

    expect(useStore.getState().modifiers.isHidden).toBe(true);
    expect(localStorage.getItem("isHidden")).toBe("true");
  });

  test("enables disabled & impossible power spots when switch is clicked", async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    await expectWayfarerModeToTurnedOn(user);

    const switchEle = screen.getByRole("switch", {
      name: /Show disabled & impossible power spots/i,
    });
    expect(switchEle).toBeInTheDocument();
    expect(switchEle).not.toBeChecked();

    expect(useStore.getState().modifiers.isDisabled).toBe(false);
    expect(localStorage.getItem("isDisabled")).toBe(null);

    await user.click(switchEle);

    expect(switchEle).toBeChecked();

    expect(useStore.getState().modifiers.isDisabled).toBe(true);
    expect(localStorage.getItem("isDisabled")).toBe("true");
  });

  test("enables removed POIs when switch is clicked", async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    await expectWayfarerModeToTurnedOn(user);

    const switchEle = screen.getByRole("switch", {
      name: /Show removed POIs/i,
    });
    expect(switchEle).toBeInTheDocument();
    expect(switchEle).not.toBeChecked();

    expect(useStore.getState().modifiers.removed).toBe(false);
    expect(localStorage.getItem("removed")).toBe(null);

    await user.click(switchEle);

    expect(switchEle).toBeChecked();

    expect(useStore.getState().modifiers.removed).toBe(true);
    expect(localStorage.getItem("removed")).toBe("true");
  });

  test('inverts coordinates from "Copy coords" buttons when switch is clicked', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    await expectWayfarerModeToTurnedOn(user);

    const switchEle = screen.getByRole("switch", {
      name: /Invert coordinates using the/i,
    });
    expect(switchEle).toBeInTheDocument();
    expect(switchEle).not.toBeChecked();

    expect(useStore.getState().invertCoords).toBe(false);
    expect(localStorage.getItem("invertCoords")).toBe(null);

    await user.click(switchEle);

    expect(switchEle).toBeChecked();

    expect(useStore.getState().invertCoords).toBe(true);
    expect(localStorage.getItem("invertCoords")).toBe("true");
  });
});

test("reset settings to default when reset button is clicked", async () => {
  const user = userEvent.setup();

  render(<TestComponent />);

  await expectWayfarerModeToTurnedOn(user);

  const switchEle = screen.getByRole("switch", {
    name: /Disable animations/i,
  });
  expect(switchEle).toBeInTheDocument();
  expect(switchEle).not.toBeChecked();

  expect(useStore.getState().disableAnimations).toBe(false);
  expect(localStorage.getItem("disableAnimations")).toBe(null);

  await user.click(switchEle);

  expect(switchEle).toBeChecked();

  expect(useStore.getState().disableAnimations).toBe(true);
  expect(localStorage.getItem("disableAnimations")).toBe("true");

  const resetBtn = screen.getByRole("button", {
    name: /Reset To Default Settings/i,
  });
  expect(resetBtn).toBeInTheDocument();

  await user.click(resetBtn);

  expect(switchEle).not.toBeChecked();
  // Check that the Wayfarer section is not visible again
  expect(
    screen.queryByRole("group", { name: /Wayfarer Settings/i }),
  ).not.toBeInTheDocument();

  expect(localStorage.getItem("disableAnimations")).toBe(null);
  expect(localStorage.getItem("wayfarerMode")).toBe(null);
});
