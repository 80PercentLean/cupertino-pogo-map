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
          The Cupertino PoGO map is an open source project run by the{" "}
          <LinkExt
            href="https://campfire.onelink.me/eBr8?af_dp=campfire://&af_force_deeplink=true&deep_link_sub1=cj1jbHVicyZjPTk4MjZkY2U4LTZhM2ItNDQxNC05N2M1LTg1NzYzNDYzY2VmNSZpPXRydWU="
            openNewWindow
          >
            Cupertino PoGO Group
          </LinkExt>
          .
        </p>
        <p className="mt-6">
          You can find the GitHub repository here:
          <br />
          <LinkExt
            href="https://github.com/80PercentLean/cupertino-pogo-map"
            openNewWindow
          >
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
            contributors &copy;{" "}
            <LinkExt href="https://carto.com/attributions">CARTO</LinkExt>
          </li>
          {/* <li>
            Default tile layer: &copy;{" "}
            <LinkExt href="https://www.openstreetmap.org/copyright">
              OpenStreetMap
            </LinkExt>{" "}
            contributors, Tiles courtesy of{" "}
            <LinkExt href="https://www.openstreetmap.cat">
              Breton OpenStreetMap Team
            </LinkExt>
          </li> */}
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
