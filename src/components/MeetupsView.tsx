import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CAMPFIRE_LINK, CHECK_IN_PATH, IS_CENTRAL } from "@/constants";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { ExternalLink, FlameKindling, Gift } from "lucide-react";

import UiOverlayCard from "./UiOverlayCard";
import UiOverlayCardIconTitle from "./UiOverlayCardIconTitle";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Spinner } from "./ui/spinner";

interface DiscordEvent {
  id: string;
  description: string;
  image: string;
  name: string;
  scheduled_start_time: string;
}

interface DiscordEventListRes {
  data: DiscordEvent[];
}

/**
 * Extract the Campfire meetup link from the Discord event description.
 * @param desc The description from the Discord event
 * @returns The Campfire meetup link if it can, otherwise it will return null
 */
const extractCampfireLink = (desc: string): string | null => {
  const regex = /https:\/\/cmpf\.re\/\S+$/;
  const match = regex.exec(desc);
  return match ? match[0] : null;
};

const HOURS_72_MS = 72 * 60 * 60 * 1000;

/**
 * Check if a datetime will occur within 72 hours.
 * @param date Datetime
 * @returns True if the datetime will occur within 72 hours, false otherwise
 */
const isWithin72Hours = (date: Date): boolean => {
  const diff = date.getTime() - Date.now();

  return diff >= 0 && diff <= HOURS_72_MS;
};

const getEventOptions = () => {
  return queryOptions({
    queryKey: ["events"],
    queryFn: async (): Promise<DiscordEventListRes> => {
      let filter;
      if (IS_CENTRAL) {
        filter = "wg";
      } else {
        filter = "cup-pogo";
      }
      const res = await fetch(
        `${import.meta.env.VITE_API}/events?filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      return (await res.json()) as DiscordEventListRes;
    },
    staleTime: Infinity,
  });
};

/**
 * Displays the meetups view.
 */
export default function MeetupsView() {
  const { isPending, error, data } = useQuery(getEventOptions());

  let content;
  if (isPending) {
    content = <Spinner className="mx-auto size-8" />;
  } else if (error) {
    console.error(error);
    content = <p>{`An error occurred: ${error.message}`}</p>;
  } else {
    const meetups = data.data.map(
      ({ id, description, image, name, scheduled_start_time }) => {
        const d = new Date(scheduled_start_time);
        const meetupStartTxt = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Los_Angeles",
          dateStyle: "full",
          timeStyle: "short",
        }).format(d);

        const meetupLink = extractCampfireLink(description);

        return (
          <Card key={id} className="relative mx-auto w-full pt-0">
            <div className="relative">
              <img
                src={`https://cdn.discordapp.com/guild-events/${id}/${image}.png?size=512`}
                alt="Event cover"
                className="aspect-video w-full rounded-t-xl object-cover"
              />
              {isWithin72Hours(d) && (
                <Badge
                  variant="destructive"
                  className="absolute bottom-6 left-6 uppercase"
                >
                  Starting Soon
                </Badge>
              )}
            </div>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{meetupStartTxt}</CardDescription>
            </CardHeader>
            <CardFooter>
              {meetupLink && (
                <Button className="w-full" asChild>
                  <a
                    href={meetupLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View Campfire Meetup <ExternalLink />
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      },
    );

    if (meetups && meetups.length > 0) {
      content = meetups;
    } else {
      content = (
        <>
          <p>
            Unfortunately there are currently no upcoming meetups scheduled.
          </p>
          <p>
            Be sure to check our{" "}
            <a
              href={CAMPFIRE_LINK}
              rel="noopener noreferrer"
              target="_blank"
              className="font-bold underline"
            >
              Campfire group
            </a>{" "}
            or{" "}
            <a
              href="https://discord.gg/7tZ2cauare"
              rel="noopener noreferrer"
              target="_blank"
              className="font-bold underline"
            >
              Discord server
            </a>{" "}
            to stay updated and be notified as soon as new meetups are posted!
          </p>
        </>
      );
    }
  }

  return (
    <UiOverlayCard
      title={
        <UiOverlayCardIconTitle Icon={FlameKindling} text="Campfire Meetups" />
      }
    >
      <div className="flex flex-col gap-6">
        <Alert className="border-purple-900 bg-purple-800 text-purple-50">
          <Gift />
          <AlertTitle>Get free stuff for checking into meetups!</AlertTitle>
          <AlertDescription className="text-purple-200">
            <p>
              Checking into our meetups on Campfire can earn you free rewards
              like Premium Battle Passes and activate special bonuses like
              Reduced Egg Hatch Distance!
            </p>
            <p>
              <a href={CHECK_IN_PATH} className="font-bold underline">
                Read our check-in guide to learn how to get your free in-game
                items & bonuses!
              </a>
            </p>
          </AlertDescription>
        </Alert>
        {content}
      </div>
    </UiOverlayCard>
  );
}
