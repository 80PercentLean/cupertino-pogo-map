import { useEffect, useRef } from "react";
import { Marker, type MarkerProps } from "react-leaflet";

type CMarkerExclusiveProps = {
  "data-testid"?: string;
};

export type CMarkerProps = MarkerProps & CMarkerExclusiveProps;

/**
 * This is a custom Marker component extends React Leaflet's <Marker> to support custom
 * HTML attributes to the marker's icon element.
 */
export default function CMarker(props: CMarkerProps) {
  // TODO: Not sure what the type of this ref should be
  const markerRef = useRef(null);

  useEffect(() => {
    const testId = props["data-testid"];
    if (testId && markerRef.current) {
      // @ts-ignore
      markerRef.current._icon.dataset.testid = testId;
    }
  }, []);

  return <Marker ref={markerRef} {...props} />;
}
