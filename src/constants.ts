import type { LatLngTuple } from "leaflet";

export const CENTER_CUP: LatLngTuple = [37.32185397836693, -122.0448660850525];

export const CENTER_CENTRAL: LatLngTuple = [
  37.34153273361254, -121.9753335096175,
];

export const ROOT_PATH = (import.meta.env.VITE_ROOT_PATH as string) ?? "";

export const MAP_PATH = ROOT_PATH ? `${ROOT_PATH}/map` : "map";
