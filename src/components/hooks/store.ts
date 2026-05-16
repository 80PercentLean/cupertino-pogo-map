import { CENTER_CENTRAL, CENTER_CUP } from "@/constants";
import { IS_MOBILE } from "@/constantsDom";
import {
  devpoisJson,
  gymsJson,
  meetupspotsJson,
  parkingJson,
  pokestopsJson,
  powerspotsJson,
  restroomsJson,
} from "@/geojson/data";
import { type CProperties } from "@/types/CFeatures";
import { capitalize } from "@/util";
import { type LatLngTuple } from "leaflet";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/** Global variable that allows placed markers to have a simple unique ID. */
let placedMarkerCount = 0;

export type LayerKey = `layer${Capitalize<CProperties["type"]>}`;

export type ModifierType = keyof StoreState["modifiers"];

/** State for an individual marker. */
export interface MarkerState {
  /** Highlight the marker when true. */
  isHighlighted?: boolean;

  /** Show the marker when true. */
  isVisible?: boolean;

  /** Show the interaction radius around the marker when true. */
  showInteractionRadius?: boolean;

  /** Show the no CA POI build zone around the marker  when true. */
  showNoCaPoiZone?: boolean;

  /** Show the no power spot build zone around the marker when true. */
  showNoPowerSpotZone?: boolean;
}

export interface PlacedMarkerState extends MarkerState {
  id: string;

  position: LatLngTuple;
}

export interface StoreState {
  /** Controls which popup is currently open. */
  activePopup: string | null;

  /** Determines which main view is currently active. */
  activeMainView: "info" | "meetups" | "settings" | "tools" | null;

  /** Add a placed marker state. */
  addPlacedMarkerState: (position: LatLngTuple) => void;

  /** State for basic layers. */
  basicLayers: {
    label: boolean;

    stdRaidPath: boolean;
  };

  /** Disable all animations in the app when true. */
  disableAnimations: boolean;

  /** Invert coordinates when copied and pasted together when true. */
  invertCoords: boolean;

  /** Initial error message to display when the app first loads. */
  initErrMsg: string | null;

  /** Open the layers overlay when true. */
  isLayersOverlayOpen: boolean;

  /** Open the list view when true. */
  isListViewOpen: boolean;

  /** Advanced layer which maintains the state for development POI markers. */
  layerDevpoi: Record<string, MarkerState>;

  /** Advanced layer which maintains the state for gym markers. */
  layerGym: Record<string, MarkerState>;

  /** Advanced layer which maintains the state for labels. */
  layerLabel: Record<string, MarkerState>;

  /** Advanced layer which maintains the state for meetup spots. */
  layerMeetupspot: Record<string, MarkerState>;

  /** Advanced layer which maintains the state for parking area markers. */
  layerParking: Record<string, MarkerState>;

  /** Advanced layer which maintains the state for PokeStop markers. */
  layerPokestop: Record<string, MarkerState>;

  /** Advanced layer which maintains the state for power spot markers. */
  layerPowerspot: Record<string, MarkerState>;

  /** Advanced layer which maintains the state for restroom markers. */
  layerRestroom: Record<string, MarkerState>;

  /** Flags that determine which layer modifiers are applied. */
  modifiers: {
    isDisabled: boolean;

    isHidden: boolean;

    removed: boolean;
  };

  mapStart: LatLngTuple;

  /** Coordinates for current my location. */
  myLocation: [number, number] | null;

  /** Value for geolocation position accuracy. */
  myLocationAccuracy: number | null;

  /** Type of range for my location. */
  myLocationRangeType: "location-accuracy" | "poi" | "wild-spawn";

  /** State for placed markers. */
  placedMarkerStates: PlacedMarkerState[];

  /** Remove a placed marker state. */
  removePlacedMarkerState: (i: number) => void;

  /** Reset the settings back to default values. */
  resetSettings: () => void;

  /** Set the `activeMainView` value. */
  setActiveMainView: (val: StoreState["activeMainView"]) => void;

  /** Set the `activePopup` value. */
  setActivePopup: (val: StoreState["activePopup"] | null) => void;

  /** Set the `disableAnimations` value. */
  setDisableAnimations: (val: StoreState["disableAnimations"]) => void;

  /** Set the `isLayersOverlayOpen` value. */
  setIsLayersOverlayOpen: (val: StoreState["isLayersOverlayOpen"]) => void;

  /** Set the `isListViewOpen` value. */
  setIsListViewOpen: (val: StoreState["isListViewOpen"]) => void;

  /** Set marker values for an advanced layer. */
  setLayer: (
    type: CProperties["type"],
    state: MarkerState,
    override?: boolean,
  ) => void;

