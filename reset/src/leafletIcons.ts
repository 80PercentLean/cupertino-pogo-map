import L from "leaflet";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import gymIcon from "./assets/raw/gym-icon.png";
import pokeStopIcon from "./assets/raw/pokestop-icon2.png";
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
  iconSize: [50, 50],
  iconUrl: gymIcon,
  shadowSize: [20, 20],
  shadowAnchor: [8, 0],
  shadowUrl: markerShadow,
});

export const iconPokeStop = L.icon({
  iconUrl: pokeStopIcon,
  iconSize: [40, 40],
});

export const iconPowerSpot = L.icon({
  iconUrl: powerSpotIcon,
  iconSize: [25, 25],
});
