/**
 * Code for setting up Leaflet icons.
 */
import {
  emojiAllBinaryRestroom,
  emojiDevpoi,
  emojiMRestroom,
  emojiParking,
  emojiWRestroom,
  iconRetina,
  iconShadow,
  imgGym,
  imgLeafletMarker,
  imgPokestop,
  imgPowerspot,
  imgShowcase,
  markerShadow,
} from "@/leafletImgs";
import { Marker, type PointTuple, divIcon, icon } from "leaflet";
import { renderToString } from "react-dom/server";

import {
  IconEmojiHighlighted,
  MeetupSpot,
  ParkingWarn,
  ParkingWarnHighlighted,
} from "./leafletJsxComponents";
import { ICON_HIGHLIGHT_COLOR } from "./leafletStyles";

/**
 * Create the tooltip offset value based off a given icon size.
 * @param iconSize Size of the icon as a [width, height] tuple
 */
const createTooltipOffset = (iconSize: PointTuple): PointTuple => {
  return [Math.floor(iconSize[0] / 2), Math.floor(iconSize[1] / 2) * -1];
};

/** Default Leaflet icon. */
export const iconDefault = icon({
  iconAnchor: [12, 41],
  iconRetinaUrl: iconRetina,
  iconSize: [25, 41],
  iconUrl: imgLeafletMarker,
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: iconShadow,
  tooltipAnchor: [16, -28],
});
Marker.prototype.options.icon = iconDefault;

export const jsxDefaultHighlighted = (
  <div className="relative h-[41px] w-[25px]">
    <div
      className={`bg-[${ICON_HIGHLIGHT_COLOR}]/33 pointer-events-none absolute top-1/2 left-1/2 h-[42px] w-[42px] -translate-x-1/2 -translate-y-[60%] rounded-full border border-white`}
    ></div>
    <img
      src={imgLeafletMarker}
      className="absolute top-0 left-0 h-[41px] w-[25px]"
    />
  </div>
);

export const iconDefaultHighlighted = divIcon({
  className: "",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  html: renderToString(jsxDefaultHighlighted),
});

export const jsxAllBinaryRestroom = (
  <div className="text-xl text-shadow-sm" data-poitype="restroom">
    {emojiAllBinaryRestroom}
  </div>
);

/** Leaflet icon for all/binary gender restrooms. */
export const iconAllBinaryRestroom = divIcon({
  className: "",
  html: renderToString(jsxAllBinaryRestroom),
  iconAnchor: [10, 10],
});

export const iconAllBinaryRestroomHighlighted = divIcon({
  className: "",
  iconAnchor: [10, 10],
  html: renderToString(
    <IconEmojiHighlighted>{emojiAllBinaryRestroom}</IconEmojiHighlighted>,
  ),
});

const ICON_GYM_SIZE: PointTuple = [37, 40];

export const ICON_GYM_TOOLTIP_OFFSET = createTooltipOffset(ICON_GYM_SIZE);

/** Leaflet icon for gyms. */
export const iconGym = icon({
  iconAnchor: [18, 40],
  iconSize: ICON_GYM_SIZE,
  iconUrl: imgGym,
  popupAnchor: [0, -33],
  shadowAnchor: [8, 20],
  shadowSize: [20, 20],
  shadowUrl: markerShadow,
});

export const jsxGymHighlighted = (
  <div className="relative h-10 w-[37px]">
    <div
      className={`bg-[${ICON_HIGHLIGHT_COLOR}]/33 pointer-events-none absolute top-1/2 left-1/2 h-[46px] w-[46px] -translate-x-1/2 -translate-y-[55%] rounded-full border-2 border-white`}
    ></div>
    <img src={imgGym} className="absolute top-0 left-0 h-10 w-[37px]" />
  </div>
);

export const iconGymHighlighted = divIcon({
  className: "",
  iconSize: [37, 40],
  iconAnchor: [18, 40],
  popupAnchor: [0, -33],
  html: renderToString(jsxGymHighlighted),
});

export const jsxDevpoi = (
  <div className="text-xl text-shadow-sm" data-poitype="devpoi">
    {emojiDevpoi}
  </div>
);

/** Leaflet icon for dev POIs. */
export const iconDevpoi = divIcon({
  className: "",
  html: renderToString(jsxDevpoi),
  iconAnchor: [10, 10],
});

export const iconDevpoiHighlighted = divIcon({
  className: "",
  iconAnchor: [10, 10],
  html: renderToString(
    <IconEmojiHighlighted>{emojiDevpoi}</IconEmojiHighlighted>,
  ),
});

/** Leaflet icon for meetup spots. */
export const iconMeetupspot = divIcon({
  className: "",
  html: renderToString(<MeetupSpot />),
  iconAnchor: [15, 30],
  popupAnchor: [0, -20],
});

const jsxMeetupSpotHighlighted = (
  <div className="relative h-9 w-9">
    <div
      className={`bg-[${ICON_HIGHLIGHT_COLOR}]/33 pointer-events-none absolute top-1/2 left-1/2 h-[50px] w-[50px] -translate-x-1/2 -translate-y-[58%] rounded-full border-2 border-white`}
    ></div>
    <MeetupSpot className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] leading-none" />
  </div>
);

export const iconMeetupspotHighlighted = divIcon({
  className: "",
  iconAnchor: [15, 30],
  popupAnchor: [0, -20],
  html: renderToString(jsxMeetupSpotHighlighted),
});

