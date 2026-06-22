import MapUiIcon from "./MapUiIcon";
import { useIsLayerOn, useStore } from "./hooks/store";
import { Card, CardContent } from "./ui/card";

export default function Legend() {
  const isLayerGymOn = useIsLayerOn("gym");
  const isLayerMeetupSpotOn = useIsLayerOn("meetupspot");
  const isLayerParkingOn = useIsLayerOn("parking");
  const isLayerPokestopOn = useIsLayerOn("pokestop");
  const isLayerPowerspotOn = useIsLayerOn("powerspot");
  const isLayerRestroomOn = useIsLayerOn("restroom");
  const showDisabled = useStore((s) => s.modifiers.isDisabled);
  const showDisabledTemp = useStore((s) => s.isDisabledTemp);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  if (
    isLayerGymOn ||
    isLayerMeetupSpotOn ||
    isLayerParkingOn ||
    isLayerPokestopOn ||
    isLayerPowerspotOn ||
    isLayerRestroomOn ||
    wayfarerMode
  ) {
    let itemCount = 0;
    if (isLayerGymOn) {
      itemCount += 1;
    }

    if (isLayerMeetupSpotOn) {
      itemCount += 1;
    }

    if (isLayerParkingOn) {
      itemCount += 2;
    }

    if (isLayerPowerspotOn) {
      itemCount += 1;

      if (showDisabled) {
        itemCount += 2;
      }
    }

    if (isLayerPokestopOn) {
      itemCount += 1;
    }

    if (isLayerRestroomOn) {
      itemCount += 3;
    }

    if (wayfarerMode) {
      itemCount += 1;
    }

    return (
      <Card
        className="left fixed bottom-22 z-998 m-2 py-4 md:bottom-14 [@media(max-height:600px)]:hidden"
        data-testid="legend"
      >
        <CardContent
          className={`grid grid-flow-col grid-rows-${Math.min(6, itemCount)} gap-x-2 gap-y-1 px-4 md:grid-rows-${Math.min(4, itemCount)} md:gap-x-4`}
        >
          {isLayerGymOn && (
            <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
              <MapUiIcon
                type="gym"
                className="h-4 w-4 object-contain md:h-5 md:w-5"
              />
              <div className="text-xs md:text-sm">Gym</div>
            </div>
          )}
          {isLayerPokestopOn && (
            <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
              <MapUiIcon
                type="pokestop"
                className="h-4 w-4 object-contain md:h-5 md:w-5"
              />
              <div className="text-xs md:text-sm">PokéStop</div>
            </div>
          )}
          {isLayerPowerspotOn && (
            <>
              <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
                <MapUiIcon
                  type="powerspot"
                  className="h-4 w-4 object-contain md:h-5 md:w-5"
                />
                <div className="text-xs text-pretty md:text-sm">
                  Enabled Power Spot
                </div>
              </div>
              {(showDisabled || showDisabledTemp) && (
                <>
                  <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
                    <MapUiIcon
                      isDisabled={true}
                      type="powerspot"
                      className="h-4 w-4 object-contain md:h-5 md:w-5"
                    />
                    <div className="text-xs text-pretty md:text-sm">
                      Disabled Power Spot
                    </div>
                  </div>
                  <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
                    <MapUiIcon
                      isImpossible={true}
                      type="powerspot"
                      className="h-4 w-4 object-contain md:h-5 md:w-5"
                    />
                    <div className="text-xs text-pretty md:text-sm">
                      Impossible Power Spot
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {isLayerMeetupSpotOn && (
            <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
              <MapUiIcon type="meetupspot" className="h-4 w-4 md:h-5 md:w-5" />
              <div className="text-xs text-pretty md:text-sm">Meetup Spot</div>
            </div>
          )}
          {isLayerParkingOn && (
            <>
              <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
                <div>
                  <MapUiIcon type="parking" className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div className="text-xs text-pretty md:text-sm">
                  Free Parking
                </div>
              </div>
              <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
                <div>
                  <MapUiIcon
                    subtype="conditionally-free"
                    type="parking"
                    className="h-4 w-4 text-base md:h-5 md:w-5"
                  />
                </div>
                <div className="text-xs text-pretty md:text-sm">
                  Parking (Free Sometimes)
                </div>
              </div>
            </>
          )}
          {isLayerRestroomOn && (
            <>
              <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
                <MapUiIcon
                  subtype="all-binary"
                  type="restroom"
                  className="h-4 w-4 md:h-5 md:w-5"
                />
                <div className="text-xs text-pretty md:text-sm">
                  All-Gender / Family / Men's / Women's Restroom
                </div>
              </div>
              <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
                <MapUiIcon
                  subtype="men"
                  type="restroom"
                  className="h-4 w-4 md:h-5 md:w-5"
                />
                <div className="text-xs text-pretty md:text-sm">
                  Men's Restroom
                </div>
              </div>
              <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
                <MapUiIcon
                  subtype="women"
                  type="restroom"
                  className="h-4 w-4 md:h-5 md:w-5"
                />
                <div className="text-xs text-pretty md:text-sm">
                  Women's Restroom
                </div>
              </div>
            </>
          )}
          {wayfarerMode && (
            <div className="grid grid-cols-[20px_1fr] items-center gap-x-3">
              <MapUiIcon type="devpoi" className="h-4 w-4 md:h-5 md:w-5" />
              <div className="text-xs text-pretty md:text-sm">
                POI In-Development
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return null;
}
