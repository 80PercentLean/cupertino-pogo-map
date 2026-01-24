import { gymsJson } from "@/geojson/data";
import type { LatLngExpression } from "leaflet";
import { Fragment, useContext } from "react";

import { MapContext } from "./MapContext";
import { useStore } from "./hooks/store";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface GymData {
  coordinates: LatLngExpression;
  id: string;
  name: string;
  removed?: boolean | string;
}

export default function ListView() {
  const { map } = useContext(MapContext);
  const showHidden = useStore((s) => s.modifiers.hidden);
  const showRemoved = useStore((s) => s.modifiers.removed);

  const setMarkerPopup = useStore((s) => s.setMarkerPopup);

  const gyms: GymData[] = [];

  for (const {
    geometry: { coordinates },
    id,
    properties: { hidden, name, removed },
  } of gymsJson.features) {
    if ((!showHidden && hidden) || (!showRemoved && removed)) {
      // Skip if hidden or removed and those modifiers are off
      continue;
    }

    gyms.push({
      coordinates: [coordinates[1], coordinates[0]],
      id: id as string,
      name,
      removed,
    });
  }

  return (
    <div className="fixed top-0 left-0 z-999 m-2">
      <ScrollArea className="h-[66vh] w-100 rounded-md border bg-white p-4">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">
            List of POIs
          </h4>
          {gyms.map(({ coordinates, id, name, removed }) => {
            let itemClassName = "cursor-pointer text-sm";
            if (removed) {
              itemClassName += " line-through";
            }

            return (
              <Fragment key={id}>
                <div
                  className={itemClassName}
                  onClick={() => {
                    map?.flyTo(coordinates);
                    setMarkerPopup(id, true);
                  }}
                >
                  {name}
                </div>
                <Separator className="my-2" />
              </Fragment>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
