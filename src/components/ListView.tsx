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
import { cn } from "@/lib/utils";
import { type CFeatureCollection, type CProperties } from "@/types/CFeatures";
import { getDesktopMediaQuery } from "@/util";
import type { LatLngTuple } from "leaflet";
import { debounce } from "lodash-es";
import { Eye, EyeClosed, Search, X } from "lucide-react";
import {
  type ReactNode,
  use,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";

import { MapContext } from "./MapContext";
import MapUiIcon from "./MapUiIcon";
import { useSetIdQueryParam } from "./hooks";
import { type MarkerState, useStore } from "./hooks/store";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

interface FeatureData {
  coordinates: LatLngTuple;
  id: string;
  isDisabled?: CProperties["isDisabled"];
  isHidden?: CProperties["isHidden"];
  name: CProperties["name"];
  removed?: CProperties["removed"];
  subtype?: CProperties["subtype"];
  type: CProperties["type"];
}

const DELAY = 1500;

export default function ListView() {
  const { map } = use(MapContext);
  const activePopup = useStore((s) => s.activePopup);
  const layerDevpoi = useStore((s) => s.layerDevpoi);
  const layerGym = useStore((s) => s.layerGym);
  const layerMeetupspot = useStore((s) => s.layerMeetupspot);
  const layerParking = useStore((s) => s.layerParking);
  const layerPokestop = useStore((s) => s.layerPokestop);
  const layerPowerspot = useStore((s) => s.layerPowerspot);
  const layerRestroom = useStore((s) => s.layerRestroom);
  const placedMarkerStates = useStore((s) => s.placedMarkerStates);
  const setIsListViewOpen = useStore((s) => s.setIsListViewOpen);
  const showDisabled = useStore((s) => s.modifiers.isDisabled);
  const showHidden = useStore((s) => s.modifiers.isHidden);
  const showRemoved = useStore((s) => s.modifiers.removed);
  const setMarker = useStore((s) => s.setMarker);
  const updatePlacedMarkerState = useStore((s) => s.updatePlacedMarkerState);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const [query, setQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(query);
  const setActivePopup = useStore((s) => s.setActivePopup);

  const setIdQueryParam = useSetIdQueryParam();

  /**
   * Debounce highlighting the marker.
   * Used to prevent excessive highlighting when scrolling through the list quickly.
   */
  const debouncedHighlight = useMemo(() => {
    return debounce((type: CProperties["type"], id: string) => {
      setMarker(type, id, { isHighlighted: true });
    }, 500);
  }, [setMarker]);

  /**
   * Debounce highlighting placed markers.
   */
  const debouncedPlacedHighlight = useMemo(() => {
    return debounce((i: number) => {
      updatePlacedMarkerState(i, {
        isHighlighted: true,
      });
    }, 500);
  }, [updatePlacedMarkerState]);

  /**
   * Build the main list from GeoJSON
   */
  const buildMainList = (...args: CFeatureCollection["features"][]) => {
    const featureData: FeatureData[] = [];

    // Consolidate all feature collections & shape data nicely
    for (const currFeatures of args) {
      for (const {
        geometry: { coordinates },
        id,
        properties: { isDisabled, isHidden, name, removed, subtype, type },
      } of currFeatures) {
        featureData.push({
          coordinates: [coordinates[1], coordinates[0]],
          id: id as string,
          name,
          isDisabled,
          isHidden,
          removed,
          subtype,
          type,
        });
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

    const listMain: ReactNode[] = [];

    // Generate JSX for each list item & filter
    featureData.forEach(
      ({
        coordinates,
        id,
        isDisabled,
        isHidden,
        name,
        removed,
        subtype,
        type,
      }) => {
        if (
          (!showDisabled && isDisabled) ||
          (!showHidden && isHidden) ||
          (!showRemoved && removed) ||
          (type === "devpoi" && !wayfarerMode)
        ) {
          // Skip if hidden or removed and those modifiers are off
          return;
        }

        const querySet = new Set(deferredQuery.toLowerCase().split(" "));
        const matchGym = querySet.has("gym") || querySet.has("gyms");
        const matchPokeStop =
          querySet.has("pokestop") || querySet.has("pokestops");
        const matchPowerSpot =
          querySet.has("powerspot") || querySet.has("powerspots");
        const matchMeetupSpot =
          querySet.has("meetupspot") || querySet.has("meetupspots");
        const matchParking = querySet.has("parking");
        const matchRestroom =
          querySet.has("restroom") || querySet.has("restrooms");
        const matchDevPoi = querySet.has("devpoi");

        let layer: Record<string, MarkerState> | undefined;
        let icon;
        switch (type) {
          case "gym":
            layer = layerGym;
            icon = (
              <MapUiIcon type="gym" className="flex h-6 w-6 object-contain" />
            );
            break;

          case "meetupspot":
            layer = layerMeetupspot;
            icon = (
              <MapUiIcon
                type="meetupspot"
                className="flex h-6 w-6 items-center justify-center"
              />
            );
            break;

          case "parking":
            layer = layerParking;
            icon = (
              <MapUiIcon
                subtype={subtype}
                type="parking"
                className="flex h-6 w-6 items-center justify-center"
              />
            );
            break;

          case "pokestop":
            layer = layerPokestop;
            icon = (
              <MapUiIcon
                subtype={subtype}
                type="pokestop"
                className="h-6 w-6 object-contain"
              />
            );
            break;

          case "powerspot":
            layer = layerPowerspot;
            icon = (
              <MapUiIcon
                isDisabled={isDisabled}
                type="powerspot"
                className="h-6 w-6 object-contain"
              />
            );
            break;

          case "restroom":
            layer = layerRestroom;
            icon = (
              <MapUiIcon
                subtype={subtype}
                type="restroom"
                className="flex h-6 w-6 items-center justify-center"
              />
            );
            break;

          case "devpoi":
            layer = layerDevpoi;
            icon = (
              <MapUiIcon
                type="devpoi"
                className="flex h-6 w-6 items-center justify-center"
              />
            );
            break;

          default:
            icon = (
              <MapUiIcon
                alt="Icon for Placed Markers"
                className="h-6 w-6 object-contain"
              />
            );
        }

        if (
          deferredQuery.length < 2 ||
          name.toLowerCase().includes(deferredQuery.toLowerCase()) ||
          (matchGym && type === "gym") ||
          (matchPokeStop && type === "pokestop") ||
          (matchPowerSpot && type === "powerspot") ||
          (matchMeetupSpot && type === "meetupspot") ||
          (matchParking && type === "parking") ||
          (matchRestroom && type === "restroom") ||
          (matchDevPoi && type === "devpoi") ||
          deferredQuery === id
        ) {
          console.log("item added", name);
          listMain.push(
            <Button
              key={id}
              variant="ghost"
              className={cn(
                "h-12 w-full cursor-pointer justify-start gap-2 rounded-none px-4 pr-0 text-sm font-normal md:first:mt-2",
                removed && "line-through",
              )}
              onClick={() => {
                const mediaQuery = getDesktopMediaQuery();
                if (!mediaQuery.matches) {
                  // Close the list view when a POI in it is tapped on mobile
                  setIsListViewOpen(false);
                }

                setMarker(type, id, { isVisible: true });

                // The following conditions/setTimeout is a hack to get popups working
                if (activePopup && activePopup !== id) {
                  setActivePopup(null);
                }

                if (activePopup !== id) {
                  setTimeout(() => {
                    setIdQueryParam(id);
                  }, DELAY);
                }

                // Hack to reduce flyTo glitches breaking positions of features on the map
                setTimeout(() => {
                  map?.flyTo(coordinates, 18);
                }, DELAY - 500);
              }}
              onMouseEnter={() => {
                if (layer?.[id]?.isVisible) {
                  debouncedHighlight(type, id);
                }
              }}
              onMouseLeave={() => {
                if (layer?.[id]?.isHighlighted) {
                  setMarker(type, id, { isHighlighted: false });
                }
              }}
            >
              <div className="flex h-full w-6 items-center justify-center">
                {icon}
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
        } else if (layer?.[id]?.isHighlighted) {
          setMarker(type, id, { isHighlighted: false });
        }
      },
    );

    return listMain;
  };

  // Build the list of placed markers that will go in front of the main list
  const listPlacedMarkers: ReactNode[] = [];
  placedMarkerStates.forEach(({ id, isVisible, position }, i) => {
    if (
      deferredQuery.length < 2 ||
      `placed marker #${i + 1}`.includes(deferredQuery.toLowerCase())
    ) {
      listPlacedMarkers.push(
        <Button
          key={id}
          variant="ghost"
          className={
            "h-12 w-full cursor-pointer justify-start gap-2 rounded-none px-4 pr-0 text-sm font-normal md:first:mt-2"
          }
          onClick={() => {
            const mediaQuery = getDesktopMediaQuery();
            if (!mediaQuery.matches) {
              // Close the list view when a POI in it is tapped on mobile
              setIsListViewOpen(false);
            }

            updatePlacedMarkerState(i, {
              isVisible: true,
            });

            // The following conditions/setTimeout is a hack to get popups working
            if (activePopup && activePopup !== id) {
              setActivePopup(null);
            }

            if (activePopup !== id) {
              setTimeout(() => {
                setIdQueryParam(id);
              }, DELAY);
            }

            // Hack to reduce flyTo glitches breaking positions of features on the map
            setTimeout(() => {
              map?.flyTo(position, 18);
            }, DELAY - 500);
          }}
          onMouseEnter={() => {
            if (placedMarkerStates[i]?.isVisible) {
              debouncedPlacedHighlight(i);
            }
          }}
          onMouseLeave={() => {
            if (placedMarkerStates[i]?.isHighlighted) {
              updatePlacedMarkerState(i, {
                isHighlighted: false,
              });
            }
          }}
        >
          <div className="flex h-full w-6 items-center justify-center">
            <MapUiIcon
              alt="Placed Marker Icon"
              className="h-6 w-6 object-contain"
            />
          </div>
          <div className="flex h-full items-center justify-center">
            {isVisible ? (
              <Eye className="w-4" />
            ) : (
              <EyeClosed className="h-4 w-4" />
            )}
          </div>
          <div className="flex grow items-center overflow-x-auto pr-2">
            Placed Marker #{i + 1}
          </div>
        </Button>,
      );
    } else if (placedMarkerStates[i]?.isHighlighted) {
      updatePlacedMarkerState(i, {
        isHighlighted: false,
      });
    }
  });

  const listMain = buildMainList(
    gymsJson.features,
    meetupspotsJson.features,
    parkingJson.features,
    pokestopsJson.features,
    powerspotsJson.features,
    restroomsJson.features,
    devpoisJson.features,
  );

  if (listMain.length === 0 && listPlacedMarkers.length === 0) {
    listMain.push(
      <div key="not-found" className="px-4 py-4 text-sm italic">
        No points of interest were found...
      </div>,
    );
  }

  let btnSearchIcon;
  let btnSearchClickHandler;
  if (deferredQuery) {
    btnSearchIcon = <X />;
    btnSearchClickHandler = () => setQuery("");
  } else {
    btnSearchIcon = <Search />;
  }

  useEffect(() => {
    return () => {
      debouncedHighlight.cancel();
      debouncedPlacedHighlight.cancel();
    };
  }, [debouncedHighlight, debouncedPlacedHighlight]);

  return (
    <Card className="absolute inset-0 z-999 gap-0 rounded-none pt-0 pb-20 md:fixed md:top-0 md:left-0 md:m-2 md:max-h-[66vh] md:w-100 md:rounded-xl md:pb-0">
      <InputGroup className="rounded-none py-6 md:rounded-t-xl">
        <InputGroupInput
          name="search"
          placeholder="Search for Gyms, PokéStops, etc."
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />
        <InputGroupAddon align="inline-end">
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
        </InputGroupAddon>
      </InputGroup>
      <div className="h-fit overflow-x-hidden overflow-y-scroll">
        {listPlacedMarkers}
        {listMain}
      </div>
    </Card>
  );
}
