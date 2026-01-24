import { Marker as LeafletMarker } from "leaflet";
import { type Ref, useEffect, useRef } from "react";
import { Marker, type MarkerProps } from "react-leaflet";

interface CMarkerExclusiveProps {
  ref?: Ref<LeafletMarker>;
  "data-testid"?: string;
}

export type CMarkerProps = MarkerProps & CMarkerExclusiveProps;

/**
 * This is a custom marker component extends React Leaflet's <Marker> to support custom
 * HTML attributes to the marker's icon element.
 */
export default function CMarker(props: CMarkerProps) {
  // TODO: Not sure what the type of this ref should be
  const { ref } = props;
  const testId = props["data-testid"];
  const markerRef = useRef<LeafletMarker>(null);

  useEffect(() => {
    if (testId && markerRef.current) {
      // @ts-expect-error _icon property has an unresolved type error at the moment
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      markerRef.current._icon.dataset.testid = testId;
    }
  }, [testId]);

  return <Marker ref={ref ?? markerRef} {...props} />;
}
