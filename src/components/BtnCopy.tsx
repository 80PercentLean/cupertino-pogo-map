import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export interface Props {
  className?: string;
  text?: string;
  value: number | string;
}

const ERR_COPY_LOG = "Failed to copy to clipboard: ";

export default function BtnCopy({ className, text, value }: Props) {
  let size: "icon" | "default" = "icon";
  if (text) {
    size = "default";
  }

  return (
    <Button
      size={size}
      className={className ?? "cursor-pointer shadow-sm shadow-gray-500"}
      onClick={() => {
        (async () => {
          try {
            const clipboardTxt =
              typeof value !== "string" ? String(value) : value;
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
      <Copy /> {text}
    </Button>
  );
}