  /** Set a marker property value. */
  setMarker: (
    type: CProperties["type"],
    id: string,
    state: MarkerState,
    override?: boolean,
  ) => void;

  /** Set the `myLocationAccuracy` value. */
  setMyLocation: (val: StoreState["myLocation"]) => void;

  /** Set the `myLocationAccuracy` value. */
  setMyLocationAccuracy: (val: StoreState["myLocationAccuracy"]) => void;

  /** Set the `myLocationRangeType` value. */
  setMyLocationRangeType: (val: StoreState["myLocationRangeType"]) => void;

  /** Set the `wayfarerMode` value. */
  setWayfarerMode: (val: StoreState["wayfarerMode"]) => void;

  /** Toggle a `basicLayers` property value. */
  toggleBasicLayer: (basicLayerType: keyof StoreState["basicLayers"]) => void;

  /** Toggle the `invertCoords` value. */
  toggleInvertCoords: () => void;

  /** Toggle the `isListViewOpen` value. */
  toggleIsListViewOpen: () => void;

  /** Toggle a modifier value. */
  toggleModifier: (modifier: ModifierType) => void;

  /** Update all placed marker states. */
  updateAllPlacedMarkerStates: (
    state: Partial<PlacedMarkerState>,
    override?: boolean,
  ) => void;

  /** Update a placed marker state. */
  updatePlacedMarkerState: (
    i: number,
    state: Partial<PlacedMarkerState>,
    override?: boolean,
  ) => void;

  /** Enable Wayfarer mode when true. */
  wayfarerMode: boolean;
}

const SHARED_LOCATION_ERR_MSG =
  "An error occurred while trying to load the shared location.";

const DEFAULT_SETTINGS = {
  disableAnimations: false,
  invertCoords: false,
  isHidden: false,
  isDisabled: false,
  myLocationRangeType: "poi" as const,
  removed: false,
  wayfarerMode: false,
};

const isLatLngTuple = (value: unknown): value is LatLngTuple => {
  return (
    Array.isArray(value) &&
    (value.length === 2 || value.length === 3) &&
    value.every((v) => typeof v === "number")
  );
};

const isPlacedMarkerState = (
  s: Partial<PlacedMarkerState>,
): s is PlacedMarkerState => {
  return typeof s.id === "number" && isLatLngTuple(s.position);
};

/**
 * React hook that gives components access to the app's Zustand store.
 */
