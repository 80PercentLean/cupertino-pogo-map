import { Marker as LeafletMarker } from "leaflet";
import { type RefObject, useEffect, useRef } from "react";
import { Marker, type MarkerProps } from "react-leaflet";

interface CMarkerExclusiveProps {
  ref?: RefObject<LeafletMarker | null>;
  "data-isdisabled"?: string;
  "data-ishidden"?: string;
  "data-isimpossible"?: string;
  "data-poitype"?: string;
  "data-removed"?: string;
  "data-testid"?: string;
}

export type CMarkerProps = MarkerProps & CMarkerExclusiveProps;

/**
 * This is a custom marker component extends React Leaflet's <Marker> to support custom
 * HTML attributes to the marker's icon element.
 */
export default function CMarker(props: CMarkerProps) {
  const {
    ref,
    "data-isdisabled": isDisabled,
    "data-ishidden": isHidden,
    "data-isimpossible": isImpossible,
    "data-testid": testId,
    "data-poitype": poiType,
    "data-removed": removed,
  } = props;
  const refInternal = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    const marker = ref?.current ?? refInternal.current;
    const icon = marker?.getElement();

    if (icon) {
      if (isImpossible) {
        icon.dataset.isimpossible = isImpossible;
      } else if (isDisabled) {
        icon.dataset.isdisabled = isDisabled;
      }

      if (isHidden) {
        icon.dataset.ishidden = isHidden;
      }

      if (poiType) {
        icon.dataset.poitype = poiType;
      }

      if (removed) {
        icon.dataset.removed = removed;
      }

      if (testId) {
        icon.dataset.testid = testId;
      }

      if (poiType === "powerspot" && !isDisabled && !isImpossible) {
        icon.dataset.isenabled = "true";
      }
    }
  }, [ref, isDisabled, isHidden, isImpossible, poiType, removed, testId]);

  return <Marker ref={ref ?? refInternal} {...props} />;
}
