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
  const wayfarerTools = useStore((s) => s.wayfarerTools);
  const setWayfarerTools = useStore((s) => s.setWayfarerTools);

  return (
    <UiOverlayCard title="Settings">
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox
            id="disable-animations"
            checked={disableAnimations}
            onCheckedChange={(s) => setDisableAnimations(s === true)}
          />
          <FieldLabel htmlFor="disable-animations">
            Disable animations
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="wayfarer-tools"
            checked={wayfarerTools}
            onCheckedChange={(s) => setWayfarerTools(s === true)}
          />
          <FieldContent>
            <FieldLabel htmlFor="wayfarer-tools">
              Enable Wayfarer Tools
            </FieldLabel>
            <FieldDescription>
              This enables tools useful for planning & submitting Wayspots for
              Niantic Wayfarer.
            </FieldDescription>
          </FieldContent>
        </Field>
        <SelectRadius />
      </FieldGroup>
    </UiOverlayCard>
  );
}
