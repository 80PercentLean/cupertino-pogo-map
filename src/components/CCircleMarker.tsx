import { CircleMarker as LeafletCircleMarker } from "leaflet";
import { useEffect, useRef } from "react";
import { CircleMarker, type CircleMarkerProps } from "react-leaflet";

interface CCircleMarkerExclusiveProps {
  "data-testid"?: string;
}

export type CCircleMarkerProps = CircleMarkerProps &
  CCircleMarkerExclusiveProps;

/**
 * This is a custom circle marker component extends React Leaflet's <CircleMarker> to support custom
 * HTML attributes to the marker's icon element.
 */
export default function CCircleMarker(props: CCircleMarkerProps) {
  // TODO: Not sure what the type of this ref should be
  const refInternal = useRef<LeafletCircleMarker | null>(null);
  const testId = props["data-testid"];

  useEffect(() => {
    if (testId && refInternal.current) {
      const icon = refInternal.current?.getElement();

      if (icon) {
        icon.setAttribute("data-testid", testId);
      }
    }
  }, [testId]);

  return <CircleMarker ref={refInternal} {...props} />;
}
