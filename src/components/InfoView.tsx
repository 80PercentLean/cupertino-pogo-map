import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GROUP_NAME, ROOT_PATH } from "@/constants";
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
      closeBtnLabel="Close information view"
      title={<UiOverlayCardIconTitle Icon={Info} text="Information" />}
    >
      <Accordion type="single" collapsible defaultValue="about-this-project">
        <AccordionItem value="about-this-project">
          <AccordionTrigger className="cursor-pointer">
            <h2 className="font-semibold text-balance">About This Project</h2>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-pretty">
              This app is an open source project run by{" "}
              <LinkExt href={ROOT_PATH || "/"}>{GROUP_NAME}</LinkExt>.
            </p>
            <p className="mt-[1em]">
              You can find the GitHub repository and license here:
              <br />
              <LinkExt
                href="https://github.com/80PercentLean/cupertino-pogo-map"
                openNewWindow
              >
                https://github.com/80PercentLean/cupertino-pogo-map
              </LinkExt>
            </p>
            <p className="mt-[1em]">
              We welcome anyone to contribute. Whether you'd like to directly
              work on the codebase, help maintain map data, or suggest new
              features, we'd love your involvement!
            </p>
            <p className="mt-[1em]">
              We have{" "}
              <LinkExt
                href="https://github.com/80PercentLean/cupertino-pogo-map/discussions"
                openNewWindow
              >
                GitHub Discussions
              </LinkExt>{" "}
              open if you have any questions and feature suggestions.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="using-with-wayfarer">
          <AccordionTrigger className="cursor-pointer">
            <h2 className="font-semibold text-balance">
              Using With Niantic Wayfarer
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-pretty">
              Do you want to submit new points of interest like PokéStops and
              Power Spots to our play area? Then this map has special features
              just for you that can help you out with that!
            </p>
            <p className="mt-[1em] text-pretty">
              Please read the{" "}
              <LinkExt
                href="https://github.com/80PercentLean/cupertino-pogo-map/blob/main/docs/wayfarer-tips.md"
                openNewWindow
              >
                "Use With Niantic Wayfarer: Tips for Wayfinders" document
              </LinkExt>
              on our GitHub to learn how to make the most of the tools and
              features available on this map.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="power-spot-terminology">
          <AccordionTrigger className="cursor-pointer">
            <h2 className="font-semibold text-balance">
              Power Spot Terminology
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-pretty">
              Enabled/Disabled Power Spots are not official terms, but we use it
              to distinguish different types of Power Spots that people usually
              don't consider.
            </p>
            <p className="mt-[1em] text-pretty">
              Most people are aware of <b>Active Power Spots</b> which are the
              Power Spots that can spawn Pokémon for that given day.
            </p>
            <p className="mt-[1em] text-pretty">
              <b>Enabled Power Spots</b> are different in that they are Power
              Spots that are in the currently monthly spawn pool. That means for
              any given day, they have a chance to become Active Power Spots and
              spawn Pokémon.
            </p>
            <p className="mt-[1em] text-pretty">
              <b>Disabled Power Spots</b> are Power Spots that are not in the
              current monthly spawn pool. That means for the given monthly time
              period, they can never become Active Power Spots. When the monthly
              rotation occurs, they do have a chance in becoming an Enabled
              Power Spot which in turn will allow them to possibly spawn Pokémon
              during that month.
            </p>
            <p className="mt-[1em] text-pretty">
              <b>Impossible Power Spots</b> are Power Spots that can never
              become Enabled Power Spots. They can essentially never exist
              in-game unless the conditions around them are changed, but they do
              exist within Wayfarer.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Separator className="mb-4" />
      <h2 className="text-sm font-semibold text-balance">
        Leaflet Attribution
      </h2>
      <ul className="mt-[1em] list-disc space-y-2 pl-4 text-sm">
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
      <Separator className="my-4" />
      <footer className="text-muted-foreground flex flex-col gap-2 text-xs">
        <FooterTxt />
      </footer>
    </UiOverlayCard>
  );
}
