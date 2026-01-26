import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type layerType = keyof StoreState["layers"];

export type modifierType = keyof StoreState["modifiers"];

interface StoreState {
  /** Disable all animations in the app when true. */
  disableAnimations: boolean;

  /** Invert coordinates when copied and pasted together when true. */
  invertCoords: boolean;

  /** Open the list view when true. */
  isListViewOpen: boolean;

  /** Flags that determine which map layers are visible. */
  layers: {
    devpois: boolean;

    gyms: boolean;

    hiddenPois: boolean;

    inactivePois: boolean;

    /** Shows range in which POIs are interactable. */
    interactionRadii: boolean;

    l13: boolean;

    l14: boolean;

    l17: boolean;

    labels: boolean;

    meetupSpots: boolean;

    /** Shows zone where Community Ambassador POIs cannot be built when true. */
    noCaPoiZones: boolean;

    /** Shows zone where power spots cannot be built when true. */
    noPowerSpotZones: boolean;

    parking: boolean;

    pokestops: boolean;

    powerspots: boolean;

    raidPath: boolean;

    removedPois: boolean;

    restrooms: boolean;
  };

  /** Flags that determine which popup is open or close for each marker. */
  markerPopups: Record<string, boolean>;

  /** Flags that determine which modifiers are applied to map layers. */
  modifiers: {
    inactive: boolean;

    hidden: boolean;

    removed: boolean;
  };

  mapType: "default" | "extra-info" | "satellite";

  /** Coordinates for current my location. */
  myLocation: [number, number] | null;

  /** Value for geolocation position accuracy. */
  myLocationAccuracy: number | null;

  /** Set the disableAnimations value. */
  setDisableAnimations: (val: StoreState["disableAnimations"]) => void;

  /** Set the isListViewOpen value. */
  setIsListViewOpen: (val: boolean) => void;

  /** Set the mapType value. */
  setMapType: (val: StoreState["mapType"]) => void;

  /** Set a value for a markerPopups property */
  setMarkerPopup: (id: string, val: boolean) => void;

  /** Set the myLocationAccuracy value. */
  setMyLocation: (val: StoreState["myLocation"]) => void;

  /** Set the myLocationAccuracy value. */
  setMyLocationAccuracy: (val: StoreState["myLocationAccuracy"]) => void;

  /** Set the wayfarerMode value. */
  setWayfarerMode: (val: StoreState["wayfarerMode"]) => void;

  /** Toggle a invertCoords value. */
  toggleInvertCoords: () => void;

  /** Toggle a layer value. */
  toggleLayer: (layer: layerType) => void;

  /** Toggle a modifier value. */
  toggleModifier: (modifier: modifierType) => void;

  /** Enable Wayfarer mode when true. */
  wayfarerMode: boolean;
}

/**
 * React hook that gives components access to the app's Zustand store.
 */
export const useStore = create<StoreState>()(
  devtools(
    (set) => ({
      // Disable animations by default for E2E tests to allow visual tests to perform consistently
      disableAnimations: import.meta.env.VITE_E2E ? true : false,

      // Copied & pasted coordinates will be formatted as `lat,lng` by default
      invertCoords: false,

      // TODO:Start with opened list view on desktop and a closed one on mobile
      isListViewOpen: true,

      layers: {
        devpois: false,

        gyms: true,

        interactionRadii: false,

        l13: false,

        l14: false,

        l17: false,

        labels: true,

        meetupSpots: true,

        parking: true,

        pokestops: true,

        powerspots: true,

        raidPath: true,

        restrooms: true,
      },

      // Map type starts off as default
      mapType: "default",

      markerPopups: {},

      modifiers: {
        hidden: true,

        inactive: true,

        removed: false,
      },

      // myLocation starts as null until my location functionality is enabled
      myLocation: null,

      // myLocationAccuracy starts as null until my location functionality is enabled
      myLocationAccuracy: null,

      // showHiddenPois starts as false to hide the hidden POIs by default
      showHiddenPois: false,

      setDisableAnimations: (val: StoreState["disableAnimations"]) =>
        set(() => ({ disableAnimations: val })),

      setMapType: (val: StoreState["mapType"]) =>
        set(() => ({ mapType: val }), undefined, "setMapType"),

      setMarkerPopup: (key: string, val: boolean) =>
        set(
          (s) => ({
            markerPopups: {
              ...s.markerPopups,
              [key]: val,
            },
          }),
          undefined,
          "setMarkerPopup",
        ),

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

      setIsListViewOpen: (val: StoreState["isListViewOpen"]) =>
        set(
          () => ({
            isListViewOpen: val,
          }),
          undefined,
          "setIsListViewOpen",
        ),

      setWayfarerMode: (val: StoreState["wayfarerMode"]) =>
        set(() => ({ wayfarerMode: val }), undefined, "setWayfarerMode"),

      toggleInvertCoords: () =>
        set(
          (s) => ({
            invertCoords: !s.invertCoords,
          }),
          undefined,
          "toggleInvertCoords",
        ),

      toggleLayer: (l: keyof StoreState["layers"]) =>
        set(
          (s) => ({
            layers: {
              ...s.layers,
              [l]: !s.layers[l],
            },
          }),
          undefined,
          "toggleLayer",
        ),

      toggleModifier: (m: keyof StoreState["modifiers"]) =>
        set(
          (s) => ({
            modifiers: {
              ...s.modifiers,
              [m]: !s.modifiers[m],
            },
          }),
          undefined,
          "toggleModifier",
        ),

      wayfarerMode: true,
    }),
    { name: "cpm-storage" },
  ),
);
