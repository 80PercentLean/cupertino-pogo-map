import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";

import { Button, buttonVariants } from "./ui/button";

const genOuterBorderClassName = (isActive: boolean) => {
  let outerBorderClassName =
    "absolute mb-1 h-10 w-20 border-2 border-black bg-transparent  hover:bg-transparent ";
  if (isActive) {
    outerBorderClassName += "border-emerald-700";
  } else {
    outerBorderClassName += "hover:border-emerald-700";
  }

  return outerBorderClassName;
};

export interface Props {
  end?: boolean;
  forceActive?: boolean;
  to: string;
  name: string;
  onClick?: () => void;
  title?: string;
}

export default function NavLinkViewCtrl({
  children,
  end,
  forceActive,
  name,
  onClick,
  to,
  title,
}: PropsWithChildren<Props>) {
  return (
    <NavLink
      end={end}
      title={title}
      to={to}
      className="relative"
      onClick={onClick}
    >
      {({ isActive }) => {
        let activeStyle;
        if (typeof forceActive === "boolean") {
          activeStyle = forceActive;
        } else {
          activeStyle = isActive;
        }

        return (
          <span className={`group/${name}`}>
            {/* Inner border */}
            {activeStyle && (
              <div
                className={cn(
                  buttonVariants({ size: "default" }),
                  "white absolute mb-1 h-10 w-20 border-4 bg-transparent",
                )}
              />
            )}
            {/* Outer border */}
            <div
              className={cn(
                buttonVariants({ size: "default" }),
                genOuterBorderClassName(activeStyle),
              )}
            />
            <Button
              variant="ghost"
              className={cn(
                buttonVariants({ variant: "default" }),
                `h-10 w-20 p-3 group-hover/${name}:text-emerald-700`,
                activeStyle && "text-emerald-700",
              )}
            >
              {children}
            </Button>
          </span>
        );
      }}
    </NavLink>
  );
}
