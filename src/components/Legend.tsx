import MapUiIcon from "./MapUiIcon";
import { useStore } from "./hooks/store";
import { Card, CardContent } from "./ui/card";

export default function Legend() {
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  return (
    <Card className="left fixed bottom-22 z-998 m-2 py-4 md:bottom-14">
      <CardContent className="grid grid-flow-col grid-rows-6 gap-x-2 gap-y-1 px-4 md:grid-rows-4 md:gap-x-4">
        <div className="grid grid-cols-[20px_1fr] items-center gap-x-2">
          <MapUiIcon
            type="gym"
            className="h-4 w-4 justify-self-center object-contain md:h-5 md:w-5"
          />
          <div className="text-xs md:text-sm">Gym</div>
        </div>
        <div className="grid grid-cols-[20px_1fr] items-center gap-x-2">
          <MapUiIcon
            type="pokestop"
            className="h-4 w-4 justify-self-center object-contain md:h-5 md:w-5"
          />
          <div className="text-xs md:text-sm">PokéStop</div>
        </div>
        <div className="grid grid-cols-[20px_1fr] items-center gap-x-2">
          <MapUiIcon
            type="powerspot"
            className="h-4 w-4 justify-self-center object-contain md:h-5 md:w-5"
          />
          <div className="text-xs md:text-sm">Enabled Power Spot</div>
        </div>
        <div className="grid grid-cols-[20px_1fr] items-center gap-x-2">
          <MapUiIcon
            isDisabled={true}
            type="powerspot"
            className="h-4 w-4 justify-self-center object-contain md:h-5 md:w-5"
          />
          <div className="text-xs md:text-sm">Disabled Power Spot</div>
        </div>
        <div className="grid grid-cols-[20px_1fr] items-center gap-x-2">
          <MapUiIcon
            type="meetupspot"
            className="h-4 w-4 justify-self-center md:h-5 md:w-5"
          />
          <div className="text-xs md:text-sm">Meetup Spot</div>
        </div>
        <div className="grid grid-cols-[20px_1fr] items-center gap-x-2">
          <div>
            <MapUiIcon
              type="parking"
              className="h-4 w-4 justify-self-center md:h-5 md:w-5"
            />
          </div>
          <div className="text-xs md:text-sm">Free Parking</div>
        </div>
        <div className="grid grid-cols-[20px_1fr] items-center gap-x-2">
          <div>
            <MapUiIcon
              subtype="conditionally-free"
              type="parking"
              className="h-4 w-4 justify-self-center md:h-5 md:w-5"
            />
          </div>
          <div className="text-xs md:text-sm">Parking (Free Sometimes)</div>
        </div>
        <div className="grid h-full grid-cols-[20px_1fr] items-center gap-x-2">
          <MapUiIcon
            subtype="all-binary"
            type="restroom"
            className="h-4 w-4 justify-self-center md:h-5 md:w-5"
          />
          <div className="text-xs md:text-sm">
            All-Gender/Men's/Women's Restroom
          </div>
        </div>
        <div className="grid grid-cols-[20px_1fr] items-center gap-x-2">
          <MapUiIcon
            subtype="men"
            type="restroom"
            className="h-4 w-4 justify-self-center md:h-5 md:w-5"
          />
          <div className="text-xs md:text-sm">Men's Restroom</div>
        </div>
        <div className="grid grid-cols-[20px_1fr] items-center gap-x-2">
          <MapUiIcon
            subtype="women"
            type="restroom"
            className="h-4 w-4 justify-self-center md:h-5 md:w-5"
          />
          <div className="text-xs md:text-sm">Women's Restroom</div>
        </div>
        {wayfarerMode && (
          <div className="grid grid-cols-[20px_1fr] items-center gap-x-2">
            <MapUiIcon
              type="devpoi"
              className="h-4 w-4 justify-self-center md:h-5 md:w-5"
            />
            <div className="text-xs md:text-sm">Dev POI</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
