import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("loads <SettingsView>", () => {
  render(<TestComponent />);

  expect(screen.getAllByText(/Settings/i)).toHaveLength(2);
});

test("enables disable animations switch when switch is clicked", async () => {
  const user = userEvent.setup();

  render(<TestComponent />);

  const switchEle = screen.getByRole("switch", {
    name: /Disable animations/i,
  });
  expect(switchEle).toBeInTheDocument();
  expect(switchEle).not.toBeChecked();
  expect(useStore.getState().disableAnimations).toBe(false);

  await user.click(switchEle);

  expect(switchEle).toBeChecked();
  expect(useStore.getState().disableAnimations).toBe(true);
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

  await user.click(switchEle);

  expect(switchEle).toBeChecked();
  expect(useStore.getState().isSimpleMarkerEnabled).toBe(true);
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

  await user.click(switchEle);

  expect(switchEle).toBeChecked();
  expect(useStore.getState().isSimpleMarkerEnabled).toBe(true);
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

  await user.click(switchEle);

  expect(switchEle).toBeChecked();
  expect(useStore.getState().isLegendOff).toBe(true);
});

test("changes location range type when select is used", async () => {
  const user = userEvent.setup();

  render(<TestComponent />);

  const selectEle = screen.getByRole("combobox", {
    name: /My Location Range Type/i,
  });
  expect(selectEle).toBeInTheDocument();
  expect(selectEle).toHaveTextContent(/POI Interaction Range/i);
  expect(useStore.getState().myLocationRangeType).toBe("poi");

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

  // Check that select has changed to wild spawn
  expect(selectEle).toHaveTextContent(/Wild Spawn Visibility/i);
  expect(useStore.getState().myLocationRangeType).toBe("wild-spawn");

  // Click the label to reopen the select dropdown
  await user.click(selectEle);

  // Click the location accuracy option
  optionLocationAccuracy = screen.getByRole("option", {
    name: /Location Accuracy/i,
  });
  await user.click(optionLocationAccuracy);

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

  // Check that select has changed to location accuracy
  expect(selectEle).toHaveTextContent(/Location Accuracy/i);
  expect(useStore.getState().myLocationRangeType).toBe("location-accuracy");

  // Click the label to reopen the select dropdown
  await user.click(selectEle);

  // Click the POI option
  optionPoi = screen.getByRole("option", {
    name: /POI Interaction Range/i,
  });
  await user.click(optionPoi);

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

  expect(selectEle).toHaveTextContent(/POI Interaction Range/i);
  expect(useStore.getState().myLocationRangeType).toBe("poi");
});
