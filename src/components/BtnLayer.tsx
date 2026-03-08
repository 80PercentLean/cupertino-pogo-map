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
          "absolute mb-1 h-12 w-12 border-2 border-black bg-transparent hover:bg-transparent",
          isActive ? "border-emerald-700" : "group-hover:border-emerald-700",
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
      <span
        className={cn(
          "text-xs",
          isActive ? "text-emerald-700" : "group-hover:text-emerald-700",
        )}
      >
        {label}
      </span>
    </button>
  );
}
