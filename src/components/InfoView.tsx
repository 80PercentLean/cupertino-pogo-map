import { CAMPFIRE_LINK, GROUP_NAME } from "@/constants";
import { Info } from "lucide-react";

import FooterTxt from "./FooterTxt";
import LinkExt from "./LinkExt";
import UiOverlayCard from "./UiOverlayCard";
import UiOverlayCardIconTitle from "./UiOverlayCardIconTitle";
import { Separator } from "./ui/separator";

/**
 * Displays the information view.
 */
export default function InfoView() {
  return (
    <UiOverlayCard
      title={<UiOverlayCardIconTitle Icon={Info} text="Information" />}
    >
      <h2 className="font-semibold">About This Project</h2>
      <p className="mt-6">
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
      <Separator className="my-6" />
      <h2 className="font-semibold">Leaflet Attribution</h2>
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
      <Separator className="my-6" />
      <footer className="text-muted-foreground flex flex-col gap-2 text-sm">
        <FooterTxt />
      </footer>
    </UiOverlayCard>
  );
}
