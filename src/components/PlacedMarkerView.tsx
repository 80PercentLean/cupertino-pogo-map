import { Eye, EyeClosed } from "lucide-react";
import { useContext } from "react";

import { imgLeafletMarker } from "../leafletIcons";
import { MapContext } from "./MapContext";
import { useStore } from "./hooks/store";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const itemClassName =
  "cursor-pointer text-sm px-4 pr-0 w-full rounded-none justify-start h-12 font-normal gap-2";
const iconClassName = "h-full w-auto object-contain";
const nameClassName = "flex h-full items-center overflow-x-scroll pr-2";

export default function PlacedMarkerView() {
  const { map } = useContext(MapContext);
  const activePopup = useStore((s) => s.activePopup);
  const placedMarkerStates = useStore((s) => s.placedMarkerStates);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const updatePlacedMarkerState = useStore((s) => s.updatePlacedMarkerState);

  const placedMarkerItems = placedMarkerStates.map(
    ({ id, isVisible, position }, i) => (
      <>
        {i !== 0 && <Separator />}
        <Button
          variant="ghost"
          className={itemClassName}
          onClick={() => {
            if (activePopup.id && activePopup.id !== id) {
              setActivePopup(null, null);
            }

            updatePlacedMarkerState(i, {
              isVisible: true,
            });

            // Hack to make sure the popup opens after a potential previous popup is closed
            if (activePopup.id !== id) {
              setTimeout(() => {
                setActivePopup(id, "placed");
              }, 0);
            }

            // Hack to reduce flyTo glitches breaking positions of features on the map
            setTimeout(() => {
              map?.flyTo(position);
            }, 0);
          }}
        >
          <div className="flex h-full w-6 items-center justify-center">
            <img
              src={imgLeafletMarker}
              alt="Default Marker Icon"
              className={iconClassName}
            />
          </div>
          <div className="flex h-full w-6 items-center justify-center">
            {isVisible ? (
              <Eye className="w-4" />
            ) : (
              <EyeClosed className="h-4 w-4" />
            )}
          </div>
          <div className={nameClassName}>{id}</div>
        </Button>
      </>
    ),
  );

  return (
    <div>
      {placedMarkerItems.length > 0 ? (
        placedMarkerItems
      ) : (
        <div className="text-sm italic">You didn't place any markers.</div>
      )}
    </div>
  );
}
