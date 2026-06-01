import { CircleMarker as LeafletCircleMarker } from "leaflet";
import { type RefObject, useEffect, useRef } from "react";
import { CircleMarker, type CircleMarkerProps } from "react-leaflet";

interface CCircleMarkerExclusiveProps {
  ref?: RefObject<LeafletCircleMarker | null>;
  "data-testid"?: string;
}

export type CCircleMarkerProps = CircleMarkerProps &
  CCircleMarkerExclusiveProps;

/**
 * This is a custom circle marker component extends React Leaflet's <CircleMarker> to support custom
 * HTML attributes to the marker's icon element.
 */
export default function CCircleMarker(props: CCircleMarkerProps) {
  const { ref, "data-testid": testId } = props;
  const refInternal = useRef<LeafletCircleMarker | null>(null);

  useEffect(() => {
    if (testId && refInternal.current) {
      const icon = refInternal.current?.getElement();

      if (icon) {
        icon.setAttribute("data-testid", testId);
      }
    }
  }, [testId]);

  return <CircleMarker ref={ref ?? refInternal} {...props} />;
}
