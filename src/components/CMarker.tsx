import { useEffect, useRef } from "react";
import { Marker, type MarkerProps } from "react-leaflet";

interface CMarkerExclusiveProps {
  "data-testid"?: string;
}

export type CMarkerProps = MarkerProps & CMarkerExclusiveProps;

/**
 * This is a custom marker component extends React Leaflet's <Marker> to support custom
 * HTML attributes to the marker's icon element.
 */
export default function CMarker(props: CMarkerProps) {
  // TODO: Not sure what the type of this ref should be
  const markerRef = useRef(null);
  const testId = props["data-testid"];

  useEffect(() => {
    if (testId && markerRef.current) {
      // @ts-expect-error Not sure how to resolve the following type error on _icon
      markerRef.current._icon.dataset.testid = testId;
    }
  }, [testId]);

  return <Marker ref={markerRef} {...props} />;
}