export const useStore = create<StoreState>()(
  devtools(
    (set) => {
      let disableAnimations = DEFAULT_SETTINGS.disableAnimations;
      if (import.meta.env.VITE_E2E) {
        disableAnimations = true;
      } else if (localStorage.getItem("disableAnimations") === "true") {
        disableAnimations = true;
      }

      let myLocationRangeType: StoreState["myLocationRangeType"] =
        DEFAULT_SETTINGS.myLocationRangeType;
      const savedMyLocationRangeType = localStorage.getItem(
        "myLocationRangeType",
      );
      if (
        savedMyLocationRangeType === "location-accuracy" ||
        savedMyLocationRangeType === "wild-spawn"
      ) {
        myLocationRangeType = savedMyLocationRangeType;
      }

      const initStoreState: StoreState = {
        activePopup: null,

        activeMainView: null,

        addPlacedMarkerState: (position) => {
          const result = set(
            (s) => ({
              placedMarkerStates: [
                ...s.placedMarkerStates,
                {
                  id: `placed-${placedMarkerCount}`,
                  position,
                  isVisible: true,
                },
              ],
            }),
            undefined,
            "addPlacedMarkerState",
          );
          ++placedMarkerCount;

          return result;
        },

        basicLayers: {
          label: true,

          stdRaidPath: true,
        },

        // Disable animations by default for E2E tests to allow visual tests to perform consistently
        disableAnimations,

        // No initial error message will appear by default
        initErrMsg: null,

        // Copied & pasted coordinates will be formatted as `lat,lng`
        invertCoords:
          localStorage.getItem("invertCoords") === "true" ||
          DEFAULT_SETTINGS.invertCoords,

        // Layers overlay starts off closed
        isLayersOverlayOpen: false,

        // TODO: Start with opened list view on desktop and a closed one on mobile
        isListViewOpen: !IS_MOBILE,

        // Advanced layer marker states will be initialized after initStoreState is initialized
        layerDevpoi: {},

        layerGym: {},

        layerLabel: {},

        layerMeetupspot: {},

        layerParking: {},

        layerPokestop: {},

        layerPowerspot: {},

        layerRestroom: {},

        mapStart:
          import.meta.env.VITE_IS_CENTRAL === "true"
            ? CENTER_CENTRAL
            : CENTER_CUP,

        modifiers: {
          // Hide disabled power spots
          isDisabled:
            localStorage.getItem("isDisabled") === "true" ||
            DEFAULT_SETTINGS.isDisabled,

          // Hide hidden POIs
          isHidden:
            localStorage.getItem("isHidden") === "true" ||
            DEFAULT_SETTINGS.isHidden,

          removed:
            localStorage.getItem("removed") === "true" ||
            DEFAULT_SETTINGS.removed,
        },

        // myLocation starts as null until my location functionality is enabled
        myLocation: null,

        // myLocationAccuracy starts as null until my location functionality is enabled
        myLocationAccuracy: null,

        myLocationRangeType,

        placedMarkerStates: [],

        removePlacedMarkerState: (i) =>
          set(
            (s) => ({
              placedMarkerStates: [
                ...s.placedMarkerStates.slice(0, i),
                ...s.placedMarkerStates.slice(i + 1),
              ],
            }),
            undefined,
            "removePlacedMarkerState",
          ),

        resetSettings: () =>
          set(
            () => ({
              ...DEFAULT_SETTINGS,
            }),
            undefined,
            "resetSettings",
          ),

        setActiveMainView: (val) =>
          set(() => ({ activeMainView: val }), undefined, "setActiveMainView"),

        setActivePopup: (val) =>
          set(() => ({ activePopup: val }), undefined, "setActivePopup"),

        setDisableAnimations: (val) =>
          set(
            () => ({ disableAnimations: val }),
            undefined,
            "setDisabledAnimations",
          ),

        setIsLayersOverlayOpen: (val) =>
          set(
            () => ({ isLayersOverlayOpen: val }),
            undefined,
            "setIsLayersOverlayOpen",
          ),

        setIsListViewOpen: (val) =>
          set(() => ({ isListViewOpen: val }), undefined, "setIsListViewOpen"),

        setLayer: (type, state, override) =>
          set(
            (s) => {
              const layerKey = getLayerKeyFromType(type);
              const newState: Partial<
                Record<LayerKey, Record<string, MarkerState>>
              > = {
                [layerKey]: {},
              };
              const newLayer = newState[layerKey];
              const allIds = Object.keys(s[layerKey]);

              if (override) {
                // Completely override a marker's state
                allIds.forEach((id) => {
                  if (!newLayer) {
                    throw new Error("Layer could not be found.");
                  }

                  newLayer[id] = state;
                });
              } else {
                // Merge new state with current state for a marker
                allIds.forEach((id) => {
                  if (!newLayer) {
                    throw new Error("Layer could not be found.");
                  }

                  newLayer[id] = {
                    ...s[layerKey][id],
                    ...state,
                  };
                });
              }

              return newState;
            },
            undefined,
            "setLayer",
          ),

        setMarker: (type, id, state, override) =>
          set(
            (s) => {
              const layerKey = getLayerKeyFromType(type);

              let newMarkerState;
              if (override) {
                newMarkerState = state;
              } else {
                newMarkerState = {
                  ...s[layerKey][id],
                  ...state,
                };
              }

              return {
                [layerKey]: {
                  ...s[layerKey],
                  [id]: newMarkerState,
                },
              };
            },
            undefined,
            "setMarker",
          ),

        setMyLocation: (val) =>
          set(
            () => ({
              myLocation: val,
            }),
            undefined,
            "setMyLocation",
          ),

        setMyLocationAccuracy: (val) =>
          set(
            () => ({
              myLocationAccuracy: val,
            }),
            undefined,
            "setLocationAccuracy",
          ),

        setMyLocationRangeType: (val) =>
          set(
            () => ({
              myLocationRangeType: val,
            }),
            undefined,
            "setMyLocationRangeType",
          ),

        setWayfarerMode: (val) =>
          set(() => ({ wayfarerMode: val }), undefined, "setWayfarerMode"),

        toggleBasicLayer: (basicLayerType) =>
          set(
            (s) => ({
              basicLayers: {
                ...s.basicLayers,
                [basicLayerType]: !s.basicLayers[basicLayerType],
              },
            }),
            undefined,
            "toggleBasicLayer",
          ),

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

        toggleModifier: (m) =>
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

        updateAllPlacedMarkerStates: (state, override) =>
          set(
            (s) => ({
              placedMarkerStates: s.placedMarkerStates.map(
                (currPlacedMarkerState) => {
                  let newMarkerState: PlacedMarkerState;
                  if (override) {
                    if (!isPlacedMarkerState(state)) {
                      throw new Error(
                        "You attempted to completely override a placed marker state with an invalid ID.",
                      );
                    }
                    newMarkerState = state;
                  } else {
                    newMarkerState = {
                      ...currPlacedMarkerState,
                      ...state,
                    };
                  }

                  return newMarkerState;
                },
              ),
            }),
            undefined,
            "updateAllPlacedMarkerStates",
          ),

        updatePlacedMarkerState: (i, state, override) =>
          set(
            (s) => {
              let newMarkerState: PlacedMarkerState;
              if (override) {
                if (!isPlacedMarkerState(state)) {
                  throw new Error(
                    "You attempted to completely override a placed marker state with an invalid ID.",
                  );
                }
                newMarkerState = state;
              } else {
                newMarkerState = {
                  ...s.placedMarkerStates[i],
                  ...state,
                };
              }

              return {
                placedMarkerStates: [
                  ...s.placedMarkerStates.slice(0, i),
                  newMarkerState,
                  ...s.placedMarkerStates.slice(i + 1),
                ],
              };
            },
            undefined,
            "updatePlacedMarkerState",
          ),

        wayfarerMode:
          localStorage.getItem("wayfarerMode") === "true" ||
          DEFAULT_SETTINGS.wayfarerMode,
      };

      const urlParams = new URLSearchParams(window.location.search);
      const idParam = urlParams.get("id");

      // Initialize marker states for each advanced layer
      gymsJson.features.forEach(({ id, geometry }) => {
        if (
          id &&
          idParam &&
          String(id) === idParam &&
          !initStoreState.activePopup
        ) {
          initStoreState.activePopup = String(id);
          initStoreState.layerGym[String(id)] = { isVisible: true };
          initStoreState.mapStart = [
            geometry.coordinates[1],
            geometry.coordinates[0],
          ];
        } else {
          initStoreState.layerGym[String(id)] = { isVisible: true };
        }
      });

      pokestopsJson.features.forEach(({ id, geometry }) => {
        if (
          id &&
          idParam &&
          String(id) === idParam &&
          !initStoreState.activePopup
        ) {
          initStoreState.activePopup = String(id);
          initStoreState.layerPokestop[String(id)] = { isVisible: true };
          initStoreState.mapStart = [
            geometry.coordinates[1],
            geometry.coordinates[0],
          ];
        } else {
          initStoreState.layerPokestop[String(id)] = { isVisible: true };
        }
      });

      powerspotsJson.features.forEach(({ id, geometry }) => {
        if (
          id &&
          idParam &&
          String(id) === idParam &&
          !initStoreState.activePopup
        ) {
          initStoreState.activePopup = String(id);
          initStoreState.layerPowerspot[String(id)] = { isVisible: true };
          initStoreState.mapStart = [
            geometry.coordinates[1],
            geometry.coordinates[0],
          ];
        } else {
          initStoreState.layerPowerspot[String(id)] = { isVisible: true };
        }
      });

      parkingJson.features.forEach(({ id, geometry }) => {
        if (
          id &&
          idParam &&
          String(id) === idParam &&
          !initStoreState.activePopup
        ) {
          initStoreState.activePopup = String(id);
          initStoreState.layerParking[String(id)] = { isVisible: true };
          initStoreState.mapStart = [
            geometry.coordinates[1],
            geometry.coordinates[0],
          ];
        } else {
          initStoreState.layerParking[String(id)] = { isVisible: true };
        }
      });

      meetupspotsJson.features.forEach(({ id, geometry }) => {
        if (
          id &&
          idParam &&
          String(id) === idParam &&
          !initStoreState.activePopup
        ) {
          initStoreState.activePopup = String(id);
          initStoreState.layerMeetupspot[String(id)] = { isVisible: true };
          initStoreState.mapStart = [
            geometry.coordinates[1],
            geometry.coordinates[0],
          ];
        } else {
          initStoreState.layerMeetupspot[String(id)] = { isVisible: true };
        }
      });

      restroomsJson.features.forEach(({ id, geometry }) => {
        if (
          id &&
          idParam &&
          String(id) === idParam &&
          !initStoreState.activePopup
        ) {
          initStoreState.activePopup = String(id);
          initStoreState.layerRestroom[String(id)] = { isVisible: true };
          initStoreState.mapStart = [
            geometry.coordinates[1],
            geometry.coordinates[0],
          ];
        } else {
          initStoreState.layerRestroom[String(id)] = { isVisible: true };
        }
      });

      devpoisJson.features.forEach(({ id, geometry }) => {
        if (
          id &&
          idParam &&
          String(id) === idParam &&
          !initStoreState.activePopup
        ) {
          initStoreState.activePopup = String(id);
          initStoreState.layerDevpoi[String(id)] = { isVisible: true };
          initStoreState.mapStart = [
            geometry.coordinates[1],
            geometry.coordinates[0],
          ];
          initStoreState.wayfarerMode = true;
        } else {
          initStoreState.layerDevpoi[String(id)] = { isVisible: true };
        }
      });

      const latlngTuple = urlParams.get("latlng")?.split(",");
      if (latlngTuple) {
        if (Array.isArray(latlngTuple) && latlngTuple.length === 2) {
          const lat = Number(latlngTuple[0]);
          const lng = Number(latlngTuple[1]);

          if (!isNaN(lat) && !isNaN(lng)) {
            initStoreState.placedMarkerStates.push({
              id: "placed-0",
              position: [lat, lng],
              isVisible: true,
            });
            ++placedMarkerCount;
            initStoreState.mapStart = [lat, lng];
            initStoreState.activePopup =
              initStoreState.placedMarkerStates[0].id;
          } else {
            initStoreState.initErrMsg = SHARED_LOCATION_ERR_MSG;
          }
        } else {
          initStoreState.initErrMsg = SHARED_LOCATION_ERR_MSG;
        }
      }

      if (idParam && !initStoreState.activePopup) {
        initStoreState.initErrMsg = "The shared POI was not found.";
      }

      return initStoreState;
    },
    { name: "cpm-storage" },
  ),
);

