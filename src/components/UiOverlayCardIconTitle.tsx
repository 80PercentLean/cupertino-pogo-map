import { type LucideIcon } from "lucide-react";

export interface Props {
  Icon: LucideIcon;
  text: string;
}

export default function UiOverlayCardIconTitle({ Icon, text }: Props) {
  return (
    <span className="flex items-center">
      <Icon className="mr-2 w-4" />
      {text}
    </span>
  );
}
