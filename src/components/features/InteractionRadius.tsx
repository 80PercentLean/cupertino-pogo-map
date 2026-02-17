import { type LatLngTuple } from "leaflet";
import { Circle } from "react-leaflet";

export interface Props {
  position: LatLngTuple;
}

/**
 * Visualizes a 80m range around POIs in which they can be interacted with.
 */
export default function InteractionRadius({ position }: Props) {
  return (
    <Circle
      center={position}
      interactive={false}
      pathOptions={{
        color: "#38bdf8",
        fillColor: "#1d4ed8",
        fillOpacity: 0.1,
        weight: 1,
      }}
      radius={80}
    />
  );
}
