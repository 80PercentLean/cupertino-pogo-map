import LinkExt from "./LinkExt";
import UiOverlayCard from "./UiOverlayCard";

/**
 * Displays the information view.
 */
export default function InfoView() {
  return (
    <UiOverlayCard title="Information">
      <>
        <p>
          The Cupertino PoGO map is an open source project run by the Cupertino
          PoGO Group.
        </p>
        <p className="mt-6">
          You can find the GitHub repository here:
          <br />
          <LinkExt href="https://github.com/80PercentLean/cupertino-pogo-map">
            https://github.com/80PercentLean/cupertino-pogo-map
          </LinkExt>
        </p>
        <hr className="mt-6" />
        <h2 className="mt-6 font-semibold">Leaflet Attribution</h2>
        <ul className="mt-6 list-disc space-y-2 pl-4">
          <li>
            Default tile layer: &copy;{" "}
            <LinkExt href="https://www.openstreetmap.org/copyright">
              OpenStreetMap
            </LinkExt>{" "}
            contributors, Tiles courtesy of{" "}
            <LinkExt href="https://www.openstreetmap.cat">
              Breton OpenStreetMap Team
            </LinkExt>
          </li>
          <li>
            Extra info tile layer: &copy;{" "}
            <LinkExt href="https://www.openstreetmap.org/copyright">
              OpenStreetMap
            </LinkExt>{" "}
            contributors
          </li>
          <li>
            Satellite tile layer: Tiles &copy; Esri &mdash; Source: Esri,
            i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP,
            UPR-EGP, and the GIS User Community
          </li>
        </ul>
      </>
    </UiOverlayCard>
  );
}
