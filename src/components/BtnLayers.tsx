import { Button } from "@/components/ui/button";
import { Layers as LayersIcon } from "lucide-react";
import { useState } from "react";

import LayersOverlay from "./LayersOverlay";

export default function BtnLayers() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <Button
        size="icon"
        title="Open Layers"
        variant="outline"
        className="fixed top-0 right-0 z-998 m-2 cursor-pointer shadow-sm shadow-gray-500"
        onClick={() => setShowOverlay(true)}
      >
        <LayersIcon />
      </Button>
      {showOverlay && <LayersOverlay setShowOverlay={setShowOverlay} />}
    </>
  );
}
