import type { LatLngTuple } from "leaflet";
import { Circle } from "react-leaflet";

export interface Props {
  latlng: LatLngTuple;
}

/**
 * Visualizes a 22m range around PokeStops/Gyms that Power Spots cannot exist in.
 */
export default function NoPowerSpotZone({ latlng }: Props) {
  return (
    <Circle
      center={latlng}
      interactive={false}
      pathOptions={{ fillColor: "#333", stroke: false }}
      radius={22}
    />
  );
}
