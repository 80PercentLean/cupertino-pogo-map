import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

import { type layerType, useStore } from "./hooks/store";

export interface Props {
  imagery: ReactNode;
  label: string;
  layerType: layerType;
}

export default function BtnLayer({ imagery, label, layerType }: Props) {
  const toggleLayer = useStore((s) => s.toggleLayer);

  return (
    <button
      className="flex cursor-pointer flex-col items-center"
      onClick={() => toggleLayer(layerType)}
    >
      <div
        className={cn(
          buttonVariants({ size: "default" }),
          "pointer-events-none mb-1 h-12 w-12", // optional
        )}
      >
        {imagery}
      </div>
      <span className="text-xs">{label}</span>
    </button>
  );
}
