import type { LatLngTuple } from "leaflet";

export const CENTER_CUP: LatLngTuple = [37.32185397836693, -122.0448660850525];

export const CENTER_CENTRAL: LatLngTuple = [
  37.34153273361254, -121.9753335096175,
];

export const IS_CENTRAL = import.meta.env.VITE_IS_CENTRAL === "true";

export const GROUP_NAME = IS_CENTRAL
  ? "Wild\u00A0Goose"
  : "Cupertino PoGO\u00A0Group";

export const ROOT_PATH = (import.meta.env.VITE_ROOT_PATH as string) ?? "";

export const MAP_PATH = ROOT_PATH ? `${ROOT_PATH}/map` : "map";

export const CUP_POGO_CAMPFIRE =
  "https://campfire.onelink.me/eBr8?af_dp=campfire://&af_force_deeplink=true&deep_link_sub1=cj1jbHVicyZjPTk4MjZkY2U4LTZhM2ItNDQxNC05N2M1LTg1NzYzNDYzY2VmNSZpPXRydWU=";

export const WG_CAMPFIRE =
  "https://campfire.onelink.me/eBr8?af_dp=campfire://&af_force_deeplink=true&deep_link_sub1=cj1jbHVicyZjPWE4M2FmMzljLTRiNTgtNGM2NC1iZjViLTYwMTM4Yzc2MzNjNyZpPXRydWU=";
