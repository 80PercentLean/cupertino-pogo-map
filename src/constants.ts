import type { LatLngTuple } from "leaflet";

import { isMobileUa } from "./util";

export const CENTER_CUP: LatLngTuple = [37.32185397836693, -122.0448660850525];

export const CENTER_CENTRAL: LatLngTuple = [
  37.34247493936612, -121.97542905807497,
];

export const IS_MOBILE = isMobileUa();

export const ROOT_PATH = "/cupertino-pogo-map";

export const MAP_PATH = `${ROOT_PATH}/map`;
