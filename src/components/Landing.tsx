import imgDiscord from "@/assets/Discord-Symbol-Blurple.png";
import imgPgo from "@/assets/Pokemon_GO_Logo.png";
import imgCampfire from "@/assets/campfire.png";
import imgProfessor from "@/assets/raw/gotcg.jpg";
import imgMap from "@/assets/raw/pgo-map-bg.jpg";
import imgRaid from "@/assets/raw/raids_loading.png";
import { MAP_PATH } from "@/constants";

export default function Landing() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center gap-4 p-4">
      <h1 className="text-foreground text-2xl font-bold tracking-wide">
        Cupertino PoGO Group
      </h1>
      <p className="text-primary w-full max-w-150 text-center">
        <strong>Cupertino PoGO</strong> is an official Pokémon GO Ambassador
        group based in{" "}
        <a href={MAP_PATH} className="underline">
          Memorial Park & De Anza College in Cupertino,&nbsp;California
        </a>
        .
      </p>
      <p className="text-primary mb-4 w-full max-w-150 text-center">
        Join us for meetups, free in-game rewards, and official Pokémon
        merchandise&nbsp;giveaways!
      </p>
      <div className="grid grid-rows-5 gap-4">
        <a href={MAP_PATH} className="flex flex-1">
          <div className="bg-foreground flex w-full max-w-150 rounded-xl">
            <img
              src={imgMap}
              alt="Cupertino PoGO Map Icon"
              className="aspect-video w-29 rounded-l-xl object-cover"
            />
            <div className="self-center p-4">
              <h1 className="font-medium">Map & Free&nbsp;Parking</h1>
              <p className="mt-2 text-gray-500">
                Get driving & walking directions and find parking, restrooms,
                Gyms, PokéStops, Power Spots, and more.
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
              <h1 className="font-medium">Meetups&nbsp;Schedule</h1>
              <p className="mt-2 text-gray-500">
                View all upcoming meetups and find their start time as well as
                their Campfire meetup links.
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
          <div className="bg-foreground flex w-full max-w-150 rounded-xl">
            <img
              src={imgDiscord}
              alt="Discord Logo"
              className="w-29 rounded-l-xl bg-[#1f1f1f] object-contain p-3"
            />
            <div className="self-center p-4">
              <h1 className="font-medium">Join Our Discord&nbsp;Server</h1>
              <p className="mt-2 text-gray-500">
                Join the Wild Goose × Cupertino PoGO Discord. Chat, coordinate
                Raids & Max Battles, and trade with fellow Trainers in the
                region.
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
              <h1 className="font-medium">
                Join Our Niantic Campfire&nbsp;Group
              </h1>
              <p className="mt-2 text-gray-500">
                Find meetups, check-in to get free in-game rewards, win prizes
                from contests, and chat with fellow members in our Campfire
                group.
              </p>
            </div>
          </div>
        </a>
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
              <h1 className="font-medium">Cupertino PoGO Guide</h1>
              <p className="mt-2 text-gray-500">
                Learn more about the community and get pro tips that will
                improve Pokémon GO experience by reading this guide!
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
              <h1 className="font-medium">Download & Play Pokémon&nbsp;GO</h1>
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
