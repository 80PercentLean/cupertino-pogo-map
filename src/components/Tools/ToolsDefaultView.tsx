import { Button } from "@/components/ui/button";
import { type Dispatch, type SetStateAction } from "react";

export interface Props {
  setNav: Dispatch<SetStateAction<string | null>>;
}

/**
 * Default content shown in the Wayfarer tools view.
 */
export default function ToolsDefaultView({ setNav }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Button>Placed Marker Tool</Button>
      <Button onClick={() => setNav("distance-calc")}>
        POI Distance Calculator
      </Button>
    </div>
  );
}
