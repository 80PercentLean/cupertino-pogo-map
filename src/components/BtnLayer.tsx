import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { type layerType, useStore } from "./hooks/store";

export interface Props {
  alt?: string;
  emoji?: string;
  img?: string;
  label: string;
  layerType: layerType;
}

export default function BtnLayer({ alt, emoji, img, label, layerType }: Props) {
  const toggleLayer = useStore((s) => s.toggleLayer);

  let imagery;
  if (emoji) {
    imagery = emoji;
  } else {
    imagery = <img src={img} alt={alt} />;
  }

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
