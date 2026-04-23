import imgDiscord from "@/assets/Discord-Symbol-Blurple.png";
import imgPgo from "@/assets/Pokemon_GO_Logo.png";
import imgCampfire from "@/assets/campfire.png";
import imgMap from "@/assets/raw/pgo-map-bg.jpg";
import { MAP_PATH } from "@/constants";

export default function Landing() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center gap-4 p-4">
      <h1 className="text-foreground text-2xl font-bold tracking-wide">
        Cupertino PoGO Group
      </h1>
      <div className="flex h-full flex-1 flex-col gap-4">
        <a
          href="https://campfire.onelink.me/eBr8?af_dp=campfire://&af_force_deeplink=true&deep_link_sub1=cj1jbHVicyZjPTk4MjZkY2U4LTZhM2ItNDQxNC05N2M1LTg1NzYzNDYzY2VmNSZpPXRydWU="
          rel="noopener noreferrer"
          target="_blank"
          className="flex flex-1"
        >
          <div className="bg-foreground flex max-w-150 rounded-xl">
            <img
              src={imgCampfire}
              alt="Campfire Logo"
              className="w-29 rounded-l-xl object-cover"
            />
            <div className="self-center p-4">
              <h1 className="font-medium">Campfire Group</h1>
              <p className="mt-2 text-gray-500">
                Join our Campfire to find meetups, check-in to get in-game
                rewards, participate in contests, and chat with fellow group
                members.
              </p>
            </div>
          </div>
        </a>
        <a href={MAP_PATH} className="flex flex-1">
          <div className="bg-foreground flex max-w-150 rounded-xl">
            <img
              src={imgMap}
              alt="Cupertino PoGO Map Icon"
              className="w-29 rounded-l-xl object-cover"
            />
            <div className="self-center p-4">
              <h1 className="font-medium">Directions & Parking Map</h1>
              <p className="mt-2 text-gray-500">
                Get driving/walking directions, find free parking, locate
                restrooms, and see every Gym, PokéStop, Power Spot.
              </p>
            </div>
          </div>
        </a>
        <a
          href="https://discord.gg/7tZ2cauare"
          rel="noopener noreferrer"
          target="_blank"
          className="flex flex-1"
        >
          <div className="bg-foreground flex max-w-150 rounded-xl">
            <img
              src={imgDiscord}
              alt="Discord Logo"
              className="w-29 rounded-l-xl bg-[#1f1f1f] object-contain p-2"
            />
            <div className="self-center p-4">
              <h1 className="font-medium">Discord Server</h1>
              <p className="mt-2 text-gray-500">
                Join the Wild Goose × Cupertino PoGO Discord. Chat, coordinate
                Raids & Max Battles, and trade with fellow Trainers in the
                region.
              </p>
            </div>
          </div>
        </a>
        <a
          href="https://pokemongo.com"
          rel="noopener noreferrer"
          target="_blank"
          className="flex flex-1"
        >
          <div className="bg-foreground flex max-w-150 rounded-xl">
            <img
              src={imgPgo}
              alt="Pokémon GO Logo"
              className="w-29 rounded-l-xl bg-[#1f1f1f] object-contain p-2"
              style={{
                background: "linear-gradient(135deg, #BEE58D, #7ECA9F)",
              }}
            />
            <div className="self-center p-4">
              <h1 className="font-medium">Download & Play Pokémon GO</h1>
              <p className="mt-2 text-gray-500">
                New to the game? Visit the official website and download the
                game from the App Store, Google Play, or Galaxy Store.
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
