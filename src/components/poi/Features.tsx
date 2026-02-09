import { type CFeatureCollection, type CProperties } from "@/types/CFeatures";
import { type LatLngTuple } from "leaflet";
import { type DivIcon, type Icon } from "leaflet";

import { type StoreState, getLayerKeyFromType, useStore } from "../hooks/store";
import FeatureMarker, { type IsBtnOn } from "./FeatureMarker";

interface GetSubtitleOptions {
  hidden?: CProperties["hidden"];
  inactive?: CProperties["hidden"];
  removed?: CProperties["removed"];
  source?: CProperties["source"];
  subtype?: CProperties["subtype"];
  wayfarerMode?: StoreState["wayfarerMode"];
}

export interface Props {
  features: CFeatureCollection["features"];
  icon:
    | DivIcon
    | Icon
    | ((
        type: CProperties["type"],
        subtype?: CProperties["subtype"],
      ) => DivIcon | Icon);
  isBtnOn?: IsBtnOn;
  renderHtml?: boolean;
  subtitle?:
    | string
    | ((type: CProperties["type"], options?: GetSubtitleOptions) => string);
  type: CProperties["type"];
}

export default function Features({
  features,
  icon,
  isBtnOn,
  renderHtml,
  subtitle,
  type,
}: Props) {
  const layer = useStore((s) => s[getLayerKeyFromType(type)]);
  const showHidden = useStore((s) => s.modifiers.hidden);
  const showInactive = useStore((s) => s.modifiers.inactive);
  const showRemoved = useStore((s) => s.modifiers.removed);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markers = [];

  for (const {
    id,
    geometry,
    properties: {
      desc,
      hidden,
      inactive,
      name,
      photo,
      removed,
      source,
      subtype,
      type,
    },
  } of features) {
    if (
      (!showHidden && hidden) ||
      (!showInactive && inactive) ||
      (!showRemoved && removed)
    ) {
      // Skip if hidden or removed and those modifiers are off
      continue;
    }

    if (id && layer[id]?.isVisible) {
      const latlng = [
        geometry.coordinates[1],
        geometry.coordinates[0],
      ] as LatLngTuple;

      markers.push(
        <FeatureMarker
          key={id}
          id={id as string}
          isBtnOn={isBtnOn}
          desc={desc}
          icon={typeof icon === "function" ? icon?.(type, subtype) : icon}
          latlng={latlng}
          photo={photo}
          removed={removed}
          renderHtml={renderHtml}
          subtitle={
            typeof subtitle === "function"
              ? subtitle?.(type, {
                  hidden,
                  removed,
                  source,
                  subtype,
                  wayfarerMode,
                })
              : subtitle
          }
          title={name}
          type={type}
        />,
      );
    }
  }

  return markers;
}
