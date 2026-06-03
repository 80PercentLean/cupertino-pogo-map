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
      <h2 className="font-semibold text-balance">About This Project</h2>
      <p className="mt-[1em] text-pretty">
        This map app is an open source project run by{" "}
        <LinkExt href={CAMPFIRE_LINK} openNewWindow>
          {GROUP_NAME}
        </LinkExt>
        .
      </p>
      <p className="mt-[1em]">
        You can find the GitHub repository here:
        <br />
        <LinkExt
          href="https://github.com/80PercentLean/cupertino-pogo-map"
          openNewWindow
        >
          https://github.com/80PercentLean/cupertino-pogo-map
        </LinkExt>
      </p>
      <Separator className="my-[2em]" />
      <h2 className="font-semibold text-balance">
        What Are Enabled & Disabled Power Spots?
      </h2>
      <p className="mt-[1em] text-pretty">
        Enabled/Disabled Power Spots are not official terms, but we use it to
        distinguish different types of Power Spots that people usually don't
        consider.
      </p>
      <p className="mt-[1em] text-pretty">
        Most people are aware of <b>Active Power Spots</b> which are the Power
        Spots that can spawn Pokémon for that given day.
      </p>
      <p className="mt-[1em] text-pretty">
        <b>Enabled Power Spots</b> are different in that they are Power Spots
        that are in the currently monthly spawn pool. That means for any given
        day, they have a chance to become Active Power Spots and spawn Pokémon.
      </p>
      <p className="mt-[1em] text-pretty">
        <b>Disabled Power Spots</b> are Power Spots that are not in the current
        monthly spawn pool. That means for the given monthly time period, they
        can never become Active Power Spots. When the monthly rotation occurs,
        they do have a chance in becoming an Enabled Power Spot which in turn
        will allow them to possibly spawn Pokémon for that month.
      </p>
      <Separator className="my-[2em]" />
      <h2 className="font-semibold text-balance">Leaflet Attribution</h2>
      <ul className="mt-[1em] list-disc space-y-2 pl-4">
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
