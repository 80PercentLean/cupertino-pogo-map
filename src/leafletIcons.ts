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

/** Export images. */
export { imgGym, imgLeafletMarker, imgPokestop, imgPowerspot, imgShowcase };

/** Emoji for dev POI. */
export const emojiDevpoi = "🚧";

/** Emoji for meetup spots. */
export const emojiMeetupspot = "📍";

/** Emoji for parking areas. */
export const emojiParking = "🅿️";

/** Emoji for all-gender/binary restrooms. */
export const emojiAllBinaryRestroom = "🚻";

/** Emoji for male restrooms. */
export const emojiMRestroom = "🚹";

/** Emoji for female restrooms. */
export const emojiFRestroom = "🚺";

/** Default Leaflet icon. */
const DefaultIcon = icon({
  iconAnchor: [12, 41],
  iconRetinaUrl: iconRetina,
  iconSize: [25, 41],
  iconUrl: imgLeafletMarker,
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: iconShadow,
  tooltipAnchor: [16, -28],
});
Marker.prototype.options.icon = DefaultIcon;

/** Leaflet icon for all/binary gender restrooms. */
export const iconAllBinaryRestroom = divIcon({
  className: "icon-emoji",
  html: `<div>${emojiAllBinaryRestroom}</div>`,
  iconAnchor: [10, 10],
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

/** Leaflet icon for dev POIs. */
export const iconDevpoi = divIcon({
  className: "icon-emoji",
  html: `<div>${emojiDevpoi}</div>`,
  iconAnchor: [10, 10],
});

/** Leaflet icon for meetup spots. */
export const iconMeetupspot = divIcon({
  className: "icon-emoji icon-meetup-spot",
  html: `<div>${emojiMeetupspot}</div>`,
  iconAnchor: [15, 30],
  popupAnchor: [0, -20],
});

/** Leaflet icon for men's restrooms. */
export const iconMRestroom = divIcon({
  className: "icon-emoji",
  html: `<div>${emojiMRestroom}</div>`,
  iconAnchor: [10, 10],
});

/** Leaflet icon for parking. */
export const iconParking = divIcon({
  className: "icon-emoji",
  html: `<div>${emojiParking}</div>`,
  iconAnchor: [10, 10],
});

/** Leaflet icon for parking with restricted conditions. */
export const iconParkingWarn = divIcon({
  className: "icon-emoji",
  html: `
  <div class="relative inline-block">
    🅿️
    <div class="absolute -top-0 -right-1 flex items-center justify-center bg-yellow-400 text-black rounded-full w-3 h-3 text-xs font-bold ring-1 ring-black">
      !
    </div>
  </div>
  `,
  iconAnchor: [10, 10],
});

/** Leaflet icon for PokeStops. */
export const iconPokestop = icon({
  iconAnchor: [7, 20],
  iconSize: [15, 20],
  iconUrl: imgPokestop,
  popupAnchor: [0, -13],
});

/** Leaflet icon for power spots. */
export const iconPowerspot = icon({
  iconAnchor: [7, 20],
  iconSize: [15, 20],
  iconUrl: imgPowerspot,
  popupAnchor: [0, -13],
});

/** Leaflet icon for PokeStops with showcases. */
export const iconShowcase = icon({
  iconAnchor: [12, 12],
  iconSize: [24, 25],
  iconUrl: imgShowcase,
});

/** Leaflet icon for women's restrooms. */
export const iconWRestroom = divIcon({
  className: "icon-emoji",
  html: `<div>${emojiFRestroom}</div>`,
  iconAnchor: [10, 10],
});
