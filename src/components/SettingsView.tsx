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
import { Settings } from "lucide-react";

import SelectRadius from "./SelectRadius";
import UiOverlayCard from "./UiOverlayCard";
import UiOverlayCardIconTitle from "./UiOverlayCardIconTitle";
import { useStore } from "./hooks/store";

/**
 * Displays the settings view.
 */
export default function SettingsView() {
  const activePopupType = useStore((s) => s.activePopup.type);
  const disableAnimations = useStore((s) => s.disableAnimations);
  const invertCoords = useStore((s) => s.invertCoords);
  const toggleInvertCoords = useStore((s) => s.toggleInvertCoords);
  const setDisableAnimations = useStore((s) => s.setDisableAnimations);
  const wayfarerMode = useStore((s) => s.wayfarerMode);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const setLayer = useStore((s) => s.setLayer);
  const setWayfarerMode = useStore((s) => s.setWayfarerMode);
  const showDisabled = useStore((s) => s.modifiers.isDisabled);
  const showHidden = useStore((s) => s.modifiers.isHidden);
  const showRemoved = useStore((s) => s.modifiers.removed);
  const toggleModifier = useStore((s) => s.toggleModifier);
  const updateAllPlacedMarkerStates = useStore(
    (s) => s.updateAllPlacedMarkerStates,
  );

  return (
    <UiOverlayCard
      title={<UiOverlayCardIconTitle Icon={Settings} text="Settings" />}
    >
      <FieldSet>
        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <Checkbox
              id="disable-animations"
              checked={disableAnimations}
              className="cursor-pointer"
              onCheckedChange={(s) => setDisableAnimations(s === true)}
            />
            <FieldLabel htmlFor="disable-animations" className="cursor-pointer">
              Disable animations
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox
              id="wayfarer-mode"
              checked={wayfarerMode}
              className="cursor-pointer"
              onCheckedChange={(s) => {
                if (!s && activePopupType === "devpoi") {
                  setActivePopup(null, null);
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

                setWayfarerMode(s === true);
              }}
            />
            <FieldContent>
              <FieldLabel htmlFor="wayfarer-mode" className="cursor-pointer">
                Enable Wayfarer Mode
              </FieldLabel>
              <FieldDescription>
                This mode enables special features useful for planning &
                submitting Wayspots for Niantic Wayfarer.
              </FieldDescription>
            </FieldContent>
          </Field>
          <SelectRadius />
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
                <Checkbox
                  id="hidden-pois"
                  checked={showHidden}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleModifier("isHidden")}
                />
                <FieldContent>
                  <FieldLabel htmlFor="hidden-pois" className="cursor-pointer">
                    Show hidden POIs
                  </FieldLabel>
                  <FieldDescription>
                    Show POIs that exist in-game but are hidden from this map
                    since they are not within the community play area.
                  </FieldDescription>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="disabled-power-spots"
                  checked={showDisabled}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleModifier("isDisabled")}
                />
                <FieldContent>
                  <FieldLabel
                    htmlFor="disabled-power-spots"
                    className="cursor-pointer"
                  >
                    Show disabled power spots
                  </FieldLabel>
                  <FieldDescription>
                    Show power spots that are not in the current spawn pool or
                    can never spawn due to certain restrictions.
                  </FieldDescription>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="removed-pois"
                  checked={showRemoved}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleModifier("removed")}
                />
                <FieldContent>
                  <FieldLabel htmlFor="removed-pois" className="cursor-pointer">
                    Show removed POIs
                  </FieldLabel>
                  <FieldDescription>
                    Show POIs that have been removed in-game or from Wayfarer.
                  </FieldDescription>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="invert-coords"
                  checked={invertCoords}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleInvertCoords()}
                />
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
              </Field>
            </FieldGroup>
          </FieldSet>
        </>
      )}
    </UiOverlayCard>
  );
}
