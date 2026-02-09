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
  imgPokestop,
  imgPowerspot,
} from "@/leafletIcons";
import { X } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

import BtnLayer from "./BtnLayer";
import { useIsLayerOn, useStore } from "./hooks/store";

export interface Props {
  setShowOverlay: Dispatch<SetStateAction<boolean>>;
}

export default function LayersOverlay({ setShowOverlay }: Props) {
  const activePopup = useStore((s) => s.activePopup);
  const isLayerDevpoiOn = useIsLayerOn("devpoi");
  const isLayerLabelOn = useStore((s) => s.basicLayers.label);
  const isLayerGymOn = useIsLayerOn("gym");
  const isLayerMeetupSpotOn = useIsLayerOn("meetupspot");
  const isLayerParkingOn = useIsLayerOn("parking");
  const isLayerPokestopOn = useIsLayerOn("pokestop");
  const isLayerPowerspotOn = useIsLayerOn("powerspot");
  const isL13GridOn = useStore((s) => s.basicLayers.l13);
  const isL14GridOn = useStore((s) => s.basicLayers.l14);
  const isL17GridOn = useStore((s) => s.basicLayers.l17);
  const isLayerRestroomOn = useIsLayerOn("restroom");
  const isStdRaidPathOn = useStore((s) => s.basicLayers.stdRaidPath);
  const mapType = useStore((s) => s.mapType);
  const setMapType = useStore((s) => s.setMapType);
  const setLayer = useStore((s) => s.setLayer);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const toggleBasicLayer = useStore((s) => s.toggleBasicLayer);
  // const showInteractionRadii = useStore((s) => s.layers.interactionRadii);
  // const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  // const showPowerSpotZones = useStore((s) => s.layers.noPowerSpotZones);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  return (
    <Card className="fixed top-0 right-0 z-999 m-2 w-64">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Points of interest</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 cursor-pointer"
          onClick={() => setShowOverlay(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldGroup className="flex flex-row flex-wrap gap-4">
            <Field className="w-14">
              <BtnLayer
                isActive={isLayerGymOn}
                imagery={<img src={imgGym} alt="Gym Layer Button Icon" />}
                label="Gyms"
                onClick={() => {
                  if (isLayerGymOn) {
                    setLayer("gym", { isVisible: false });

                    if (activePopup.id && activePopup.type === "gym") {
                      setActivePopup(null, null);
                    }
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
                    setLayer("pokestop", { isVisible: false });

                    if (activePopup.id && activePopup.type === "pokestop") {
                      setActivePopup(null, null);
                    }
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
                  <img src={imgPowerspot} alt="Power Spot Layer button Icon" />
                }
                label="Power Spots"
                onClick={() => {
                  if (isLayerPowerspotOn) {
                    setLayer("powerspot", { isVisible: false });

                    if (activePopup.id && activePopup.type === "powerspot") {
                      setActivePopup(null, null);
                    }
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
                    setLayer("meetupspot", { isVisible: false }, true);

                    if (activePopup.id && activePopup.type === "meetupspot") {
                      setActivePopup(null, null);
                    }
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
                    setLayer("parking", { isVisible: false }, true);

                    if (activePopup.id && activePopup.type === "parking") {
                      setActivePopup(null, null);
                    }
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
                    setLayer("restroom", { isVisible: false }, true);

                    if (activePopup.id && activePopup.type === "restroom") {
                      setActivePopup(null, null);
                    }
                  } else {
                    setLayer("restroom", { isVisible: true }, true);
                  }
                }}
              />
            </Field>
            {wayfarerMode && (
              <Field className="w-14">
                <BtnLayer
                  isActive={isLayerDevpoiOn}
                  imagery={<span className="text-xl">{emojiDevpoi}</span>}
                  label="TBD"
                  onClick={() => {
                    if (isLayerDevpoiOn) {
                      setLayer("devpoi", { isVisible: false });

                      if (activePopup.id && activePopup.type === "devpoi") {
                        setActivePopup(null, null);
                      }
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
          <FieldLegend>S2 cells</FieldLegend>
          <FieldGroup className="gap-2">
            <Field orientation="horizontal">
              <Checkbox
                id="l17-grid"
                checked={isL17GridOn}
                className="cursor-pointer"
                onCheckedChange={() => toggleBasicLayer("l17")}
              />
              <FieldLabel htmlFor="l17-grid" className="cursor-pointer">
                L17 Grid
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="l14-grid"
                checked={isL14GridOn}
                className="cursor-pointer"
                onCheckedChange={() => toggleBasicLayer("l14")}
              />
              <FieldLabel htmlFor="l14-grid" className="cursor-pointer">
                L14 Grid
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="l13-grid"
                checked={isL13GridOn}
                className="cursor-pointer"
                onCheckedChange={() => toggleBasicLayer("l13")}
              />
              <FieldLabel htmlFor="l13-grid" className="cursor-pointer">
                L13 Grid
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator className="my-2" />
        <FieldSet>
          <FieldLegend>Map type</FieldLegend>
          <FieldGroup>
            <Field>
              <RadioGroup
                value={mapType}
                onValueChange={(val: typeof mapType) => setMapType(val)}
                className="mb-4 flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    id="map-type-option-1"
                    value="default"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="map-type-option-1" className="cursor-pointer">
                    Default
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    id="map-type-option-2"
                    value="extra-info"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="map-type-option-2" className="cursor-pointer">
                    Extra Info
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    id="map-type-option-3"
                    value="satellite"
                    className="cursor-pointer"
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
          <FieldLegend>Extra info</FieldLegend>
          <FieldGroup className="gap-2">
            <Field className="flex flex-row">
              <Field orientation="horizontal">
                <Checkbox
                  id="labels"
                  checked={isLayerLabelOn}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleBasicLayer("label")}
                />
                <FieldLabel htmlFor="labels" className="cursor-pointer">
                  Labels
                </FieldLabel>
              </Field>
            </Field>
            {/* <Field className="flex flex-row">
              <Field orientation="horizontal">
                <Checkbox
                  id="interaction-radii"
                  checked={showInteractionRadii}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleLayer("interactionRadii")}
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
                  checked={showPowerSpotZones}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleLayer("noPowerSpotZones")}
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
                    checked={showNoCaPoiZones}
                    className="cursor-pointer"
                    onCheckedChange={() => toggleLayer("noCaPoiZones")}
                  />
                  <FieldLabel
                    htmlFor="no-ca-poi-zones"
                    className="cursor-pointer"
                  >
                    No CA POI Build Zones (30m)
                  </FieldLabel>
                </Field>
              </Field> 
            )} */}
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
