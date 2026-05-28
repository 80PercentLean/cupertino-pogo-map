import imgDiscord from "@/assets/Discord-Symbol-Blurple.png";
import imgPgo from "@/assets/Pokemon_GO_Logo.png";
import imgCampfire from "@/assets/campfire.png";
import imgProfessor from "@/assets/gotcg.jpg";
import imgPbp from "@/assets/pbp.webp";
import imgRaid from "@/assets/raids-loading.jpg";
import imgMap from "@/assets/raw/pgo-map-bg.jpg";
import {
  CITY,
  GROUP_NAME,
  IS_CENTRAL,
  LOCATION,
  LOCATION_LONG,
  MAP_PATH,
} from "@/constants";
import { Link } from "react-router";

import FooterTxt from "./FooterTxt";
import { useSetDocTitle } from "./hooks";

/**
 * The home page.
 */
export default function Landing() {
  useSetDocTitle(`Pokémon GO Community in ${CITY}, California`);

  return (
    <div className="flex min-h-screen flex-col items-center gap-4">
      <h1 className="text-2xl font-bold tracking-wide uppercase">
        {GROUP_NAME}
      </h1>
      <p className="text-secondary-foreground w-full max-w-150 text-center">
        <strong>{GROUP_NAME}</strong> is an official Pokémon GO Ambassador group
        based in{" "}
        <a href={MAP_PATH} className="underline">
          {LOCATION_LONG}
        </a>
        .
      </p>
      <p className="text-secondary-foreground mb-4 w-full max-w-150 text-center">
        Join our meetups and complete Raids together while earning free in-game
        rewards and official Pokémon merchandise through&nbsp;giveaways!
      </p>
      <div
        className={`grid gap-4 ${IS_CENTRAL ? "grid-rows-6" : "grid-rows-7"}`}
      >
        <a href={MAP_PATH} className="flex flex-1">
          <div className="bg-foreground flex w-full max-w-150 rounded-xl">
            <img
              src={imgMap}
              alt="Community Map Icon"
              className="aspect-video w-29 rounded-l-xl object-cover"
            />
            <div className="self-center p-4">
              <h1 className="font-medium text-black">
                Community Map & Free&nbsp;Parking
              </h1>
              <p className="mt-2 text-gray-500">
                Get driving & walking directions and find parking, restrooms,
                Gyms, PokéStops, Power Spots, and&nbsp;more.
              </p>
            </div>
          </div>
        </a>
        <a href={`${MAP_PATH}?start=meetups`} className="flex flex-1">
          <div className="bg-foreground flex w-full max-w-150 rounded-xl">
            <img
              src={imgRaid}
              alt="Meetup Picture"
              className="aspect-video w-29 rounded-l-xl object-cover"
            />
            <div className="self-center p-4">
              <h1 className="font-medium text-black">Meetups&nbsp;Schedule</h1>
              <p className="mt-2 text-gray-500">
                View all upcoming meetups at {LOCATION}. Find our Campfire
                meetup links where you can check-in for free
                in-game&nbsp;rewards!
              </p>
            </div>
          </div>
        </a>
        <Link to="/checkin" className="flex flex-1">
          <div className="bg-foreground flex w-full max-w-150 rounded-xl">
            <img
              src={imgPbp}
              alt="Check-In Reward"
              className="aspect-video w-29 rounded-l-xl bg-[#1f1f1f] object-contain p-2"
              style={{
                background: "linear-gradient(180deg,#234375 0,#19528e)",
              }}
            />
            <div className="self-center p-4">
              <h1 className="font-medium text-black">
                How To Check-In For Free Rewards&nbsp;&&nbsp;Bonuses
              </h1>
              <p className="mt-2 text-gray-500">
                Learn how to check into our meetups to get free in-game rewards
                & bonuses sent directly into your Pokémon GO&nbsp;account!
              </p>
            </div>
          </div>
        </Link>
        <a
          href="https://discord.gg/7tZ2cauare"
          rel="noopener noreferrer"
          target="_blank"
          className="flex flex-1"
        >
          <div className="bg-foreground flex w-full max-w-150 rounded-xl">
            <img
              src={imgDiscord}
              alt="Discord Logo"
              className="w-29 rounded-l-xl bg-[#1f1f1f] object-contain p-3"
            />
            <div className="self-center p-4">
              <h1 className="font-medium text-black">
                Join Our Discord&nbsp;Server
              </h1>
              <p className="mt-2 text-gray-500">
                Join the Wild Goose × Cupertino PoGO Discord. Chat, coordinate
                Raids & Max Battles, and trade with fellow Trainers in
                the&nbsp;region.
              </p>
            </div>
          </div>
        </a>
        <a
          href="https://campfire.onelink.me/eBr8?af_dp=campfire://&af_force_deeplink=true&deep_link_sub1=cj1jbHVicyZjPTk4MjZkY2U4LTZhM2ItNDQxNC05N2M1LTg1NzYzNDYzY2VmNSZpPXRydWU="
          rel="noopener noreferrer"
          target="_blank"
          className="flex flex-1"
        >
          <div className="bg-foreground flex w-full max-w-150 rounded-xl">
            <img
              src={imgCampfire}
              alt="Campfire Logo"
              className="aspect-video w-29 rounded-l-xl object-cover"
            />
            <div className="self-center p-4">
              <h1 className="font-medium text-black">
                Join Our Niantic Campfire&nbsp;Group
              </h1>
              <p className="mt-2 text-gray-500">
                Find meetups, check-in to get free in-game rewards, win prizes
                from contests, and chat with fellow members in our
                Campfire&nbsp;group.
              </p>
            </div>
          </div>
        </a>
        {!IS_CENTRAL && (
          <a
            href="https://bit.ly/cupertinopogoguide"
            rel="noopener noreferrer"
            target="_blank"
            className="flex flex-1"
          >
            <div className="bg-foreground flex w-full max-w-150 rounded-xl">
              <img
                src={imgProfessor}
                alt="Pokémon GO Logo"
                className="aspect-video w-29 rounded-l-xl bg-[#1f1f1f] object-cover"
              />
              <div className="self-center p-4">
                <h1 className="font-medium text-black">Cupertino PoGO Guide</h1>
                <p className="mt-2 text-gray-500">
                  Learn more about the community and get pro tips that will
                  improve Pokémon GO experience by reading this&nbsp;guide!
                </p>
              </div>
            </div>
          </a>
        )}
        <a
          href="https://pokemongo.com"
          rel="noopener noreferrer"
          target="_blank"
          className="flex flex-1"
        >
          <div className="bg-foreground flex w-full max-w-150 rounded-xl">
            <img
              src={imgPgo}
              alt="Pokémon GO Logo"
              className="aspect-video w-29 rounded-l-xl bg-[#1f1f1f] object-contain p-2"
              style={{
                background: "linear-gradient(135deg, #BEE58D, #7ECA9F)",
              }}
            />
            <div className="self-center p-4">
              <h1 className="font-medium text-black">
                Download & Play Pokémon&nbsp;GO
              </h1>
              <p className="mt-2 text-gray-500">
                New to the game? Visit the official website and download the
                game from the App Store, Google Play, or Galaxy Store and play
                for free&nbsp;today!
              </p>
            </div>
          </div>
        </a>
      </div>
      <footer className="text-muted-foreground mt-20 flex flex-col gap-2 text-center text-sm">
        <FooterTxt />
      </footer>
    </div>
  );
}
