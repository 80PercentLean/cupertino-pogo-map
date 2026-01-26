import { Card } from "@/components/ui/card";
import { gymsJson, pokestopsJson, powerSpotsJson } from "@/geojson/data";
import {
  imgGym,
  imgLeafletMarker,
  imgPokeStop,
  imgPowerSpot,
  imgShowcase,
} from "@/leafletIcons";
import type { LatLngExpression } from "leaflet";
import { Search, X } from "lucide-react";
import { useContext, useDeferredValue, useState } from "react";

import { MapContext } from "./MapContext";
import { useStore } from "./hooks/store";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

interface PoiData {
  coordinates: LatLngExpression;
  id: string;
  name: string;
  removed?: boolean | string;
  type: string;
}

export default function ListView() {
  const { map } = useContext(MapContext);
  const showHidden = useStore((s) => s.modifiers.hidden);
  const showInactive = useStore((s) => s.modifiers.inactive);
  const showRemoved = useStore((s) => s.modifiers.removed);
  const [query, setQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(query);

  const setMarkerPopup = useStore((s) => s.setMarkerPopup);

  const pois: PoiData[] = [];

  for (const {
    geometry: { coordinates },
    id,
    properties: { hidden, name, removed, type },
  } of gymsJson.features) {
    if ((!showHidden && hidden) || (!showRemoved && removed)) {
      // Skip if hidden or removed and those modifiers are off
      continue;
    }

    if (
      query === "" ||
      name.toLowerCase().includes(deferredQuery.toLowerCase())
    ) {
      pois.push({
        coordinates: [coordinates[1], coordinates[0]],
        id: id as string,
        name,
        removed,
        type,
      });
    }
  }

  for (const {
    geometry: { coordinates },
    id,
    properties: { hidden, name, removed, type },
  } of pokestopsJson.features) {
    if ((!showHidden && hidden) || (!showRemoved && removed)) {
      // Skip if hidden or removed and those modifiers are off
      continue;
    }

    if (
      query === "" ||
      name.toLowerCase().includes(deferredQuery.toLowerCase())
    ) {
      pois.push({
        coordinates: [coordinates[1], coordinates[0]],
        id: id as string,
        name,
        removed,
        type,
      });
    }
  }

  for (const {
    geometry: { coordinates },
    id,
    properties: { hidden, inactive, name, removed, type },
  } of powerSpotsJson.features) {
    if (
      (!showHidden && hidden) ||
      (!showInactive && inactive) ||
      (!showRemoved && removed)
    ) {
      // Skip if hidden, inactive, or removed and those modifiers are off
      continue;
    }
    if (
      query === "" ||
      name.toLowerCase().includes(deferredQuery.toLowerCase())
    ) {
      pois.push({
        coordinates: [coordinates[1], coordinates[0]],
        id: id as string,
        name,
        removed,
        type,
      });
    }
  }

  pois.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const results = [];

  pois.forEach(({ coordinates, id, name, removed, type }) => {
    let itemClassName =
      "cursor-pointer text-sm px-4 w-full rounded-none justify-start h-12 font-normal";
    if (removed) {
      itemClassName += " line-through";
    }

    let img;
    let alt;
    switch (type) {
      case "Gym":
        img = imgGym;
        alt = "Gyn Icon";
        break;
      case "PokeStop":
        img = imgPokeStop;
        alt = "PokéStop Icon";
        break;
      case "Power Spot":
        img = imgPowerSpot;
        alt = "Power Spot Icon";
        break;
      case "Showcase":
        img = imgShowcase;
        alt = "Showcase Icon";
        break;
      default:
        img = imgLeafletMarker;
        alt = "Default Marker Icon";
    }

    let iconClassName = "h-full w-auto object-contain";
    // TODO: if hidden then make icon greyscale

    let nameClassName = "flex h-full items-center overflow-x-scroll";
    if (removed) {
      nameClassName += " line-through";
    }

    results.push(
      <Button
        key={id}
        variant="ghost"
        className={itemClassName}
        onClick={() => {
          map?.flyTo(coordinates);
          setMarkerPopup(id, true);
        }}
      >
        <div className="relative flex h-full w-8 items-center justify-center">
          <img src={img} alt={alt} className={iconClassName} />
        </div>
        <div className={nameClassName}>{name}</div>
      </Button>,
    );
  });

  if (results.length === 0) {
    results.push(
      <div className="cursor-pointer px-4 text-sm italic">
        No points of interest were found...
      </div>,
    );
  }

  let btnSearchClassName;
  let btnSearchIcon;
  let btnSearchClickHandler;
  if (deferredQuery) {
    btnSearchClassName = "cursor-pointer";
    btnSearchIcon = <X />;
    btnSearchClickHandler = () => setQuery("");
  } else {
    btnSearchClassName = "hover:bg-transparent hover:text-inherit";
    btnSearchIcon = <Search />;
  }

  const btnSearch = (
    <Button
      variant="ghost"
      className={btnSearchClassName}
      onClick={btnSearchClickHandler}
    >
      {btnSearchIcon}
    </Button>
  );

  return (
    <Card className="fixed top-0 left-0 z-999 m-2 max-h-[66vh] w-10 w-100 gap-4 pt-0">
      <InputGroup className="rounded-b-none py-6">
        <InputGroupInput
          placeholder="Search for Gyms, PokéStops, etc."
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />
        <InputGroupAddon align="inline-end">{btnSearch}</InputGroupAddon>
      </InputGroup>
      <div className="h-fit overflow-x-hidden overflow-y-scroll">{results}</div>
    </Card>
  );
}
