import { useEffect, useRef } from "react";
import { CircleMarker, type CircleMarkerProps } from "react-leaflet";

interface CCircleMarkerExclusiveProps {
  "data-testid"?: string;
}

export type CCircleMarkerProps = CircleMarkerProps &
  CCircleMarkerExclusiveProps;

/**
 * This is a custom CircleMarker component extends React Leaflet's <CircleMarker> to support custom
 * HTML attributes to the marker's icon element.
 */
export default function CCircleMarker(props: CCircleMarkerProps) {
  // TODO: Not sure what the type of this ref should be
  const markerRef = useRef(null);
  const testId = props["data-testid"];

  useEffect(() => {
    if (testId && markerRef.current) {
      // @ts-expect-error Not sure how to resolve the following type error on _path
      markerRef.current._path.dataset.testid = testId;
    }
  }, [testId]);

  return <CircleMarker ref={markerRef} {...props} />;
}
