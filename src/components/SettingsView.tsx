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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";

import UiOverlayCard from "./UiOverlayCard";
import UiOverlayCardIconTitle from "./UiOverlayCardIconTitle";
import { useFindPoiById, useRemoveIdQueryParam } from "./hooks";
import { useStore } from "./hooks/store";
import { Button } from "./ui/button";

/**
 * Persist settings in local storage.
 * @param name Name of the local storage key
 * @param val Value to be stored as a string in local storage
 */
const persistSettings = (
  name: string,
  val: boolean | "location-accuracy" | "poi" | "wild-spawn",
) => {
  localStorage.setItem(name, JSON.stringify(val));
};

/**
 * Displays the settings view.
 */
export default function SettingsView() {
  const activePopup = useStore((s) => s.activePopup);
  const disableAnimations = useStore((s) => s.disableAnimations);
  const invertCoords = useStore((s) => s.invertCoords);
  const myLocationRangeType = useStore((s) => s.myLocationRangeType);
  const resetSettings = useStore((s) => s.resetSettings);
  const setDisableAnimations = useStore((s) => s.setDisableAnimations);
  const setLayer = useStore((s) => s.setLayer);
  const setMyLocationRangeType = useStore((s) => s.setMyLocationRangeType);
  const setWayfarerMode = useStore((s) => s.setWayfarerMode);
  const showDisabled = useStore((s) => s.modifiers.isDisabled);
  const showHidden = useStore((s) => s.modifiers.isHidden);
  const showRemoved = useStore((s) => s.modifiers.removed);
  const toggleInvertCoords = useStore((s) => s.toggleInvertCoords);
  const toggleModifier = useStore((s) => s.toggleModifier);
  const updateAllPlacedMarkerStates = useStore(
    (s) => s.updateAllPlacedMarkerStates,
  );
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const removeIdQueryParam = useRemoveIdQueryParam();

  const findPoiById = useFindPoiById();

  return (
    <UiOverlayCard
      title={<UiOverlayCardIconTitle Icon={Settings} text="Settings" />}
    >
      <FieldSet>
        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <FieldLabel htmlFor="disable-animations" className="cursor-pointer">
              Disable animations
            </FieldLabel>
            <Checkbox
              id="disable-animations"
              checked={disableAnimations}
              className="cursor-pointer"
              onCheckedChange={(s) => {
                const newVal = s === true;
                setDisableAnimations(newVal);
                persistSettings("disableAnimations", newVal);
              }}
            />
          </Field>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="wayfarer-mode" className="cursor-pointer">
                Enable Wayfarer Mode
              </FieldLabel>
              <FieldDescription>
                This mode enables special features useful for planning &
                submitting Wayspots for Niantic Wayfarer.
              </FieldDescription>
            </FieldContent>
            <Checkbox
              id="wayfarer-mode"
              checked={wayfarerMode}
              className="cursor-pointer"
              onCheckedChange={(s) => {
                if (!s && activePopup) {
                  const poi = findPoiById(activePopup);
                  if (poi?.type === "devpoi") {
                    removeIdQueryParam();
                  }
                }

                setLayer("gym", { showNoCaPoiZone: false });
                setLayer("pokestop", { showNoCaPoiZone: false });
                setLayer("powerspot", { showNoCaPoiZone: false });
                setLayer("devpoi", {
                  isVisible: false,
                  showNoCaPoiZone: false,
                });
                updateAllPlacedMarkerStates({
                  showNoCaPoiZone: false,
                });

                const newVal = s === true;
                setWayfarerMode(newVal);
                persistSettings("wayfarerMode", newVal);
              }}
            />
          </Field>
          <Field>
            <FieldContent>
              <FieldLabel>My Location Range Type</FieldLabel>
              <FieldDescription>
                Set the type of range around your location.
              </FieldDescription>
            </FieldContent>
            <Select
              value={myLocationRangeType}
              onValueChange={(val: typeof myLocationRangeType) => {
                setMyLocationRangeType(val);
                persistSettings("myLocationRangeType", val);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="My Location Range Type" />
              </SelectTrigger>
              <SelectContent className="z-[1001]">
                <SelectItem value="poi">POI Interaction Range (80m)</SelectItem>
                <SelectItem value="wild-spawn">
                  Wild Spawn Visibility (50m)
                </SelectItem>
                <SelectItem value="location-accuracy">
                  Location Accuracy
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </FieldSet>
      {wayfarerMode && (
        <>
          <FieldSeparator className="my-2" />
          <FieldSet>
            <FieldLegend>Wayfarer Settings</FieldLegend>
            <FieldDescription>
              Special Wayfarer settings available when Wayfarer Mode is enabled.
            </FieldDescription>
            <FieldGroup className="gap-3">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldLabel htmlFor="hidden-pois" className="cursor-pointer">
                    Show hidden POIs
                  </FieldLabel>
                  <FieldDescription>
                    Display POIs that exist in-game but are hidden from this map
                    since they are not within the community play area.
                  </FieldDescription>
                </FieldContent>
                <Checkbox
                  id="hidden-pois"
                  checked={showHidden}
                  className="cursor-pointer"
                  onCheckedChange={() => {
                    toggleModifier("isHidden");
                    persistSettings("isHidden", !showHidden);
                  }}
                />
              </Field>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldLabel
                    htmlFor="disabled-power-spots"
                    className="cursor-pointer"
                  >
                    Show disabled power spots
                  </FieldLabel>
                  <FieldDescription>
                    Display power spots that are not in the current spawn pool
                    or can never spawn due to certain restrictions.
                  </FieldDescription>
                </FieldContent>
                <Checkbox
                  id="disabled-power-spots"
                  checked={showDisabled}
                  className="cursor-pointer"
                  onCheckedChange={() => {
                    toggleModifier("isDisabled");
                    persistSettings("isDisabled", !showDisabled);
                  }}
                />
              </Field>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldLabel htmlFor="removed-pois" className="cursor-pointer">
                    Show removed POIs
                  </FieldLabel>
                  <FieldDescription>
                    Display POIs that have been removed in-game or from
                    Wayfarer.
                  </FieldDescription>
                </FieldContent>
                <Checkbox
                  id="removed-pois"
                  checked={showRemoved}
                  className="cursor-pointer"
                  onCheckedChange={() => {
                    toggleModifier("removed");
                    persistSettings("removed", !showRemoved);
                  }}
                />
              </Field>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldLabel
                    htmlFor="invert-coords"
                    className="cursor-pointer"
                  >
                    Invert coordinates using the "Copy coords" button
                  </FieldLabel>
                  <FieldDescription>
                    Current copy coords format:{" "}
                    {invertCoords ? <code>lng,lat</code> : <code>lat,lng</code>}
                  </FieldDescription>
                </FieldContent>
                <Checkbox
                  id="invert-coords"
                  checked={invertCoords}
                  className="cursor-pointer"
                  onCheckedChange={() => {
                    toggleInvertCoords();
                    persistSettings("invertCoords", !invertCoords);
                  }}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </>
      )}
      <FieldSeparator className="my-2" />
      <Field>
        <Button
          onClick={() => {
            localStorage.clear();
            resetSettings();
          }}
        >
          Reset To Default Settings
        </Button>
      </Field>
    </UiOverlayCard>
  );
}
