import { Button } from "@/components/ui/button";
import { Layers as LayersIcon } from "lucide-react";

import LayersOverlay from "./LayersOverlay";
import { useStore } from "./hooks/store";

export default function BtnLayers() {
  const isLayersOverlayOpen = useStore((s) => s.isLayersOverlayOpen);
  const setIsLayersOverlayOpen = useStore((s) => s.setIsLayersOverlayOpen);

  return (
    <>
      <Button
        size="icon"
        title="Open Layers"
        variant="outline"
        className="fixed top-0 right-0 z-998 m-2 cursor-pointer shadow-sm shadow-gray-500"
        onClick={() => setIsLayersOverlayOpen(true)}
      >
        <LayersIcon />
      </Button>
      {isLayersOverlayOpen && <LayersOverlay />}
    </>
  );
}
