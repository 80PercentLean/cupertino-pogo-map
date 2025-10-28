import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.prototype.options.iconUrl = icon;
L.Icon.Default.prototype.options.shadowUrl = iconShadow;
