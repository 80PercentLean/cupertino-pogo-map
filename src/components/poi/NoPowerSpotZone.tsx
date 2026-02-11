import type { LatLngTuple } from "leaflet";
import { Circle } from "react-leaflet";

export interface Props {
  position: LatLngTuple;
}

/**
 * Visualizes a 22m range around PokeStops/Gyms that Power Spots cannot exist in.
 */
export default function NoPowerSpotZone({ position }: Props) {
  return (
    <Circle
      center={position}
      interactive={false}
      pathOptions={{ fillColor: "#000", stroke: false }}
      radius={22}
    />
  );
}
