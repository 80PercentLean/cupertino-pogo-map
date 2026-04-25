import { Card } from "@/components/ui/card";
import {
  devpoisJson,
  gymsJson,
  meetupspotsJson,
  parkingJson,
  pokestopsJson,
  powerspotsJson,
  restroomsJson,
} from "@/geojson/data";
import {
  emojiAllBinaryRestroom,
  emojiDevpoi,
  emojiFRestroom,
  emojiMRestroom,
  emojiMeetupspot,
  emojiParking,
  imgGym,
  imgLeafletMarker,
  imgPokestop,
  imgPowerspot,
  imgShowcase,
} from "@/leafletIcons";
import { cn } from "@/lib/utils";
import { type CFeatureCollection, type CProperties } from "@/types/CFeatures";
import { getDesktopMediaQuery } from "@/util";
import type { LatLngTuple } from "leaflet";
import { Eye, EyeClosed, Search, X } from "lucide-react";
import { useContext, useDeferredValue, useState } from "react";

import { MapContext } from "./MapContext";
import { useStore } from "./hooks/store";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

interface FeatureData {
  coordinates: LatLngTuple;
  id: string;
  isDisabled?: CProperties["isDisabled"];
  name: CProperties["name"];
  removed?: CProperties["removed"];
  subtype?: CProperties["subtype"];
  type: CProperties["type"];
}

