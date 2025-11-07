import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import LinkExt from "./LinkExt";

/**
 * Displays the information view.
 */
export default function InfoView() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-1000 flex items-center justify-center overflow-auto bg-black/50">
      <Card className="absolute top-0 right-0 left-0 min-h-full rounded-none md:static md:min-h-0 md:w-[500px] md:rounded-xl">
        <CardHeader>
          <CardTitle>
            <h1>Info</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The Cupertino PoGO map is an open source project run by the
            Cupertino PoGO Group.
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
        </CardContent>
      </Card>
    </div>
  );
}
