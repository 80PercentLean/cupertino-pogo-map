import { type LatLngTuple } from "leaflet";

import CCircle from "../CCircle";

export interface Props {
  position: LatLngTuple;
}

/**
 * Visualizes a 30m range around POIs in which Community Ambassador POIs cannot be built within.
 */
export default function NoCaPoiZone({ position }: Props) {
  return (
    <CCircle
      center={position}
      interactive={false}
      pathOptions={{ fillColor: "#f00", stroke: false }}
      radius={30}
      data-rangetype="no-ca-poi"
    />
  );
}
