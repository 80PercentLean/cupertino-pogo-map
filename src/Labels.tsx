import L from "leaflet";
import { GeoJSON } from "react-leaflet";

import { labelsJson } from "./geojson/data";
import {
  labelDa,
  labelFujitsu,
  labelHinson,
  labelMlc,
  labelMp,
  labelMpTennis,
  labelQuinlan,
  labelSenior,
  labelVeterans,
} from "./leafletLabels";
import type { LabelFeature } from "./types";

/**
 * React Leaflet's <GeoJSON> specialized for rendering text on the map which we call labels.
 */
export default function Labels() {
  return (
    <GeoJSON
      data={labelsJson}
      // @ts-expect-error Causes a type error because the else condition doesn't return a marker, but the code works fine
      pointToLayer={({ properties }, latlng) => {
        const labelProperties = properties as LabelFeature["properties"];

        let icon;
        switch (labelProperties.name) {
          case "Memorial Park":
            icon = labelMp;
            break;
          case "Veteran's Memorial":
            icon = labelVeterans;
            break;
          case "Quinlan Community Center":
            icon = labelQuinlan;
            break;
          case "Memorial Park Tennis Courts":
            icon = labelMpTennis;
            break;
          case "De Anza College":
            icon = labelDa;
            break;
          case "Senior Center":
            icon = labelSenior;
            break;
          case "Hinson Campus Center":
            icon = labelHinson;
            break;
          case "Media & Learning Center":
            icon = labelMlc;
            break;
          case "Fujitsu Planetarium":
            icon = labelFujitsu;
            break;
          default:
            // Label could not be matched with an icon
            console.warn(
              "Encountered a label without an icon:",
              labelProperties.name,
            );
            return;
        }

        const marker = L.marker(latlng, { icon, interactive: false });

        return marker;
      }}
    />
  );
}
