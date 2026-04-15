import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MAP_PATH } from "@/constants";
import { X } from "lucide-react";
import { type PropsWithChildren, type ReactNode } from "react";
import { NavLink } from "react-router";

import MapCover from "./MapCover";

export interface Props {
  title?: ReactNode;
}

/**
 * A responsive card that displays the background for UI overlays.
 */
export default function UiOverlayCard({
  children,
  title,
}: PropsWithChildren<Props>) {
  return (
    <MapCover>
      <Card className="absolute top-0 right-0 left-0 min-h-full overflow-y-auto rounded-none pb-15 md:static md:m-auto md:min-h-0 md:w-[500px] md:rounded-xl md:pb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          {title && typeof title === "string" ? (
            <CardTitle>{title}</CardTitle>
          ) : (
            title
          )}
          <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
            <NavLink to={MAP_PATH}>
              <X className="h-4 w-4" />
            </NavLink>
          </Button>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </MapCover>
  );
}
