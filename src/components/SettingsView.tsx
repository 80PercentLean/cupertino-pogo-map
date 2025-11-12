import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import SelectRadius from "./SelectRadius";
import UiOverlayCard from "./UiOverlayCard";
import { useStore } from "./hooks/store";

/**
 * Displays the settings view.
 */
export default function SettingsView() {
  const disableAnimations = useStore((s) => s.disableAnimations);
  // const showHiddenPois = useStore((s) => s.showHiddenPois);
  const setDisableAnimations = useStore((s) => s.setDisableAnimations);
  // const setShowHiddenPois = useStore((s) => s.setShowHiddenPois);

  return (
    <UiOverlayCard title="Settings">
      <>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="disable-animations"
            checked={disableAnimations}
            onCheckedChange={(s) => setDisableAnimations(s === true)}
          />
          <Label htmlFor="disable-animations">Disable animations</Label>
        </div>
        <SelectRadius />
      </>
    </UiOverlayCard>
  );
}
