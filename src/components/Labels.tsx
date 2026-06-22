import { GET_IS_CENTRAL } from "@/constants";
import { labelsJson } from "@/geojson/data";
import { marker } from "leaflet";
import { GeoJSON } from "react-leaflet";

import { labelsIconsCentral, labelsIconsMpDa } from "../leafletLabels";
import type { CFeature } from "../types/CFeatures";

const labelIcons = GET_IS_CENTRAL() ? labelsIconsCentral : labelsIconsMpDa;

/**
 * React Leaflet's <GeoJSON> specialized for rendering text on the map which we call labels.
 */
export default function Labels() {
  return (
    <GeoJSON
      data={labelsJson}
      // @ts-expect-error Causes a type error because the else condition doesn't return a marker, but the code works fine
      pointToLayer={({ properties }, latlng) => {
        const { labelClass, name } = properties as CFeature["properties"];

        let icon;

        if (labelClass) {
          for (const labelIcon of labelIcons) {
            if (labelIcon.options.className?.includes(labelClass)) {
              icon = labelIcon;
              break;
            }
          }
        }

        if (!icon) {
          console.warn("Encountered a label without an icon:", name);
          return;
        }

        return marker(latlng, { icon, interactive: false });
      }}
    />
  );
}
