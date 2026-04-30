import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/util";
import { Copy } from "lucide-react";

export interface Props {
  className?: string;
  text?: string;
  value: number | string;
}

export const classNameDefault = "cursor-pointer shadow-sm shadow-gray-500";

export default function BtnCopy({ className, text, value }: Props) {
  let size: "icon" | "default" = "icon";
  if (text) {
    size = "default";
  }

  return (
    <Button
      size={size}
      className={className ?? classNameDefault}
      onClick={() => {
        copyToClipboard(String(value)).catch((err) => {
          console.error(err);
        });
      }}
    >
      <Copy /> {text}
    </Button>
  );
}
