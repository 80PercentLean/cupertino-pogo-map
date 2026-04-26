import { type CFeatureCollection, type CProperties } from "@/types/CFeatures";
import { type LatLngTuple } from "leaflet";
import { type DivIcon, type Icon } from "leaflet";

import { type StoreState, getLayerKeyFromType, useStore } from "../hooks/store";
import FeatureMarker, { type BtnModifierFlags } from "./FeatureMarker";

interface GetSubtitleOptions {
  isCommunityContributed?: CProperties["isCommunityContributed"];
  isDisabled?: CProperties["isHidden"];
  isHidden?: CProperties["isHidden"];
  removed?: CProperties["removed"];
  source?: CProperties["source"];
  subtype?: CProperties["subtype"];
  wayfarerMode?: StoreState["wayfarerMode"];
}

export interface Props {
  btnModifierFlags?: BtnModifierFlags;
  features: CFeatureCollection["features"];
  icon:
    | DivIcon
    | Icon
    | ((
        type: CProperties["type"],
        subtype?: CProperties["subtype"],
      ) => DivIcon | Icon);
  renderHtml?: boolean;
  subtitle?:
    | string
    | ((type: CProperties["type"], options?: GetSubtitleOptions) => string);
  type: CProperties["type"];
}

export default function Features({
  btnModifierFlags,
  features,
  icon,
  renderHtml,
  subtitle,
  type,
}: Props) {
  const layer = useStore((s) => s[getLayerKeyFromType(type)]);
  const showDisabled = useStore((s) => s.modifiers.isDisabled);
  const showHidden = useStore((s) => s.modifiers.isHidden);
  const showRemoved = useStore((s) => s.modifiers.removed);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markers = [];

  for (const {
    id,
    geometry,
    properties: {
      desc,
      isCommunityContributed,
      isDisabled,
      isHidden,
      name,
      photo,
      removed,
      source,
      subtype,
      type,
    },
  } of features) {
    if (
      (!showDisabled && isDisabled) ||
      (!showHidden && isHidden) ||
      (!showRemoved && removed)
    ) {
      // Skip if hidden or removed and those modifiers are off
      continue;
    }

    if (id && layer[id]?.isVisible) {
      const position: LatLngTuple = [
        geometry.coordinates[1],
        geometry.coordinates[0],
      ];

      markers.push(
        <FeatureMarker
          btnModifierFlags={btnModifierFlags}
          key={id}
          id={id}
          desc={desc}
          icon={typeof icon === "function" ? icon?.(type, subtype) : icon}
          isDisabled={isDisabled}
          photo={photo}
          position={position}
          removed={removed}
          renderHtml={renderHtml}
          subtitle={
            typeof subtitle === "function"
              ? subtitle?.(type, {
                  isCommunityContributed,
                  isHidden,
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
