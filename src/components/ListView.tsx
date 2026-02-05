import { Card } from "@/components/ui/card";
import { gymsJson, pokestopsJson, powerspotsJson } from "@/geojson/data";
import {
  imgGym,
  imgLeafletMarker,
  imgPokeStop,
  imgPowerSpot,
  imgShowcase,
} from "@/leafletIcons";
import { type CProperties } from "@/types";
import type { LatLngExpression } from "leaflet";
import { Eye, EyeClosed, Search, X } from "lucide-react";
import { useContext, useDeferredValue, useState } from "react";

import { MapContext } from "./MapContext";
import { useStore } from "./hooks/store";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

interface PoiData {
  coordinates: LatLngExpression;
  id: string;
  name: CProperties["name"];
  removed?: CProperties["removed"];
  subtype?: CProperties["subtype"];
  type: CProperties["type"];
}

export default function ListView() {
  const { map } = useContext(MapContext);
  const activePopup = useStore((s) => s.activePopup);
  const markergym = useStore((s) => s.markergym);
  const markerpokestop = useStore((s) => s.markerpokestop);
  const markerpowerspot = useStore((s) => s.markerpowerspot);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const showHidden = useStore((s) => s.modifiers.hidden);
  const showInactive = useStore((s) => s.modifiers.inactive);
  const showRemoved = useStore((s) => s.modifiers.removed);
  const setMarker = useStore((s) => s.setMarker);
  const [query, setQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(query);

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
    properties: { hidden, name, removed, subtype, type },
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
        subtype,
        type,
      });
    }
  }

  for (const {
    geometry: { coordinates },
    id,
    properties: { hidden, inactive, name, removed, type },
  } of powerspotsJson.features) {
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

  pois.forEach(({ coordinates, id, name, removed, subtype, type }, i) => {
    let itemClassName =
      "cursor-pointer text-sm px-4 w-full rounded-none justify-start h-12 font-normal gap-2";
    if (i === 0) {
      itemClassName += " mt-2";
    }
    if (removed) {
      itemClassName += " line-through";
    }

    let img;
    let alt;
    let layer;
    switch (type) {
      case "gym":
        layer = markergym;
        img = imgGym;
        alt = "Gym Icon";
        break;
      case "pokestop":
        if (subtype === "showcase") {
          layer = markerpokestop;
          img = imgShowcase;
          alt = "Showcase Icon";
        } else {
          layer = markerpokestop;
          img = imgPokeStop;
          alt = "PokéStop Icon";
        }
        break;
      case "powerspot":
        layer = markerpowerspot;
        img = imgPowerSpot;
        alt = "Power Spot Icon";
        break;
      default:
        img = imgLeafletMarker;
        alt = "Default Marker Icon";
    }

    const iconClassName = "h-full w-auto object-contain";
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
          if (activePopup) {
            setActivePopup(null);
          }

          setMarker(type, id, { isVisible: true });

          // Hack to make sure the popup opens after a potential previous popup is closed
          setTimeout(() => {
            setActivePopup(id);
          }, 0);

          // Hack to reduce flyTo glitches breaking positions of features on the map
          setTimeout(() => {
            map?.flyTo(coordinates);
          }, 1);
        }}
      >
        <div className="flex h-full w-6 items-center justify-center">
          <img src={img} alt={alt} className={iconClassName} />
        </div>
        <div className="flex h-full w-6 items-center justify-center">
          {layer?.[id]?.isVisible ? (
            <Eye className="w-4" />
          ) : (
            <EyeClosed className="h-4 w-4" />
          )}
        </div>
        <div className={nameClassName}>{name}</div>
      </Button>,
    );
  });

  if (results.length === 0) {
    results.push(
      <div className="px-4 py-4 text-sm italic">
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
    <Card className="fixed top-0 left-0 z-999 m-2 max-h-[66vh] w-10 w-100 gap-0 pt-0 pb-0">
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
