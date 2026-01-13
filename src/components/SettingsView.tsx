import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import SelectRadius from "./SelectRadius";
import UiOverlayCard from "./UiOverlayCard";
import { useStore } from "./hooks/store";

/**
 * Displays the settings view.
 */
export default function SettingsView() {
  const disableAnimations = useStore((s) => s.disableAnimations);
  const setDisableAnimations = useStore((s) => s.setDisableAnimations);
  const wayfarerMode = useStore((s) => s.wayfarerMode);
  const setWayfarerMode = useStore((s) => s.setWayfarerMode);

  return (
    <UiOverlayCard title="Settings">
      <FieldGroup>
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
    </UiOverlayCard>
  );
}