export default function ListView() {
  const { map } = useContext(MapContext);
  const activePopup = useStore((s) => s.activePopup);
  const layerDevpoi = useStore((s) => s.layerDevpoi);
  const layerGym = useStore((s) => s.layerGym);
  const layerMeetupspot = useStore((s) => s.layerMeetupspot);
  const layerParking = useStore((s) => s.layerParking);
  const layerPokestop = useStore((s) => s.layerPokestop);
  const layerPowerspot = useStore((s) => s.layerPowerspot);
  const layerRestroom = useStore((s) => s.layerRestroom);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const setIsListViewOpen = useStore((s) => s.setIsListViewOpen);
  const showDisabled = useStore((s) => s.modifiers.isDisabled);
  const showHidden = useStore((s) => s.modifiers.isHidden);
  const showRemoved = useStore((s) => s.modifiers.removed);
  const setMarker = useStore((s) => s.setMarker);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const [query, setQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(query);

  const buildList = (...args: CFeatureCollection["features"][]) => {
    const featureData: FeatureData[] = [];

    for (const currFeatures of args) {
      if (
        (currFeatures[0]?.properties?.type === "gym" && layerGym) ||
        (currFeatures[0]?.properties?.type === "meetupspot" &&
          layerMeetupspot) ||
        (currFeatures[0]?.properties?.type === "parking" && layerPokestop) ||
        (currFeatures[0]?.properties?.type === "pokestop" && layerPokestop) ||
        (currFeatures[0]?.properties?.type === "powerspot" && layerPowerspot) ||
        (currFeatures[0]?.properties?.type === "restroom" && layerRestroom) ||
        (currFeatures[0]?.properties?.type === "devpoi" && layerDevpoi)
      ) {
        for (const {
          geometry: { coordinates },
          id,
          properties: { isDisabled, isHidden, name, removed, subtype, type },
        } of currFeatures) {
          if (
            (!showDisabled && isDisabled) ||
            (!showHidden && isHidden) ||
            (!showRemoved && removed) ||
            (type === "devpoi" && !wayfarerMode)
          ) {
            // Skip if hidden or removed and those modifiers are off
            continue;
          }

          if (
            query === "" ||
            name.toLowerCase().includes(deferredQuery.toLowerCase())
          ) {
            featureData.push({
              coordinates: [coordinates[1], coordinates[0]],
              id: id as string,
              name,
              isDisabled,
              removed,
              subtype,
              type,
            });
          }
        }
      }
    }

    featureData.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    const list = [];

    featureData.forEach(
      ({ coordinates, id, isDisabled, name, removed, subtype, type }, i) => {
        let layer;
        let iconType;
        let icon;
        let alt;
        switch (type) {
          case "gym":
            layer = layerGym;
            iconType = "img";
            icon = imgGym;
            alt = "Gym Icon";
            break;
          case "parking":
            layer = layerParking;
            iconType = "emoji";
            icon = emojiParking;
            break;
          case "pokestop":
            layer = layerPokestop;
            iconType = "img";
            if (subtype === "showcase") {
              icon = imgShowcase;
              alt = "Showcase Icon";
            } else {
              icon = imgPokestop;
              alt = "PokéStop Icon";
            }
            break;
          case "powerspot":
            layer = layerPowerspot;
            iconType = "img";
            icon = imgPowerspot;
            alt = "Power Spot Icon";
            break;
          case "meetupspot":
            layer = layerMeetupspot;
            iconType = "emoji";
            icon = emojiMeetupspot;
            break;
          case "restroom":
            layer = layerRestroom;
            iconType = "emoji";
            if (subtype === "men") {
              icon = emojiMRestroom;
            } else if (subtype === "women") {
              icon = emojiFRestroom;
            } else {
              icon = emojiAllBinaryRestroom;
            }
            break;
          case "devpoi":
            layer = layerDevpoi;
            iconType = "emoji";
            icon = emojiDevpoi;
            break;
          default:
            iconType = "img";
            icon = imgLeafletMarker;
            alt = "Default Marker Icon";
        }

        list.push(
          <Button
            key={id}
            variant="ghost"
            className={cn(
              "h-12 w-full cursor-pointer justify-start gap-2 rounded-none px-4 pr-0 text-sm font-normal",
              i === 0 && "md:mt-2",
              removed && "line-through",
            )}
            onClick={() => {
              const mediaQuery = getDesktopMediaQuery();
              if (!mediaQuery.matches) {
                // Close the list view when a POI in it is tapped on mobile
                setIsListViewOpen(false);
              }

              if (activePopup.id && activePopup.id !== id) {
                setActivePopup(null, null);
              }

              setMarker(type, id, { isVisible: true });

              // Hack to make sure the popup opens after a potential previous popup is closed
              if (activePopup.id !== id) {
                setTimeout(() => {
                  setActivePopup(id, type);
                }, 0);
              }

              // Hack to reduce flyTo glitches breaking positions of features on the map
              setTimeout(() => {
                map?.flyTo(coordinates);
              }, 0);
            }}
          >
            <div className="flex h-full w-6 items-center justify-center">
              {iconType === "img" ? (
                <img
                  src={icon}
                  alt={alt}
                  className={cn(
                    "h-full w-auto object-contain",
                    removed && "brightness-0",
                    isDisabled && "grayscale",
                  )}
                />
              ) : (
                icon
              )}
            </div>
            <div className="flex h-full items-center justify-center">
              {layer?.[id]?.isVisible ? (
                <Eye className="w-4" />
              ) : (
                <EyeClosed className="h-4 w-4" />
              )}
            </div>
            <div
              className={cn(
                "flex grow items-center overflow-x-auto pr-2",
                removed && "line-through",
              )}
            >
              {name}
            </div>
          </Button>,
        );
      },
    );

    if (list.length === 0) {
      list.push(
        <div className="px-4 py-4 text-sm italic">
          No points of interest were found...
        </div>,
      );
    }

    return list;
  };

  const list = buildList(
    gymsJson.features,
    meetupspotsJson.features,
    parkingJson.features,
    pokestopsJson.features,
    powerspotsJson.features,
    restroomsJson.features,
    devpoisJson.features,
  );

  let btnSearchIcon;
  let btnSearchClickHandler;
  if (deferredQuery) {
    btnSearchIcon = <X />;
    btnSearchClickHandler = () => setQuery("");
  } else {
    btnSearchIcon = <Search />;
  }

  const btnSearch = (
    <Button
      variant="ghost"
      className={cn(
        deferredQuery
          ? "cursor-pointer"
          : "hover:bg-transparent hover:text-inherit",
      )}
      onClick={btnSearchClickHandler}
    >
      {btnSearchIcon}
    </Button>
  );

  return (
    <Card className="absolute inset-0 z-999 gap-0 rounded-none pt-0 pb-20 md:fixed md:top-0 md:left-0 md:m-2 md:max-h-[66vh] md:w-100 md:rounded-xl md:pb-0">
      <InputGroup className="rounded-none py-6 md:rounded-t-xl">
        <InputGroupInput
          placeholder="Search for Gyms, PokéStops, etc."
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />
        <InputGroupAddon align="inline-end">{btnSearch}</InputGroupAddon>
      </InputGroup>
      <div className="h-fit overflow-x-hidden overflow-y-scroll">{list}</div>
    </Card>
  );
}
