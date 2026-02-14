import { type LatLngTuple } from "leaflet";
import { Circle } from "react-leaflet";

export interface Props {
  position: LatLngTuple;
}

/**
 * Visualizes a 30m range around POIs in which Community Ambassador POIs cannot be built within.
 */
export default function NoCaPoiZone({ position }: Props) {
  return (
    <Circle
      center={position}
      interactive={false}
      pathOptions={{ fillColor: "#f00", stroke: false }}
      radius={30}
    />
  );
}
