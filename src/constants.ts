import type { LatLngTuple } from "leaflet";

export const CENTER_CUP: LatLngTuple = [37.32185397836693, -122.0448660850525];

export const CENTER_CENTRAL: LatLngTuple = [
  37.34153273361254, -121.9753335096175,
];

/**
 * An alternate way to read VITE_IS_CENTRAL through a function.
 * It exists so it can be stubbed by Vitest for certain tests, but from the regular
 * app runtime perspective it is no different than directly reading IS_CENTRAL.
 */
export const GET_IS_CENTRAL = () => import.meta.env.VITE_IS_CENTRAL === "true";

export const IS_CENTRAL = GET_IS_CENTRAL();

/**
 * An alternate way to read GROUP_NAME through a function.
 * It exists so it can be stubbed by Vitest for certain tests, but from the regular
 * app runtime perspective it is no different than directly reading GROUP_NAME.
 */
export const GET_GROUP_NAME = () =>
  GET_IS_CENTRAL() ? "Wild\u00A0Goose" : "Cupertino\u00A0PoGO";

export const GROUP_NAME = IS_CENTRAL
  ? "Wild\u00A0Goose"
  : "Cupertino\u00A0PoGO";

export const ROOT_PATH = (import.meta.env.VITE_ROOT_PATH as string) ?? "";

export const CAMPFIRE_PATH = ROOT_PATH ? `${ROOT_PATH}/contact` : "/campfire";

export const CHECK_IN_PATH = ROOT_PATH ? `${ROOT_PATH}/checkin` : "/checkin";

export const CONTACT_PATH = ROOT_PATH ? `${ROOT_PATH}/contact` : "/contact";

export const DISCORD_PATH = ROOT_PATH ? `${ROOT_PATH}/discord` : "/discord";

export const MAP_PATH = ROOT_PATH ? `${ROOT_PATH}/map` : "/map";

export const CUP_POGO_CAMPFIRE =
  "https://campfire.onelink.me/eBr8?af_dp=campfire://&af_force_deeplink=true&deep_link_sub1=cj1jbHVicyZjPTk4MjZkY2U4LTZhM2ItNDQxNC05N2M1LTg1NzYzNDYzY2VmNSZpPXRydWU=";

export const WG_CAMPFIRE =
  "https://campfire.onelink.me/eBr8?af_dp=campfire://&af_force_deeplink=true&deep_link_sub1=cj1jbHVicyZjPWE4M2FmMzljLTRiNTgtNGM2NC1iZjViLTYwMTM4Yzc2MzNjNyZpPXRydWU=";

/**
 * An alternate way to read CAMPFIRE_LINK through a function.
 * It exists so it can be stubbed by Vitest for certain tests, but from the regular
 * app runtime perspective it is no different than directly reading CAMPFIRE_LINK.
 */
export const GET_CAMPFIRE_LINK = () =>
  GET_IS_CENTRAL() ? WG_CAMPFIRE : CUP_POGO_CAMPFIRE;

export const CAMPFIRE_LINK = IS_CENTRAL ? WG_CAMPFIRE : CUP_POGO_CAMPFIRE;

export const CONTACT_FORM_LINK = "https://forms.gle/SYu9SQgsJcfghVTP9";

export const DISCORD_LINK = "https://discord.gg/7tZ2cauare";

/**
 * An alternate way to read CITY through a function.
 * It exists so it can be stubbed by Vitest for certain tests, but from the regular
 * app runtime perspective it is no different than directly reading CITY.
 */
export const GET_CITY = () => (GET_IS_CENTRAL() ? "Santa Clara" : "Cupertino");

export const CITY = IS_CENTRAL ? "Santa Clara" : "Cupertino";

/**
 * An alternate way to read LOCATION through a function.
 * It exists so it can be stubbed by Vitest for certain tests, but from the regular
 * app runtime perspective it is no different than directly reading LOCATION.
 */
export const GET_LOCATION = () =>
  GET_IS_CENTRAL()
    ? "Santa Clara Central Park"
    : "Cupertino Memorial Park & De Anza College";

export const LOCATION = IS_CENTRAL
  ? "Santa Clara Central Park"
  : "Cupertino Memorial Park & De Anza College";

export const GET_LOCATION_LONG = () =>
  GET_IS_CENTRAL()
    ? "Central Park, Santa Clara, California"
    : "Memorial Park & De Anza College, Cupertino, California";

export const LOCATION_LONG = IS_CENTRAL
  ? "Central Park, Santa Clara, California"
  : "Memorial Park & De Anza College, Cupertino, California";
