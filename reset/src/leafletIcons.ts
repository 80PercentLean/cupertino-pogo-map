import L from "leaflet";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import gymIcon from "./assets/raw/gym-icon.png";
import pokeStopIcon from "./assets/raw/pokestop-icon3.png";
import powerSpotIcon from "./assets/raw/power-spot-icon.png";

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

export const iconGym = L.icon({
  iconAnchor: [25, 41],
  iconSize: [50, 50],
  iconUrl: gymIcon,
  popupAnchor: [0, -30],
  shadowAnchor: [8, 16],
  shadowSize: [20, 20],
  shadowUrl: markerShadow,
});

export const iconPokeStop = L.icon({
  iconUrl: pokeStopIcon,
  iconSize: [30, 30],
  popupAnchor: [0, -10],
});

export const iconPowerSpot = L.icon({
  iconAnchor: [12, 24],
  iconSize: [25, 25],
  iconUrl: powerSpotIcon,
  popupAnchor: [0, -20],
  // shadowAnchor: [3, 9],
  // shadowSize: [10, 10],
  // shadowUrl: markerShadow,
});

export const iconDev = L.divIcon({
  className: "icon-dev",
  html: "<div>🚧</div>",
  iconAnchor: [10, 10],
});
