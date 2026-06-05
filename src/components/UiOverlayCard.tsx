import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { type PropsWithChildren, type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import MapCover from "./MapCover";
import { useStore } from "./hooks/store";

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
  const activeMainView = useStore((s) => s.activeMainView);
  const setActiveMainView = useStore((s) => s.setActiveMainView);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMainView && e.key === "Escape") {
        setActiveMainView(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeMainView, setActiveMainView]);

  return (
    <MapCover>
      {createPortal(
        <div className="fixed inset-0 z-1001 flex h-full items-center justify-center">
          <Card className="absolute top-0 right-0 left-0 mb-20 h-full gap-0 rounded-none pb-15 md:static md:top-auto md:right-auto md:bottom-auto md:left-auto md:m-auto md:h-auto md:max-h-full md:w-125 md:rounded-xl md:pb-0">
            <CardHeader className="border-gray flex flex-row items-center justify-between border-b shadow-sm">
              {title && typeof title === "string" ? (
                <CardTitle>
                  <h1>{title}</h1>
                </CardTitle>
              ) : (
                title
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 cursor-pointer"
                onClick={() => setActiveMainView(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="overflow-y-auto pt-6 pb-10 md:pb-6">
              {children}
            </CardContent>
          </Card>
        </div>,
        document.body,
      )}
    </MapCover>
  );
}
