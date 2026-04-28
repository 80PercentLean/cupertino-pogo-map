import {
  devpoisJson,
  gymsJson,
  meetupspotsJson,
  parkingJson,
  pokestopsJson,
  powerspotsJson,
  restroomsJson,
} from "@/geojson/data";
import type { CFeature, CProperties } from "@/types/CFeatures";

import { type MarkerState, type PlacedMarkerState, useStore } from "./store";

interface PoiData {
  id: string;
  type:
    | "devpoi"
    | "gym"
    | "meetupspot"
    | "parking"
    | "placed"
    | "pokestop"
    | "powerspot"
    | "restroom";
  data: {
    geometry?: CFeature["geometry"];
    markerState?: MarkerState | PlacedMarkerState;
    properties?: CProperties;
  };
}

/**
 * React hook that returna a function that retrieves POI data by its ID.
 * @returns Function that returns POI data if ID was matched, null otherwise
 */
export const useFindPoiById = () => {
  const layerDevpoi = useStore((s) => s.layerDevpoi);
  const layerGym = useStore((s) => s.layerGym);
  const layerMeetupspot = useStore((s) => s.layerMeetupspot);
  const layerParking = useStore((s) => s.layerParking);
  const layerPokestop = useStore((s) => s.layerPokestop);
  const layerPowerspot = useStore((s) => s.layerPowerspot);
  const layerRestroom = useStore((s) => s.layerRestroom);
  const placedMarkerStates = useStore((s) => s.placedMarkerStates);

  return (id: string): PoiData | null => {
    for (const k of Object.keys(layerGym)) {
      if (k === id) {
        const result: PoiData = {
          id,
          type: "gym",
          data: { markerState: layerGym[k] },
        };

        const f = gymsJson.features.find((f) => String(f.id) === id);
        if (f) {
          result.data.properties = f.properties;
          result.data.geometry = f.geometry;
        }

        return result;
      }
    }

    for (const k of Object.keys(layerPokestop)) {
      if (k === id) {
        const result: PoiData = {
          id,
          type: "pokestop",
          data: { markerState: layerPokestop[k] },
        };

        const f = pokestopsJson.features.find((f) => {
          console.log("check", f, id);
          return String(f.id) === id;
        });
        if (f) {
          result.data.properties = f.properties;
          result.data.geometry = f.geometry;
        }

        return result;
      }
    }

    for (const k of Object.keys(layerPowerspot)) {
      if (k === id) {
        const result: PoiData = {
          id,
          type: "powerspot",
          data: { markerState: layerPowerspot[k] },
        };

        const f = powerspotsJson.features.find((f) => String(f.id) === id);
        if (f) {
          result.data.properties = f.properties;
          result.data.geometry = f.geometry;
        }

        return result;
      }
    }

    for (const k of Object.keys(layerParking)) {
      if (k === id) {
        const result: PoiData = {
          id,
          type: "parking",
          data: { markerState: layerParking[k] },
        };

        const f = parkingJson.features.find((f) => String(f.id) === id);
        if (f) {
          result.data.properties = f.properties;
          result.data.geometry = f.geometry;
        }

        return result;
      }
    }

    for (const k of Object.keys(layerRestroom)) {
      if (k === id) {
        const result: PoiData = {
          id,
          type: "restroom",
          data: { markerState: layerRestroom[k] },
        };

        const f = restroomsJson.features.find((f) => String(f.id) === id);
        if (f) {
          result.data.properties = f.properties;
          result.data.geometry = f.geometry;
        }

        return result;
      }
    }

    for (const k of Object.keys(layerMeetupspot)) {
      if (k === id) {
        const result: PoiData = {
          id,
          type: "meetupspot",
          data: { markerState: layerMeetupspot[k] },
        };

        const f = meetupspotsJson.features.find((f) => String(f.id) === id);
        if (f) {
          result.data.properties = f.properties;
          result.data.geometry = f.geometry;
        }

        return result;
      }
    }

    for (const s of placedMarkerStates) {
      if (s.id === id) {
        const result: PoiData = {
          id: s.id,
          type: "placed",
          data: { markerState: s },
        };

        // TODO: find placed marker

        return result;
      }
    }

    for (const k of Object.keys(layerDevpoi)) {
      if (k === id) {
        const result: PoiData = {
          id,
          type: "devpoi",
          data: { markerState: layerDevpoi[k] },
        };

        const f = devpoisJson.features.find((f) => String(f.id) === id);
        if (f) {
          result.data.properties = f.properties;
          result.data.geometry = f.geometry;
        }

        return result;
      }
    }

    return null;
  };
};
