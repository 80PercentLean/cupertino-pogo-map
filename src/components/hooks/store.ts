import { gymsJson, pokestopsJson, powerspotsJson } from "@/geojson/data";
import { type CProperties } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type layerType = keyof StoreState["layers"];

export type modifierType = keyof StoreState["modifiers"];

/** State for an individual marker. */
export interface MarkerState {
  /** Show the marker when true. */
  isVisible?: boolean;

  /** Show the interaction radius around the marker when true. */
  showInteractionRadius?: boolean;

  /** Show the no CA POI build zone around the marker  when true. */
  showNoCaPoiZones?: boolean;

  /** Show the no power spot build zone around the marker when true. */
  showNoPowerSpotZones?: boolean;
}

export interface StoreState {
  /** Controls which popup is currently open. */
  activePopup: string | null;

  // /** Clear marker type. */
  // clearMarkerAll(id: string, type: CProperties["type"]): void;

  /** Disable all animations in the app when true. */
  disableAnimations: boolean;

  /** Invert coordinates when copied and pasted together when true. */
  invertCoords: boolean;

  /** Open the list view when true. */
  isListViewOpen: boolean;

  // /** Flags that determine which map layers are visible. */
  // layers: {
  //   devpois: boolean;

  //   gym: boolean;

  //   hiddenPois: boolean;

  //   inactivePois: boolean;

  //   /** Shows range in which POIs are interactable. */
  //   interactionRadii: boolean;

  //   l13: boolean;

  //   l14: boolean;

  //   l17: boolean;

  //   labels: boolean;

  //   meetupSpots: boolean;

  //   /** Shows zone where Community Ambassador POIs cannot be built when true. */
  //   noCaPoiZones: boolean;

  //   /** Shows zone where power spots cannot be built when true. */
  //   noPowerSpotZones: boolean;

  //   parking: boolean;

  //   pokestop: boolean;

  //   powerspot: boolean;

  //   raidPath: boolean;

  //   removedPois: boolean;

  //   restrooms: boolean;
  // };

  /** State for Gym markers. */
  markergym: Record<string, MarkerState>;

  // TODO: Rename marker to layer for all these properties
  /** State for labels. */
  markerlabel: Record<string, MarkerState>;

  /** State for PokeStop markers. */
  markerpokestop: Record<string, MarkerState>;

  /** State for Power Spot markers. */
  markerpowerspot: Record<string, MarkerState>;

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

  /** Set the activePopup value. */
  setActivePopup: (val: string | null) => void;

  /** Set the disableAnimations value. */
  setDisableAnimations: (val: StoreState["disableAnimations"]) => void;

  /** Set the isListViewOpen value. */
  setIsListViewOpen: (val: boolean) => void;

  /** Set all marker values for a layer. */
  setLayer: (
    type: CProperties["type"],
    state: MarkerState,
    override?: boolean,
  ) => void;

  /** Set the mapType value. */
  setMapType: (val: StoreState["mapType"]) => void;

  /** Set a marker property value. */
  setMarker: (
    type: CProperties["type"],
    id: string,
    state: MarkerState,
    override?: boolean,
  ) => void;

  /** Set the myLocationAccuracy value. */
  setMyLocation: (val: StoreState["myLocation"]) => void;

  /** Set the myLocationAccuracy value. */
  setMyLocationAccuracy: (val: StoreState["myLocationAccuracy"]) => void;

  /** Set the wayfarerMode value. */
  setWayfarerMode: (val: StoreState["wayfarerMode"]) => void;

  /** Toggle invertCoords value. */
  toggleInvertCoords: () => void;

  /** Toggle isListViewOpen value. */
  toggleIsListViewOpen: () => void;

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
    (set) => {
      const initStoreState: StoreState = {
        activePopup: null,

        // Disable animations by default for E2E tests to allow visual tests to perform consistently
        disableAnimations: import.meta.env.VITE_E2E ? true : false,

        // Copied & pasted coordinates will be formatted as `lat,lng` by default
        invertCoords: false,

        // TODO:Start with opened list view on desktop and a closed one on mobile
        isListViewOpen: true,

        // Map type starts off as default
        mapType: "default",

        // Values are initialized below
        markergym: {},

        markerlabel: {},

        markerpokestop: {},

        markerpowerspot: {},

        modifiers: {
          hidden: true,

          inactive: true,

          removed: false,
        },

        // myLocation starts as null until my location functionality is enabled
        myLocation: null,

        // myLocationAccuracy starts as null until my location functionality is enabled
        myLocationAccuracy: null,

        setActivePopup: (val: string | null) =>
          set(() => ({ activePopup: val }), undefined, "setActivePopup"),

        setDisableAnimations: (val: StoreState["disableAnimations"]) =>
          set(() => ({ disableAnimations: val })),

        setLayer: (
          type: CProperties["type"],
          state: MarkerState,
          override?: boolean,
        ) =>
          set(
            (s) => {
              const newState: Record<string, Record<string, MarkerState>> = {
                [`marker${type}`]: {},
              };

              const ALL_IDS = Object.keys(s[`marker${type}`]);

              if (override) {
                ALL_IDS.forEach((id) => {
                  // Completely override a marker's state
                  newState[`marker${type}`][id] = state;
                });
              }

              // Merge new state with current state for a marker
              ALL_IDS.forEach((id) => {
                newState[`marker${type}`][id] = {
                  ...s[`marker${type}`][id],
                  ...state,
                };
              });

              return newState;
            },
            undefined,
            "setLayer",
          ),

        setMarker: (
          type: CProperties["type"],
          id: string,
          state: MarkerState,
          override?: boolean,
        ) =>
          set(
            (s) => {
              if (override) {
                // Completely override a marker's state
                return {
                  [`marker${type}`]: {
                    ...s[`marker${type}`],
                    [id]: state,
                  },
                };
              }

              // Merge new state with current state for a marker
              return {
                [`marker${type}`]: {
                  ...s[`marker${type}`],
                  [id]: {
                    ...s[`marker${type}`][id],
                    ...state,
                  },
                },
              };
            },
            undefined,
            "setMarker",
          ),

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

        toggleIsListViewOpen: () => {
          set(
            (s) => ({ isListViewOpen: !s.isListViewOpen }),
            undefined,
            "toggleIsListViewOpen",
          );
        },

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
      };

      // Initialize marker states for each layer
      gymsJson.features.forEach(({ id }) => {
        initStoreState.markergym[String(id)] = { isVisible: true };
      });

      pokestopsJson.features.forEach(({ id }) => {
        initStoreState.markerpokestop[String(id)] = { isVisible: true };
      });

      powerspotsJson.features.forEach(({ id }) => {
        initStoreState.markerpowerspot[String(id)] = { isVisible: false };
      });

      return initStoreState;
    },
    { name: "cpm-storage" },
  ),
);

/**
 * Determines if a layer is considered on or off.
 * @param type Layer type
 * @returns True if the layer is on, false if it is off
 */
export const useIsLayerOn = (type: CProperties["type"]) =>
  useStore((s) => {
    // If even 1 marker is visible in a layer, the layer is considered on
    for (const { isVisible } of Object.values(s[`marker${type}`])) {
      if (isVisible) {
        return true;
      }
    }

    return false;
  });
