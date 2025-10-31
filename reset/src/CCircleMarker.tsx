import { useEffect, useRef } from "react";
import { CircleMarker, type CircleMarkerProps } from "react-leaflet";

type CCircleMarkerExclusiveProps = {
  "data-testid"?: string;
};

export type CCircleMarkerProps = CircleMarkerProps &
  CCircleMarkerExclusiveProps;

/**
 * This is a custom CircleMarker component extends React Leaflet's <CircleMarker> to support custom
 * HTML attributes to the marker's icon element.
 */
export default function CCircleMarker(props: CCircleMarkerProps) {
  // TODO: Not sure what the type of this ref should be
  const markerRef = useRef(null);

  useEffect(() => {
    const testId = props["data-testid"];
    if (testId && markerRef.current) {
      // @ts-ignore
      markerRef.current._path.dataset.testid = testId;
      console.log(markerRef.current);
    }
  }, []);

  return <CircleMarker ref={markerRef} {...props} />;
}