export const jsxMRestroom = (
  <div className="text-xl text-shadow-sm" data-poitype="restroom">
    {emojiMRestroom}
  </div>
);

/** Leaflet icon for men's restrooms. */
export const iconMRestroom = divIcon({
  className: "",
  html: renderToString(jsxMRestroom),
  iconAnchor: [10, 10],
});

export const iconMRestroomHighlighted = divIcon({
  className: "",
  iconAnchor: [10, 10],
  html: renderToString(
    <IconEmojiHighlighted>{emojiMRestroom}</IconEmojiHighlighted>,
  ),
});

export const jsxParking = (
  <div className="text-xl text-shadow-sm" data-poitype="parking">
    {emojiParking}
  </div>
);

/** Leaflet icon for parking. */
export const iconParking = divIcon({
  className: "",
  html: renderToString(jsxParking),
  iconAnchor: [10, 10],
});

export const iconParkingHighlighted = divIcon({
  className: "",
  iconAnchor: [10, 10],
  html: renderToString(
    <IconEmojiHighlighted>{emojiParking}</IconEmojiHighlighted>,
  ),
});

/** Leaflet icon for parking with restricted conditions. */
export const iconParkingWarn = divIcon({
  className: "",
  html: renderToString(<ParkingWarn />),
  iconAnchor: [10, 10],
});

export const iconParkingWarnHighlighted = divIcon({
  className: "",
  iconAnchor: [10, 10],
  html: renderToString(<ParkingWarnHighlighted />),
});

const ICON_POKESTOP_SIZE: PointTuple = [15, 20];

export const ICON_POKESTOP_TOOLTIP_OFFSET =
  createTooltipOffset(ICON_POKESTOP_SIZE);

/** Leaflet icon for PokeStops. */
export const iconPokestop = icon({
  iconAnchor: [7, 20],
  iconSize: ICON_POKESTOP_SIZE,
  iconUrl: imgPokestop,
  popupAnchor: [0, -13],
});

export const jsxPokestopHiglighted = (
  <div className="relative h-5 w-[15px]">
    <div
      className={`pointer-events-none absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-[55%] rounded-full border-2 border-white bg-[${ICON_HIGHLIGHT_COLOR}]/33`}
    ></div>
    <img src={imgPokestop} className="absolute top-0 left-0 h-5 w-[15px]" />
  </div>
);

export const iconPokestopHighlighted = divIcon({
  className: "",
  iconSize: [15, 20],
  iconAnchor: [7, 20],
  popupAnchor: [0, -13],
  html: renderToString(jsxPokestopHiglighted),
});

const ICON_POWERSPOT_SIZE: PointTuple = [15, 20];

export const ICON_POWERSPOT_TOOLTIP_OFFSET =
  createTooltipOffset(ICON_POWERSPOT_SIZE);

/** Leaflet icon for power spots. */
export const iconPowerspot = icon({
  iconAnchor: [7, 20],
  iconSize: ICON_POWERSPOT_SIZE,
  iconUrl: imgPowerspot,
  popupAnchor: [0, -13],
});

export const jsxPowerspotHiglighted = (
  <div className="relative h-5 w-[15px]">
    <div
      className={`pointer-events-none absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-[55%] rounded-full border-2 border-white bg-[${ICON_HIGHLIGHT_COLOR}]/33`}
    ></div>
    <img src={imgPowerspot} className="absolute top-0 left-0 h-5 w-[15px]" />
  </div>
);

export const iconPowerspotHighlighted = divIcon({
  className: "",
  iconSize: [15, 20],
  iconAnchor: [7, 20],
  popupAnchor: [0, -13],
  html: renderToString(jsxPowerspotHiglighted),
});

const ICON_SHOWCASE_SIZE: PointTuple = [24, 25];

export const ICON_SHOWCASE_TOOLTIP_OFFSET: PointTuple = [
  ICON_SHOWCASE_SIZE[0] / 2,
  0,
];

/** Leaflet icon for PokeStops with showcases. */
export const iconShowcase = icon({
  iconAnchor: [12, 12],
  iconSize: ICON_SHOWCASE_SIZE,
  iconUrl: imgShowcase,
});

export const jsxShowcaseHighlighted = (
  <div className="relative h-[25px] w-6">
    <div
      className={`pointer-events-none absolute top-1/2 left-1/2 h-[34px] w-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[${ICON_HIGHLIGHT_COLOR}]/33`}
    ></div>
    <img src={imgShowcase} className="absolute top-0 left-0 h-[25px] w-6" />
  </div>
);

export const iconShowcaseHighlighted = divIcon({
  className: "",
  iconSize: [24, 25],
  iconAnchor: [12, 12],
  html: renderToString(jsxShowcaseHighlighted),
});

export const jsxWRestroom = (
  <div className="text-xl text-shadow-sm" data-poitype="restroom">
    {emojiWRestroom}
  </div>
);

/** Leaflet icon for women's restrooms. */
export const iconWRestroom = divIcon({
  className: "",
  html: renderToString(jsxWRestroom),
  iconAnchor: [10, 10],
});

export const iconWRestroomHighlighted = divIcon({
  className: "",
  iconAnchor: [10, 10],
  html: renderToString(
    <IconEmojiHighlighted>{emojiWRestroom}</IconEmojiHighlighted>,
  ),
});
