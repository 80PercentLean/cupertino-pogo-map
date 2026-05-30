import { Marker as LeafletMarker } from "leaflet";
import { type RefObject, useEffect, useRef } from "react";
import { Marker, type MarkerProps } from "react-leaflet";

interface CMarkerExclusiveProps {
  ref?: RefObject<LeafletMarker | null>;
  "data-testid"?: string;
}

export type CMarkerProps = MarkerProps & CMarkerExclusiveProps;

/**
 * This is a custom marker component extends React Leaflet's <Marker> to support custom
 * HTML attributes to the marker's icon element.
 */
export default function CMarker(props: CMarkerProps) {
  const { ref, "data-testid": testId } = props;
  const refInternal = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    if (testId) {
      const marker = ref?.current ?? refInternal.current;
      const icon = marker?.getElement();

      if (icon) {
        icon.dataset.testid = testId;
      }
    }
  }, [ref, testId]);

  return <Marker ref={ref ?? refInternal} {...props} />;
}
