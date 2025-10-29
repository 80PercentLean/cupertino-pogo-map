import L from "leaflet";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

console.log("default icon options", L.Icon.Default.prototype.options);

// L.Icon.Default.prototype.options.iconUrl = icon;
// L.Icon.Default.prototype.options.shadowUrl = iconShadow;

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
