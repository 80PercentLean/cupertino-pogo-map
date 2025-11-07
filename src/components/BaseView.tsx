import FloatingLayer from "./FloatingLayer";
import MapView from "./MapView";

/**
 * Base view that renders the map and floating layer on top of it.
 */
export default function BaseView() {
  return (
    <>
      <MapView />
      <FloatingLayer />
    </>
  );
}
