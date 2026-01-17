import type { LatLngTuple } from "leaflet";
import { Circle } from "react-leaflet";

export interface Props {
  latlng: LatLngTuple;
}

/**
 * Visualizes a 80m range around POIs in which they can be interacted with.
 */
export default function InteractionRadius({ latlng }: Props) {
  return (
    <Circle
      center={latlng}
      interactive={false}
      pathOptions={{
        color: "#fff",
        fillColor: "#00f",
        fillOpacity: 0.1,
        weight: 1,
      }}
      radius={80}
    />
  );
}