/**
 * Get the layer key from the type.
 * @param type `CFeature` `type` property
 * @returns Layer key
 */
export const getLayerKeyFromType = (type: CProperties["type"]): LayerKey => {
  return `layer${capitalize<CProperties["type"]>(type)}`;
};

/**
 * Determines is the interaction radii checkbox is considered on or off.
 * @returns True if at least 1 interaction radius is on, false otherwise
 */
export const useIsInteractionRadiiOn = () =>
  useStore((s) => {
    const layers = [
      s[getLayerKeyFromType("gym")],
      s[getLayerKeyFromType("pokestop")],
      s[getLayerKeyFromType("powerspot")],
      s[getLayerKeyFromType("devpoi")],
    ];

    // If even 1 interaction radius is on in one of the above layers, this will return true
    for (const l of layers) {
      for (const { showInteractionRadius } of Object.values(l)) {
        if (showInteractionRadius) {
          return true;
        }
      }
    }

    // If even 1 interaction radius is on for one of the placed markers, this will return true
    for (const { showInteractionRadius } of s.placedMarkerStates) {
      if (showInteractionRadius) {
        return true;
      }
    }

    return false;
  });

/**
 * Determines if an advanced layer is considered on or off.
 * @param type Layer type
 * @returns True if the layer is on, false otherwise
 */
