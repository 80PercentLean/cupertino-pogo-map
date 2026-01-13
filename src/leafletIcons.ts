/**
 * Code for setting up Leaflet icons.
 */
import L from "leaflet";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import imgGym from "./assets/gym.webp";
import imgPokeStop from "./assets/pokestop.webp";
import imgPowerSpot from "./assets/power-spot.webp";
import imgShowcase from "./assets/showcase.webp";

/** Export images. */
export { imgGym, imgPokeStop, imgPowerSpot };

/** Default Leaflet icon. */
const DefaultIcon = L.icon({
  iconAnchor: [12, 41],
  iconRetinaUrl: iconRetina,
  iconSize: [25, 41],
  iconUrl: icon,
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: iconShadow,
  tooltipAnchor: [16, -28],
});
L.Marker.prototype.options.icon = DefaultIcon;

/** Leaflet icon for all/binary gender restrooms. */
export const iconAbRestroom = L.divIcon({
  className: "icon-emoji",
  html: "<div>🚻</div>",
  iconAnchor: [10, 10],
});

/** Leaflet icon for gyms. */
export const iconGym = L.icon({
  iconAnchor: [18, 40],
  iconSize: [37, 40],
  iconUrl: imgGym,
  popupAnchor: [0, -33],
  shadowAnchor: [8, 20],
  shadowSize: [20, 20],
  shadowUrl: markerShadow,
});

/** Leaflet icon for dev POIs. */
export const iconDev = L.divIcon({
  className: "icon-emoji",
  html: "<div>🚧</div>",
  iconAnchor: [10, 10],
});

/** Leaflet icon for meetup spot POIs. */
export const iconMeetupSpot = L.divIcon({
  className: "icon-emoji icon-meetup-spot",
  html: "<div>📍</div>",
  iconAnchor: [15, 30],
  popupAnchor: [0, -20],
});

/** Leaflet icon for men's restrooms. */
export const iconMRestroom = L.divIcon({
  className: "icon-emoji",
  html: "<div>🚹</div>",
  iconAnchor: [10, 10],
});

/** Leaflet icon for parking. */
export const iconParking = L.divIcon({
  className: "icon-emoji",
  html: "<div>🅿️</div>",
  iconAnchor: [10, 10],
});

/** Leaflet icon for parking with restricted conditions. */
export const iconParkingWarn = L.divIcon({
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
export const iconPokeStop = L.icon({
  iconAnchor: [7, 20],
  iconSize: [15, 20],
  iconUrl: imgPokeStop,
  popupAnchor: [0, -13],
});

/** Leaflet icon for power spots. */
export const iconPowerSpot = L.icon({
  iconAnchor: [7, 20],
  iconSize: [15, 20],
  iconUrl: imgPowerSpot,
  popupAnchor: [0, -13],
});

/** Leaflet icon for PokeStops with showcases. */
export const iconShowcase = L.icon({
  iconAnchor: [12, 12],
  iconSize: [24, 25],
  iconUrl: imgShowcase,
});

/** Leaflet icon for women's restrooms. */
export const iconWRestroom = L.divIcon({
  className: "icon-emoji",
  html: "<div>🚺</div>",
  iconAnchor: [10, 10],
});
