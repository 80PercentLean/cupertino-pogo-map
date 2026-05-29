/**
 * Code for setting up Leaflet icons.
 */
import { Marker, divIcon, icon } from "leaflet";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import imgLeafletMarker from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import imgGym from "./assets/gym.webp";
import imgPokestop from "./assets/pokestop.webp";
import imgPowerspot from "./assets/power-spot.webp";
import imgShowcase from "./assets/showcase.webp";

/**
 * Create the HTML used for a highlighted emoji icon
 * @param emoji Emoji to use as icon
 * @returns HTML for a highlighted emoji icon
 */
const createIconEmojiHighlightedHtml = (emoji: string) => `
    <div style="
      position: relative;
      width: 24px;
      height: 24px;
    ">
      <div style="
        position: absolute;
        left: 50%;
        top: 50%;
        width: 34px;
        height: 34px;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.75);
        border: 2px solid #fff;
        border-radius: 9999px;
        pointer-events: none;
      "></div>
      <div
        class="icon-emoji"
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          line-height: 1;"
      >
        ${emoji}
      </div>
    </div>
`;

/** Export images. */
export { imgGym, imgLeafletMarker, imgPokestop, imgPowerspot, imgShowcase };

/** Emoji for all-gender/binary restrooms. */
export const emojiAllBinaryRestroom = "🚻";

/** Emoji for dev POI. */
export const emojiDevpoi = "🚧";

/** Emoji for meetup spots. */
export const emojiMeetupspot = "📍";

/** Emoji for parking areas. */
export const emojiParking = "🅿️";

/** Emoji for male restrooms. */
export const emojiMRestroom = "🚹";

/** Emoji for female restrooms. */
export const emojiWRestroom = "🚺";

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

export const iconDefaultHighlighted = divIcon({
  className: "",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],

  html: `
    <div style="
      position: relative;
      width: 25px;
      height: 41px;
    ">
      <div style="
        position: absolute;
        left: 50%;
        top: 50%;
        width: 42px;
        height: 42px;
        transform: translate(-50%, -60%);
        background: rgba(255, 255, 255, 0.6);
        border: 1px solid #fff;
        border-radius: 9999px;
        pointer-events: none;
      "></div>
      <img
        src="${imgLeafletMarker}"
        style="
          position: absolute;
          left: 0;
          top: 0;
          width: 25px;
          height: 41px;
        "
      />
    </div>
  `,
});

/** Leaflet icon for all/binary gender restrooms. */
export const iconAllBinaryRestroom = divIcon({
  className: "icon-emoji",
  html: `<div>${emojiAllBinaryRestroom}</div>`,
  iconAnchor: [10, 10],
});

export const iconAllBinaryRestroomHighlighted = divIcon({
  className: "",
  iconAnchor: [10, 10],
  html: createIconEmojiHighlightedHtml(emojiAllBinaryRestroom),
});

/** Leaflet icon for gyms. */
export const iconGym = icon({
  iconAnchor: [18, 40],
  iconSize: [37, 40],
  iconUrl: imgGym,
  popupAnchor: [0, -33],
  shadowAnchor: [8, 20],
  shadowSize: [20, 20],
  shadowUrl: markerShadow,
});

export const iconGymHighlighted = divIcon({
  className: "",
  iconSize: [37, 40],
  iconAnchor: [18, 40],
  popupAnchor: [0, -33],
  html: `
    <div style="
      position: relative;
      width: 37px;
      height: 40px;
    ">
      <div style="
        position: absolute;
        left: 50%;
        top: 50%;
        width: 46px;
        height: 46px;
        transform: translate(-50%, -55%);
        background: rgba(255, 255, 255, 0.75);
        border: 2px solid #fff;
        border-radius: 9999px;
        pointer-events: none;
      "></div>
      <img
        src="${imgGym}"
        style="
          position: absolute;
          left: 0;
          top: 0;
          width: 37px;
          height: 40px;
        "
      />
    </div>
  `,
});

/** Leaflet icon for dev POIs. */
export const iconDevpoi = divIcon({
  className: "icon-emoji",
  html: `<div>${emojiDevpoi}</div>`,
  iconAnchor: [10, 10],
});

export const iconDevpoiHighlighted = divIcon({
  className: "", // override default class to avoid conflicts
  iconAnchor: [10, 10],
  html: createIconEmojiHighlightedHtml(emojiDevpoi),
});

/** Leaflet icon for meetup spots. */
export const iconMeetupspot = divIcon({
  className: "icon-emoji icon-meetup-spot",
  html: `<div>${emojiMeetupspot}</div>`,
  iconAnchor: [15, 30],
  popupAnchor: [0, -20],
});

export const iconMeetupspotHighlighted = divIcon({
  className: "",
  iconAnchor: [15, 30],
  popupAnchor: [0, -20],
  html: `
    <div style="
      position: relative;
      width: 36px;
      height: 36px;
    ">
      <div style="
        position: absolute;
        left: 50%;
        top: 50%;
        width: 50px;
        height: 50px;
        transform: translate(-50%, -58%);
        background: rgba(255, 255, 255, 0.75);
        border: 2px solid #fff;
        border-radius: 9999px;
        pointer-events: none;
      "></div>
      <div
        class="icon-emoji icon-meetup-spot"
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -58%);
          font-size: 30px;
          line-height: 1;
        "
      >
        ${emojiMeetupspot}
      </div>
    </div>
  `,
});

