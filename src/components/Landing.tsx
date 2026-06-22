import imgDiscord from "@/assets/Discord-Symbol-Blurple.png";
import imgPgo from "@/assets/Pokemon_GO_Logo.png";
import imgCampfire from "@/assets/campfire.png";
import imgProfessor from "@/assets/gotcg.jpg";
import imgPbp from "@/assets/pbp.webp";
import imgMap from "@/assets/pgo-map-bg.jpg";
import imgRaid from "@/assets/raids-loading.jpg";
import {
  CHECK_IN_PATH,
  DISCORD_LINK,
  GET_CAMPFIRE_LINK,
  GET_CITY,
  GET_GROUP_NAME,
  GET_IS_CENTRAL,
  GET_LOCATION_LONG,
  MAP_PATH,
} from "@/constants";
import { Link } from "react-router";

import FooterTxt from "./FooterTxt";
import { useSetDocTitle } from "./hooks";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

/**
 * The home page.
 */
export default function Landing() {
  useSetDocTitle(`Pokémon GO Community in ${GET_CITY()}, California`);

  return (
    <main className="mx-auto flex min-h-screen max-w-[65ch] flex-col items-center gap-4 p-4">
      <h1 className="text-center text-3xl font-extrabold tracking-tight text-balance">
        Welcome to {GET_GROUP_NAME()}!
      </h1>
      <p className="text-muted-foreground text-center text-pretty">
        We're a <b>Pokémon GO community</b> based in{" "}
        <a href={MAP_PATH} className="font-bold underline">
          {GET_LOCATION_LONG()}
        </a>
        .
      </p>
      <p className="text-muted-foreground text-center text-pretty">
        Join us for walks, special events, Raid Battles, and opportunities to
        meet fellow Pokémon Trainers.
      </p>
      <p className="text-muted-foreground text-center text-pretty">
        As part of the <b>official Pokémon GO Community Ambassador Program</b>,
        we offer exclusive perks including free in-game items, special bonuses,
        and chances to win official Pokémon merchandise and swag.
      </p>
      <div
        className={`mt-4 grid w-full gap-4 ${GET_IS_CENTRAL() ? "grid-rows-6" : "grid-rows-7"}`}
      >
        <a href={MAP_PATH} className="flex">
          <Card className="flex w-full flex-row gap-0 bg-white p-0">
            <img
              src={imgMap}
              alt="Community Map Icon"
              className="aspect-video w-29 rounded-l-xl object-cover"
            />
            <CardHeader className="w-full p-6">
              <CardTitle className="font-medium text-balance text-black">
                Community Map & Free Parking
              </CardTitle>
              <CardDescription className="text-pretty text-gray-600">
                Find free parking, restrooms, and real-time walking directions
                to every Gym, PokéStop, and Power Spot.
              </CardDescription>
            </CardHeader>
          </Card>
        </a>
        <Link to={CHECK_IN_PATH} className="flex">
          <Card className="flex w-full flex-row gap-0 bg-white p-0">
            <img
              src={imgPbp}
              alt="Check-In Reward"
              className="aspect-video w-29 rounded-l-xl bg-[#1f1f1f] object-contain p-2 drop-shadow-lg"
              style={{
                background: "linear-gradient(180deg,#234375 0,#19528e)",
              }}
            />
            <CardHeader className="w-full p-6">
              <CardTitle className="font-medium text-balance text-black">
                How To Check-In For Free Rewards & Bonuses
              </CardTitle>
              <CardDescription className="text-pretty text-gray-600">
                Follow our step-by-step check-in guide to get your free in-game
                rewards & bonuses!
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <a href={`${MAP_PATH}?start=meetups`} className="flex">
          <Card className="flex w-full flex-row gap-0 bg-white p-0">
            <img
              src={imgRaid}
              alt="Meetup Picture"
              className="aspect-video w-29 rounded-l-xl object-cover"
            />
            <CardHeader className="w-full p-6">
              <CardTitle className="font-medium text-balance text-black">
                Meetup Schedule
              </CardTitle>
              <CardDescription className="text-pretty text-gray-600">
                View upcoming meetups. RSVP and check-in on Campfire for free
                in-game rewards & bonuses!
              </CardDescription>
            </CardHeader>
          </Card>
        </a>
        <a
          href={DISCORD_LINK}
          rel="noopener noreferrer"
          target="_blank"
          className="flex"
        >
          <Card className="flex w-full flex-row gap-0 bg-white p-0">
            <img
              src={imgDiscord}
              alt="Discord Logo"
              className="w-29 rounded-l-xl bg-[#1f1f1f] object-contain p-3"
            />
            <CardHeader className="w-full p-6">
              <CardTitle className="font-medium text-balance text-black">
                Join Our Discord Server
              </CardTitle>
              <CardDescription className="text-pretty text-gray-600">
                Join the Wild Goose × Cupertino PoGO Discord to chat, coordinate
                Raids/Max Battles, and trade with fellow Trainers in the region.
              </CardDescription>
            </CardHeader>
          </Card>
        </a>
        <a
          href={GET_CAMPFIRE_LINK()}
          rel="noopener noreferrer"
          target="_blank"
          className="flex"
        >
          <Card className="flex w-full flex-row gap-0 bg-white p-0">
            <img
              src={imgCampfire}
              alt="Campfire Logo"
              className="aspect-video w-29 rounded-l-xl object-cover"
            />
            <CardHeader className="w-full p-6">
              <CardTitle className="font-medium text-balance text-black">
                Join Our Niantic Campfire Group
              </CardTitle>
              <CardDescription className="text-pretty text-gray-600">
                Stay up-to-date on meetups, collect check-in rewards, enter
                contests/giveaways, and connect with the community.
              </CardDescription>
            </CardHeader>
          </Card>
        </a>
        {!GET_IS_CENTRAL() && (
          <a
            href="https://bit.ly/cupertinopogoguide"
            rel="noopener noreferrer"
            target="_blank"
            className="flex"
          >
            <Card className="flex w-full flex-row gap-0 bg-white p-0">
              <img
                src={imgProfessor}
                alt="Pokémon GO Logo"
                className="aspect-video w-29 rounded-l-xl bg-[#1f1f1f] object-cover"
              />
              <CardHeader className="w-full p-6">
                <CardTitle className="font-medium text-balance text-black">
                  Cupertino PoGO Guide
                </CardTitle>
                <CardDescription className="text-pretty text-gray-600">
                  Learn about our community and discover tips to get the most
                  out of playing Pokémon GO with us.
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        )}
        <a
          href="https://pokemongo.com"
          rel="noopener noreferrer"
          target="_blank"
          className="flex"
        >
          <Card className="flex w-full flex-row gap-0 bg-white p-0">
            <img
              src={imgPgo}
              alt="Pokémon GO Logo"
              className="aspect-video w-29 rounded-l-xl bg-[#1f1f1f] object-contain p-2"
              style={{
                background: "linear-gradient(135deg, #BEE58D, #7ECA9F)",
              }}
            />
            <CardHeader className="w-full p-6">
              <CardTitle className="font-medium text-balance text-black">
                Download & Play Pokémon GO
              </CardTitle>
              <CardDescription className="text-pretty text-gray-600">
                New to the game? Visit the official website to download the game
                and start your Pokémon adventure today!
              </CardDescription>
            </CardHeader>
          </Card>
        </a>
      </div>
      <footer className="text-muted-foreground mt-20 mb-6 flex flex-col gap-2 text-center text-sm">
        <FooterTxt />
      </footer>
    </main>
  );
}
