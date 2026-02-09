import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export interface Props {
  imagery: ReactNode;
  isActive: boolean;
  label: string;
  onClick: () => void;
}

export default function BtnLayer({ imagery, isActive, label, onClick }: Props) {
  let outerBorderClassName =
    "absolute mb-1 h-12 w-12 border-2 border-black bg-transparent  hover:bg-transparent ";
  if (isActive) {
    outerBorderClassName += "border-emerald-700";
  } else {
    outerBorderClassName += "group-hover:border-emerald-700";
  }

  let labelClassName = "text-xs ";
  if (isActive) {
    labelClassName += "text-emerald-700";
  } else {
    labelClassName += "group-hover:text-emerald-700";
  }

  return (
    <button
      className="group relative flex cursor-pointer flex-col items-center"
      onClick={() => onClick()}
    >
      {/* Inner border */}
      {isActive && (
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
