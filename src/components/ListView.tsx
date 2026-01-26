import { Card } from "@/components/ui/card";
import { gymsJson } from "@/geojson/data";
import type { LatLngExpression } from "leaflet";
import { Search } from "lucide-react";
import { Fragment, useContext, useDeferredValue, useState } from "react";

import { MapContext } from "./MapContext";
import { useStore } from "./hooks/store";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
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
  const [query, setQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(query);

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

    if (
      query === "" ||
      name.toLowerCase().includes(deferredQuery.toLowerCase())
    ) {
      gyms.push({
        coordinates: [coordinates[1], coordinates[0]],
        id: id as string,
        name,
        removed,
      });
    }
  }

  const results = [];

  gyms.forEach(({ coordinates, id, name, removed }, i) => {
    let itemClassName = "cursor-pointer text-sm px-4";
    if (removed) {
      itemClassName += " line-through";
    }

    results.push(
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
        {i < gyms.length - 1 && <Separator className="my-2" />}
      </Fragment>,
    );
  });

  if (results.length === 0) {
    results.push(
      <div className="cursor-pointer px-4 text-sm italic">
        No points of interest were found...
      </div>,
    );
  }

  return (
    <Card className="fixed top-0 left-0 z-999 m-2 max-h-[66vh] w-10 w-100 gap-4 pt-0">
      <InputGroup className="rounded-b-none py-6">
        <InputGroupInput
          placeholder="Search for Gyms, PokéStops, etc."
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />
        <InputGroupAddon align="inline-end">
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <div className="h-fit overflow-y-scroll">{results}</div>
    </Card>
  );
}
