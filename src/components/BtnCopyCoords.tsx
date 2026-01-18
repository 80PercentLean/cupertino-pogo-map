import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useStore } from "./hooks/store";

export interface Props {
  className?: string;
  lat: number;
  lng: number;
}

const ERR_COPY_LOG = "Failed to copy to clipboard: ";

export default function BtnCopyCoords({ className, lat, lng }: Props) {
  const invertCoords = useStore((s) => s.invertCoords);

  return (
    <Button
      className={className ?? "cursor-pointer shadow-sm shadow-gray-500"}
      onClick={() => {
        (async () => {
          try {
            const clipboardTxt = invertCoords
              ? `${lng},${lat}`
              : `${lat},${lng}`;
            await navigator.clipboard.writeText(clipboardTxt);
            toast(`"${clipboardTxt}" was copied your clipboard!`);
          } catch (err) {
            toast.error("Failed to copy coordinates to the clipboard.");
            console.error(ERR_COPY_LOG, err);
          }
        })().catch((err) => {
          console.error(ERR_COPY_LOG, err); // TODO: Show error message
        });
      }}
    >
      Copy coords
    </Button>
  );
}
