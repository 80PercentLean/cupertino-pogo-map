import type { FeatureCollection, Geometry } from "geojson";
import L from "leaflet";
import type { RefAttributes } from "react";
import { GeoJSON, type GeoJSONProps } from "react-leaflet";

import type { CFeature } from "../../types";

/**
 * Generic React Leaflet <GeoJSON> specialized for rendering POIs.
 */
export default function Poi(
  props: GeoJSONProps &
    RefAttributes<L.GeoJSON<FeatureCollection<Geometry, CFeature>, Geometry>>,
) {
  const filterDefault = (feature: CFeature) => {
    if (feature.properties.removed) {
      return false;
    }
    return true;
  };

  return <GeoJSON {...props} filter={props.filter ?? filterDefault} />;
}
