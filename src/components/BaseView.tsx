import MapView from "./MapView";
import UiOverlay from "./UiOverlay";

/**
 * Base view that renders the map and UI overlay on top of it.
 */
export default function BaseView() {
  return (
    <>
      <MapView />
      <UiOverlay />
    </>
  );
}
