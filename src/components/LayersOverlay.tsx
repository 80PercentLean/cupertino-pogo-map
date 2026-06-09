import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  emojiAllBinaryRestroom,
  emojiDevpoi,
  emojiMeetupspot,
  emojiParking,
  imgGym,
  imgLeafletMarker,
  imgPokestop,
  imgPowerspot,
} from "@/leafletImgs";
import { X } from "lucide-react";
import { useSearchParams } from "react-router";

import BtnLayer from "./BtnLayer";
import {
  useFindPoiById,
  useRemoveIdQueryParam,
  useSetTilesQueryParam,
  useToggleS2Cells,
} from "./hooks";
import {
  useIsInteractionRadiiOn,
  useIsLayerOn,
  useIsNoCaPoiZoneOn,
  useIsNoPowerSpotZoneOn,
  useStore,
} from "./hooks/store";

export default function LayersOverlay() {
  const activePopup = useStore((s) => s.activePopup);
  const hasPlacedMarkers = useStore((s) => s.placedMarkerStates.length > 0);
  const isInteractionRadiiOn = useIsInteractionRadiiOn();
  const isLayerDevpoiOn = useIsLayerOn("devpoi");
  const isLayerLabelOn = useStore((s) => s.basicLayers.label);
  const isLayerGymOn = useIsLayerOn("gym");
  const isLayerMeetupSpotOn = useIsLayerOn("meetupspot");
  const isLayerParkingOn = useIsLayerOn("parking");
  const isLayerPlacedMarkerOn = useStore((s) => {
    // If even 1 marker is visible in a layer, the layer is considered on
    for (const { isVisible } of Object.values(s.placedMarkerStates)) {
      if (isVisible) {
        return true;
      }
    }
    return false;
  });
  const isLayerPokestopOn = useIsLayerOn("pokestop");
  const isLayerPowerspotOn = useIsLayerOn("powerspot");
  const isLayerRestroomOn = useIsLayerOn("restroom");
  const isNoCaPoiZoneOn = useIsNoCaPoiZoneOn();
  const isNoPowerSpotZoneOn = useIsNoPowerSpotZoneOn();
  const isStdRaidPathOn = useStore((s) => s.basicLayers.stdRaidPath);
  const setLayer = useStore((s) => s.setLayer);
  const setIsLayersOverlayOpen = useStore((s) => s.setIsLayersOverlayOpen);
  const toggleBasicLayer = useStore((s) => s.toggleBasicLayer);
  const updateAllPlacedMarkerStates = useStore(
    (s) => s.updateAllPlacedMarkerStates,
  );
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const [searchParams] = useSearchParams();
  const findPoiById = useFindPoiById();
  const removeIdQueryParam = useRemoveIdQueryParam();
  const setTilesQueryParam = useSetTilesQueryParam();
  const toggleS2Cells = useToggleS2Cells();

  return (
    <Card className="absolute top-0 right-0 left-0 z-999 mb-20 h-full gap-0 rounded-none pb-20 md:fixed md:left-auto md:m-2 md:max-h-[85vh] md:min-h-auto md:w-67 md:rounded-xl md:pb-0">
      <CardHeader className="border-gray flex flex-row items-center justify-between border-b shadow-[0_5px_5px_-5px_rgba(0,0,0,0.5)]">
        <CardTitle>
          <h1>Layers</h1>
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close layers overlay"
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsLayersOverlayOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="overflow-y-auto py-6">
        <FieldSet>
          <FieldLegend>Points of interest</FieldLegend>
          <FieldGroup className="flex flex-row flex-wrap justify-center md:gap-4">
            <Field className="w-14">
              <BtnLayer
                isActive={isLayerGymOn}
                imagery={<img src={imgGym} alt="Gym Layer Button Icon" />}
                label="Gyms"
                onClick={() => {
                  if (isLayerGymOn) {
                    if (activePopup) {
                      const poi = findPoiById(activePopup);
                      if (poi?.type === "gym") {
                        removeIdQueryParam();
                      }
                    }

                    setLayer("gym", { isVisible: false });
                  } else {
                    setLayer("gym", { isVisible: true });
                  }
                }}
              />
            </Field>
            <Field className="w-14">
              <BtnLayer
                isActive={isLayerPokestopOn}
                imagery={
                  <img src={imgPokestop} alt="PokéStop Layer Button Icon" />
                }
                label="PokéStops"
                onClick={() => {
                  if (isLayerPokestopOn) {
                    if (activePopup) {
                      const poi = findPoiById(activePopup);
                      if (poi?.type === "pokestop") {
                        removeIdQueryParam();
                      }
                    }

                    setLayer("pokestop", { isVisible: false });
                  } else {
                    setLayer("pokestop", { isVisible: true });
                  }
                }}
              />
            </Field>
            <Field className="w-14">
              <BtnLayer
                isActive={isLayerPowerspotOn}
                imagery={
                  <img src={imgPowerspot} alt="Power Spot Layer Button Icon" />
                }
                label="Power Spots"
                onClick={() => {
                  if (isLayerPowerspotOn) {
                    if (activePopup) {
                      const poi = findPoiById(activePopup);
                      if (poi?.type === "powerspot") {
                        removeIdQueryParam();
                      }
                    }

                    setLayer("powerspot", { isVisible: false });
                  } else {
                    setLayer("powerspot", { isVisible: true });
                  }
                }}
              />
            </Field>
            <Field className="w-14">
              <BtnLayer
                isActive={isLayerMeetupSpotOn}
                imagery={<span className="text-xl">{emojiMeetupspot}</span>}
                label="Meetup Spots"
                onClick={() => {
                  if (isLayerMeetupSpotOn) {
                    if (activePopup) {
                      const poi = findPoiById(activePopup);
                      if (poi?.type === "meetupspot") {
                        removeIdQueryParam();
                      }
                    }

                    setLayer("meetupspot", { isVisible: false }, true);
                  } else {
                    setLayer("meetupspot", { isVisible: true }, true);
                  }
                }}
              />
            </Field>
            <Field className="w-14">
              <BtnLayer
                isActive={isLayerParkingOn}
                imagery={<span className="text-xl">{emojiParking}</span>}
                label="Parking"
                onClick={() => {
                  if (isLayerParkingOn) {
                    if (activePopup) {
                      const poi = findPoiById(activePopup);
                      if (poi?.type === "parking") {
                        removeIdQueryParam();
                      }
                    }

                    setLayer("parking", { isVisible: false }, true);
                  } else {
                    setLayer("parking", { isVisible: true }, true);
                  }
                }}
              />
            </Field>
            <Field className="w-14">
              <BtnLayer
                isActive={isStdRaidPathOn}
                imagery={<span className="text-xl">🚶</span>}
                label="Standard Raid Path"
                onClick={() => toggleBasicLayer("stdRaidPath")}
              />
            </Field>
            <Field className="w-14">
              <BtnLayer
                isActive={isLayerRestroomOn}
                imagery={
                  <span className="text-xl">{emojiAllBinaryRestroom}</span>
                }
                label="Restrooms"
                onClick={() => {
                  if (isLayerRestroomOn) {
                    if (activePopup) {
                      const poi = findPoiById(activePopup);
                      if (poi?.type === "restroom") {
                        removeIdQueryParam();
                      }
                    }

                    setLayer("restroom", { isVisible: false }, true);
                  } else {
                    setLayer("restroom", { isVisible: true }, true);
                  }
                }}
              />
            </Field>
            {hasPlacedMarkers && (
              <Field className="w-14">
                <BtnLayer
                  isActive={isLayerPlacedMarkerOn}
                  imagery={
                    <img
                      src={imgLeafletMarker}
                      alt="Placed Marker Button Icon"
                    />
                  }
                  label="Placed Markers"
                  onClick={() => {
                    if (isLayerPlacedMarkerOn) {
                      if (activePopup) {
                        const poi = findPoiById(activePopup);
                        if (poi?.type === "placed") {
                          removeIdQueryParam();
                        }
                      }

                      updateAllPlacedMarkerStates({ isVisible: false });
                    } else {
                      updateAllPlacedMarkerStates({ isVisible: true });
                    }
                  }}
                />
              </Field>
            )}
            {wayfarerMode && (
              <Field className="w-14">
                <BtnLayer
                  isActive={isLayerDevpoiOn}
                  imagery={<span className="text-xl">{emojiDevpoi}</span>}
                  label="TBD"
                  onClick={() => {
                    if (isLayerDevpoiOn) {
                      if (activePopup) {
                        const poi = findPoiById(activePopup);
                        if (poi?.type === "devpoi") {
                          removeIdQueryParam();
                        }
                      }

                      setLayer("devpoi", { isVisible: false });
                    } else {
                      setLayer("devpoi", { isVisible: true });
                    }
                  }}
                />
              </Field>
            )}
          </FieldGroup>
        </FieldSet>
        <FieldSeparator className="my-2" />
        <FieldSet>
          <FieldLegend>Map type</FieldLegend>
          <FieldGroup>
            <Field>
              <RadioGroup
                value={searchParams.get("type") ?? "default"}
                onValueChange={(val: "default" | "extra-info" | "satellite") =>
                  setTilesQueryParam(val)
                }
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    id="map-type-option-1"
                    value="default"
                    className="cursor-pointer border-gray-500"
                  />
                  <Label htmlFor="map-type-option-1" className="cursor-pointer">
                    Default
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    id="map-type-option-2"
                    value="extra-info"
                    className="cursor-pointer border-gray-500"
                  />
                  <Label htmlFor="map-type-option-2" className="cursor-pointer">
                    Extra Info
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    id="map-type-option-3"
                    value="satellite"
                    className="cursor-pointer border-gray-500"
                  />
                  <Label htmlFor="map-type-option-3" className="cursor-pointer">
                    Satellite
                  </Label>
                </div>
              </RadioGroup>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator className="my-2" />
        <FieldSet>
          <FieldLegend>S2 cells</FieldLegend>
          <FieldGroup className="gap-2">
            <Field orientation="horizontal">
              <Checkbox
                id="l17-grid"
                checked={searchParams.get("l17") === "on"}
                className="cursor-pointer border-gray-500"
                onCheckedChange={() => toggleS2Cells("l17")}
              />
              <FieldLabel htmlFor="l17-grid" className="cursor-pointer">
                L17 Grid
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="l14-grid"
                checked={searchParams.get("l14") === "on"}
                className="cursor-pointer border-gray-500"
                onCheckedChange={() => toggleS2Cells("l14")}
              />
              <FieldLabel htmlFor="l14-grid" className="cursor-pointer">
                L14 Grid
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="l13-grid"
                checked={searchParams.get("l13") === "on"}
                className="cursor-pointer border-gray-500"
                onCheckedChange={() => toggleS2Cells("l13")}
              />
              <FieldLabel htmlFor="l13-grid" className="cursor-pointer">
                L13 Grid
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator className="my-2" />
        <FieldSet>
          <FieldLegend>Extra info</FieldLegend>
          <FieldGroup className="gap-2">
            <Field className="flex flex-row">
              <Field orientation="horizontal">
                <Checkbox
                  id="labels"
                  checked={isLayerLabelOn}
                  className="cursor-pointe border-gray-500"
                  onCheckedChange={() => toggleBasicLayer("label")}
                />
                <FieldLabel htmlFor="labels" className="cursor-pointer">
                  Labels
                </FieldLabel>
              </Field>
            </Field>
            <Field className="flex flex-row">
              <Field orientation="horizontal">
                <Checkbox
                  id="interaction-radii"
                  checked={isInteractionRadiiOn}
                  className="cursor-pointer border-gray-500"
                  onCheckedChange={() => {
                    if (isInteractionRadiiOn) {
                      setLayer("gym", { showInteractionRadius: false });
                      setLayer("pokestop", { showInteractionRadius: false });
                      setLayer("powerspot", { showInteractionRadius: false });
                      setLayer("devpoi", { showInteractionRadius: false });
                      updateAllPlacedMarkerStates({
                        showInteractionRadius: false,
                      });
                    } else {
                      setLayer("gym", { showInteractionRadius: true });
                      setLayer("pokestop", { showInteractionRadius: true });
                      setLayer("powerspot", { showInteractionRadius: true });
                      setLayer("devpoi", { showInteractionRadius: true });
                      updateAllPlacedMarkerStates({
                        showInteractionRadius: true,
                      });
                    }
                  }}
                />
                <FieldLabel
                  htmlFor="interaction-radii"
                  className="cursor-pointer"
                >
                  Interaction Radii (80m)
                </FieldLabel>
              </Field>
            </Field>
            <Field className="flex flex-row">
              <Field orientation="horizontal">
                <Checkbox
                  id="no-ps-zones"
                  checked={isNoPowerSpotZoneOn}
                  className="cursor-pointer border-gray-500"
                  onCheckedChange={() => {
                    if (isNoPowerSpotZoneOn) {
                      setLayer("gym", { showNoPowerSpotZone: false });
                      setLayer("pokestop", { showNoPowerSpotZone: false });
                      setLayer("powerspot", { showNoPowerSpotZone: false });
                      setLayer("devpoi", { showNoPowerSpotZone: false });
                      updateAllPlacedMarkerStates({
                        showNoPowerSpotZone: false,
                      });
                    } else {
                      setLayer("gym", { showNoPowerSpotZone: true });
                      setLayer("pokestop", { showNoPowerSpotZone: true });
                      setLayer("powerspot", { showNoPowerSpotZone: true });
                      setLayer("devpoi", { showNoPowerSpotZone: true });
                      updateAllPlacedMarkerStates({
                        showNoPowerSpotZone: true,
                      });
                    }
                  }}
                />
                <FieldLabel htmlFor="no-ps-zones" className="cursor-pointer">
                  No Power Spot Build Zones (22m)
                </FieldLabel>
              </Field>
            </Field>
            {wayfarerMode && (
              <Field className="flex flex-row">
                <Field orientation="horizontal">
                  <Checkbox
                    id="no-ca-poi-zones"
                    checked={isNoCaPoiZoneOn}
                    className="cursor-pointer border-gray-500"
                    onCheckedChange={() => {
                      if (isNoCaPoiZoneOn) {
                        setLayer("gym", { showNoCaPoiZone: false });
                        setLayer("pokestop", { showNoCaPoiZone: false });
                        setLayer("powerspot", { showNoCaPoiZone: false });
                        setLayer("devpoi", { showNoCaPoiZone: false });
                        updateAllPlacedMarkerStates({
                          showNoCaPoiZone: false,
                        });
                      } else {
                        setLayer("gym", { showNoCaPoiZone: true });
                        setLayer("pokestop", { showNoCaPoiZone: true });
                        setLayer("powerspot", { showNoCaPoiZone: true });
                        setLayer("devpoi", { showNoCaPoiZone: true });
                        updateAllPlacedMarkerStates({
                          showNoCaPoiZone: true,
                        });
                      }
                    }}
                  />
                  <FieldLabel
                    htmlFor="no-ca-poi-zones"
                    className="cursor-pointer"
                  >
                    No CA POI Build Zones (30m)
                  </FieldLabel>
                </Field>
              </Field>
            )}
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
