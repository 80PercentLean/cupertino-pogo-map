import type { Map } from "leaflet";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StoreState {
  /** Disable all animations in the app when true. */
  disableAnimations: boolean;

  /** Leaflet map instance. */
  map: Map;

  /** Coordinates for current my location. */
  myLocation: [number, number] | null;

  /** Value for geolocation position accuracy. */
  myLocationAccuracy: number | null;

  /** Show hidden POIs on the map. */
  showHiddenPois: boolean;

  /** Set the disableAnimations value. */
  setDisableAnimations: (val: StoreState["disableAnimations"]) => void;

  /** Set the map value. */
  setMap: (val: StoreState["map"]) => void;

  /** Set the myLocationAccuracy value. */
  setMyLocation: (val: StoreState["myLocation"]) => void;

  /** Set the myLocationAccuracy value. */
  setMyLocationAccuracy: (val: StoreState["myLocationAccuracy"]) => void;

  /** Set the showHiddenPois value. */
  setShowHiddenPois: (val: StoreState["showHiddenPois"]) => void;
}

/**
 * React hook that gives components access to the app's Zustand store.
 */
export const useStore = create<StoreState>()(
  devtools(
    (set) => ({
      // Disable animations by default for E2E tests to allow visual tests to perform consistently
      disableAnimations: import.meta.env.VITE_E2E ? true : false,

      // Map starts as null as the Leaflet map has not been created when the app first starts
      map: null,

      // myLocation starts as null until my location functionality is enabled
      myLocation: null,

      // myLocationAccuracy starts as null until my location functionality is enabled
      myLocationAccuracy: null,

      // showHiddenPois starts as false to hide the hidden POIs by default
      showHiddenPois: false,

      setDisableAnimations: (val: StoreState["disableAnimations"]) =>
        set(() => ({ disableAnimations: val })),

      setMap: (val: StoreState["map"]) => set(() => ({ map: val })),

      setMyLocation: (val: StoreState["myLocation"]) =>
        set(() => ({
          myLocation: val,
        })),

      setMyLocationAccuracy: (val: StoreState["myLocationAccuracy"]) =>
        set(() => ({
          myLocationAccuracy: val,
        })),

      setShowHiddenPois: (val: StoreState["showHiddenPois"]) =>
        set(() => ({ showHiddenPois: val })),
    }),
    { name: "pogoMapStore" },
  ),
);
