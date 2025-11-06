import type { GeoJSON as GeoJSONType } from "geojson";
import L from "leaflet";
import { GeoJSON } from "react-leaflet";

import labels from "./geojson/labels.geojson?raw";
import { labelMp, labelQuinlan, labelVeterans } from "./leafletLabels";
import type { LabelFeature } from "./types";

const labelsJson = JSON.parse(labels) as GeoJSONType;

export default function Labels() {
  return (
    <GeoJSON
      data={labelsJson}
      interactive={false}
      // @ts-expect-error Causes a type error because the else condition doesn't return a marker, but the code works fine
      pointToLayer={({ properties }, latlng) => {
        let icon;
        const labelProperties = properties as LabelFeature["properties"];
        if (labelProperties.name === "Memorial Park") {
          icon = labelMp;
        } else if (labelProperties.name === "Veteran's Memorial") {
          icon = labelVeterans;
        } else if (labelProperties.name === "Quinlan Community Center") {
          icon = labelQuinlan;
        } else {
          // Label could not be matched with an icon
          return;
        }

        const marker = L.marker(latlng, { icon });

        return marker;
      }}
    />
  );
}
