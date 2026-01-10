import type { Map } from "leaflet";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type layerType = keyof StoreState["layers"];

interface StoreState {
  /** Disable all animations in the app when true. */
  disableAnimations: boolean;

  /** Flags that determine which map layers are visible. */
  layers: {
    devpois: boolean;

    gyms: boolean;

    l13: boolean;

    l14: boolean;

    l17: boolean;

    labels: boolean;

    meetupSpots: boolean;

    parking: boolean;

    pokestops: boolean;

    powerspots: boolean;

    raidPath: boolean;

    restrooms: boolean;
  };

  /** Leaflet map instance. */
  map: Map;

  mapType: "default" | "extra-info" | "satellite";

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

  /** Set the mapType value. */
  setMapType: (val: StoreState["mapType"]) => void;

  /** Set the myLocationAccuracy value. */
  setMyLocation: (val: StoreState["myLocation"]) => void;

  /** Set the myLocationAccuracy value. */
  setMyLocationAccuracy: (val: StoreState["myLocationAccuracy"]) => void;

  /** Set the showHiddenPois value. */
  setShowHiddenPois: (val: StoreState["showHiddenPois"]) => void;

  /** Set the wayfarerTools value. */
  setWayfarerTools: (val: StoreState["wayfarerTools"]) => void;

  /** Toggle a layer value. */
  toggleLayer: (layer: layerType) => void;

  /** Enable Wayfarer tools when true. */
  wayfarerTools: boolean;
}

/**
 * React hook that gives components access to the app's Zustand store.
 */
export const useStore = create<StoreState>()(
  devtools(
    // persist(
    (set) => ({
      // Disable animations by default for E2E tests to allow visual tests to perform consistently
      disableAnimations: import.meta.env.VITE_E2E ? true : false,

      layers: {
        devpois: false,

        gyms: true,

        l13: false,

        l14: false,

        l17: false,

        labels: true,

        meetupSpots: true,

        parking: true,

        pokestops: true,

        powerspots: false,

        raidPath: true,

        restrooms: true,
      },

      // Map starts as null as the Leaflet map has not been created when the app first starts
      map: null,

      // Map type starts off as default
      mapType: "default",

      // myLocation starts as null until my location functionality is enabled
      myLocation: null,

      // myLocationAccuracy starts as null until my location functionality is enabled
      myLocationAccuracy: null,

      // showHiddenPois starts as false to hide the hidden POIs by default
      showHiddenPois: false,

      setDisableAnimations: (val: StoreState["disableAnimations"]) =>
        set(() => ({ disableAnimations: val })),

      setMap: (val: StoreState["map"]) => set(() => ({ map: val })),

      setMapType: (val: StoreState["mapType"]) =>
        set(() => ({ mapType: val }), undefined, "setMapType"),

      setMyLocation: (val: StoreState["myLocation"]) =>
        set(
          () => ({
            myLocation: val,
          }),
          undefined,
          "setMyLocation",
        ),

      setMyLocationAccuracy: (val: StoreState["myLocationAccuracy"]) =>
        set(
          () => ({
            myLocationAccuracy: val,
          }),
          undefined,
          "setLocationAccuracy",
        ),

      setShowHiddenPois: (val: StoreState["showHiddenPois"]) =>
        set(() => ({ showHiddenPois: val }), undefined, "setShowHiddenPois"),

      setWayfarerTools: (val: StoreState["wayfarerTools"]) =>
        set(() => ({ wayfarerTools: val }), undefined, "setWayfarerTools"),

      toggleLayer: (layer: keyof StoreState["layers"]) =>
        set(
          (s) => ({
            layers: {
              ...s.layers,
              [layer]: !s.layers[layer],
            },
          }),
          undefined,
          "toggleLayer",
        ),

      wayfarerTools: false,
    }),
    { name: "cpm-storage" },
    // ),
    // { name: "pogoMapStore" },
  ),
);
