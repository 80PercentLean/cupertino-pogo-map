import { CUP_POGO_CAMPFIRE, WG_CAMPFIRE } from "@/constants";
import { Info } from "lucide-react";

import LinkExt from "./LinkExt";
import UiOverlayCard from "./UiOverlayCard";
import UiOverlayCardIconTitle from "./UiOverlayCardIconTitle";
import { Separator } from "./ui/separator";

const IS_CENTRAL = import.meta.env.VITE_IS_CENTRAL === "true";

const GROUP_NAME = IS_CENTRAL ? "Wild\u00A0Goose" : "Cupertino PoGO\u00A0Group";

const CAMPFIRE_LINK = IS_CENTRAL ? WG_CAMPFIRE : CUP_POGO_CAMPFIRE;

/**
 * Displays the information view.
 */
export default function InfoView() {
  return (
    <UiOverlayCard
      title={<UiOverlayCardIconTitle Icon={Info} text="Information" />}
    >
      <p>
        This map app is an open source project run by the{" "}
        <LinkExt href={CAMPFIRE_LINK} openNewWindow>
          {GROUP_NAME}
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
      <Separator className="mt-6" />
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
        <li>
          Extra info tile layer: Tiles &copy; Esri &mdash; Source: Esri,
          DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri
          China (Hong Kong), Esri (Thailand), TomTom, 2012
        </li>
        <li>
          Satellite tile layer: Tiles &copy; Esri &mdash; Source: Esri, i-cubed,
          USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and
          the GIS User Community
        </li>
      </ul>
    </UiOverlayCard>
  );
}
