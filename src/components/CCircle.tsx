import { Circle as LeafletCircle } from "leaflet";
import { type RefObject, useEffect, useRef } from "react";
import { Circle, type CircleProps } from "react-leaflet";

interface CCircleExclusiveProps {
  ref?: RefObject<LeafletCircle | null>;
  "data-rangetype"?: string;
  "data-testid"?: string;
}

export type CCircleProps = CircleProps & CCircleExclusiveProps;

/**
 * This is a custom circle component extends React Leaflet's <Circle> to support custom
 * HTML attributes to the circle element.
 */
export default function CCircle(props: CCircleProps) {
  const { ref, "data-rangetype": rangeType, "data-testid": testId } = props;
  const refInternal = useRef<LeafletCircle | null>(null);

  useEffect(() => {
    const marker = ref?.current ?? refInternal.current;
    const icon = marker?.getElement();

    if (icon) {
      if (rangeType) {
        icon.setAttribute("data-rangetype", rangeType);
      }

      if (testId) {
        icon.setAttribute("data-testid", testId);
      }
    }
  }, [rangeType, ref, testId]);

  return <Circle ref={ref ?? refInternal} {...props} />;
}
