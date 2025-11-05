import type { GeoJSON } from "geojson";
import L from "leaflet";

import Poi from "./Poi";
import labels from "./geojson/labels.geojson?raw";
import { labelMp, labelQuinlan, labelVeterans } from "./leafletLabels";
import type { PoiFeature } from "./types";

const labelsJson = JSON.parse(labels) as GeoJSON;

export default function Labels() {
  return (
    <Poi
      data={labelsJson}
      interactive={false}
      pointToLayer={({ properties }, latlng) => {
        let icon;
        const poiProperties = properties as PoiFeature["properties"];
        if (poiProperties.name === "Memorial Park") {
          icon = labelMp;
        } else if (poiProperties.name === "Veteran's Memorial") {
          icon = labelVeterans;
        } else if (poiProperties.name === "Quinlan Community Center") {
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
