import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { imgGym, imgPokeStop, imgPowerSpot } from "@/leafletIcons";
import { CircleX } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

import BtnLayer from "./BtnLayer";
import { useStore } from "./hooks/store";

export interface Props {
  setShowOverlay: Dispatch<SetStateAction<boolean>>;
}

export default function LayersOverlay({ setShowOverlay }: Props) {
  const mapType = useStore((s) => s.mapType);
  const setMapType = useStore((s) => s.setMapType);
  const toggleLayer = useStore((s) => s.toggleLayer);
  const showL13Grid = useStore((s) => s.layers.l13);
  const showL14Grid = useStore((s) => s.layers.l14);
  const showL17Grid = useStore((s) => s.layers.l17);

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
          <CircleX className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldGroup className="flex flex-row flex-wrap gap-4">
            <Field className="w-14">
              <BtnLayer
                alt="Gym Icon"
                img={imgGym}
                label="Gyms"
                layerType="gyms"
              />
            </Field>
            <Field className="w-14">
              <BtnLayer
                alt="PokeStop Icon"
                img={imgPokeStop}
                label="PokéStops"
                layerType="pokestops"
              />
            </Field>
            <Field className="w-14">
              <BtnLayer
                alt="Power Spot Icon"
                img={imgPowerSpot}
                label="Power Spots"
                layerType="powerspots"
              />
            </Field>
            <Field className="w-14">
              <BtnLayer
                emoji="🚶"
                label="Standard Raid Path"
                layerType="raidPath"
              />
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
                checked={showL17Grid}
                className="cursor-pointer"
                onCheckedChange={() => toggleLayer("l17")}
              />
              <FieldLabel htmlFor="l17-grid" className="cursor-pointer">
                L17 Grid
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="l14-grid"
                checked={showL14Grid}
                className="cursor-pointer"
                onCheckedChange={() => toggleLayer("l14")}
              />
              <FieldLabel htmlFor="l14-grid" className="cursor-pointer">
                L14 Grid
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="l13-grid"
                checked={showL13Grid}
                className="cursor-pointer"
                onCheckedChange={() => toggleLayer("l13")}
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
      </CardContent>
    </Card>
  );
}
