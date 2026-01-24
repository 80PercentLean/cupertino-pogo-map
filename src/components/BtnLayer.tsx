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
  const showLayer = useStore((s) => s.layers[layerType]);
  const toggleLayer = useStore((s) => s.toggleLayer);

  let outerBorderClassName =
    "absolute mb-1 h-12 w-12 border-2 border-black bg-transparent  hover:bg-transparent ";
  if (showLayer) {
    outerBorderClassName += "border-emerald-700";
  } else {
    outerBorderClassName += "group-hover:border-emerald-700";
  }

  let labelClassName = "text-xs ";
  if (showLayer) {
    labelClassName += "text-emerald-700";
  } else {
    labelClassName += "group-hover:text-emerald-700";
  }

  return (
    <button
      className="group relative flex cursor-pointer flex-col items-center"
      onClick={() => toggleLayer(layerType)}
    >
      {/* Inner border */}
      {showLayer && (
        <div
          className={cn(
            buttonVariants({ size: "default" }),
            "white absolute mb-1 h-12 w-12 border-4 bg-transparent",
          )}
        />
      )}
      {/* Outer border */}
      <div
        className={cn(
          buttonVariants({ size: "default" }),
          outerBorderClassName,
        )}
      />
      <div
        className={cn(
          buttonVariants({ size: "default" }),
          "mb-1 h-12 w-12 border-2 border-black",
        )}
      >
        {imagery}
      </div>
      <span className={labelClassName}>{label}</span>
    </button>
  );
}
