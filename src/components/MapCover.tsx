import { type PropsWithChildren } from "react";

/**
 * Displays a translucent black curtain that visually covers the map and disables interactivity with it.
 */
export default function MapCover({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 z-1001 flex overflow-auto bg-black/50">
      {children}
    </div>
  );
}
