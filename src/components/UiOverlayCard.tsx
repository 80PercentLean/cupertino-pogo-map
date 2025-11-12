import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROOT_PATH } from "@/constants";
import { CircleX } from "lucide-react";
import { type PropsWithChildren } from "react";
import { NavLink } from "react-router";

import MapCover from "./MapCover";
import { Button } from "./ui/button";

export interface Props {
  title: string;
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
      <Card className="absolute top-0 right-0 left-0 min-h-full rounded-none md:static md:min-h-0 md:w-[500px] md:rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            <h1>{title}</h1>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => console.log("Closed")}
            asChild
          >
            <NavLink to={ROOT_PATH}>
              <CircleX className="h-4 w-4" />
            </NavLink>
          </Button>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </MapCover>
  );
}