export const useIsLayerOn = (type: CProperties["type"]) =>
  useStore((s) => {
    // If even 1 marker is visible in a layer, the layer is considered on
    for (const { isVisible } of Object.values(s[getLayerKeyFromType(type)])) {
      if (isVisible) {
        return true;
      }
    }
    return false;
  });

export const useIsNoCaPoiZoneOn = () =>
  useStore((s) => {
    const layers = [
      s[getLayerKeyFromType("gym")],
      s[getLayerKeyFromType("pokestop")],
      s[getLayerKeyFromType("powerspot")],
      s[getLayerKeyFromType("devpoi")],
    ];

    // If even 1 interaction radius is on in one of the above layers, this will return true
    for (const l of layers) {
      for (const { showNoCaPoiZone } of Object.values(l)) {
        if (showNoCaPoiZone) {
          return true;
        }
      }
    }

    // If even 1 interaction radius is on for one of the placed markers, this will return true
    for (const { showNoCaPoiZone } of s.placedMarkerStates) {
      if (showNoCaPoiZone) {
        return true;
      }
    }

    return false;
  });

export const useIsNoPowerSpotZoneOn = () =>
  useStore((s) => {
    const layers = [
      s[getLayerKeyFromType("gym")],
      s[getLayerKeyFromType("pokestop")],
      s[getLayerKeyFromType("powerspot")],
      s[getLayerKeyFromType("devpoi")],
    ];

    // If even 1 interaction radius is on in one of the above layers, this will return true
    for (const l of layers) {
      for (const { showNoPowerSpotZone } of Object.values(l)) {
        if (showNoPowerSpotZone) {
          return true;
        }
      }
    }

    // If even 1 interaction radius is on for one of the placed markers, this will return true
    for (const { showNoPowerSpotZone } of s.placedMarkerStates) {
      if (showNoPowerSpotZone) {
        return true;
      }
    }

    return false;
  });
