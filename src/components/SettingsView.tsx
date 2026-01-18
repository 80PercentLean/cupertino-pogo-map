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

import SelectRadius from "./SelectRadius";
import UiOverlayCard from "./UiOverlayCard";
import { useStore } from "./hooks/store";

/**
 * Displays the settings view.
 */
export default function SettingsView() {
  const disableAnimations = useStore((s) => s.disableAnimations);
  const invertCoords = useStore((s) => s.invertCoords);
  const toggleInvertCoords = useStore((s) => s.toggleInvertCoords);
  const setDisableAnimations = useStore((s) => s.setDisableAnimations);
  const wayfarerMode = useStore((s) => s.wayfarerMode);
  const setWayfarerMode = useStore((s) => s.setWayfarerMode);

  const showHidden = useStore((s) => s.modifiers.hidden);
  const showInactive = useStore((s) => s.modifiers.inactive);
  const showRemoved = useStore((s) => s.modifiers.removed);
  const toggleModifier = useStore((s) => s.toggleModifier);

  return (
    <UiOverlayCard title="Settings">
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
              onCheckedChange={(s) => setWayfarerMode(s === true)}
            />
            <FieldContent>
              <FieldLabel htmlFor="wayfarer-mode" className="cursor-pointer">
                Enable Wayfarer Mode
              </FieldLabel>
              <FieldDescription>
                This mode enables special settings & tools useful for planning &
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
                  onCheckedChange={() => toggleModifier("hidden")}
                />
                <FieldLabel htmlFor="hidden-pois" className="cursor-pointer">
                  Show hidden POIs
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="inactive-pois"
                  checked={showInactive}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleModifier("inactive")}
                />

                <FieldContent>
                  <FieldLabel
                    htmlFor="inactive-pois"
                    className="cursor-pointer"
                  >
                    Show inactive POIs
                  </FieldLabel>
                  <FieldDescription>
                    Show POIs that exist in Wayfarer but cannot exist in PoGO
                    due to certain conditions.
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
                    Show POIs that have been removed from PoGO or Wayfarer.
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