/** Leaflet icon for men's restrooms. */
export const iconMRestroom = divIcon({
  className: "icon-emoji",
  html: `<div>${emojiMRestroom}</div>`,
  iconAnchor: [10, 10],
});

export const iconMRestroomHighlighted = divIcon({
  className: "",
  iconAnchor: [10, 10],
  html: createIconEmojiHighlightedHtml(emojiMRestroom),
});

/** Leaflet icon for parking. */
export const iconParking = divIcon({
  className: "icon-emoji",
  html: `<div>${emojiParking}</div>`,
  iconAnchor: [10, 10],
});

export const iconParkingHighlighted = divIcon({
  className: "",
  iconAnchor: [10, 10],
  html: createIconEmojiHighlightedHtml(emojiParking),
});

/** Leaflet icon for parking with restricted conditions. */
export const iconParkingWarn = divIcon({
  className: "icon-emoji",
  html: `
  <div class="relative inline-block">
    ${emojiParking}
    <div class="absolute top-0 right-1 flex items-center justify-center bg-yellow-400 text-black rounded-full w-3 h-3 text-xs font-bold ring-1 ring-black">
      !
    </div>
  </div>
  `,
  iconAnchor: [10, 10],
});

export const iconParkingWarnHighlighted = divIcon({
  className: "",
  iconAnchor: [10, 10],
  html: `
    <div style="
      position: relative;
      width: 26px;
      height: 26px;
    ">
      <div style="
        position: absolute;
        left: 50%;
        top: 50%;
        width: 36px;
        height: 36px;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.75);
        border: 2px solid #fff;
        border-radius: 9999px;
        pointer-events: none;
      "></div>
      <div
        class="icon-emoji"
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          line-height: 1;
        "
      >
        <div style="position: relative; display: inline-block;">
          ${emojiParking}
          <div style="
            position: absolute;
            top: 0;
            right: -4px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #facc15;
            color: black;
            border-radius: 9999px;
            width: 12px;
            height: 12px;
            font-size: 10px;
            font-weight: bold;
            box-shadow: 0 0 0 1px black;
          ">
            !
          </div>
        </div>
      </div>
    </div>
  `,
});

/** Leaflet icon for PokeStops. */
export const iconPokestop = icon({
  iconAnchor: [7, 20],
  iconSize: [15, 20],
  iconUrl: imgPokestop,
  popupAnchor: [0, -13],
});

export const iconPokestopHighlighted = divIcon({
  className: "",
  iconSize: [15, 20],
  iconAnchor: [7, 20],
  popupAnchor: [0, -13],
  html: `
    <div style="
      position: relative;
      width: 15px;
      height: 20px;
    ">
      <div style="
        position: absolute;
        left: 50%;
        top: 50%;
        width: 24px;
        height: 24px;
        transform: translate(-50%, -55%);
        background: rgba(255, 255, 255, 0.75);
        border: 2px solid #fff;
        border-radius: 9999px;
        pointer-events: none;
      "></div>
      <img
        src="${imgPokestop}"
        style="
          position: absolute;
          left: 0;
          top: 0;
          width: 15px;
          height: 20px;
        "
      />
    </div>
  `,
});

/** Leaflet icon for power spots. */
export const iconPowerspot = icon({
  iconAnchor: [7, 20],
  iconSize: [15, 20],
  iconUrl: imgPowerspot,
  popupAnchor: [0, -13],
});

export const iconPowerspotHighlighted = divIcon({
  className: "",
  iconSize: [15, 20],
  iconAnchor: [7, 20],
  popupAnchor: [0, -13],
  html: `
    <div style="
      position: relative;
      width: 15px;
      height: 20px;
    ">
      <div style="
        position: absolute;
        left: 50%;
        top: 50%;
        width: 24px;
        height: 24px;
        transform: translate(-50%, -55%);
        background: rgba(255, 255, 255, 0.75);
        border: 2px solid #fff;
        border-radius: 9999px;
        pointer-events: none;
      "></div>
      <img
        src="${imgPowerspot}"
        style="
          position: absolute;
          left: 0;
          top: 0;
          width: 15px;
          height: 20px;
        "
      />
    </div>
  `,
});

/** Leaflet icon for PokeStops with showcases. */
export const iconShowcase = icon({
  iconAnchor: [12, 12],
  iconSize: [24, 25],
  iconUrl: imgShowcase,
});

export const iconShowcaseHighlighted = divIcon({
  className: "",
  iconSize: [24, 25],
  iconAnchor: [12, 12],
  html: `
    <div style="
      position: relative;
      width: 24px;
      height: 25px;
    ">
      <div style="
        position: absolute;
        left: 50%;
        top: 50%;
        width: 34px;
        height: 34px;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.75);
        border: 2px solid #fff;
        border-radius: 9999px;
        pointer-events: none;
      "></div>
      <img
        src="${imgShowcase}"
        style="
          position: absolute;
          left: 0;
          top: 0;
          width: 24px;
          height: 25px;
        "
      />
    </div>
  `,
});

/** Leaflet icon for women's restrooms. */
export const iconWRestroom = divIcon({
  className: "icon-emoji",
  html: `<div>${emojiWRestroom}</div>`,
  iconAnchor: [10, 10],
});

export const iconWRestroomHighlighted = divIcon({
  className: "",
  iconAnchor: [10, 10],
  html: createIconEmojiHighlightedHtml(emojiWRestroom),
});
